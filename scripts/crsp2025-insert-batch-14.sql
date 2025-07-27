INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'HONDA E ADVANCE', 'ZAA-ZC7', '7AT', '2WD', NULL, 'HATCHBACK', '1760', '4', 'electric', 7608100, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'HONDA E ADVANCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'INSIGHT EX-BLACK STYLE', '6AA-ZE4', '7AT', '2WD', 1496, 'SEDAN', '1665', '5', 'petrol', 5633766, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'INSIGHT EX-BLACK STYLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'JADE HYBRID RS', 'DBA-FR4', '7AT', '2WD', 1496, 'WAGON', '1725', '5', 'petrol', 4500306, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'JADE HYBRID RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'JADE HYBRID X', 'DAA-FR4', 'CVT', '2WD', 1496, 'WAGON', '1840', '6', 'petrol', 4533344, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'JADE HYBRID X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'JADE RS', 'DBA-FR5', 'CVT', '2WD', 1496, 'WAGON', '1840', '6', 'petrol', 3927864, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'JADE RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'LEGEND HYBRID EX', 'DAA-KC2', '7AT', 'AWD', 3471, 'SEDAN', '2285', '5', 'petrol', 12355302, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'LEGEND HYBRID EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'LEGEND HYBRID X', 'DAA-KC2', 'CVT', '2WD', 3471, 'SEDAN', '2255', '5', 'petrol', 11876741, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'LEGEND HYBRID X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-B0X EX', '6BA-JF3', 'CVT', '2WD', 658, 'MINIVAN', '1150', '4', 'petrol', 2781337, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-B0X EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-BOX', '6BA-JF5', 'CVT', '2WD', 658, 'MINIVAN', '1130', '4', 'petrol', 2764737, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-BOX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-BOX CUSTOM G', 'DBA-JF3', 'CVT', '2WD', 658, 'MINIVAN', '1180', '4', 'petrol', 3026473, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-BOX CUSTOM G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-Box Custom G.EX', 'DBA-JF3', 'CVT', '2WD', 658, 'MINIVAN', '1180', '4', 'petrol', 3026473, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-Box Custom G.EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-BOX CUSTOM G.EX TURBO', '6BA-JF3', 'CVT', '2WD', 658, 'MINIVAN', '1180', '4', 'petrol', 3043240, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-BOX CUSTOM G.EX TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-BOX CUSTOM SLOPE', '6BA-JF5', 'CVT', '2WD', 658, 'MINIVAN', '1180', '4', 'petrol', 3465772, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-BOX CUSTOM SLOPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-BOX EX', '6BA-JF3', 'CVT', '2WD', 658, 'MINIVAN', '1150', '4', 'petrol', 2814536, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-BOX EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-BOX G', 'DBA-JF3', 'CVT', '2WD', 658, 'MINIVAN', '1150', '4', 'petrol', 2478187, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-BOX G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-BOX G', '6BA-JF3', 'CVT', '2WD', 658, 'MINIVAN', '1150', '4', 'petrol', 2503337, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-BOX G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-BOX G SLOPE L', '6BA-JF3', 'CVT', '2WD', 658, 'MINIVAN', '1160', '4', 'petrol', 2848808, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-BOX G SLOPE L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-BOX G SLOPE L', 'DBA-JF3', 'CVT', '2WD', 658, 'MINIVAN', '1160', '4', 'petrol', 2832041, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-BOX G SLOPE L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-Box G.EX', 'DBA-JF3', 'CVT', '2WD', 658, 'MINIVAN', '1150', '4', 'petrol', 2478187, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-Box G.EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-BOX G.L', 'DBA-JF1', 'CVT', '2WD', 658, 'MINIVAN', '1140', '5', 'petrol', 2406088, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-BOX G.L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-BOX G-EX TURBO', 'DBA-JF3', 'CVT', '2WD', 658, 'MINIVAN', '1180', '5', 'petrol', 3026473, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-BOX G-EX TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-BOX JOY TURBO', '6BA-JF5', 'CVT', '2WD', 658, 'MINIVAN', '1150', '4', 'petrol', 3567046, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-BOX JOY TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-BOX L', '6BA-JF3', 'CVT', '2WD', 658, 'MINIVAN', '1170', '4', 'petrol', 2930900, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-BOX L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-BOX SLASH G', 'DBA-JF1', 'CVT', '2WD', 658, 'MINIVAN', '1140', '4', 'petrol', 2406088, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-BOX SLASH G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-BOX SLASH X', 'DBA-JF1', 'CVT', '2WD', 658, 'MINIVAN', '1150', '4', 'petrol', 2484025, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-BOX SLASH X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-ONE G.L', 'DBA-JG1', 'CVT', '2WD', 658, 'HATCHBACK', '1060', '4', 'petrol', 2015165, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-ONE G.L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-ONE MODULO X', 'DBA-JG1', 'CVT', '2WD', 658, 'HATCHBACK', '1090', '4', 'petrol', 2946674, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-ONE MODULO X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-ONE ORIGINAL', '6BA-JG3', 'CVT', '2WD', 658, 'HATCHBACK', '1060', '4', 'petrol', 2786870, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-ONE ORIGINAL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-ONE PREMIUM TOURER', 'DBA-JG1', 'CVT', '2WD', 658, 'HATCHBACK', '1090', '4', 'petrol', 2480920, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-ONE PREMIUM TOURER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-ONE PRMIUM', 'DBA-JG1', 'CVT', '2WD', 658, 'HATCHBACK', '1080', '4', 'petrol', 2548609, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-ONE PRMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-ONE RS', 'DBA-JG1', 'CVT', '2WD', 658, 'HATCHBACK', '1080', '4', 'petrol', 2702867, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-ONE RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-ONE SELECT', 'DBA-JG1', 'CVT', '2WD', 658, 'HATCHBACK', '1060', '4', 'petrol', 2204882, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-ONE SELECT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-ONE STANDARD', 'DBA-JG1', 'CVT', '2WD', 658, 'HATCHBACK', '1050', '4', 'petrol', 2065714, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-ONE STANDARD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-ONE STANDARD. L', 'DBA-JG1', 'CVT', '2WD', 658, 'HATCHBACK', '1050', '4', 'petrol', 2065714, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-ONE STANDARD. L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'NSX', '5AA-NC1', '6MT', 'AWD', 3492, 'COUPE', '1910', '2', 'petrol', 36887756, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'NSX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'NSX', 'CAA-NC1', '9AT', 'AWD', 3492, 'COUPE', '1910', '2', 'petrol', 39696257, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'NSX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-VAN', '5BD-JJ1', 'CVT', '2WD', 658, 'VAN', '1410', '4', 'petrol', 2357128, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-VAN E (EV) E:L4', 'ZAB-JJ3', 'CVT', '2WD', NULL, 'VAN', '1540', '4', 'electric', 4526128, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-VAN E (EV) E:L4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-VAN L', '5BD-JJ1', 'CVT', '2WD', 658, 'VAN', '1410', '4', 'petrol', 2532344, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-VAN L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-VAN L', 'GBD-JJ1', 'CVT', '2WD', 658, 'VAN', '1410', '4', 'petrol', 2082482, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-VAN L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-VAN L', '5BD-JJ1', 'CVT', '2WD', 658, 'VAN', '1410', '4', 'petrol', 2357128, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-VAN L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-VAN L', 'HBD-JJ1', 'CVT', '2WD', 658, 'VAN', '1410', '4', 'petrol', 2082482, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-VAN L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-WGN  C', 'DBA-JH1', 'CVT', '2WD', 658, 'WAGON', '1050', '5', 'petrol', 1692243, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-WGN  C'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-WGN CUSTOM', '6BA-JH3', 'CVT', '2WD', 658, 'WAGON', '1090', '4', 'petrol', 2582143, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-WGN CUSTOM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-WGN Custom G.L', 'DBA-JH1', 'CVT', '2WD', 658, 'WAGON', '1060', '4', 'petrol', 2251147, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-WGN Custom G.L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-WGN CUSTOM L', '6BA-JH3', 'CVT', '2WD', 658, 'WAGON', '1090', '4', 'petrol', 2582143, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-WGN CUSTOM L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-WGN E:HEV HOME', '6BA-JH3', 'CVT', '2WD', 658, 'WAGON', '1070', '4', 'petrol', 2427214, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-WGN E:HEV HOME'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-WGN G', '6BA-JH3', 'CVT', '2WD', 658, 'WAGON', '1090', '4', 'petrol', 2213265, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-WGN G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-WGN G. HONDA SENSING', '6BA-JH3', 'CVT', '2WD', 658, 'WAGON', '1070', '4', 'petrol', 2434592, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-WGN G. HONDA SENSING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-WGN G.L', 'DBA-JH1', 'CVT', '2WD', 658, 'WAGON', '1050', '4', 'petrol', 1897174, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-WGN G.L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-WGN G.L PACKAGE', 'DBA-JH1', 'CVT', '2WD', 658, 'WAGON', '1060', '4', 'petrol', 2212335, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-WGN G.L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-WGN L', '6BA-JH3', 'CVT', '2WD', 658, 'WAGON', '1070', '4', 'petrol', 2379260, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-WGN L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'N-WGN L HONDA SENSING', '6BA-JH3', 'CVT', '2WD', 658, 'WAGON', '1070', '4', 'petrol', 2287041, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'N-WGN L HONDA SENSING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'Odssey Absolute X', 'DBA-RC1', 'CVT', '2WD', 2356, 'MINIVAN', '2200', '8', 'petrol', 5175050, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'Odssey Absolute X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'ODSSEY E:HEV ABSOLUTE BLACK EDITION', '6AA-RC5', 'CVT', '2WD', 1993, 'MINIVAN', '2335', '7', 'petrol', 9020209, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'ODSSEY E:HEV ABSOLUTE BLACK EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'ODSSEY G', 'DBA-RC1', 'CVT', '2WD', 2356, 'MINIVAN', '2190', '8', 'petrol', 4819267, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'ODSSEY G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'Odssey G', 'DBA-RC1', 'CVT', '2WD', 2356, 'MINIVAN', '2160', '8', 'petrol', 5274670, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'Odssey G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'Odssey G', 'DBA-RC21', 'CVT', '2WD', 2356, 'MINIVAN', '2165', '7', 'petrol', 5274670, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'Odssey G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'Odssey Hybrid Absolute Sensing EX', 'DAA-RC4', 'CVT', '2WD', 1993, 'MINIVAN', '2285', '7', 'petrol', 6468813, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'Odssey Hybrid Absolute Sensing EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'ODYSSEY G', 'DBA-RC1', 'CVT', '2WD', 2356, 'MINIVAN', '2205', '7', 'petrol', 5623986, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'ODYSSEY G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'ODYSSEY G AERO', '6BA-RC1', 'CVT', '2WD', 2356, 'MINIVAN', '2190', '8', 'petrol', 4626496, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'ODYSSEY G AERO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'ODYSSEY G.AERO', 'DBA-RC1', 'CVT', '2WD', 2356, 'MINIVAN', '2190', '5', 'petrol', 4819267, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'ODYSSEY G.AERO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'Odyssey Hybrid', 'DAA-RC4', 'CVT', '2WD', 1993, 'MINIVAN', '2245', '7', 'petrol', 5896971, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'Odyssey Hybrid'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'ODYSSEY HYBRID ABSOLUTE', '6AA-RC4', 'CVT', '2WD', 1993, 'MINIVAN', '2275', '7', 'petrol', 6577075, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'ODYSSEY HYBRID ABSOLUTE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'ODYSSEY HYBRID ABSOLUTE EX', '6AA-RC4', 'CVT', '2WD', 1993, 'MINIVAN', '2275', '8', 'petrol', 6711394, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'ODYSSEY HYBRID ABSOLUTE EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'S660', '3BA-JWS', '6MT', '2WD', 658, 'CONVERTIBLE', '940', '2', 'petrol', 3537871, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'S660'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'S660', 'DBA-JW5', '6MT', '2WD', 658, 'CONVERTIBLE', '940', '2', 'petrol', 3393674, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'S660'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'S669 MODULO X', 'DBA-JW5', '6MT', '2WD', 658, 'CONVERTIBLE', '940', '2', 'petrol', 4424854, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'S669 MODULO X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'Shutte Hybrid Sensing (FF)', 'DAA-GP7', 'CVT', '2WD', 1496, 'WAGON', '1515', '5', 'petrol', 3834650, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'Shutte Hybrid Sensing (FF)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'Shuttle Hybrid', 'DAA-GP7', 'CVT', '2WD', 1496, 'WAGON', '1465', '5', 'petrol', 3380260, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'Shuttle Hybrid'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'SHUTTLE HYBRID Z', '6AA-GP7', '7AT', '2WD', 1496, 'WAGON', '1515', '5', 'petrol', 3973817, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'SHUTTLE HYBRID Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'SHUTTLE HYBRID Z', 'DAA-GP7', '7AT', '2WD', 1496, 'WAGON', '1515', '5', 'petrol', 3834650, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'SHUTTLE HYBRID Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'SHUTTLE HYBRID Z HONDA SENSING', '6AA-GP7', '7AT', '2WD', 1496, 'WAGON', '1515', '5', 'petrol', 4371199, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'SHUTTLE HYBRID Z HONDA SENSING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'ShuttleG Sensing (FF)', 'DBA-GK8', 'CVT', '2WD', 1496, 'WAGON', '1405', '5', 'petrol', 2748138, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'ShuttleG Sensing (FF)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'STEP WGN  SPADA', '5BA-RP6', 'CVT', '2WD', 1496, 'WAGON', '2175', '7', 'petrol', 6103247, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'STEP WGN  SPADA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'STEP WGN E:HEV SPADA', '6AA-RP8', 'CVT', '2WD', 1993, 'WAGON', '2225', '7', 'petrol', 6359296, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'STEP WGN E:HEV SPADA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'STEP WGN E:HEV SPADA', '6AA-RP6', 'CVT', '2WD', 1993, 'WAGON', '2225', '7', 'petrol', 6724331, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'STEP WGN E:HEV SPADA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'STEP WGN E:HEV SPADA G', '6AA-RP5', 'CVT', '2WD', 1993, 'WAGON', '2205', '7', 'petrol', 5549931, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'STEP WGN E:HEV SPADA G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'STEP WGN G', 'DBA-RP1', 'CVT', '2WD', 1496, 'WAGON', '2135', '7', 'petrol', 5286686, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'STEP WGN G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'STEP WGN G', '6BA-RP1', 'CVT', '2WD', 1496, 'WAGON', '2065', '7', 'petrol', 4450005, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'STEP WGN G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'STEP WGN G', '66A-RP1', 'CVT', '2WD', 1496, 'WAGON', '2135', '7', 'petrol', 5293393, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'STEP WGN G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'STEP WGN G. HONDA SENSING', '6BA-RP1', 'CVT', '2WD', 1496, 'WAGON', '2135', '7', 'petrol', 5293393, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'STEP WGN G. HONDA SENSING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'STEP WGN G-EX', 'DBA-RP1', 'CVT', '2WD', 1496, 'WAGON', '2065', '7', 'petrol', 4443298, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'STEP WGN G-EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'STEP WGN MODULO X', 'DBA-RP3', 'CVT', '2WD', 1496, 'WAGON', '2085', '7', 'petrol', 5308483, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'STEP WGN MODULO X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'STEP WGN SPADA', '5BA-RP6', 'CVT', '2WD', 1496, 'WAGON', '2165', '7', 'petrol', 5777964, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'STEP WGN SPADA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'Step WGN Spada', 'DBA-RP3', 'CVT', '2WD', 1496, 'WAGON', '2065', '7', 'petrol', 5179376, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'Step WGN Spada'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'STEP WGN SPADA HYBRID G', '6AA-RP5', 'CVT', '2WD', 1993, 'WAGON', '2205', '7', 'petrol', 5756726, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'STEP WGN SPADA HYBRID G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'STEP WGN SPADA HYBRID G.EX', '6AA-RP5', 'CVT', '2WD', 1993, 'WAGON', '2205', '7', 'petrol', 5756726, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'STEP WGN SPADA HYBRID G.EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'VEZEL E:HEV Z', '6AA-RV5', 'CVT', '2WD', 1496, 'SUV', '1655', '5', 'petrol', 4859962, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'VEZEL E:HEV Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'VEZEL HYBRID RS', 'DAA-RU3', '7AT', '2WD', 1496, 'SUV', '1585', '5', 'petrol', 4362567, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'VEZEL HYBRID RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'VEZEL HYBRID RS HONDA SENSING', '6AA-RU3', '7AT', '2WD', 1496, 'SUV', '1585', '5', 'petrol', 4362567, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'VEZEL HYBRID RS HONDA SENSING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'WR-V Z+', '5BA-DGS', 'CVT', '2WD', 1496, 'SUV', '1505', '5', 'petrol', 4173850, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'WR-V Z+'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'ZR-V  E:HEV', '6AA-RZ4', 'CVT', '2WD', 1993, 'SUV', '1835', '5', 'petrol', 5936623, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'ZR-V  E:HEV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'VEZEL HYBRID MODULO X SENSING', 'DAA-RU3', 'AT', '2WD', 1500, 'SUV', NULL, '5', 'hybrid', 6512510, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'VEZEL HYBRID MODULO X SENSING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'VEZEL HYBRID MODULO X SENSING', 'RU3-', 'AT', '2WD', 1500, 'SUV', NULL, '5', 'hybrid', 7689606, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'VEZEL HYBRID MODULO X SENSING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'VEZEL HYBRID SENSING', 'RU4-', 'AT', '4WD', 1500, 'SUV', NULL, '5', 'hybrid', 5423631, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'VEZEL HYBRID SENSING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'VEZEL HYBRID SENSING', 'DAA-RU3', 'AT', '2WD', 1500, 'SUV', NULL, '5', 'hybrid', 4644124, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'VEZEL HYBRID SENSING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'VEZEL HYBRID SENSING', 'RU3-', 'AT', '2WD', 1500, 'SUV', NULL, '5', 'hybrid', 4293218, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'VEZEL HYBRID SENSING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'VEZEL HYBRID X SENSING', 'RU4-', 'AT', '4WD', 1500, 'SUV', NULL, '5', 'hybrid', 4356637, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'VEZEL HYBRID X SENSING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'VEZEL HYBRID X SENSING', '6AA-RU3', 'AT', '2WD', 1500, 'SUV', NULL, '5', 'hybrid', 4745148, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'VEZEL HYBRID X SENSING'
);