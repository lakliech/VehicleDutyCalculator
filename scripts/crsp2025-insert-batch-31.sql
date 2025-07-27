INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA3 SEDAN XD L PACKAGE', '3DA-BP8P', '6AT', '2WD', 1756, 'SEDAN', '1675', '5', 'diesel', 5687490, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA3 SEDAN XD L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA3 XD BLACK TONE EDITION', '3DA-BP8P', '6AT', '2WD', 1756, 'SEDAN', '1210', '5', 'diesel', 6110924, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA3 XD BLACK TONE EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA3 XD TOURING', '3DA-BP8R', '6AT', '2WD', 1756, 'SEDAN', '1685', '5', 'diesel', 6548410, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA3 XD TOURING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA3BACK  15S TOURING', '6BA-BP5P', '6AT', '2WD', 1496, 'SEDAN', '1615', '5', 'petrol', 4678622, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA3BACK  15S TOURING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA6 25T S PACKAGE', '5BA-GJ5FP', '6AT', '2WD', 2488, 'SEDAN', '1865', '5', 'petrol', 9085369, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA6 25T S PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA6 SEDAN 20S', '6BA-GJEEP', '4WD', '6AT', 2188, 'SEDAN', '1785', '5', 'petrol', 6138280, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA6 SEDAN 20S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA6 SEDAN 25T S PACKAGE', '5BA-GJ5FP', '6AT', '2WD', 2488, 'SEDAN', '1425', '5', 'petrol', 9085369, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA6 SEDAN 25T S PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA6 WAGON XD L PACKAGE', '5BA-GJ2AW', '6AT', 'AWD', 2188, 'SEDAN', '1965', '5', 'diesel', 9039074, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA6 WAGON XD L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA6 WAGON XD L PACKAGE', '3DA-GJ2AW', '6AT', 'AWD', 2188, 'SEDAN', '1965', '5', 'diesel', 8217340, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA6 WAGON XD L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA6 WAGON XD PACKAGE', '3DA-GJ2AW', 'AWD', '6AT', 1997, 'SEDAN', '1965', '5', 'diesel', 6233605, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA6 WAGON XD PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MX-30', '5AA-BPEP', '6AT', '2WD', 1997, 'SUV', '1735', '5', 'petrol', 5092436, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MX-30'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MX-30', '5AA-DREJ3P', '6AT', '2WD', 1997, 'SUV', '1735', '5', 'petrol', 4629488, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MX-30'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MX-30 EV MODEL', 'ZAA-DRH3P', NULL, '2WD', NULL, 'SUV', '1925', '5', 'electric', 8351595, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MX-30 EV MODEL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MX-30 EV MODEL EV HIGHEST SET', 'ZAA-DRH3P', 'CVT', '4WD', 830, 'SUV', '1925', '5', 'petrol', 10133224, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MX-30 EV MODEL EV HIGHEST SET'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MX-30 EV MODEL EV HIGHEST SET', 'ZAA-DRH3P', '6AT', '2WD', NULL, 'SUV', '1925', '5', 'electric', 9288604, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MX-30 EV MODEL EV HIGHEST SET'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MX-30 INDUSTRIAL CLASSIC', '5AA-DREJ3P', '6AT', '2WD', 1997, 'SUV', '1735', '5', 'petrol', 5810007, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MX-30 INDUSTRIAL CLASSIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MX-30 MODEL EV HIGHEST SET', 'ZAA-DRH3P', 'CVT', '2WD', NULL, 'SUV', '1615', '5', 'electric', 9288604, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MX-30 MODEL EV HIGHEST SET'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MX-30 ROTART-EV EDITION R', '3LA-DR8V3P', '6AT', '2WD', 830, 'SUV', '2055', '5', 'petrol', 9933028, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MX-30 ROTART-EV EDITION R'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MX-30 ROTARY EV EDITION R', '3LA-DR8V3P', 'CVT', '4WD', 1997, 'SUV', '2055', '5', 'petrol', 10346905, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MX-30 ROTARY EV EDITION R'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MX-30 SEDV EV HIGHEST SET', 'ZAA-DRH3P', '6AT', '2WD', NULL, 'SUV', '1925', '5', 'electric', 8444185, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MX-30 SEDV EV HIGHEST SET'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MX-30 SEDV EV HIGHEST SET', 'ZAA-DRH3P', 'CVT', '2WD', NULL, 'SUV', '1925', '5', 'electric', 8444185, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MX-30 SEDV EV HIGHEST SET'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'Premacy 20S-Skyactive L Package', 'DBA-CWFFW', '6AT', '2WD', 1997, 'MINIVAN', '1885', '7', 'petrol', 4713660, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'Premacy 20S-Skyactive L Package'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'Premacy 20S-Skyactive Passenger Liftup Seat', 'DBA-CWFFW', '6AT', '2WD', 1997, 'MINIVAN', '1945', '7', 'petrol', 5281824, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'Premacy 20S-Skyactive Passenger Liftup Seat'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'ROADSTER RF VS', '5BA-NDERC', '6MT', '4WD', 1997, 'CONVERTIBLE', '1120', '2', 'diesel', 7907165, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'ROADSTER RF VS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'ROADSTER RF VS', '5BA-NDERC', '6MT', '2WD', 1997, 'CONVERTIBLE', '1210', '2', 'petrol', 7860870, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'ROADSTER RF VS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'ROADSTER RF VS', 'DBA-NDERC', '6MT', '2WD', 1997, 'CONVERTIBLE', '1210', '2', 'petrol', 6965274, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'ROADSTER RF VS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'Roadster S leather', 'DBA-ND5RC', '6MT', '2WD', 1496, 'CONVERTIBLE', '1130', '2', 'petrol', 5676593, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'Roadster S leather'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'ROADSTER S LEATHER PACKAGE', '5BA-ND5RE', '6MT', '2WD', 1496, 'CONVERTIBLE', '1140', '2', 'petrol', 7177557, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'ROADSTER S LEATHER PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'ROADSTER S PACKAGE', '5BA-ND5RC', '6MT', '2WD', 1496, 'CONVERTIBLE', '1120', '2', 'petrol', 5689118, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'ROADSTER S PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'ROADSTER S SPECIAL PACKAGE', '5BA-ND5RC', '6MT', '4WD', 1496, 'CONVERTIBLE', '1120', '2', 'diesel', 5737602, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'ROADSTER S SPECIAL PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'SCRUM BUSTER', '5BD-DG17V', '4AT', '2WD', 658, 'VAN', '1370', '4', 'petrol', 2637697, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'SCRUM BUSTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'Scrum PZ Turbo Special', 'ABA-DG17W', '4AT', '2WD', 658, 'VAN', '1190', '4', 'petrol', 3338079, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'Scrum PZ Turbo Special'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'SCRUM TRUCK KC', '3BD-DG16T', '4AT', '2WD', 658, 'TRUCK', '1210', '2', 'petrol', 2302152, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'SCRUM TRUCK KC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'SCRUM TRUCK KC', '3BD-DG16T', '3AT', '2WD', 658, 'TRUCK', '1190', '2', 'petrol', 1951051, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'SCRUM TRUCK KC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'SCRUM TRUCK KC', 'EBD-DG16T', '3AT', '2WD', 658, 'TRUCK', '1160', '2', 'petrol', 1733280, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'SCRUM TRUCK KC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'SCRUM VAN  BUSTER', '5BD-DG17V', '4AT', '2WD', 658, 'VAN', '1370', '4', 'petrol', 2802136, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'SCRUM VAN  BUSTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'SCRUM VAN BUSTER', 'HBD-DG17V', '4AT', '2WD', 658, 'VAN', '1360', '4', 'petrol', 2379725, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'SCRUM VAN BUSTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'SCRUM VAN BUSTER', '5BD-DG17V', '4AT', '2WD', 658, 'VAN', '1370', '4', 'petrol', 2802136, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'SCRUM VAN BUSTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'SCRUM WAGON PZ TURBO SPECIAL', '3BA-DG17W', '4AT', '4WD', 658, 'WAGON', '1200', '4', 'petrol', 3637666, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'SCRUM WAGON PZ TURBO SPECIAL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'SCRUM WAGON PZ TURBO SPECIAL', 'ABA-DG17W', '4AT', '2WD', 658, 'WAGON', '1190', '4', 'petrol', 3191821, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'SCRUM WAGON PZ TURBO SPECIAL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'SCRUM WAGON PZ TURBO SPECIAL', '3DA-DG17W', '6AT', '2WD', 658, 'WAGON', '1190', '4', 'petrol', 3191821, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'SCRUM WAGON PZ TURBO SPECIAL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'SCRUM WAGON PZ TURBO SPECIAL', '3BA-DG17W', '4AT', '2WD', 658, 'WAGON', '1200', '4', 'petrol', 3593223, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'SCRUM WAGON PZ TURBO SPECIAL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'SCRUM WAGON PZ-S', '3BA-DG17W', 'CVT', '2WD', 658, 'WAGON', '1220', '4', 'petrol', 3922102, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'SCRUM WAGON PZ-S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'SCRUMWAGON PZ TURBO SPECIAL', '3BA-DG17W', '2WD', '4AT', 658, 'WAGON', '1200', '4', 'petrol', 3637666, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'SCRUMWAGON PZ TURBO SPECIAL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'TITAN', '2RG-LHR88A', '6AMT', '2WD', 2999, 'TRUCK', '3915', '3', 'diesel', 8194193, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'TITAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'TITAN', '2RG-LLR88AR', '6AMT', '2WD', 2999, 'TRUCK', '4675', '3', 'diesel', 10649926, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'TITAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'TITAN', 'TRG-LLR85AR', '6AT', '2WD', 2999, 'TRUCK', '4605', '3', 'diesel', 9176907, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'TITAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'TITAN DUMP', 'TRG-LJR85AD', '6AMT', '4WD', 2999, 'TRUCK', '4885', '3', 'diesel', 9115882, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'TITAN DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'A-CLASS A180', NULL, 'AT', '2WD', 1300, 'SEDAN', NULL, '4', 'petrol', 5931058, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'A-CLASS A180'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'A-CLASS A180 EDITION 1', '5BA-177084', 'AT', '2WD', 1300, 'HATCHBACK', NULL, '5', 'petrol', 10662111, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'A-CLASS A180 EDITION 1'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'A-CLASS A180 STYLE', NULL, 'AT', '2WD', 1300, 'HATCHBACK', NULL, '5', 'petrol', 8538649, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'A-CLASS A180 STYLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'A-CLASS A180 STYLE', NULL, 'AT', '2WD', 1300, 'SEDAN', NULL, '4', 'petrol', 7109502, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'A-CLASS A180 STYLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'A-CLASS A180 STYLE AMG LEATHER EXCLUSIVE PACKAGE', NULL, 'AT', '2WD', 1300, 'HATCHBACK', NULL, '5', 'petrol', 7798629, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'A-CLASS A180 STYLE AMG LEATHER EXCLUSIVE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'A-CLASS A180 STYLE AMG LEATHER EXCLUSIVE PACKAGE', NULL, 'AT', '2WD', 1300, 'SEDAN', NULL, '4', 'petrol', 7719421, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'A-CLASS A180 STYLE AMG LEATHER EXCLUSIVE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'A-CLASS A180 STYLE AMG LINE', NULL, 'AT', '2WD', 1400, 'HATCHBACK', NULL, '5', 'petrol', 10179964, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'A-CLASS A180 STYLE AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'A-CLASS A180 STYLE AMG LINE', NULL, 'AT', '2WD', 1300, 'SEDAN', NULL, '4', 'petrol', 9580689, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'A-CLASS A180 STYLE AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'A-CLASS A200D', NULL, 'AT', '2WD', 2000, 'HATCHBACK', NULL, '5', 'diesel', 7646406, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'A-CLASS A200D'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'A-CLASS A200D', NULL, 'AT', '2WD', 2000, 'SEDAN', NULL, '4', 'diesel', 9024358, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'A-CLASS A200D'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'A-CLASS A200D AMG LINE', NULL, 'AT', '2WD', 2000, 'HATCHBACK', NULL, '5', 'diesel', 7647153, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'A-CLASS A200D AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'A-CLASS A200D AMG LINE', NULL, 'AT', '2WD', 2000, 'SEDAN', NULL, '4', 'diesel', 7265503, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'A-CLASS A200D AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'A-CLASS A200D AMG LINE PACKAGE', NULL, 'AT', '2WD', 2000, 'HATCHBACK', NULL, '5', 'diesel', 6603061, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'A-CLASS A200D AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'A-CLASS A200D AMG LINE PACKAGE', NULL, 'AT', '2WD', 2000, 'SEDAN', NULL, '4', 'diesel', 6830369, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'A-CLASS A200D AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'A-CLASS SEDAN', NULL, 'AT', '4WD', 2000, 'SEDAN', NULL, '5', 'diesel', 8875460, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'A-CLASS SEDAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'A-CLASS SEDAN', NULL, 'AT', '2WD', 2000, 'SEDAN', NULL, '5', 'diesel', 8194407, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'A-CLASS SEDAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'A-CLASS SEDAN A180 SEDAN', NULL, 'AT', '2WD', 1400, 'SEDAN', NULL, '4', 'petrol', 9183973, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'A-CLASS SEDAN A180 SEDAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'A-CLASS SEDAN A180 SEDAN AMG LINE PACKAGE', NULL, 'AT', '2WD', 1300, 'SEDAN', NULL, '4', 'petrol', 6724173, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'A-CLASS SEDAN A180 SEDAN AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'A-CLASS SEDAN A180 STYLE SEDAN AMG LEATHER EXCLUSIVE PACKAGE', NULL, 'AT', '2WD', 1300, 'SEDAN', NULL, '4', 'petrol', 11107491, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'A-CLASS SEDAN A180 STYLE SEDAN AMG LEATHER EXCLUSIVE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'A-CLASS SEDAN A180 STYLE SEDAN AMG LINE', NULL, 'AT', '2WD', 1300, 'SEDAN', NULL, '4', 'petrol', 8893388, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'A-CLASS SEDAN A180 STYLE SEDAN AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'A-CLASS SEDAN A200D SEDAN', NULL, 'AT', '2WD', 2000, 'SEDAN', NULL, '4', 'diesel', 6561538, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'A-CLASS SEDAN A200D SEDAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'A-CLASS SEDAN A200D SEDAN AMG LEATHER EXCLUSIVE PACKAGE', NULL, 'AT', '2WD', 2000, 'SEDAN', NULL, '5', 'diesel', 8982654, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'A-CLASS SEDAN A200D SEDAN AMG LEATHER EXCLUSIVE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'A-CLASS SEDAN A200D SEDAN AMG LINE', NULL, 'AT', '2WD', 2000, 'SEDAN', NULL, '4', 'diesel', 10417218, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'A-CLASS SEDAN A200D SEDAN AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'A-CLASS SEDAN A200D SEDAN AMG LINE PACKAGE', NULL, 'AT', '2WD', 2000, 'SEDAN', NULL, '5', 'diesel', 10264111, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'A-CLASS SEDAN A200D SEDAN AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'A-CLASS SEDAN A250 4MATIC EDITION 1 SEDAN', NULL, 'AT', '4WD', 2000, 'SEDAN', NULL, '4', 'petrol', 10508804, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'A-CLASS SEDAN A250 4MATIC EDITION 1 SEDAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'A-CLASS SEDAN A250 4MATIC SEDAN', NULL, 'AT', '4WD', 2000, 'SEDAN', NULL, '4', 'petrol', 9305627, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'A-CLASS SEDAN A250 4MATIC SEDAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'A-CLASS SEDAN A250 4MATIC SEDAN AMG LEATHER EXCLUSIVE PACKAGE', NULL, 'AT', '4WD', 2000, 'SEDAN', NULL, '5', 'petrol', 11952237, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'A-CLASS SEDAN A250 4MATIC SEDAN AMG LEATHER EXCLUSIVE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'A-CLASS SEDAN A250 4MATIC SEDAN AMG LEATHER EXCLUSIVE PACKAGE', NULL, 'AT', '4WD', 2000, 'SEDAN', NULL, '4', 'petrol', 11066886, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'A-CLASS SEDAN A250 4MATIC SEDAN AMG LEATHER EXCLUSIVE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'A-CLASS SEDAN A250 4MATIC SEDAN AMG LINE', NULL, 'AT', '4WD', 2000, 'SEDAN', NULL, '5', 'petrol', 12656919, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'A-CLASS SEDAN A250 4MATIC SEDAN AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'A-CLASS SEDAN A250 4MATIC SEDAN AMG LINE', NULL, 'AT', '4WD', 2000, 'SEDAN', NULL, '4', 'petrol', 11719370, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'A-CLASS SEDAN A250 4MATIC SEDAN AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'AMG A-CLASS A35 4MATIC', '4BA-177051M', 'AT', '4WD', 2000, 'SEDAN', NULL, '4', 'petrol', 10944165, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'AMG A-CLASS A35 4MATIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'AMG A-CLASS A45 S 4MATIC+', NULL, 'AT', '4WD', 2000, 'HATCHBACK', NULL, '5', 'petrol', 16593114, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'AMG A-CLASS A45 S 4MATIC+'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'AMG A-CLASS A45 S 4MATIC+', NULL, 'AT', '4WD', 2000, 'SEDAN', NULL, '5', 'petrol', 16517599, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'AMG A-CLASS A45 S 4MATIC+'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'AMG A-CLASS A45 S 4MATIC+', NULL, 'AT', '4WD', 2000, 'HATCHBACK', NULL, '4', 'petrol', 15363995, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'AMG A-CLASS A45 S 4MATIC+'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'AMG CLS-CLASS CLS53 4MATIC+', NULL, 'AT', '4WD', 3000, 'SEDAN', NULL, '4', 'hybrid', 22096247, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'AMG CLS-CLASS CLS53 4MATIC+'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'AMG E-CLASS E63 S 4MATIC+', NULL, 'AT', '4WD', 4000, 'SEDAN', NULL, '5', 'petrol', 41086354, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'AMG E-CLASS E63 S 4MATIC+'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'AMG E-CLASS STATIONWAGON E53 4MATIC+ STATIONWAGON', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '7', 'hybrid', 19280917, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'AMG E-CLASS STATIONWAGON E53 4MATIC+ STATIONWAGON'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'AMG EQE EQE53 4MATIC+', 'ZAA-297155', 'AT', '4WD', NULL, 'SEDAN', NULL, '4', 'electric', 16095928, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'AMG EQE EQE53 4MATIC+'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'AMG GLA-CLASS GLA35 4MATIC', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '7', 'petrol', 14459237, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'AMG GLA-CLASS GLA35 4MATIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'AMG GLA-CLASS GLA45 S 4MATIC+', '4BA-247754M', 'AT', '4WD', 2000, 'SUV', NULL, '7', 'petrol', 16423254, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'AMG GLA-CLASS GLA45 S 4MATIC+'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'AMG GLB GLB35 4MATIC', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '7', 'petrol', 12446202, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'AMG GLB GLB35 4MATIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'AMG GLC GLC43 4MATIC', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'petrol', 20231238, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'AMG GLC GLC43 4MATIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'AMG GLC GLC63 S 4MATIC+', NULL, 'AT', '4WD', 4000, 'SUV', NULL, '5', 'petrol', 25364562, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'AMG GLC GLC63 S 4MATIC+'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'AMG SL SL43', NULL, 'AT', '2WD', 2000, 'CONVERTIBLE', NULL, '2', 'petrol', 21767861, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'AMG SL SL43'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'AMG SL SL63 4MATIC+', NULL, 'AT', '4WD', 4000, 'CONVERTIBLE', NULL, '2', 'petrol', 45972847, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'AMG SL SL63 4MATIC+'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'B-CLASS', NULL, 'AT', '2WD', 1300, 'HATCHBACK', NULL, '5', 'petrol', 10975703, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'B-CLASS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'B-CLASS B180', NULL, 'AT', '2WD', 1400, 'HATCHBACK', NULL, '5', 'petrol', 8020103, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'B-CLASS B180'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'B-CLASS B180 AMG LEATHER EXCLUSIVE PACKAGE', NULL, 'AT', '2WD', 1300, 'HATCHBACK', NULL, '5', 'petrol', 9661362, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'B-CLASS B180 AMG LEATHER EXCLUSIVE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'B-CLASS B180 AMG LINE', NULL, 'AT', '2WD', 1300, 'HATCHBACK', NULL, '5', 'petrol', 9172961, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'B-CLASS B180 AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'B-CLASS B200D', NULL, 'AT', '2WD', 2000, 'HATCHBACK', NULL, '5', 'petrol', 7051126, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'B-CLASS B200D'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'B-CLASS B200D AMG LEATHER EXCLUSIVE PACKAGE', NULL, 'AT', '2WD', 2000, 'HATCHBACK', NULL, '4', 'diesel', 9762975, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'B-CLASS B200D AMG LEATHER EXCLUSIVE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'B-CLASS B200D AMG LINE', NULL, 'AT', '2WD', 2000, 'HATCHBACK', NULL, '4', 'diesel', 8066038, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'B-CLASS B200D AMG LINE'
);