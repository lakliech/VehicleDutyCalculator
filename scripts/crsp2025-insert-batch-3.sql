INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BENTLEY', 'BENTAYGA V8', NULL, 'AT', '4WD', 4000, 'SUV', NULL, '5', 'petrol', 66500997, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BENTLEY' AND model = 'BENTAYGA V8'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BENTLEY', 'CONTINENTAL GT', NULL, 'AT', '4WD', 6000, 'CONVERTIBLE', NULL, '4', 'petrol', 23393523, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BENTLEY' AND model = 'CONTINENTAL GT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BENTLEY', 'CONTINENTAL GT CONVERTIBLE', NULL, 'AT', '4WD', 4000, 'CONVERTIBLE', NULL, '4', 'petrol', 18194963, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BENTLEY' AND model = 'CONTINENTAL GT CONVERTIBLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BENTLEY', 'CONTINENTAL GT MULLINER CONVERTIBLE', '7BA-BDDDB', 'AT', '4WD', 6000, 'CONVRTIBLE', NULL, '4', 'petrol', 86615497, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BENTLEY' AND model = 'CONTINENTAL GT MULLINER CONVERTIBLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BENTLEY', 'CONTINENTAL GT SPEED COUPE', NULL, 'AT', '4WD', 6000, 'COUPE', NULL, '2', 'petrol', 63644888, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BENTLEY' AND model = 'CONTINENTAL GT SPEED COUPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BENTLEY', 'CONTINENTAL GT V8 AZURE', '7BA-BCCVD', 'AT', '4WD', 4000, 'COUPE', NULL, '2', 'petrol', 65662304, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BENTLEY' AND model = 'CONTINENTAL GT V8 AZURE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BENTLEY', 'CONTINENTAL GT V8 COUPE', NULL, 'AT', '4WD', 4000, 'COUPE', NULL, '2', 'petrol', 60965921, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BENTLEY' AND model = 'CONTINENTAL GT V8 COUPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BENTLEY', 'FLYING SPUR BASEGRADE', NULL, 'AT', '4WD', 6000, 'SEDAN', NULL, '5', 'petrol', 45879743, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BENTLEY' AND model = 'FLYING SPUR BASEGRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BENTLEY', 'FLYING SPUR S', 'ABA-BECYC', 'AT', '4WD', 4000, 'SEDAN', NULL, '5', 'petrol', 47852570, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BENTLEY' AND model = 'FLYING SPUR S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BENTLEY', 'FLYING SPUR V8', NULL, 'AT', '4WD', 4000, 'SEDAN', NULL, '5', 'petrol', 63164421, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BENTLEY' AND model = 'FLYING SPUR V8'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BENTLEY', 'FLYING SPUR V8 AZURE', NULL, 'AT', '4WD', 4000, 'SEDAN', NULL, '5', 'petrol', 53984287, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BENTLEY' AND model = 'FLYING SPUR V8 AZURE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BENTLEY', 'FLYING SPUR V8 S', NULL, 'AT', '4WD', 4000, 'SEDAN', NULL, '5', 'petrol', 58188373, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BENTLEY' AND model = 'FLYING SPUR V8 S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BENTLEY', 'MULSANNE SPEED', NULL, 'AT', '2WD', 6800, 'COUPE', NULL, '2', 'petrol', 44387080, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BENTLEY' AND model = 'MULSANNE SPEED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 3 SERIES 320D X DRIVE M-SPORT', NULL, 'AT', '4WD', 2000, 'HATCHBACK', NULL, '5', 'petrol', 8039948, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 3 SERIES 320D X DRIVE M-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 3 SERIES 320D X DRIVE M-SPORT EDITION JOY+', NULL, 'AT', '4WD', 2000, 'HATCHBACK', NULL, '5', 'petrol', 7197027, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 3 SERIES 320D X DRIVE M-SPORT EDITION JOY+'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 3 SERIES 320D X DRIVE M-SPORT EDITION SHADOW', '3DA-5V20', 'AT', '4WD', 2000, 'HATCHBACK', NULL, '5', 'diesel', 25733956, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 3 SERIES 320D X DRIVE M-SPORT EDITION SHADOW'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 3 SERIES 320D X DRIVE M-SPORT HI-LINE PACKAGE', NULL, 'AT', '2WD', 2000, 'HATCHBACK', NULL, '5', 'diesel', 10411695, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 3 SERIES 320D X DRIVE M-SPORT HI-LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 3 SERIES 320D X DRIVE TOURING M-SPORT', NULL, 'AT', '4WDD', 2000, 'HATCHBACK', NULL, '5', 'diesel', 18386794, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 3 SERIES 320D X DRIVE TOURING M-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 3 SERIES 320i', NULL, 'AT', '4WDD', 2000, 'HATCHBACK', NULL, '5', 'diesel', 7565959, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 3 SERIES 320i'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 3 SERIES 320i HI-LINE PACKAGE', NULL, 'AT', '2WD', 2000, 'HATCHBACK', NULL, '5', 'diesel', 8872230, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 3 SERIES 320i HI-LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 3 SERIES 320i M-SPORT', NULL, 'AT', '2WD', 2000, 'HATCHBACK', NULL, '5', 'diesel', 7197027, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 3 SERIES 320i M-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 3 SERIES 320I STYLE MEISTER', 'DBA-8A20', 'AT', '2WD', 2000, 'HATCHBACK', NULL, '5', 'diesel', 3393910, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 3 SERIES 320I STYLE MEISTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 3 SERIES 330E M-SPORT', NULL, 'AT', '2WD', 2000, 'HATCHBACK', NULL, '5', 'petrol', 10889578, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 3 SERIES 330E M-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 4 SERIES 420D X DRIVE GRAN COUPE M SPORT', NULL, 'AT', '2WD', 2000, 'HATCHBACK', NULL, '5', 'petrol', 27223580, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 4 SERIES 420D X DRIVE GRAN COUPE M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 4 SERIES 420D X DRIVE GRAN COUPE M SPORT HI-LINE PACKAGE', NULL, 'AT', '2WD', 2000, 'HATCHBACK', NULL, '5', 'petrol', 25202133, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 4 SERIES 420D X DRIVE GRAN COUPE M SPORT HI-LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 4 SERIES 420I CABRIOLET M SPORT', NULL, 'AT', '2WD', 2000, 'HATCHBACK', NULL, '5', 'petrol', 29223206, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 4 SERIES 420I CABRIOLET M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 4 SERIES 420i COUPE M SPORT', '12AP20-CL6', 'AT', '2WD', 2000, 'SEDAN', NULL, '5', 'hybrid', 18027333, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 4 SERIES 420i COUPE M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 4 SERIES 420i GRAN COUPE IN STYLE SPORT', 'DBA-4D20', 'AT', '2WD', 2000, 'COUPE', NULL, '2', 'diesel', 8683069, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 4 SERIES 420i GRAN COUPE IN STYLE SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 4 SERIES 420i GRAN COUPE LUXURY', NULL, 'AT', '2WD', 2000, 'COUPE', NULL, '2', 'diesel', 9688744, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 4 SERIES 420i GRAN COUPE LUXURY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 4 SERIES 420i GRAN COUPE M SPIRIT', '4D20-BP2', 'AT', '2WD', 2000, 'CONVERTIBLE', NULL, '2', 'petrol', 9892208, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 4 SERIES 420i GRAN COUPE M SPIRIT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 4 SERIES 420i GRAN COUPE M SPORT', NULL, 'AT', '2WD', 2000, 'COUPE', NULL, '2', 'petrol', 5763663, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 4 SERIES 420i GRAN COUPE M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 4 SERIES 420I GRAN COUPE M SPORT EDITION SHADOW', '3BA-12AV20', 'AT', '2WD', 2000, 'COUPE', NULL, '2', 'petrol', 11063121, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 4 SERIES 420I GRAN COUPE M SPORT EDITION SHADOW'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 4 SERIES 420i GRAN COUPE M SPORT HI-LINE PACKAGE', NULL, 'AT', '2WD', 2000, 'COUPE', NULL, '2', 'petrol', 8362241, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 4 SERIES 420i GRAN COUPE M SPORT HI-LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 4 SERIES M 440i X DRIVE COUPE', NULL, 'AT', '2WD', 2000, 'COUPE', NULL, '2', 'petrol', 16297607, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 4 SERIES M 440i X DRIVE COUPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 4 SERIES M440i X DRIVE GRAN COUPE', NULL, 'AT', '2WD', 2000, 'COUPE', NULL, '2', 'petrol', 13687061, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 4 SERIES M440i X DRIVE GRAN COUPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 5 SERIES 523D M SPORT', NULL, 'AT', '2WD', 2000, 'COUPE', NULL, '2', 'petrol', 5572168, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 5 SERIES 523D M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 5 SERIES 523D TOURING M-SPORT', NULL, 'AT', '2WD', 2000, 'COUPE', NULL, '2', 'petrol', 7266178, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 5 SERIES 523D TOURING M-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 5 SERIES 523D X DRIVE TOURING M-SPORT', NULL, 'AT', '2WD', 3000, 'COUPE', NULL, '2', 'petrol', 14694405, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 5 SERIES 523D X DRIVE TOURING M-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 6 SERIES 623D GRAN TURISMO M-SPORT', NULL, 'AT', '2WD', 2000, 'COUPE', NULL, '2', 'petrol', 12818778, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 6 SERIES 623D GRAN TURISMO M-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 6 SERIES 630I GRAN TURISMO M-SPORT', NULL, 'AT', '2WD', 2000, 'COUPE', NULL, '2', 'petrol', 20859296, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 6 SERIES 630I GRAN TURISMO M-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 6 SERIES 640i GRAN COUPE M-SPORT', NULL, 'AT', '2WD', 3000, 'COUPE', NULL, '2', 'petrol', 15408197, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 6 SERIES 640i GRAN COUPE M-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 6 SERIES 640I X DRIVE GRAN TURISMO M-SPORT', NULL, 'AT', '4WD', 3000, 'COUPE', NULL, '2', 'petrol', 15683064, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 6 SERIES 640I X DRIVE GRAN TURISMO M-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 7 SERIES 740D X DRIVE EXCELLENCE', NULL, 'AT', '4WD', 2000, 'COUPE', NULL, '2', 'petrol', 19952544, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 7 SERIES 740D X DRIVE EXCELLENCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 7 SERIES 740D X DRIVE M-SPORT', NULL, 'AT', '4WD', 2000, 'COUPE', NULL, '2', 'diesel', 13945332, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 7 SERIES 740D X DRIVE M-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 7 SERIES 740E IPERFORMANCE M-SPORT', NULL, 'AT', '2WD', 4400, 'COUPE', NULL, '2', 'petrol', 9094067, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 7 SERIES 740E IPERFORMANCE M-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 7 SERIES 740E IPERFORMANCE M-SPORT', NULL, 'AT', '2WD', 3000, 'COUPE', NULL, '2', 'hybrid', 16131759, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 7 SERIES 740E IPERFORMANCE M-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 7 SERIES 740i M-SPORT', NULL, 'AT', '2WD', 3000, 'COUPE', NULL, '2', 'hybrid', 9947328, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 7 SERIES 740i M-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 7 SERIES 740I M-SPORT THE FIRST EDITION', '3AA-22EH30', 'AT', '2WD', 3000, 'COUPE', NULL, '2', 'diesel', 30638849, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 7 SERIES 740I M-SPORT THE FIRST EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 7 SERIES 740LI EXCELLENCE', NULL, 'AT', '2WD', 3000, 'COUPE', NULL, '2', 'petrol', 26817874, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 7 SERIES 740LI EXCELLENCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 7 SERIES 745E LUXURY', NULL, 'AT', '2WD', 3000, 'COUPE', NULL, '2', 'petrol', 27347987, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 7 SERIES 745E LUXURY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 7 SERIES 750Li M-SPORT PACKAGE', NULL, 'AT', '2WD', 3000, 'COUPE', NULL, '2', 'petrol', 18571776, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 7 SERIES 750Li M-SPORT PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 7 SERIES M760Li X DRIVE', NULL, 'AT', '4WD', 2000, 'COUPE', NULL, '2', 'hybrid', 28729406, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 7 SERIES M760Li X DRIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 7 SERIES M760Li X DRIVE V12 EXCELLENCE', NULL, 'AT', '4WD', 4400, 'COUPE', NULL, '2', 'petrol', 26162459, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 7 SERIES M760Li X DRIVE V12 EXCELLENCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 8 SERIES', NULL, 'AT', '4WD', 3000, 'COUPE', NULL, '2', 'petrol', 25550168, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 8 SERIES'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 8 SERIES 840D X DRIVE GRAN COUPE EXCLUSIVE M SPORT', NULL, 'AT', '2WD', 6600, 'COUPE', NULL, '2', 'petrol', 19726568, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 8 SERIES 840D X DRIVE GRAN COUPE EXCLUSIVE M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 8 SERIES 840D X DRIVE GRAN COUPE M SPORT', NULL, 'AT', '4WD', 2000, 'COUPE', NULL, '2', 'hybrid', 26041390, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 8 SERIES 840D X DRIVE GRAN COUPE M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 8 SERIES 840I CABRIOLET EXCLUSIVE M SPORT', NULL, 'AT', '2WD', 3000, 'COUPE', NULL, '2', 'petrol', 19162626, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 8 SERIES 840I CABRIOLET EXCLUSIVE M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 8 SERIES 840I COUPE EXCLUSIVE M SPORT', NULL, 'AT', '2WD', 3000, 'COUPE', NULL, '2', 'petrol', 17361945, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 8 SERIES 840I COUPE EXCLUSIVE M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 8 SERIES 840I GRAN COUPE', NULL, 'AT', '2WD', 4400, 'COUPE', NULL, '2', 'petrol', 39226984, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 8 SERIES 840I GRAN COUPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 8 SERIES 840I GRAN COUPE EXCLUSIVE M SPORT', NULL, 'AT', '2WD', 6600, 'COUPE', NULL, '2', 'petrol', 19985267, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 8 SERIES 840I GRAN COUPE EXCLUSIVE M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 8 SERIES 840I GRAN COUPE M SPORT', 'GV30-CF4', 'AT', '2WD', 3000, 'COUPE', NULL, '2', 'hybrid', 16599288, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 8 SERIES 840I GRAN COUPE M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 8 SERIES M 850i X DRIVE CABRIOLET', NULL, 'AT', '4WD', 3000, 'COUPE', NULL, '2', 'petrol', 36606192, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 8 SERIES M 850i X DRIVE CABRIOLET'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 8 SERIES M 850i X DRIVE COUPE', NULL, 'AT', '4WD', 3000, 'COUPE', NULL, '2', 'petrol', 29597973, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 8 SERIES M 850i X DRIVE COUPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW 8 SERIES M 850i X DRIVE GRAN COUPE', NULL, 'AT', '2WD', 3000, 'COUPE', NULL, '2', 'petrol', 37798152, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW 8 SERIES M 850i X DRIVE GRAN COUPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW i3', NULL, 'AT', '2WD', 4400, 'COUPE', NULL, '2', 'petrol', 18198013, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW i3'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW i3 ATELIER RANGE EXTENDER', NULL, 'AT', '2WD', 4400, 'COUPE', NULL, '2', 'petrol', 14040483, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW i3 ATELIER RANGE EXTENDER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW i3 BASE GRADE', 'ZAA-8P00', 'AT', '2WD', 4400, 'COUPE', NULL, '2', 'petrol', 9508885, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW i3 BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW i3 LODGE RANGE EXTENDER', NULL, 'AT', '2WD', 3000, 'COUPE', NULL, '2', 'petrol', 9351348, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW i3 LODGE RANGE EXTENDER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW i3 SUITE RANGE EXTENDER', NULL, 'AT', '2WD', 650, 'HATCHBACK', NULL, '5', 'hybrid', 12876422, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW i3 SUITE RANGE EXTENDER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW i4 E DRIVE 35 M SPORT', 'ZAA-42AW44', 'AT', '2WD', NULL, 'COUPE', NULL, '2', 'elecctric', 9762953, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW i4 E DRIVE 35 M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW i4 E DRIVE 40 M SPORT', '72AW44-FS6', 'AT', '2WD', 650, 'HATCHBACK', NULL, '5', 'hybrid', 11280548, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW i4 E DRIVE 40 M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW i4 E DRIVE 40 M SPORT HI-LINE PACKAGE', NULL, 'AT', '2WD', NULL, 'HATCHBACK', NULL, '5', 'elecctric', 12431015, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW i4 E DRIVE 40 M SPORT HI-LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW i4 M50', NULL, 'AT', '4WD', NULL, 'HATCHBACK', NULL, '5', 'elecctric', 13287020, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW i4 M50'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW i4 M50 X DRIVE', 'ZAA-32AW89', 'AT', '4WD', 650, 'HATCHBACK', NULL, '5', 'hybrid', 16493092, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW i4 M50 X DRIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW i5 E DRIVE 40 EXCELLENCE', 'ZAA-32FK45', 'AT', '2WD', NULL, 'COUPE', NULL, '2', 'elecctric', 18782224, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW i5 E DRIVE 40 EXCELLENCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW i5 E DRIVE 40 M-SPORT', 'ZAA-32FK45', 'AT', '2WD', NULL, 'COUPE', NULL, '2', 'elecctric', 11593034, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW i5 E DRIVE 40 M-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW i5 E DRIVE 40 THE FIRST EDITION', 'ZAA-32FK45', 'AT', '2WD', NULL, 'COUPE', NULL, '2', 'elecctric', 10157128, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW i5 E DRIVE 40 THE FIRST EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW i5 E DRIVE 40 TOURING EXCELLENCE', 'ZAA-12HH45', 'AT', '2WD', NULL, 'COUPE', NULL, '2', 'elecctric', 12859932, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW i5 E DRIVE 40 TOURING EXCELLENCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW i5 E DRIVE 40 TOURING M-SPORT', 'ZAA-12HH45', 'AT', '2WD', NULL, 'COUPE', NULL, '2', 'elecctric', 13945807, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW i5 E DRIVE 40 TOURING M-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW i5 M60 X DRIVE', NULL, 'AT', '4WD', NULL, 'COUPE', NULL, '2', 'elecctric', 13403000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW i5 M60 X DRIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW i5 M60 X DRIVE TOURING', 'ZAA-32HH89', 'AT', '4WD', NULL, 'COUPE', NULL, '2', 'elecctric', 25611198, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW i5 M60 X DRIVE TOURING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW i7 E DRIVE 50 M-SPORT', 'ZAA-42EJ49', 'AT', '4WD', NULL, 'COUPE', NULL, '2', 'elecctric', 23819255, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW i7 E DRIVE 50 M-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW i7 M70 X DRIVE', NULL, 'AT', '4WD', NULL, 'COUPE', NULL, '2', 'elecctric', 25770540, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW i7 M70 X DRIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW i7 X DRIVE 60 EXCELLENCE', NULL, 'AT', '2WD', NULL, 'COUPE', NULL, '2', 'elecctric', 20872737, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW i7 X DRIVE 60 EXCELLENCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW i7 X DRIVE 60 M-SPORT', '52EJ89-CP7', 'AT', '4WD', NULL, 'COUPE', NULL, '2', 'elecctric', 20117822, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW i7 X DRIVE 60 M-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW i8 ROADSTER', 'CLA-2Z15U', 'AT', '4WD', NULL, 'COUPE', NULL, '2', 'elecctric', 34546357, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW i8 ROADSTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW iX M60', NULL, 'AT', '4WD', NULL, 'COUPE', NULL, '2', 'elecctric', 22087131, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW iX M60'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW iX X DRIVE 40', NULL, 'AT', '4WD', NULL, 'COUPE', NULL, '2', 'elecctric', 13228284, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW iX X DRIVE 40'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW iX X DRIVE 50', 'ZAA-22CF89A', 'AT', '4WD', NULL, 'COUPE', NULL, '2', 'elecctric', 14307853, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW iX X DRIVE 50'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW iX2 X DRIVE 30 M SPORT', 'ZAA-72GM67', 'AT', '4WD', NULL, 'SUV', NULL, '5', 'elecctric', 8729582, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW iX2 X DRIVE 30 M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW iX2 X DRIVE 30 M SPORT HI-LINE PACKAGE', NULL, 'AT', '4WD', 1500, 'CONVERTIBLE', NULL, '2', 'hybrid', 13604422, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW iX2 X DRIVE 30 M SPORT HI-LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW iX3 M SPORT', 'ZAA-42DU44', 'AT', '2WD', NULL, 'SUV', NULL, '5', 'elecctric', 11236474, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW iX3 M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X1', NULL, 'AT', '4WD', 1500, 'SUV', NULL, '5', 'petrol', 7622513, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X1'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X3 M COMPETITION', NULL, 'AT', '4WD', NULL, 'SUV', NULL, '5', 'elecctric', 14493316, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X3 M COMPETITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X4 M BASE GRADE', NULL, 'AT', '4WD', 2000, 'suv', NULL, '5', 'diesel', 23516292, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X4 M BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X4 M COMPETITION', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'petrol', 21753592, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X4 M COMPETITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X4 M40I', 'CBA-UJ30', 'AT', '4WD', NULL, 'SUV', NULL, '5', 'elecctric', 24126818, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X4 M40I'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X4 X DRIVE 20D M SPORT', 'VJ20-9T9', 'AT', '4wd', NULL, 'SUV', NULL, '5', 'elecctric', 11049965, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X4 X DRIVE 20D M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X4 X DRIVE 28I M SPORT', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'petrol', 10443652, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X4 X DRIVE 28I M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X4 X DRIVE 30I M SPORT', NULL, 'AT', '4wd', NULL, 'SUV', NULL, '5', 'elecctric', 16300410, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X4 X DRIVE 30I M SPORT'
);