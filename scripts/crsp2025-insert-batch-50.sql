INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PIXIS MEGA G TURBO', '3BA-LA700A-GBVZ', 'CVT', '2WD', 658, 'HATCHBACK', '1240', '4', 'petrol', 2598910, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PIXIS MEGA G TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PIXIS MEGA G TURBO SA II', 'DBA-LA700A-GBVZ', 'CVT', '2WD', 658, 'HATCHBACK', '1240', '4', 'petrol', 2607143, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PIXIS MEGA G TURBO SA II'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PIXIS MEGA TURBO SA III', '3BA-LA700A-GBVZ', 'CVT', '2WD', 658, 'HATCHBACK', '1240', '5', 'petrol', 2858801, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PIXIS MEGA TURBO SA III'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PIXIS TRUCK EXTRA', 'EBD-S510U-TMNF', '5MT', '4WD', 658, 'TRUCK', '1270', '2', 'diesel', 1827621, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PIXIS TRUCK EXTRA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PIXIS TRUCK EXTRA', 'EBD-S510U-TMNF', '5MT', '4WD', 658, 'TRUCK', '1270', '2', 'petrol', 1827621, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PIXIS TRUCK EXTRA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PIXIS TRUCK EXTRA', '3BD-S510U-TBNF', 'CVT', '4WD', 658, 'TRUCK', '1320', '2', 'petrol', 2250153, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PIXIS TRUCK EXTRA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PIXIS TRUCK EXTRA', '3BD-S510U-TMNF', '5MT', '4WD', 658, 'TRUCK', '1270', '2', 'petrol', 2038049, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PIXIS TRUCK EXTRA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PIXIS VAN', '3BD-S321M-ZQGZ', 'CVT', '2WD', 658, 'VAN', '1270', '4', 'petrol', 2129430, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PIXIS VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PIXIS VAN', 'EBD-S321M-ZQGZ', '4AT', '2WD', 658, 'VAN', '1270', '4', 'diesel', 2112662, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PIXIS VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PIXIS VAN', '3BDS700M-ZBGZ', 'CVT', '2WD', 658, 'VAN', '1410', '4', 'petrol', 2434592, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PIXIS VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PIXIS VAN', 'EBD-NCP160V-FXXRK', '4AT', '2WD', 658, 'VAN', '1270', '4', 'petrol', 2112662, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PIXIS VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PORTE F', '5BA-NSP141-VQQKFA', 'CVT', '2WD', 1496, 'VAN', '1495', '5', 'petrol', 3370200, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PORTE F'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PORTE F', 'DBA-NSP141-VQQKFA', 'CVT', '2WD', 1496, 'VAN', '1495', '5', 'petrol', 3439396, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PORTE F'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PORTE G', '5BA-NSP141-AEXGB', 'CVT', '2WD', 1496, 'VAN', '1445', '5', 'petrol', 3070067, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PORTE G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PORTE G', 'DBA-NSP141-AEXGB', 'CVT', '2WD', 1496, 'VAN', '1445', '5', 'petrol', 3070067, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PORTE G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PRADO TX-L - E4', 'GDJ150R-GKFEY', '6MT', '4WD', 2800, 'S/WAGON', NULL, NULL, 'diesel', 9095659, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PRADO TX-L - E4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PREMIO 1.5F EX', '3BA-NZT260-AEXEK(X)', 'CVT', '2WD', 1496, 'SEDAN', '1475', '5', 'petrol', 3580552, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PREMIO 1.5F EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PREMIO 2.0G', 'DBA-ZRT261-AEXGP', 'CVT', '2WD', 1986, 'SEDAN', '1545', '5', 'petrol', 4344220, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PREMIO 2.0G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PREMIO 2.0G EEX', 'DBA-ZRT261-AEXGP(X)', 'CVT', '2WD', 1986, 'SEDAN', '1545', '5', 'petrol', 4344220, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PREMIO 2.0G EEX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PREMIO 2.0G EX PACKAGE', 'DBA-ZRT261-AEXGP(X)', 'CVT', '2WD', 1986, 'SEDAN', '1545', '5', 'petrol', 4357981, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PREMIO 2.0G EX PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PRIUS', '6AA-ZVW51-AHXHB(T)', 'CVT', '2WD', 1797, 'HATCHBACK', '1655', '5', 'petrol', 6011726, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PRIUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PRIUS A PHV', 'DLA-ZVW52-AHXHB', 'CVT', '2WD', 1797, 'HATCHBACK', '1770', '5', 'petrol', 6850758, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PRIUS A PHV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PRIUS A PREMIUM', 'DAA-ZVW51-AHXHB(T)', 'CVT', '2WD', 1797, 'HATCHBACK', '1665', '4', 'petrol', 5311348, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PRIUS A PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PRIUS A PRMIUM TOURINF SELECTION', '6A-ZVW51-AHZHB(T)', 'CVT', '2WD', 1797, 'HATCHBACK', '1655', '5', 'petrol', 5333418, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PRIUS A PRMIUM TOURINF SELECTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PRIUS A S', 'DAA-ZVW41W-VTPBXE', 'CVT', '2WD', 1797, 'HATCHBACK', '1795', '5', 'petrol', 4879632, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PRIUS A S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PRIUS G', 'DAA-ZVW41W-AXXGB(T)', 'CVT', '2WD', 1787, 'HATCHBACK', '1745', '5', 'petrol', 5271177, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PRIUS G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PRIUS PHEV A PREMIUM', '6LA-ZVW52-AHXHB', 'CVT', '2WD', 1797, 'HATCHBACK', '1805', '5', 'petrol', 7003783, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PRIUS PHEV A PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PRIUS PHV', 'DLA-ZVW52-AHXHB(N)', 'CVT', '2WD', 1797, 'HATCHBACK', '1805', '5', 'petrol', 6898989, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PRIUS PHV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PRIUS PHV A PREMIUM', 'DLA-ZVW52-AHXHB', 'CVT', '2WD', 1797, 'HATCHBACK', '1750', '5', 'petrol', 6829125, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PRIUS PHV A PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PRIUS PHV A PREMIUM NAVI PACKAGE', '6LA-ZVW52-AHXHB(N)', 'CVT', '2WD', 1797, 'HATCHBACK', '1805', '5', 'petrol', 6973615, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PRIUS PHV A PREMIUM NAVI PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PRIUS PHV S NAVI PACKAGE', 'DLA-ZVW52-VTQJXN', 'CVT', '2WD', 1797, 'HATCHBACK', '1760', '4', 'petrol', 6219998, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PRIUS PHV S NAVI PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PRIUS PHV S NAVI', 'DLA-ZVW52-VTQJXN', 'CVT', '2WD', 1797, 'HATCHBACK', '1760', '4', 'petrol', 6200357, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PRIUS PHV S NAVI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PRIUS S', 'DAA-ZVW51-VTUQXE', 'CVT', '2WD', 1797, 'HATCHBACK', '1715', '5', 'petrol', 5747993, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PRIUS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PRIUS S', 'DAA-ZVW50-VTUQXE', 'CVT', '2WD', 1797, 'HATCHBACK', '1725', '5', 'petrol', 5608266, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PRIUS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PRIUS S', '6AA-ZVW51-VTUQXE', 'CVT', '2WD', 1797, 'HATCHBACK', '1715', '5', 'petrol', 5934877, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PRIUS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PRIUS S  SAFTEY PACKAGE', 'DLA-ZVW52-VTQJXS', 'CVT', '2WD', 1797, 'HATCHBACK', '1815', '5', 'petrol', 5596040, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PRIUS S  SAFTEY PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PRIUS VAN CRUISE TURBO', '3BD-S321M-ZQGZ', '4AT', '2WD', 658, 'VAN', '1270', '4', 'petrol', 2342373, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PRIUS VAN CRUISE TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PRIUS Z (PLUG-IN-HYBRID)', '6LA-MXWH61-AHXHB', 'CVT', '2WD', 1986, 'HATCHBACK', '1845', '5', 'petrol', 8034265, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PRIUS Z (PLUG-IN-HYBRID)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PRIUS Z HYRID', '6AA-MXWH60-AHXHB', 'CVT', '2WD', 1986, 'HATCHBACK', '1695', '5', 'petrol', 6462344, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PRIUS Z HYRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PROBOX F HYBRID', '6AE-NHP160V-EXXRB', 'CVT', '2WD', 1496, 'VAN', '1635', '5', 'petrol', 3376906, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PROBOX F HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PROBOX F HYBRID', '6AE-NHP160V-EXXRB', 'CVT', '2WD', 1496, 'WAGON', '1635', '5', 'petrol', 3356786, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PROBOX F HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PROBOX GL', 'DBE-NCP160V-EXXGK', 'CVT', '2WD', 1496, 'WAGON', '1615', '5', 'diesel', 2573759, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PROBOX GL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PROBOX GL', 'DBE-NCP160V-EXXGK', 'CVT', '2WD', 1496, 'VAN', '1615', '5', 'petrol', 2583820, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PROBOX GL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PROBOX GL', '5BE-NCP160V-EXXGK', 'CVT', '2WD', 1496, 'VAN', '1615', '5', 'petrol', 2573759, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PROBOX GL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'RAIZE Z', '5BA-A200A-GBSV', 'CVT', '2WD', 996, 'SUV', '1255', '5', 'petrol', 3140032, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'RAIZE Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'RAIZE Z HYBRID', '5AA-A202A-GBSH', 'CVT', '2WD', 1196, 'SUV', '1345', '5', 'petrol', 3903395, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'RAIZE Z HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'RAV4 G', '6BA-MXAA54-ANXGB', 'CVT', '4WD', 1986, 'SUV', '1895', '5', 'petrol', 5414396, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'RAV4 G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'RAV4 G Z PACKAGE', '6BA-MXA54-ANXGB(A)', 'CVT', '4WD', 1986, 'SUV', '1895', '5', 'petrol', 5620969, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'RAV4 G Z PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'RAV4 G Z PACKAGE HYBRID', '6BA-MXAA54-ANXGB(A)', 'CVT', '4WD', 1986, 'SUV', '1895', '5', 'petrol', 6741796, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'RAV4 G Z PACKAGE HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'RAV4 PHEV Z', '6LA-AXAP54-ANXGB', 'CVT', '4WD', 2487, 'SUV', '2195', '5', 'petrol', 9838482, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'RAV4 PHEV Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'RAV4 PHV BLACK TONE', '6LA-AXAP54-ANXGB', 'CVT', '4WD', 2487, 'SUV', '2195', '5', 'petrol', 9414063, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'RAV4 PHV BLACK TONE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'RAV4 Z (PLUG-IN-HYBRID)', '6LA-AXAP54-ANXGB', 'CVT', '4WD', 2487, 'SUV', '2195', '5', 'petrol', 9838482, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'RAV4 Z (PLUG-IN-HYBRID)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'REGIUSACE DX', 'CBF-TRH200V-SRTDK-G', '6AT', '2WD', 1998, 'VAN', '3105', '3', 'petrol', 3825009, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'REGIUSACE DX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'REGIUSACE MODERATE TEMPERATURE REFRIGERATING VAN', 'CBF-TRH200V-VTBPTK', '6AT', '2WD', 1998, 'VAN', '2985', '3', 'petrol', 5538403, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'REGIUSACE MODERATE TEMPERATURE REFRIGERATING VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'REGIUSACE MODERATING TEMP VAN', 'CBF-TRH200V-VTPTK', '5MT', '2WD', 1998, 'VAN', '2985', '3', 'diesel', 5538403, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'REGIUSACE MODERATING TEMP VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'REGIUSACE VAN', 'CBF-TRH200K-VTASTL', '6AT', '2WD', 1998, 'VAN', '3185', '6', 'diesel', 4460065, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'REGIUSACE VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'REGIUSACE VAN DX', 'CBF-TRH200V-SRTDK-G', '6AT', '2WD', 1998, 'VAN', '3105', '6', 'diesel', 4055557, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'REGIUSACE VAN DX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'REGIUSACE VAN DX GL', 'CBF-TRH200V-SRTDK-G', '6AT', '2WD', 1998, 'VAN', '2100', '5', 'petrol', 3889632, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'REGIUSACE VAN DX GL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ROOMY CUSTOM G-T', '5BA-M900A-GBVJ', 'CVT', '2WD', 996, 'VAN', '1385', '5', 'petrol', 3447329, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ROOMY CUSTOM G-T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ROOMY CUSTOM G-T', '4BA-M900A-GBVJ', 'CVT', '2WD', 996, 'VAN', '1385', '5', 'petrol', 3447329, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ROOMY CUSTOM G-T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ROOMY CUSTOM G-T', 'DBA-M900A-AGBVJ', 'CVT', '2WD', 996, 'VAN', '1375', '5', 'petrol', 3061290, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ROOMY CUSTOM G-T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ROOMY G', '5BA-M900A-VTPBEG', 'CVT', '2WD', 996, 'VAN', '1455', '5', 'petrol', 3485893, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ROOMY G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ROOMY G-T', 'DBA-M900A-AGBVJ', 'CVT', '2WD', 996, 'VAN', '1375', '5', 'petrol', 3051623, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ROOMY G-T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ROOMY WELCAB G', '5BA-M900A-VTPBEG', 'CVT', '2WD', 996, 'VAN', '1455', '5', 'petrol', 3500983, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ROOMY WELCAB G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ROOMY X S', 'DBA-M900A-VTPBAM', 'CVT', '2WD', 996, 'VAN', '1445', '5', 'petrol', 3202528, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ROOMY X S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'RUMION  GLX', 'K15BR-HMPRKN', '4AT', '2WD', 1500, 'HATCHBACK', NULL, NULL, 'petrol', 3369074, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'RUMION  GLX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'RUSH DUAL VVT-i URBAN', 'F800RE-GQGF', '4AT', '2WD', 1500, 'S/WAGON', NULL, NULL, 'petrol', 3276000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'RUSH DUAL VVT-i URBAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'SAI G A PACKAGE', 'DAA-AZK10-BEXSB(A)', '6AT', 'AWD', 2362, 'SEDAN', '1865', '5', 'petrol', 7040305, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'SAI G A PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'SIENTA', '6AA-NHP170G-MWXUB', 'CVT', '2WD', 1496, 'VAN', '1765', '5', 'petrol', 4325928, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'SIENTA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'SIENTA G', 'DBA-NSP172G-MNXQB', 'CVT', '2WD', 1496, 'VAN', '1635', '5', 'petrol', 3994816, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'SIENTA G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'SIENTA G CUERO', '6AA-NHP170G-MWXUS', 'CVT', '2WD', 1496, 'VAN', '1765', '7', 'petrol', 3931899, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'SIENTA G CUERO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'SIENTA G CUERP HYBRID', '6AA-NHP170G-MWXUB', 'CVT', '2WD', 1496, 'VAN', '1765', '7', 'petrol', 3932662, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'SIENTA G CUERP HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'SIENTA HYBRID G', 'DAA-NHP170G-MWXQB', 'CVT', '2WD', 1496, 'VAN', '1765', '7', 'petrol', 3628593, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'SIENTA HYBRID G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'SIENTA WELCAB X', '5BA-MXPC12G-MNXB-P', 'CVT', '2WD', 1490, 'VAN', '1605', '5', 'petrol', 3556315, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'SIENTA WELCAB X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'SIENTA WELCAB X (HYBRID)', '6AA-MXPL12G-MNXNB', 'CVT', '2WD', 1490, 'VAN', '1665', '5', 'petrol', 4223648, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'SIENTA WELCAB X (HYBRID)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'SIENTA X', '5BA-MXPC12G-MNXNB-P', 'CVT', '2WD', 1490, 'VAN', '1605', '5', 'petrol', 3487570, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'SIENTA X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'SIENTA X', 'DBA-NSP172G-MNXNB', 'CVT', '2WD', 1496, 'VAN', '1635', '5', 'petrol', 3571406, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'SIENTA X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'SIENTA X', '5BA-NSP170G-VQQKXN', 'CVT', '2WD', 1496, 'VAN', '1745', '7', 'petrol', 3209235, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'SIENTA X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'SIENTA X', '5BA-NSP172G-MNXNB', 'CVT', '2WD', 1496, 'VAN', '1635', '5', 'petrol', 3584819, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'SIENTA X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'SIENTA Z HYBRID', '6AA-MXPL10G-MWXUB', 'CVT', '2WD', 1490, 'VAN', '1765', '7', 'petrol', 4879244, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'SIENTA Z HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'SPADE G', '5BA--NSP141-BEXGB', 'CVT', '2WD', 1496, 'VAN', '1445', '5', 'petrol', 3070067, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'SPADE G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'SPADE G', 'DBA-NSP141-BEXGB', 'CVT', '2WD', 1496, 'VAN', '1445', '5', 'petrol', 3070067, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'SPADE G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'SPADE X', 'DBA-NSP141-VTPLXB', 'CVT', '2WD', 1496, 'VAN', '1415', '3', 'petrol', 4069390, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'SPADE X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'STARLET GLX', 'K15BR-GHPXKN', 'AT', '2WD', 1500, 'HATCHBACK', NULL, NULL, 'petrol', 1471500, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'STARLET GLX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'SUCCEED TX', '6AE-NHP160V-FXXRB', 'CVT', '2WD', 1496, 'WAGON', '1635', '5', 'diesel', 3051623, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'SUCCEED TX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'SUCCEED TX', 'DBE-NCP160V-FXXRK', 'CVT', '2WD', 1496, 'WAGON', '1615', '2', 'petrol', 2642505, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'SUCCEED TX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'SUCCEED TX', 'DBE-NCP160V-EXXGK', 'CVT', '2WD', 1496, 'VAN', '1615', '5', 'petrol', 2642505, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'SUCCEED TX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'SUPRA RZ', '3BA-DB06-ZURW', '8AT', '2WD', 2997, 'COUPE', '1640', '2', 'petrol', 12772735, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'SUPRA RZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'SUPRA RZ', '3BA-DB42-ZRRW', '8AT', '2WD', 2997, 'COUPE', '1630', '2', 'petrol', 11158702, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'SUPRA RZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'SUPRA RZ', '3BA-DB02-ZURW', '6AT', '2WD', 2997, 'COUPE', '1640', '2', 'petrol', 11611578, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'SUPRA RZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'TANK G', 'DBA-M900A-BGBGE', 'CVT', '2WD', 996, 'MINIVAN', '1345', '5', 'petrol', 2615677, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'TANK G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'TANK G S', 'DBA-M900A-BGBGE(S)', 'CVT', '2WD', 996, 'MINIVAN', '1345', '5', 'petrol', 2615677, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'TANK G S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'TOWN ACE  VAN GL', '6BF-S413M-ZQDFJD', '4AT', '4WD', 1496, 'VAN', '2160', '5', 'petrol', 3935253, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'TOWN ACE  VAN GL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'TOWN ACE DX', 'DBF-S402U-TMDFJD', '5MT', '2WD', 1495, 'TRUCK', '2040', '2', 'diesel', 2402734, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'TOWN ACE DX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'TOWN ACE DX X EDITION', '5BF-S413U-TQDFJD', '4AT', '4WD', 1496, 'TRUCK', '2090', '2', 'petrol', 3245209, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'TOWN ACE DX X EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'TOWN ACE GL', 'DBF-S402M-ZQDFJD', '4AT', '2WD', 1495, 'VAN', '2100', '2', 'petrol', 2806823, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'TOWN ACE GL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'TOWN ACE TRUCK DX', '5BF-S413U-TQDFJD', '4AT', '4WD', 1496, 'TRUCK', '2090', '2', 'petrol', 3569729, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'TOWN ACE TRUCK DX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'TOWN ACE VAN', '5BF-S413M-ZQDFJD', '4AT', '2WD', 1496, 'VAN', '2160', '5', 'petrol', 3577502, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'TOWN ACE VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'TOWN ACE VAN GL', 'DBF-S402M-ZQDFJD', '4AT', '2WD', 1495, 'VAN', '2090', '5', 'petrol', 2825267, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'TOWN ACE VAN GL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'TOWNACE', '5BF-S403U-VTCABB', '4AT', '4WD', 1496, 'TRUCK', '2210', '2', 'petrol', 3697159, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'TOWNACE'
);