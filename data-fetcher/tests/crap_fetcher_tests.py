from starlette.testclient import TestClient
from fastapi import FastAPI
import pytest  # Import your FastAPI app
from crap_fetcher import DataFetcher, Logger, process_industrial_sewage, process_inland_lakes, IndustrialSewageDataParser, IndustrialSewageData, IndustrialSewageLocationData  # Adjust imports based on your structure
import os       
from unittest.mock import MagicMock, patch, call, ANY
import requests


# Instantiate the TestClient with the FastAPI app
app = FastAPI()
client = TestClient(app)

# Test each endpoint
mock_server_url = os.getenv("SOCS_API_URL")

@patch('requests.get')
def test_get_inland_lake_drinking_water_quality(mock_get):
    # Mock the response object
    mock_get.return_value.status_code = 200
    mock_get.return_value.json.return_value = [
        {"lake_name": "Lake Ontario", "latitude": 45.20},
        {"lake_name": "Lake Erie", "latitude": 46.47}
    ]

    response = requests.get("http://mock-server:8001/api/inland_lake_drinking_water_quality")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert data[0]["lake_name"] == "Lake Ontario"


@patch('requests.get')
def test_get_industrial_sewage_by_site(mock_get):
    # Mock the response object
    mock_get.return_value.status_code = 200
    mock_get.return_value.json.return_value = [
        {"facility_owner": "Mock Facility", "quantity_maximum": 88.50},
        {"facility_owner": "Another Facility", "quantity_maximum": 78.90},
        {"facility_owner": "Third Facility", "quantity_maximum": 67.80}
    ]

    # Send the request
    response = requests.get("http://mock-server:8001/api/industrial_sewage_by_site")
    assert response.status_code == 200
    data = response.json()

    # Confirm data structure and expected values
    assert len(data) == 3
    assert data[0]["facility_owner"] == "Mock Facility"
    assert data[0]["quantity_maximum"] == 88.50
    assert data[1]["quantity_maximum"] == 78.90


@patch('requests.get')
def test_get_error(mock_get):
    # Mock the response object for an error case
    mock_get.return_value.status_code = 500
    mock_get.return_value.json.return_value = {
        "detail": "Mock server error for testing."
    }

    # Send the request
    response = requests.get("http://mock-server:8001/api/error")
    assert response.status_code == 500
    data = response.json()

    # Verify error message content
    assert data["detail"] == "Mock server error for testing."

def test_lake_fetcher():
    data_fetcher = DataFetcher(
        api_url="http://mock_server:8001/api/",
        api_key=os.getenv("SOCS_API_KEY", "test_api_key"),
        db_conn=MagicMock()
    )
    
    # Mock 'requests.get' to simulate an API response
    with patch('requests.get') as mock_get:
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = [
            {"lake_id": 1, "sample_date": "2016-05-02", "DIC_mgL": 1.94}
        ]
        
        # Call the fetch_after method
        endpoint = "inland_lake_drinking_water_quality"
        table_name = "test_table"
        data_filter = ["lake_id", "sample_date", "DIC_mgL"]
        _, socs_data = data_fetcher.fetch_after(endpoint, data_filter, table_name)
        
        # Assertion to verify that lake_id is correct
        assert socs_data[0]["lake_id"] == 1
        print("Test passed: 'lake_id' matches expected value.")
        
def test_sewage_fetcher():
    data_fetcher = DataFetcher(
        api_url="http://mock_server:8001/api/",
        api_key=os.getenv("SOCS_API_KEY", "test_api_key"),
        db_conn=MagicMock()
    )
    
    # Mock 'requests.get' to simulate an API response
    with patch('requests.get') as mock_get:
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = [
            {"\ufeffFacility Owner": "Mock Facility", "Site Address": "123 Mock St", "Contaminant": "TOTAL SUSPENDED SOLIDS"}
        ]
        
        # Call the fetch_after method
        endpoint = "industrial_sewage_by_site"
        table_name = "test_table"
        data_filter = ["\ufeffFacility Owner", "Site Address", "Contaminant"]
        _, socs_data = data_fetcher.fetch_after(endpoint, data_filter, table_name)
        
        # Assertion to verify that 'site_address' matches the expected value
        assert socs_data[0]["Site Address"] == '123 Mock St'
        print("Test passed: 'site_address' matches expected value.")

def test_process_industrial_sewage():
    # Sample data input for the sewage process
    sample_data = {"facility_owner": "Mock Facility", "site_address": "123 Mock St", "contaminant": "TOTAL SUSPENDED SOLIDS"}

    # Mock db_inserter
    mock_db_inserter = MagicMock()

    # Mock the IndustrialSewageDataParser and its parsing methods
    with patch('crap_fetcher.IndustrialSewageDataParser') as MockParser:
        mock_parser = MockParser.return_value
        mock_parser.parse_data.return_value = [{"facility_owner": "Mock Facility", "contaminant": "TOTAL SUSPENDED SOLIDS"}]
        mock_parser.parse_location_data.return_value = [{"facility_owner": "Mock Facility", "longitude": 45.20, "latitude": -78.94}]

        # Mock IndustrialSewageData and IndustrialSewageLocationData constructors to return ANY instance
        with patch('crap_fetcher.IndustrialSewageData', side_effect=lambda data: ANY), \
             patch('crap_fetcher.IndustrialSewageLocationData', side_effect=lambda data: ANY):
            
            # Call the function under test
            process_industrial_sewage(sample_data, mock_db_inserter)

            # Use assert_has_calls with ANY to check if calls with expected data were made
            expected_calls = [
                call.insert_data(ANY),  # Match any IndustrialSewageData instance
                call.insert_data(ANY)   # Match any IndustrialSewageLocationData instance
            ]

            mock_db_inserter.assert_has_calls(expected_calls, any_order=True)
            print("Test passed: Industrial sewage data and location data inserted correctly.")


def test_process_inland_lakes():
    # Sample data input for the lake process
    sample_data = {
        "lake_name": "Mock Lake",
        "sample_date": "2023-01-01",
        "DIC (mg/L)": 1.94,
        "DOC (mg/L)": 1.80
    }

    # Mock db_inserter
    mock_db_inserter = MagicMock()

    # Mock the LakeDataParser and its parsing methods
    with patch('crap_fetcher.LakeDataParser') as MockParser:
        mock_parser = MockParser.return_value
        mock_parser.parse_data.return_value = [{"lake_name": "Mock Lake", "sample_date": "2023-01-01"}]
        mock_parser.parse_contaminants.return_value = [
            {"lake_name": "Mock Lake", "sample_date": "2023-01-01", "DIC_mgL": 1.94, "DOC_mgL": 1.80}
        ]

        # Mock LakeData and ContaminantData constructors to return ANY instance
        with patch('crap_fetcher.LakeData', side_effect=lambda data: ANY), \
             patch('crap_fetcher.ContaminantData', side_effect=lambda data: ANY):
            
            # Call the function under test
            process_inland_lakes(sample_data, mock_db_inserter)

            # Use assert_has_calls with ANY to check if calls with expected data were made
            expected_calls = [
                call.insert_data(ANY),  # Match any LakeData instance
                call.insert_data(ANY)   # Match any ContaminantData instance
            ]

            mock_db_inserter.assert_has_calls(expected_calls, any_order=True)
            print("Test passed: Inland lake data and contaminant data inserted correctly.")

    
    