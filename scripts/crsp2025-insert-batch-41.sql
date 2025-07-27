INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'MACAN GTS', NULL, '7 AT', '4WD', 2900, 'SUV', NULL, NULL, 'petrol', 19142763, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'MACAN GTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'MACAN S', NULL, '7 AT', '4WD', 2900, 'SUV', NULL, NULL, 'petrol', 15873498, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'MACAN S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'MACAN T', NULL, '7 AT', '4WD', 2000, 'SUV', NULL, NULL, 'petrol', 13131098, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'MACAN T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'PANAMERA (BASE)', NULL, '8 AT', '2WD', 2900, 'SEDAN', NULL, NULL, 'petrol', 27761735, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'PANAMERA (BASE)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'PANAMERA 4', NULL, '8 AT', '2WD', 2900, 'SEDAN', NULL, NULL, 'petrol', 25425966, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'PANAMERA 4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'PANAMERA 4 E-HYBRID', NULL, '8 AT', '2WD', 2900, 'SEDAN', NULL, NULL, 'petrol/electric', 33962531, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'PANAMERA 4 E-HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'PANAMERA 4 E-HYBRID EXECUTIVE', NULL, '8 AT', '2WD', 2900, 'SEDAN', NULL, NULL, 'petrol/electric', 30745952, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'PANAMERA 4 E-HYBRID EXECUTIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'PANAMERA 4 E-HYBRID PLATINUM EDITION', NULL, '8 AT', '2WD', 2900, 'SEDAN', NULL, NULL, 'petrol/electric', 29408526, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'PANAMERA 4 E-HYBRID PLATINUM EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'PANAMERA 4 E-HYBRID SPORT TURISMO', NULL, '8 AT', '4WD', 2900, 'WAGON', NULL, NULL, 'petrol/electric', 30478467, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'PANAMERA 4 E-HYBRID SPORT TURISMO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'PANAMERA 4 EXECUTIVE', NULL, '8 AT', '2WD', 2900, 'SEDAN', NULL, NULL, 'petrol', 26540489, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'PANAMERA 4 EXECUTIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'PANAMERA 4 PLATINUM EDITION', NULL, '8 AT', '2WD', 2900, 'SEDAN', NULL, NULL, 'petrol', 25292224, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'PANAMERA 4 PLATINUM EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'PANAMERA 4 SPORT TURISMO', NULL, '8 AT', '4WD', 2900, 'WAGON', NULL, NULL, 'petrol', 26763393, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'PANAMERA 4 SPORT TURISMO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'PANAMERA 4S E-HYBRID', NULL, '8 AT', '2WD', 2900, 'SEDAN', NULL, NULL, 'petrol/electric', 40190346, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'PANAMERA 4S E-HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'PANAMERA GTS', NULL, '8 AT', '2WD', 4000, 'SEDAN', NULL, NULL, 'petrol', 46305583, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'PANAMERA GTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'PANAMERA GTS SPORT TURISMO', NULL, '8 AT', '4WD', 4000, 'WAGON', NULL, NULL, 'petrol', 42065783, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'PANAMERA GTS SPORT TURISMO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'PANAMERA PLATINUM EDITION', NULL, '8 AT', '2WD', 2900, 'SEDAN', NULL, NULL, 'petrol', 24207422, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'PANAMERA PLATINUM EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'PANAMERA TURBO S', NULL, '8 AT', '2WD', 4000, 'SEDAN', NULL, NULL, 'petrol', 53866096, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'PANAMERA TURBO S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'PANAMERA TURBO S E-HYBRID', NULL, '8 AT', '2WD', 4000, 'SEDAN', NULL, NULL, 'petrol/electric', 63253075, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'PANAMERA TURBO S E-HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'TAYCAN (BASE)', NULL, '2 AT', '2WD', NULL, 'SEDAN', NULL, NULL, 'electric', 18040399, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'TAYCAN (BASE)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'TAYCAN 4', NULL, NULL, '2WD', NULL, 'SEDAN', NULL, NULL, 'electric', 21740613, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'TAYCAN 4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'TAYCAN 4 CROSS TURISMO', NULL, NULL, '4WD', NULL, 'WAGON', NULL, NULL, 'electric', 18872576, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'TAYCAN 4 CROSS TURISMO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'TAYCAN 4S', NULL, NULL, '2WD', NULL, 'SEDAN', NULL, NULL, 'electric', 22528209, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'TAYCAN 4S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'TAYCAN 4S CROSS TURISMO', NULL, NULL, '4WD', NULL, 'WAGON', NULL, NULL, 'electric', 25485408, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'TAYCAN 4S CROSS TURISMO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'TAYCAN GT', NULL, NULL, '2WD', NULL, 'SEDAN', NULL, NULL, 'electric', 49098418, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'TAYCAN GT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'TAYCAN GTS', NULL, NULL, '2WD', NULL, 'SEDAN', NULL, NULL, 'electric', 27224062, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'TAYCAN GTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'TAYCAN TURBO', NULL, NULL, '2WD', NULL, 'SEDAN', NULL, NULL, 'electric', 32083379, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'TAYCAN TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'TAYCAN TURBO CROSS TURISMO', NULL, NULL, '4WD', NULL, 'WAGON', NULL, NULL, 'electric', 32380585, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'TAYCAN TURBO CROSS TURISMO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'TAYCAN TURBO S', NULL, NULL, '2WD', NULL, 'SEDAN', NULL, NULL, 'electric', 42886814, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'TAYCAN TURBO S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '912 BASE GRADE', '45', 'MT', '2WD', 1600, 'COUPE', NULL, NULL, 'petrol', 23453688, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '912 BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 BOXSTER 718 BOXSTER', 'WP0ZZZ98ZKS20', 'MT', '2WD', 2000, 'CONVERTIBLE', NULL, NULL, 'petrol', 12473728, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 BOXSTER 718 BOXSTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'MACAN MACAN', 'WP1ZZZ95ZJLB1', 'AT', '4WD', 2000, 'COUPE', NULL, NULL, 'petrol', 4553618, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'MACAN MACAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 CAYMAN 718 CAYMAN', 'WP0ZZZ98ZJK25', 'AT', '2WD', 2000, 'CONVERTIBLE', NULL, NULL, 'petrol', 10812219, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 CAYMAN 718 CAYMAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 CAYMAN 718 CAYMAN T', 'WP0ZZZ98ZMS25', 'AT', '2WD', 2000, 'COUPE', NULL, NULL, 'petrol', 16050374, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 CAYMAN 718 CAYMAN T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 BOXSTER 718 BOXSTER T', 'WP0ZZZ98ZPS20', 'MT', '2WD', 2000, 'CONVERTIBLE', NULL, NULL, 'petrol', 17522300, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 BOXSTER 718 BOXSTER T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 CAYMAN 718 CAYMAN STYLE EDITION', 'WP0ZZZ98ZPS25', 'AT', '2WD', 2000, 'COUPE', NULL, NULL, 'petrol', 18835179, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 CAYMAN 718 CAYMAN STYLE EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 BOXSTER 718 BOXSTER STYLE EDITION', 'WP0ZZZ98ZRK20', 'MT', '2WD', 2000, 'CONVERTIBLE', NULL, NULL, 'petrol', 17993291, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 BOXSTER 718 BOXSTER STYLE EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 BOXSTER', 'WP0ZZZ98ZRK20', 'MT', '2WD', 2000, 'CONVERTIBLE', NULL, NULL, 'petrol', 16344717, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 BOXSTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'MACAN MACAN T', 'WP1ZZZ95ZRLB0', 'AT', '4WD', 2000, 'COUPE', NULL, NULL, 'petrol', 14900996, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'MACAN MACAN T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 BOXSTER 718 BOXSTER STYLE EDITION', '7BA-982SA', 'AT', '2WD', 2000, 'CONVERTIBLE', NULL, NULL, 'petrol', 17831275, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 BOXSTER 718 BOXSTER STYLE EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 BOXSTER 718 BOXSTER S', 'WP0ZZZ98ZJS22', 'MT', '2WD', 2500, 'COUPE', NULL, NULL, 'petrol', 10157158, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 BOXSTER 718 BOXSTER S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 BOXSTER 718 BOXSTER GTS', 'WP0ZZZ98ZKS22', 'MT', '2WD', 2500, 'CONVERTIBLE', NULL, NULL, 'petrol', 14560847, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 BOXSTER 718 BOXSTER GTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 CAYMAN 718 CAYMAN GTS', 'WP0ZZZ98ZKS27', 'MT', '2WD', 2500, 'COUPE', NULL, NULL, 'petrol', 14431277, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 CAYMAN 718 CAYMAN GTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 CAYMAN 718 CAYMAN S', 'WP0ZZZ98ZJS27', 'AT', '2WD', 2500, 'COUPE', NULL, NULL, 'petrol', 10545656, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 CAYMAN 718 CAYMAN S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 BOXSTER 718 BOXSTER S', 'WP0ZZZ98ZKS22', 'MT', '2WD', 2500, 'CONVERTIBLE', NULL, NULL, 'petrol', 17183636, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 BOXSTER 718 BOXSTER S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 BOXSTER 718 BOXSTER S', 'WP0ZZZ98ZKS22', 'AT', '2WD', 2500, 'CONVERTIBLE', NULL, NULL, 'petrol', 13427585, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 BOXSTER 718 BOXSTER S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 CAYMAN 718 CAYMAN STYLE EDITION', 'WP0ZZZ98ZPS25', 'MT', '2WD', 2500, 'COUPE', NULL, NULL, 'petrol', 15532306, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 CAYMAN 718 CAYMAN STYLE EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'CAYENNE S', 'ABA-E3K29', 'AT', '4WD', 2900, 'WAGON', NULL, NULL, 'petrol', 10139344, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'CAYENNE S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'PANAMERA 4 E-HYBRID', 'ALA-G2J29A', 'AT', '4WD', 2900, 'COUPE', NULL, NULL, 'hybrid', 9541964, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'PANAMERA 4 E-HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'PANAMERA 4 E-HYBRID SPORT TURISMO', 'ALA-G2J29A', 'AT', '4WD', 2900, 'COUPE', NULL, NULL, 'hybrid', 9865784, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'PANAMERA 4 E-HYBRID SPORT TURISMO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'PANAMERA 4S SPORT TURISMO', 'ABA-G2J29A', 'AT', '4WD', 2900, 'COUPE', NULL, NULL, 'petrol', 10869476, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'PANAMERA 4S SPORT TURISMO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'CAYENNE COUPE CAYENNE S COUPE', 'WP1ZZZ9YZLDA7', 'AT', '4WD', 2900, 'COUPE', NULL, NULL, 'petrol', 11484669, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'CAYENNE COUPE CAYENNE S COUPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'PANAMERA 4', 'WPOZZZ97ZML11', 'AT', '4WD', 2900, 'COUPE', NULL, NULL, 'petrol', 18462797, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'PANAMERA 4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'PANAMERA 4 E-HYBRID PLATINUM EDITION', '3LA-G2NM', 'AT', '4WD', 2900, 'COUPE', NULL, NULL, 'hybrid', 15402736, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'PANAMERA 4 E-HYBRID PLATINUM EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'PANAMERA 4 E-HYBRID SPORT TURISMO', 'WP0ZZZ97ZPL15', 'AT', '4WD', 2900, 'COUPE', NULL, NULL, 'petrol', 17036465, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'PANAMERA 4 E-HYBRID SPORT TURISMO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'PANAMERA BASE GRADE', 'WP0ZZZ97ZJL11', 'AT', '2WD', 3000, 'COUPE', NULL, NULL, 'petrol', 8382619, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'PANAMERA BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'PANAMERA 4 EXECUTIVE', 'WP0ZZZ97ZJL15', 'AT', '4WD', 3000, 'COUPE', NULL, NULL, 'petrol', 10619242, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'PANAMERA 4 EXECUTIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'OTHER', 'WP0ZZZ99ZJS14', 'MT', '2WD', 3000, 'CONVERTIBLE', NULL, NULL, 'petrol', 27412895, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'OTHER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 911 CARRERA S', 'WP0ZZZ99ZLS21', 'AT', '2WD', 3000, 'COUPE', NULL, NULL, 'petrol', 26703546, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 911 CARRERA S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 911 CARRERA', 'WP0ZZZ99ZKS10', 'MT', '2WD', 3000, 'COUPE', NULL, NULL, 'petrol', 23497797, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 911 CARRERA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'MACAN MACAN S', 'WP1ZZZ95ZLLB3', 'AT', '4WD', 3000, 'COUPE', NULL, NULL, 'petrol', 10707672, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'MACAN MACAN S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'PANAMERA 4 SPORT TURISMO', 'WPOZZZ97ZJL18', 'AT', '2WD', 3000, 'COUPE', NULL, NULL, 'petrol', 8036321, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'PANAMERA 4 SPORT TURISMO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 911 CARRERA 4', '3BA-992L30', 'AT', '2WD', 3000, 'COUPE', NULL, NULL, 'petrol', 25343589, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 911 CARRERA 4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 911 CARRERA CABRIOLET', 'WP0ZZZ99ZLS24', 'AT', '2WD', 3000, 'CONVERTIBLE', NULL, NULL, 'petrol', 30945432, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 911 CARRERA CABRIOLET'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911', 'WP0ZZZ99ZLS20', 'AT', '2WD', 3000, 'COUPE', NULL, NULL, 'petrol', 20348245, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'CAYENNE COUPE CAYENNE E-HYBRID COUPE', 'WP1ZZZ9YZLDA7', 'AT', '4WD', 3000, 'COUPE', NULL, NULL, 'hybrid', 12618143, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'CAYENNE COUPE CAYENNE E-HYBRID COUPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 911 CARRERA 4S', '3BA-992NA2', 'AT', '2WD', 3000, 'COUPE', NULL, NULL, 'petrol', 37113906, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 911 CARRERA 4S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'CAYENNE BASEGRADE', 'WP1ZZZ9YZNDA0', 'AT', '4WD', 3000, 'WAGON', NULL, NULL, 'petrol', 11355311, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'CAYENNE BASEGRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'PANAMERA', 'WP0ZZZ97ZPL10', 'AT', '4WD', 3000, 'COUPE', NULL, NULL, 'petrol', 19450373, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'PANAMERA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 911 TARGA 4 GTS', 'WP0ZZZ99ZPS23', 'AT', '4WD', 3000, 'COUPE', NULL, NULL, 'petrol', 44054712, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 911 TARGA 4 GTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'CAYENNE COUPE CAYENNE COUPE PLATINUM EDITION', 'WP1ZZZ9YZPDA2', 'AT', '4WD', 3000, 'COUPE', NULL, NULL, 'petrol', 15969367, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'CAYENNE COUPE CAYENNE COUPE PLATINUM EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'CAYENNE COUPE BASE GRADE', 'WP1ZZZ9YZRDA4', 'AT', '4WD', 3000, 'COUPE', NULL, NULL, 'petrol', 20259815, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'CAYENNE COUPE BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'CAYENNE COUPE', 'WP1ZZZ9YZRDA4', 'AT', '4WD', 3000, 'COUPE', NULL, NULL, 'petrol', 17102841, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'CAYENNE COUPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 911 CARRERA', '7BA-992SK1', 'AT', '2WD', 3000, 'COUPE', NULL, NULL, 'petrol', 35284443, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 911 CARRERA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 911 CARRERA GTS', 'WP0ZZZ99ZRS27', 'AT', '2WD', 3000, 'COUPE', NULL, NULL, 'petrol', 43039569, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 911 CARRERA GTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 911 CARRERA GTS', 'WP0ZZZ99ZRS27', 'MT', '2WD', 3000, 'COUPE', NULL, NULL, 'petrol', 37274226, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 911 CARRERA GTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 911 TARGA 4', 'WP0ZZZ99ZRS22', 'AT', '4WD', 3000, 'COUPE', NULL, NULL, 'petrol', 40416780, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 911 TARGA 4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'CAYENNE E-HYBRID', 'WP1ZZZ9YZRDA2', 'AT', '4WD', 3000, 'WAGON', NULL, NULL, 'petrol', 17960846, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'CAYENNE E-HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 911 CARRERA T', 'WP0ZZZ99ZSS20', 'MT', '2WD', 3000, 'COUPE', NULL, NULL, 'petrol', 36951891, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 911 CARRERA T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'CAYENNE PLATINUM EDITION', 'ABA-92ACEY', 'AT', '4WD', 3600, 'WAGON', NULL, NULL, 'petrol', 6258424, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'CAYENNE PLATINUM EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 911 SPORT CLASSIC', 'WP0ZZZ99ZPS25', 'MT', '2WD', 3700, 'COUPE', NULL, NULL, 'petrol', 124569559, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 911 SPORT CLASSIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 911GT2 RS', 'WP0ZZZ99ZKS15', 'AT', '2WD', 3800, 'COUPE', NULL, NULL, 'petrol', 81996793, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 911GT2 RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 911 TURBO', '3BA-992NE', 'AT', '4WD', 3800, 'COUPE', NULL, NULL, 'petrol', 46503292, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 911 TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 911 TURBO CABRIOLET', 'WP0ZZZ99ZPS26', 'AT', '2WD', 3800, 'CONVERTIBLE', NULL, NULL, 'petrol', 56079769, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 911 TURBO CABRIOLET'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 911 TURBO S CABRIOLET', 'WP0ZZZ99ZRS25', 'AT', '4WD', 3800, 'CONVERTIBLE', NULL, NULL, 'petrol', 73514081, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 911 TURBO S CABRIOLET'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'CAYENNE TURBO', 'WP1ZZZ9YZKDA9', 'AT', '4WD', 4000, 'WAGON', NULL, NULL, 'petrol', 15423447, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'CAYENNE TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'PANAMERA TURBO S E-HYBRID', 'ALA-G2J40A', 'AT', '4WD', 4000, 'COUPE', NULL, NULL, 'petrol', 17177469, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'PANAMERA TURBO S E-HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'PANAMERA TURBO SPORT TURISMO', 'WP0ZZZ97ZJL19', 'AT', '4WD', 4000, 'COUPE', NULL, NULL, 'petrol', 16160205, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'PANAMERA TURBO SPORT TURISMO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'MACAN MACAN TURBO', 'WP1ZZZ95ZLLB7', 'AT', '4WD', 4000, 'COUPE', NULL, NULL, 'petrol', 11837523, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'MACAN MACAN TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'PANAMERA TURBO', 'WP0ZZZ97ZJL14', 'AT', '4WD', 4000, 'COUPE', NULL, NULL, 'petrol', 15598964, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'PANAMERA TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 SPYDER 718 SPYDER', 'WP0ZZZ98ZLS23', 'MT', '2WD', 4000, 'CONVERTIBLE', NULL, NULL, 'petrol', 21693128, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 SPYDER 718 SPYDER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 SPYDER 718 SPYDER', 'WP0ZZZ98ZLS23', 'MT', '2WD', 4000, 'CONVERTIBLE', NULL, NULL, 'petrol', 23351351, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 SPYDER 718 SPYDER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 SPYDER', 'WP0ZZZ98ZLS23', 'MT', '2WD', 4000, 'CONVERTIBLE', NULL, NULL, 'petrol', 21964214, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 SPYDER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'CAYENNE GTS', '3BA-E3M40', 'AT', '4WD', 4000, 'WAGON', NULL, NULL, 'petrol', 13318850, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'CAYENNE GTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'CAYENNE COUPE CAYENNE TURBO COUPE', 'WP1ZZZ9YZLDA8', 'AT', '4WD', 4000, 'COUPE', NULL, NULL, 'petrol', 21948133, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'CAYENNE COUPE CAYENNE TURBO COUPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'PANAMERA GTS', '3BA-G2K40A', 'AT', '4WD', 4000, 'COUPE', NULL, NULL, 'petrol', 13494138, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'PANAMERA GTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'PANAMERA GTS SPORT TURISMO', '3BA-G2K40A', 'AT', '4WD', 4000, 'COUPE', NULL, NULL, 'petrol', 24754568, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'PANAMERA GTS SPORT TURISMO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 CAYMAN 718 CAYMAN GTS 4.0', 'WP0ZZZ98ZMS27', 'MT', '2WD', 4000, 'COUPE', NULL, NULL, 'petrol', 20334479, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 CAYMAN 718 CAYMAN GTS 4.0'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'CAYENNE COUPE CAYENNE GTS COUPE', 'WP1ZZZ9YZMDA6', 'AT', '4WD', 4000, 'COUPE', NULL, NULL, 'petrol', 23590504, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'CAYENNE COUPE CAYENNE GTS COUPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 CAYMAN 718 CAYMAN GT4', 'WP0ZZZ98ZNS27', 'AT', '4WD', 4000, 'COUPE', NULL, NULL, 'petrol', 44047891, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 CAYMAN 718 CAYMAN GT4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 CAYMAN', 'WP0ZZZ98ZNS27', 'AT', '2WD', 4000, 'COUPE', NULL, NULL, 'petrol', 39232428, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 CAYMAN'
);