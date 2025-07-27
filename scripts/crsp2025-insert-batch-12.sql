INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'ESCAPE', 'ST-LINE PHEV (FWD)', 'AUT', 'FWD', 2500, 'SUV', NULL, NULL, 'diesel', 9892138, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'ESCAPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'ESCAPE', 'ST-LINE PHEV (FWD)', 'AUT', 'FWD', 2500, 'SUV', NULL, NULL, 'petrol', 6996878, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'ESCAPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'EVEREST', 'WILDTRAK SPECIAL EDITION (4WD)', 'AUT', '4WD', 3000, 'SUV', NULL, NULL, 'diesel', 13460948, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'EVEREST'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'EVEREST', 'PLATINUM (4WD)', 'AUT', '4WD', 3000, 'SUV', NULL, NULL, 'diesel', 12849483, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'EVEREST'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'EVEREST', 'SPORT (4WD)', 'AUT', '4WD', 3000, 'SUV', NULL, NULL, 'diesel', 11681204, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'EVEREST'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'EVEREST', 'TREMOR (4WD)', 'AUT', '4WD', 3000, 'SUV', NULL, NULL, 'diesel', 12132675, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'EVEREST'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'EVEREST', 'WILDTRAK (4WD)', 'AUT', '4WD', 3000, 'SUV', NULL, NULL, 'diesel', 12189702, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'EVEREST'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'RANGER', 'PLATINUM 3.0 (4X4)', 'AUT', '4*4', 3000, 'DOUBLE CABIN', NULL, NULL, 'diesel', 12774238, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'RANGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'RANGER', 'RAPTOR 3.0 (4X4)', 'AUT', '4*4', 3000, 'DOUBLE CABIN', NULL, NULL, 'diesel', 14326663, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'RANGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'RANGER', 'SPORT 3.0 (4X4)', 'AUT', '4*4', 3000, 'DOUBLE CABIN', NULL, NULL, 'diesel', 11301018, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'RANGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'RANGER', 'WILDTRAK 3.0 (4X4)', 'AUT', '4*4', 3000, 'DOUBLE CABIN', NULL, NULL, 'diesel', 11855456, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'RANGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'RANGER', 'XLT 3.0 (4X4)', 'AUT', '4*4', 3000, 'DOUBLE CABIN', NULL, NULL, 'diesel', 10904992, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'RANGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'F150', 'LARIAT LWB (4WD)', 'AUT', '4WD', 3500, 'DUAL CAB', NULL, NULL, 'petrol', 22327194, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'F150'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'F150', 'LARIAT SWB (4WD)', 'AUT', '4WD', 3500, 'DUAL CAB', NULL, NULL, 'petrol', 22169576, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'F150'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'F150', 'XLT LWB (4X4)', 'AUT', '4*4', 3500, 'DUAL CAB', NULL, NULL, 'petrol', 17099642, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'F150'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'F150', 'XLT SWB (4X4)', 'AUT', '4*4', 3500, 'DUAL CAB', NULL, NULL, 'petrol', 16942023, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'F150'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'MUSTANG', 'GT 5.0 V8', 'AUT', NULL, 5000, 'COUPE', NULL, NULL, 'petrol', 12988092, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'MUSTANG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'MUSTANG', 'GT 5.0 V8', 'MAN', NULL, 5000, 'COUPE', NULL, NULL, 'petrol', 12512860, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'MUSTANG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'MUSTANG', 'GT 5.0 V8', 'AUT', NULL, 5000, 'CONVERTIBLE', NULL, NULL, 'petrol', 13887390, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'MUSTANG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FOTON', 'SAUVANA', NULL, 'AUT', '4*4', 2000, 'SUV', NULL, NULL, 'diesel', 5744563, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FOTON' AND model = 'SAUVANA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FOTON', 'SAUVANA', NULL, 'AUT', '4*2', 2800, 'SUV', NULL, NULL, 'diesel', 6372636, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FOTON' AND model = 'SAUVANA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FOTON', 'VIEW CS2', NULL, 'MAN', NULL, 2800, 'VAN', NULL, NULL, 'diesel', 6002005, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FOTON' AND model = 'VIEW CS2'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FOTON', 'TUNLAND S', NULL, 'AUT', '(4X4)', 2800, 'DUAL CAB', NULL, NULL, 'diesel', 5684964, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FOTON' AND model = 'TUNLAND S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'GREAT WALL', 'GREAT WALL STEED', NULL, 'MANUAL', '2WD', 2000, 'D/CAB', NULL, '4', 'diesel', 3446323, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'GREAT WALL' AND model = 'GREAT WALL STEED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'GREAT WALL', 'GREAT WALL STEED', NULL, 'MANUAL', '4WD', 2000, 'D/CAB', NULL, '4', 'diesel', 4227489, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'GREAT WALL' AND model = 'GREAT WALL STEED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'GREAT WALL', 'GREAT WALL V240', NULL, 'MANUAL', '2WD', 2400, 'D/CAB', NULL, '4', 'petrol', 4549146, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'GREAT WALL' AND model = 'GREAT WALL V240'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'GREAT WALL', 'GREAT WALL V240', NULL, 'MANUAL', '4WD', 2400, 'D/CAB', NULL, '4', 'petrol', 5789822, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'GREAT WALL' AND model = 'GREAT WALL V240'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'GREAT WALL', 'GREAT WALL V200', NULL, 'MANUAL', '2WD', 2000, 'D/CAB', NULL, '4', 'diesel', 5927675, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'GREAT WALL' AND model = 'GREAT WALL V200'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'GREAT WALL', 'GREAT WALL V200', NULL, 'MANUAL', '4WD', 2000, 'S/CAB', NULL, '4', 'diesel', 6525038, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'GREAT WALL' AND model = 'GREAT WALL V200'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'GREAT WALL', 'GREAT WALL X200', NULL, 'ATM', '4WD', 2000, 'SUV', NULL, '5', 'diesel', 7352155, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'GREAT WALL' AND model = 'GREAT WALL X200'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'GREAT WALL', 'GREAT WALL X200', NULL, 'MTM', '4WD', 2000, 'SUV', NULL, '5', 'diesel', 6754793, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'GREAT WALL' AND model = 'GREAT WALL X200'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HAVAL', 'CITY', 'H2', 'AT', '2WD', 1500, 'SUV', NULL, '5', 'petrol', 6031065, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HAVAL' AND model = 'CITY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HAVAL', 'CITY 2WD', 'H2', 'MTM', '2WD', 1500, 'SUV', NULL, '5', 'petrol', 3900089, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HAVAL' AND model = 'CITY 2WD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HAVAL', 'LUXURY', 'H2', 'AT', '2WD', 1500, 'SUV', NULL, '5', 'petrol', 5126405, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HAVAL' AND model = 'LUXURY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HAVAL', 'LUXURY', 'H6', 'AT', '2WD', 2000, 'SUV', NULL, '5', 'petrol', 5414556, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HAVAL' AND model = 'LUXURY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HAVAL', 'LUXURY', 'H9', 'AT', '2WD', 2000, 'SUV', NULL, '5', 'petrol', 6203381, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HAVAL' AND model = 'LUXURY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HAVAL', 'LUXURY', 'H8', 'AT', '4WD', 2000, 'SUV', NULL, '5', 'petrol', 9971361, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HAVAL' AND model = 'LUXURY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HAVAL', 'LUXURY', 'H9', 'AT', '4WD', 2000, 'SUV', NULL, '5', 'petrol', 9086804, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HAVAL' AND model = 'LUXURY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HAVAL', 'PREMIUM', 'H6', 'AT', '2WD', 2000, 'SUV', NULL, '5', 'petrol', 6570989, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HAVAL' AND model = 'PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HAVAL', 'PREMIUM', 'H2', 'AT', '2WD', 1500, 'SUV', NULL, '5', 'petrol', 6019577, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HAVAL' AND model = 'PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HAVAL', 'PREMIUM', 'H2', 'AT', '4WD', 1500, 'SUV', NULL, '5', 'petrol', 6191893, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HAVAL' AND model = 'PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HAVAL', 'PREMIUM', 'H2', 'MTM', '2WD', 1500, 'SUV', NULL, '5', 'petrol', 5508373, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HAVAL' AND model = 'PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HAVAL', 'PREMIUM', 'H6', 'AT', '2WD', 2000, 'SUV', NULL, '5', 'petrol', 6433136, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HAVAL' AND model = 'PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HAVAL', 'PREMIUM', 'H8', 'AT', '2WD', 2000, 'SUV', NULL, '5', 'petrol', 7581910, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HAVAL' AND model = 'PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HAVAL', 'PREMIUM', 'H8', 'AT', '4WD', 2000, 'SUV', NULL, '5', 'petrol', 8730684, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HAVAL' AND model = 'PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HAVAL', 'ULTRA', 'H9', 'AT', '4WD', 2000, 'SUV', NULL, '5', 'petrol', 9149349, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HAVAL' AND model = 'ULTRA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', '300', '16 3870 WIDE CREW ALLOY TRAY', 'AUT', NULL, 4000, 'DOUBLE CABIN', NULL, NULL, 'diesel', 12239602, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = '300'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', '300', '616 3870 WIDE CREW TRADEACE', 'AUT', NULL, 4000, 'DOUBLE CABIN', NULL, NULL, 'diesel', 13165987, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = '300'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', '300', '721 4400 WIDE CREW ALLOY TRAY', 'AUT', NULL, 5100, 'DOUBLE CABIN', NULL, NULL, 'diesel', 13663080, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = '300'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', '300', '721 4400 WIDE CREW TRADEACE', 'AUT', NULL, 5100, 'DOUBLE CABIN', NULL, NULL, 'diesel', 14659008, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = '300'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', '300', '16 2525 STD ALLOY TRAY', 'MAN', NULL, 4000, 'SINGLE CABIN', NULL, NULL, 'diesel', 8791647, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = '300'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', '300', '616 2525 STD TRADEACE', 'MAN', NULL, 4000, 'SINGLE CABIN', NULL, NULL, 'diesel', 8932462, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = '300'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', '300', '616 2525 STD ALLOY TRAY', 'AUT', NULL, 4000, 'SINGLE CABIN', NULL, NULL, 'diesel', 9054999, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = '300'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', '300', '616 2525 STD TRADEACE', 'AUT', NULL, 4000, 'SINGLE CABIN', NULL, NULL, 'diesel', 9210290, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = '300'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', '300', '616 2810 WIDE ALLOY TRAY', 'AUT', NULL, 4000, 'SINGLE CABIN', NULL, NULL, 'diesel', 10389158, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = '300'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', '300', '616 2810 WIDE TRADEACE', 'AUT', NULL, 4000, 'SINGLE CABIN', NULL, NULL, 'diesel', 10759254, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = '300'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', '300', '616 3375 STD ALLOY TRAY', 'AUT', NULL, 4000, 'SINGLE CABIN', NULL, NULL, 'diesel', 9250209, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = '300'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', '300', '616 3375 STD TRADEACE', 'AUT', NULL, 4000, 'SINGLE CABIN', NULL, NULL, 'diesel', 9487387, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = '300'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', '300', '616 3430 WIDE ALLOY TRAY', 'AUT', NULL, 4000, 'SINGLE CABIN', NULL, NULL, 'diesel', 10579982, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = '300'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', '300', '616 3430 WIDE STEELACE', 'AUT', NULL, 4000, 'SINGLE CABIN', NULL, NULL, 'diesel', 12265228, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = '300'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', '300', '616 3430 WIDE TRADEACE', 'AUT', NULL, 4000, 'SINGLE CABIN', NULL, NULL, 'diesel', 11031818, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = '300'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', '300', '617 2810 WIDE ALLOY TRAY', 'MAN', NULL, 4000, 'SINGLE CABIN', NULL, NULL, 'diesel', 10110452, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = '300'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', '300', '617 2810 WIDE TRADEACE', 'MAN', NULL, 4000, 'SINGLE CABIN', NULL, NULL, 'diesel', 10479817, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = '300'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', '300', '617 3430 WIDE ALLOY TRAY', 'MAN', NULL, 4000, 'SINGLE CABIN', NULL, NULL, 'diesel', 10300984, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = '300'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', '300', '617 3430 WIDE STEELACE', 'MAN', NULL, 4000, 'SINGLE CABIN', NULL, NULL, 'diesel', 11980673, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = '300'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', '300', '617 3430 WIDE TRADEACE', 'MAN', NULL, 4000, 'SINGLE CABIN', NULL, NULL, 'diesel', 10769636, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = '300'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', '300', '716 3430 WIDE STEELACE', 'AUT', NULL, 4000, 'SINGLE CABIN', NULL, NULL, 'diesel', 12996939, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = '300'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', '300', '717 3430 WIDE STEELACE', 'MAN', NULL, 4000, 'SINGLE CABIN', NULL, NULL, 'diesel', 12710191, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = '300'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', '300', '721 3500 WIDE ALLOY TRAY', 'AUT', NULL, 5100, 'SINGLE CABIN', NULL, NULL, 'diesel', 11780783, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = '300'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', '300', '721 3500 WIDE TRADEACE', 'AUT', NULL, 5100, 'SINGLE CABIN', NULL, NULL, 'diesel', 12256016, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = '300'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', '8DUTRO ROUTE VAN', 'XZC605', 'AT', '2WD', 4000, 'VAN', NULL, NULL, 'diesel', 11020476, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = '8DUTRO ROUTE VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO', 'XZC605', 'MT', '2WD', 4000, 'VAN', NULL, NULL, 'diesel', 14870633, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO', 'XZC605', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 10514203, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO', 'XZU605', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 8610535, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO', 'XZC605', 'AT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 9926688, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO', 'XZU710', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 15401930, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO', 'XZU655', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 20230725, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO', 'XZC645', 'AT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 19026660, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO', 'XZU720', 'AT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 11282403, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO', 'XZU712', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 16125924, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO', 'XZU720', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 12215774, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO', 'XZU722', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 19571697, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO', 'XZU675', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 12183454, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO', 'XZU775', 'MT', '4WD', 4000, 'TRK', NULL, NULL, 'diesel', 10256868, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO ALL LOW FLOOR', 'XZU655', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 12056879, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO ALL LOW FLOOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO ALL LOW FLOOR', 'XZC605', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 9613531, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO ALL LOW FLOOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO ALL LOW FLOOR BUILD-UP DUMP', 'XZC610', 'AT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 14754396, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO ALL LOW FLOOR BUILD-UP DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO ALL LOW FLOOR BUILD-UP DUMP', 'XZU620', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 25408392, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO ALL LOW FLOOR BUILD-UP DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO ALL LOW FLOOR BUILD-UP DUMP', 'XZC610001', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 6019405, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO ALL LOW FLOOR BUILD-UP DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO ALL LOW FLOOR BUILD-UP DUMP', 'XZU675', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 12401418, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO ALL LOW FLOOR BUILD-UP DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO ALL LOW FLOOR DUMP', 'XZU600-004', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 13215931, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO ALL LOW FLOOR DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO ALL LOW FLOOR DUMP', 'XZU600', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 12553765, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO ALL LOW FLOOR DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO ALL LOW FLOOR DUMP', 'XZU675', 'MT', '4WD', 4000, 'TRK', NULL, NULL, 'diesel', 12286445, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO ALL LOW FLOOR DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO ALL LOW FLOOR SUPER YOKOZUNA DUMP', 'XZU620', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 25408392, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO ALL LOW FLOOR SUPER YOKOZUNA DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO BASEGRADE', 'XZU605', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 9433226, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO BASEGRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO DOUBLE CAB', 'XZU605', 'AT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 11717570, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO DOUBLE CAB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO DUMP', 'XZU600-003', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 12668548, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO DUMP', 'XZU700', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 15141091, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO HIGH FLOOR BUILD-UP MULTI TREND DUMP', 'XZU610', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 12314893, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO HIGH FLOOR BUILD-UP MULTI TREND DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO HIGH FLOOR DUMP', 'XZU600', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 15721948, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO HIGH FLOOR DUMP'
);