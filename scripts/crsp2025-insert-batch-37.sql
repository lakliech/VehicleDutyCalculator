INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'CIMA HYBRID VIP G', 'DAA-HGY51', '7M-AT', '2WD', 3498, 'SEDAN', '2225', '5', 'petrol', 15765743, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'CIMA HYBRID VIP G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'CIMA HYBRID VIP G', '5AA-HGY51', '7MT-AT', '2WD', 3498, 'SEDAN', '2225', '4', 'petrol', 15645942, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'CIMA HYBRID VIP G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'CIVILIAN GL', 'ABG-DJW41', '4AT', '2WD', 4478, 'BUS', '5425', '29', 'diesel', 12500269, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'CIVILIAN GL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'CLIPPER DX GL', '5BD-DR17V[3BD-DR17V]', 'CVT', '2WD', 658, 'VAN', '1220', '4', 'electric', 2657763, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'CLIPPER DX GL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'CLIPPER RIO', '3BA-DR17W', 'CVT', '2WD', 658, 'VAN', '1260', '4', 'petrol', 3839680, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'CLIPPER RIO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'CLIPPER TRUCK', '3BD-DR16T', '5MT', '2WD', 658, 'TRUCK', '1330', '2', 'petrol', 3074594, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'CLIPPER TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'CLIPPER TRUCK DX', '3BD-DR16T', '5MT', '4WD', 658, 'TRUCK', '1220', '2', 'petrol', 2296263, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'CLIPPER TRUCK DX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'CUBE 15X V', 'DBA-Z12', 'CVT', '2WD', 1498, 'MINIVAN', '1475', '5', 'petrol', 2766582, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'CUBE 15X V'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'CUBE 15X V SELECTION', 'DBA-Z12', 'CVT', '2WD', 1498, 'MINIVAN', '1475', '5', 'petrol', 2878922, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'CUBE 15X V SELECTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'DAY ROOX HIGHWAY STAR X G', 'DBAB21A', 'CVT', '2WD', 659, 'MINIVAN', '1180', '4', 'petrol', 2657595, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'DAY ROOX HIGHWAY STAR X G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'DAYZ G', '4AA-B45W', 'CVT', '2WD', 659, 'MINIVAN', '1100', '4', 'petrol', 3235056, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'DAYZ G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'DAYZ G', '5AA-B44W', 'CVT', '2WD', 659, 'MINIVAN', '1090', '6', 'petrol', 2794248, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'DAYZ G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'DAYZ HIGHWAY STAR G', 'DBA-B21W', 'CVT', '2WD', 659, 'MINIVAN', '1100', '4', 'petrol', 2360816, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'DAYZ HIGHWAY STAR G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'DAYZ HIGHWAY STAR G TURBO (2WD)', 'DBA-B21W', 'CVT', '2WD', 659, 'MINIVAN', '1100', '4', 'petrol', 2322252, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'DAYZ HIGHWAY STAR G TURBO (2WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'DAYZ HIGHWAY STAR X G PACKAGE', 'DBA-B21A', 'CVT', '2WD', 659, 'MINIVAN', '1200', '6', 'petrol', 3015071, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'DAYZ HIGHWAY STAR X G PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'DAYZ HIGHWAY STAR X G-PACKAGE (2WD)', 'DBA-B21A', 'CVT', '2WD', 659, 'MINIVAN', '1180', '44', 'petrol', 2640828, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'DAYZ HIGHWAY STAR X G-PACKAGE (2WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'DAYZ HIGHWAY STAR X PROPILOT EDITION', 'BR06-SM21', 'CVT', '2WD', 659, 'MINIVAN', '1080', '4', 'petrol', 2432915, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'DAYZ HIGHWAY STAR X PROPILOT EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'DAYZ ROOX HIGHWAY STAR X G-PACKAGE', 'DBA-B21A', 'CVT', '2WD', 659, 'MINIVAN', '1180', '4', 'petrol', 2657595, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'DAYZ ROOX HIGHWAY STAR X G-PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'DAYZ X', '5AA-B44W', 'CVT', '2WD', 659, 'MINIVAN', '1090', '4', 'petrol', 2836668, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'DAYZ X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'DAYZ X HIGHWAY STAR X PROPILOT EDITION', '5AA-B44W', 'CVT', '2WD', 659, 'MINIVAN', '1090', '5', 'petrol', 2540225, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'DAYZ X HIGHWAY STAR X PROPILOT EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'DAYZV IGHWAY STAR G TURBO PROPILOT EDTION', '4AA-B45W', 'CVT', '4WD', 659, 'MINIVAN', '1100', '4', 'petrol', 3235056, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'DAYZV IGHWAY STAR G TURBO PROPILOT EDTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'ELGRAND 250', '5BA-TE52', 'CVT', '4WD', 2488, 'MINIVAN', '2375', '7', 'petrol', 6905975, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'ELGRAND 250'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'ELGRAND 250', '5BA-TE52', '6MT', '2WD', 2488, 'MINIVAN', '2335', '6', 'petrol', 7810982, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'ELGRAND 250'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'ELGRAND 250 HIGHWAY STAR', 'DBA-TE52', 'CVT', '2WD', 2488, 'MINIVAN', '2335', '7', 'petrol', 6740399, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'ELGRAND 250 HIGHWAY STAR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'ELGRAND 250 HIGHWAY STAR PREMIUM URBAN CHROME', 'DBA-TE52', '7M-AT', '2WD', 2488, 'MINIVAN', '2335', '7', 'petrol', 7241318, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'ELGRAND 250 HIGHWAY STAR PREMIUM URBAN CHROME'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'ELGRAND 250 HIGHWAY STAR PREMIUM URBAN CHROME', 'DBA-TE52', 'CVT-M6', '2WD', 2488, 'MINIVAN', '2335', '7', 'petrol', 7021249, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'ELGRAND 250 HIGHWAY STAR PREMIUM URBAN CHROME'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'ELGRAND 250 HIGHWAY STAR PREMIUM URBAN CHROME', '5BA-TE52', 'CVT', '2WD', 2488, 'MINIVAN', '2335', '7', 'petrol', 7100893, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'ELGRAND 250 HIGHWAY STAR PREMIUM URBAN CHROME'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'ELGRAND 250 HIGHWAY STAR S', 'DBA-TE52', 'CVT-M6', '2WD', 2488, 'MINIVAN', '2375', '7', 'petrol', 6425666, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'ELGRAND 250 HIGHWAY STAR S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'ELGRAND 250 HIGHWAY STAR S', 'DBA-TE52', 'CVT', '2WD', 2488, 'MINIVAN', '2375', '7', 'petrol', 6645735, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'ELGRAND 250 HIGHWAY STAR S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'ELGRAND 250 HIGHWAY STAR S', 'DBA-TE52', 'CVT', '2WD', 2488, 'MINIVAN', '2375', '7', 'petrol', 6168639, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'ELGRAND 250 HIGHWAY STAR S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'ELGRAND 250 HIGHWAY STAR S', '5BA-TE52', 'CVT', '2WD', 2488, 'MINIVAN', '2375', '6', 'petrol', 6629736, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'ELGRAND 250 HIGHWAY STAR S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'ELGRAND 250 HIGHWAY STAR SECOND SLIDE-UP SEAT', '5BA-TE52', 'CVT', '2WD', 2488, 'MINIVAN', '2375', '7', 'petrol', 7485839, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'ELGRAND 250 HIGHWAY STAR SECOND SLIDE-UP SEAT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'E-NV200', 'MI ZAB-VME0', 'CVT', '2WD', NULL, 'VAN', '2240', '5', 'electric', 5769860, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'E-NV200'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'E-NV200 VAN GX', 'MT ZAB-VME0', 'CVT', '2WD', NULL, 'VAN', '1970', '5', 'electric', 5769860, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'E-NV200 VAN GX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'E-NV200 Van GX 5', 'MI ZAB-VME0', '5MT', '2WD', NULL, 'VAN', '2145', '5', 'petrol', 5808145, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'E-NV200 Van GX 5'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'FAIRLADY Z', '3BA-RZ34', '6MT', '2WD', 2997, 'COUPE', '1700', '2', 'petrol', 11627328, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'FAIRLADY Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'FAIRLADY Z', 'CBA-Z34', '7M-AT', '2WD', 3696, 'COUPE', '1660', '2', 'petrol', 9103311, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'FAIRLADY Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'FAIRLADY Z VERSION ST', '3BA-RZ34', '6MT', '4WD', 2997, 'COUPE', '1700', '2', 'petrol', 11287269, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'FAIRLADY Z VERSION ST'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'FAIRLADY Z VERSION ST', 'CBA-Z34', 'CVT', '2WD', 3696, 'COUPE', '1660', '2', 'petrol', 9103311, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'FAIRLADY Z VERSION ST'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'FAIRLADY Z VERSION ST', '4BA-Z34', '7M-AT', '2WD', 3696, 'COUPE', '1660', '2', 'petrol', 8091832, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'FAIRLADY Z VERSION ST'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'FUGA 370G TYPE S', 'DBA-KY51', '7M-AT', '2WD', 3696, 'SEDAN', '2045', '5', 'petrol', 9976671, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'FUGA 370G TYPE S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'FUGA 370GT TYPE S', '5BA-KY51', '7M-AT', '2WD', 3696, 'SEDAN', '2045', '5', 'petrol', 9077742, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'FUGA 370GT TYPE S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'FUGA 370GT TYPE S', '5BA-KY51', '7MT-AT', '2WD', 3696, 'SEDAN', '2045', '4', 'petrol', 9985516, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'FUGA 370GT TYPE S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'FUGA HYBRID', 'DAA-HY51', '7M-AT', '2WD', 3498, 'SEDAN', '2125', '5', 'petrol', 10995276, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'FUGA HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'FUGA HYBRID', 'DAA-HY51', '7M-AT', '2WD', 3498, 'SEDAN', '2125', '5', 'petrol', 10951891, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'FUGA HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'FUGA HYBRID', '5AA-HGY51', '7M-AT', '2WD', 3498, 'SEDAN', '2135', '5', 'petrol', 9968078, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'FUGA HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'FUGA HYBRID', '5AA-HY51', '7MT-AT', '2WD', 3498, 'SEDAN', '2135', '4', 'petrol', 10981485, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'FUGA HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'FUGA370GT TYPE S COOL EXCLUSIVE', 'DBA-KY51', '7M-AT', '2WD', 3696, 'SEDAN', '2055', '5', 'petrol', 10848144, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'FUGA370GT TYPE S COOL EXCLUSIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'GT-R', '5BA-R35', '6AMT', '2WD', 3799, 'COUPE', '1980', '4', 'petrol', 29401847, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'GT-R'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'GT-R PREMIUM EDITION', '4BA-R35', '7M-AT', '4WD', 3799, 'COUPE', '1990', '4', 'petrol', 21143601, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'GT-R PREMIUM EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'GT-R PREMIUM EDITION', '4BA-R35', '6AMT', '4WD', 3799, 'COUPE', '1625', '4', 'petrol', 18794312, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'GT-R PREMIUM EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'GT-R PREMIUM EDITION', 'DBA-R35', '6AT', '2WD', 3799, 'COUPE', '1990', '4', 'petrol', 20443781, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'GT-R PREMIUM EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'GT-R PRIMIUM EDITION T-SPEC', '4BA-R35', '6AMT', '4WD', 3799, 'COUPE', '1980', '4', 'petrol', 35765677, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'GT-R PRIMIUM EDITION T-SPEC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'JUKE 15RX V', 'DBA-YF15', 'CVT', '2WD', 1498, 'SUV', '1475', '5', 'petrol', 3279657, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'JUKE 15RX V'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'JUKE 15RX V SELECTION PERSONALIZATION', 'DBA-YF15', 'CVT', '2WD', 1498, 'SUV', '1475', '5', 'petrol', 3279657, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'JUKE 15RX V SELECTION PERSONALIZATION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'KICKS X', '6AA-RP15', 'MT', '4WD', 1198, 'SUV', '1635', '5', 'petrol', 5027801, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'KICKS X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'KICKS X', 'MT 6AA-P15', 'CVT', '2WD', 1198, 'SUV', '1635', '5', 'petrol', 4692123, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'KICKS X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'KICKS X FOUR', 'MT 6AA-RP15', 'CVT', '4WD', 1198, 'SUV', '1755', '5', 'petrol', 5837487, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'KICKS X FOUR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'LAFESTA HIGHWAY STAR G SUPREMO', 'DBA-CWFFN', '6AT', '2WD', 1997, 'MINIVAN', '1885', '7', 'petrol', 4366448, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'LAFESTA HIGHWAY STAR G SUPREMO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'LEAF E+ G', 'ZAA-ZE1', 'CVT', '2WD', NULL, 'HATCHBACK', '1995', '5', 'electric', 7386620, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'LEAF E+ G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'LEAF G', 'ZAA-ZE1', 'CVT', '2WD', NULL, 'HATCHBACK', '1795', '5', 'electric', 6195466, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'LEAF G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'LEAF G', 'ZAA-ZE1', 'CVT', '2WD', 2488, 'HATCHBACK', '1795', '5', 'petrol', 6453611, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'LEAF G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'MARCH G', 'MT DBA-K13', 'CVT', '2WD', 1198, 'HATCHBACK', '1225', '5', 'petrol', 2417825, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'MARCH G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'MARCH G', 'MT 5BA-K13', 'CVT', '2WD', 1198, 'HATCHBACK', '1245', '5', 'petrol', 2545255, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'MARCH G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'MARCH G', 'MT DBA-K13', 'CVT', '2WD', 1198, 'HATCHBACK', '1225', '5', 'petrol', 2417825, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'MARCH G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'MARCH G', '5BA-K13', 'CVT', '2WD', 1198, 'HATCHBACK', '1245', '4', 'petrol', 2799781, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'MARCH G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NOTE E-POWER MEDALIST BLACKARROW', 'DAA-HE12', 'CVT', '2WD', 1198, 'HATCHBACK', '1505', '5', 'petrol', 3764228, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NOTE E-POWER MEDALIST BLACKARROW'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NOTE E-POWER X', 'DAA-HE12', 'CVT', '2WD', 1198, 'HATCHBACK', '1485', '5', 'petrol', 3246123, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NOTE E-POWER X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NOTE X', '6AA-E13', 'CVT', '4WD', 1198, 'HATCHBACK', '1495', '5', 'petrol', 3771773, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NOTE X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NOTE X', '6AA-E13', 'CVT', '2WD', 1198, 'HATCHBACK', '1495', '5', 'petrol', 3666643, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NOTE X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NT100 CLIPPER', '3BD-DR16T', '2WD', '5MT', 658, 'TRUCK', '1310', '2', 'petrol', 2687273, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NT100 CLIPPER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NT100 CLIPPER', '3BD-DR16T', '4WD', '5MT', 658, 'TRUCK', '1450', '2', 'petrol', 2855112, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NT100 CLIPPER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NT100 CLIPPER DX', 'EBD-DR16T', '5MT', '4WD', 658, 'TRUCK', '2975', '2', 'diesel', 1592880, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NT100 CLIPPER DX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NT100 CLIPPER DX', 'EBD-DR16T', '5MT', '4WD', 658, 'TRUCK', '1230', '2', 'petrol', 1592880, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NT100 CLIPPER DX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NT100 CLIPPER DX', '3BD-DR16T', '5MT/4AT', '4WD', 658, 'TRUCK', '1220', '2', 'petrol', 1792745, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NT100 CLIPPER DX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NT450 ATLAS DX D/CAB', 'TRG-FEA2W', '6AMT', '4WD', 2998, 'TRUCK', '4890', '6', 'diesel', 8088409, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NT450 ATLAS DX D/CAB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NT450 ATLAS DX S/CAB', 'TRG-FBA5W', '6AMT', '4WD', 2998, 'TRUCK', '5525', '3', 'diesel', 7552209, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NT450 ATLAS DX S/CAB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NT450 ATLAS REINFORCED DUMP', 'TRG-FBA3W', '5MT', '2WD', 2998, 'TRUCK', '4925', '3', 'diesel', 7632552, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NT450 ATLAS REINFORCED DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NT450 ATLAS REINFORCED DUMP', 'TRG-FDA4W', '6AMT', '4WD', 2998, 'TRUCK', '4905', '3', 'diesel', 8736390, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NT450 ATLAS REINFORCED DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NT450 ATLAS S/CAB', 'TRG-FBA3W', '5MT', '2WD', 2998, 'TRUCK', '4735', '3', 'diesel', 7609846, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NT450 ATLAS S/CAB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV100 CLIPPER G', '3BA-DR17W', '4AT', '4WD', 658, 'VAN', '1220', '4', 'petrol', 3131771, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV100 CLIPPER G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV100 CLIPPER GX', '3BD-DR17V', '5MT', '2WD', 658, 'VAN', '1220', '4', 'petrol', 2233554, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV100 CLIPPER GX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV100 CLIPPER GX', '3BD-DR17V', '3AT', '2WD', 658, 'VAN', '1220', '4', 'petrol', 2233554, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV100 CLIPPER GX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV100 CLIPPER GX', '3BD-DR17VV', '4AT', '2WD', 658, 'VAN', '1220', '4', 'petrol', 2089691, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV100 CLIPPER GX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV100 CLIPPER GX', 'HBD-DR17V', '5MT', '2WD', 658, 'VAN', '1220', '4', 'petrol', 1750492, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV100 CLIPPER GX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV100 CLIPPER GX', '5BD-DR17V', '5MT', '2WD', 658, 'VAN', '350', '4', 'petrol', 2441969, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV100 CLIPPER GX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV100 CLIPPER RIO', 'ABA-DR17W', '4AT', '2WD', 658, 'VAN', '1220', '4', 'petrol', 3388643, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV100 CLIPPER RIO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV100 CLIPPER RIO', '3BA-DR17W', '4AT', '2WD', 658, 'VAN', '1220', '7', 'petrol', 3373553, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV100 CLIPPER RIO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV100 CLIPPER RIO CHAIR CAB', '3BA-DR17W', '5AT', '2WD', 658, 'VAN', '1230', '4', 'petrol', 3459066, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV100 CLIPPER RIO CHAIR CAB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV100 CLIPPER RIO G', '3BA-DR17W', '4AT', '2WD', 658, 'VAN', '1220', '4', 'petrol', 3399207, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV100 CLIPPER RIO G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV100 CLIPPER RIO G', 'ABA-DR17W', '4AT', '2WD', 658, 'VAN', '1180', '4', 'petrol', 2744784, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV100 CLIPPER RIO G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV100 CLIPPER RIO G (2WD)', 'ABA-DR17W', '4AT', '2WD', 658, 'VAN', '1180', '4', 'petrol', 2627414, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV100 CLIPPER RIO G (2WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV150 AD 1.5 VE', 'DBF-VY12', 'CVT', '2WD', 1498, 'VAN', '1700', '5', 'petrol', 2471480, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV150 AD 1.5 VE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV150 AD VE', 'DBF-VY12', 'CVT', '2WD', 1498, 'VAN', '1700', '5', 'petrol', 2471480, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV150 AD VE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV200', '5BA-VM20', 'CVT', '2WD', 1597, 'VAN', '1800', '6', 'petrol', 5237992, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV200'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV200 16X-2R', '3BA-M20', 'CVT', '2WD', 1597, 'VAN', '1625', '7', 'petrol', 3910102, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV200 16X-2R'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV200 VANETTE', 'DBA-M20', 'CVT', '2WD', 1597, 'VAN', '1585', '5', 'petrol', 3618354, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV200 VANETTE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV200 VANETTE', 'DBF-VM20', '4AT', '2WD', 1597, 'VAN', '1780', '6', 'petrol', 4669655, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV200 VANETTE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV200 VANETTE', '5BF-VM20', 'CVT', '2WD', 1597, 'VAN', '1800', '6', 'petrol', 4842356, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV200 VANETTE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV200 VANETTE  MULTI BED WAGON', 'DBA-M20', '4AT', '2WD', 1597, 'VAN', '1585', '5', 'petrol', 3769118, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV200 VANETTE  MULTI BED WAGON'
);