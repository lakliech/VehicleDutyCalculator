INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'ROCKY G', '5BA-A200S-GBSV', 'CVT', '2WD', 996, 'WAGON', '1255', '5', 'petrol', 3356786, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'ROCKY G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'ROCKY G', '5BA-A299S-GBSV', 'CVT', '2WD', 996, 'WAGON', '1255', '5', 'petrol', 3051623, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'ROCKY G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'ROCKY PREMIUM G', '5BA-A201S-GBSF', 'CVT', '2WD', 1196, 'WAGON', '1255', '5', 'petrol', 3467449, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'ROCKY PREMIUM G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'ROCKY PREMIUM G HEV', '5AA-A202S-GBSH', 'CVT', '2WD', 1196, 'WAGON', '1345', '5', 'petrol', 3935253, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'ROCKY PREMIUM G HEV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'TAFT 2', '2BA-LA900S-GBGF', 'CVT', '2WD', 658, 'WAGON', '1050', '4', 'petrol', 2489924, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'TAFT 2'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'TAFT G', '5BA-LA900S-GBGF', 'CVT', '2WD', 658, 'WAGON', '1050', '4', 'petrol', 2489924, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'TAFT G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'TAFT G', '6BA-LA900S-GBGF', 'CVT', '2WD', 658, 'WAGON', '1050', '4', 'petrol', 2263567, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'TAFT G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'TANT X', '6BA-LA650S-GBLF', 'CVT', '2WD', 658, 'VAN', '950', '4', 'petrol', 2783349, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'TANT X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'TANTO', '3BA-LA650S-GBLF', 'CVT', '2WD', 658, 'VAN', '1170', '4', 'petrol', 2800116, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'TANTO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'TANTO  SLOPER X', 'DBA-LA600S-GBLF', 'CVT', '2WD', 658, 'VAN', '1200', '4', 'petrol', 2682746, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'TANTO  SLOPER X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'TANTO CUSTOM RS', '5BA-LA650S-GBMZ', '4AT', '2WD', 658, 'VAN', '1190', '4', 'petrol', 3336665, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'TANTO CUSTOM RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'TANTO CUSTOM RS', '5BA-LA650S-GBVZ', 'CVT', '2WD', 658, 'VAN', '1180', '4', 'petrol', 3403734, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'TANTO CUSTOM RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'TANTO CUSTOM RS', 'DBA-LA600S-GBVZ', 'CVT', '2WD', 658, 'VAN', '1180', '4', 'petrol', 2716280, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'TANTO CUSTOM RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'TANTO CUSTOM RS TOP EDITION SA II', 'DBA-LA600S-GBVZ', 'CVT', '2WD', 658, 'VAN', '1180', '4', 'petrol', 2716280, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'TANTO CUSTOM RS TOP EDITION SA II'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'TANTO CUSTOM SLOPER CUSTOM RS', '5BA-LA650S-GBMZ', 'CVT', '2WD', 658, 'VAN', '1200', '4', 'petrol', 3495953, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'TANTO CUSTOM SLOPER CUSTOM RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'TANTO CUSTOM SLOPER X', 'DBA-A600S-GBMF', 'CVT', '2WD', 658, 'VAN', '1210', '4', 'petrol', 3034856, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'TANTO CUSTOM SLOPER X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'TANTO CUSTOM SLOPER XSA III', 'DBA-LA600S-GBMF', 'CVT', '2WD', 658, 'VAN', '1210', '4', 'petrol', 2196498, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'TANTO CUSTOM SLOPER XSA III'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'TANTO CUSTOM WELCOME SEAT XSA III', 'DBA-LA600S-GBVF', 'CVT', '2WD', 658, 'VAN', '1220', '4', 'petrol', 2875568, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'TANTO CUSTOM WELCOME SEAT XSA III'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'TANTO CUSTOM X', 'DBA-LA600S-GBVF', 'CVT', '2WD', 658, 'VAN', '1220', '4', 'petrol', 3118692, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'TANTO CUSTOM X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'TANTO FUNCROSS TURBO', '5BA-LA650S-GBQZ', 'CVT', '2WD', 658, 'VAN', '1160', '4', 'petrol', 3034018, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'TANTO FUNCROSS TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'TANTO SLOPE X', '5BA-LA650S-GBLF', 'CVT', '2WD', 658, 'VAN', '1180', '4', 'petrol', 3034856, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'TANTO SLOPE X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'TANTO SLOPER CUSTOM RS', '5BA-LA650S-GBMZ', 'CVT', '2WD', 658, 'VAN', '1190', '4', 'petrol', 3227679, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'TANTO SLOPER CUSTOM RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'TANTO SLOPER X', '5BA-LA650S-GBLF', 'CVT', '2WD', 658, 'VAN', '1180', '5', 'petrol', 2917486, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'TANTO SLOPER X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'TANTO SLOPER X', '6BA-LA650S-GBLF', 'CVT', '2WD', 658, 'VAN', '1320', '4', 'petrol', 2800116, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'TANTO SLOPER X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'TANTO SLOPER X', 'DBA-LA600S-GBLF', 'CVT', '2WD', 658, 'VAN', '1200', '4', 'petrol', 2682746, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'TANTO SLOPER X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'TANTO WELCOME SEAT IFT  CUSTOM RS', '5BA-LA1650S-GBMF', 'CVT', '2WD', 658, 'VAN', '1180', '4', 'petrol', 3277980, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'TANTO WELCOME SEAT IFT  CUSTOM RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'TANTO WELCOME SEAT XSA III', 'DBA-LA600S-GBGF', 'CVT', '2WD', 658, 'VAN', '1210', '4', 'petrol', 2875568, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'TANTO WELCOME SEAT XSA III'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'TANTO X', '5BA-ALA650S-GBGF', 'CVT', '2WD', 658, 'VAN', '1130', '4', 'petrol', 2582143, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'TANTO X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'TANTO X', 'DBA-LA600S-GBGF', 'CVT', '2WD', 658, 'VAN', '1210', '4', 'petrol', 2766582, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'TANTO X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'TANTO XSA II', 'DBA-LA600S-GBGF', 'CVT', '2WD', 658, 'VAN', '1150', '4', 'petrol', 2204882, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'TANTO XSA II'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'TANTO XWLECOME SEAT LIFT X', '6BA-LA650S-GBVZ', 'CVT', '2WD', 658, 'VAN', '1170', '4', 'petrol', 2833650, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'TANTO XWLECOME SEAT LIFT X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'THOR  G', '4BA-M900S-GBVJ', 'CVT', '2WD', 996, 'MINIVAN', '1385', '5', 'petrol', 3430561, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'THOR  G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'THOR  G', '5BA-M900S-GBGE', 'CVT', '2WD', 996, 'MINIVAN', '1355', '5', 'petrol', 2923355, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'THOR  G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'THOR CUSTOM G', '4BA-M900S-GBVJ', 'CVT', '2WD', 996, 'MINIVAN', '1385', '5', 'petrol', 3118692, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'THOR CUSTOM G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'THOR CUSTOM G', '5BA-M900S-GBVE', 'CVT', '2WD', 996, 'MINIVAN', '1365', '5', 'petrol', 3226002, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'THOR CUSTOM G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'THOR CUSTOM G', 'DBA-M900S-GBVJ', 'CVT', '2WD', 996, 'MINIVAN', '1375', '5', 'petrol', 3051623, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'THOR CUSTOM G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'THOR CUSTOM G TURBO SA II', 'DBA-M900S-GBVJ', 'CVT', '2WD', 996, 'MINIVAN', '1375', '5', 'petrol', 3051623, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'THOR CUSTOM G TURBO SA II'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'THOR G', 'DBA-M900S-GBGE', 'CVT', '2WD', 996, 'MINIVAN', '1345', '5', 'petrol', 2625738, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'THOR G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'THOR GSA II', 'DBA-M900S-GBGE', 'CVT', '2WD', 996, 'MINIVAN', '1345', '5', 'petrol', 2615677, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'THOR GSA II'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'WAKE G', '3BA-LA700S-GBVZ', 'CVT', '2WD', 658, 'MINIVAN', '1240', '4', 'petrol', 2858801, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'WAKE G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'WAKE G TURBO', 'DBA-LA700S-GBVZ', 'CVT', '2WD', 658, 'MINIVAN', '1240', '4', 'petrol', 2665979, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'WAKE G TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'WAKE G TURBO LEISURE EDITION', '5BA-LA700S-GBVZ', 'CVT', '2WD', 658, 'MINIVAN', '1240', '4', 'petrol', 2665979, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'WAKE G TURBO LEISURE EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'WAKE G TURBOSA II', 'DBA-LA700S-GBVZ', 'CVT', '2WD', 658, 'MINIVAN', '1240', '4', 'petrol', 2598910, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'WAKE G TURBOSA II'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'WAKE TURBO', 'DBA-LA700S-GBVZ', 'CVT', '2WD', 658, 'MINIVAN', '1240', '4', 'petrol', 2665979, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'WAKE TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'HORNET PLUG-IN HYBRID R/T', NULL, 'AT', 'AWD', 1300, 'SUV', NULL, NULL, 'hybrid', 6089551, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'HORNET PLUG-IN HYBRID R/T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'HORNET PLUG-IN HYBRID R/T PLUS', NULL, 'AT', 'AWD', 1300, 'SUV', NULL, NULL, 'hybrid', 6089551, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'HORNET PLUG-IN HYBRID R/T PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'HORNET GT', NULL, 'AT', '4WD', 2000, 'SUV', NULL, NULL, 'hybrid', 4246016, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'HORNET GT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'HORNET GT', NULL, 'AT', 'AWD', 2000, 'SUV', NULL, NULL, 'hybrid', 4386026, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'HORNET GT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'HORNET GT PLUS', NULL, 'AT', '4WD', 2000, 'SUV', NULL, NULL, 'hybrid', 4881913, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'HORNET GT PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'HORNET GT PLUS', NULL, 'AT', 'AWD', 2000, 'SUV', NULL, NULL, 'hybrid', 4386026, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'HORNET GT PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO CITADEL', NULL, 'AT', 'RWD', 3600, 'SUV', NULL, NULL, 'hybrid', 7562953, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO CITADEL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO CITADEL', NULL, 'AT', 'AWD', 3600, 'SUV', NULL, NULL, 'hybrid', 8071817, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO CITADEL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO GT', NULL, 'AT', 'RWD', 3600, 'SUV', NULL, NULL, 'hybrid', 5762372, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO GT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO GT', NULL, 'AT', 'AWD', 3600, 'SUV', NULL, NULL, 'hybrid', 12428415, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO GT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO GT', NULL, 'AT', 'AWD', 3600, 'SUV', NULL, NULL, 'hybrid', 5628941, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO GT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO GT', NULL, 'AT', 'AWD', 3600, 'SUV', NULL, NULL, 'hybrid', 6142009, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO GT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO GT PLUS', NULL, 'AT', 'RWD', 3600, 'SUV', NULL, NULL, 'hybrid', 6054639, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO GT PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO GT PLUS', NULL, 'AT', 'AWD', 3600, 'SUV', NULL, NULL, 'hybrid', 6274160, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO GT PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO GT PLUS', NULL, 'AT', 'AWD', 3600, 'SUV', NULL, NULL, 'hybrid', 5921391, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO GT PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO GT PREMIUM', NULL, 'AT', 'RWD', 3600, 'SUV', NULL, NULL, 'hybrid', 6605543, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO GT PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO GT PREMIUM', NULL, 'AT', 'AWD', 3600, 'SUV', NULL, NULL, 'hybrid', 6886113, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO GT PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO SXT', NULL, 'AT', 'RWD', 3600, 'SUV', NULL, NULL, 'hybrid', 5547603, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO SXT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO SXT', NULL, 'AT', 'AWD', 3600, 'SUV', NULL, NULL, 'hybrid', 5861439, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO SXT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO SXT PLUS', NULL, 'AT', 'RWD', 3600, 'SUV', NULL, NULL, 'hybrid', 5669701, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO SXT PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO SXT PLUS', NULL, 'AT', 'AWD', 3600, 'SUV', NULL, NULL, 'hybrid', 5966904, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO SXT PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARGER DAYTONA R/T', NULL, 'AT', 'AWD', 5700, 'SUV', NULL, NULL, 'hybrid', 10600417, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARGER DAYTONA R/T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARGER DAYTONA R/T SCAT PACK', NULL, 'AT', 'AWD', 5700, 'SUV', NULL, NULL, 'hybrid', 11879888, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARGER DAYTONA R/T SCAT PACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO R/T', NULL, 'AT', 'RWD', 5700, 'SUV', NULL, NULL, 'hybrid', 7346357, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO R/T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO R/T', NULL, 'AT', 'AWD', 5700, 'SUV', NULL, NULL, 'hybrid', 7480153, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO R/T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO R/T', NULL, 'AT', 'AWD', 5700, 'SUV', NULL, NULL, 'hybrid', 5921391, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO R/T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO R/T 20TH ANNIVERSARY PLUS', NULL, 'AT', 'AWD', 5700, 'SUV', NULL, NULL, 'hybrid', 12428415, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO R/T 20TH ANNIVERSARY PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO R/T 20TH ANNIVERSARY PLUS', NULL, 'AT', 'AWD', 5700, 'SUV', NULL, NULL, 'hybrid', 7310531, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO R/T 20TH ANNIVERSARY PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO R/T 20TH ANNIVERSARY PREMIUM', NULL, 'AT', 'AWD', 5700, 'SUV', NULL, NULL, 'hybrid', 7310531, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO R/T 20TH ANNIVERSARY PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO R/T PLUS', NULL, 'AT', 'RWD', 5700, 'SUV', NULL, NULL, 'hybrid', 7714661, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO R/T PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO R/T PLUS', NULL, 'AT', 'AWD', 5700, 'SUV', NULL, NULL, 'hybrid', 7958309, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO R/T PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO R/T PREMIUM', NULL, 'AT', 'RWD', 5700, 'SUV', NULL, NULL, 'hybrid', 7504280, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO R/T PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO R/T PREMIUM', NULL, 'AT', 'AWD', 5700, 'SUV', NULL, NULL, 'hybrid', 8303035, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO R/T PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO R/T PREMIUM', NULL, 'AT', 'AWD', 5700, 'SUV', NULL, NULL, 'hybrid', 7310531, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO R/T PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO SRT HELLCAT', NULL, 'AT', 'AWD', 6200, 'SUV', NULL, NULL, 'hybrid', 7310531, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO SRT HELLCAT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO SRT HELLCAT HAMMERHEAD', NULL, 'AT', 'AWD', 6200, 'SUV', NULL, NULL, 'hybrid', 12428415, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO SRT HELLCAT HAMMERHEAD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO SRT HELLCAT PLUS', NULL, 'AT', 'AWD', 6200, 'SUV', NULL, NULL, 'hybrid', 14970724, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO SRT HELLCAT PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO SRT HELLCAT PREMIUM', NULL, 'AT', 'AWD', 6200, 'SUV', NULL, NULL, 'hybrid', 15251842, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO SRT HELLCAT PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO SRT HELLCAT SILVER BULLET', NULL, 'AT', 'AWD', 6200, 'SUV', NULL, NULL, 'hybrid', 12428415, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO SRT HELLCAT SILVER BULLET'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO SRT 392', NULL, 'AT', 'AWD', 6400, 'SUV', NULL, NULL, 'hybrid', 10713193, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO SRT 392'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO SRT 392 PLUS', NULL, 'AT', 'AWD', 6400, 'SUV', NULL, NULL, 'hybrid', 11497509, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO SRT 392 PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO SRT 392 PREMIUM', NULL, 'AT', 'AWD', 6400, 'SUV', NULL, NULL, 'hybrid', 11996137, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO SRT 392 PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', '2C3CDZBT3MH58', '2C3CDZFJ2JH30', 'AT', '2WD', 6400, 'COUPE', NULL, NULL, 'petrol', 14317969, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = '2C3CDZBT3MH58'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER', '2C3CDZBT4JH30', 'AT', '2WD', 5700, 'COUPE', NULL, NULL, 'petrol', 16155411, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER', '2C3CDZC90LH10', 'AT', '2WD', 6200, 'COUPE', NULL, NULL, 'petrol', 26290977, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER', '2C3CDZFJ0JH13', 'AT', '2WD', 6400, 'COUPE', NULL, NULL, 'petrol', 12658591, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER', '2C3CDZFJ9KH62', 'AT', '2WD', 6400, 'COUPE', NULL, NULL, 'petrol', 15675552, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER', '2C3CDZFJ4JH17', 'AT', '2WD', 6400, 'COUPE', NULL, NULL, 'petrol', 14779799, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER', '2C3CDZFJ4NH23', 'AT', '2WD', 6400, 'COUPE', NULL, NULL, 'petrol', 24122598, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER', '2C3CDZFJ8NH15', 'AT', '2WD', 6400, 'COUPE', NULL, NULL, 'petrol', 18520870, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER', '2C3CDZFJ9PH58', 'AT', '2WD', 6400, 'COUPE', NULL, NULL, 'petrol', 24640243, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER', '2C3CDZFJ1LH13', 'AT', '2WD', 6400, 'COUPE', NULL, NULL, 'petrol', 16241109, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER 392 SRT8', '2C3CDZFJ9LH20', 'AT', '2WD', 6400, 'COUPE', NULL, NULL, 'petrol', 15264103, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER 392 SRT8'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER 392 SRT8', '2C3CDZFJ7MH57', 'AT', '2WD', 6400, 'COUPE', NULL, NULL, 'petrol', 16121082, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER 392 SRT8'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER R/T', '2C3CDZBTXKH65', 'MT', '2WD', 5700, 'COUPE', NULL, NULL, 'petrol', 11236056, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER R/T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER R/T', '2C3CDZBT7MH59', 'AT', '2WD', 5700, 'COUPE', NULL, NULL, 'petrol', 15658264, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER R/T'
);