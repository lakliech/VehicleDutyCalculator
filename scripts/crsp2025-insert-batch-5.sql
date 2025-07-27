INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X3', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'diesel', 16799358, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X3'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X3 20 X DRIVE X LINE', '3AA-32GP20', 'AT', '4WD', 2000, 'SUV', NULL, '5', 'diesel', 16048045, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X3 20 X DRIVE X LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X3 M40D', NULL, 'AT', '4WD', 2000, 'COUPE', NULL, '2', 'petrol', 15913952, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X3 M40D'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X3 M40D M SPORT EDITION', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'hybrid', 17333210, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X3 M40D M SPORT EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X3 MIDNIGHT EDITION', 'LDA-TX20', 'AT', '4WD', 2000, 'SUV', NULL, '5', 'petrol', 15000127, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X3 MIDNIGHT EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X3 X DRIVE 20D', '3DA-UZ20', 'AT', '4WD', 2000, 'SUV', NULL, '5', 'diesel', 14665106, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X3 X DRIVE 20D'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X3 X DRIVE 20D M SPORT', NULL, 'AT', '4WD', 3000, 'COUPE', NULL, '2', 'petrol', 11022741, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X3 X DRIVE 20D M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X3 X DRIVE 20D M SPORT', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'hybrid', 11154898, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X3 X DRIVE 20D M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X3 X DRIVE 20D X LINE', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'hybrid', 11894078, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X3 X DRIVE 20D X LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X3 X DRIVE 20D X LINE HI-LINE PACKAGE', NULL, 'AT', '4WD', 2000, 'COUPE', NULL, '2', 'petrol', 11790518, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X3 X DRIVE 20D X LINE HI-LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X3 X DRIVE 20I', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'diesel', 9956530, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X3 X DRIVE 20I'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X3 X DRIVE 30E M SPORT EDITION JOY+', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'diesel', 12917357, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X3 X DRIVE 30E M SPORT EDITION JOY+'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X4 M40I', 'CBA-UJ30', 'AT', '4WD', 2000, 'COUPE', NULL, '2', 'petrol', 28302902, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X4 M40I'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X4 X DRIVE 20D M SPORT', NULL, 'AT', '4WD', 2000, 'COUPE', NULL, '2', 'petrol', 13585960, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X4 X DRIVE 20D M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X4 X DRIVE 28I M SPORT', NULL, 'AT', '4WD', 2000, 'COUPE', NULL, '2', 'diesel', 10366439, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X4 X DRIVE 28I M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X4 X DRIVE 30I M SPORT', NULL, 'AT', '4WD', 1500, 'COUPE', NULL, '2', 'petrol', 14693330, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X4 X DRIVE 30I M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X5 LIMITED BLACK', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'hybrid', 17956847, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X5 LIMITED BLACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X5 LIMITED WHITE', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'hybrid', 20305796, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X5 LIMITED WHITE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X5 X DRIVE 35D', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'diesel', 13115778, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X5 X DRIVE 35D'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X5 X DRIVE 35D EDITION X', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'diesel', 22313505, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X5 X DRIVE 35D EDITION X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X5 X DRIVE 35D M-SPORT', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'hybrid', 19423727, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X5 X DRIVE 35D M-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X5 X DRIVE 35D M-SPORT HI-LINE PACKAGE', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'diesel', 15103164, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X5 X DRIVE 35D M-SPORT HI-LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X5 X DRIVE 35D PLEASURE3 EDITION', '3CA-JU8230A', 'AT', '4WD', 4400, 'SUV', NULL, '5', 'petrol', 20533492, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X5 X DRIVE 35D PLEASURE3 EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X5 X DRIVE 40D M-SPORT', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'hybrid', 18759142, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X5 X DRIVE 40D M-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X5 X DRIVE 45E', '3LA-TA30', 'AT', '4WD', 3000, 'SUV', NULL, '5', 'hybrid', 15358361, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X5 X DRIVE 45E'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X5 X DRIVE 50E M-SPORT', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'hybrid', 21795426, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X5 X DRIVE 50E M-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X5 X DRIVE 50I M-SPORT', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'hybrid', 20917300, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X5 X DRIVE 50I M-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X6 M50I', '3BA-CY44', 'AT', '4WD', 3000, 'SUV', NULL, '5', 'hybrid', 21249744, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X6 M50I'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X6 X DRIVE 35D', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'hybrid', 24063792, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X6 X DRIVE 35D'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X6 X DRIVE 35D M SPORT', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'diesel', 19913496, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X6 X DRIVE 35D M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X6 X DRIVE 35D M SPORT HI-LINE PACKAGE', NULL, 'AT', '4WD', 4400, 'SUV', NULL, '5', 'petrol', 17871916, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X6 X DRIVE 35D M SPORT HI-LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X6 X DRIVE 35I M SPORT', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'diesel', 25521775, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X6 X DRIVE 35I M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X7 M50I', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'diesel', 30284518, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X7 M50I'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X7 M60I X DRIVE', NULL, 'AT', '4WD', 4400, 'SUV', NULL, '5', 'petrol', 34832339, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X7 M60I X DRIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X7 X DRIVE 35D DESIGN PURE EXCELLENCE', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'hybrid', 30201475, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X7 X DRIVE 35D DESIGN PURE EXCELLENCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X7 X DRIVE 35D M SPORT', NULL, 'AT', '2WD', 4400, 'SUV', NULL, '5', 'petrol', 25691637, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X7 X DRIVE 35D M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X7 X DRIVE 40D EXCELLENCE', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'diesel', 21455702, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X7 X DRIVE 40D EXCELLENCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X7 X DRIVE 40D M SPORT', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'petrol', 27381764, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X7 X DRIVE 40D M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'Z4 M40I', NULL, 'AT', '2WD', 3000, 'SUV', NULL, '5', 'diesel', 24466082, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'Z4 M40I'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'Z4 S DRIVE 20I', NULL, 'AT', '2WD', 3000, 'CONVERTIBLE', NULL, '2', 'petrol', 15690028, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'Z4 S DRIVE 20I'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'Z4 S DRIVE 20I M-SPORT', NULL, 'AT', '2WD', 3000, 'SUV', NULL, '5', 'hybrid', 12102672, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'Z4 S DRIVE 20I M-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'Z4 S DRIVE 20I M-SPORT EDITION SUNRISE', NULL, 'AT', '2WD', 2000, 'CONVERTIBLE', NULL, '2', 'petrol', 9640325, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'Z4 S DRIVE 20I M-SPORT EDITION SUNRISE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'Z4 S DRIVE 20I SPORT', NULL, 'AT', '2WD', 4400, 'SUV', NULL, '5', 'hybrid', 15595951, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'Z4 S DRIVE 20I SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BRABUS', '900', 'GLE 63 S COUPÉ', 'AT', 'AWD', 4500, 'SUV', NULL, '5', 'petrol', 137672239, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BRABUS' AND model = '900'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BRABUS', '900 DEEP BLUE', 'GLS 63 4MATIC', 'AT', 'AWD', 4500, 'SUV', NULL, '5', 'petrol', 132479051, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BRABUS' AND model = '900 DEEP BLUE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BRABUS', '900 MASTERPIECE BICHROMATIC', 'GLS 63 S 4MATIC', 'AT', 'AWD', 4500, 'SUV', NULL, '5', 'petrol', 161576519, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BRABUS' AND model = '900 MASTERPIECE BICHROMATIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BRABUS', '900 ROCKET EDITION', 'GLE 63 S 4MATIC+', 'AT', 'AWD', 4500, 'SUV', NULL, '5', 'petrol', 148207580, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BRABUS' AND model = '900 ROCKET EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BRABUS', '900 SUPERBLACK', 'W463A', 'AT', 'AWD', 4500, 'SUV', NULL, '5', 'petrol', 200060404, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BRABUS' AND model = '900 SUPERBLACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BRABUS', '900 SUPERBLACK', 'GLS 63 4MATIC+', 'AT', 'AWD', 4500, 'SUV', NULL, '5', 'petrol', 144430865, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BRABUS' AND model = '900 SUPERBLACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BRABUS', '900 XLP', 'W463A', 'AT', 'AWD', 4500, 'PICKUP', NULL, '5', 'petrol', 271393393, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BRABUS' AND model = '900 XLP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BYD', 'ATTO 3', NULL, 'AT', 'FWD', NULL, 'SUV', NULL, NULL, 'electric', 14434329, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BYD' AND model = 'ATTO 3'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BYD', 'TANG', NULL, 'AT', 'AWD', NULL, 'SUV', NULL, NULL, 'electric', 27128484, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BYD' AND model = 'TANG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BYD', 'DOLPHIN 60.4 KWH', NULL, 'AT', 'FWD', NULL, 'HATCHBACK', NULL, NULL, 'electric', 10743922, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BYD' AND model = 'DOLPHIN 60.4 KWH'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BYD', 'SEAL 82.5 AWD EXCELLENCE', NULL, 'AT', 'AWD', NULL, 'SEDAN', NULL, NULL, 'electric', 16606019, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BYD' AND model = 'SEAL 82.5 AWD EXCELLENCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BYD', 'HAN', NULL, 'AT', 'FWD', NULL, 'SEDAN', NULL, NULL, 'electric', 22477886, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BYD' AND model = 'HAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BYD', 'SEAL 82.5 RWD DESIGN', NULL, 'AT', 'RWD', NULL, 'SEDAN', NULL, NULL, 'electric', 14651986, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BYD' AND model = 'SEAL 82.5 RWD DESIGN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BYD', 'DOLPHIN 44.9 ACTIVE', NULL, 'AT', 'FWD', NULL, 'HATCHBACK', NULL, NULL, 'electric', 9766905, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BYD' AND model = 'DOLPHIN 44.9 ACTIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BYD', 'DOLPHIN 44.9 BOOST', NULL, 'AT', 'FWD', NULL, 'HATCHBACK', NULL, NULL, 'electric', 10743922, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BYD' AND model = 'DOLPHIN 44.9 BOOST'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BYD', 'SEALION 7 91.3 AWD EXCELLENCE', NULL, 'AT', 'AWD', NULL, 'SUV', NULL, NULL, 'electric', 16809971, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BYD' AND model = 'SEALION 7 91.3 AWD EXCELLENCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BYD', 'TANG FLAGSHIP', NULL, 'AT', 'AWD', NULL, 'SUV', NULL, NULL, 'electric', 19837704, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BYD' AND model = 'TANG FLAGSHIP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BYD', 'SEALION 7 82.5 RWD COMFORT', NULL, 'AT', 'RWD', NULL, 'SUV', NULL, NULL, 'electric', 13675377, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BYD' AND model = 'SEALION 7 82.5 RWD COMFORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BYD', 'SEAL U 87 KWH DESIGN', NULL, 'AT', 'FWD', NULL, 'SUV', NULL, NULL, 'electric', 12820488, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BYD' AND model = 'SEAL U 87 KWH DESIGN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BYD', 'SEAL U 71.8 COMFORT', NULL, 'AT', 'FWD', NULL, 'SUV', NULL, NULL, 'electric', 11965599, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BYD' AND model = 'SEAL U 71.8 COMFORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BYD', 'SEALION 7 82.5 AWD DESIGN', NULL, 'AT', 'AWD', NULL, 'SUV', NULL, NULL, 'electric', 15385156, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BYD' AND model = 'SEALION 7 82.5 AWD DESIGN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BYD', 'ATTO 2', NULL, 'AT', 'FWD', NULL, 'CROSSOVER', NULL, NULL, 'electric', 7292775, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BYD' AND model = 'ATTO 2'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BYD', 'SEAL 61.4 RWD COMFORT', NULL, 'AT', 'RWD', NULL, 'SEDAN', NULL, NULL, 'electric', 9504088, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BYD' AND model = 'SEAL 61.4 RWD COMFORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CADILLAC', 'CT5 PLATINUM', '7BA-A2LL', 'AT', '2WD', 2000, 'SEDAN', NULL, '5', 'petrol', 9472423, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CADILLAC' AND model = 'CT5 PLATINUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CADILLAC', 'CT5 SPORT', '7BA-A2LL', 'AT', '4WD', 2000, 'SEDAN', NULL, '5', 'petrol', 9731136, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CADILLAC' AND model = 'CT5 SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CADILLAC', 'CT6 PLATINUM', NULL, 'AT', '4WD', 3600, 'SEDAN', NULL, '5', 'petrol', 26222456, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CADILLAC' AND model = 'CT6 PLATINUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CADILLAC', 'ESCALADE PLATINUM', '7BA-T1UL', 'AT', '4WD', 6200, 'SUV', NULL, '5', 'petrol', 28251364, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CADILLAC' AND model = 'ESCALADE PLATINUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CADILLAC', 'XT4 PLATINUM', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'petrol', 8410972, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CADILLAC' AND model = 'XT4 PLATINUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CADILLAC', 'XT4 PREMIUM', '7BA-E2UL', 'AT', '4WD', 2000, 'SUV', NULL, '5', 'petrol', 7359601, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CADILLAC' AND model = 'XT4 PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CADILLAC', 'XT4 SPORT', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'petrol', 13756736, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CADILLAC' AND model = 'XT4 SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CADILLAC', 'XT5 CROSSOVER LUXURY', 'ABA-C1UL', 'AT', '4WD', 3600, 'SUV', NULL, '5', 'petrol', 15821438, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CADILLAC' AND model = 'XT5 CROSSOVER LUXURY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CADILLAC', 'XT5 CROSSOVER PLATINUM', NULL, 'AT', '4WD', 3600, 'SUV', NULL, '5', 'petrol', 15308818, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CADILLAC' AND model = 'XT5 CROSSOVER PLATINUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CADILLAC', 'XT5 CROSSOVER URBAN BLACK SPECIAL', 'ABA-C1UL', 'AT', '4WD', 3600, 'SUV', NULL, '5', 'petrol', 16913408, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CADILLAC' AND model = 'XT5 CROSSOVER URBAN BLACK SPECIAL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CADILLAC', 'XT5 MIDNIGHT SKY EDITION', '7BA-C1UL', 'AT', '4WD', 3600, 'SUV', NULL, '5', 'petrol', 16381073, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CADILLAC' AND model = 'XT5 MIDNIGHT SKY EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CADILLAC', 'XT5 PLATINUM SPORT', NULL, 'AT', '4WD', 3600, 'SUV', NULL, '5', 'petrol', 15446831, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CADILLAC' AND model = 'XT5 PLATINUM SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CADILLAC', 'XT5 PREMIUM', 'ABA-C1UL', 'AT', '4WD', 3600, 'SUV', NULL, '5', 'petrol', 12128151, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CADILLAC' AND model = 'XT5 PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CADILLAC', 'XT6 NIGHT CRUISE EDITION', '7BA-C1TL', 'AT', '4WD', 3600, 'SUV', NULL, '5', 'petrol', 19281231, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CADILLAC' AND model = 'XT6 NIGHT CRUISE EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CADILLAC', 'XT6 PLATINUM', NULL, 'AT', '4WD', 3600, 'SUV', NULL, '5', 'petrol', 17163995, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CADILLAC' AND model = 'XT6 PLATINUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHERY', 'TIGGO 4 PRO ULTIMATE', NULL, 'CVT', NULL, 1500, 'SUV', NULL, NULL, 'petrol', 4126209, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHERY' AND model = 'TIGGO 4 PRO ULTIMATE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHERY', 'TIGGO 4 PRO URBAN', NULL, 'CVT', NULL, 1500, 'SUV', NULL, NULL, 'petrol', 3630866, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHERY' AND model = 'TIGGO 4 PRO URBAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHERY', 'TIGGO 4 ULTIMATE', NULL, 'CVT', NULL, 1500, 'SUV', NULL, NULL, 'petrol', 4126209, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHERY' AND model = 'TIGGO 4 ULTIMATE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHERY', 'TIGGO 4 URBAN', NULL, 'CVT', NULL, 1500, 'SUV', NULL, NULL, 'petrol', 3630866, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHERY' AND model = 'TIGGO 4 URBAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHERY', 'TIGGO 7 PRO ELITE 2WD', NULL, '7AT', '2WD', 1600, 'SUV', NULL, NULL, 'petrol', 5349707, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHERY' AND model = 'TIGGO 7 PRO ELITE 2WD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHERY', 'TIGGO 7 PRO SE', NULL, '7AT', NULL, 1600, 'SUV', NULL, NULL, 'petrol', 5041693, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHERY' AND model = 'TIGGO 7 PRO SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHERY', 'TIGGO 7 PRO SE+', NULL, '7AT', NULL, 1600, 'SUV', NULL, NULL, 'petrol', 5762192, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHERY' AND model = 'TIGGO 7 PRO SE+'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHERY', 'TIGGO 7 PRO ULTIMATE AWD', NULL, '7AT', 'AWD', 1600, 'SUV', NULL, NULL, 'petrol', 5666726, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHERY' AND model = 'TIGGO 7 PRO ULTIMATE AWD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHERY', 'TIGGO 7 PRO URBAN 2WD', NULL, '7AT', '2WD', 1600, 'SUV', NULL, NULL, 'petrol', 4676040, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHERY' AND model = 'TIGGO 7 PRO URBAN 2WD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHERY', 'TIGGO 8 PRO MAX ELITE 2WD', NULL, '7AT', '2WD', 2000, 'SUV', NULL, NULL, 'petrol', 7383316, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHERY' AND model = 'TIGGO 8 PRO MAX ELITE 2WD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHERY', 'TIGGO 8 PRO MAX ULTIMATE AWD', NULL, '7AT', 'AWD', 2000, 'SUV', NULL, NULL, 'petrol', 8103815, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHERY' AND model = 'TIGGO 8 PRO MAX ULTIMATE AWD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHERY', 'TIGGO 8 PRO MAX URBAN 2WD', NULL, '7AT', '2WD', 2000, 'SUV', NULL, NULL, 'petrol', 7023066, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHERY' AND model = 'TIGGO 8 PRO MAX URBAN 2WD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHERY', 'OMODA5', 'BX (BASIC VERSION)', 'CVT', NULL, 1500, 'SUV', NULL, '5', 'petrol', 4543402, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHERY' AND model = 'OMODA5'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHERY', 'OMODA5', 'EX (HIGH VERSION)', 'CVT', NULL, 1500, 'SUV', NULL, '5', 'petrol', 5468165, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHERY' AND model = 'OMODA5'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHERY', 'OMODA5', 'GT', 'AT', 'AWD', 1600, 'SUV', NULL, '5', 'petrol', 6171790, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHERY' AND model = 'OMODA5'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHERY', 'OMODA5', 'GT', 'AT', '4WD', 1600, 'SUV', NULL, '5', 'petrol', 5789822, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHERY' AND model = 'OMODA5'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'BELAIR', NULL, 'AT', '2WD', 5700, 'SEDAN', NULL, NULL, 'petrol', 8187733, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'BELAIR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'C-10', NULL, 'AT', '2WD', 5700, 'SUV', NULL, NULL, 'petrol', 26010128, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'C-10'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'CAPTIVA BASE GRADE', NULL, 'AT', '4WD', 2400, 'SUV', NULL, NULL, 'petrol', 9295748, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'CAPTIVA BASE GRADE'
);