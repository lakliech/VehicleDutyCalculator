INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'VEZEL HYBRID X SENSING', 'RU3-', 'AT', '2WD', 1500, 'SUV', NULL, '5', 'hybrid', 4356040, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'VEZEL HYBRID X SENSING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'VEZEL HYBRID Z SENSING', 'RU4-', 'AT', '2WD', 1500, 'SUV', NULL, '5', 'hybrid', 5093366, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'VEZEL HYBRID Z SENSING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'VEZEL HYBRID Z SENSING', '6AA-RU3', 'AT', '2WD', 1500, 'SUV', NULL, '5', 'hybrid', 4696562, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'VEZEL HYBRID Z SENSING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'VEZEL HYBRID Z SENSING', 'RU3-', 'AT', '2WD', 1500, 'SUV', NULL, '5', 'hybrid', 4356693, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'VEZEL HYBRID Z SENSING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'VEZEL RS SENSING', 'RU1-', 'AT', '2WD', 1500, 'SUV', NULL, '5', 'petrol', 5098591, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'VEZEL RS SENSING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'VEZEL SPECIAL EDITION HYBRID X SENSING BRILLIANT STYLE EDITION', 'RU3-', 'AT', '2WD', 1500, 'SUV', NULL, '5', 'petrol', 5086550, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'VEZEL SPECIAL EDITION HYBRID X SENSING BRILLIANT STYLE EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'VEZEL TOURING SENSING', 'RU1-', 'AT', '2WD', 1500, 'SUV', NULL, '5', 'petrol', 6788833, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'VEZEL TOURING SENSING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'VEZEL X SENSING', 'RU1-', 'AT', '2WD', 1500, 'SUV', NULL, '5', 'petrol', 4464445, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'VEZEL X SENSING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HUMMER', 'GMC HUMMER EV 2X', NULL, 'AUT', '4WD', 1, 'CREW CAB', NULL, '5', 'electric', 14118048, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HUMMER' AND model = 'GMC HUMMER EV 2X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HUMMER', 'GMC HUMMER EV 3X', NULL, 'AUT', '4WD', 1, 'CREW CAB', NULL, '5', 'electric', 15302472, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HUMMER' AND model = 'GMC HUMMER EV 3X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HUMMER', 'HUMMER EV 2X', NULL, 'AUT', '4WD', 570, 'CREW CAB', NULL, '5', 'electric', 17761798, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HUMMER' AND model = 'HUMMER EV 2X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HUMMER', 'HUMMER EV 3X', NULL, 'AUT', '4WD', 1, 'CREW CAB', NULL, '5', 'electric', 21069231, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HUMMER' AND model = 'HUMMER EV 3X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HUMMER', 'HUMMER EV EDITION 1', NULL, 'AUT', '4WD', 1, 'CREW CAB', NULL, '5', 'electric', 19868356, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HUMMER' AND model = 'HUMMER EV EDITION 1'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HUMMER', 'HUMMER EV 3X OMEGA LIMITED EDITION', NULL, 'AUT', '4WD', 1, 'CREW CAB', NULL, '5', 'electric', 27051671, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HUMMER' AND model = 'HUMMER EV 3X OMEGA LIMITED EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HUMMER', 'HUMMER EV SUV EV2', NULL, 'AUT', '4WD', 625, 'SUV', NULL, '5', 'electric', 14621611, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HUMMER' AND model = 'HUMMER EV SUV EV2'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HUMMER', 'HUMMER EV 2X', NULL, 'AUT', '4WD', 625, 'CREW CAB', NULL, '5', 'electric', 18799345, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HUMMER' AND model = 'HUMMER EV 2X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HUMMER', 'HUMMER EV 3X', NULL, 'AUT', '4WD', 800, 'CREW CAB', NULL, '5', 'electric', 24369656, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HUMMER' AND model = 'HUMMER EV 3X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I30 N LINE MHEV', 'N LINE MHEV', 'AUT', NULL, 1500, 'HATCHBACK', NULL, NULL, 'petrol', 5264109, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I30 N LINE MHEV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I30 N LINE PRM MHEV', 'N LINE PRM MHEV', 'AUT', NULL, 1500, 'HATCHBACK', NULL, NULL, 'petrol', 5995235, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I30 N LINE PRM MHEV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'ACCENT SPORT', 'SPORT', 'AUT', NULL, 1600, 'HATCHBACK', NULL, NULL, 'petrol', 4745009, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'ACCENT SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'ACCENT SPORT', 'SPORT', 'MAN', NULL, 1600, 'HATCHBACK', NULL, NULL, 'petrol', 4061406, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'ACCENT SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'ACCENT SPORT', 'SPORT', 'AUT', NULL, 1600, 'SEDAN', NULL, NULL, 'petrol', 4745009, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'ACCENT SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'ACCENT SPORT', 'SPORT', 'MAN', NULL, 1600, 'SEDAN', NULL, NULL, 'petrol', 4061406, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'ACCENT SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'ELANTRA SPORT (BLACK)', 'SPORT (BLACK)', 'MAN', NULL, 1600, 'SEDAN', NULL, NULL, 'petrol', 6139023, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'ELANTRA SPORT (BLACK)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'ELANTRA SPORT (BLACK)', 'SPORT (BLACK)', 'AUT', NULL, 1600, 'SEDAN', NULL, NULL, 'petrol', 6836030, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'ELANTRA SPORT (BLACK)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'ELANTRA SPORT (RED)', 'SPORT (RED)', 'MAN', NULL, 1600, 'SEDAN', NULL, NULL, 'petrol', 6192639, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'ELANTRA SPORT (RED)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'ELANTRA SPORT (RED)', 'SPORT (RED)', 'AUT', NULL, 1600, 'SEDAN', NULL, NULL, 'petrol', 6889646, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'ELANTRA SPORT (RED)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'ELANTRA SPORT PREMIUM (BLACK)', 'SPORT PREMIUM (BLACK)', 'MAN', NULL, 1600, 'SEDAN', NULL, NULL, 'petrol', 6836030, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'ELANTRA SPORT PREMIUM (BLACK)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'ELANTRA SPORT PREMIUM (BLACK)', 'SPORT PREMIUM (BLACK)', 'AUT', NULL, 1600, 'SEDAN', NULL, NULL, 'petrol', 7425806, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'ELANTRA SPORT PREMIUM (BLACK)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'ELANTRA SPORT PREMIUM (RED)', 'SPORT PREMIUM (RED)', 'MAN', NULL, 1600, 'SEDAN', NULL, NULL, 'petrol', 6889646, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'ELANTRA SPORT PREMIUM (RED)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'ELANTRA SPORT PREMIUM (RED)', 'SPORT PREMIUM (RED)', 'AUT', NULL, 1600, 'SEDAN', NULL, NULL, 'petrol', 7506230, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'ELANTRA SPORT PREMIUM (RED)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I20 N', 'N', 'MAN', NULL, 1600, 'HATCHBACK', NULL, NULL, 'petrol', 5190996, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I20 N'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I20 N TTR', 'N TTR', 'MAN', NULL, 1600, 'HATCHBACK', NULL, NULL, 'petrol', 5337222, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I20 N TTR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I30 ELITE HEV 1.6P DCT', 'ELITE HEV 1.6P DCT', 'AUT', NULL, 1600, 'SEDAN', NULL, NULL, 'hybrid', 5483447, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I30 ELITE HEV 1.6P DCT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I30 HEV 1.6P DCT', 'HEV 1.6P DCT', 'AUT', NULL, 1600, 'SEDAN', NULL, NULL, 'hybrid', 4825433, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I30 HEV 1.6P DCT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I30 N LINE', 'N LINE', 'MAN', NULL, 1600, 'HATCHBACK', NULL, NULL, 'petrol', 4459870, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I30 N LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I30 N LINE', 'N LINE', 'AUT', NULL, 1600, 'HATCHBACK', NULL, NULL, 'petrol', 4752321, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I30 N LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I30 N LINE', 'N LINE', 'AUT', NULL, 1600, 'SEDAN', NULL, NULL, 'petrol', 5264109, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I30 N LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I30 N LINE PREMIUM', 'N LINE PREMIUM', 'AUT', NULL, 1600, 'SEDAN', NULL, NULL, 'petrol', 6068348, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I30 N LINE PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ HYBRID PREMIUM', 'IONIQ HYBRID PREMIUM', 'AUT', NULL, 1600, 'HATCHBACK', NULL, NULL, 'hybrid', 8069197, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ HYBRID PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ PLUG-IN HYBRID PREMIUM', 'IONIQ PLUG-IN HYBRID PREMIUM', 'AUT', NULL, 1600, 'HATCHBACK', NULL, NULL, 'hybrid', 10213834, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ PLUG-IN HYBRID PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'KONA HYBRID', 'KONA HYBRID', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'hybrid', 5337222, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'KONA HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'KONA HYBRID N LINE', 'KONA HYBRID N LINE', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'hybrid', 5922123, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'KONA HYBRID N LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'KONA HYBRID PREMIUM', 'KONA HYBRID PREMIUM', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'hybrid', 6360798, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'KONA HYBRID PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'KONA HYBRID PREMIUM N LINE', 'KONA HYBRID PREMIUM N LINE', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'hybrid', 6799474, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'KONA HYBRID PREMIUM N LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'KONA HYBRID PREMIUM N LINE SUNROOF', 'KONA HYBRID PREMIUM N LINE SUNROOF', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'hybrid', 7018812, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'KONA HYBRID PREMIUM N LINE SUNROOF'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'KONA HYBRID PREMIUM SUNROOF', 'KONA HYBRID PREMIUM SUNROOF', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'hybrid', 6580136, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'KONA HYBRID PREMIUM SUNROOF'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'KONA N LINE', 'KONA N LINE', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'hybrid', 5922123, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'KONA N LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'KONA PREMIUM N LINE', 'KONA PREMIUM N LINE', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'hybrid', 6799474, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'KONA PREMIUM N LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'KONA PREMIUM N LINE SUNROOF', 'KONA PREMIUM N LINE SUNROOF', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'hybrid', 7018812, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'KONA PREMIUM N LINE SUNROOF'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'SANTA FE CALIGRAPHY (6 SEAT)', 'SANTA FE CALIGRAPHY (6 SEAT)', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'hybrid', 11040006, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'SANTA FE CALIGRAPHY (6 SEAT)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'SANTA FE CALIGRAPHY (6 SEAT)', 'SANTA FE CALIGRAPHY (6 SEAT)', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'hybrid', 11083143, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'SANTA FE CALIGRAPHY (6 SEAT)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'SANTA FE CALIGRAPHY (6 SEAT)', 'SANTA FE CALIGRAPHY (6 SEAT)', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'hybrid', 11668044, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'SANTA FE CALIGRAPHY (6 SEAT)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'SANTA FE CALIGRAPHY (7 SEAT)', 'SANTA FE CALIGRAPHY (7 SEAT)', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'hybrid', 10966894, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'SANTA FE CALIGRAPHY (7 SEAT)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'SANTA FE CALIGRAPHY (7 SEAT)', 'SANTA FE CALIGRAPHY (7 SEAT)', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'hybrid', 11010030, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'SANTA FE CALIGRAPHY (7 SEAT)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'SANTA FE CALIGRAPHY (7 SEAT)', 'SANTA FE CALIGRAPHY (7 SEAT)', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'hybrid', 11010030, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'SANTA FE CALIGRAPHY (7 SEAT)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'SANTA FE ELITE HEV (7 SEAT)', 'SANTA FE ELITE HEV (7 SEAT)', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'hybrid', 9504641, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'SANTA FE ELITE HEV (7 SEAT)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'SANTA FE HEV (2WD)', 'SANTA FE HEV (2WD)', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'hybrid', 8115501, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'SANTA FE HEV (2WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'SANTA FE HEV (AWD)', 'SANTA FE HEV (AWD)', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'hybrid', 8554177, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'SANTA FE HEV (AWD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'TUCSON ELITE (AWD)', 'TUCSON ELITE (AWD)', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'petrol', 7106547, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'TUCSON ELITE (AWD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'TUCSON ELITE (FWD)', 'TUCSON ELITE (FWD)', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'petrol', 6740984, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'TUCSON ELITE (FWD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'TUCSON ELITE HYBRID (AWD)', 'TUCSON ELITE HYBRID (AWD)', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'hybrid', 7691448, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'TUCSON ELITE HYBRID (AWD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'TUCSON ELITE HYBRID (FWD)', 'TUCSON ELITE HYBRID (FWD)', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'hybrid', 7325885, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'TUCSON ELITE HYBRID (FWD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'TUCSON ELITE HYBRID N LINE (AWD)', 'TUCSON ELITE HYBRID N LINE (AWD)', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'hybrid', 8057011, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'TUCSON ELITE HYBRID N LINE (AWD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'TUCSON ELITE HYBRID N LINE (FWD)', 'TUCSON ELITE HYBRID N LINE (FWD)', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'hybrid', 7691448, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'TUCSON ELITE HYBRID N LINE (FWD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'TUCSON ELITE N LINE (AWD)', 'TUCSON ELITE N LINE (AWD)', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'petrol', 7472110, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'TUCSON ELITE N LINE (AWD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'TUCSON ELITE N LINE (FWD)', 'TUCSON ELITE N LINE (FWD)', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'petrol', 7106547, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'TUCSON ELITE N LINE (FWD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'TUCSON HIGHLANDER (AWD)', 'TUCSON HIGHLANDER (AWD)', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'petrol', 7552534, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'TUCSON HIGHLANDER (AWD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'TUCSON HIGHLANDER (AWD) NO SRF', 'TUCSON HIGHLANDER (AWD) NO SRF', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'petrol', 7333196, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'TUCSON HIGHLANDER (AWD) NO SRF'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'TUCSON HIGHLANDER N LINE (AWD)', 'HIGHLANDER N LINE (AWD)', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'petrol', 7771872, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'TUCSON HIGHLANDER N LINE (AWD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'TUCSON HIGHLANDER N LINE (AWD) NO SRF', 'HIGHLANDER N LINE (AWD) NO SRF', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'petrol', 7552534, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'TUCSON HIGHLANDER N LINE (AWD) NO SRF'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'TUCSON HYBRID (FWD)', 'TUCSON HYBRID (FWD)', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'hybrid', 6594759, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'TUCSON HYBRID (FWD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'TUCSON HYBRID N LINE (FWD)', 'TUCSON HYBRID N LINE (FWD)', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'hybrid', 7179660, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'TUCSON HYBRID N LINE (FWD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'TUCSON PREMIUM HYBRID (AWD)', 'TUCSON PREMIUM HYBRID (AWD)', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'hybrid', 8715025, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'TUCSON PREMIUM HYBRID (AWD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'TUCSON PREMIUM N LINE HYBRID (AWD)', 'TUCSON PREMIUM N LINE HYBRID (AWD)', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'petrol', 8934363, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'TUCSON PREMIUM N LINE HYBRID (AWD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'VELOSTER TURBO', 'TURBO', 'MAN', NULL, 1600, 'HATCHBACK', NULL, NULL, 'petrol', 4407229, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'VELOSTER TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'VELOSTER TURBO', 'TURBO', 'AUT', NULL, 1600, 'HATCHBACK', NULL, NULL, 'petrol', 4841518, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'VELOSTER TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'VELOSTER TURBO PREMIUM', 'TURBO PREMIUM', 'MAN', NULL, 1600, 'HATCHBACK', NULL, NULL, 'petrol', 4938027, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'VELOSTER TURBO PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'VELOSTER TURBO PREMIUM', 'TURBO PREMIUM', 'AUT', NULL, 1600, 'HATCHBACK', NULL, NULL, 'petrol', 5275807, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'VELOSTER TURBO PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'VELOSTER TURBO PREMIUM TTR', 'TURBO PREMIUM TTR', 'MAN', NULL, 1600, 'HATCHBACK', NULL, NULL, 'petrol', 5066705, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'VELOSTER TURBO PREMIUM TTR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'VELOSTER TURBO PREMIUM TTR', 'TURBO PREMIUM TTR', 'AUT', NULL, 1600, 'HATCHBACK', NULL, NULL, 'petrol', 5468824, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'VELOSTER TURBO PREMIUM TTR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'VENUE (BASE)', '(BASE)', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'hybrid', 3582519, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'VENUE (BASE)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'VENUE (BASE)', '(BASE)', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'petrol', 3582519, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'VENUE (BASE)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'VENUE (BASE)', '(BASE)', 'MAN', NULL, 1600, 'SUV', NULL, NULL, 'petrol', 3290068, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'VENUE (BASE)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'VENUE (BASE)', '(BASE)', 'MAN', NULL, 1600, 'SUV', NULL, NULL, 'petrol', 3290068, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'VENUE (BASE)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'VENUE ACTIVE', 'ACTIVE', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'petrol', 3911525, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'VENUE ACTIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'VENUE ACTIVE', 'ACTIVE', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'petrol', 3911525, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'VENUE ACTIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'VENUE ELITE (BLACK) SUNROOF', 'ELITE (BLACK) SUNROOF', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'petrol', 4277089, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'VENUE ELITE (BLACK) SUNROOF'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'VENUE ELITE (BLACK) SUNROOF', 'ELITE (BLACK) SUNROOF', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'petrol', 4277089, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'VENUE ELITE (BLACK) SUNROOF'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'VENUE ELITE (BLACK) TWO-TONE ROOF', 'ELITE (BLACK) TWO-TONE ROOF', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'petrol', 4277089, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'VENUE ELITE (BLACK) TWO-TONE ROOF'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'VENUE ELITE (DENIM) TWO-TONE ROOF', 'ELITE (DENIM) TWO-TONE ROOF', 'AUT', NULL, 1600, 'SUV', NULL, NULL, 'petrol', 4277089, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'VENUE ELITE (DENIM) TWO-TONE ROOF'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I40 ACTIVE', 'ACTIVE', 'AUT', NULL, 1700, 'SEDAN', NULL, NULL, 'diesel', 5428612, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I40 ACTIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I40 ACTIVE TOURER', 'ACTIVE TOURER', 'AUT', NULL, 1700, 'STATION WAGON', NULL, NULL, 'diesel', 5348189, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I40 ACTIVE TOURER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I40 PREMIUM', 'PREMIUM', 'AUT', NULL, 1700, 'SEDAN', NULL, NULL, 'diesel', 6675183, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I40 PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I40 PREMIUM TOURER', 'PREMIUM TOURER', 'AUT', NULL, 1700, 'STATION WAGON', NULL, NULL, 'diesel', 7479422, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I40 PREMIUM TOURER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'ELANTRA ACTIVE', 'ACTIVE', 'AUT', NULL, 2000, 'SEDAN', NULL, NULL, 'petrol', 5415208, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'ELANTRA ACTIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'ELANTRA ACTIVE SMARTSENSE', 'ACTIVE SMARTSENSE', 'AUT', NULL, 2000, 'SEDAN', NULL, NULL, 'petrol', 5763712, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'ELANTRA ACTIVE SMARTSENSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'ELANTRA GO', 'GO', 'AUT', NULL, 2000, 'SEDAN', NULL, NULL, 'petrol', 4852241, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'ELANTRA GO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'ELANTRA GO', 'GO', 'MAN', NULL, 2000, 'SEDAN', NULL, NULL, 'petrol', 4342890, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'ELANTRA GO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'ELANTRA GO SMARTSENSE', 'GO SMARTSENSE', 'AUT', NULL, 2000, 'SEDAN', NULL, NULL, 'petrol', 5200745, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'ELANTRA GO SMARTSENSE'
);