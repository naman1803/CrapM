
import os
import string
import mysql.connector
import requests
import json
import urllib.parse
import time
import re
from datetime import datetime, timezone

FACILITY_OWNER = "Facility Owner"

UFEFF_FACILITY_OWNER = "\ufeffFacility Owner"

SITE_ADDRESS = "Site Address"

CONTAMINANT_LIMIT = "Contaminant Limit"

NO_OF_EXCEEDANCES = "No of Exceedances"

QUANTITY_MAXIMUM = "Quantity Maximum*"

MAX_LENGTH = 255

industrial_sewage_data = [
    UFEFF_FACILITY_OWNER,
    SITE_ADDRESS,
    "Contaminant",
    "Type of Exceedance",
    "Exceedance Start Date",
    "Exceedance End Date",
    CONTAMINANT_LIMIT,
    "Contaminant Unit",
    "Limit Frequency",
    NO_OF_EXCEEDANCES,
    QUANTITY_MAXIMUM,
    "Quantity Maximum*"
]

inland_lakes = [
    "LAKE",
    "SDATE",
    "DIC (mg/L)",
    "DOC (mg/L)",
    "Fe (µg/L)",
    "K (mg/L)",
    "Mg (mg/L)",
    "Na (mg/L)",
    "NH4/NH3 (mg/L)",
    "NO3/NO2 (µg/L)",
    "TKN (mg/L)",
    "TN (mg/L)",
    "pH",
    "TP (µg/L)",
    "SiO3 (mg/L)",
    "SO4 (mg/L)"
]

def main():
    logger = Logger()
    logger.start()

    db_conn = DBConn.get_connection()
    db_inserter = DBInserter(db_conn)
    data_fetcher = DataFetcher(api_url=os.environ.get("SOCS_API_URL", ""), api_key=os.environ.get("SOCS_API_KEY", ""), db_conn=db_conn)

    tables_to_fetch = [
        ("Industrial_Sewage_By_Site", industrial_sewage_data, "industrial_sewage"),
        ("Inland_Lake_Drinking_Water_Quality", inland_lakes, "inland_lake_drinking_water_quality")
    ]

    for endpoint, data_filter, table_name in tables_to_fetch:
        process_data_table(endpoint, data_filter, table_name, data_fetcher, db_inserter)

    db_conn.close()


def process_data_table(endpoint, data_filter, table_name, data_fetcher, db_inserter):
    # Fetch new data since the last processed record
    _, new_data = data_fetcher.fetch_after(endpoint, data_filter, table_name)
    
    # Process and insert data based on table type
    if table_name == "industrial_sewage":
        process_industrial_sewage(new_data, db_inserter)
    elif table_name == "inland_lake_drinking_water_quality":
        process_inland_lakes(new_data, db_inserter)


    
def process_industrial_sewage(data, db_inserter):
    sewage_parser = IndustrialSewageDataParser()
    industrial_sewage_data = sewage_parser.parse_data(data)
    industrial_sewage_location_data = sewage_parser.parse_location_data(data)

    # Insert industrial sewage data
    for record in industrial_sewage_data:
        db_inserter.insert_data(IndustrialSewageData(record))

    # Insert industrial sewage location data
    for location_record in industrial_sewage_location_data:
        db_inserter.insert_data(IndustrialSewageLocationData(location_record))


def process_inland_lakes(data, db_inserter):
    lake_parser = LakeDataParser()
    inland_lakes_data = lake_parser.parse_data(data)
    contaminants_data = lake_parser.parse_contaminants(data)

    # Insert inland lakes data
    for lake_record in inland_lakes_data:
        db_inserter.insert_data(LakeData(lake_record))

    # Insert contaminant data
    for contaminant_record in contaminants_data:
        db_inserter.insert_data(ContaminantData(contaminant_record))
        
        
    

class DataFetcher:
    def __init__(self, api_url: str, api_key: str, db_conn):
        if not api_url or not api_key:
            raise ValueError("API URL and API Key must be provided.")
        self.api_url = api_url
        self.api_key = api_key
        self.db_conn = db_conn  
        self.logger = Logger()

    def get_last_processed_date(self, table_name: str):
        cursor = self.db_conn.cursor()
        query = "SELECT last_processed_date FROM data_fetch_log WHERE table_name = %s"
        cursor.execute(query, (table_name,))
        result = cursor.fetchone()
        cursor.close()
        return result[0] if result else None

    def update_last_processed_date(self, table_name: str, new_date: str):
        cursor = self.db_conn.cursor()
        query = """
            INSERT INTO data_fetch_log (table_name, last_processed_date)
            VALUES (%s, %s)
            ON DUPLICATE KEY UPDATE last_processed_date = %s
        """
        cursor.execute(query, (table_name, new_date, new_date))
        self.db_conn.commit()
        cursor.close()

    def fetch_after(self, endpoint: str, data_filter: list, table_name: str):
        # Get the last fetch time and ensure it's formatted as "YYYY-MM-DD"
        last_fetch_time = self.get_last_processed_date(table_name)
        fetch_url = f"{self.api_url}{endpoint}"
        
        if last_fetch_time:
            # Format the last fetch time as "YYYY-MM-DD" for the API
            last_fetch_time_str = last_fetch_time.strftime("%Y-%m-%d")
            fetch_url += f"?after={last_fetch_time_str}"

        socs_response = requests.get(fetch_url, headers={"Apikey": self.api_key})
        
        if socs_response.status_code == 200:
            socs_data = socs_response.json()
            self.logger.info(f"✅ Success! Received response from '{fetch_url}'")
        else:
            self.logger.error(f"⚠️ Error connecting to SOCS service: status code {socs_response.status_code}")
            return []

        # Process and filter new data
        socs_data = [
            {key: data_point[key] for key in data_filter if key in data_point}
            for data_point in socs_data
        ]

        # Update the fetch log with the current timestamp if new data was fetched
        if socs_data:
            current_time = datetime.now(timezone.utc).replace(tzinfo=None, microsecond=0).isoformat(sep=' ')
            self.update_last_processed_date(table_name, current_time)

        return (endpoint, socs_data)


def convert_to_sql_date(date_str):
    # Define the input format
    input_format = "%d-%b-%y"  # e.g., "31-Oct-17"
    
    # Convert to datetime object
    try:
        parsed_date = datetime.strptime(date_str, input_format)
        # Format as SQL date
        sql_date = parsed_date.strftime("%Y-%m-%d")  # e.g., "2017-10-31"
        return sql_date
    except ValueError as e:
        print(f"Error parsing date '{date_str}': {e}")
        return None
        
class Logger:
    def __init__(self, prefix="crap_fetcher.py"):
        self.prefix = prefix

    def start(self):
        splash = '''
                            __     _      _                       
        __ _ _ __ _ _ __   / _|___| |_ __| |_  ___ _ _  _ __ _  _ 
        / _| '_/ _` | '_ \ |  _/ -_)  _/ _| ' \/ -_) '_|| '_ \ || |
        \__|_| \__,_| .__/_|_| \___|\__\__|_||_\___|_|(_) .__/\_, |
                    |_| |___|                           |_|   |__/                         
        '''
        print("Starting Crap Fetcher aaa...")
        print(splash)

        

    def log(self, message, level="INFO"):
        """Prints a message with a specified log level."""
        print(f"{self.prefix} [{level}] {message}")

    def info(self, message):
        """Print an informational message."""
        self.log(message, "INFO")

    def warning(self, message):
        """Print a warning message."""
        self.log(message, "WARNING")

    def error(self, message):
        """Print an error message."""
        print("¯\_( ͡° ͜ʖ ͡°)_/¯")
        self.log(message, "ERROR")


    
class DataParser:
    def __init__(self):
        # Implement in subclass
        pass
    
    def parse_data(self, datapoints: list):
        # Implement in subclass
        pass
    
class LakeDataParser(DataParser):
    def __init__(self):
        super().__init__()
        self.coords_getter = CoordinantsGetter()
        
    def parse_data(self, datapoints: list):
        coords_getter = CoordinantsGetter()
        # Split lake names into name and descriptor (e.g., "Crap Lake (East Basin)")
        split_by_lake_descriptors = lambda x: (re.split(r'\s?[()]\s?', x[:MAX_LENGTH]) + [None])[:2]


        # Get unique lake names
        lake_list = list(set([point['LAKE'] for point in datapoints]))
        
        # Get the name portion of each lake (i.e., "Crap Lake")
        lake_name_list = list(set([split_by_lake_descriptors(lake)[0] for lake in lake_list]))

        # Get latitude/longitude for each lake name
        coord_list = {
            lake: {'lat': lat, 'lon': lon}
            for lake in lake_name_list
            for lat, lon in [coords_getter.get_coords_from_address_lakes(lake)]
        }

        # Prepare a list to store all lakes with their contaminant values
        processed_lake_data = []
        
        processed_lakes = set()

        for point in datapoints:
            
            # Split lake name and get coordinates
            (lake_name, lake_descriptor) = split_by_lake_descriptors(point['LAKE'])
            if lake_name in processed_lakes:
                continue 
            
            coord_pair = coord_list[lake_name]
            
            
            # Prepare lake data with all the columns needed for insertion
            lake_data = {
                'lake_name': lake_name,
                'latitude': coord_pair['lat'],
                'longitude': coord_pair['lon'],
                'additional_notes': lake_descriptor,
            }
            
            processed_lakes.add(lake_name)
            # Add the processed lake data to the list
            processed_lake_data.append(lake_data)
            
        return processed_lake_data
    
    def parse_contaminants(self, datapoints: list):
        
        split_by_lake_descriptors = lambda x: (re.split(r'\s?[()]\s?', x[:MAX_LENGTH]) + [None])[:2]

           
        contaminants_data = []
        
        
        for point in datapoints:
            # Split lake name and get coordinates
            (lake_name, lake_descriptor) = split_by_lake_descriptors(point['LAKE'])
            
            # Prepare lake data with all the columns needed for insertion
            contaminants = {
                'lake_name': lake_name,
                'sample_date': point['SDATE'],
                'DIC_mgL': point.get('DIC (mg/L)'),
                'DOC_mgL': point.get('DOC (mg/L)'),
                'Fe_ugL': point.get('Fe (µg/L)'),
                'K_mgL': point.get('K (mg/L)'),
                'Mg_mgL': point.get('Mg (mg/L)'),
                'Na_mgL': point.get('Na (mg/L)'),
                'NH4_NH3_mgL': point.get('NH4/NH3 (mg/L)'),
                'NO3_NO2_ugL': point.get('NO3/NO2 (µg/L)'),
                'TKN_mgL': point.get('TKN (mg/L)'),
                'TN_mgL': point.get('TN (mg/L)'),
                'pH': point.get('pH'),
                'TP_ugL': point.get('TP (µg/L)'),
                'SiO3_mgL': point.get('SiO3 (mg/L)'),
                'SO4_mgL': point.get('SO4 (mg/L)'),
            }
            
            # Add the processed lake data to the list
            contaminants_data.append(contaminants)
        
        return contaminants_data
    
class IndustrialSewageDataParser(DataParser):
    def __init__(self):
        super().__init__()
        self.coords_getter = CoordinantsGetter()
        self.logger = Logger()
        
    
    def parse_data(self, datapoints: list):
        processed_industrial_sewage_data = []
        
        for point in datapoints:
            # removing the stupid trollspace in the UFEFF_facility_owner column of socs data 
            point[FACILITY_OWNER] = point.pop(UFEFF_FACILITY_OWNER)
            
            quantity_maximum = point.get(QUANTITY_MAXIMUM)
            contaminant_limit = point.get(CONTAMINANT_LIMIT)
            no_of_exceedances = point.get(NO_OF_EXCEEDANCES)
        
            severity = self.calculate_severity(quantity_maximum, contaminant_limit, no_of_exceedances)
            severity_level = severity[0]
            severity_score = severity[1]
            percent_exceedance = severity[2]
            
            # if "Conaminant Limit" isnt a number, null the field
            try:
                float(point[CONTAMINANT_LIMIT])
            except ValueError:
                point[CONTAMINANT_LIMIT] = None
                
            try:
                industrial_sewage_data = {
                    "facility_owner": point[FACILITY_OWNER],
                    "site_address": point.get(SITE_ADDRESS),
                    "contaminant": point.get("Contaminant"),
                    "type_of_exceedance": point.get("Type of Exceedance"),
                    "exceedance_start_date": point.get("Exceedance Start Date"),
                    "exceedance_end_date": point.get("Exceedance End Date"),
                    "contaminant_limit": point[CONTAMINANT_LIMIT],
                    "contaminant_unit": point.get("Contaminant Unit"),
                    "limit_frequency": point.get("Limit Frequency"),
                    "no_of_exceedances": point.get(NO_OF_EXCEEDANCES),
                    "quantity_minimum": point.get("Quantity Minimum*"),
                    "quantity_maximum": point.get(QUANTITY_MAXIMUM),
                    "severity_score": severity_score,
                    "severity_level": severity_level,
                    "percent_exceedance": percent_exceedance,
                }
            except KeyError:
                self.logger.error(f"Error parsing industrial sewage data: {point}")
            
            processed_industrial_sewage_data.append(industrial_sewage_data)
            
        return processed_industrial_sewage_data
    
    
    def parse_location_data(self, datapoints: list):
        processed_industrial_sewage_location_data = []
    
        site_addresses = set()

        for point in datapoints:
            # removing the stupid trollspace in the UFEFF_facility_owner column of socs data 
             # Try to pop both with and without the BOM in case it's present
            facility_owner_key = UFEFF_FACILITY_OWNER if UFEFF_FACILITY_OWNER in point else FACILITY_OWNER
            
            # Remove and clean the BOM character
            point[FACILITY_OWNER] = point.pop(facility_owner_key, None)
            

            if point.get(SITE_ADDRESS) in site_addresses:
                continue
            else:
                
                coord_pair = self.coords_getter.get_coords_from_address_industrial_sewage(point.get(SITE_ADDRESS))
                if not coord_pair or coord_pair == {'lat': 0, 'lon': 0}:  # Skip if the coordinates couldn't be fetched (bad address or failure)
                    continue
                site_addresses.add(point.get(SITE_ADDRESS))
                industrial_sewage_location_data = {
                    "facility_owner": point[FACILITY_OWNER],
                    "latitude": coord_pair['lat'],
                    "longitude": coord_pair['lon'],
                    "contaminant": point.get("Contaminant"),
                }
                processed_industrial_sewage_location_data.append(industrial_sewage_location_data)
            
        return processed_industrial_sewage_location_data
    
    @staticmethod
    def calculate_severity(quantity_maximum, contaminant_limit, no_of_exceedances):
        try:
            quantity_maximum = float(quantity_maximum)
            contaminant_limit = float(contaminant_limit)
            no_of_exceedances = int(no_of_exceedances)
        except (ValueError, TypeError) as e:
            print(f"Error converting values to numeric types: {e}")
            return None, None, None
    
        magnitude_exceedance = (quantity_maximum - contaminant_limit) / contaminant_limit
        severity_score = magnitude_exceedance * no_of_exceedances
        
        # Determine severity level
        if severity_score < 1:
            severity_level = "Low"
        elif severity_score < 5:
            severity_level = "Moderate"
        elif severity_score < 10:
            severity_level = "High"
        else:
            severity_level = "Critical"
            
        percentage_exceedance = (quantity_maximum/contaminant_limit) * 100    
        
        return [severity_level, severity_score, percentage_exceedance]

    

class DBConn:
    conn = None

    def __init__(self):
        if not all([os.getenv("DB_USER"), os.getenv("DB_PASSWORD"), os.getenv("DB_ADDRESS"), os.getenv("DB_DATABASE")]):
            raise ValueError("Database connection information is missing in environment variables.")

    @staticmethod
    def get_connection():
        if DBConn.conn is None:
            DBConn.conn = mysql.connector.connect(
                user=os.environ["DB_USER"],
                password=os.environ["DB_PASSWORD"],
                host=os.environ["DB_ADDRESS"],
                database=os.environ["DB_DATABASE"],
                collation="utf8mb4_unicode_ci",
                charset="utf8mb4",
            )
        return DBConn.conn


class CoordinantsGetter:
    def __init__(self):
        self.failed_addresses = set()
        self.logger = Logger()
        self.url = os.environ.get("NOMINATIM_OVERRIDE_URL", "https://nominatim.openstreetmap.org/search?q=")

    def get_coords_from_address_lakes(self, address: str):
        fetch_url = f"{self.url}{urllib.parse.quote(f'{address}, Ontario, Canada')}&format=json"
        nominatim_response = requests.get(fetch_url, headers={"User-Agent": "CrapMap School Project V1"})
        
        time.sleep(1)

        if nominatim_response.status_code == 200:
            self.logger.info(f"✅ Success! Nominatim: received response from '{fetch_url}'")
            try:
                location = nominatim_response.json()[0]
                return (location["lat"], location["lon"])
            except IndexError:
                self.logger.warning(f"⚠️ Error unpacking JSON latitude/longitude: Nominatim returned 0 results for '{address}'")
                return (None, None)
        else:
            self.logger.error(f"⚠️ Error with Nominatim request: status code {nominatim_response.status_code}")
            return (None, None)

    def get_coords_from_address_industrial_sewage(self, address: str): 
        bad_addresses = ['New Post Creek Hydroelectric Project', '797318 Coleman Rd', 'Southwest Half of Lot 25 Concession 8', 'Highway 600 North of Black Hawk', 'Light Rail Transit route 19km RMOW', 'Lot 20,21,24, Concession 2, Port Colborne', '425 McCartney Street and 265 DeCosta Street', '2839 Highway 101 East', 'Lot: 12, Concession: 1,  South Part, Geographic Township: HISLOP', 'Original Geographic Township of Mara', 'Lot: 2 3 and 4, Concession: 4 and 5,  Geographic Township: KIDD', '140 Bickford Line Lot 1 to 3 Front Concession', '100 Beiber Road R.R #3 Lot 28-29 Concession 8, Puslinch', '177 Tie Rd Tiverton', 'Lot: 26 27 28, Concession: 4,  Geographic Township: STODDART', 'Lot: 28, Concession: 10,  Keppel Township, Georgian Bluffs', 'Oxford County, Zorra Twp, Lot 1, Concession 4', '70km south on Paint Lake Road from Highway 17', '4272 Concession Four Rd N', 'Undeveloped Crown Land 300 km east of Thunder Bay and 30 km northeast of White River', 'Geographic Township of Dungannon', 'Oxford County Road 6']
        if address in bad_addresses:
            return None
        fetch_url = f"{self.url}{urllib.parse.quote(f'{address}, Ontario, Canada')}&format=json"
        nominatim_response = requests.get(fetch_url, headers={"User-Agent": "CrapMap School Project V1"})
        
        time.sleep(1)

        if nominatim_response.status_code == 200:
            self.logger.info(f"✅ Success! Nominatim: received response from '{fetch_url}'")
            try:
                location = nominatim_response.json()[0]
                return {'lat': location["lat"], 'lon': location["lon"]}
            except IndexError:
                self.logger.warning(f"⚠️ Error unpacking JSON latitude/longitude: Nominatim returned 0 results for '{address}'")
                self.failed_addresses.add(address)
                return {'lat': 0, 'lon': 0}
        else:
            self.logger.error(f"⚠️ Error with Nominatim request: status code {nominatim_response.status_code}")
            return {'lat': 0, 'lon': 0}

class DBInserter:
    def __init__(self, conn):
        self.conn = conn

    def insert_data(self, data_inserter):
        """Delegates insertion to the data-specific inserter"""
        data_inserter.insert(self.conn)


class LakeData:
    def __init__(self, data):
        self.data = data
        self.logger = Logger()

    def insert(self, conn):
        try:
            cursor = conn.cursor()
            query = """
                INSERT INTO inland_lake_drinking_water_quality (
                    lake_name, latitude, longitude, additional_notes
                ) VALUES (%s, %s, %s, %s)
            """
            cursor.execute(query, (
                self.data.get('lake_name'),
                self.data.get('latitude'),
                self.data.get('longitude'),
                self.data.get('additional_notes')
            ))
            conn.commit()
        except Exception as e:
            conn.rollback()  # Rollback in case of an error
            self.logger.error(f"⚠️ Error inserting lake data: {e}")


class ContaminantData:
    def __init__(self, data):
        self.data = data
        self.logger = Logger()

    def insert(self, conn):
        try:
            cursor = conn.cursor()
            lake_id = self.get_lake_id(conn, self.data.get('lake_name'))
            print(lake_id)
            if lake_id is None:
                self.logger.error(f"🚫 Cannot insert data for lake '{self.data.get('lake_name')}' because it does not exist in 'inland_lake_drinking_water_quality'. Skipping insertion.")
                return 
            
            query = """
                INSERT INTO lake_contaminants (
                    lake_id, sample_date, DIC_mgL, DOC_mgL, Fe_ugL, K_mgL, Mg_mgL, Na_mgL, 
                    NH4_NH3_mgL, NO3_NO2_ugL, TKN_mgL, TN_mgL, pH, TP_ugL, SiO3_mgL, SO4_mgL
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(query, (
                lake_id,
                self.data.get('sample_date'),
                self.data.get('DIC_mgL'), self.data.get('DOC_mgL'), self.data.get('Fe_ugL'),
                self.data.get('K_mgL'), self.data.get('Mg_mgL'), self.data.get('Na_mgL'),
                self.data.get('NH4_NH3_mgL'), self.data.get('NO3_NO2_ugL'),
                self.data.get('TKN_mgL'), self.data.get('TN_mgL'), self.data.get('pH'),
                self.data.get('TP_ugL'), self.data.get('SiO3_mgL'), self.data.get('SO4_mgL'),
            ))
            conn.commit()
        except Exception as e:
            conn.rollback()  # Rollback in case of an error
            self.logger.error(f"⚠️ Error inserting lake contaminants data: {e}")

    def get_lake_id(self, conn, lake_name):
        cursor = conn.cursor()
        try:
            query = "SELECT id FROM inland_lake_drinking_water_quality WHERE lake_name = %s"
            cursor.execute(query, (lake_name,))
            lake_result = cursor.fetchone()
            
            if lake_result:
                self.logger.info(f"🔍 Found lake ID for '{lake_name}': {lake_result[0]}")
                return lake_result[0]
            else:
                self.logger.warning(f"⚠️ Lake '{lake_name}' not found in 'inland_lake_drinking_water_quality'")
                return 1
        finally:
            cursor.close()  # Ensure cursor is closed after the query is done

class IndustrialSewageLocationData:
    def __init__(self, data):
        self.data = data
        self.logger = Logger()

    def insert(self, conn):
        try:
            cursor = conn.cursor()
            query = """
                INSERT INTO industrial_sewage_markers (
                    facility_owner, latitude, longitude, contaminant
                ) VALUES (%s, %s, %s, %s)
            """
            cursor.execute(query, (
                self.data.get('facility_owner'),
                self.data.get('latitude'),
                self.data.get('longitude'),
                self.data.get('contaminant')
            ))
            conn.commit()
        except Exception as e:
            conn.rollback()  # Rollback in case of an error
            self.logger.error(f"⚠️ Error inserting industrial sewage location data: {e}")


class IndustrialSewageData:
    def __init__(self, data):
        self.data = data
        self.logger = Logger()

    def insert(self, conn):
        try:
            cursor = conn.cursor()
            query = """
                INSERT INTO industrial_sewage_by_site (
                    facility_owner, site_address, contaminant, type_of_exceedance, 
                    exceedance_start_date, exceedance_end_date, contaminant_limit, 
                    contaminant_unit, limit_frequency, no_of_exceedances, 
                    quantity_minimum, quantity_maximum, severity_score, severity_level, percent_exceedance
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(query, (
                self.data.get('facility_owner'),
                self.data.get('site_address'),
                self.data.get('contaminant'),
                self.data.get('type_of_exceedance'),
                self.data.get('exceedance_start_date'),
                self.data.get('exceedance_end_date'),
                self.to_decimal_or_null(self.data.get('contaminant_limit')),
                self.data.get('contaminant_unit'),
                self.data.get('limit_frequency'),
                self.to_int_or_null(self.data.get('no_of_exceedances')),
                self.to_decimal_or_null(self.data.get('quantity_minimum')),
                self.to_decimal_or_null(self.data.get('quantity_maximum')),
                self.data.get('severity_score'),
                self.data.get('severity_level'),
                self.to_decimal_or_null(self.data.get('percent_exceedance'))
            ))
            conn.commit()
        except Exception as e:
            conn.rollback()  # Rollback in case of an error
            self.logger.error(f"⚠️ Error inserting industrial sewage data: {e}")

    @staticmethod
    def to_decimal_or_null(value):
        try:
            return None if value is None or value == '' or value == 'FAIL' else float(value)
        except ValueError:
            print(f"⚠️ Warning: Invalid decimal value '{value}' encountered, setting to NULL")
            return None

    @staticmethod
    def to_int_or_null(value):
        try:
            return None if value is None or value == '' else int(value)
        except ValueError:
            print(f"⚠️ Warning: Invalid integer value '{value}' encountered, setting to NULL")
            return None





    


if __name__ == "__main__":
    main()
    
