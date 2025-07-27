INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA1041K2L2Y', NULL, 'MT', '6X4', 6557, 'TRK', NULL, NULL, 'diesel', 1680000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA1041K2L2Y'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA1075 CHASSIS ONLY', NULL, 'MT', '4X4', 3168, 'TRK', NULL, NULL, 'diesel', 1980000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA1075 CHASSIS ONLY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA1081 FAW FIGHTER CHASSIS ONLY', NULL, 'MT', '4X4', NULL, 'TRK', NULL, NULL, 'diesel', 2990000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA1081 FAW FIGHTER CHASSIS ONLY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA1170', NULL, 'MT', '6X2', NULL, 'TRK', NULL, NULL, 'diesel', 5460000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA1170'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA1320 CEMENT MIXER J5P', NULL, 'MT', '6X4', NULL, 'MIXER', NULL, NULL, 'diesel', 7200000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA1320 CEMENT MIXER J5P'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA1311', NULL, 'MT', '8*4', NULL, 'TRK', NULL, NULL, 'diesel', 6875000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA1311'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA1083 TANKER', NULL, 'MT', '4X4', 280, 'TRK', NULL, NULL, 'diesel', 2520000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA1083 TANKER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA1074 FBU', NULL, 'MT', '4X4', 140, 'BUS', NULL, NULL, 'diesel', 5165580, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA1074 FBU'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA1074 CHASSIS CAB', NULL, 'MT', '4X4', 3857, 'BUS', NULL, NULL, 'diesel', 3360000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA1074 CHASSIS CAB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA6680', NULL, 'MT', '4X4', 3857, 'BUS', NULL, NULL, 'diesel', 9545118, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA6680'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA1044', NULL, 'MT', NULL, 6842, 'BUS', NULL, NULL, 'diesel', 5366256, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA1044'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA1081', NULL, 'MT', '4X4', NULL, 'BUS', NULL, NULL, 'diesel', 7300603, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA1081'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA1083', NULL, 'MT', '4X4', NULL, 'BUS', NULL, NULL, 'diesel', 7084809, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA1083'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'XQ6751TQ2 LUXURY BUS', NULL, 'MT', '4X4', NULL, 'BUS', NULL, NULL, 'diesel', 7487798, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'XQ6751TQ2 LUXURY BUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'XQ6100MH2 LUXURY BUS', NULL, 'MT', '4X4', NULL, 'BUS', NULL, NULL, 'diesel', 14850800, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'XQ6100MH2 LUXURY BUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA6413 SIRUS', NULL, 'MT', '2WD', NULL, 'SAL', NULL, NULL, 'diesel', 3556704, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA6413 SIRUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA1170', NULL, 'MT', '6X4', NULL, 'TRK', NULL, NULL, 'diesel', 7051010, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA1170'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA1223 LONG CHASSIS', NULL, 'MT', '6X4', NULL, 'TRK', NULL, NULL, 'diesel', 8610968, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA1223 LONG CHASSIS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA1311', NULL, 'MT', '8X4', NULL, 'TRK', NULL, NULL, 'diesel', 11049703, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA1311'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA1128', NULL, 'MT', '4X4', 280, 'TIPPER', NULL, NULL, 'diesel', 6551824, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA1128'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA3223', NULL, 'MT', '6X4', NULL, 'TIPPER', NULL, NULL, 'diesel', 9234952, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA3223'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA3075', NULL, 'MT', '4X4', 230, 'TIPPER', NULL, NULL, 'diesel', 5459853, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA3075'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA3120', NULL, 'MT', '4X4', 130, 'TIPPER', NULL, NULL, 'diesel', 7051010, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA3120'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA4258 J5', NULL, 'MT', '6X4', 290, 'PM', NULL, NULL, 'diesel', 10046130, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA4258 J5'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA4250 J6', NULL, 'MT', '6X4', 420, 'PM', NULL, NULL, 'diesel', 10482918, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA4250 J6'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA4322P2K15TIA82', NULL, 'MT', NULL, 420, 'PM', NULL, NULL, 'diesel', 9234952, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA4322P2K15TIA82'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA4161', NULL, 'MT', '6*4', 380, 'PM', NULL, NULL, 'diesel', 8486172, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA4161'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA4080', NULL, 'MT', '4X4', 280, 'TRK', NULL, NULL, 'diesel', 4867069, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA4080'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA1120 SWB', NULL, 'MT', '4X4', NULL, 'TRK', NULL, NULL, 'diesel', 6239832, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA1120 SWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA1120 LWB', NULL, 'MT', '4X4', NULL, 'TRK', NULL, NULL, 'diesel', 6427027, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA1120 LWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA1150 LWB', NULL, 'MT', '4X4', NULL, 'TRK', NULL, NULL, 'diesel', 6824816, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA1150 LWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA5150 CEMENT MIXER 3.5M', NULL, 'MT', '4X4', NULL, 'TRK', NULL, NULL, 'diesel', 8059783, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA5150 CEMENT MIXER 3.5M'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA5250 CEMENT MIXER 8 CBM', NULL, 'MT', '6X4', NULL, 'TRK', NULL, NULL, 'diesel', 11762083, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA5250 CEMENT MIXER 8 CBM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA 2160 FIGHTER', NULL, 'MT', '4X4', NULL, 'TRK', NULL, NULL, 'diesel', 21277828, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA 2160 FIGHTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'FERRARI 488 GTB BASE GRADE', 'ZFF79AMJ00023', 'AT', '2wd', 3900, 'COUPE', NULL, NULL, 'petrol', 58665270, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'FERRARI 488 GTB BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'FERRARI 488 SPIDER BASE GRADE', 'ZFF80AMJ00023', 'AT', '2wd', 3900, 'CONVERTIBLE', NULL, NULL, 'petrol', 53517716, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'FERRARI 488 SPIDER BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'FERRARI 488 SPIDER', 'ZFF80AMC00023', 'AT', '2wd', 3900, 'CONVERTIBLE', NULL, NULL, 'petrol', 59287382, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'FERRARI 488 SPIDER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'FERRARI 812 SUPERFAST BASE GRADE', 'ZFF83CMJ00023', 'AT', '2wd', 6500, 'COUPE', NULL, NULL, 'petrol', 70921056, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'FERRARI 812 SUPERFAST BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'FERRARI GTC4 LUSSO BASE GRADE', 'ABA-F151BME', 'AT', '2wd', 3900, 'COUPE', NULL, NULL, 'petrol', 48037743, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'FERRARI GTC4 LUSSO BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'FERRARI GTC4 LUSSO', 'ABA-F151BME', 'AT', '2wd', 6300, 'COUPE', NULL, NULL, 'petrol', 47523556, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'FERRARI GTC4 LUSSO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'FERRARI 488PISTA BASE GRADE', 'ZFF90HMJ00024', 'AT', '2wd', 3900, 'COUPE', NULL, NULL, 'petrol', 117606403, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'FERRARI 488PISTA BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'FERRARI 488PISTA SPIDER BASE GRADE', 'ZFF91HMJ00024', 'AT', '2wd', 3900, 'CONVERTIBLE', NULL, NULL, 'petrol', 169571184, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'FERRARI 488PISTA SPIDER BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'FERRARI 488 SPIDER BASE GRADE', 'ABA-F142B', 'AT', '2wd', 3900, 'CONVERTIBLE', NULL, NULL, 'petrol', 69695354, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'FERRARI 488 SPIDER BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'FERRARI 812 SUPERFAST BASE GRADE', 'ZFF83CMJ00024', 'AT', '2wd', 6500, 'COUPE', NULL, NULL, 'petrol', 75125686, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'FERRARI 812 SUPERFAST BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'FERRARI 812 SUPERFAST', 'ZFF83CMJ00024', 'AT', '2wd', 6500, 'COUPE', NULL, NULL, 'petrol', 78613862, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'FERRARI 812 SUPERFAST'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'FERRARI PORTOFINO BASE GRADE', 'ZFF89FPC00024', 'AT', '2wd', 3900, 'CONVERTIBLE', NULL, NULL, 'petrol', 47729280, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'FERRARI PORTOFINO BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'FERRARI GTC4 LUSSO T', 'ABA-F151CME', 'AT', '2wd', 3900, 'COUPE', NULL, NULL, 'petrol', 37034579, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'FERRARI GTC4 LUSSO T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'FERRARI PORTOFINO', 'ABA-F164BCA', 'AT', '2wd', 3900, 'CONVERTIBLE', NULL, NULL, 'petrol', 56402549, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'FERRARI PORTOFINO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'FERRARI F8 SPIDER', '7BA-F142CE', 'AT', '2wd', 3900, 'CONVERTIBLE', NULL, NULL, 'petrol', 82148468, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'FERRARI F8 SPIDER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'FERRARI F8 TRIBUTO BASE GRADE', 'F142CE', 'AT', '2wd', 3900, 'COUPE', NULL, NULL, 'petrol', 69978379, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'FERRARI F8 TRIBUTO BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'FERRARI SF90 STRADALE BASE GRADE', '7LA-173H', 'AT', '2wd', 4000, 'COUPE', NULL, NULL, 'hybrid', 101174882, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'FERRARI SF90 STRADALE BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'FERRARI F8 TRIBUTO', NULL, 'AT', '2wd', 3900, 'COUPE', NULL, NULL, 'petrol', 84033821, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'FERRARI F8 TRIBUTO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'FERRARI PORTOFINO M BASE GRADE', '7BA-F164BCA', 'AT', '2wd', 3900, 'CONVERTIBLE', NULL, NULL, 'petrol', 58665270, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'FERRARI PORTOFINO M BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'FERRARI PORTOFINO M', '7BA-F164BCA', 'AT', '2wd', 3900, 'CONVERTIBLE', NULL, NULL, 'petrol', 60036436, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'FERRARI PORTOFINO M'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'FERRARI ROMA', '7BA-F164BAA', 'AT', '2wd', 3900, 'COUPE', NULL, NULL, 'petrol', 69035455, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'FERRARI ROMA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'FERRARI SF90 SPIDER', '7LA-173H', 'AT', '2wd', 4000, 'CONVERTIBLE', NULL, NULL, 'petrol', 109762699, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'FERRARI SF90 SPIDER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'FERRARI SF90 STRADALE', '7LA-173H', 'AT', '2wd', 4000, 'CONVERTIBLE', NULL, NULL, 'hybrid', 94318556, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'FERRARI SF90 STRADALE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'FERRARI F8 SPIDER BASE GRADE', '7BA-F142CE', 'AT', '2wd', 3900, 'CONVERTIBLE', NULL, NULL, 'petrol', 99203830, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'FERRARI F8 SPIDER BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'FERRARI ROMA BASE GRADE', '7BA-F164BAA', 'AT', '2wd', 3900, 'COUPE', NULL, NULL, 'petrol', 61116427, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'FERRARI ROMA BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'FERRARI 296GTB BASE GRADE', 'ZFF99SMJ00030', 'AT', '2wd', 3000, 'COUPE', NULL, NULL, 'plug-in-hybrid', 66716426, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'FERRARI 296GTB BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'FERRARI 296GTB', 'ZFF99SMJ00031', 'AT', '2wd', 3000, 'COUPE', NULL, NULL, 'plug-in-hybrid', 92432956, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'FERRARI 296GTB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'FERRARI 296GTS BASE GRADE', 'ZFF01SMJ00030', 'AT', '2wd', 3000, 'CONVERTIBLE', NULL, NULL, 'plug-in-hybrid', 111874276, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'FERRARI 296GTS BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'FERRARI 296GTS', 'ZFF01SMJ00030', 'AT', '2wd', 3000, 'CONVERTIBLE', NULL, NULL, 'plug-in-hybrid', 84033821, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'FERRARI 296GTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'FERRARI SF90 SPIDER BASE GRADE', '7LA-173H', 'AT', '2wd', 4000, 'CONVERTIBLE', NULL, NULL, 'petrol', 127914846, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'FERRARI SF90 SPIDER BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', '296GTB', 'ZFF99SMJ00031', 'AT', '2WD', 3000, 'COUPE', NULL, NULL, 'hybrid', 115541195, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = '296GTB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', '296GTB BASE GRADE', 'ZFF99SMJ00030', 'AT', '2WD', 3000, 'COUPE', NULL, NULL, 'hybrid', 83395533, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = '296GTB BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', '296GTS', 'ZFF01SMJ00030', 'AT', '2WD', 3000, 'CONVERTIBLE', NULL, NULL, 'hybrid', 105042277, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = '296GTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', '296GTS BASE GRADE', 'ZFF01SMJ00030', 'AT', '2WD', 3000, 'CONVERTIBLE', NULL, NULL, 'hybrid', 139842845, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = '296GTS BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', '488 SPIDER', 'ZFF80AMC00023', 'AT', '2WD', 3900, 'CONVERTIBLE', NULL, NULL, 'petrol', 169392520, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = '488 SPIDER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', '488 SPIDER BASE GRADE', 'ABA-F142B', 'AT', '2WD', 3900, 'CONVERTIBLE', NULL, NULL, 'petrol', 174238385, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = '488 SPIDER BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', '488PISTA BASE GRADE', 'ZFF90HMJ00024', 'AT', '2WD', 3900, 'COUPE', NULL, NULL, 'petrol', 294016007, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = '488PISTA BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', '488PISTA SPIDER BASE GRADE', 'ZFF91HMJ00024', 'AT', '2WD', 3900, 'CONVERTIBLE', NULL, NULL, 'petrol', 423927960, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = '488PISTA SPIDER BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', '812 SUPERFAST', 'ZFF83CMJ00024', 'AT', '2WD', 6500, 'COUPE', NULL, NULL, 'petrol', 196534655, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = '812 SUPERFAST'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', '812 SUPERFAST BASE GRADE', 'ZFF83CMJ00023', 'AT', '2WD', 6500, 'COUPE', NULL, NULL, 'petrol', 202631589, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = '812 SUPERFAST BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', '812 SUPERFAST BASE GRADE', 'ZFF83CMJ00024', 'AT', '2WD', 6500, 'COUPE', NULL, NULL, 'petrol', 187814215, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = '812 SUPERFAST BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'F8 SPIDER', '7BA-F142CE', 'AT', '2WD', 3900, 'CONVERTIBLE', NULL, NULL, 'petrol', 164296935, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'F8 SPIDER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'F8 SPIDER BASE GRADE', '7BA-F142CE', 'AT', '2WD', 3900, 'CONVERTIBLE', NULL, NULL, 'petrol', 141719757, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'F8 SPIDER BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'F8 TRIBUTO', NULL, 'AT', '2WD', 3900, 'COUPE', NULL, NULL, 'petrol', 140056369, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'F8 TRIBUTO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'F8 TRIBUTO BASE GRADE', 'F142CE', 'AT', '2WD', 3900, 'COUPE', NULL, NULL, 'petrol', 139956759, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'F8 TRIBUTO BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'GTC4 LUSSO', 'ABA-F151BME', 'AT', '2WD', 6300, 'COUPE', NULL, NULL, 'petrol', 135781588, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'GTC4 LUSSO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'GTC4 LUSSO BASE GRADE', 'ABA-F151BME', 'AT', '2WD', 3900, 'COUPE', NULL, NULL, 'petrol', 137250695, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'GTC4 LUSSO BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'GTC4 LUSSO T', 'ABA-F151CME', 'AT', '2WD', 3900, 'COUPE', NULL, NULL, 'petrol', 82299063, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'GTC4 LUSSO T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'PORTOFINO', 'ABA-F164BCA', 'AT', '2WD', 3900, 'CONVERTIBLE', NULL, NULL, 'petrol', 125338998, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'PORTOFINO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'PORTOFINO BASE GRADE', 'ZFF89FPC00024', 'AT', '2WD', 3900, 'CONVERTIBLE', NULL, NULL, 'petrol', 119323201, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'PORTOFINO BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'PORTOFINO M', '7BA-F164BCA', 'AT', '2WD', 3900, 'CONVERTIBLE', NULL, NULL, 'petrol', 100060727, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'PORTOFINO M'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'PORTOFINO M BASE GRADE', '7BA-F164BCA', 'AT', '2WD', 3900, 'CONVERTIBLE', NULL, NULL, 'petrol', 97775449, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'PORTOFINO M BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'ROMA', '7BA-F164BAA', 'AT', '2WD', 3900, 'COUPE', NULL, NULL, 'petrol', 115059092, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'ROMA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'ROMA BASE GRADE', '7BA-F164BAA', 'AT', '2WD', 3900, 'COUPE', NULL, NULL, 'petrol', 87309181, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'ROMA BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'SF90 SPIDER', '7LA-173H', 'AT', '2WD', 4000, 'CONVERTIBLE', NULL, NULL, 'petrol', 182937832, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'SF90 SPIDER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'SF90 SPIDER BASE GRADE', '7LA-173H', 'AT', '2WD', 4000, 'CONVERTIBLE', NULL, NULL, 'petrol', 159893558, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'SF90 SPIDER BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'SF90 STRADALE', '7LA-173H', 'AT', '2WD', 4000, 'CONVERTIBLE', NULL, NULL, 'hybrid', 134740795, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'SF90 STRADALE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FERRARI', 'SF90 STRADALE BASE GRADE', '7LA-173H', 'AT', '2WD', 4000, 'COUPE', NULL, NULL, 'hybrid', 202349763, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FERRARI' AND model = 'SF90 STRADALE BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', '126 BASE GRADE', 'FIAT126A606', 'AT', '2WD', 600, 'WAGON', NULL, NULL, 'petrol', 4879707, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = '126 BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', '500 1.2 POP', 'ZFA3120000JD8', 'AT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 5270677, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = '500 1.2 POP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', '500 MIMOSA', 'ABA-31212', 'AT', '2WD', 1200, 'SUV', NULL, NULL, 'petrol', 6511849, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = '500 MIMOSA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', '500 TWIN AIR CULT', 'ZFABF1B86NJG1', 'AT', '2WD', 900, 'HATCHBACK', NULL, NULL, 'petrol', 6093650, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = '500 TWIN AIR CULT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', '500 TWIN AIR LOUNGE', 'ABA-31209', 'AT', '2WD', 900, 'SUV', NULL, NULL, 'petrol', 5938884, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = '500 TWIN AIR LOUNGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', '500 TWIN AIR POP', 'ZFA3120000JD8', 'AT', '2WD', 900, 'HATCHBACK', NULL, NULL, 'petrol', 5608073, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = '500 TWIN AIR POP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', '500C 1.2 DOLCEVITA', '3BA-31212', 'AT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 6771862, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = '500C 1.2 DOLCEVITA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', '500C 120TH TUXEDO', 'ABA-31212', 'AT', '2WD', 1200, 'SUV', NULL, NULL, 'petrol', 8382220, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = '500C 120TH TUXEDO'
);