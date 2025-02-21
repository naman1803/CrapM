-- use crapmap_db;

-- Clear everything --
DROP TABLE IF EXISTS industrial_sewage_by_site;
DROP TABLE IF EXISTS industrial_sewage_markers;
DROP TABLE IF EXISTS industrial_wastewater_discharge;
DROP TABLE IF EXISTS lake_contaminants;
DROP TABLE IF EXISTS inland_lake_drinking_water_quality;



CREATE TABLE IF NOT EXISTS data_fetch_log (
    id INT PRIMARY KEY AUTO_INCREMENT,
    table_name VARCHAR(50) NOT NULL,
    last_processed_date DATETIME,
    UNIQUE KEY (table_name)
);

CREATE TABLE IF NOT EXISTS industrial_sewage_by_site
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

INSERT INTO industrial_sewage_by_site
(
    facility_owner,
    site_address,
    contaminant,
    type_of_exceedance,
    exceedance_start_date,
    exceedance_end_date,
    contaminant_limit,
    contaminant_unit,
    limit_frequency,
    no_of_exceedances,
    quantity_minimum,
    quantity_maximum,
    severity_score,
    severity_level,
    percent_exceedance
) VALUES (
    'Mock Facility 1',
    '123 Mock St',
    'BIOCHEMICAL OXYGEN DEMAND',
    'Legislation Non-Compliance',
    '2016-08-18',
    '2016-08-18',
    50.00,
    'mg/L',
    'any',
    1,
    null,
    88.50,
    0.77,
    'Low',
    177.00
);

INSERT INTO industrial_sewage_by_site
(
    facility_owner,
    site_address,
    contaminant,
    type_of_exceedance,
    exceedance_start_date,
    exceedance_end_date,
    contaminant_limit,
    contaminant_unit,
    limit_frequency,
    no_of_exceedances,
    quantity_minimum,
    quantity_maximum,
    severity_score,
    severity_level,
    percent_exceedance
) VALUES (
    'Mock Facility 2',
    '1234 Mock St',
    'BIOCHEMICAL OXYGEN DEMAND',
    'Legislation Non-Compliance',
    '2016-08-23',
    '2016-08-23',
    50.00,
    'mg/L',
    'any',
    1,
    null,
    78.90,
    0.58,
    'Low',
    157.80
);

INSERT INTO industrial_sewage_by_site
(
    facility_owner,
    site_address,
    contaminant,
    type_of_exceedance,
    exceedance_start_date,
    exceedance_end_date,
    contaminant_limit,
    contaminant_unit,
    limit_frequency,
    no_of_exceedances,
    quantity_minimum,
    quantity_maximum,
    severity_score,
    severity_level,
    percent_exceedance
) VALUES (
    'Mock Facility 2',
    '1234 Mock St',
    'PH - HIGH',
    'Legislation Non-Compliance',
    '2016-08-30',
    '2016-08-30',
    50.00,
    'mg/L',
    'any',
    1,
    null,
    97.70,
    0.95,
    'Low',
    195.40
);


-- TO DO: Make each row for one per site, not per contaminant (how)

CREATE TABLE IF NOT EXISTS industrial_sewage_markers 
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    facility_owner VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 2) NOT NULL, 
    longitude DECIMAL(10, 2) NOT NULL,
    contaminant VARCHAR(255) NOT NULL
);

INSERT INTO industrial_sewage_markers
(
    facility_owner,
    latitude,
    longitude,
    contaminant
) VALUES (
    'Mock Facility 1',
    44.49,
    -77.69,
    'BIOCHEMICAL OXYGEN DEMAND'
);

INSERT INTO industrial_sewage_markers
(
    facility_owner,
    latitude,
    longitude,
    contaminant
) VALUES (
    'Mock Facility 2',
    44.68,
    -79.23,
    'PH - HIGH'
);


-- CREATE TABLE IF NOT EXISTS industrial_wastewater_discharge 
-- (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     sector VARCHAR(255) NOT NULL,
--     works_name VARCHAR(255) NOT NULL,
--     company_code VARCHAR(100) NOT NULL,
--     municipality VARCHAR(255) NOT NULL,
--     sample_date DATE NOT NULL,
--     control_point_name VARCHAR(255) NOT NULL,
--     control_point_id VARCHAR(100) NOT NULL,
--     parameter_name VARCHAR(255) NOT NULL,
--     parameter_reported_as VARCHAR(255),
--     frequency VARCHAR(50) NOT NULL,
--     result_structure VARCHAR(255),
--     component_type VARCHAR(100),
--     value DECIMAL(10, 2),
--     unit_of_measure VARCHAR(50),
--     regulation TEXT
-- );


-- Then create the inland_lake_drinking_water_quality table
CREATE TABLE IF NOT EXISTS inland_lake_drinking_water_quality
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    lake_name VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 2) NOT NULL,
    longitude DECIMAL(10, 2) NOT NULL,
    additional_notes VARCHAR(255)
);

INSERT INTO inland_lake_drinking_water_quality
(
    lake_name,
    latitude,
    longitude,
    additional_notes
) VALUES (
    'Lake Ontario',
    45.20,
    -78.94,
    null
);

INSERT INTO inland_lake_drinking_water_quality
(
    lake_name,
    latitude,
    longitude,
    additional_notes
) VALUES (
    'Lake Erie',
    46.47,
    -82.78,
    null
);


CREATE TABLE IF NOT EXISTS lake_contaminants
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

INSERT INTO lake_contaminants (
    lake_id,
    sample_date,
    DIC_mgL,
    DOC_mgL,
    Fe_ugL,
    K_mgL,
    Mg_mgL,
    Na_mgL,
    NH4_NH3_mgL,
    NO3_NO2_ugL,
    TKN_mgL,
    TN_mgL,
    pH,
    TP_ugL,
    SiO3_mgL,
    SO4_mgL
) VALUES (
    1,
    '2016-05-02',
    1.94,
    1.80,
    null,
    0.31,
    0.56,
    0.68,
    null,
    null,
    null,
    null,
    6.39,
    null,
    0.66,
    3.30
);

INSERT INTO lake_contaminants (
    lake_id,
    sample_date,
    DIC_mgL,
    DOC_mgL,
    Fe_ugL,
    K_mgL,
    Mg_mgL,
    Na_mgL,
    NH4_NH3_mgL,
    NO3_NO2_ugL,
    TKN_mgL,
    TN_mgL,
    pH,
    TP_ugL,
    SiO3_mgL,
    SO4_mgL
) VALUES (
    2,
    '2016-06-15',
    1.74,
    1.62,
    null,
    0.30,
    0.58,
    0.69,
    null,
    null,
    null,
    null,
    6.39,
    null,
    0.48,
    3.26
);