INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 PREMIUM FREEZER (MWB)', NULL, 'AUT', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 13135707, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 PREMIUM FREEZER (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 PREMIUM FREEZER (SWB)', NULL, 'MAN', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 11629879, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 PREMIUM FREEZER (SWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 PREMIUM FREEZER (SWB)', NULL, 'AUT', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 12603885, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 PREMIUM FREEZER (SWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 PREMIUM PLUS FREEZER (MWB)', NULL, 'MAN', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 12473306, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 PREMIUM PLUS FREEZER (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 PREMIUM PLUS FREEZER (MWB)', NULL, 'AUT', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 13446435, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 PREMIUM PLUS FREEZER (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 STANDARD CAB (LWB)', NULL, 'MAN', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 7851419, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 STANDARD CAB (LWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 STANDARD CAB (LWB)', NULL, 'AUT', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 8824548, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 STANDARD CAB (LWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 STANDARD CAB (MWB)', NULL, 'MAN', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 7808721, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 STANDARD CAB (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 STANDARD CAB (MWB)', NULL, 'AUT', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 8781850, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 STANDARD CAB (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 STANDARD CAB (SWB)', NULL, 'MAN', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 7675217, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 STANDARD CAB (SWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 STANDARD CAB (SWB)', NULL, 'AUT', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 8648346, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 STANDARD CAB (SWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 STEEL TRAY (MWB)', NULL, 'MAN', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 9269365, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 STEEL TRAY (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 STEEL TRAY (MWB)', NULL, 'AUT', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 10242494, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 STEEL TRAY (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 STEEL TRAY (SWB)', NULL, 'MAN', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 9024438, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 STEEL TRAY (SWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 STEEL TRAY (SWB)', NULL, 'AUT', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 9997567, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 STEEL TRAY (SWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 SUPER CAB (LWB)', NULL, 'MAN', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 8007880, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 SUPER CAB (LWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 SUPER CAB (LWB)', NULL, 'AUT', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 8981009, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 SUPER CAB (LWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 SUPER CAB (MWB)', NULL, 'MAN', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 7963427, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 SUPER CAB (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 SUPER CAB (MWB)', NULL, 'AUT', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 8936556, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 SUPER CAB (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX6 (MWB)', NULL, 'MAN', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 10164994, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX6 (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX6 (MWB)', NULL, 'AUT', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 11138124, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX6 (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX6 (SWB)', NULL, 'MAN', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 9770625, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX6 (SWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX6 (SWB)', NULL, 'AUT', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 10743608, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX6 (SWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX6 CHILLER (MWB)', NULL, 'MAN', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 11005351, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX6 CHILLER (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX6 CHILLER (SWB)', NULL, 'MAN', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 10436681, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX6 CHILLER (SWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX6 CHILLER (SWB)', NULL, 'AUT', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 11409810, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX6 CHILLER (SWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX6 FREEZER (MWB)', NULL, 'MAN', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 11671699, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX6 FREEZER (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX6 FREEZER (SWB)', NULL, 'MAN', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 11042054, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX6 FREEZER (SWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX6 FREEZER (SWB)', NULL, 'AUT', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 12015183, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX6 FREEZER (SWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX6 PREMIUM FREEZER (MWB)', NULL, 'MAN', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 12162578, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX6 PREMIUM FREEZER (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX6 PREMIUM FREEZER (SWB)', NULL, 'MAN', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 11630756, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX6 PREMIUM FREEZER (SWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX6 PREMIUM FREEZER (SWB)', NULL, 'AUT', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 12603885, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX6 PREMIUM FREEZER (SWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX6 PREMIUM PLUS FREEZER (MWB)', NULL, 'MAN', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 12473306, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX6 PREMIUM PLUS FREEZER (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX6 STANDARD CAB (LWB)', NULL, 'MAN', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 7851419, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX6 STANDARD CAB (LWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX6 STANDARD CAB (LWB)', NULL, 'AUT', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 8269038, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX6 STANDARD CAB (LWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX6 STANDARD CAB (MWB)', NULL, 'MAN', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 7808721, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX6 STANDARD CAB (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX6 STANDARD CAB (MWB)', NULL, 'AUT', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 8781850, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX6 STANDARD CAB (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX6 STANDARD CAB (SWB)', NULL, 'MAN', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 7675217, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX6 STANDARD CAB (SWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX6 STANDARD CAB (SWB)', NULL, 'AUT', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 8648346, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX6 STANDARD CAB (SWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX6 STEEL TRAY (MWB)', NULL, 'MAN', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 9269365, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX6 STEEL TRAY (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX6 STEEL TRAY (MWB)', NULL, 'AUT', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 10242494, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX6 STEEL TRAY (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX6 STEEL TRAY (SWB)', NULL, 'MAN', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 9024438, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX6 STEEL TRAY (SWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX6 STEEL TRAY (SWB)', NULL, 'AUT', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 9997567, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX6 STEEL TRAY (SWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX6 SUPER CAB (LWB)', NULL, 'MAN', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 8007880, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX6 SUPER CAB (LWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX6 SUPER CAB (LWB)', NULL, 'AUT', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 8423890, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX6 SUPER CAB (LWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX6 SUPER CAB (MWB)', NULL, 'MAN', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 7963427, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX6 SUPER CAB (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX6 SUPER CAB (MWB)', NULL, 'AUT', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 8936556, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX6 SUPER CAB (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX8 SUPER CAB (ELWB)', NULL, 'AUT', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 8996362, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX8 SUPER CAB (ELWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX8 SUPER CAB (ELWB)', NULL, 'MAN', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 8675398, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX8 SUPER CAB (ELWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX8 SUPER CAB (LWB)', NULL, 'AUT', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 8838731, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX8 SUPER CAB (LWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX8 SUPER CAB (LWB)', NULL, 'MAN', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 8559295, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX8 SUPER CAB (LWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX8 SUPER CAB FLAT DECK (ELWB)', NULL, 'AUT', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 10447209, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX8 SUPER CAB FLAT DECK (ELWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX8 SUPER CAB FLAT DECK (ELWB)', NULL, 'MAN', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 10366785, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX8 SUPER CAB FLAT DECK (ELWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX8 SUPER CAB FLAT DECK (LWB)', NULL, 'AUT', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 10269692, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX8 SUPER CAB FLAT DECK (LWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX8 SUPER CAB FLAT DECK (LWB)', NULL, 'MAN', NULL, 3900, 'S/CABIN', NULL, NULL, 'diesel', 10051816, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX8 SUPER CAB FLAT DECK (LWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'SONATA N LINE', 'SONATA N LINE', 'AUT', NULL, 4500, 'SEDAN', NULL, NULL, 'petrol', 8791793, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'SONATA N LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ 6 IONIQ 6 2WD (53.0KWH)', 'IONIQ 6 IONIQ 6 2WD (53.0KWH)', 'AUT', NULL, NULL, 'SEDAN', NULL, NULL, 'electric', 9723979, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ 6 IONIQ 6 2WD (53.0KWH)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ 5 IONIQ 5 2WD (63KWH)', 'IONIQ 5 IONIQ 5 2WD (63KWH)', 'AUT', NULL, NULL, 'STATION WAGON', NULL, NULL, 'electric', 10206522, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ 5 IONIQ 5 2WD (63KWH)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ 6 2WD (77.4KWH)', 'IONIQ 6 2WD (77.4KWH)', 'AUT', NULL, NULL, 'SEDAN', NULL, NULL, 'electric', 10601331, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ 6 2WD (77.4KWH)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ 6 DYNAMIQ 2WD (77.4KWH)', 'IONIQ 6 DYNAMIQ 2WD (77.4KWH)', 'AUT', NULL, NULL, 'SEDAN', NULL, NULL, 'electric', 11478682, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ 6 DYNAMIQ 2WD (77.4KWH)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ 6 DYNAMIQ AWD (77.4KWH)', 'IONIQ 6 DYNAMIQ AWD (77.4KWH)', 'AUT', NULL, NULL, 'SEDAN', NULL, NULL, 'electric', 12136696, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ 6 DYNAMIQ AWD (77.4KWH)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ 6 EPIQ 2WD (77.4KWH)', 'IONIQ 6 EPIQ 2WD (77.4KWH)', 'AUT', NULL, NULL, 'SEDAN', NULL, NULL, 'electric', 11990471, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ 6 EPIQ 2WD (77.4KWH)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ 6 EPIQ AWD (77.4KWH)', 'IONIQ 6 EPIQ AWD (77.4KWH)', 'AUT', NULL, NULL, 'SEDAN', NULL, NULL, 'electric', 12648484, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ 6 EPIQ AWD (77.4KWH)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ 6 EPIQ DSM 2WD (77.4KWH)', 'IONIQ 6 EPIQ DSM 2WD (77.4KWH)', 'AUT', NULL, NULL, 'SEDAN', NULL, NULL, 'electric', 12429146, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ 6 EPIQ DSM 2WD (77.4KWH)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ 6 EPIQ DSM AWD (77.4KWH)', 'IONIQ 6 EPIQ DSM AWD (77.4KWH)', 'AUT', NULL, NULL, 'SEDAN', NULL, NULL, 'electric', 13087160, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ 6 EPIQ DSM AWD (77.4KWH)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ 5 2WD (84KWH)', 'IONIQ 5 2WD (84KWH)', 'AUT', NULL, NULL, 'STATION WAGON', NULL, NULL, 'electric', 11083874, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ 5 2WD (84KWH)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ 5 DYNAMIQ 2WD (84KWH)', 'IONIQ 5 DYNAMIQ 2WD (84KWH)', 'AUT', NULL, NULL, 'STATION WAGON', NULL, NULL, 'electric', 11815000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ 5 DYNAMIQ 2WD (84KWH)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ 5 DYNAMIQ AWD (84KWH)', 'IONIQ 5 DYNAMIQ AWD (84KWH)', 'AUT', NULL, NULL, 'STATION WAGON', NULL, NULL, 'electric', 12473014, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ 5 DYNAMIQ AWD (84KWH)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ 5 DYNAMIQ N LINE 2WD (84KWH)', 'IONIQ 5 DYNAMIQ N LINE 2WD (84KWH)', 'AUT', NULL, NULL, 'STATION WAGON', NULL, NULL, 'electric', 12180563, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ 5 DYNAMIQ N LINE 2WD (84KWH)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ 5 DYNAMIQ N LINE AWD (84KWH)', 'IONIQ 5 DYNAMIQ N LINE AWD (84KWH)', 'AUT', NULL, NULL, NULL, NULL, NULL, 'electric', 12838577, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ 5 DYNAMIQ N LINE AWD (84KWH)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ 5 EPIQ 2WD (84KWH)', 'IONIQ 5 EPIQ 2WD (84KWH)', 'AUT', NULL, NULL, 'STATION WAGON', NULL, NULL, 'electric', 12326789, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ 5 EPIQ 2WD (84KWH)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ 5 EPIQ AWD (84KWH)', 'IONIQ 5 EPIQ AWD (84KWH)', 'AUT', NULL, NULL, 'STATION WAGON', NULL, NULL, 'electric', 12984802, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ 5 EPIQ AWD (84KWH)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ 5 EPIQ DSM 2WD (84KWH)', 'IONIQ 5 EPIQ DSM 2WD (84KWH)', 'AUT', NULL, NULL, 'STATION WAGON', NULL, NULL, 'electric', 12765464, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ 5 EPIQ DSM 2WD (84KWH)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ 5 EPIQ DSM AWD (84KWH)', 'IONIQ 5 EPIQ DSM AWD (84KWH)', 'AUT', NULL, NULL, 'STATION WAGON', NULL, NULL, 'electric', 13423478, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ 5 EPIQ DSM AWD (84KWH)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ 5 EPIQ N LINE 2WD (84KWH)', 'IONIQ 5 EPIQ N LINE 2WD (84KWH)', 'AUT', NULL, NULL, 'STATION WAGON', NULL, NULL, 'electric', 12692352, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ 5 EPIQ N LINE 2WD (84KWH)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ 5 EPIQ N LINE AWD (84KWH)', 'IONIQ 5 EPIQ N LINE AWD (84KWH)', 'AUT', NULL, NULL, 'STATION WAGON', NULL, NULL, 'electric', 13350365, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ 5 EPIQ N LINE AWD (84KWH)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ 5 EPIQ N LINE DSM 2WD (84KWH)', 'IONIQ 5 EPIQ N LINE DSM 2WD (84KWH)', 'AUT', NULL, NULL, 'STATION WAGON', NULL, NULL, 'electric', 13131027, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ 5 EPIQ N LINE DSM 2WD (84KWH)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ 5 EPIQ N LINE DSM AWD (84KWH)', 'IONIQ 5 EPIQ N LINE DSM AWD (84KWH)', 'AUT', NULL, NULL, 'STATION WAGON', NULL, NULL, 'electric', 13789041, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ 5 EPIQ N LINE DSM AWD (84KWH)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ 5 N (84.0KWH)', 'IONIQ 5 N (84.0KWH)', 'AUT', NULL, NULL, 'STATION WAGON', NULL, NULL, 'electric', 16140782, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ 5 N (84.0KWH)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ 5 N SRF (84.0KWH)', 'IONIQ 5 N SRF (84.0KWH)', 'AUT', NULL, NULL, 'STATION WAGON', NULL, NULL, 'electric', 16725683, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ 5 N SRF (84.0KWH)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'INSTER  2WD (42KWH)', 'INSTER  2WD (42KWH)', 'AUT', NULL, NULL, 'SUV', NULL, NULL, 'electric', 5702785, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'INSTER  2WD (42KWH)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'INSTER  2WD (49KWH)', 'INSTER  2WD (49KWH)', 'AUT', NULL, NULL, 'SUV', NULL, NULL, 'electric', 6214573, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'INSTER  2WD (49KWH)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'INSTER  CROSS ROOF BASKET 2WD (49KWH)', 'INSTER  CROSS ROOF BASKET 2WD (49KWH)', 'AUT', NULL, NULL, 'SUV', NULL, NULL, 'electric', 6580136, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'INSTER  CROSS ROOF BASKET 2WD (49KWH)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'INSTER  CROSS SRF 2WD (49KWH)', 'INSTER  CROSS SRF 2WD (49KWH)', 'AUT', NULL, NULL, 'SUV', NULL, NULL, 'electric', 6580136, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'INSTER  CROSS SRF 2WD (49KWH)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ  ELECTRIC ELITE', 'IONIQ  ELECTRIC ELITE', 'AUT', NULL, NULL, 'HATCHBACK', NULL, NULL, 'electric', 7264958, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ  ELECTRIC ELITE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ  ELECTRIC PREMIUM', 'IONIQ  ELECTRIC PREMIUM', 'AUT', NULL, NULL, 'HATCHBACK', NULL, NULL, 'electric', 7935157, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ  ELECTRIC PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'KONA ELECTRIC EXT RANGE', 'KONA ELECTRIC EXT RANGE', 'AUT', NULL, NULL, 'SUV', NULL, NULL, 'electric', 8481065, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'KONA ELECTRIC EXT RANGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'KONA ELECTRIC N LINE', 'KONA ELECTRIC N LINE', 'AUT', NULL, NULL, 'SUV', NULL, NULL, 'electric', 9065966, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'KONA ELECTRIC N LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'KONA ELECTRIC PREMIUM EXT RANGE', 'KONA ELECTRIC PREMIUM EXT RANGE', 'AUT', NULL, NULL, 'SUV', NULL, NULL, 'electric', 9943317, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'KONA ELECTRIC PREMIUM EXT RANGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'KONA ELECTRIC PREMIUM N LINE', 'KONA ELECTRIC PREMIUM N LINE', 'AUT', NULL, NULL, 'SUV', NULL, NULL, 'electric', 10381993, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'KONA ELECTRIC PREMIUM N LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'KONA ELECTRIC STD RANGE', 'KONA ELECTRIC STD RANGE', 'AUT', NULL, NULL, 'SUV', NULL, NULL, 'electric', 7896164, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'KONA ELECTRIC STD RANGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ 5 LOUNGE', 'ZAA-NE2LRG', 'AT', '2WD', NULL, 'HATCHBACK', NULL, NULL, 'electric', 9623136, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ 5 LOUNGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ 5 LOUNGE', 'KMHKP81AUNU14', 'AT', '2WD', NULL, 'HATCHBACK', NULL, NULL, 'electric', 7750851, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ 5 LOUNGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ 5 LOUNGE AWD', 'ZAA-NE4LRG', 'AT', '4WD', NULL, 'HATCHBACK', NULL, NULL, 'electric', 9453482, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ 5 LOUNGE AWD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ 5 LOUNGE AWD LIMITED EDITION', 'ZAA-NE4LRG', 'AT', '4WD', NULL, 'HATCHBACK', NULL, NULL, 'electric', 8882243, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ 5 LOUNGE AWD LIMITED EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ 5 LOUNGE AWD LIMITED EDITION', NULL, 'AT', '2WD', NULL, 'HATCHBACK', NULL, NULL, 'electric', 8248403, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ 5 LOUNGE AWD LIMITED EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IONIQ 5 VOYAGE', 'ZAA-NE2LRG', 'AT', '2WD', NULL, 'HATCHBACK', NULL, NULL, 'electric', 7194339, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IONIQ 5 VOYAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'KONA LOUNGE TWO-TONE', 'ZAA-SX2LRG', 'AT', '2WD', NULL, 'HATCHBACK', NULL, NULL, 'electric', 7750851, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'KONA LOUNGE TWO-TONE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'D-MAX BLADE', NULL, '6AT', '2WD', 3000, 'DUAL CAB', NULL, NULL, 'diesel', 11632736, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'D-MAX BLADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'D-MAX EX (4WD)', NULL, '6MT', '4WD', 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 7672366, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'D-MAX EX (4WD)'
);