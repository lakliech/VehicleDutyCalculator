INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS', NULL, 'AT', '2WD', 4000, 'SEDAN', NULL, '5', 'petrol', 24642303, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S400D 4 MATIC', NULL, 'AT', '2WD', 3000, 'SEDAN', NULL, '5', 'diesel', 21376138, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S400D 4 MATIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S400D 4 MATIC', NULL, 'AT', '2WD', 4000, 'SEDAN', NULL, '4', 'petrol', 24718359, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S400D 4 MATIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S400D 4 MATIC AMG LINE', NULL, 'AT', '4WD', 3000, 'SEDAN', NULL, '5', 'diesel', 22433660, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S400D 4 MATIC AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S400D 4 MATIC AMG LINE', NULL, 'AT', '2WD', 3000, 'SEDAN', NULL, '4', 'diesel', 19792720, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S400D 4 MATIC AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S400D 4 MATIC AMG LINE', NULL, 'AT', '4WD', 3000, 'CONVERTIBLE', NULL, '2', 'diesel', 20103175, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S400D 4 MATIC AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S400D 4 MATIC AMG LINE PACKAGE', NULL, 'AT', '4WD', 3000, 'SEDAN', NULL, '4', 'diesel', 20771908, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S400D 4 MATIC AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S400D SPORTS LIMITED', 'LDA-222034', 'AT', '2WD', 3000, 'SEDAN', NULL, '5', 'diesel', 19899794, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S400D SPORTS LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S400D SPORTS LIMITED', 'LDA-222034', 'AT', '2WD', 3000, 'CONVERTIBLE', NULL, '2', 'diesel', 21191236, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S400D SPORTS LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S450 AMG LINE', NULL, 'AT', '2WD', 3000, 'SEDAN', NULL, '4', 'diesel', 18425735, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S450 AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S450 EXCLUSIVE AMG LINE', NULL, 'AT', '2WD', 3000, 'SEDAN', NULL, '5', 'hybrid', 24301650, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S450 EXCLUSIVE AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S450 EXCLUSIVE AMG LINE', NULL, 'AT', '2WD', 3000, 'SEDAN', NULL, '5', 'hybrid', 26132335, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S450 EXCLUSIVE AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S450D 4 MATIC AMG LINE PACKAGE', NULL, 'AT', '4WD', 3000, 'SEDAN', NULL, '5', 'hybrid', 25619889, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S450D 4 MATIC AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S450D 4 MATIC AMG LINE PACKAGE', NULL, 'AT', '2WD', 3000, 'SEDAN', NULL, '4', 'hybrid', 22501528, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S450D 4 MATIC AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S500 4 MATIC', NULL, 'AT', '4WD', 3000, 'SEDAN', NULL, '5', 'hybrid', 24862144, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S500 4 MATIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S500 4 MATIC AMG LINE', NULL, 'AT', '4WD', 3000, 'SEDAN', NULL, '5', 'hybrid', 26045516, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S500 4 MATIC AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S500 4 MATIC LONG AMG LINE', NULL, 'AT', '4WD', 3000, 'SEDAN', NULL, '4', 'hybrid', 23170311, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S500 4 MATIC LONG AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S500 4 MATIC LONG FIRST EDITION', '5AA-223163', 'AT', '4WD', 3000, 'SEDAN', NULL, '5', 'hybrid', 25774586, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S500 4 MATIC LONG FIRST EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S500 4 MATIC LONG FIRST EDITION AMG LINE', '5AA-223163', 'AT', '4WD', 3000, 'SEDAN', NULL, '4', 'hybrid', 26632015, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S500 4 MATIC LONG FIRST EDITION AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S550 CABRIOLET', 'DBA-217482', 'AT', '2WD', 4700, 'CONVERTIBLE', NULL, '2', 'petrol', 47948048, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S550 CABRIOLET'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S550 CABRIOLET', 'DBA-217482', 'AT', '4WD', 3000, 'SEDAN', NULL, '4', 'hybrid', 43804944, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S550 CABRIOLET'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S560 COUPE AMG LINE', 'DBA-217383C', 'AT', '2WD', 4000, 'COUPE', NULL, '2', 'petrol', 33032267, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S560 COUPE AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S560 COUPE AMG LINE', 'DBA-217383C', 'AT', '2WD', 4000, 'COUPE', NULL, '4', 'petrol', 35520584, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S560 COUPE AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S560 LONG', NULL, 'AT', '2WD', 4000, 'COUPE', NULL, '4', 'petrol', 33134218, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S560 LONG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S560 LONG', NULL, 'AT', '2WD', 4000, 'SEDAN', NULL, '5', 'petrol', 22830917, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S560 LONG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S560 LONG AMG LINE', NULL, 'AT', '2WD', 4000, 'SEDAN', NULL, '4', 'petrol', 21296742, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S560 LONG AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S560 LONG CHAUFFEURED LIMITED', 'DBA-222183', 'AT', '2WD', 4000, 'SEDAN', NULL, '4', 'petrol', 25823835, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S560 LONG CHAUFFEURED LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S560 LONG SPORTS LIMITED', 'DBA-222183', 'AT', '2WD', 4000, 'SEDAN', NULL, '5', 'petrol', 23027548, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S560 LONG SPORTS LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S560E LONG', 'DLA-222173', 'AT', '2WD', 3000, 'SEDAN', NULL, '5', 'hybrid', 23529083, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S560E LONG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S560E LONG', 'DLA-222173', 'AT', '2WD', 4000, 'SEDAN', NULL, '4', 'petrol', 23098621, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S560E LONG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S560E LONG', NULL, 'AT', '2WD', 3000, 'SEDAN', NULL, '5', 'hybrid', 25942183, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S560E LONG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S580 4 MATIC AMG LINE', NULL, 'AT', '4WD', 4000, 'SEDAN', NULL, '5', 'diesel', 28535821, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S580 4 MATIC AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S580 4 MATIC AMG LINE', NULL, 'AT', '2WD', 3000, 'SEDAN', NULL, '4', 'hybrid', 21786188, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S580 4 MATIC AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S580 4 MATIC AMG LINE', NULL, 'AT', '4WD', 4000, 'SEDAN', NULL, '5', 'hybrid', 23393523, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S580 4 MATIC AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'S-CLASS S580 4 MATIC LONG AMG LINE', NULL, 'AT', '4WD', 4000, 'SEDAN', NULL, '5', 'hybrid', 22992043, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'S-CLASS S580 4 MATIC LONG AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'SL SL400', NULL, 'AT', '2WD', 3000, 'CONVERTIBLE', NULL, '2', 'petrol', 31195476, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'SL SL400'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'SL SL400', NULL, 'AT', '4WD', 4000, 'SEDAN', NULL, '4', 'diesel', 26422057, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'SL SL400'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'SLC SLC180 SPORTS', NULL, 'AT', '2WD', 1600, 'CONVERTIBLE', NULL, '2', 'petrol', 14057411, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'SLC SLC180 SPORTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'SLC SLC180 SPORTS FINAL EDITION', NULL, 'AT', '2WD', 1600, 'CONVERTIBLE', NULL, '2', 'petrol', 7953935, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'SLC SLC180 SPORTS FINAL EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'TRANSPORTER 207D', NULL, 'AT', '2WD', 2400, 'VAN', NULL, '7', 'diesel', 8101114, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'TRANSPORTER 207D'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'V-CLASS', 'LDA-447811', 'AT', '2WD', 2200, 'VAN', NULL, '7', 'diesel', 17541525, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'V-CLASS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'V-CLASS V 220 D EXCLUSIVE LONG PLATINUM SUITE', NULL, 'AT', '2WD', 3000, 'CONVERTIBLE', NULL, '2', 'petrol', 28884700, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'V-CLASS V 220 D EXCLUSIVE LONG PLATINUM SUITE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'V-CLASS V 220 D EXCLUSIVE LONG PLATINUM SUITE', NULL, 'AT', '2WD', 2000, 'VAN', NULL, '7', 'diesel', 17675361, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'V-CLASS V 220 D EXCLUSIVE LONG PLATINUM SUITE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'V-CLASS V220D', 'LDA-447811', 'AT', '2WD', 2000, 'WAGON', NULL, '6', 'diesel', 19235710, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'V-CLASS V220D'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'V-CLASS V220D', 'LDA-447811', 'AT', '2WD', 2200, 'VAN', NULL, '7', 'diesel', 20025057, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'V-CLASS V220D'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'V-CLASS V220D AVANTGARDE', NULL, 'AT', '2WD', 2200, 'WAGON', NULL, '6', 'diesel', 18679706, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'V-CLASS V220D AVANTGARDE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'V-CLASS V220D AVANTGARDE', NULL, 'AT', '2WD', 2200, 'VAN', NULL, '7', 'diesel', 13831476, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'V-CLASS V220D AVANTGARDE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'V-CLASS V220D AVANTGARDE AMG LINE', NULL, 'AT', '2WD', 2200, 'VAN', NULL, '7', 'diesel', 15559104, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'V-CLASS V220D AVANTGARDE AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'V-CLASS V220D AVANTGARDE AMG LINE PACKAGE', NULL, 'AT', '2WD', 2200, 'WAGON', NULL, '6', 'diesel', 15482571, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'V-CLASS V220D AVANTGARDE AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'V-CLASS V220D AVANTGARDE EXTRA LONG BLACK SUITE', NULL, 'AT', '2WD', 2000, 'VAN', NULL, '7', 'diesel', 20726438, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'V-CLASS V220D AVANTGARDE EXTRA LONG BLACK SUITE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'V-CLASS V220D AVANTGARDE LONG', 'LDA-447811', 'AT', '2WD', 2000, 'WAGON', NULL, '6', 'diesel', 19064029, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'V-CLASS V220D AVANTGARDE LONG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'V-CLASS V220D AVANTGARDE LONG', 'LDA-447811', 'AT', '2WD', 2200, 'VAN', NULL, '7', 'diesel', 15890129, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'V-CLASS V220D AVANTGARDE LONG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'V-CLASS V220D AVANTGARDE LONG AMG LINE', NULL, 'AT', '2WD', 2200, 'WAGON', NULL, '6', 'diesel', 14446572, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'V-CLASS V220D AVANTGARDE LONG AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'V-CLASS V220D AVANTGARDE LONG AMG LINE', NULL, 'AT', '2WD', 2200, 'VAN', NULL, '7', 'diesel', 19975082, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'V-CLASS V220D AVANTGARDE LONG AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'V-CLASS V220D AVANTGARDE LONG AMG LINE PACKAGE', NULL, 'AT', '2WD', 2200, 'WAGON', NULL, '6', 'diesel', 18633066, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'V-CLASS V220D AVANTGARDE LONG AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'V-CLASS V220D AVANTGARDE LONG AMG LINE PACKAGE', NULL, 'AT', '2WD', 2000, 'VAN', NULL, '7', 'diesel', 13582768, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'V-CLASS V220D AVANTGARDE LONG AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'V-CLASS V220D MARCO POLO HORIZON', NULL, 'AT', '2WD', 2000, 'WAGON', NULL, '6', 'diesel', 14781843, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'V-CLASS V220D MARCO POLO HORIZON'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'V-CLASS V220D MARCO POLO HORIZON', NULL, 'AT', '2WD', 2200, 'VAN', NULL, '7', 'diesel', 16711814, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'V-CLASS V220D MARCO POLO HORIZON'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'V-CLASS V220D SPORTS', 'LDA-447811', 'AT', '2WD', 2200, 'WAGON', NULL, '6', 'diesel', 18706664, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'V-CLASS V220D SPORTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'V-CLASS V220D SPORTS', 'LDA-447811', 'AT', '2WD', 2200, 'VAN', NULL, '7', 'diesel', 14358011, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'V-CLASS V220D SPORTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'V-CLASS V260 AVANTGARDE LONG', 'ABA-447813', 'AT', '2WD', 2000, 'VAN', NULL, '7', 'petrol', 18024194, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'V-CLASS V260 AVANTGARDE LONG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLA 35 4MATIC', NULL, 'DCT - 8G', 'AWD', 1991, 'SUV', '1750', '5', 'petrol', 9167437, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLA 35 4MATIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLA 35 4MATIC PREMIUM', NULL, 'DCT - 8G', 'AWD', 1991, 'SUV', '1750', '5', 'petrol', 9693516, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLA 35 4MATIC PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLA 35 4MATIC PREMIUM PLUS', NULL, 'DCT - 8G', 'AWD', 1991, 'SUV', '1750', '5', 'petrol', 10521563, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLA 35 4MATIC PREMIUM PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLA 45 S 4MATIC +', 'CBA-156952', 'DCT - 8G', 'AWD', 1991, 'SUV', '1807', '5', 'petrol', 12363888, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLA 45 S 4MATIC +'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLA 45 S 4MATIC + PLUS', NULL, 'DCT - 8G', 'AWD', 1991, 'SUV', '1807', '5', 'petrol', 13630684, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLA 45 S 4MATIC + PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLA 45 S 4MATIC + PLUS(NIGHT PKG)', NULL, 'DCT - 8G', 'AWD', 1991, 'SUV', '1807', '5', 'petrol', 14893272, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLA 45 S 4MATIC + PLUS(NIGHT PKG)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES-BENZ', 'ACTROS 3340S', '3340S', 'AT', '6×4', 12800, 'TRUCK', NULL, '2', 'diesel', 25076750, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES-BENZ' AND model = 'ACTROS 3340S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES-BENZ', 'ACTROS 2640LS', '2640LS', 'AT', '6×4', 12800, 'TRUCK', NULL, '2', 'diesel', 23936897, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES-BENZ' AND model = 'ACTROS 2640LS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES-BENZ', 'ACTROS 3340LS', '3340LS', 'AT', '6×4', 12800, 'TRUCK', NULL, '2', 'diesel', 25076750, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES-BENZ' AND model = 'ACTROS 3340LS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES-BENZ', 'ACTROS 3341', '3341', 'AT', '6×4', 12800, 'TRUCK', NULL, '2', 'diesel', 25532690, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES-BENZ' AND model = 'ACTROS 3341'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES-BENZ', 'ACTROS 4148', '4148', 'AT', '8×4', 15900, 'TRUCK', NULL, '2', 'diesel', 27356454, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES-BENZ' AND model = 'ACTROS 4148'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES-BENZ', 'ACTROS 5044', '5044', 'AT', '8×4', 15900, 'TRUCK', NULL, '2', 'diesel', 28496306, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES-BENZ' AND model = 'ACTROS 5044'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES-BENZ', 'ACTROS 2653', '2653', 'AT', '6×4', 15600, 'TRUCK', NULL, '2', 'diesel', 26216602, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES-BENZ' AND model = 'ACTROS 2653'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES-BENZ', 'ACTROS 1845', '1845', 'AT', '4×2', 12800, 'TRUCK', NULL, '2', 'diesel', 22797045, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES-BENZ' AND model = 'ACTROS 1845'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES-BENZ', 'ACTROS 2545', '2545', 'AT', '6×2', 12800, 'TRUCK', NULL, '2', 'diesel', 23936897, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES-BENZ' AND model = 'ACTROS 2545'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES-BENZ', 'ACTROS 3345', '3345', 'AT', '6×4', 12800, 'TRUCK', NULL, '2', 'diesel', 25076750, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES-BENZ' AND model = 'ACTROS 3345'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES-BENZ', 'ACTROS 4163', '4163', 'AT', '8×4', 15600, 'TRUCK', NULL, '2', 'diesel', 29636159, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES-BENZ' AND model = 'ACTROS 4163'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES-BENZ', 'ACTROS 2651', '2651', 'AT', '6×4', 15600, 'TRUCK', NULL, '2', 'diesel', 26216602, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES-BENZ' AND model = 'ACTROS 2651'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES-BENZ', 'ACTROS 1848', '1848', 'AT', '4×2', 12800, 'TRUCK', NULL, '2', 'diesel', 23252986, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES-BENZ' AND model = 'ACTROS 1848'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES-BENZ', 'ACTROS 2548', '2548', 'AT', '6×2', 12800, 'TRUCK', NULL, '2', 'diesel', 24392838, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES-BENZ' AND model = 'ACTROS 2548'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES-BENZ', 'ACTROS 3348', '3348', 'AT', '6×4', 12800, 'TRUCK', NULL, '2', 'diesel', 25532690, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES-BENZ' AND model = 'ACTROS 3348'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MINI', 'COOPER D CROSSOVER ALL4 CORNWALL EDITION', 'LDA-YT20', 'AT', '4WD', 1500, 'WAGON', NULL, NULL, 'diesel', 9827317, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MINI' AND model = 'COOPER D CROSSOVER ALL4 CORNWALL EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MINI', 'COOPER', 'WMWXR320X0TL9', 'AT', '2WD', 1500, 'WAGON', NULL, NULL, 'diesel', 6008800, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MINI' AND model = 'COOPER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MINI', 'COOPER 60 YEARS EDITION', 'MWMXU720702L0', 'AT', '2WD', 1500, 'WAGON', NULL, NULL, 'petrol', 11092979, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MINI' AND model = 'COOPER 60 YEARS EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MINI', 'COOPER CONVERTIBLE', 'WMWWJ320803G4', 'MT', '2WD', 1500, 'WAGON', NULL, NULL, 'petrol', 9249470, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MINI' AND model = 'COOPER CONVERTIBLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MINI', 'COOPER CROSSOVER', '3BA-YW15', 'AT', '2WD', 1500, 'WAGON', NULL, NULL, 'diesel', 7624931, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MINI' AND model = 'COOPER CROSSOVER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MINI', 'COOPER D', '3DA-XY15MW', 'AT', '2WD', 1500, 'WAGON', NULL, NULL, 'diesel', 6784654, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MINI' AND model = 'COOPER D'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MINI', 'COOPER D CLUBMAN', '3DA-BB20M', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'diesel', 9009899, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MINI' AND model = 'COOPER D CLUBMAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MINI', 'COOPER D CROSSOVER', 'WMWYT920103H9', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'petrol', 9280825, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MINI' AND model = 'COOPER D CROSSOVER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MINI', 'COOPER D CROSSOVER UNTAMED EDITION', '42BT20-3P5', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'diesel', 9535005, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MINI' AND model = 'COOPER D CROSSOVER UNTAMED EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MINI', 'COOPER D PREMIUM PLUS PACKAGE CLASSIC TRIM', 'WMW22DJ0402U1', 'AT', '2WD', 1500, 'WAGON', NULL, NULL, 'diesel', 6376714, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MINI' AND model = 'COOPER D PREMIUM PLUS PACKAGE CLASSIC TRIM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MINI', 'COOPER S CLASSIC TRIM', '22GD20-WMW22GD0902W2', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'petrol', 6510351, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MINI' AND model = 'COOPER S CLASSIC TRIM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MINI', 'COOPER S CLUBMAN', 'WMWLV720902L4', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'petrol', 8002420, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MINI' AND model = 'COOPER S CLUBMAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MINI', 'COOPER S CONVERTIBLE', 'WMWWJ520603G4', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'petrol', 11658156, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MINI' AND model = 'COOPER S CONVERTIBLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MINI', 'COOPER S PREMIUM PLUS PACKAGE CLASSIC TRIM', 'WMWXR320X0TL9', NULL, '2WD', 2000, 'WAGON', NULL, NULL, 'diesel', 7460755, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MINI' AND model = 'COOPER S PREMIUM PLUS PACKAGE CLASSIC TRIM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MINI', 'COOPER SD', 'WMWXT720802H1', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'diesel', 4671585, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MINI' AND model = 'COOPER SD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MINI', 'COOPER SD CLUBMAN', '3DA-BB20M', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'diesel', 9783028, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MINI' AND model = 'COOPER SD CLUBMAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MINI', 'COOPER SD CROSSOVER ALL4', '3DA-42BT20', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'petrol', 10511619, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MINI' AND model = 'COOPER SD CROSSOVER ALL4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MINI', 'COUNTRYMAN D CLASSIC TRIM', 'WMW62GA0407N7', 'AT', '2WD', 1000, 'WAGON', NULL, NULL, 'diesel', 8427123, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MINI' AND model = 'COUNTRYMAN D CLASSIC TRIM'
);