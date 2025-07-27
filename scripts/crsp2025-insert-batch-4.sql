INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X5 LIMITED BLACK', NULL, 'AT', '4WD', 4400, 'SUV', NULL, '5', 'petrol', 18090052, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X5 LIMITED BLACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X5 LIMITED WHITE', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'hybrid', 18883118, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X5 LIMITED WHITE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X5 M COMPETITION', '3BA-JU44M', 'AT', '4WD', 3000, 'SUV', NULL, '5', 'hybrid', 26968904, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X5 M COMPETITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X5 M50I', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'hybrid', 28622667, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X5 M50I'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X5 X DRIVE 35D', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'hybrid', 12196745, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X5 X DRIVE 35D'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X5 X DRIVE 35D EDITION X', '3CA-12EV30A', 'AT', '4WD', 2000, 'SEDAN', NULL, '5', 'petrol', 17405544, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X5 X DRIVE 35D EDITION X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X5 X DRIVE 35D M-SPORT', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'petrol', 17126850, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X5 X DRIVE 35D M-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X5 X DRIVE 35D M-SPORT HI-LINE PACKAGE', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'diesel', 14044934, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X5 X DRIVE 35D M-SPORT HI-LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X5 X DRIVE 35D PLEASURE3 EDITION', '3CA-JU8230A', 'AT', '4WD', 3000, 'SUV', NULL, '5', 'petrol', 19094805, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X5 X DRIVE 35D PLEASURE3 EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X5 X DRIVE 40D M-SPORT', 'JU8230A-9R2', 'AT', '4WD', 3000, 'SUV', NULL, '5', 'hybrid', 17302672, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X5 X DRIVE 40D M-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X5 X DRIVE 45E', '3LA-TA30', 'AT', '4WD', 3000, 'SUV', NULL, '5', 'hybrid', 14282349, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X5 X DRIVE 45E'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X5 X DRIVE 45E M-SPORT', '3LA-TA30', 'AT', '4WD', 3000, 'SUV', NULL, '5', 'petrol', 15519848, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X5 X DRIVE 45E M-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X5 X DRIVE 50E M-SPORT', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'hybrid', 20268568, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X5 X DRIVE 50E M-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X6 M COMPETITION', '3AA-12ET44', 'AT', '4WD', 3000, 'SUV', NULL, '5', 'hybrid', 33651858, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X6 M COMPETITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X6 M50I', '3BA-CY44', 'AT', '4WD', 3000, 'SUV', NULL, '5', 'diesel', 19760859, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X6 M50I'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X6 X DRIVE 35D', NULL, 'AT', '4WD', 4400, 'SUV', NULL, '5', 'petrol', 31169477, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X6 X DRIVE 35D'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X6 X DRIVE 35D M SPORT', NULL, 'AT', '4W', 3000, 'SUV', NULL, '5', 'hybrid', 18620952, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X6 X DRIVE 35D M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X6 X DRIVE 35D M SPORT HI-LINE PACKAGE', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'diesel', 16619697, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X6 X DRIVE 35D M SPORT HI-LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X7 M50I', NULL, 'AT', '4WD', 4400, 'SUV', NULL, '5', 'petrol', 23673998, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X7 M50I'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X7 M60I X DRIVE', NULL, 'AT', '4WD', 4400, 'SUV', NULL, '5', 'petrol', 35091373, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X7 M60I X DRIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X7 X DRIVE 35D DESIGN PURE EXCELLENCE', NULL, 'AT', '4WD', 4400, 'SUV', NULL, '5', 'hybrid', 39119024, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X7 X DRIVE 35D DESIGN PURE EXCELLENCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X7 X DRIVE 35D M SPORT', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'diesel', 40925907, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X7 X DRIVE 35D M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X7 X DRIVE 40D EXCELLENCE', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'hybrid', 19952544, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X7 X DRIVE 40D EXCELLENCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW X7 X DRIVE 40D M SPORT', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'hybrid', 25463444, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW X7 X DRIVE 40D M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW XM BASE GRADE', '3LA-22CS44', 'AT', '2WD', 3000, 'SUV', NULL, '5', 'diesel', 27456191, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW XM BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW XM LABEL RED', '3LA-22CS44', 'AT', '2WD', 3000, 'SUV', NULL, '5', 'diesel', 47941331, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW XM LABEL RED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW Z4 M40I', NULL, 'AT', '2WD', 4400, 'SUV', NULL, '5', 'hybrid', 20800261, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW Z4 M40I'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW Z4 S DRIVE 20I M-SPORT EDITION SUNRISE', '3BA-HF20', 'AT', '2WD', 4400, 'SUV', NULL, '5', 'hybrid', 10597808, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW Z4 S DRIVE 20I M-SPORT EDITION SUNRISE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'BMW Z4 S DRIVE 20I SPORT', NULL, 'AT', '2WD', 3000, 'SUV', NULL, '5', 'hybrid', 20347991, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'BMW Z4 S DRIVE 20I SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'i3 BASE GRADE', NULL, 'AT', '2WD', NULL, 'HATCHBACK', NULL, '5', 'electric(ev)', 7986686, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'i3 BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'i3 LODGE RANGE EXTENDER', NULL, 'AT', '2WD', NULL, 'HATCHBACK', NULL, '5', 'electric(ev)', 8508783, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'i3 LODGE RANGE EXTENDER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'i3 RANGE EXTENDER', '3LA-8P06', 'AT', '2WD', 650, 'HATCHBACK', NULL, '5', 'hybrid', 10627224, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'i3 RANGE EXTENDER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'i3 SUITE RANGE EXTENDER', NULL, 'AT', '2WD', 650, 'HATCHBACK', NULL, '5', 'hybrid', 3015182, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'i3 SUITE RANGE EXTENDER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'i4 E DRIVE 40 HI-LINE PACKAGE', NULL, 'AT', '2WD', NULL, 'SEDAN', NULL, '5', 'electric(ev)', 11549687, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'i4 E DRIVE 40 HI-LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'i4 E DRIVE 40 M SPORT HI-LINE PACKAGE', NULL, 'AT', '2WD', NULL, 'SEDAN', NULL, '5', 'electric(ev)', 12339172, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'i4 E DRIVE 40 M SPORT HI-LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'i4 M50 X DRIVE', NULL, 'AT', '4WD', NULL, 'SEDAN', NULL, '5', 'electric(ev)', 13726983, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'i4 M50 X DRIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'i5 E DRIVE 40 M-SPORT', 'ZAA-32FK45', 'AT', '2WD', NULL, 'SEDAN', NULL, '5', 'electric(ev)', 10659334, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'i5 E DRIVE 40 M-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'i5 E DRIVE 40 THE FIRST EDITION', 'ZAA-32FK45', 'AT', '2WD', NULL, 'SEDAN', NULL, '5', 'electric(ev)', 10082261, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'i5 E DRIVE 40 THE FIRST EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'i5 E DRIVE 40 TOURING EXCELLENCE', 'ZAA-12HH45', 'AT', '2WD', NULL, 'SEDAN', NULL, '5', 'electric(ev)', 12764971, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'i5 E DRIVE 40 TOURING EXCELLENCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'i5 E DRIVE 40 TOURING M-SPORT', 'ZAA-12HH45', 'AT', '2WD', NULL, 'SEDAN', NULL, '5', 'electric(ev)', 15995290, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'i5 E DRIVE 40 TOURING M-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'i5 M60 X DRIVE', NULL, 'AT', '4WD', NULL, 'SEDAN', NULL, '5', 'electric(ev)', 19414254, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'i5 M60 X DRIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'i5 M60 X DRIVE TOURING', 'ZAA-32HH89', 'AT', '4WD', NULL, 'SEDAN', NULL, '5', 'electric(ev)', 21029413, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'i5 M60 X DRIVE TOURING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'i7 E DRIVE 50 M-SPORT', NULL, 'AT', '2WD', NULL, 'SEDAN', NULL, '5', 'electric(ev)', 21748061, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'i7 E DRIVE 50 M-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'i7 M70 X DRIVE', NULL, 'AT', '4WD', NULL, 'SEDAN', NULL, '5', 'electric(ev)', 26943880, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'i7 M70 X DRIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'iX M60', NULL, 'AT', '4WD', NULL, 'SUV', NULL, '5', 'electric(ev)', 21924129, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'iX M60'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'iX X DRIVE 50', NULL, 'AT', '4WD', NULL, 'SEDAN', NULL, '5', 'electric(ev)', 16925168, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'iX X DRIVE 50'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'iX1 E DRIVE 20 M SPORT', 'ZAA-72EG33', 'AT', '2WD', NULL, 'SUV', NULL, '5', 'electric(ev)', 8228510, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'iX1 E DRIVE 20 M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'iX1 X DRIVE 30 X LINE', NULL, 'AT', '4WD', NULL, 'SUV', NULL, '5', 'electric(ev)', 12904850, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'iX1 X DRIVE 30 X LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'iX2 X DRIVE 30 M SPORT', 'ZAA-72GM67', 'AT', '2WD', NULL, 'SUV', NULL, '5', 'electric(ev)', 13070396, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'iX2 X DRIVE 30 M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'iX2 X DRIVE 30 M SPORT HI-LINE PACKAGE', NULL, 'AT', '4WD', NULL, 'SUV', NULL, '5', 'electric(ev)', 8920208, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'iX2 X DRIVE 30 M SPORT HI-LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'iX3 M SPORT', 'ZAA-42DU44', 'AT', '2WD', NULL, 'SUV', NULL, '5', 'electric(ev)', 14792155, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'iX3 M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'M2 BASE GRADE', NULL, 'AT', '2WD', 3000, 'COUPE', NULL, '2', 'petrol', 17551847, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'M2 BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'M2 BASE GRADE HI-LINE PACKAGE', NULL, 'AT', '2WD', 4400, 'CONVERTIBLE', NULL, '2', 'petrol', 20094682, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'M2 BASE GRADE HI-LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'M2 COMPETITION', NULL, 'AT', '2WD', 4400, 'CONVERTIBLE', NULL, '2', 'petrol', 26169704, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'M2 COMPETITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'M2 CS', NULL, 'MT', '2WD', 3000, 'COUPE', NULL, '2', 'petrol', 31996634, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'M2 CS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'M2 EDITION BLACK SHADOW', 'CBA-1H30G', 'AT', '2WD', 4400, 'CONVERTIBLE', NULL, '2', 'petrol', 26978949, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'M2 EDITION BLACK SHADOW'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'M3 M3 50TH ANNIVERSARY LIMITED', '3BA-32AY30', 'MT', '2WD', 3000, 'SEDAN', NULL, '5', 'petrol', 27262861, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'M3 M3 50TH ANNIVERSARY LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'M3 M3 MT FINAL EDITION', NULL, 'MT', '4WD', 4400, 'SEDAN', NULL, '5', 'petrol', 31982903, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'M3 M3 MT FINAL EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'M3 M3 SEDAN COMPETITION', '3BA-32AY30', 'AT', '2WD', 4400, 'SEDAN', NULL, '5', 'hybrid', 24644154, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'M3 M3 SEDAN COMPETITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'M3 M3 SEDAN COMPETITION', NULL, 'AT', '2WD', 3000, 'SEDAN', NULL, '5', 'petrol', 28374891, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'M3 M3 SEDAN COMPETITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'M3 M3 SEDAN COMPETITION M X DRIVE', NULL, 'AT', '4WD', 4400, 'SEDAN', NULL, '5', 'petrol', 28292650, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'M3 M3 SEDAN COMPETITION M X DRIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'M3 M3 TOURING COMPETITION M X DRIVE', NULL, 'AT', '4WD', 3000, 'SEDAN', NULL, '5', 'petrol', 24492623, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'M3 M3 TOURING COMPETITION M X DRIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'M4 CABRIOLET COMPETITION M X DRIVE', NULL, 'AT', '4WD', 3000, 'COUPE', NULL, '2', 'petrol', 21031047, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'M4 CABRIOLET COMPETITION M X DRIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'M4 COUPE COMPETITION M X DRIVE', NULL, 'AT', '4WD', 3000, 'COUPE', NULL, '2', 'petrol', 23621443, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'M4 COUPE COMPETITION M X DRIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'M4 COUPE COMPETITION M X DRIVE TRACK PACKAGE', NULL, 'AT', '4WD', 3000, 'CONVERTIBLE', NULL, '2', 'petrol', 25846636, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'M4 COUPE COMPETITION M X DRIVE TRACK PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'M4 COUPE EDITION HERITAGE', 'CBA-3C30', 'AT', '2WD', 3000, 'COUPE', NULL, '2', 'petrol', 30159953, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'M4 COUPE EDITION HERITAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'M4 CSL', '3BA-52AZ30', 'AT', '2WD', 3000, 'COUPE', NULL, '2', 'petrol', 66500997, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'M4 CSL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'M4 DTM CHAMPION EDITION', NULL, 'AT', '2WD', 3000, 'COUPE', NULL, '2', 'petrol', 65639554, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'M4 DTM CHAMPION EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'M4 M4 COUPE', NULL, 'MT', '2WD', NULL, 'SUV', NULL, '5', 'electric(ev)', 28409430, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'M4 M4 COUPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'M4 M4 COUPE COMPETITION', NULL, 'AT', '2WD', 3000, 'COUPE', NULL, '2', 'petrol', 29786256, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'M4 M4 COUPE COMPETITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'M4 M4 CS', 'CBA-3C30', 'AT', '2WD', 3000, 'COUPE', NULL, '2', 'petrol', 52924165, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'M4 M4 CS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'M5', NULL, 'AT', '4WD', 3000, 'COUPE', NULL, '2', 'petrol', 39896352, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'M5'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'M5 COMPETITION', NULL, 'AT', '4WD', 3000, 'COUPE', NULL, '4', 'petrol', 27913999, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'M5 COMPETITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'M5 M5', '3LA-82FK44', 'AT', '4WD', 3000, 'COUPE', NULL, '4', 'petrol', 45295842, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'M5 M5'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'M8 M8 CABRIOLET COMPETITION', NULL, 'AT', '4WD', 3000, 'COUPE', NULL, '2', 'petrol', 46670545, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'M8 M8 CABRIOLET COMPETITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'M8 M8 COUPE COMPETITION', NULL, 'AT', '4WD', 3000, 'COUPE', NULL, '2', 'petrol', 50445258, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'M8 M8 COUPE COMPETITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X1 M35I X DRIVE', '3BA-12EF20', 'AT', '4WD', 1500, 'SUV', NULL, '5', 'petrol', 12690656, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X1 M35I X DRIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X1 S DRIVE 18I', NULL, 'AT', '2WD', 2000, 'SUV', NULL, '5', 'diesel', 12288307, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X1 S DRIVE 18I'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X1 S DRIVE 18I M SPORT', '3BA-AA15', 'AT', '4WD', 2000, 'SUV', NULL, '5', 'petrol', 14236270, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X1 S DRIVE 18I M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X1 S DRIVE 18I X LINE', NULL, 'AT', '2WD', 3000, 'SEDAN', NULL, '5', 'petrol', 10662111, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X1 S DRIVE 18I X LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X1 S DRIVE 18I X LINE HI-LINE PACKAGE', NULL, 'AT', '2WD', 3000, 'SEDAN', NULL, '5', 'petrol', 11152098, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X1 S DRIVE 18I X LINE HI-LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X1 X DRIVE 18D M SPORT', NULL, 'AT', '4WD', 1500, 'SUV', NULL, '5', 'petrol', 8921678, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X1 X DRIVE 18D M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X1 X DRIVE 18D X LINE', NULL, 'AT', '4WD', 3000, 'SEDAN', NULL, '5', 'petrol', 7270843, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X1 X DRIVE 18D X LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X1 X DRIVE 18D X LINE', NULL, 'AT', '4WD', 1500, 'SUV', NULL, '5', 'petrol', 19052924, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X1 X DRIVE 18D X LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X1 X DRIVE 18D X LINE EDITION JOY+', '3DA-AD20', 'AT', '4WD', 2000, 'SUV', NULL, '5', 'hybrid', 12662128, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X1 X DRIVE 18D X LINE EDITION JOY+'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X1 X DRIVE 18D X LINE EDITION JOY+ HI-LINE PACKAGE', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'diesel', 11411246, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X1 X DRIVE 18D X LINE EDITION JOY+ HI-LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X1 X DRIVE 20D X LINE', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'diesel', 8531649, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X1 X DRIVE 20D X LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X1 X DRIVE 20I M SPORT', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'diesel', 11645612, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X1 X DRIVE 20I M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X1 X DRIVE 20I X LINE', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'diesel', 8947157, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X1 X DRIVE 20I X LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X2 M35I', NULL, 'AT', '4WD', 2000, 'COUPE', NULL, '2', 'diesel', 13421019, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X2 M35I'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X2 M35I X DRIVE', '3BA-82GM20', 'AT', '4WD', 2000, 'COUPE', NULL, '2', 'diesel', 15810891, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X2 M35I X DRIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X2 S DRIVE 18I', NULL, 'AT', '4WD', 2000, 'COUPE', NULL, '2', 'petrol', 7216524, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X2 S DRIVE 18I'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X2 S DRIVE 18I M SPORT X', 'DBA-YH15', 'AT', '2WD', 2000, 'COUPE', NULL, '2', 'petrol', 13313303, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X2 S DRIVE 18I M SPORT X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X2 X DRIVE 18D M SPORT EDITION SUNRISE', '3DA-YK20', 'AT', '4WD', 1500, 'COUPE', NULL, '2', 'petrol', 10264895, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X2 X DRIVE 18D M SPORT EDITION SUNRISE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X2 X DRIVE 18D M SPORT X', '3DA-YK20', 'AT', '4WD', 2000, 'SUV', NULL, '5', 'petrol', 6909466, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X2 X DRIVE 18D M SPORT X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X2 X DRIVE 20I', 'ABA-YH20', 'AT', '4WD', 2000, 'COUPE', NULL, '2', 'petrol', 6379347, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X2 X DRIVE 20I'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X2 X DRIVE 20I M SPORT', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'petrol', 8862880, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X2 X DRIVE 20I M SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X2 X DRIVE 20I M SPORT HI-LINE PACKAGE', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'diesel', 11089379, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X2 X DRIVE 20I M SPORT HI-LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X2 X DRIVE 20I M SPORT HI-LINE PACKAGE', NULL, 'AT', '4WD', 2000, 'COUPE', NULL, '2', 'petrol', 9084354, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X2 X DRIVE 20I M SPORT HI-LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BMW', 'X2 X DRIVE 20I M SPORT X', NULL, 'AT', '4WD', 2000, 'COUPE', NULL, '4', 'petrol', 8449051, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BMW' AND model = 'X2 X DRIVE 20I M SPORT X'
);