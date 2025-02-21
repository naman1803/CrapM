use crapmap_db;

DROP TABLE IF EXISTS data_fetch_log;
DROP TABLE IF EXISTS industrial_sewage_by_site;
DROP TABLE IF EXISTS industrial_sewage_markers;
DROP TABLE IF EXISTS industrial_wastewater_discharge;
DROP TABLE IF EXISTS lake_contaminants;
DROP TABLE IF EXISTS inland_lake_drinking_water_quality;

CREATE TABLE data_fetch_log (
    id INT PRIMARY KEY AUTO_INCREMENT,
    table_name VARCHAR(50) NOT NULL,
    last_processed_date DATETIME,
    UNIQUE KEY (table_name)
);

create table industrial_sewage_by_site
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    facility_owner VARCHAR(255) NOT NULL,
    site_address VARCHAR(255) NOT NULL,
    contaminant VARCHAR(255) NOT NULL,
    type_of_exceedance VARCHAR(255) NOT NULL,
    exceedance_start_date DATE NOT NULL,
    exceedance_end_date DATE NOT NULL,
    contaminant_limit DECIMAL(10, 2),
    contaminant_unit VARCHAR(50) NOT NULL,
    limit_frequency VARCHAR(255) NOT NULL,
    no_of_exceedances INT NOT NULL,
    quantity_minimum DECIMAL(10, 2),
    quantity_maximum DECIMAL(10, 2),
    severity_score DECIMAL(10, 2),
    severity_level VARCHAR(255),
    percent_exceedance DECIMAL(10, 2)
);

-- TO DO: Make each row for one per site, not per contaminant (how)

create table industrial_sewage_markers 
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    facility_owner VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 2) NOT NULL, 
    longitude DECIMAL(10, 2) NOT NULL,
    contaminant VARCHAR(255) NOT NULL
);

-- INSERT INTO industrial_sewage_markers (
--     facility_owner,
--     latitude,
--     longitude,
--     contaminant
-- ) VALUES (
--     'Bob Facility',
--     '10.5',
--     '10.6',
--     'Contaminant on Bob'
-- );

-- INSERT INTO industrial_sewage_markers (
--     facility_owner,
--     latitude,
--     longitude,
--     contaminant
-- ) VALUES (
--     'Bob Facility',
--     '10.7',
--     '10.8',
--     'Contaminant on Bob Ross'
-- );

create table industrial_wastewater_discharge 
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    sector VARCHAR(255) NOT NULL,
    works_name VARCHAR(255) NOT NULL,
    company_code VARCHAR(100) NOT NULL,
    municipality VARCHAR(255) NOT NULL,
    sample_date DATE NOT NULL,
    control_point_name VARCHAR(255) NOT NULL,
    control_point_id VARCHAR(100) NOT NULL,
    parameter_name VARCHAR(255) NOT NULL,
    parameter_reported_as VARCHAR(255),
    frequency VARCHAR(50) NOT NULL,
    result_structure VARCHAR(255),
    component_type VARCHAR(100),
    value DECIMAL(10, 2),
    unit_of_measure VARCHAR(50),
    regulation TEXT
);


-- Then create the inland_lake_drinking_water_quality table
CREATE TABLE inland_lake_drinking_water_quality
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    lake_name VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 2) NOT NULL,
    longitude DECIMAL(10, 2) NOT NULL,
    additional_notes VARCHAR(255)
);

CREATE TABLE lake_contaminants
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    lake_id INT NOT NULL, -- foreign key
    sample_date VARCHAR(255) NOT NULL,
    DIC_mgL DECIMAL(10, 2) NULL,
    DOC_mgL DECIMAL(10, 2) NULL,
    Fe_ugL DECIMAL(10, 2) NULL,
    K_mgL DECIMAL(10, 2) NULL,
    Mg_mgL DECIMAL(10, 2) NULL,
    Na_mgL DECIMAL(10, 2) NULL,
    NH4_NH3_mgL DECIMAL(10, 2) NULL,
    NO3_NO2_ugL DECIMAL(10, 2) NULL,
    TKN_mgL DECIMAL(10, 2) NULL,
    TN_mgL DECIMAL(10, 2) NULL,
    pH DECIMAL(10, 2) NULL,
    TP_ugL DECIMAL(10, 2) NULL,
    SiO3_mgL DECIMAL(10, 2) NULL,
    SO4_mgL DECIMAL(10, 2) NULL,
    CONSTRAINT fk_lake FOREIGN KEY (lake_id) REFERENCES inland_lake_drinking_water_quality(id)
);

