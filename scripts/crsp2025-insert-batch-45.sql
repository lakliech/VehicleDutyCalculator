INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'WRX S4 STI SPORT EYESIGHT', 'DBA-VAG', 'CVT', 'AWD', 1998, 'SEDAN', '1815', '5', 'petrol', 6619536, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'WRX S4 STI SPORT EYESIGHT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'WRX S4 STI SPORT R EX', '5BA-VBH', 'CVT', 'AWD', 2387, 'SEDAN', '1885', '5', 'petrol', 8780055, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'WRX S4 STI SPORT R EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'WRX STI SPORT SPORT R EX', '5BA-VBH', 'CVT', 'AWD', 2387, 'SEDAN', '1885', '5', 'petrol', 8780055, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'WRX STI SPORT SPORT R EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'WRX STI TYPE S', 'CBA-VAB', '6MT', 'AWD', 1994, 'SEDAN', '1765', '5', 'petrol', 6304453, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'WRX STI TYPE S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'WRX STI TYPE S', 'CBA-VAB', 'CVT', 'AWD', 1994, 'SEDAN', '1765', '5', 'petrol', 6654467, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'WRX STI TYPE S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'XV 2.0I-S EYESIGHT', 'DBA-GT7', 'CVT', 'AWD', 1995, 'SUV', '1715', '5', 'petrol', 4331517, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'XV 2.0I-S EYESIGHT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'ALTO HYBRID X', '5AA-HA97S/ABXB', 'CVT', '4WD', 657, 'HATCBACK', '930', '4', 'petrol', 2111824, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'ALTO HYBRID X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'ALTO HYBRID X', '5AA-HA97S/ABXB', 'CVT', '2WD', 657, 'HATCBACK', '930', '4', 'petrol', 2111824, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'ALTO HYBRID X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'ALTO HYBRID X', '5AA-HA97S/ABXB-2', 'CVT', '2WD', 657, 'HATCBACK', '930', '4', 'petrol', 2314707, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'ALTO HYBRID X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'ALTO S', '5BA-HA36S/ABSE-J3', 'CVT', '2WD', 658, 'HATCBACK', '870', '4', 'petrol', 1840699, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'ALTO S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'ALTO S', '5BA-36S/ABSE-J3', 'CVT', '2WD', 658, 'HATCBACK', '870', '4', 'petrol', 1673363, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'ALTO S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'ALTO TURBO RS', 'DBA-HA36S/ASRN-A', '5AGS', '2WD', 658, 'HATCBACK', '890', '4', 'petrol', 2008706, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'ALTO TURBO RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'ALTO VAN VP', 'HBD-HA36V/AGPN-V', '5AGS', '2WD', 658, 'VAN', '930', '4', 'diesel', 1249154, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'ALTO VAN VP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'ALTO VAN VP', 'HBD-HA36V/AGPN-V2', '5AGS', '2WD', 658, 'VAN', '1350', '4', 'petrol', 1249154, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'ALTO VAN VP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'ALTO VAN VP', 'HBD-HA36V/AGPN-V', '5AGS', '2WD', 658, 'VAN', '930', '4', 'petrol', 1249154, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'ALTO VAN VP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'ALTO VP', 'HBD-HA36V/AGPN', '5AGS', '2WD', 658, 'VAN', '930(940)', '2', 'petrol', 1207236, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'ALTO VP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'ALTO WORKS', '4BA-HA36S/ASWF-A3', '5MT', '2WD', 658, 'HATCBACK', '890', '4', 'petrol', 2578454, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'ALTO WORKS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'ALTO WORKS', '4BA-HA36S/ASWF-A3', '5MT', '2WD', 658, 'HATCBACK', '890', '4', 'petrol', 2344049, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'ALTO WORKS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'ALTO WORKS', 'DBA-HA36S/ASWF-A', '5MT', '2WD', 658, 'HATCBACK', '890', '4', 'petrol', 2344049, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'ALTO WORKS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'ALTO WORKS', 'DBA-HA36S/ASWF-A2', '5MT', '2WD', 658, 'HATCBACK', '890', '4', 'petrol', 2344049, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'ALTO WORKS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'ALTO X', 'DBA-HA36S/ABXEJ-J2', 'CVT', '2WD', 658, 'HATCBACK', '970', '4', 'petrol', 1819237, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'ALTO X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'ALTO X', 'DBA-HA36S/ABXE', 'CVT', '2WD', 658, 'HATCBACK', '870', '4', 'petrol', 1760552, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'ALTO X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'BALENO XS', 'DBA-WB32S/BBSE', 'CVT', '2WD', 1242, 'HATCBACK', '1185', '5', 'petrol', 2397704, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'BALENO XS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'CARRY', 'EBD-DA16T/KWCJ-J3', '5MT', '4WD', 658, 'TRUCK', '1420', '2', 'petrol', 2053977, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'CARRY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'CARRY', 'EBD-DA16T/KWCJ-J4', '5MT', '4WD', 658, 'TRUCK', '1430', '2', 'diesel', 2087512, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'CARRY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'CARRY', 'EBD-DA16T/KWCJ-F5', '5MT', '4WD', 658, 'TRUCK', '1430', '2', 'petrol', 2323929, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'CARRY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'CARRY', '3BD-DA26T/KWCJ-F6', '5MT', '4WD', 658, 'TRUCK', '1440', '2', 'petrol', 2360816, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'CARRY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'CARRY', '3BD-DA16T/KWCJ-F6', 'CVT', '4WD', 658, 'TRUCK', '1440', '2', 'petrol', 2360816, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'CARRY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'CARRY FOR SPECIAL HEAVY DUTY DUMP', '3BD-DA16T/KWCJ-F7', '5MT', '4WD', 658, 'TRUCK', '1440', '2', 'petrol', 2709406, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'CARRY FOR SPECIAL HEAVY DUTY DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'CARRY KC', 'EBD-DA16T/KKCU-S3', '5MT', '4WD', 658, 'TRUCK', '1190', '2', 'petrol', 1542579, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'CARRY KC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'CARRY KC', 'EBD-DA16T/KKCU-S4', '5MT', '4WD', 658, 'TRUCK', '1190', '2', 'diesel', 1542579, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'CARRY KC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'CARRY KC', 'EBD-DA16T/KKCU-S4', '4AT', '4WD', 658, 'TRUCK', '1190', '2', 'petrol', 1542579, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'CARRY KC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'CARRY KC', '3BD-DA16T/KKCU-S5', '5MT', '4WD', 658, 'TRUCK', '1120', '2', 'petrol', 1733725, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'CARRY KC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'CARRY KC', '3BD-DA16T/KKCU-S6', 'CVT', '4WD', 658, 'TRUCK', '1230', '2', 'petrol', 1733725, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'CARRY KC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'CARRY KC', '3BD-DA16T/KKCU-S6', '5MT', '4WD', 658, 'TRUCK', '1230', '2', 'petrol', 1733725, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'CARRY KC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'CARRY KC', '3BD-DA16T/KKCU-SJ7', '5MT', '4WD', 658, 'TRUCK', '1230', '2', 'petrol', 2128424, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'CARRY KC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'CARRY PIXIS TRUCK XTRA', 'EBD-DA16T/KWCJ-J4', '5MT', '4WD', 658, 'TRUCK', '1280', '2', 'petrol', 2087512, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'CARRY PIXIS TRUCK XTRA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'ESCUDO', '5AA-YEH1S/MBSW-3', '6AGS', '4WD', 1460, 'SUV', '1595', '5', 'petrol', 4979847, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'ESCUDO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'ESCUDO', '4BA-YEAS/MBTL-2', '6AT', '4WD', 1371, 'SUV', '1495', '5', 'petrol', 4128075, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'ESCUDO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'ESCUDO', '4BA-YEA1S/MBTL-2', '6AT', '4WD', 1371, 'SUV', '1495', '5', 'petrol', 4128075, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'ESCUDO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'ESCUDO', 'CBA-YEA1S/MBTL', '6AT', '4WD', 1371, 'SUV', '1495', '5', 'petrol', 4015735, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'ESCUDO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'ESCUDO 1.4 TURBO', 'CBA-YEA1S/MBTL', '6AT', '4WD', 1371, 'SUV', '1495', '5', 'petrol', 4028456, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'ESCUDO 1.4 TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'EVERY', '5BD-DA17V/EVQE-H6', 'CVT', '2WD', 658, 'VAN', '1595', '4', NULL, 3060007, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'EVERY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'EVERY', 'HBD-DA17V/EVQD-H3', '4AT', '2WD', 658, 'VAN', '1595', '4', 'diesel', 2791732, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'EVERY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'EVERY', 'HBD-DA17V/EVQD-H3', '4AT', '2WD', 658, 'VAN', '1595', '4', 'petrol', 2791732, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'EVERY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'EVERY  PC', 'HBD-DA17V/EVBD-D2', '4AT', '2WD', 658, 'VAN', '1330', '4', 'petrol', 1765582, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'EVERY  PC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'EVERY  PC', 'HBD-DA17V/EVQN-H2', '5AGS', '2WD', 658, 'VAN', '1595', '4', 'petrol', 2682746, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'EVERY  PC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'EVERY  WAGON', 'ABA-DA17W/EHKD-R3', '4AT', '2WD', 658, 'WAGON', '1040', '4', 'petrol', 3227679, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'EVERY  WAGON'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'EVERY FOR WHEELCHAIR USER CAR', '5BD-DA17V/EVQD-H4', '4AT', '2WD', 658, 'VAN', '1595', '4', 'petrol', 2815206, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'EVERY FOR WHEELCHAIR USER CAR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'EVERY PC', 'HBD-DA17V/EVBD-3', '4AT', '2WD', 658, 'VAN', '1910', '4', 'petrol', 1765582, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'EVERY PC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'EVERY PC', 'HBD-DA17V/EVBD-3', '4AT', '2WD', 658, 'VAN', '1330', '4', 'diesel', 1765582, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'EVERY PC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'EVERY PC', '5BD-DA17V/EVBD-4', '4AT', '2WD', 658, 'VAN', '1350', '4', 'petrol', 1995628, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'EVERY PC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'EVERY PC', '5BD-DA17V/EVBD-J5', 'CVT', '2WD', 658, 'VAN', '1350', '4', 'petrol', 2176378, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'EVERY PC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'EVERY PC', '5BD-DA17V/EVBE-6', 'CVT', '2WD', 658, 'VAN', '1370', '4', NULL, 2489924, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'EVERY PC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'EVERY PC', '5BD-DA17V/EVQD-H5', 'CVT', '2WD', 658, 'VAN', '1595', '4', 'petrol', 2865508, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'EVERY PC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'EVERY PC', 'HBD-DA17V/EVQN-H2', '5AGS', '2WD', 658, 'VAN', '1595', '4', NULL, 2682746, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'EVERY PC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'EVERY WAGON', '3BA-DA17W/EHKD-R5', 'CVT', '2WD', 658, 'WAGON', '1595', '4', 'petrol', 3844749, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'EVERY WAGON'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'EVERY WAGON', '3BA-DA17W/EHKD-R4', 'CVT', '2WD', 658, 'WAGON', '900', '4', 'petrol', 2429059, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'EVERY WAGON'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'EVERY WAGON', '3BA-DA17W/EHKD-RQ3', '4AT', '2WD', 658, 'WAGON', '1595', '4', 'petrol', 3227679, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'EVERY WAGON'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'EVERY WAGON', 'ABA-DA17W/EHKD-R2', '4AT', '2WD', 658, 'WAGON', '1595', '4', 'petrol', 3177377, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'EVERY WAGON'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'EVERY WAGON PZ', '3BA-DA17W/EHKD-R5', '4AT', '4WD', 658, 'WAGON', '1040', '4', 'petrol', 3306484, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'EVERY WAGON PZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'EVERY WAGON PZ', '3BA-DA17W/EWDD-5', 'CVT', '2WD', 658, 'WAGON', '1200', '4', 'petrol', 2989753, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'EVERY WAGON PZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'EVERY WAGON PZ', '3BA-DA17W/EWDE-6', 'CVT', '2WD', 658, 'WAGON', '1220', '4', 'petrol', 3205546, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'EVERY WAGON PZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'EVERY WAGON PZ', '3BA-DA17W/EHKE-R6', 'CVT', '2WD', 658, 'WAGON', '1130', '4', 'petrol', 3640151, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'EVERY WAGON PZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'EVERY WAGON PZ', '3BA-DA17W/EWDD-4', 'CVT', '2WD', 657, 'WAGON', '1010', '4', 'petrol', 2382949, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'EVERY WAGON PZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'EVERY WAGON PZ TURBO SPECIAL', 'ABA-DA17W/EWDD-3', '4AT', '2WD', 658, 'WAGON', '1190', '4', 'petrol', 2632444, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'EVERY WAGON PZ TURBO SPECIAL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'EVERY WAGON PZ TURBO SPECIAL', '3BA-DA17W/EWDD-Q3', '4AT', '2WD', 658, 'WAGON', '1190', '4', 'petrol', 2647535, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'EVERY WAGON PZ TURBO SPECIAL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'EVERY WAGON PZ TURBO SPECIAL', 'ABA-DA17W/EWDD-2', '4AT', '2WD', 658, 'WAGON', '1190', '4', 'petrol', 2548609, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'EVERY WAGON PZ TURBO SPECIAL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'EVERY WAGON PZ TURBO SPECIAL (STANDARD ROOF)', '3BA-DA17W/EWDD-5', '4AT', '4WD', 658, 'WAGON', '1200', '4', 'petrol', 2989753, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'EVERY WAGON PZ TURBO SPECIAL (STANDARD ROOF)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'FRONX', '4AA-WDB3S/XBSK-ZN', '6AT', '2WD', 1460, 'SUV', '1345', '5', 'petrol', 4260536, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'FRONX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'HUSTLER HYBRID X', '5AA-MR92S/HBXB-2', 'CVT', '4WD', 657, 'HATCBACK', '1040', '4', 'petrol', 2578790, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'HUSTLER HYBRID X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'HUSTLER HYBRID X', '5AA-MR92S/HBXB-2', 'CVT', '2WD', 657, 'HATCBACK', '1040', '4', 'petrol', 2580299, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'HUSTLER HYBRID X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'HUSTLER HYBRID X', '5AA-MR92S/HBXB-3', 'CVT', '2WD', 657, 'HATCBACK', '1040', '4', 'petrol', 2803469, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'HUSTLER HYBRID X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'HUSTLER HYBRID X', '5AA-MR92S/HBXB-J', 'CVT', '2WD', 657, 'HATCBACK', '1040', '4', 'petrol', 2545255, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'HUSTLER HYBRID X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'HUSTLER HYBRID X', 'SAA-MR92S/HBXB-JM', 'CVT', '2WD', 658, 'HATCBACK', '1040', '4', 'petrol', 2858801, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'HUSTLER HYBRID X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'HUSTLER J', 'DAA-MR41S/HBJB-B2', 'CVT', '2WD', 658, 'HATCBACK', '1020', '4', 'petrol', 2305485, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'HUSTLER J'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'HUSTLER TOUGH WILD TOUGH WILD', '5AA-MR92S/HBFB-3', 'CVT', '2WD', 657, 'HATCBACK', '1050', '4', 'petrol', 2951021, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'HUSTLER TOUGH WILD TOUGH WILD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'HUSTLER X', 'DAA-MR41S/HBXB-2', 'CVT', '2WD', 658, 'HATCBACK', '1020', '4', 'petrol', 2275783, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'HUSTLER X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'IGNIS HYBRID MF', '5AA-FF21S/PBFB-J4', 'CVT', '4WD', 1242, 'SUV', '1155', '5', 'petrol', 3131771, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'IGNIS HYBRID MF'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'IGNIS HYBRID MF', '5AA-FF21S/PBFB-J3', 'CVT', '2WD', 1242, 'SUV', '1155', '5', 'petrol', 3113327, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'IGNIS HYBRID MF'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'IGNIS HYBRID MF', '5AA-FF21S/PBFB-JM2', 'CVT', '2WD', 1242, 'SUV', '1155', '5', 'petrol', 2887305, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'IGNIS HYBRID MF'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'IGNIS HYBRID MZ', 'DAA-FF21S/PBZB-J', 'CVT', '2WD', 1242, 'SUV', '1155', '5', 'petrol', 2699513, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'IGNIS HYBRID MZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'JIMNY SIERRA', 'ABA-JB43W/GWZJ-Y9', '5MT', '2WD', 1328, 'SUV', '1280', '4', 'petrol', 2598733, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'JIMNY SIERRA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'JIMNY SIERRA JC', '3BA-JB74W/GJCU-J2', '5MT', '2WD', 1460, 'SUV', '1290', '4', 'petrol', 3283010, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'JIMNY SIERRA JC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'JIMNY SIERRA JC', '3BA-JB74W/GJCU-J3', '5MT', '4WD', 1460, 'SUV', '1300', '4', 'petrol', 3329120, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'JIMNY SIERRA JC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'JIMNY SIERRA JC', '3BA-JB74W/GJCU-4', '5MT', '4X4', 1460, 'SUV', '1300', '4', 'petrol', 3495115, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'JIMNY SIERRA JC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'JIMNY SIERRA JC', '3BA-JB74W/GJCR-J', '4AT', '4WD', 1460, 'SUV', '1310', '4', 'petrol', 3135459, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'JIMNY SIERRA JC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'JIMNY SIERRA JC', '3BA-JB84W/GJCR-J', '6AT', '4WD', 1460, 'SUV', '1310', '4', 'petrol', 3135459, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'JIMNY SIERRA JC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'JIMNY XC', '3BA-JB64W/JXCU-J3', '5MT', '4WD', 658, 'SUV', '1260', '4', 'petrol', 3024796, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'JIMNY XC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'JIMNY XC', '3BA-JB64W/JXCU-J3', '4AT', '4WD', 658, 'SUV', '1260', '4', 'petrol', 3024796, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'JIMNY XC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'JIMNY XC', '3BA-JB64W/JXCU-4', '5MT', '4WD', 658, 'SUV', '1260', '4', 'petrol', 3190791, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'JIMNY XC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'JIMNY XC', '3BA-JB64W/JXCR-J', '4AT', '4WD', 658, 'SUV', '1040', '4', 'petrol', 2858801, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'JIMNY XC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'JIMNY XC', '3BA-JB64W/JXCR-J', '4AT', '2WD', 658, 'SUV', '1260', '4', 'petrol', 3227679, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'JIMNY XC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'JIMNY XC', '3BA-JB64W/JXCU-J2', 'CVT', '2WD', 657, 'SUV', '1040', '4', 'petrol', 2545255, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'JIMNY XC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'JIMNY XC', 'ABA-JB23W/JXCU-DT', '5MT', '2WD', 658, 'SUV', '1210', '4', 'petrol', 2358203, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'JIMNY XC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'JIMNY XC', '3BA-JB64W/JXCR-J', '4AT', '4WD', 658, 'SUV', '1260', '4', 'petrol', 2858801, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'JIMNY XC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'LANDY 2.0G', 'DAA-SGC27/LGBE-Q', 'CVT', '2WD', 1997, 'MINIVAN', '2130', '8', 'petrol', 4797854, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'LANDY 2.0G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'LANDY 2.0G', '5AA-SGC27/LGBB-Q2', 'CVT', '2WD', 1997, 'MINIVAN', '2140', '8', 'petrol', 5009190, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'LANDY 2.0G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'LANDY HYBRID G', '6AA-ZWR90C/LBGV', 'CVT', '4WD', 1797, 'MINIVAN', '2035', '7', 'petrol', 6026921, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'LANDY HYBRID G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'LANDY HYBRID G', '6AA-ZWR90C/LBGV', 'CVT', '2WD', 1797, 'MINIVAN', '2035', '7', 'petrol', 6026921, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'LANDY HYBRID G'
);