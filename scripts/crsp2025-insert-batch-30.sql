INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-5 XD CX-5 XD L PACKAGE', '3DA-KF2P', '6AT', '2WD', 2188, 'SUV', '1905', '5', 'diesel', 7407180, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-5 XD CX-5 XD L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-5 XD EXCLUSIVE MODE', '3DA-KF2P', '6AT', '4WD', 2188, 'SUV', '1925', '5', 'diesel', 8404835, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-5 XD EXCLUSIVE MODE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-5 XD EXCLUSIVE MODE', '3DA-KF2P', '6AT', '2WD', 2188, 'SUV', '1925', '5', 'diesel', 8404835, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-5 XD EXCLUSIVE MODE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-5 XD L PACKAGE', '3DA-KF2P', '6AT', '2WD', 2188, 'SUV', '1905', '5', 'diesel', 6491804, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-5 XD L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-5 XD L PACKAGE', 'LDA-KF2P', '6AT', '2WD', 2188, 'SUV', '1895', '5', 'diesel', 6428675, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-5 XD L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-5 XD Passenger Lift-up', 'LDA-KF2P', '6AT', '2WD', 2188, 'SUV', '1935', '5', 'diesel', 6586498, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-5 XD Passenger Lift-up'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-6 XD L PACKAGE', '3DA-KG2P', '6AT', '2WD', 2188, 'SUV', '2170', '5', 'diesel', 9221939, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-6 XD L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-60 25S EXCLUSIVE MODE', '5BA-KH5P', '8AT', '4WD', 2488, 'SUV', '1995', '5', 'petrol', 8506683, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-60 25S EXCLUSIVE MODE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-60 25S EXCLUSIVE MODE', '5BA-KH5P', '8AT', 'AWD', 2488, 'SUV', '1725', '5', 'petrol', 8090029, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-60 25S EXCLUSIVE MODE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-60 PHEV MODERN', '5LA-KH5S3P', '8AT', 'AWD', 2488, 'SUV', '2365', '5', 'petrol', 13599120, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-60 PHEV MODERN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-60 XD EXCLUSIVE MODE', '3DA-KH3P', '8AT', '4WD', 3283, 'SUV', '1685', '5', 'diesel', 10074691, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-60 XD EXCLUSIVE MODE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-60 XD EXCLUSIVE MODE', '3BA-KH3P', '8AT', '2WD', 3283, 'SUV', '2115', '5', 'diesel', 10524677, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-60 XD EXCLUSIVE MODE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-60 XD HYBRID EXCLUSIVE MODERN', '3CA-KH3R3P', '8AT', 'AWD', 3283, 'SUV', '1655', '5', 'diesel', 11487147, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-60 XD HYBRID EXCLUSIVE MODERN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-60 XD HYBRID PREMIUM MODE', '3CA-KH3R3P', '8AT', '4WD', 3283, 'SUV', '2215', '5', 'diesel', 12887104, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-60 XD HYBRID PREMIUM MODE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-60 XD HYBRID PREMIUM MODERN', '3CA-KH3R3P', '8AT', 'AWD', 3283, 'SUV', '1725', '5', 'diesel', 12437118, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-60 XD HYBRID PREMIUM MODERN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-60 XD HYRBID EXCLUSIVE MODE', '3CA-KH3R3P', '8AT', 'AWD', 1997, 'SUV', '2185', '5', 'diesel', 11168639, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-60 XD HYRBID EXCLUSIVE MODE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-60 XD PREMIUM SPORTS', '3CA-KH3R3P', '8AT', 'AWD', 3283, 'SUV', '2215', '5', 'diesel', 12887104, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-60 XD PREMIUM SPORTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-8 25ST L PACKAGE', '5BA-KG5P', '6AT', '2WD', 2488, 'SUV', '2140', '6', 'petrol', 8326765, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-8 25ST L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-8 25T EXCLUSIVE MODE', '5BA-KG5P', '6AT', '4WD', 2488, 'SUV', '2140', '6', 'petrol', 10147837, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-8 25T EXCLUSIVE MODE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-8 25T EXCLUSIVE MODE', '5BA-KG5P', '6AT', '2WD', 2488, 'SUV', '2170', '6', 'petrol', 10022840, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-8 25T EXCLUSIVE MODE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-8 25T L PACKAGE', '5BA-KG5P', '6AT', 'AWD', 2488, 'SUV', '2210', '6', 'petrol', 8269948, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-8 25T L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-8 XD EXCLUSIVE MODE', '3DA-KG2P', 'AWD', '6AT', 2188, 'SUV', '2170', '6', 'diesel', 10147837, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-8 XD EXCLUSIVE MODE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-8 XD L PACKAGE', '3DA-KG2P', '6AT', '2WD', 2188, 'SUV', '1210', '6', 'petrol', 9221939, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-8 XD L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-8 XD L PACKAGE', '3DA-KG2P', '6AT', '2WD', 2188, 'SUV', '2160', '6', 'diesel', 8482484, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-8 XD L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-80 PHEV PREMIUM MODERN', '5KA-KH5S3P', '8AT', 'AWD', 2488, 'SUV', '2570', '6', 'petrol', 14987966, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-80 PHEV PREMIUM MODERN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-80 PHEV PREMIUM SPORTS', '5LA-KH5S3P', '8AT', 'AWD', 2488, 'SUV', '2570', '6', 'petrol', 14987966, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-80 PHEV PREMIUM SPORTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-80 XD EXECUTIVE', '3DA-KL3P', '8AT', '2WD', 3283, 'SUV', '2330', '6', 'diesel', 11849636, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-80 XD EXECUTIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-80 XD-HYBRID EXECUTIVE MODERN', '3CA-KL3R3P', '8AT', 'AWD', 3283, 'SUV', '2420', '6', 'diesel', 13562084, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-80 XD-HYBRID EXECUTIVE MODERN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-3 XD L PACKAGE', '3DA-DK8FW', '6AT', '2WD', 1756, 'SUV', '1575', '5', 'diesel', 5525925, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-3 XD L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'Demio 13S Passenger Swivel', 'DBA-DJ3FS', '6AT', '2WD', 1298, 'HATCHBACK', '1335', '5', 'petrol', 3102531, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'Demio 13S Passenger Swivel'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'Demio 13S Touring L Package', 'DBA-DJ3FS', '6AT', '2WD', 1298, 'HATCHBACK', '1315', '5', 'petrol', 3292828, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'Demio 13S Touring L Package'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'DEMIO 15S TOURING L PACKAGE', '6BA-DJFS', '6AT', '2WD', 1496, 'HATCHBACK', '1335', '5', 'petrol', 3393835, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'DEMIO 15S TOURING L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'DEMIO XD TOURING L PACKAGE', 'LDA-DJ5FS', '6AT', '2WD', 1498, 'HATCHBACK', '1405', '5', 'diesel', 3818065, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'DEMIO XD TOURING L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'FAMILIA VAN GX', '6AE-NHP160M', 'CVT', '2WD', 1496, 'VAN', '1620', '5', 'petrol', 4188760, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'FAMILIA VAN GX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'FAMILIA VAN GX', 'DBE-NCP160M', 'CVT', '2WD', 1496, 'VAN', '1600', '5', 'diesel', 3183741, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'FAMILIA VAN GX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'FAMILIA VAN GX', '5BE-NCP160M', 'CVT', '2WD', 1496, 'VAN', '1600', '5', 'petrol', 3502115, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'FAMILIA VAN GX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'FLAIR CROSSOVER HYBRID XT', '4AA-MS52S', 'CVT', 'AWD', 658, 'WAGON', '1110', '4', 'petrol', 3688776, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'FLAIR CROSSOVER HYBRID XT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'FLAIR CROSSOVER HYBRID XT', '3DA-DK8FW', 'CVT', 'AWD', 658, 'WAGON', '1100', '4', 'petrol', 3635444, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'FLAIR CROSSOVER HYBRID XT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'FLAIR CROSSOVER XT', 'DAA-MS41S', 'CVT', 'AWD', 658, 'WAGON', '1090', '4', 'petrol', 3151418, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'FLAIR CROSSOVER XT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'FLAIR CROSSOVER XT', 'DAA-MS41S', 'CVT', 'AWD', 658, 'WAGON', '1090', '4', 'petrol', 3151418, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'FLAIR CROSSOVER XT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'FLAIR CROSSOVER ZS', '5AA-MS92S', 'CVT', '2WD', 657, 'WAGON', '1165', '4', 'petrol', 3953212, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'FLAIR CROSSOVER ZS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'Flair Custom Style XS', 'DAA-MM42S', 'CVT', '2WD', 658, 'WAGON', '1100', '4', 'petrol', 3240305, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'Flair Custom Style XS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'FLAIR HYBRID XS', '5AA-MJ95S', 'CVT', '2WD', 657, 'WAGON', '1010', '4', 'petrol', 3297677, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'FLAIR HYBRID XS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'FLAIR HYBRID XS', 'DAA-MJ55S', 'CVT', '2WD', 658, 'WAGON', '1010', '4', 'petrol', 2636283, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'FLAIR HYBRID XS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'FLAIR HYBRID XS', 'DAA-MJ55S', 'CVT', '2WD', 658, 'WAGON', '1010', '4', 'petrol', 2636283, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'FLAIR HYBRID XS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'FLAIR STYLE HYBRID XT', '4AA-MM53S', 'CVT', '2WD', 658, 'WAGON', '1110', '4', 'petrol', 3748774, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'FLAIR STYLE HYBRID XT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'FLAIR WAGON CUSTOM STYLE HYBRID XT', 'DAA-MM53S', 'CVT', '2WD', 658, 'WAGON', '1120', '4', 'petrol', 3500903, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'FLAIR WAGON CUSTOM STYLE HYBRID XT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'FLAIR WAGON CUSTOM STYLE HYBRID XT', '4AA-MM53S', '4AT', '2WD', 658, 'WAGON', '1120', '4', 'petrol', 3529185, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'FLAIR WAGON CUSTOM STYLE HYBRID XT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'FLAIR WAGON CUSTOM STYLE XT', '4AA-MM54S', 'CVT', '2WD', 658, 'WAGON', '1130', '4', 'petrol', 4606525, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'FLAIR WAGON CUSTOM STYLE XT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'FLAIR WAGON GYBRID XG', '4AAMM53S', 'CVT', '2WD', 658, 'WAGON', '1130', '4', 'petrol', 3242325, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'FLAIR WAGON GYBRID XG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'FLAIR WAGON HYBRID XG', '5AA-MM53S', 'CVT', '2WD', 658, 'WAGON', '1130', '4', 'petrol', 3268587, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'FLAIR WAGON HYBRID XG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'FLAIR WAGON HYBRID XG', 'DAA-MM53S', 'CVT', '2WD', 658, 'WAGON', '1130', '4', 'petrol', 3232224, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'FLAIR WAGON HYBRID XG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'FLAIR WAGON HYBRID XS', '5AA-MM53S', 'CVT', '2WD', 658, 'WAGON', '1090', '4', 'petrol', 3097683, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'FLAIR WAGON HYBRID XS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'FLAIR WAGON HYBRID XS', 'DAA-MM53S', 'CVT', '2WD', 658, 'WAGON', '1090', '4', 'petrol', 2747390, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'FLAIR WAGON HYBRID XS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'FLAIR WAGON HYBRID XS', '5AA-MJ95S', 'CVT', '2WD', 657, 'WAGON', '1010', '4', 'petrol', 2871023, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'FLAIR WAGON HYBRID XS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'FLAIR WAGON STYLE HYBRID XT', '4AA-MM53S', 'CVT', '2WD', 658, 'WAGON', '1120', '4', 'petrol', 3910991, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'FLAIR WAGON STYLE HYBRID XT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'FLAIR WAGON TOUGH  STYLE HYBRID XT', '4AA-MM53S', 'CVT', '2WD', 658, 'WAGON', '1110', '4', 'petrol', 3753824, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'FLAIR WAGON TOUGH  STYLE HYBRID XT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'FLAIR WAGON TOUGH STYLE HYBRID XT', 'DAA-MM53S', 'CVT', '2WD', 658, 'WAGON', '1110', '4', 'petrol', 3918132, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'FLAIR WAGON TOUGH STYLE HYBRID XT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'flair wagon XE', 'DBA-MM32S', 'CVT', '2WD', 658, 'WAGON', '1100', '4', 'petrol', 3010009, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'flair wagon XE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'FLAIR WAGON XG', '5AA-MM94S', 'CVT', '2WD', 657, 'WAGON', '1130', '4', 'petrol', 3698876, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'FLAIR WAGON XG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'FLAIR WAGONCUSTOM STYLE HYBRID XT', '4AA-MM53S', '2WD', 'CVT', 658, 'WAGON', '1120', '4', 'petrol', 3910991, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'FLAIR WAGONCUSTOM STYLE HYBRID XT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'FLAIR WAGOON HYBRID XG', '5AA-MM53S', '2WD', 'CVT', 658, 'WAGON', '1130(1045)', '4', 'petrol', 3268587, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'FLAIR WAGOON HYBRID XG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'Flair XS', 'DAA-MM42S', 'CVT', '2WD', 658, 'WAGON', '1070', '4', 'petrol', 2747390, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'Flair XS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'FLAIRCROSSOVER HYBRID XT', '4AA-MS52S', '2WD', 'CVT', 658, 'WAGON', '1110', '4', 'petrol', 3688776, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'FLAIRCROSSOVER HYBRID XT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'FLAIRCROSSOVER XS', 'DAA-MS41S', NULL, '2WD', 658, 'WAGON', '1070', '4', 'petrol', 3034250, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'FLAIRCROSSOVER XS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAXZDA X PROACTIVETOURING SELECTION', '5AA-BPEK3R', '4WD', '6AT', 1997, 'SUV', '1795', '5', 'petrol', 6481283, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAXZDA X PROACTIVETOURING SELECTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA CX-5 XD PACKAGE', '3DA-KF2P', '6AT', '2WD', 2188, 'SUV', '2150', '5', 'diesel', 7407180, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA CX-5 XD PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA FLAIR HYBRID HYBRID XS', '5AA-MJ95S', 'CVT', '2WD', 657, 'WAGON', '1090', '4', 'petrol', 3111016, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA FLAIR HYBRID HYBRID XS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA FLAIR WAGON HYBRID XG', '5AA-MM53S', 'CVT', '2WD', 658, 'WAGON', '1130', '4', 'petrol', 3242325, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA FLAIR WAGON HYBRID XG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA ROADSTER S RF VS BURGUNDY SELECTION', '5BA-NDERC', '6MT', '2WD', 1997, 'WAGON', '1210', '4', 'petrol', 7224105, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA ROADSTER S RF VS BURGUNDY SELECTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA ROADSTER S SPECIAL PACKAGE', '5BA-ND5RC', '6MT', '2WD', 1496, 'WAGON', '1120', '4', 'petrol', 5175599, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA ROADSTER S SPECIAL PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA TITAN', '2RG-LHR88A', '6AMT', 'AWD', 2999, 'TRUCK', '3915', '3', 'petrol', 7866425, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA TITAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA TITAN', '2RG-LHR88AR', '6AMT', 'AWD', 2999, 'TRUCK', '4675', '3', 'petrol', 10223929, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA TITAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA2  XD SPORT+', '3DA-DJ5FS', '4WD', '6AT', 1496, 'HATCHBACK', '1435', '5', 'diesel', 4853184, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA2  XD SPORT+'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA2 15 BD', '5BA-DJLFS', '6AT', '4WD', 1496, 'HATCHBACK', '1365', '5', 'petrol', 3517670, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA2 15 BD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA2 15 BD', '5BA-DJLFS', '6AT', '2WD', 1496, 'HATCHBACK', '1365', '5', 'petrol', 3517670, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA2 15 BD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA2 15BD', '5BA-DJLFS', '6AT', '2WD', 1496, 'HATCHBACK', '1140', '5', 'petrol', 4230981, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA2 15BD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA2 15S', '6BA-DJLFS', '6AT', '2WD', 1496, 'HATCHBACK', '1335', '5', 'petrol', 2888800, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA2 15S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA2 15S L PACKAGE', '5BA-DJLFS', '6AT', '2WD', 1496, 'HATCHBACK', '1365', '5', 'petrol', 4222093, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA2 15S L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA2 XD', '3DA-DJ5FS', '6AT', '2WD', 1498, 'HATCHBACK', '1445', '5', 'diesel', 4344311, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA2 XD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA2 XD', '3DA-DG17W', '6AT', '2WD', 1496, 'HATCHBACK', '1445', '5', 'diesel', 4344311, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA2 XD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA2 XD L PACKAGE', '3DA-DJ5FS', '6AT', '2WD', 1498, 'HATCHBACK', '1425', '5', 'petrol', 4966514, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA2 XD L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA2 XD L PACKAGE', '3DA-DJ5FS', '6AT', '2WD', 1498, 'HATCHBACK', '1425', '5', 'diesel', 4515013, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA2 XD L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA3   SEDAN X L PACKAGE', '3DA-BP8P', '6AT', '2WD', 1756, 'SEDAN', '1675', '5', 'diesel', 6256237, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA3   SEDAN X L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA3 20S RETRO SPORTS EDITION', '5AA-BPFJ3R', '6AT', '2WD', 1997, 'SEDAN', '1655', '5', 'petrol', 6293788, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA3 20S RETRO SPORTS EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA3 FASTBACK  20S PROACTIVE TOURING SELECTION', '5BA-BPFP', '6AT', '2WD', 1997, 'SEDAN', '1635', '5', 'petrol', 5044117, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA3 FASTBACK  20S PROACTIVE TOURING SELECTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA3 FASTBACK  X BURGUNDY SELECTION', '5AA-BPEP', '6AT', '2WD', 1997, 'SEDAN', '1997', '5', 'petrol', 7264009, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA3 FASTBACK  X BURGUNDY SELECTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA3 FASTBACK 15S', '6BA-BP5P', '6AT', '2WD', 1496, 'SEDAN', '1925', '5', 'petrol', 4813186, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA3 FASTBACK 15S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA3 FASTBACK 15S TOURING', '6BA-BP5P', '6AT', '2WD', 1496, 'SEDAN', '1615', '5', 'petrol', 4253294, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA3 FASTBACK 15S TOURING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA3 FASTBACK 20S PROACTIVE TOURING DSELECTION', '5BA-BPFP', '6AT', '2WD', 1997, 'SEDAN', '1635', '5', 'petrol', 5548527, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA3 FASTBACK 20S PROACTIVE TOURING DSELECTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA3 FASTBACK 20S PROACTIVE TOURING SELECTION', '5AA-BPFJ3R', '6AT', '4WD', 1498, 'SEDAN', '1655', '5', 'petrol', 7728652, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA3 FASTBACK 20S PROACTIVE TOURING SELECTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA3 FASTBACK 20S RETRO SPORTS EDITION', '5AA-BPFJ3R', '6AT', '2WD', 1997, 'SEDAN', '1655', '5', 'petrol', 6293788, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA3 FASTBACK 20S RETRO SPORTS EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA3 FASTBACK PROACTIVE TOURING SELECTION', '5AA-BPFJ3P', '6AT', '2WD', 1997, 'SEDAN', '2150', '5', 'petrol', 5689640, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA3 FASTBACK PROACTIVE TOURING SELECTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA3 FASTBACK X BURGUNDAY SELECTION', '5AA-BPEP', '6AT', '2WD', 1997, 'SEDAN', '2170', '5', 'petrol', 7587688, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA3 FASTBACK X BURGUNDAY SELECTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA3 FASTBACK X BURGUNDY SELECTION', '3AA-BPEP', '6AT', '2WD', 1997, 'SEDAN', '1715', '5', 'petrol', 6603646, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA3 FASTBACK X BURGUNDY SELECTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA3 FASTBACK XD TOURING', '3DA-BP8R', '6AT', '2WD', 1756, 'SEDAN', '1695', '5', 'diesel', 6548410, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA3 FASTBACK XD TOURING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA3 SEDAN 20S PROACTIVE TOURING SELECTION', '5AA-BPFJR', '4WD', '6AT', 1756, 'SEDAN', '1655', '5', 'petrol', 9508967, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA3 SEDAN 20S PROACTIVE TOURING SELECTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA3 SEDAN X L PACKAGE', '5AA-BPEP', '6AT', '2WD', 1997, 'SEDAN', '1120', '5', 'petrol', 7541393, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA3 SEDAN X L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA3 SEDAN X L PACKAGE', '3JAA-BPEP', '6AT', '2WD', 1997, 'SEDAN', '1715', '5', 'petrol', 6466866, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA3 SEDAN X L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'MAZDA3 SEDAN XD BLACK TONE EDITION', '3DA-BP8R', '4WD', '6AT', 1997, 'SEDAN', '1685', '5', 'diesel', 5955836, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'MAZDA3 SEDAN XD BLACK TONE EDITION'
);