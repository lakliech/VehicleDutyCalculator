INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER S/C 565PS 5 DOOR SVAUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 5000, 'S/WAGON', NULL, '4', 'petrol', 68697127, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER S/C 565PS 5 DOOR SVAUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER S/C 565PS 5 DOOR SVAUTOBIOGRAPHY DYNAMIC BLACK', NULL, 'AUT', 'AWD', 5000, 'S/WAGON', NULL, '4', 'petrol', 59588659, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER S/C 565PS 5 DOOR SVAUTOBIOGRAPHY DYNAMIC BLACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT  S/C 525PS  5 DOOR AUTO HSE DYNAMIC BLACK', NULL, 'AUT', 'AWD', 5000, 'S/WAGON', NULL, '5', 'petrol', 31710321, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT  S/C 525PS  5 DOOR AUTO HSE DYNAMIC BLACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT  S/C 525PS  5 DOOR AUTOBIOGRAPHY DYNAMIC', NULL, 'AUT', 'AWD', 5000, 'S/WAGON', NULL, '5', 'petrol', 35124048, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT  S/C 525PS  5 DOOR AUTOBIOGRAPHY DYNAMIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT  S/C 575PS  5 DOOR AUTO SVR', NULL, 'AUT', 'AWD', 5000, 'S/WAGON', NULL, '5', 'petrol', 41037662, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT  S/C 575PS  5 DOOR AUTO SVR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT S/C 525PS  5 DOOR DYNAMIC HSE', NULL, 'AUT', 'AWD', 5000, 'S/WAGON', NULL, '5', 'petrol', 30903833, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT S/C 525PS  5 DOOR DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT S/C 525PS  5 DOOR HSE DYNAMIC BLACK', NULL, 'AUT', 'AWD', 5000, 'S/WAGON', NULL, '5', 'petrol', 31915047, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT S/C 525PS  5 DOOR HSE DYNAMIC BLACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT S/C 525PS 5 DOOR AUTOBIOGRAPHY DYNAMIC', NULL, 'AUT', 'AWD', 5000, 'S/WAGON', NULL, '5', 'petrol', 35328775, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT S/C 525PS 5 DOOR AUTOBIOGRAPHY DYNAMIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT S/C 525PS 5 DOOR DYNAMIC HSE', NULL, 'AUT', 'AWD', 5000, 'S/WAGON', NULL, '5', 'petrol', 31108560, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT S/C 525PS 5 DOOR DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT S/C 575PS  5 DOOR SVR', NULL, 'AUT', 'AWD', 5000, 'S/WAGON', NULL, '5', 'petrol', 41242388, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT S/C 575PS  5 DOOR SVR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT S/C 575PS  5 DOOR SVR CARBON EDITION', NULL, 'AUT', 'AWD', 5000, 'S/WAGON', NULL, '5', 'petrol', 45455618, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT S/C 575PS  5 DOOR SVR CARBON EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT S/C 575PS 5 DOOR SVR CARBON EDITION', NULL, 'AUT', 'AWD', 5000, 'S/WAGON', NULL, '5', 'diesel', 45660344, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT S/C 575PS 5 DOOR SVR CARBON EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SUPER. AUTO.BIO. LWB', NULL, 'AUT', 'FWD', 5000, 'S/WAGON', NULL, NULL, 'diesel', 47143148, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SUPER. AUTO.BIO. LWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SUPER. AUTO.BIO. SWB', NULL, 'AUT', 'FWD', 5000, 'S/WAGON', NULL, NULL, 'diesel', 49286018, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SUPER. AUTO.BIO. SWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SUPERCHARGED', NULL, 'AUT', '4WD', 5000, 'S/WAGON', NULL, NULL, 'diesel', 34251310, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SUPERCHARGED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SUPERCHARGED AUTOBIOGRAPHY', NULL, 'AUT', '4WD', 5000, 'S/WAGON', NULL, NULL, 'diesel', 46482155, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SUPERCHARGED AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SUPERCHARGED AUTOBIOGRAPHY LWB', NULL, 'AUT', '4WD', 5000, 'S/WAGON', NULL, NULL, 'diesel', 48130517, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SUPERCHARGED AUTOBIOGRAPHY LWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SUPERCHARGED AUTOBIOGRAPHY SV DYNAMIC', NULL, 'AUT', '4WD', 5000, 'S/WAGON', NULL, NULL, 'diesel', 56372326, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SUPERCHARGED AUTOBIOGRAPHY SV DYNAMIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  S/C 565PS  5 DOOR LWB SVAUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 5000, 'S/WAGON', NULL, '4', 'petrol', 68492400, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  S/C 565PS  5 DOOR LWB SVAUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SUPERCHARGED AUTOBIOGRAPHY SV LWB', NULL, 'AUT', '4WD', 5000, 'S/WAGON', NULL, NULL, 'diesel', 65917989, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SUPERCHARGED AUTOBIOGRAPHY SV LWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SUPERCHARGED LWB', NULL, 'AUT', 'FWD', 5000, 'S/WAGON', NULL, NULL, 'diesel', 36247476, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SUPERCHARGED LWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SV  AUTO.BIO. DYNAMIC SWB', NULL, 'AUT', 'FWD', 5000, 'S/WAGON', NULL, NULL, 'diesel', 59176189, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SV  AUTO.BIO. DYNAMIC SWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SV AUTO.BIO. LWB', NULL, 'AUT', 'FWD', 5000, 'S/WAGON', NULL, NULL, 'diesel', 69560868, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SV AUTO.BIO. LWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SWB', NULL, 'AUT', 'FWD', 5000, 'S/WAGON', NULL, NULL, 'diesel', 30329857, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER TD6 DIESEL HSE SWB', NULL, 'AUT', 'FWD', 5000, 'S/WAGON', NULL, NULL, 'diesel', 31961736, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER TD6 DIESEL HSE SWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER TD6 DIESEL SWB', NULL, 'AUT', 'FWD', 5000, 'S/WAGON', NULL, NULL, 'diesel', 30230956, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER TD6 DIESEL SWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'CT200H', 'DAA-ZWA10-AHXBB(L)', 'CVT', '2WD', 1797, 'HATCHBACK', '1715', '5', 'petrol', 7714059, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'CT200H'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'CT200H VERSION L', 'DAA-ZWA10-AHXBB(L)', 'CVT', '2WD', 1797, 'HATCHBACK', '1715', '5', 'petrol', 7714059, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'CT200H VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'CT200H VERSION L', '6AA-ZWA10-AHXBB(L)', 'CVT', '2WD', 1797, 'HATCHBACK', '1715', '5', 'petrol', 7750050, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'CT200H VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'ES300H', '6AA-AXZH10-AEXGB', 'CVT', '2WD', 2487, 'SEDAN', '1955', '5', 'petrol', 9379777, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'ES300H'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'ES300H', '6AA-AXZH11-AEXGB', '8AT', '2WD', 2487, 'SEDAN', '1945', '5', 'petrol', 9510919, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'ES300H'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'ES300H', '6AA-AXZH11-AEXGB', 'CVT', '4WD', 2487, 'SEDAN', '1945', '5', 'petrol', 10514408, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'ES300H'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'ES300H ES300H F SPORT', '6AA-AXZH11-AEXGB(F)', 'CVT', '2WD', 2487, 'SEDAN', '1985', '5', 'petrol', 11422629, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'ES300H ES300H F SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'ES300H F SPORT', '6AA-AXZH10-AEXGB(F)', 'CVT', '2WD', 2487, 'SEDAN', '1995', '5', 'petrol', 10172208, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'ES300H F SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'ES300H F SPORT', '6AA-AXZH11-AEXGB(F)', 'CVT', '4WD', 2487, 'SEDAN', '1985', '5', 'petrol', 11422629, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'ES300H F SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'ES300H F SPORT', '6AA-AXZH11-AEXGB(F)', 'CVT', '2WD', 2487, 'SEDAN', '1985', '5', 'petrol', 10303231, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'ES300H F SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'ES300H VERSION L', '6AA-AXH10-AEXGB(L)', 'CVT', '2WD', 2487, 'SEDAN', '2005', '5', 'petrol', 11288078, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'ES300H VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'ES300H VERSION L', '6AA-AXZH11-AEXGB(L)', 'CVT', '2WD', 2487, 'SEDAN', '1995', '5', 'petrol', 11321010, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'ES300H VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'GS F', 'DBA-URL10-FEZRH', 'AT', '2WD', 4968, 'SEDAN', '2105', '5', 'petrol', 19421962, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'GS F'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'GS300 VERSION L', 'DBA-ARL10-BEZQT(L)', '8AT', '2WD', 1998, 'SEDAN', '1965', '5', 'petrol', 10977574, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'GS300 VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'GS300H VERSION L', 'DAA-AWL10-BEXQH(L)', 'CVT', '2WD', 2493, 'SEDAN', '2045', '5', 'petrol', 11596964, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'GS300H VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'GS350 F Sport', 'DBA-GRL12-BEZQH(F)', 'AT', '2WD', 3456, 'SEDAN', '1965', '5', 'petrol', 13038215, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'GS350 F Sport'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'GS350H F SPORT', 'DBA-GRL12-BEZQH(F)', '8AT', '2WD', 3456, 'SEDAN', '1965', '5', 'petrol', 13057427, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'GS350H F SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'GS450 Version L', 'DAA-GWL10-BEXQB(L)', 'CVT', '2WD', 3456, 'SEDAN', '2135', '5', 'petrol', 14732397, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'GS450 Version L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'GS450H VERSION L', 'DAA-GWL10-BEXQB(L)', 'CVT', '2WD', 3456, 'SEDAN', '2135', '5', 'petrol', 14751609, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'GS450H VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'HS250h', 'DAA-ANF10-AEXVB(L)', 'CVT', '2WD', 2352, 'SEDAN', '1915', '5', 'petrol', 9226143, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'HS250h'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'IS300', 'DBA-ASE30-AEZLZ(F)', 'AT', '2WD', 1998, 'SEDAN', '1905', '5', 'petrol', 8415926, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'IS300'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'IS300 F SPORT', 'DBA-ASE30-AEZLZ(F)', '10AT', '2WD', 1998, 'SEDAN', '1905', '5', 'petrol', 8438565, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'IS300 F SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'IS300 VERSION L', '3BA-ASE30-BEZLZ(L)', '8AT', '2WD/4WD', 1998, 'SEDAN', '1915', '5', 'petrol', 9710981, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'IS300 VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'IS300H', 'DAA-AV30-AEXLH(L)', 'CVT', '2WD', 2493, 'SEDAN', '1955', '5', 'petrol', 9360371, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'IS300H'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'IS300H', '6AA-AVE30-BEXLH(L)', 'CVT', '2WD', 2493, 'SEDAN', '1965', '5', 'petrol', 10496942, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'IS300H'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'IS300H VERSION L', '6AA-AVE30-BEXLH(L)', 'CVT', '4WD', 2493, 'SEDAN', '1965', '5', 'petrol', 10496942, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'IS300H VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'IS300H VERSION L', 'DAA-AVE30-AEXLH(L)', 'CVT', '2WD', 2493, 'SEDAN', '1965', '5', 'petrol', 9383012, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'IS300H VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'IS350', 'DBA-GSE31-AEZLH(L)', 'AT', '2WD', 3456, 'SEDAN', '1915', '5', 'petrol', 10841018, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'IS350'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'IS350 F SPORT', '3BA-GSE31-BEZLH(F)', 'CVT', '4WD', 3456, 'SEDAN', '1935', '5', 'petrol', 12279850, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'IS350 F SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'IS350 F SPORT', '3BA-GSE31-BEZLH(F)', '8AT', '2WD', 3456, 'SEDAN', '1935', '5', 'petrol', 12279850, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'IS350 F SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'IS350 VERSION L', 'DBA-GSE31-AEZLH(L)', '8AT', '2WD', 3456, 'SEDAN', '1915', '5', 'petrol', 10902149, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'IS350 VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'IS500 F SPORT', '5BA-USE30-BEZLH', '8AT', '4WD', 4968, 'SEDAN', '1995', '5', 'petrol', 16033599, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'IS500 F SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'IS500 F SPORT PERFORMANCE', '5BA-USE30-BEZLH', 'CVT', '4WD', 4968, 'SEDAN', '1995', '5', 'petrol', 16033599, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'IS500 F SPORT PERFORMANCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LC300 L PACKAGE', '5BA-URZ100-ACUBH(L)', '10AT', '4WD', 4968, 'SEDAN', '2170', '4', 'petrol', 26408280, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LC300 L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LC500 CONVERTIBLE', '5BA-URZ100-AKUBH', '10AT', '4WD', 4968, 'CONVERTIBLE', '2270', '4', 'petrol', 29237739, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LC500 CONVERTIBLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LC500 CONVERTIBLE', '5BA-URZ100-ACUBH', 'CVT', '2WD', 4968, 'CONVERTIBLE', '2270', '4', 'petrol', 29237739, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LC500 CONVERTIBLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LC500 CONVERTIBLE', '5BA-UR100-AKUBH', '8AT', '2WD', 4968, 'CONVERTIBLE', '2270', '4', 'petrol', 25722351, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LC500 CONVERTIBLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LC500 L PACKAGE', '5BA-URZ100-ACUBH(L)', '10AT', '4WD', 4968, 'COUPE', '2170', '4', 'petrol', 25785799, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LC500 L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LC500 L PACKAGE', 'DBA-URZ100-ACUBH(L)', '10AT', '2WD', 4968, 'COUPE', '2180', '4', 'petrol', 22743956, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LC500 L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LC500H S PACKAGE', '6AA-GWZ100-ACVBB(S)', 'CVT', '2WD', 3456, 'COUPE', '2230', '4', 'petrol', 28917067, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LC500H S PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LM500H EXECUTIVE', '5AA-TAWH15W-LNTXT', '6AT', '4WD', 2393, 'MINIVAN', '2680', '4', 'petrol', 34931588, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LM500H EXECUTIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LM500H VERSION L', '5AA-TAWH15WLPTVT', 'CVT', 'AWD', 2393, 'MINIVAN', '2770', '6', 'petrol', 26198691, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LM500H VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LS500 F SPORT', '3BA-VXFA50-AEUQT(F)', '10AT', '2WD', 2487, 'SEDAN', '2445', '5', 'petrol', 21273337, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LS500 F SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LS500 I PACKAGE', '6AA-GVF50-AEQH(I)', 'CVT', '2WD', 3456, 'SEDAN', '2495', '5', 'petrol', 20619036, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LS500 I PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LS500H', '6AA-GVF50-AEVQH', 'CVT', '2WD', 3456, 'SEDAN', '2485', '5', 'petrol', 19586712, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LS500H'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LS500H', 'DAA-GVF50-AEVHQ', 'CVT', '2WD', 3456, 'SEDAN', '2485', '5', 'petrol', 19561688, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LS500H'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LS500H EXECUTIVE', '6AA-GVF50-AEVQH(E)', 'CVT', '4WD', 3456, 'SEDAN', '2565', '5', 'petrol', 31878567, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LS500H EXECUTIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LS500H EXECUTIVE', '6AA-GVF50-AEVQH(E)', 'CVT', '2WD', 3456, 'SEDAN', '2595', '5', 'petrol', 28652984, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LS500H EXECUTIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LS500H EXECUTIVE', 'DAA-GVF50-AEVQH€', 'CVT', '2WD', 3456, 'SEDAN', '2595', '5', 'petrol', 28643901, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LS500H EXECUTIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LS500H EXECUTIVE ADVANCED DRIVE', '6AA-GVF-AEVQH(X)', 'CVT', 'AWD', 3456, 'SEDAN', '2675', '5', 'petrol', 33934640, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LS500H EXECUTIVE ADVANCED DRIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LS500H EXECUTIVE ADVANCED DRIVE', '6AA-GVF50-AEVQH(E)', 'CVT', '4WD', 3456, 'SEDAN', '2555', '5', 'petrol', 32255828, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LS500H EXECUTIVE ADVANCED DRIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LS500H EXECUTIVE ADVANCED DRIVE', '6AA-GVF50-AEVQH(E)', 'CVT', '2WD', 3456, 'SEDAN', '2555', '5', 'petrol', 32255828, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LS500H EXECUTIVE ADVANCED DRIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LS500H EXECUTIVE ADVANCED DRIVE', '6AA-GVF55-AEVQH(X)', 'CVT', 'AWD', 3456, 'SEDAN', '2675', '5', 'petrol', 33934640, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LS500H EXECUTIVE ADVANCED DRIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LS500H F SPORT', '6AA-GVF50-AEVQH(F)', 'CVT', '4WD', 3456, 'SEDAN', '2505', '5', 'petrol', 25729210, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LS500H F SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LS500H F SPORT', '6AA-GVF50-AEVQH(F)', 'CVT', '2WD', 3456, 'SEDAN', '2505', '5', 'petrol', 25729210, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LS500H F SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LS500H I PACKAGE', '6AA-GVF50-AEVQH(I)', 'CVT', '4WD', 3456, 'SEDAN', '2475', '5', 'petrol', 26803088, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LS500H I PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LS500H I PACKAGE', '6AA-GVF50-AEVQH(I)', 'CVT', '2WD', 3444, 'SEDAN', '2465', '5', 'petrol', 23390191, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LS500H I PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LS500H I PACKAGE', 'DAA-GVF50-AEVHQ(I)', 'CVT', '2WD', 3456, 'SEDAN', '2495', '5', 'petrol', 23964694, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LS500H I PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LS500H VERSION L', '6AA-GVF50-AEVQH(L)', 'CVT', '4WD', 3456, 'SEDAN', '2545', '5', 'petrol', 28766162, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LS500H VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LS500H VERSION L', '6AA-GVF50-AEVQH(L)', 'CVT', '2WD', 3456, 'SEDAN', '2575', '5', 'petrol', 25509712, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LS500H VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LS500H VERSION L', 'DAA-GVF50-AEVQH (L)', 'CVT', '2WD', 3456, 'SEDAN', '2575', '5', 'petrol', 25500060, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LS500H VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LX570', 'DBA-URJ201W-GNZGK', '8AT', '4WD', 5662, 'SUV', '3170', '8', 'petrol', 19474360, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LX570'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LX570', '3BA-URJ201W-GNZGK', '8AT', '2WD', 5662, 'SUV', '3170', '8', 'petrol', 19474360, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LX570'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LX600', '3BA-VJA310W-GKULZ', '10AT', '4WD', 3444, 'SUV', '2975', '7', 'petrol', 23578822, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LX600'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'LX600', '3BA-VJA310-GKULZ', '10AT', 'AWD', 3444, 'SUV', '2975', '7', 'petrol', 23578822, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'LX600'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'NX250', '5BA-AAZA20-AWZLB', '8AT', '4WD', 2487, 'SUV', '1895', '5', 'petrol', 7946936, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'NX250'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'NX250', '5BA-AAZA20-AWZLB', '8AT', '2WD', 2487, 'SUV', '1895', '5', 'petrol', 7946936, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'NX250'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'NX300', 'DBA-AGZ10-AWTLT', '6AT', '2WD', 1998, 'SUV', '1985', '5', 'petrol', 7156213, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'NX300'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'NX300', '3BA-AGZ10-AWTLT', '6AT', '2WD', 1998, 'SUV', '1985', '5', 'petrol', 7218136, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'NX300'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'NX300H', 'DBA-AGZ10-AWTLT', '6AT', '2WD', 1998, 'SUV', '1985', '5', 'petrol', 6848143, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'NX300H'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'NX300H VERSION L', '6AA-AYZ10-AWXLB(L)', 'CVT', '2WD', 2493, 'SUV', '2065', '4', 'petrol', 9307680, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'NX300H VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'NX300H VERSION L', 'DAA-AYZ10-AWXLB(L)', 'CVT', '2WD', 2493, 'SUV', '2065', '5', 'petrol', 8866413, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'NX300H VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'NX300H VERSION L', 'DAA-AYZ10-AWXLB(L)', 'CVT', '2WD', 2493, 'SUV', '2065', '5', 'petrol', 9245755, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'NX300H VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'NX350 F SPORT', '5BA-TAZA25-AWZLT(F)', '8AT', '4WD', 2393, 'SUV', '2055', '5', 'petrol', 10629682, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'NX350 F SPORT'
);