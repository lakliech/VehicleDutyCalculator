INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'LUTECIA SPORT TROPHY FINAL EDITION', 'ABA-RM5M1', 'AT', '2WD', 1600, 'HATCHBACK', NULL, NULL, 'petrol', 3083934, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'LUTECIA SPORT TROPHY FINAL EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'MEGANE GT', 'ABA-BBM5M', 'AT', '2WD', 1600, 'HATCHBACK', NULL, NULL, 'petrol', 3385361, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'MEGANE GT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'CAPTUR E-TECH HYBRID LEATHER PACK', '5AA-HJBH4MH', 'AT', '2WD', 1600, 'HATCHBACK', NULL, NULL, 'hybrid', 5148122, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'CAPTUR E-TECH HYBRID LEATHER PACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'CAPTUR E-TECH HYBRID', '5AA-HJBH4MH', 'AT', '2WD', 1600, 'HATCHBACK', NULL, NULL, 'hybrid', 4516770, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'CAPTUR E-TECH HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'LUTECIA E-TECH HYBRID LEATHER PACK', '5AA-BJAH4MH', 'AT', '2WD', 1600, 'HATCHBACK', NULL, NULL, 'hybrid', 4610069, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'LUTECIA E-TECH HYBRID LEATHER PACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'ARKANA SPORT LINE E-TECH FULL HYBRID', '7AA-LJLH4MH', 'AT', '2WD', 1600, 'HATCHBACK', NULL, NULL, 'hybrid', 5001629, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'ARKANA SPORT LINE E-TECH FULL HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'ARKANA E-TECH ENGINEERED', '7AA-LJLH4MH', 'AT', '2WD', 1600, 'HATCHBACK', NULL, NULL, 'hybrid', 5641424, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'ARKANA E-TECH ENGINEERED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'LUTECIA E-TECH HYBRID', '5AA-BJAH4MH', 'AT', '2WD', 1600, 'HATCHBACK', NULL, NULL, 'hybrid', 3739771, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'LUTECIA E-TECH HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'LUTECIA SPORT TROPHY', 'VF15R930DH076', 'AT', '2WD', 1600, 'HATCHBACK', NULL, NULL, 'petrol', 2039702, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'LUTECIA SPORT TROPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'ARKANA ENTRACTE E-TECH FULL HYBRID', '7AA-LJLH4MH', 'AT', '2WD', 1600, 'HATCHBACK', NULL, NULL, 'hybrid', 5385169, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'ARKANA ENTRACTE E-TECH FULL HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'MEGANE SPORT TROPHY', 'VF1RFB008L081', 'AT', '2WD', 1800, 'HATCHBACK', NULL, NULL, 'petrol', 6366708, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'MEGANE SPORT TROPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'MEGANE R.S.ULTIME', 'VF1RFB001P086', 'AT', '2WD', 1800, 'HATCHBACK', NULL, NULL, 'petrol', 9675235, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'MEGANE R.S.ULTIME'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ROLLS-ROYCE', 'CULLINAN', NULL, 'AT', '4WD', 6500, 'SUV', NULL, '4', 'petrol', 81736483, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ROLLS-ROYCE' AND model = 'CULLINAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ROLLS-ROYCE', 'CULLINAN BASEGRADE', NULL, 'AT', '4WD', 6500, 'SUV', NULL, '4', 'petrol', 65426253, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ROLLS-ROYCE' AND model = 'CULLINAN BASEGRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ROLLS-ROYCE', 'DAWN BASEGRADE', NULL, 'AT', '4WD', 6600, 'CONVERTIBLE', NULL, '2', 'petrol', 39922903, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ROLLS-ROYCE' AND model = 'DAWN BASEGRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ROLLS-ROYCE', 'GHOST BASEGRADE', NULL, 'AT', '4WD', 6700, 'SEDAN', NULL, '4', 'petrol', 53552370, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ROLLS-ROYCE' AND model = 'GHOST BASEGRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ROLLS-ROYCE', 'GHOST II BASEGRADE', NULL, 'AT', '2WD', 6600, 'SEDAN', NULL, '4', 'petrol', 40886711, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ROLLS-ROYCE' AND model = 'GHOST II BASEGRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ROLLS-ROYCE', 'PHANTOM', NULL, 'AT', '2WD', 6800, 'SEDAN', NULL, '4', 'petrol', 69577848, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ROLLS-ROYCE' AND model = 'PHANTOM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ROLLS-ROYCE', 'PHANTOM BASEGRADE', NULL, 'AT', '2WD', 6200, 'SEDAN', NULL, '4', 'petrol', 64737909, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ROLLS-ROYCE' AND model = 'PHANTOM BASEGRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ROLLS-ROYCE', 'PHANTOM EWB', NULL, 'AT', '2WD', 6700, 'SEDAN', NULL, '4', 'petrol', 32509219, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ROLLS-ROYCE' AND model = 'PHANTOM EWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ROLLS-ROYCE', 'WRAITH', NULL, 'AT', '2WD', 6600, 'COUPE', NULL, NULL, 'petrol', 70156217, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ROLLS-ROYCE' AND model = 'WRAITH'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ROLLS-ROYCE', 'WRAITH BASEGRADE', NULL, 'AT', '2WD', 6600, 'COUPE', NULL, NULL, 'petrol', 52051775, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ROLLS-ROYCE' AND model = 'WRAITH BASEGRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SAIC MOTORS', 'MAXUS T90', NULL, 'Manual/Auto', 'RWD/AWD', 2000, 'PICKUP', '2,200', '2', 'petrol/diesel', 9709853, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SAIC MOTORS' AND model = 'MAXUS T90'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SAIC MOTORS', 'MG CYBERSTER', NULL, 'Automatic', 'RWD', NULL, 'ROADSTER', '1,800', '2', 'electric', 12665025, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SAIC MOTORS' AND model = 'MG CYBERSTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SAIC MOTORS', 'MG HS', NULL, 'Automatic', 'AWD', 1500, 'SUV', '1,700', '5', 'petrol', 10642139, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SAIC MOTORS' AND model = 'MG HS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SAIC MOTORS', 'MG MG3', NULL, 'Manual', 'FWD', 1500, 'HATCHBACK', '1,200', '5', 'petrol', 3265202, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SAIC MOTORS' AND model = 'MG MG3'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SAIC MOTORS', 'MG MG4 EV', NULL, 'Automatic', 'RWD', NULL, 'HATCHBACK', '1,600', '5', 'electric', 10554188, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SAIC MOTORS' AND model = 'MG MG4 EV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SAIC MOTORS', 'MG ZS EV', NULL, 'Automatic', 'FWD', NULL, 'SUV', '1,500', '5', 'electric', 13134100, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SAIC MOTORS' AND model = 'MG ZS EV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SAIC MOTORS', 'RISING AUTO F7', NULL, 'Automatic', 'RWD/AWD', NULL, 'SEDAN', '1,700', '5', 'electric', 8443350, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SAIC MOTORS' AND model = 'RISING AUTO F7'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SAIC MOTORS', 'ROEWE I6 MAX', NULL, 'Automatic', 'FWD', 1500, 'SEDAN', '1,500', '5', 'petrol', 7739738, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SAIC MOTORS' AND model = 'ROEWE I6 MAX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SAIC MOTORS', 'ROEWE RX9', NULL, 'Automatic', 'AWD', 2000, 'SUV', '1,800', '7', 'petrol', 11257800, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SAIC MOTORS' AND model = 'ROEWE RX9'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SCANIA', 'SCANIA G370', 'G370', 'AT', '4×2', 13000, 'TRUCK', NULL, '2', 'diesel', 8707205, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SCANIA' AND model = 'SCANIA G370'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SCANIA', 'SCANIA G400', 'G400', 'AT', '6×2', 13000, 'TRUCK', NULL, '2', 'diesel', 9023830, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SCANIA' AND model = 'SCANIA G400'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SCANIA', 'SCANIA G410', 'G410', 'MT', '6×2', 12700, 'TRUCK', '23,800', '2', 'diesel', 7124077, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SCANIA' AND model = 'SCANIA G410'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SCANIA', 'SCANIA G420', 'G420', 'AT', '6×2', 13000, 'TRUCK', NULL, '2', 'diesel', 9182143, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SCANIA' AND model = 'SCANIA G420'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SCANIA', 'SCANIA G450', 'G450', 'AT', '6×2', 13000, 'TRUCK', NULL, '2', 'diesel', 9498769, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SCANIA' AND model = 'SCANIA G450'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SCANIA', 'SCANIA G460', 'G460', 'AT', '6×2', 13000, 'TRUCK', NULL, '2', 'diesel', 9498769, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SCANIA' AND model = 'SCANIA G460'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SCANIA', 'SCANIA G480', 'G480', 'AT', '6×2', 13000, 'TRUCK', NULL, '2', 'diesel', 9657082, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SCANIA' AND model = 'SCANIA G480'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SCANIA', 'SCANIA G500', 'G500', 'AT', '6×2', 13000, 'TRUCK', NULL, '2', 'diesel', 9815394, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SCANIA' AND model = 'SCANIA G500'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SCANIA', 'SCANIA R410', 'R410', 'AT', '6×4', 13000, 'TRUCK', NULL, '2', 'diesel', 8707205, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SCANIA' AND model = 'SCANIA R410'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SCANIA', 'SCANIA R450', 'R450', 'AT', '6×4', 13000, 'TRUCK', NULL, '2', 'diesel', 9340456, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SCANIA' AND model = 'SCANIA R450'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SCANIA', 'SCANIA R480', 'R480', 'AT', '6×4', 12700, 'TRUCK', NULL, '2', 'diesel', 7915641, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SCANIA' AND model = 'SCANIA R480'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SCANIA', 'SCANIA R500', 'R500', 'AT', '6×4', 13000, 'TRUCK', NULL, '2', 'diesel', 10290333, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SCANIA' AND model = 'SCANIA R500'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SCANIA', 'SCANIA R540', 'R540', 'AT', '6×4', 13000, 'TRUCK', NULL, '2', 'diesel', 11081897, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SCANIA' AND model = 'SCANIA R540'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SCANIA', 'SCANIA R620', 'R620', 'AT', '6×4', 16400, 'TRUCK', NULL, '2', 'diesel', 12665025, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SCANIA' AND model = 'SCANIA R620'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SCANIA', 'SCANIA R730', 'R730', 'AT', '6×4', 16400, 'TRUCK', NULL, '2', 'diesel', 13456589, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SCANIA' AND model = 'SCANIA R730'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SCANIA', 'G SERIES G460', NULL, 'MT', '6x4', 5346, NULL, NULL, NULL, 'diesel', 9447686, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SCANIA' AND model = 'G SERIES G460'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SCANIA', 'R SERIES 410', NULL, 'MT', '4x2', 10879, NULL, NULL, NULL, 'diesel', 8088307, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SCANIA' AND model = 'R SERIES 410'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SHACMAN', 'X3000 TRACTOR HEAD 6X4 385 HP', 'X3000', 'MT', '6X4', 10800, 'TRACTOR', NULL, NULL, NULL, 9366490, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SHACMAN' AND model = 'X3000 TRACTOR HEAD 6X4 385 HP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SHACMAN', 'X3000 TRACTOR HEAD 6X4 420 H', 'X3000', 'MT', '6X4', 10800, 'TRACTOR', NULL, NULL, NULL, 9456552, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SHACMAN' AND model = 'X3000 TRACTOR HEAD 6X4 420 H'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SHACMAN', 'F3000 TRUCK HEAD', 'FS3000', 'MT', '6X4', 10800, 'TRUCK', NULL, NULL, NULL, 5583869, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SHACMAN' AND model = 'F3000 TRUCK HEAD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SHACMAN', 'X3000 TRUCK TRACTOR', 'X3000', 'MT', '6X4', 10800, 'TRUCK', NULL, NULL, NULL, 6574555, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SHACMAN' AND model = 'X3000 TRUCK TRACTOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SHACMAN', 'H3000 TRACTOR TRUCK', 'H3000', 'MT', '6X4', 10800, 'TRUCK', NULL, NULL, NULL, 5763994, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SHACMAN' AND model = 'H3000 TRACTOR TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SHACMAN', 'F3000 TIPPER TRUCK', 'F3000', 'MT', '6X4', 10800, 'TRUCK', NULL, NULL, NULL, 7114930, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SHACMAN' AND model = 'F3000 TIPPER TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SHACMAN', 'H3000 DUMP TRUCK', 'H3000', 'MT', '6X4', 10800, 'TRUCK', NULL, NULL, NULL, 7475179, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SHACMAN' AND model = 'H3000 DUMP TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SHACMAN', 'X3000 TRACTOR', 'X3000', 'MT', '6X4', 10800, 'TRACTOR', NULL, NULL, NULL, 6934805, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SHACMAN' AND model = 'X3000 TRACTOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'ENYAQ RS', 'RS', 'AT', '4WD', NULL, 'SUV', NULL, NULL, 'electric', 15128682, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'ENYAQ RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'ENYAQ SPORTLINE', NULL, 'AT', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 12606935, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'ENYAQ SPORTLINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'FABIA 110TSI MONTE CARLO EDITION 150', '110TSI', '7AT', '4WD', 1500, 'HATCHBACK', NULL, NULL, 'petrol', 5594076, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'FABIA 110TSI MONTE CARLO EDITION 150'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'FABIA MONTE CARLO 110TSI', '110TSI', '7AT', '4WD', 1500, 'HATCHBACK', NULL, NULL, 'petrol/electric', 6553391, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'FABIA MONTE CARLO 110TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'FABIA MONTE CARLO 110TSI', '110TSI', '7AT', '2WD', 1500, 'HATCHBACK', NULL, NULL, 'petrol', 6553391, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'FABIA MONTE CARLO 110TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'FABIA MONTE CARLO EDITION 150', NULL, '7AT', '2WD', 1500, 'HATCHBACK', NULL, NULL, 'petrol', 4922060, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'FABIA MONTE CARLO EDITION 150'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'FABIA SELECT 85TSI', '85TSI', '7AT', '2WD', 1000, 'HATCHBACK', NULL, NULL, 'petrol/electric', 5348055, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'FABIA SELECT 85TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'FABIA SELECT 85TSI', '85TSI', '7AT', '2WD', 1000, 'HATCHBACK', NULL, NULL, 'petrol', 5348055, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'FABIA SELECT 85TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'KAMIQ MONTE CARLO 110TSI', '110TSI', '7AT', '2WD', 1500, 'SUV', NULL, NULL, 'petrol/electric', 7048734, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'KAMIQ MONTE CARLO 110TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'KAMIQ MONTE CARLO 110TSI', '110TSI', '7AT', '2WD', 1500, 'SUV', NULL, NULL, 'petrol', 7048734, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'KAMIQ MONTE CARLO 110TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'KAMIQ RUNOUT 85TSI', '85TSI', '7AT', '2WD', 1000, 'SUV', NULL, NULL, 'petrol', 4704109, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'KAMIQ RUNOUT 85TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'KAMIQ SELECT 85TSI', '85TSI', '7AT', '2WD', 1000, 'SUV', NULL, NULL, 'petrol/electric', 5430613, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'KAMIQ SELECT 85TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'KAMIQ SELECT 85TSI', '85TSI', '7AT', '2WD', 1000, 'SUV', NULL, NULL, 'petrol', 5430613, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'KAMIQ SELECT 85TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'KAMIQ SIGNATURE 110TSI', '110TSI', '7AT', '2WD', 1500, 'SUV', NULL, NULL, 'petrol', 6538530, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'KAMIQ SIGNATURE 110TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'KAMIQ STYLE 85TSI', '85TSI', '7AT', '4WD', 1000, 'SUV', NULL, NULL, 'petrol', 5485100, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'KAMIQ STYLE 85TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'KAROQ (BASE)', NULL, '8AT', '4WD', 1400, 'SUV', NULL, NULL, 'petrol', 5957328, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'KAROQ (BASE)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'KAROQ (BASE)', NULL, '8AT', '2WD', 1400, 'SUV', NULL, NULL, 'petrol', 6602925, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'KAROQ (BASE)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'KAROQ SPORTLINE  110TSI', '110TSI', '8AT', '2WD', 1400, 'SUV', NULL, NULL, 'petrol/electric', 7345940, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'KAROQ SPORTLINE  110TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'KAROQ SPORTLINE  110TSI', '110TSI', '8AT', '2WD', 1400, 'SUV', NULL, NULL, 'petrol', 7593611, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'KAROQ SPORTLINE  110TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'KAROQ STYLE 110TSI', '110TSI', '8AT', '2WD', 1400, 'SUV', NULL, NULL, 'petrol', 6738319, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'KAROQ STYLE 110TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'KODIAQ RS  180TSI', '180TSI', '7AT', '4WD', 2000, 'SUV', NULL, NULL, 'petrol', 10838109, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'KODIAQ RS  180TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'KODIAQ RS  180TSI', '180TSI', '7AT', '4WD', 2000, 'SUV', NULL, NULL, 'petrol', 12715010, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'KODIAQ RS  180TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'KODIAQ SELECT', NULL, '7AT', '4WD', 2000, 'SUV', NULL, NULL, 'petrol/electric', 9905063, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'KODIAQ SELECT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'KODIAQ SPORTLINE', NULL, '7AT', '4WD', 2000, 'SUV', NULL, NULL, 'petrol/electric', 10625562, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'KODIAQ SPORTLINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'KODIAQ SPORTLINE  132TSI', '132TSI', '7AT', '4WD', 2000, 'SUV', NULL, NULL, 'petrol', 10409412, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'KODIAQ SPORTLINE  132TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'KODIAQ STYLE  132TSI', '132TSI', '7AT', '4WD', 2000, 'SUV', NULL, NULL, 'petrol', 9598851, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'KODIAQ STYLE  132TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'OCTAVIA RS 180TSI', '180TSI', '7AT', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 8718040, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'OCTAVIA RS 180TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'OCTAVIA RS 180TSI', '180TSI', '7AT', '4WD', 2000, 'WAGON', NULL, NULL, 'petrol', 8935991, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'OCTAVIA RS 180TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'OCTAVIA RS 180TSI', '180TSI', '7AT', '4WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 9472763, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'OCTAVIA RS 180TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'OCTAVIA RS 195TSI', '195TSI', '7AT', '4WD', 2000, 'WAGON', NULL, NULL, 'petrol/electric', 9946491, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'OCTAVIA RS 195TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'OCTAVIA RS 195TSI', '195TSI', '7AT', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol/electric', 10355375, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'OCTAVIA RS 195TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'OCTAVIA SELECT 110TSI', '110TSI', '8AT', '4WD', 1400, 'SEDAN', NULL, NULL, 'petrol', 5812027, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'OCTAVIA SELECT 110TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'OCTAVIA SELECT 110TSI', '110TSI', '8AT', '4WD', 1400, 'SEDAN', NULL, NULL, 'petrol', 6536879, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'OCTAVIA SELECT 110TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'OCTAVIA SPORTLINE 110TSI', '110TSI', '8AT', '4WD', 1400, 'SEDAN', NULL, NULL, 'petrol/electric', 7345940, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'OCTAVIA SPORTLINE 110TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'OCTAVIA SPORTLINE 110TSI', '110TSI', '8AT', '2WD', 1400, 'SEDAN', NULL, NULL, 'petrol', 6701993, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'OCTAVIA SPORTLINE 110TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'OCTAVIA STYLE 110TSI', '110TSI', '8AT', '4WD', 1400, 'WAGON', NULL, NULL, 'petrol', 6229766, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'OCTAVIA STYLE 110TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'OCTAVIA STYLE 110TSI', '110TSI', '8AT', '4WD', 1400, 'SEDAN', NULL, NULL, 'petrol', 6701993, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'OCTAVIA STYLE 110TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'SCALA AMBITION 85TSI', '85TSI', '7AT', '4WD', 1000, 'HATCHBACK', NULL, NULL, 'petrol', 4885735, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'SCALA AMBITION 85TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'SCALA MONTE CARLO 110TSI', '110TSI', '7AT', '2WD', 1500, 'HATCHBACK', NULL, NULL, 'petrol/electric', 6999199, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'SCALA MONTE CARLO 110TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'SCALA MONTE CARLO 110TSI', '110TSI', '7AT', '4WD', 1500, 'HATCHBACK', NULL, NULL, 'petrol', 6999199, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'SCALA MONTE CARLO 110TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'SCALA SELECT 85TSI', '85TSI', '7AT', '4WD', 1000, 'HATCHBACK', NULL, NULL, 'petrol/electric', 5364567, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'SCALA SELECT 85TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'SCALA SELECT 85TSI', '85TSI', '7AT', '2WD', 1000, 'HATCHBACK', NULL, NULL, 'petrol', 5364567, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'SCALA SELECT 85TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'SCALA SIGNATURE 110TSI', '110TSI', '7AT', '4WD', 1500, 'HATCHBACK', NULL, NULL, 'petrol', 6284254, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'SCALA SIGNATURE 110TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'SUPERB SPORTLINE 206TSI', '206TSI', '7AT', '4WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 11814386, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'SUPERB SPORTLINE 206TSI'
);