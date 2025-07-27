INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'B-CLASS B200D AMG LINE PACKAGE', NULL, 'AT', '2WD', 2000, 'HATCHBACK', NULL, '5', 'diesel', 7008182, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'B-CLASS B200D AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'C-CLASS ALL TERRAIN C220D 4MATIC ALL TERRAIN', NULL, 'AT', '4WD', 2000, 'SEDAN', NULL, '4', 'hybrid', 11700724, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'C-CLASS ALL TERRAIN C220D 4MATIC ALL TERRAIN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'C-CLASS C180 AVANTGARDE', NULL, 'AT', '2WD', 1500, 'SEDAN', NULL, '5', 'hybrid', 9004780, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'C-CLASS C180 AVANTGARDE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'C-CLASS C180 AVANTGARDE', NULL, 'AT', '2WD', 1600, 'SEDAN', NULL, '4', 'petrol', 9104570, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'C-CLASS C180 AVANTGARDE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'C-CLASS C180 AVANTGARDE AMG LINE', NULL, 'AT', '2WD', 1600, 'SEDAN', NULL, '4', 'petrol', 9525154, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'C-CLASS C180 AVANTGARDE AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'C-CLASS C180 CABRIOLET SPORTS', NULL, 'AT', '2WD', 1600, 'CONVERTIBLE', NULL, '2', 'petrol', 15567578, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'C-CLASS C180 CABRIOLET SPORTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'C-CLASS C180 CABRIOLET SPORTS LEATHER EXCLUSIVE PACKAGE', NULL, 'AT', '2WD', 1600, 'CONVERTIBLE', NULL, '2', 'petrol', 20316025, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'C-CLASS C180 CABRIOLET SPORTS LEATHER EXCLUSIVE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'C-CLASS C180 COUPE SPORTS', NULL, 'AT', '2WD', 1600, 'COUPE', NULL, '2', 'petrol', 13296280, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'C-CLASS C180 COUPE SPORTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'C-CLASS C180 COUPE SPORTS LEATHER EXCLUSIVE PACKAGE', NULL, 'AT', '2WD', 1600, 'COUPE', NULL, '2', 'petrol', 13963782, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'C-CLASS C180 COUPE SPORTS LEATHER EXCLUSIVE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'C-CLASS C180 LAUREUS EDITION', 'DBA-205040C', 'AT', '2WD', 1600, 'SEDAN', NULL, '4', 'petrol', 11172964, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'C-CLASS C180 LAUREUS EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'C-CLASS C200 AVANTGARDE AMG LINE', NULL, 'AT', '2WD', 1500, 'SEDAN', NULL, '4', 'hybrid', 9260596, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'C-CLASS C200 AVANTGARDE AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'C-CLASS C200 LAUREUS EDITION SPORTS PLUS PACKAGE', '5AA-205077', 'AT', '2WD', 1500, 'S. WAGON', NULL, '5', 'hybrid', 11689994, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'C-CLASS C200 LAUREUS EDITION SPORTS PLUS PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'C-CLASS C200 LAUREUS EDITION SPORTS PLUS PACKAGE', NULL, 'AT', '2WD', 2000, 'SEDAN', NULL, '4', 'diesel', 12447081, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'C-CLASS C200 LAUREUS EDITION SPORTS PLUS PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'C-CLASS C220D AVANTGARDE', NULL, 'AT', '2WD', 2000, 'SEDAN', NULL, '4', 'hybrid', 9687337, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'C-CLASS C220D AVANTGARDE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'C-CLASS C220D AVANTGARDE AMG LINE', NULL, 'AT', '2WD', 2200, 'SEDAN', NULL, '4', 'diesel', 8260235, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'C-CLASS C220D AVANTGARDE AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'C-CLASS C220D AVANTGARDE AMG LINE PACKAGE', NULL, 'AT', '2WD', 2000, 'SEDAN', NULL, '4', 'hybrid', 9333332, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'C-CLASS C220D AVANTGARDE AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'C-CLASS C220D LAUREUS EDITION', 'LDA-205004', 'AT', '2WD', 2200, 'SEDAN', NULL, '4', 'diesel', 12139728, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'C-CLASS C220D LAUREUS EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'C-CLASS C220D LAUREUS EDITION SPORTS PLUS PACKAGE', '3DA-205014', 'AT', '2WD', 2000, 'SEDAN', NULL, '4', 'diesel', 8861765, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'C-CLASS C220D LAUREUS EDITION SPORTS PLUS PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'C-CLASS C350 E SPORTS', '5LA-206054C', 'AT', '2WD', 2000, 'SEDAN', NULL, '5', 'hybrid', 12059553, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'C-CLASS C350 E SPORTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'C-CLASS STATIONWAGON C180 STATIONWAGON AVANTGARDE', NULL, 'AT', '2WD', 1600, 'WAGON', NULL, '6', 'petrol', 8347835, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'C-CLASS STATIONWAGON C180 STATIONWAGON AVANTGARDE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'C-CLASS STATIONWAGON C180 STATIONWAGON LAUREUS EDITION', 'DBA-205240C', 'AT', '2WD', 1600, 'WAGON', NULL, '6', 'hybrid', 8800986, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'C-CLASS STATIONWAGON C180 STATIONWAGON LAUREUS EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'C-CLASS STATIONWAGON C200 4MATIC STATIONWAGON AVANTGARDE AMG LINE', NULL, 'AT', '2WD', 1500, 'WAGON', NULL, '6', 'hybrid', 8784602, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'C-CLASS STATIONWAGON C200 4MATIC STATIONWAGON AVANTGARDE AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'C-CLASS STATIONWAGON C200 4MATIC STATIONWAGON LAUREUS EDITION SPORT PLUS PACKAGE', '5AA-205278', 'AT', '4WD', 1500, 'WAGON', NULL, '5', 'hybrid', 8624882, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'C-CLASS STATIONWAGON C200 4MATIC STATIONWAGON LAUREUS EDITION SPORT PLUS PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'C-CLASS STATIONWAGON C200 4MATIC STATIONWAGON SPORTS LEATHER VERSION', 'DBA-205243', 'AT', '2WD', 2000, 'WAGON', NULL, '5', 'hybrid', 8024560, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'C-CLASS STATIONWAGON C200 4MATIC STATIONWAGON SPORTS LEATHER VERSION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'C-CLASS STATIONWAGON C200 STATIONWAGON AVANTGARDE AMG LINE', NULL, 'AT', '2WD', 1500, 'WAGON', NULL, '6', 'hybrid', 10085984, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'C-CLASS STATIONWAGON C200 STATIONWAGON AVANTGARDE AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'C-CLASS STATIONWAGON C200 STATIONWAGON LAUREUS EDITION SPORT PLUS PACKAGE', '5AA-205277', 'AT', '2WD', 1500, 'WAGON', NULL, '6', 'hybrid', 9810977, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'C-CLASS STATIONWAGON C200 STATIONWAGON LAUREUS EDITION SPORT PLUS PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'C-CLASS STATIONWAGON C220D STATIONWAGON AVANTGARDE AMG LINE', NULL, 'AT', '2WD', 2200, 'WAGON', NULL, '6', 'diesel', 9502990, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'C-CLASS STATIONWAGON C220D STATIONWAGON AVANTGARDE AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'C-CLASS STATIONWAGON C220D STATIONWAGON AVANTGARDE AMG LINE PACKAGE', NULL, 'AT', '2WD', 2000, 'WAGON', NULL, '6', 'hybrid', 10466135, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'C-CLASS STATIONWAGON C220D STATIONWAGON AVANTGARDE AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'C-CLASS STATIONWAGON C220D STATIONWAGON LAUREUS EDITION', 'LDA-205204', 'AT', '2WD', 2200, 'WAGON', NULL, '5', 'diesel', 10335529, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'C-CLASS STATIONWAGON C220D STATIONWAGON LAUREUS EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'CLA-CLASS CLA180 AMG LINE PACKAGE', NULL, 'AT', '2WD', 1400, 'SEDAN', NULL, '4', 'hybrid', 9586218, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'CLA-CLASS CLA180 AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'CLA-CLASS CLA180 AMG STYLE', NULL, 'AT', '2WD', 1600, 'COUPE', NULL, '2', 'petrol', 9257669, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'CLA-CLASS CLA180 AMG STYLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'CLA-CLASS CLA180 AMG STYLE', NULL, 'AT', '2WD', 1600, 'SEDAN', NULL, '5', 'petrol', 9624213, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'CLA-CLASS CLA180 AMG STYLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'CLA-CLASS CLA200D', NULL, 'AT', '2WD', 2000, 'SEDAN', NULL, '4', 'diesel', 19998544, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'CLA-CLASS CLA200D'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'CLA-CLASS CLA200D AMG LEATHER EXCLUSIVE PACKAGE', NULL, 'AT', '2WD', 2000, 'COUPE', NULL, '2', 'diesel', 13931302, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'CLA-CLASS CLA200D AMG LEATHER EXCLUSIVE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'CLA-CLASS CLA200D AMG LEATHER EXCLUSIVE PACKAGE', NULL, 'AT', '2WD', 2000, 'SEDAN', NULL, '4', 'diesel', 12995371, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'CLA-CLASS CLA200D AMG LEATHER EXCLUSIVE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'CLA-CLASS CLA200D AMG LINE', NULL, 'AT', '2WD', 2000, 'SEDAN', NULL, '5', 'diesel', 9872830, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'CLA-CLASS CLA200D AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'CLA-CLASS CLA200D AMG LINE', NULL, 'AT', '2WD', 2000, 'COUPE', NULL, '2', 'diesel', 9799734, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'CLA-CLASS CLA200D AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'CLA-CLASS CLA200D AMG LINE PACKAGE', NULL, 'AT', '2WD', 2000, 'COUPE', NULL, '2', 'diesel', 8964797, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'CLA-CLASS CLA200D AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'CLA-CLASS CLA200D AMG LINE PACKAGE', NULL, 'AT', '2WD', 2000, 'SEDAN', NULL, '4', 'diesel', 11707006, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'CLA-CLASS CLA200D AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'CLA-CLASS CLA250 4MATIC AMG LEATHER EXCLUSIVE PACKAGE', NULL, 'AT', '2WD', 2000, 'SEDAN', NULL, '4', 'petrol', 13799600, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'CLA-CLASS CLA250 4MATIC AMG LEATHER EXCLUSIVE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'CLA-CLASS CLA250 SPORT 4MATIC', NULL, 'AT', '4WD', 2000, 'SEDAN', NULL, '5', 'petrol', 11199248, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'CLA-CLASS CLA250 SPORT 4MATIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'CLA-CLASS SHOOTING BRAKE CLA180 SHOOTING BRAKE AMG STYLE', NULL, 'AT', '2WD', 1600, 'WAGON', NULL, '5', 'petrol', 7018233, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'CLA-CLASS SHOOTING BRAKE CLA180 SHOOTING BRAKE AMG STYLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'CLA-CLASS SHOOTING BRAKE CLA200D SHOOTING BRAKE AMG LEATHER EXCLUSIVE PACKAGE', NULL, 'AT', '2WD', 2000, 'WAGON', NULL, '5', 'diesel', 10093962, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'CLA-CLASS SHOOTING BRAKE CLA200D SHOOTING BRAKE AMG LEATHER EXCLUSIVE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'CLA-CLASS SHOOTING BRAKE CLA200D SHOOTING BRAKE AMG LINE', NULL, 'AT', '2WD', 2000, 'WAGON', NULL, '6', 'diesel', 9922203, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'CLA-CLASS SHOOTING BRAKE CLA200D SHOOTING BRAKE AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'CLA-CLASS SHOOTING BRAKE CLA200D SHOOTING BRAKE AMG LINE PACKAGE', NULL, 'AT', '2WD', 2000, 'WAGON', NULL, '5', 'petrol', 9493341, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'CLA-CLASS SHOOTING BRAKE CLA200D SHOOTING BRAKE AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'CLA-CLASS SHOOTING BRAKE CLA220 4MATIC SHOOTING BRAKE', NULL, 'AT', '2WD', 2000, 'WAGON', NULL, '6', 'petrol', 9987277, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'CLA-CLASS SHOOTING BRAKE CLA220 4MATIC SHOOTING BRAKE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'CLA-CLASS SHOOTING BRAKE CLA250 4MATIC SHOOTING BRAKE AMG LINE', NULL, 'AT', '4WD', 2000, 'WAGON', NULL, '5', 'petrol', 10238913, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'CLA-CLASS SHOOTING BRAKE CLA250 4MATIC SHOOTING BRAKE AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'CLASS ALL TEEEAIN E220D 4MATIC ALL TERRAIN', NULL, 'AT', '4WD', 1900, 'WAGON', NULL, '6', 'diesel', 11095165, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'CLASS ALL TEEEAIN E220D 4MATIC ALL TERRAIN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'CLE CLE200 CABRIOLET SPORT', NULL, 'AT', '2WD', 2000, 'CONVERTIBLE', NULL, '2', 'hybrid', 17377734, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'CLE CLE200 CABRIOLET SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'CLE CLE200 COUPE SPORT', '4AA-236350C', 'AT', '2WD', 2000, 'COUPE', NULL, '4', 'hybrid', 14291003, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'CLE CLE200 COUPE SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'CLS-CLASS CLS220D SPORTS', NULL, 'AT', '2WD', 2000, 'SEDAN', NULL, '5', 'diesel', 12483092, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'CLS-CLASS CLS220D SPORTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'CLS-CLASS CLS220D SPORTS EXCLUSIVE PACKAGE', 'LDA-257314', 'AT', '2WD', 2000, 'SEDAN', NULL, '4', 'diesel', 15174811, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'CLS-CLASS CLS220D SPORTS EXCLUSIVE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'CLS-CLASS CLS450 4MATIC SPORT', 'DAA-257359', 'AT', '2WD', 3000, 'SEDAN', NULL, '4', 'diesel', 17755762, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'CLS-CLASS CLS450 4MATIC SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS ALL TEEEAIN', NULL, 'AT', '4WD', 2000, 'WAGON', NULL, '6', 'hybrid', 16719416, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS ALL TEEEAIN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS ALL TEEEAIN E220D 4MATIC ALL TERRAIN', NULL, 'AT', '4WD', 1900, 'WAGON', NULL, '5', 'diesel', 11982778, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS ALL TEEEAIN E220D 4MATIC ALL TERRAIN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS ALL TEEEAIN E220D 4MATIC ALL TERRAIN LAUREUS EDITION', 'LDA-213217', 'AT', '4WD', 1900, 'WAGON', NULL, '6', 'diesel', 13062801, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS ALL TEEEAIN E220D 4MATIC ALL TERRAIN LAUREUS EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS E200 4MATIC AVANTGARDE', NULL, 'AT', '4WD', 2000, 'SEDAN', NULL, '5', 'petrol', 14683250, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS E200 4MATIC AVANTGARDE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS E200 AVANTGARDE AMG LINE PACKAGE', NULL, 'AT', '2WD', 2000, 'SEDAN', NULL, '4', 'hybrid', 14722564, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS E200 AVANTGARDE AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS E200 CABRIOLET SPORTS', NULL, 'AT', '2WD', 2000, 'CONVERTIBLE', NULL, '2', 'petrol', 18546697, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS E200 CABRIOLET SPORTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS E200 CABRIOLET SPORTS', NULL, 'AT', '2WD', 2000, 'SEDAN', NULL, '4', 'petrol', 17300424, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS E200 CABRIOLET SPORTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS E200 COUPE SPORT', NULL, 'AT', '2WD', 2000, 'SEDAN', NULL, '5', 'petrol', 14315893, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS E200 COUPE SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS E200 COUPE SPORT', NULL, 'AT', '2WD', 2000, 'COUPE', NULL, '2', 'petrol', 14210175, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS E200 COUPE SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS E200 SPORT', NULL, 'AT', '2WD', 1500, 'SEDAN', NULL, '4', 'diesel', 13663647, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS E200 SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS E220D AVANTGARDE', 'LDA-213004C', 'AT', '2WD', 2000, 'SEDAN', NULL, '5', 'diesel', 13108125, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS E220D AVANTGARDE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS E220D AVANTGARDE AMG LINE', NULL, 'AT', '2WD', 2000, 'SEDAN', NULL, '5', 'diesel', 12415841, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS E220D AVANTGARDE AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS E220D AVANTGARDE AMG LINE PACKAGE', NULL, 'AT', '2WD', 2000, 'SEDAN', NULL, '4', 'diesel', 14417548, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS E220D AVANTGARDE AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS E220D AVANTGARDE SPORT', NULL, 'AT', '2WD', 2000, 'SEDAN', NULL, '5', 'diesel', 14550377, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS E220D AVANTGARDE SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS E220D LAUREUS EDITION', 'LDA-213004C', 'AT', '2WD', 2000, 'SEDAN', NULL, '5', 'diesel', 10473608, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS E220D LAUREUS EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS E250 AVANTGARDE SPORT', NULL, 'AT', '2WD', 2000, 'SEDAN', NULL, '4', 'petrol', 13062466, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS E250 AVANTGARDE SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS E300 AVANTGARDE SPORT', NULL, 'AT', '2WD', 2000, 'SEDAN', NULL, '4', 'petrol', 14900402, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS E300 AVANTGARDE SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS E300 COUPE SPORT', '5BA-238383C', 'AT', '2WD', 2000, 'COUPE', NULL, '2', 'petrol', 15826515, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS E300 COUPE SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS E300 EXCLUSIVE AMG LINE PACKAGE', NULL, 'AT', '2WD', 2000, 'SEDAN', NULL, '5', 'hybrid', 21923063, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS E300 EXCLUSIVE AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS E300 SPORT', NULL, 'AT', '2WD', 2000, 'SEDAN', NULL, '5', 'petrol', 14317412, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS E300 SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS E450 4MATIC CABRIOLET SPORTS', 'DBA-238468', 'AT', '4WD', 3000, 'SEDAN', NULL, '5', 'petrol', 26502325, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS E450 4MATIC CABRIOLET SPORTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS E450 4MATIC COUPE SPORT', NULL, 'AT', '4WD', 3000, 'COUPE', NULL, '2', 'petrol', 17866876, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS E450 4MATIC COUPE SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS E450 4MATIC EXCLUSIVE', NULL, 'AT', '4WD', 3000, 'SEDAN', NULL, '5', 'hybrid', 18264092, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS E450 4MATIC EXCLUSIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS STATION WAGON E220D STATIONWAGON AVANTGARDE AMG LINE PACKAGE', NULL, 'AT', '2WD', 2000, 'WAGON', NULL, '6', 'diesel', 15516503, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS STATION WAGON E220D STATIONWAGON AVANTGARDE AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS STATION WAGON E220D STATIONWAGON AVANTGARDE SPORTS LEATHER VERSION', NULL, 'AT', '2WD', 2000, 'WAGON', NULL, '6', 'diesel', 12014284, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS STATION WAGON E220D STATIONWAGON AVANTGARDE SPORTS LEATHER VERSION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS STATION WAGON E220D STATIONWAGON SPORT', NULL, 'AT', '2WD', 2000, 'WAGON', NULL, '6', 'diesel', 12543441, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS STATION WAGON E220D STATIONWAGON SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS STATION WAGON E250 STATIONWAGON AVANTGARDE SPORTS LEATHER VERSION', NULL, 'AT', '2WD', 2000, 'WAGON', NULL, '6', 'petrol', 13154136, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS STATION WAGON E250 STATIONWAGON AVANTGARDE SPORTS LEATHER VERSION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS STATION WAGON E300 STATIONWAGON AVANTGARDE SPORT', NULL, 'AT', '2WD', 2000, 'WAGON', NULL, '6', 'hybrid', 11839922, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS STATION WAGON E300 STATIONWAGON AVANTGARDE SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS STATION WAGON E450 4MATIC STATIONWAGON EXCLUSIVE', '5AA-213259', 'AT', '4WD', 3000, 'WAGON', NULL, '6', 'hybrid', 21106968, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS STATION WAGON E450 4MATIC STATIONWAGON EXCLUSIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS STATIONWAGON E200 4MATIC STATIONWAGON AVANTGARDE AMG LINE', NULL, 'AT', '2WD', 1500, 'WAGON', NULL, '6', 'hybrid', 14798378, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS STATIONWAGON E200 4MATIC STATIONWAGON AVANTGARDE AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS STATIONWAGON E200 4MATIC STATIONWAGON LAUREUS EDITION', '4AA-213278C', 'AT', '2WD', 1500, 'WAGON', NULL, '5', 'hybrid', 13953311, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS STATIONWAGON E200 4MATIC STATIONWAGON LAUREUS EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS STATIONWAGON E200 STATIONWAGON AVANTGARDE', NULL, 'AT', '2WD', 2000, 'WAGON', NULL, '6', 'petrol', 7166595, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS STATIONWAGON E200 STATIONWAGON AVANTGARDE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS STATIONWAGON E200 STATIONWAGON AVANTGARDE AMG LINE PACKAGE', NULL, 'AT', '2WD', 2000, 'WAGON', NULL, '6', 'hybrid', 18474578, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS STATIONWAGON E200 STATIONWAGON AVANTGARDE AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS STATIONWAGON E200 STATIONWAGON AVANTGARDE SPORTS LEATHER VERSION', NULL, 'AT', '2WD', 2000, 'WAGON', NULL, '6', 'petrol', 10472393, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS STATIONWAGON E200 STATIONWAGON AVANTGARDE SPORTS LEATHER VERSION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS STATIONWAGON E200 STATIONWAGON SPORT', '4AA-213277C', 'AT', '2WD', 1500, 'WAGON', NULL, '6', 'hybrid', 8882316, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS STATIONWAGON E200 STATIONWAGON SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS STATIONWAGON E220D STATIONWAGON AVANTGARDE', NULL, 'AT', '4WD', 2000, 'WAGON', NULL, '6', 'diesel', 10723055, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS STATIONWAGON E220D STATIONWAGON AVANTGARDE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS STATIONWAGON E220D STATIONWAGON AVANTGARDE AMG LINE', NULL, 'AT', '2WD', 2000, 'WAGON', NULL, '5', 'diesel', 9185499, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS STATIONWAGON E220D STATIONWAGON AVANTGARDE AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS STATIONWAGON E220D STATIONWAGON AVANTGARDE AMG LINE PACKAGE', NULL, 'AT', '2WD', 2000, 'WAGON', NULL, '5', 'diesel', 16757823, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS STATIONWAGON E220D STATIONWAGON AVANTGARDE AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS STATIONWAGON E220D STATIONWAGON AVANTGARDE SPORTS LEATHER VERSION', NULL, 'AT', '2WD', 2000, 'WAGON', NULL, '5', 'diesel', 12975427, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS STATIONWAGON E220D STATIONWAGON AVANTGARDE SPORTS LEATHER VERSION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS STATIONWAGON E220D STATIONWAGON SPORT', NULL, 'AT', '2WD', 2000, 'WAGON', NULL, '5', 'diesel', 13546916, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS STATIONWAGON E220D STATIONWAGON SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS STATIONWAGON E250 STATIONWAGON AVANTGARDE SPORTS LEATHER VERSION', NULL, 'AT', '2WD', 2000, 'WAGON', NULL, '5', 'petrol', 14206467, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS STATIONWAGON E250 STATIONWAGON AVANTGARDE SPORTS LEATHER VERSION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS STATIONWAGON E300 STATIONWAGON AVANTGARDE SPORT', NULL, 'AT', '2WD', 2000, 'WAGON', NULL, '5', 'hybrid', 12787116, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS STATIONWAGON E300 STATIONWAGON AVANTGARDE SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS STATIONWAGON E400 4MATIC STATIONWAGON EXCLUSIVE', NULL, 'AT', '2WD', 3500, 'WAGON', NULL, '5', 'petrol', 15259039, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS STATIONWAGON E400 4MATIC STATIONWAGON EXCLUSIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'E-CLASS STATIONWAGON E450 4MATIC STATIONWAGON EXCLUSIVE', '5AA-213259', 'AT', '4WD', 3000, 'WAGON', NULL, '5', 'hybrid', 22795525, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'E-CLASS STATIONWAGON E450 4MATIC STATIONWAGON EXCLUSIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'EQA EQA250', NULL, 'AT', '2WD', NULL, 'SUV', NULL, '5', 'electric', 7186280, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'EQA EQA250'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'EQA EQA250 AMG LEATHER EXCLUSIVE PACKAGE', NULL, 'AT', '2WD', NULL, 'SUV', NULL, '5', 'electric', 10692726, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'EQA EQA250 AMG LEATHER EXCLUSIVE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'EQA EQA250 AMG LINE', NULL, 'AT', '2WD', NULL, 'SUV', NULL, '5', 'electric', 11888051, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'EQA EQA250 AMG LINE'
);