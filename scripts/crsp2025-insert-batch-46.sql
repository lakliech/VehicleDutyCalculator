INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'LAPIN LC', '5BA-HE33S/NSXE-5', 'CVT', '2WD', 658, 'HATCBACK', '900', '4', 'petrol', 2720472, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'LAPIN LC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'LAPIN LC X', '5BA-HE33S/NSXE-4', 'CVT', '4WD', 658, 'HATCBACK', '900', '4', 'petrol', 2591365, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'LAPIN LC X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'LAPIN LC X', '5BA-HE33S/NSXE-4', '5MT', '4WD', 658, 'HATCBACK', '900', '4', 'petrol', 2591365, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'LAPIN LC X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'LAPIN X', '5BA-HE33S/NBXE-4', 'CVT', '4WD', 658, 'HATCBACK', '900', '4', 'petrol', 2508367, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'LAPIN X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'LAPIN X', '5BA-HE33S/NBXE-5', 'CVT', '2WD', 658, 'HATCBACK', '900', '4', 'petrol', 2637475, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'LAPIN X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'LAPIN X', 'DBA-HE33S/NBXE-2', 'CVT', '2WD', 658, 'HATCBACK', '900', '4', 'petrol', 2191468, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'LAPIN X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'LAPIN X', '5BA-HE33S/NBXE-3', 'CVT', '2WD', 658, 'HATCBACK', '900', '4', 'petrol', 2429059, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'LAPIN X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'LAPIN X', '5BA-HE33S/NBXE-M3', 'CVT', '2WD', 658, 'HATCBACK', '900', '4', 'petrol', 2288718, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'LAPIN X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'LAPIN X', 'DBA-HE33S/NBXE', 'CVT', '2WD', 658, 'HATCBACK', '900', '4', 'petrol', 2157934, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'LAPIN X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'Pixis Deluxe', 'EBD-S321M-ZMDF', '5MT', '2WD', 658, 'VAN', '1360', '2', '40', 1596873, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'Pixis Deluxe'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SAMBAR TRUCK TC', '3BD-S510J', '4WD', 'CVT', 658, 'TRUCK', '1320', '2', NULL, 2351594, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SAMBAR TRUCK TC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SAMBAR VB', 'HBD-DA17V/EVBN-D2', '5AGS', '2WD', 658, 'VAN', '1320(1330)', '2', '37', 1740431, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SAMBAR VB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SOLIO BANDIT HYBRID MV', '5AA-MA37S/FSVB-J', 'CVT', '2WD', 1242, 'MINIVAN', '1275', '5', 'petrol', 3364163, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SOLIO BANDIT HYBRID MV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SOLIO BANDIT HYBRID MV', 'DAA-MA36S/FSVB-JR2', 'CVT', '2WD', 1242, 'MINIVAN', '1225', '5', 'petrol', 3090188, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SOLIO BANDIT HYBRID MV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SOLIO BANDIT HYBRID SV', '5AA-MA47S/FSVH-JR2', 'CVT', '4X4', 1242, 'MINIVAN', '1325', '5', 'petrol', 3886125, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SOLIO BANDIT HYBRID SV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SOLIO BANDIT HYBRID SV', 'DAA-MA46S/FSVH-JRM2', '5AGS', '2WD', 1242, 'MINIVAN', '1265', '5', 'petrol', 3366846, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SOLIO BANDIT HYBRID SV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SOLIO BANDIT HYBRID SV', 'DAA-MA46S/FSVH', '5AGS', '2WD', 1242, 'MINIVAN', '1265', '4', 'petrol', 3187442, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SOLIO BANDIT HYBRID SV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SOLIO HYBRID MZ', '5AA-MSA37S/FBZB-J', 'CVT', '2WD', 1242, 'MINIVAN', '1275', '5', 'petrol', 3391829, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SOLIO HYBRID MZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SOLIO HYBRID MZ', 'DAA-MA36S/FBZB-J2', 'CVT', '2WD', 1242, 'MINIVAN', '1225', '5', 'petrol', 3034856, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SOLIO HYBRID MZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SOLIO HYBRID SV', '5AA-M47S/FBZH-J2', '5AGS', '2WD', 1242, 'MINIVAN', '1325', '5', 'petrol', 3845549, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SOLIO HYBRID SV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SOLIO HYBRID SZ', '5AA-MA47S/FBZH-J2', 'CVT', '4WD', 1242, 'MINIVAN', '1325', '5', 'petrol', 3845549, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SOLIO HYBRID SZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SOLIO HYBRID SV', '5AA-MA47S/FSV-JR2', '5AGS', '2WD', 1242, 'MINIVAN', '1325', '5', 'petrol', 3886125, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SOLIO HYBRID SV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SOLIO HYBRID SZ', 'DAA-MA46S/FBZH-JM2', '5AGS', '2WD', 1242, 'MINIVAN', '1265', '5', 'petrol', 3489246, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SOLIO HYBRID SZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SOLIO HYBRID SZ', 'DAA-MAA46/FBZH', '5AGS', '2WD', 1242, 'MINIVAN', '1265', '4', 'petrol', 3212673, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SOLIO HYBRID SZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SPACIA', 'DAA-MK42S/ZBKB-JRA2', 'CVT', '2WD', 658, 'VAN', '890', '4', 'petrol', 2842627, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SPACIA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SPACIA BASE XF', '5BD-MK33V/ZGXE-2', 'CVT', '2WD', 658, 'VAN', '1180', '4', 'petrol', 2724161, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SPACIA BASE XF'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SPACIA BASE XF', '5BD-MK33V/ZGXE', 'CVT', '2WD', 658, 'VAN', '1180', '4', 'petrol', 2595054, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SPACIA BASE XF'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SPACIA CUSTOM HYBRID XS', '5AA-MKA94S/ZSXB', 'CVT', '2WD', 657, 'VAN', '1130', '4', 'petrol', 3345720, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SPACIA CUSTOM HYBRID XS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SPACIA CUSTOM  HYBRID XS', '4AA-MK53S/ZTXB-J2', 'CVT', '2WD', 658, 'VAN', '1120', '4', 'petrol', 3061516, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SPACIA CUSTOM  HYBRID XS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SPACIA CUSTOM HYBRID XS', '4AA-MK53S/ZTXB-3', 'CVT', '2WD', 658, 'VAN', '1120', '4', 'petrol', 3157592, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SPACIA CUSTOM HYBRID XS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SPACIA CUSTOM HYBRID XS TURBO', 'DAA-MK53S/ZTXB-J', 'CVT', '2WD', 658, 'VAN', '1120', '4', 'petrol', 2774965, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SPACIA CUSTOM HYBRID XS TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SPACIA CUSTOM XS TURBO', 'DAA-MK53S/ZTXB-J', 'CVT', '2WD', 658, 'VAN', '1120', '4', 'petrol', 2774965, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SPACIA CUSTOM XS TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SPACIA CUSTOM Z TURBO', 'DAA-MK42S/ZTZB-A', 'CVT', '2WD', 658, 'VAN', '1110', '4', 'petrol', 2489401, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SPACIA CUSTOM Z TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SPACIA GEAR HYBRID GEAR XZ TURBO', 'DAA-MK53S/ZTZB-J', 'CVT', '2WD', 658, 'VAN', '1110', '4', 'petrol', 2699513, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SPACIA GEAR HYBRID GEAR XZ TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SPACIA GEAR HYBRID XZ', '5AA-MK94S/ZSZB', 'CVT', '2WD', 657, 'VAN', '1120', '4', 'petrol', 3273788, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SPACIA GEAR HYBRID XZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SPACIA GEAR HYBRID XZ TURBO', '4AA-MK53S/ZTZB-3', 'CVT', '2WD', 658, 'VAN', '1110', '4', 'petrol', 3022952, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SPACIA GEAR HYBRID XZ TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SPACIA GEAR HYBRID XZ TURBO', '4AA-MK53S/ZTZB-JK2', 'CVT', '2WD', 658, 'VAN', '1110', '4', 'petrol', 2820237, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SPACIA GEAR HYBRID XZ TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SPACIA GEAR XZ', '4AA-MK53S/ZTXB-J2', 'CVT', '2WD', 658, 'VAN', '1110', '4', 'petrol', 2958398, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SPACIA GEAR XZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SPACIA HYBRID', '5AA-MK53A/ZBKB-JHR2', 'CVT', '2WD', 658, 'VAN', '1595', '4', 'petrol', 2927546, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SPACIA HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SPACIA HYBRID X', '5AA-MK53S/ZBXB-3', 'CVT', '2WD', 658, 'VAN', '1090', '4', 'petrol', 2571077, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SPACIA HYBRID X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SPACIA HYBRID X', '5AA-MK53S/ZBKB-HR3', '4AT', '4WD', 658, 'VAN', '1595', '4', 'petrol', 2940960, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SPACIA HYBRID X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SPACIA HYBRID X', '5AA-MKA94S/ZBXB', 'CVT', '2WD', 657, 'VAN', '1100', '4', 'petrol', 2858801, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SPACIA HYBRID X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SPACIA HYBRID X', '5BA-MK94S/ZBKB-R', 'CVT', '2WD', 657, 'VAN', '1120', '4', 'petrol', 3195821, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SPACIA HYBRID X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SPACIA HYBRID X', '5AA-MK53S/ZBXB-J2', 'CVT', '2WD', 658, 'VAN', '1090', '4', 'petrol', 2556322, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SPACIA HYBRID X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SPACIA HYBRID X', '5A-MK53S/ZBKB-JHR2', 'CVT', '2WD', 658, 'VAN', '1020', '4', 'petrol', 2772115, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SPACIA HYBRID X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SPACIA HYBRID X', '5AA-MK53S/ZBXB-JK2', 'CVT', '2WD', 658, 'VAN', '1090', '4', 'petrol', 2458066, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SPACIA HYBRID X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SPACIA HYBRID X', 'DAA-MK53S/ZBXB-J', 'CVT', '2WD', 658, 'VAN', '1090', '4', 'petrol', 2280334, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SPACIA HYBRID X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SPACIA HYBRID X', 'DAA-MK53S/ZBXB-J', '4AT', '2WD', 658, 'VAN', '1090', '4', 'petrol', 2280334, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SPACIA HYBRID X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SPACIA HYBRID X', 'DAA-MK53S/ZBKB-JHR', 'CVT', '2WD', 658, 'VAN', '1040', '4', 'petrol', 2912456, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SPACIA HYBRID X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SPACIA HYBRID X', 'DAA-MK53A/ZBKB-JHR', 'CVT', '2WD', 658, 'VAN', '1595', '4', 'petrol', 2912456, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SPACIA HYBRID X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SPACIA HYBRID XS TURBO', '4AA-MK53S/ZTXTB-JK2', 'CVT', '2WD', 658, 'VAN', '1120', '4', 'petrol', 2929223, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SPACIA HYBRID XS TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SPACIA X', 'DAA-MK42S/ZBXB-JA2', 'CVT', '2WD', 658, 'VAN', '1070', '4', 'petrol', 2270737, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SPACIA X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SUPER CARRY X', '3BD-DA16T/KSXJ-H5', '5MT', '4WD', 658, 'TRUCK', '1300', '2', NULL, 2609809, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SUPER CARRY X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SUPER CARRY X', 'EBD-DA16T/KSXJ-2', '5MT', '4WD', 658, 'TRUCK', '1280', '2', 'diesel', 2018766, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SUPER CARRY X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SUPER CARRY X', '3BD-DA16T/KSXJ-4', '5MT', '4WD', 658, 'TRUCK', '1300', '2', NULL, 2239087, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SUPER CARRY X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SUPER CARRY X', '3BD-DA16T/KSXJ-4', 'CVT', '4WD', 658, 'TRUCK', '1300', '2', 'petrol', 2239087, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SUPER CARRY X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SUPER CARRY X', '3BD-DA16T/KSXJ-3', '5MT', '4WD', 658, 'TRUCK', '1290', '2', 'petrol', 2239087, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SUPER CARRY X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SUPER CARRY X', 'EBD-DA16T/KSXJ-2', '5MT', '4WD', 658, 'TRUCK', '1280', '2', 'petrol', 2018766, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SUPER CARRY X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SUPER CARRY X', 'EBD-DA16T/KSXJ', '5MT', '4WD', 658, 'TRUCK', '1280', '2', 'petrol', 1943314, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SUPER CARRY X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SWIFT HYBRID MZ', '5AA-ZCEDS/VBZB-ZC', 'CVT', '2WD', 1197, 'HATCBACK', '1225', '5', 'petrol', 3633444, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SWIFT HYBRID MZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SWIFT HYBRID RS', '5AA-ZC53S/VBRB-3', 'CVT', '2WD', 1242, 'HATCBACK', '1185', '5', 'petrol', 3170503, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SWIFT HYBRID RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SWIFT HYBRID RS', 'DAA-ZC53S/VBR', 'CVT', '2WD', 1242, 'HATCBACK', '1185', '4', 'petrol', 2634055, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SWIFT HYBRID RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SWIFT HYBRID SL', 'DAA-ZC33S/VBRM', '5AGS', '2WD', 1242, 'HATCBACK', '1235', '5', 'petrol', 3026473, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SWIFT HYBRID SL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SWIFT HYBRID SZ', '5AA-ZC43S/VBZH-2', '5AGS', '2WD', 1242, 'HATCBACK', '1245', '5', 'petrol', 3500648, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SWIFT HYBRID SZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SWIFT HYBRID SZ', '5AA-AZ43S/VBZH-M2', '5AGS', '2WD', 1242, 'HATCBACK', '1245', '5', 'petrol', 3262890, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SWIFT HYBRID SZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SWIFT SPORT', '5BA-ZC33S/VBRK-J4', '6AT', '4X4', 1371, 'HATCBACK', '1265', '5', 'petrol', 3749640, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SWIFT SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SWIFT SPORT', '4BA-ZC33S/VBRM-J3', '6MT', '2WD', 1371, 'HATCBACK', '1245', '5', 'petrol', 3401051, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SWIFT SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SWIFT SPORT', '5AA-M47S/VBRK-J4', '6AT', '2WD', 1371, 'HATCBACK', '1265', '5', 'petrol', 3749640, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SWIFT SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SWIFT SPORT', 'DAA-ZC33S/VBRM', '6MT', '2WD', 1371, 'HATCBACK', '1245', '5', 'petrol', 2850418, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SWIFT SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SWIFT SPORT', '4BA-ZC33S/VBRM-JM2', '6NT', '2WD', 1371, 'HATCBACK', '1245', '5', 'petrol', 3155580, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SWIFT SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SWIFT SPORT', 'CBA-ZC33S/VBRM', '6MT', '2WD', 1371, 'HATCBACK', '1245', '4', 'petrol', 2859447, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SWIFT SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SWIFT SPORT', '4BA-ZC33S/VBRM-J2', '6MT', '2WD', 1371, 'HATCBACK', '1245', '5', 'petrol', 3382607, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SWIFT SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SX S-CROSS', 'DBA-YA22S/QBSE-2', '6AT', '2WD', 1586, 'SUV', '1425', '5', 'petrol', 3335967, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SX S-CROSS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'SX4 S-CROSS', 'DBA-YA22S/QBSK-3', '6AT', '2WD', 1586, 'SUV', '1425', '5', 'petrol', 3461720, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'SX4 S-CROSS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R', '5BA-MH85S/WFBE-A4', 'CVT', '2WD', 657, 'WAGON', '1040', '4', 'petrol', 2528488, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R', '5BA-MH85S/WFBE-A3', 'CVT', '4WD', 657, 'WAGON', '1020', '4', 'petrol', 2528488, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R', '5BA-MH85S/WFBE-A3', 'CVT', '2WD', 657, 'WAGON', '1595', '4', 'petrol', 2411118, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R', 'DBA-MH35S/WFBE-AJ', 'CVT', '2WD', 658, 'WAGON', '1040', '4', 'petrol', 2330636, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R', '5BA-MH85S/WFBE-AJ2', 'CVT', '2WD', 657, 'WAGON', '1595', '4', 'petrol', 2335666, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R', 'DBA-MH35S/WFBE-AJ', 'CVT', '2WD', 658, 'WAGON', '890', '4', 'petrol', 2338018, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON HYBRID FX-S', '5AA-MH95S/WFXB-A4', 'CVT', '4X4', 657, 'WAGON', '990', '4', 'petrol', 2453036, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON HYBRID FX-S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R CUSTOM HYBRID ZT', '4AA-MH55S/WZTB-A4', 'CVT', '4X4', 658, 'WAGON', '1020', '4', 'petrol', 2868023, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R CUSTOM HYBRID ZT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R CUSTOM Z', '5BA-MH85S/WZQE-A3', 'CVT', '4WD', 657, 'WAGON', '1040', '4', 'petrol', 2764905, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R CUSTOM Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R CUSTOM Z', '5BA-MH85S/WZQE-A3', 'CVT', '2WD', 657, 'WAGON', '1595', '4', 'petrol', 2647535, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R CUSTOM Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R CUSTOM Z', '5BA-MH85S/WZQE-A4', 'CVT', '2WD', 657, 'WAGON', '1050', '4', 'petrol', 2764905, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R CUSTOM Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R CUSTOM Z', '4AA-MH55S/WZTB-A4', 'CVT', '2WD', 658, 'WAGON', '1020', '4', 'petrol', 2868023, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R CUSTOM Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R FX', 'DBA-MH35S/WSKE-AJ', 'CVT', '2WD', 658, 'WAGON', '1595', '4', 'petrol', 2330636, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R FX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R HYBRID FX-S', '5AA-MH95SS/WFXB-A3', 'CVT', '2WD', 657, 'WAGON', '990', '4', 'petrol', 2323929, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R HYBRID FX-S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R HYBRID FX-S', '5AA-MH95S/WFXB-A4', 'CVT', '2WD', 657, 'WAGON', '990', '4', 'petrol', 2453036, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R HYBRID FX-S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R HYBRID FZ', 'DAA-MH55S/WFZB-MJ', 'CVT', '2WD', 658, 'WAGON', '1010', '4', 'petrol', 2095895, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R HYBRID FZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R HYBRID FZ', '5AA-MH95S/WFZB-AJ2', 'CVT', '2WD', 657, 'WAGON', '1010', '4', 'petrol', 2382949, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R HYBRID FZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R HYBRID FZ', '5AA-MH95S/WFZB-MJ2', 'CVT', '2WD', 657, 'WAGON', '1010', '4', 'petrol', 2276981, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R HYBRID FZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R HYBRID FZ', 'DAA-MH55S/WFZB-A', 'CVT', '2WD', 658, 'WAGON', '1010', '4', 'petrol', 2095895, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R HYBRID FZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R SMILE HYBRID X', '5AA-MX91S/SBXB-2', 'CVT', '4WD', 657, 'WAGON', '1090', '7', 'petrol', 2762893, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R SMILE HYBRID X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R SMILE HYBRID X', '5AA-MX91S/SBXB-2', 'CVT', '2WD', 657, 'WAGON', '1090', '4', 'petrol', 2762893, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R SMILE HYBRID X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R SMILE HYBRID X', '5AA-MX91S/SBXB', 'CVT', '2WD', 657, 'WAGON', '1090', '4', 'petrol', 2670674, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R SMILE HYBRID X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R STINGRAY', 'DBA-MH35S/WSKE-AJ', 'CVT', '2WD', 658, 'WAGON', '1595', '4', 'petrol', 2577113, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R STINGRAY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R STINGRAY HYBRID T', '4AA-MH55S/WZTB-A3', 'CVT', '2WD', 658, 'WAGON', '1020', '4', 'petrol', 2747299, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R STINGRAY HYBRID T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R STINGRAY HYBRID T', '4AA-MH55S/WSTB-A4', 'CVT', '4WD', 658, 'WAGON', '1020', '4', 'petrol', 2960242, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R STINGRAY HYBRID T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R STINGRAY HYBRID T', '4AA-MH55S/WSTB-A4', 'CVT', '2WD', 658, 'WAGON', '1020', '4', 'petrol', 2960242, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R STINGRAY HYBRID T'
);