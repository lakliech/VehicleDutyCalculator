INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SKODA', 'SUPERB SPORTLINE 206TSI', '206TSI', '7AT', '4WD', 2000, 'WAGON', NULL, NULL, 'petrol', 12120598, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SKODA' AND model = 'SUPERB SPORTLINE 206TSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'BRZ  GT', 'DBA-ZC6', 'CVT', '4WD', 1998, 'COUPE', '1470', '4', 'petrol', 5361999, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'BRZ  GT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'BRZ S', '4BA-ZC6', '6MT', 'AWD', 1998, 'COUPE', '1460', '5', 'petrol', 4610970, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'BRZ S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'BRZ S', 'DBA-ZC6', '6MT', '2WD', 1998, 'COUPE', '1490', '4', 'petrol', 4803093, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'BRZ S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'BRZ STI SPORT', '4BA-ZC6', '6MT', 'AWD', 1998, 'COUPE', '1470', '5', 'petrol', 5482862, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'BRZ STI SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'BRZ STI SPORT', 'DBA-ZC6', 'CVT', '4WD', 1998, 'COUPE', '1470', '4', 'petrol', 5711315, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'BRZ STI SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'BRZ STI SPORT', 'DBA-ZC6', '6MT', '2WD', 1998, 'COUPE', '1470', '4', 'petrol', 5711315, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'BRZ STI SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'CHIFFON CUSTOM R', '5BA-LA650F', 'CVT', '2WD', 658, 'MINIVAN', '1140', '4', 'petrol', 3024796, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'CHIFFON CUSTOM R'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'CHIFFON CUSTOM R', 'DBA-LA600F', 'CVT', '2WD', 658, 'MINIVAN', '1160', '4', 'petrol', 2615677, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'CHIFFON CUSTOM R'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'CHIFFON CUSTOM R', 'DBA-LA610F', 'CVT', '4WD', 658, 'MINIVAN', '1160', '4', 'petrol', 2808500, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'CHIFFON CUSTOM R'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'CHIFFON CUSTOM R LIMITED SMART ASSIST', 'DBA-LA600F', 'CVT', '2WD', 658, 'MINIVAN', '1160', '4', 'petrol', 2565376, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'CHIFFON CUSTOM R LIMITED SMART ASSIST'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'CHIFFON CUSTOM R LIMITED SMART ASSIST', 'DBA-LA610F', 'CVT', '4WD', 658, 'MINIVAN', '1210', '4', 'petrol', 2758198, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'CHIFFON CUSTOM R LIMITED SMART ASSIST'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'CHIFFON CUSTOM RS', '5BA-LA650F', 'CVT', '2WD', 658, 'MINIVAN', '1140', '5', 'petrol', 2774965, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'CHIFFON CUSTOM RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'CHIFFON G', '6BA-LA650F', 'CVT', '2WD/AWD', 658, 'MINIVAN', '1120', '5', 'petrol', 2330636, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'CHIFFON G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'CROSSTREK LIMITED', '5AA-GUE', 'CVT', 'AWD', 1995, 'SUV', '1885', '5', 'petrol', 5744500, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'CROSSTREK LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'DIAS WAGON RS', 'ABA-S321N', '4AT', '2WD', 658, 'WAGON', '1230', '4', 'petrol', 2607294, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'DIAS WAGON RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'DIAS WAGON RS', 'ABA-S331N', '4AT', '4WD', 658, 'WAGON', '1230', '4', 'petrol', 2816883, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'DIAS WAGON RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'DIAS WAGON RS LIMITED', 'ABA-S321N', 'CVT', '4WD', 658, 'WAGON', '1210', '4', 'petrol', 2506691, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'DIAS WAGON RS LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'FORESTER 2.0I-L EYESIGHT', 'DBA-SJ5', 'CVT', 'AWD', 1995, 'SUV', '1785', '5', 'petrol', 4348983, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'FORESTER 2.0I-L EYESIGHT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'FORESTER 2.0XT EYESIGHT', 'DBA-SJG', 'CVT', 'AWD', 1998, 'SUV', '1885', '5', 'petrol', 5059840, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'FORESTER 2.0XT EYESIGHT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'FORESTER ADVANCE', '5AA-SKE', 'CVT', 'AWD', 1995, 'SUV', '1915', '5', 'petrol', 4812175, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'FORESTER ADVANCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'FORESTER STI BLACK SPORT BLACK INTERIOR SELECTION', '5BA-SK5', 'CVT', 'AWD', 1795, 'SUV', '1845', '5', 'petrol', 6724331, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'FORESTER STI BLACK SPORT BLACK INTERIOR SELECTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'FORESTER STI SPORT', '4BA-SK5', 'CVT', 'AWD', 1795, 'SUV', '1845', '5', 'petrol', 6340083, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'FORESTER STI SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'FORESTER X-BREAK', '5BA-SK9', 'CVT', 'AWD', 2498, 'SUV', '1805', '5', 'petrol', 4527134, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'FORESTER X-BREAK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'FORSTER ADVANCE', '5AA-SKE', 'CVT', 'AWD', 1995, 'SUV', '1915', '5', 'petrol', 5012683, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'FORSTER ADVANCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'FORSTER SPORT', '4BA-SK5', 'CVT', 'AWD', 1795, 'SUV', '1845', '5', 'petrol', 5222272, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'FORSTER SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'FORSTER URBAN SELECTION', '5AA-SKE', 'CVT', 'AWD', 1995, 'SUV', '1915', '5', 'petrol', 5763712, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'FORSTER URBAN SELECTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'FORSTER X-BREAK', '5AA-SKE', 'CVT', 'AWD', 1995, 'SUV', '1905', '5', 'petrol', 4855491, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'FORSTER X-BREAK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'FORSTER X-BREAK', '5BA-SK9', 'CVT', 'AWD', 2498, 'SUV', '1805', '5', 'petrol', 4715764, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'FORSTER X-BREAK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'IMPREZA G4', 'DBA-GK7', 'CVT', 'AWD', 1995, 'SEDAN', '1675', '5', 'petrol', 4124722, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'IMPREZA G4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'IMPREZA G4', '3BA-GK7', 'CVT', 'AWD', 1995, 'SEDAN', '1675', '5', 'petrol', 4783881, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'IMPREZA G4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'IMPREZA G4 2.0I EYESIGHT', '3BA-GK7', 'CVT', 'AWD', 1995, 'SEDAN', '1675', '5', 'petrol', 4296585, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'IMPREZA G4 2.0I EYESIGHT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'IMPREZA G4 2.0I EYESIGHT', 'DBA-GK6', 'CVT', '2WD', 1995, 'SEDAN', '1625', '5', 'petrol', 3877406, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'IMPREZA G4 2.0I EYESIGHT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'IMPREZA G4 2.0I EYESIGHT', 'DBA-GK7', 'CVT', 'AWD', 1995, 'SEDAN', '1675', '5', 'petrol', 4226722, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'IMPREZA G4 2.0I EYESIGHT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'IMPREZA SPORT 2.0I EYESIGHT', 'DBA-GT7', 'CVT', 'AWD', 1995, 'SEDAN', '1675', '5', 'petrol', 4124722, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'IMPREZA SPORT 2.0I EYESIGHT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'IMPREZA SPORT 2.0I-S EYESIGHT', 'DBA-GT6', 'CVT', '2WD', 1995, 'SEDAN', '1625', '5', 'petrol', 3877406, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'IMPREZA SPORT 2.0I-S EYESIGHT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'IMPREZA SPORT ADVANCE', '5AA-GTE', 'CVT', 'AWD', 1995, 'SEDAN', '1805', '5', 'petrol', 4418846, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'IMPREZA SPORT ADVANCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'IMPREZA ST-H', '5AA-GUE', 'CVT', 'AWD', 1995, 'SEDAN', '1855', '5', 'petrol', 5610013, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'IMPREZA ST-H'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'IMPREZA STI SPORT', '3BA-GT7', 'CVT', 'AWD', 1995, 'SEDAN', '1675', '5', 'petrol', 4645901, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'IMPREZA STI SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'JUSTY', '5BA-M900F', 'CVT', 'AWD', 996, 'HATCHBACK', '1365', '5', 'petrol', 2994615, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'JUSTY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'JUSTY CUSTO, RS SMART ASSIST', 'DBA-M900F', 'CVT', '2WD', 996, 'HATCHBACK', '1375', '5', 'petrol', 3215942, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'JUSTY CUSTO, RS SMART ASSIST'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'JUSTY CUSTOM R', 'DBA-M900F', 'CVT', '2WD', 996, 'HATCHBACK', '1355', '4', 'petrol', 3014736, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'JUSTY CUSTOM R'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'JUSTY CUSTOM R', 'DBA-M910F', 'CVT', '4WD', 996, 'HATCHBACK', '1355', '4', 'petrol', 3319898, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'JUSTY CUSTOM R'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'LEGACY B4 LIMITED', 'DBA-BN9', 'CVT', 'AWD', 2498, 'SEDAN', '1815', '5', 'petrol', 5239738, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'LEGACY B4 LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'LEGACY OUBACK LIMITED', 'DBA-BS9', 'CVT', 'AWD', 2498, 'SUV', '1855', '5', 'petrol', 5763712, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'LEGACY OUBACK LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'LEGACY OUTBACK ACTIVE X BLACK', '4BA-BT5', 'CVT', 'AWD', 1795, 'SUV', '1965', '5', 'petrol', 7877073, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'LEGACY OUTBACK ACTIVE X BLACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'LEGACY OUTBACK LIMITED', '4BA-BT5', 'CVT', 'AWD', 1795, 'SUV', '1965', '5', 'petrol', 7684949, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'LEGACY OUTBACK LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'LEGACY OUTBACK LIMITED', 'DBA-BS9', 'CVT', 'AWD', 2498, 'SUV', '1855', '5', 'petrol', 5763712, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'LEGACY OUTBACK LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'LEGACY OUTBACK LIMITED', '4BA-BS9', 'CVT', 'AWD', 2498, 'SUV', '1855', '5', 'petrol', 5763712, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'LEGACY OUTBACK LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'LEGACY OUTBACK LIMITED EX', '4BA-BT5', 'CVT', 'AWD', 1795, 'SUV', '1965', '5', 'petrol', 7492826, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'LEGACY OUTBACK LIMITED EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'LEGACY OUTBACK SELECTION', '4BA-BT5', 'CVT', 'AWD', 1795, 'SUV', '1965', '5', 'petrol', 7857861, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'LEGACY OUTBACK SELECTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'LEGACY OUTBACK X-BREAK EX', '4BA-BT5', 'CVT', 'AWD', 1795, 'SUV', '1955', '5', 'petrol', 7243065, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'LEGACY OUTBACK X-BREAK EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'LEVORG 1.6GT-S EYESIGHT', 'DBA-VM4', 'CVT', 'AWD', 1599, 'WAGON', '1835', '5', 'petrol', 4977751, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'LEVORG 1.6GT-S EYESIGHT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'LEVORG GT EX', '4BA-VN5', 'CVT', 'AWD', 1795, 'WAGON', '1855', '5', 'petrol', 6628269, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'LEVORG GT EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'LEVORG GT-H EX', '4BA-VN5', 'CVT', 'AWD', 1795, 'WAGON', '1855', '5', 'petrol', 6628269, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'LEVORG GT-H EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'LEVORG GT-S EYESIGHT', 'DBA-VM4', 'CVT', 'AWD', 1599, 'WAGON', '1835', '5', 'petrol', 4977751, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'LEVORG GT-S EYESIGHT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'LEVORG LAYBACK LIMITED EX', '4BA-VN5', 'CVT', 'AWD', 1795, 'WAGON', '1875', '5', 'petrol', 6974091, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'LEVORG LAYBACK LIMITED EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'LEVORG STI SMART EDITION', '3BA-GU7', 'CVT', 'AWD', 1995, 'WAGON', '1715', '5', 'petrol', 5533163, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'LEVORG STI SMART EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'LEVORG STI SPORT 1.6TI SPORT EYE SIGHT', 'DBA-VM4', 'CVT', 'AWD', 1599, 'WAGON', '1835', '5', 'petrol', 5533163, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'LEVORG STI SPORT 1.6TI SPORT EYE SIGHT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'LEVORG STI SPORT 2.0 GT-S EYE SIGHT', 'DBA-VM4', 'CVT', 'AWD', 1599, 'WAGON', '1835', '5', 'petrol', 5763712, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'LEVORG STI SPORT 2.0 GT-S EYE SIGHT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'LEVORG STI SPORT EX', '5BA-VNH', 'CVT', 'AWD', 2387, 'WAGON', '1915', '5', 'petrol', 8780055, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'LEVORG STI SPORT EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'LEVORG STI SPORT EX', '4BA-VN5', 'CVT', 'AWD', 1795, 'WAGON', '155', '5', 'petrol', 6497275, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'LEVORG STI SPORT EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'LEVORG STI SPORT EYESIGHT', 'DBA-VM4', 'CVT', 'AWD', 1599, 'WAGON', '1835', '5', 'petrol', 5763712, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'LEVORG STI SPORT EYESIGHT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'LEVORG STI SPORT R EX', '5BA-VNH', 'CVT', 'AWD', 2387, 'WAGON', '1905', '5', 'petrol', 8338170, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'LEVORG STI SPORT R EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'LEVORGLAYBACK LIMITED EX', '4BA-VN5', 'CVT', 'AWD', 1795, 'WAGON', '1875', '5', 'petrol', 6974091, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'LEVORGLAYBACK LIMITED EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'PLEO PLUS G SMART ASSIST', 'DBA-LA350F', 'CVT', '2WD', 658, 'WAGON', '890', '4', 'petrol', 1894689, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'PLEO PLUS G SMART ASSIST'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'PLEO PLUS G SMART ASSIST', 'DBA-LA360F', 'CVT', '4WD', 658, 'WAGON', '960', '4', 'petrol', 2095895, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'PLEO PLUS G SMART ASSIST'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'PLEO+ G', '5BA-LA350F', 'CVT', 'AWD', 658, 'WAGON', '890', '5', 'petrol', 1894689, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'PLEO+ G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'PLEO+ G', '5BA-LA350F', 'CVT', '2WD', 658, 'WAGON', '890', '5', 'petrol', 1894689, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'PLEO+ G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'PLEO+ G', '5BA-LA360F', 'CVT', '4WD', 658, 'WAGON', '890', '4', 'petrol', 2095895, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'PLEO+ G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'REX REV', '5BA-A201F', 'CVT', 'AWD', 1196, 'SUV', '1155', '5', 'petrol', 3640319, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'REX REV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'REX Z', '5BA-A201F', 'CVT', '2WD', 1196, 'SUV', '1255', '5', 'petrol', 3791998, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'REX Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'SAMBAR  VAN TRANSPORTER', '3BD-S710B', 'CVT', '4WD', 658, 'VAN', '1410', '4', 'petrol', 2388482, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'SAMBAR  VAN TRANSPORTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'SAMBAR TRUCK', '3BD-S510J', 'CVT', '4WD', 658, 'TRUCK', '1320', '2', 'petrol', 2351594, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'SAMBAR TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'SAMBAR TRUCK TB', 'EBD-S500J', '4AT', '2WD', 658, 'TRUCK', '1230', '2', 'petrol', 1525812, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'SAMBAR TRUCK TB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'SAMBAR TRUCK TB', '3BD-S500J', '4AT', '2WD', 658, 'TRUCK', '1230', '2', 'petrol', 1550962, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'SAMBAR TRUCK TB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'SAMBAR TRUCK TB SMART ASSIST', '3BD-S500J', '4AT', '2WD', 658, 'TRUCK', '1230', '2', 'petrol', 1706059, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'SAMBAR TRUCK TB SMART ASSIST'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'SAMBAR TRUCK TC', '3BD-S510J', 'CVT', '4WD', 658, 'TRUCK', '1320', '2', 'petrol', 2351594, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'SAMBAR TRUCK TC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'SAMBAR VAN', '3BD-S710B', 'CVT', '4WD', 658, 'VAN', '1410', '4', 'petrol', 2388482, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'SAMBAR VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'SAMBAR VAN', '3BD-S321B', '4AT', '2WD', 658, 'VAN', '1390', '4', 'petrol', 1991939, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'SAMBAR VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'SAMBAR VAN', 'EBD-S321B', '4AT', '2WD', 658, 'VAN', '1390', '4', 'petrol', 1794086, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'SAMBAR VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'SAMBAR VAN TRANSPORTER', '3BD-S710B', 'CVT', '2WD', 658, 'VAN', '1410', '4', 'petrol', 2388482, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'SAMBAR VAN TRANSPORTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'SAMBAR VB', 'EBD-S321B', '5MT', '2WD', 658, 'VAN', '1350(1360)', '2', 'petrol', 1453155, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'SAMBAR VB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'SOLTERRA ET-HS', 'ZAA-YEAM15X', 'CVT', 'AWD', NULL, 'SUV', '2305', '5', 'electric', 10482271, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'SOLTERRA ET-HS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'STELLA CUSTM RS', 'DBA-LA150F', 'CVT', '2WD', 658, 'SUV', '1070', '4', 'petrol', 2523458, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'STELLA CUSTM RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'STELLA CUSTM RS', 'DBA-LA160F', 'CVT', '4WD', 658, 'SUV', '1070', '4', 'petrol', 2716280, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'STELLA CUSTM RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'STELLA CUSTOM R', '5BA-LA150F', 'CVT', '2WD', 658, 'SUV', '1050', '4', 'petrol', 2545255, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'STELLA CUSTOM R'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'STELLA CUSTOM RS', 'DBA-LA150F', 'CVT', '2WD', 658, 'SUV', '1070', '5', 'petrol', 2523458, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'STELLA CUSTOM RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'STELLA CUSTOM RS SMART ASSIST', 'DBA-LA160F', 'CVT', '2WD', 658, 'SUV', '1070', '4', 'petrol', 2523458, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'STELLA CUSTOM RS SMART ASSIST'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'STELLA CUSTOM RS SMART ASSIST', 'DBA-LA150F', 'CVT', '4WD', 658, 'SUV', '1120', '4', 'petrol', 2716280, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'STELLA CUSTOM RS SMART ASSIST'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'STELLA CUSTOMR', '5BA-LA150F', 'CVT', 'AWD', 658, 'SUV', '1050', '5', 'petrol', 2313868, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'STELLA CUSTOMR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'SUBARU BRZ S', '3BA-ZD8', 'CVT', 'AWD', 2387, 'COUPE', '1510', '4', 'petrol', 5994260, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'SUBARU BRZ S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'SUBARU BRZ STI', '3BA-ZD8', 'CVT', 'AWD', 2387, 'COUPE', '1490', '5', 'petrol', 6609056, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'SUBARU BRZ STI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'SUBARU BRZ STI SPORT', '3BA-ZD8', 'CVT', 'RWD', 2387, 'COUPE', '1490', '4', 'petrol', 6570632, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'SUBARU BRZ STI SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'SUBARU XV 2.0I-S EYESIGHT', 'DBA-GT7', 'CVT', 'AWD', 1995, 'SUV', '1715', '5', 'petrol', 4366448, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'SUBARU XV 2.0I-S EYESIGHT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'SUBARU XV ADVANCE', '5AA-GTE', 'CVT', 'AWD', 1995, 'SUV', '1825', '5', 'petrol', 4576038, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'SUBARU XV ADVANCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'WRX S4 2.0GT EYESIGHT', 'DBA-VAG', 'CVT', 'AWD', 1998, 'SEDAN', '1815', '5', 'petrol', 6043165, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'WRX S4 2.0GT EYESIGHT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'WRX S4 2.0GT-S EYESIGHT', 'DBA-VAG', 'CVT', 'AWD', 1998, 'SEDAN', '1815', '5', 'petrol', 6043165, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'WRX S4 2.0GT-S EYESIGHT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'WRX S4 STI EYESIGHT', 'DBA-VAG', 'CVT', 'AWD', 1998, 'SEDAN', '1815', '5', 'petrol', 6354754, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'WRX S4 STI EYESIGHT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUBARU', 'WRX S4 STI R EX', '5BA-VBH', 'CVT', 'AWD', 2387, 'SEDAN', '1875', '5', 'petrol', 8338170, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUBARU' AND model = 'WRX S4 STI R EX'
);