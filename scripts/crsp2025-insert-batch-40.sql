INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', 'RIFTER GT', 'VR3ECYHZ3NJ71', 'AT', '2WD', 1500, 'WAGON', NULL, NULL, 'diesel', 4304262, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = 'RIFTER GT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '308 GT BLUE HDI', 'VR3FBYHZTRY50', 'AT', '2WD', 1500, 'SUV', NULL, NULL, 'diesel', 5751979, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '308 GT BLUE HDI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '3008 BLUE HDI SPECIAL EDITION', 'LDA-P84AH01', 'AT', '2WD', 2000, 'SUV', NULL, NULL, 'diesel', 2519918, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '3008 BLUE HDI SPECIAL EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', 'RIFTER', 'VR3ECYHZRKJ83', 'AT', '2WD', 1500, 'WAGON', NULL, NULL, 'diesel', 3373558, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = 'RIFTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '3008 ALLURE LED PACKAGE', 'VF3M45GZWJS14', 'AT', '2WD', 1600, 'HATCHBACK', NULL, NULL, 'petrol', 2632637, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '3008 ALLURE LED PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', 'RIFTER ALLURE', 'VR3ECYHZRMJ84', 'AT', '2WD', 1500, 'WAGON', NULL, NULL, 'diesel', 3907987, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = 'RIFTER ALLURE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', 'E-2008 GT LINE', 'ZAA-P24ZK01', 'AT', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 3523410, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = 'E-2008 GT LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '3008 GT BLUE HDI', 'VF3MJEHZRKS26', 'AT', '2WD', 2000, 'SUV', NULL, NULL, 'diesel', 3157180, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '3008 GT BLUE HDI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', 'E-208 ALLURE', 'VR3UHZKXZLT00', 'AT', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 4018612, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = 'E-208 ALLURE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '408 GT', 'VR3FPHNSTPY54', 'AT', '2WD', 1200, 'SUV', NULL, NULL, 'petrol', 6460939, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '408 GT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '508 GT BLUE HDI PREMIUM LEATHER EDITION', 'VR3FHEHZRLY03', 'AT', '2WD', 2000, 'HATCHBACK', NULL, NULL, 'diesel', 4052386, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '508 GT BLUE HDI PREMIUM LEATHER EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '408', 'VR3FPHNSTPY62', 'AT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'hybrid', 6490544, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '408'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '3008 GT', 'VF3M45GFUPS01', 'AT', '2WD', 1600, 'SUV', NULL, NULL, 'petrol', 5742956, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '3008 GT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '3008 GT BLUE HDI', 'VF3MJEHZRKS51', 'AT', '2WD', 2000, 'SUV', NULL, NULL, 'diesel', 3708108, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '3008 GT BLUE HDI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '2008 GT DRIVE EDITION', 'VR3USHNSSMJ71', 'AT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 4141727, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '2008 GT DRIVE EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', 'RIFTER LONG GT', 'VR3EBYHZ4RJ69', 'AT', '2WD', 1500, 'WAGON', NULL, NULL, 'diesel', 6653078, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = 'RIFTER LONG GT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '3008 CROSSCITY', 'ABA-P845G01', 'AT', '2WD', 1600, 'SUV', NULL, NULL, 'petrol', 3373963, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '3008 CROSSCITY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '508 GT BLUE HDI', 'VR3FHEHZRKY07', 'AT', '2WD', 2000, 'SUV', NULL, NULL, 'diesel', 3889640, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '508 GT BLUE HDI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '508 GT BLUE HDI PREMIUM LEATHER EDITION', 'VR3FHEHZRLY05', 'AT', '2WD', 2000, 'HATCHBACK', NULL, NULL, 'diesel', 5259574, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '508 GT BLUE HDI PREMIUM LEATHER EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '3008 BLUE HDI CLEAN EDITION', 'LDA-P84AH01', 'AT', '2WD', 2000, 'SUV', NULL, NULL, 'diesel', 3539452, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '3008 BLUE HDI CLEAN EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '508 GT LINE', 'VR3F45GFRKY21', 'AT', '2WD', 1600, 'HATCHBACK', NULL, NULL, 'petrol', 3990749, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '508 GT LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '308 SW GT BLUE HDI', 'VR3FCYHZTNY57', 'AT', '2WD', 1500, 'SUV', NULL, NULL, 'diesel', 5456515, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '308 SW GT BLUE HDI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '2008 GT LINE', '5BA-P24HN05', 'AT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 3189546, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '2008 GT LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '5008 GT LINE BLUE HDI', 'VF3MJEHZRLS07', 'AT', '2WD', 2000, 'SUV', NULL, NULL, 'diesel', 4163627, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '5008 GT LINE BLUE HDI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '508 GT', 'VR3F35GFTMY00', 'AT', '2WD', 1600, 'HATCHBACK', NULL, NULL, 'petrol', 4695558, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '508 GT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '3008 GT BLUE HDI RED NAPPA', 'VF3MJEHZRMS17', 'AT', '2WD', 2000, 'SUV', NULL, NULL, 'diesel', 4755506, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '3008 GT BLUE HDI RED NAPPA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '508 SW GT LINE', 'VR3F45GFRKY21', 'AT', '2WD', 1600, 'SUV', NULL, NULL, 'petrol', 4292599, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '508 SW GT LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', 'RIFTER GT LINE FIRST LIMITED', '3DA-K9PYH01', 'AT', '2WD', 1500, 'WAGON', NULL, NULL, 'diesel', 4304262, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = 'RIFTER GT LINE FIRST LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '3008 GT BLUE HDI BLACK PACK', '3DA-P84AH01', 'AT', '2WD', 2000, 'SUV', NULL, NULL, 'diesel', 7757328, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '3008 GT BLUE HDI BLACK PACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '308 GTI BY SPORT', 'VF3L35GNHKS05', 'AT', '2WD', 1600, 'SUV', NULL, NULL, 'petrol', 3918981, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '308 GTI BY SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '5008 GT', '5BA-P875G06', 'AT', '2WD', 1600, 'SUV', NULL, NULL, 'petrol', 7837962, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '5008 GT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '508 SW GT BLUE HDI', 'VR3FJEHZRKY17', 'AT', '2WD', 2000, 'HATCHBACK', NULL, NULL, 'diesel', 4417139, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '508 SW GT BLUE HDI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '508 SW GT LINE', 'VR3F45GFRKY04', 'AT', '2WD', 1600, 'HATCHBACK', NULL, NULL, 'petrol', 3962253, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '508 SW GT LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '408', 'VR3F3DGYTRY50', 'AT', '2WD', 1600, 'HATCHBACK', NULL, NULL, 'hybrid', 8047568, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '408'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '308 SW GT HYBRID', 'VR3F4DGYTPY54', 'AT', '2WD', 1600, 'SUV', NULL, NULL, 'hybrid', 8063610, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '308 SW GT HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '5008 GT EXECUTIVE EDITION', '5BA-P875G06', 'AT', '2WD', 1600, 'SUV', NULL, NULL, 'petrol', 8065088, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '5008 GT EXECUTIVE EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '3008', 'VF3MJAHWWJS10', 'AT', '2WD', 2000, 'SUV', NULL, NULL, 'diesel', 3535231, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '3008'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '5008 GT BLUE HDI', 'VF3MJAHWWHL07', 'AT', '2WD', 2000, 'SUV', NULL, NULL, 'diesel', 3571748, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '5008 GT BLUE HDI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '3008 GT EXECUTIVE EDITION', '5BA-P845G06', 'AT', '2WD', 1600, 'SUV', NULL, NULL, 'petrol', 8208625, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '3008 GT EXECUTIVE EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '5008 CROSSCITY BLUE HDI', 'VF3MJEHZRLS10', 'AT', '2WD', 2000, 'SUV', NULL, NULL, 'diesel', 4679305, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '5008 CROSSCITY BLUE HDI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '508 SW GT HYBRID', '3LA-R85G06H', 'AT', '2WD', 1600, 'HATCHBACK', NULL, NULL, 'petrol', 5281527, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '508 SW GT HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '3008 GT HYBRID4', 'VF3M45GBUMS02', 'AT', '2WD', 1600, 'SUV', NULL, NULL, 'hybrid', 5341474, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '3008 GT HYBRID4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '5008 GT BLUE HDI RED NAPPA', 'VF3MJEHZRMS20', 'AT', '2WD', 2000, 'SUV', NULL, NULL, 'diesel', 6468239, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '5008 GT BLUE HDI RED NAPPA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '408 GT HYBRID', '3LA-P545G06H', 'AT', '2WD', 1600, 'HATCHBACK', NULL, NULL, 'hybrid', 7725243, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '408 GT HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '508 GT HYBRID', 'VR3F4DGZTMY50', 'AT', '2WD', 1600, 'HATCHBACK', NULL, NULL, 'petrol', 6613254, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '508 GT HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '2008 GT DEBUT EDITION', 'VR3USHNSSPJ84', 'AT', '2WD', 1200, 'SUV', NULL, NULL, 'petrol', 4841399, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '2008 GT DEBUT EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 BOXSTER', NULL, '6 MT', '2WD', 2000, 'CONVERTIBLE', NULL, NULL, 'petrol', 18251145, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 BOXSTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 BOXSTER', NULL, '7 AT', '2WD', 2000, 'CONVERTIBLE', NULL, NULL, 'petrol', 18869874, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 BOXSTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 BOXSTER GTS 4.0', NULL, '6 MT', '4WD', 4000, 'CONVERTIBLE', NULL, NULL, 'petrol', 28904402, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 BOXSTER GTS 4.0'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 BOXSTER GTS 4.0', NULL, '7 AT', '4WD', 4000, 'CONVERTIBLE', NULL, NULL, 'petrol', 29693236, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 BOXSTER GTS 4.0'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 BOXSTER S', NULL, '6 MT', '4WD', 2500, 'CONVERTIBLE', NULL, NULL, 'petrol', 21763579, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 BOXSTER S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 BOXSTER S', NULL, '7 AT', '4WD', 2500, 'CONVERTIBLE', NULL, NULL, 'petrol', 22382308, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 BOXSTER S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 BOXSTER STYLE EDITION', NULL, '6 MT', '2WD', 2000, 'CONVERTIBLE', NULL, NULL, 'petrol', 18818538, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 BOXSTER STYLE EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 BOXSTER STYLE EDITION', NULL, '7 AT', '2WD', 2000, 'CONVERTIBLE', NULL, NULL, 'petrol', 19539938, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 BOXSTER STYLE EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 CAYMAN', NULL, '6 MT', '2WD', 2000, 'COUPE', NULL, NULL, 'petrol', 17899902, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 CAYMAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 CAYMAN', NULL, '7 AT', '2WD', 2000, 'COUPE', NULL, NULL, 'petrol', 18507823, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 CAYMAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 CAYMAN GT4 RS', NULL, '7 AT', '4WD', 4000, 'COUPE', NULL, NULL, 'petrol', 49071624, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 CAYMAN GT4 RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 CAYMAN GTS 4.0', NULL, '6 MT', '4WD', 4000, 'COUPE', NULL, NULL, 'petrol', 28523888, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 CAYMAN GTS 4.0'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 CAYMAN GTS 4.0', NULL, '7 AT', '4WD', 4000, 'COUPE', NULL, NULL, 'petrol', 29312722, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 CAYMAN GTS 4.0'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 CAYMAN S', NULL, '6 MT', '4WD', 2500, 'COUPE', NULL, NULL, 'petrol', 21425845, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 CAYMAN S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 CAYMAN S', NULL, '7 AT', '4WD', 2500, 'COUPE', NULL, NULL, 'petrol', 22044574, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 CAYMAN S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 CAYMAN STYLE EDITION', NULL, '6 MT', '2WD', 2000, 'COUPE', NULL, NULL, 'petrol', 18467295, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 CAYMAN STYLE EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 CAYMAN STYLE EDITION', NULL, '7 AT', '2WD', 2000, 'COUPE', NULL, NULL, 'petrol', 19188695, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 CAYMAN STYLE EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 SPYDER RS', NULL, '7 AT', '4WD', 4000, 'CONVERTIBLE', NULL, NULL, 'petrol', 49071624, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 SPYDER RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 CARRERA', NULL, '8AT', '4WD', 3000, 'COUPE', NULL, NULL, 'petrol', 34891975, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 CARRERA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 CARRERA', NULL, '8AT', '4WD', 3000, 'COUPE', NULL, NULL, 'petrol', 37529002, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 CARRERA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 CARRERA 4', NULL, '8AT', '4WD', 3000, 'CONVERTIBLE', NULL, NULL, 'petrol', 39736432, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 CARRERA 4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 CARRERA 4', NULL, '8AT', '4WD', 3000, 'COUPE', NULL, NULL, 'petrol', 37076439, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 CARRERA 4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 CARRERA 4 GTS', NULL, '8AT', '4WD', 3000, 'COUPE', NULL, NULL, 'petrol', 50389913, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 CARRERA 4 GTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 CARRERA 4 GTS', NULL, '8AT', '4WD', 3600, 'COUPE', NULL, NULL, 'petrol/electric', 58730817, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 CARRERA 4 GTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 CARRERA 4S', NULL, '8AT', '4WD', 3000, 'CONVERTIBLE', NULL, NULL, 'petrol', 44670050, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 CARRERA 4S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 CARRERA 4S', NULL, '8AT', '4WD', 3000, 'COUPE', NULL, NULL, 'petrol', 42010057, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 CARRERA 4S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 CARRERA GTS', NULL, '8AT', '4WD', 3000, 'CONVERTIBLE', NULL, NULL, 'petrol', 52267714, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 CARRERA GTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 CARRERA GTS', NULL, '8AT', '4WD', 3600, 'CONVERTIBLE', NULL, NULL, 'petrol/electric', 61087074, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 CARRERA GTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 CARRERA GTS', NULL, '7MT', '4WD', 3000, 'COUPE', NULL, NULL, 'petrol', 47782606, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 CARRERA GTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 CARRERA GTS', NULL, '8AT', '4WD', 3600, 'COUPE', NULL, NULL, 'petrol/electric', 55789154, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 CARRERA GTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 CARRERA S', NULL, '8AT', '4WD', 3000, 'CONVERTIBLE', NULL, NULL, 'petrol', 42470726, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 CARRERA S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 CARRERA S', NULL, '8AT', '4WD', 3000, 'COUPE', NULL, NULL, 'petrol', 39825593, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 CARRERA S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 CARRERA T', NULL, '6MT', '4WD', 3000, 'CONVERTIBLE', NULL, NULL, 'petrol', 44594397, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 CARRERA T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 CARRERA T', NULL, '8AT', '4WD', 3000, 'COUPE', NULL, NULL, 'petrol', 37581689, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 CARRERA T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 CARRERA T', NULL, '6MT', '4WD', 3000, 'COUPE', NULL, NULL, 'petrol', 41446716, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 CARRERA T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 DAKAR', NULL, '8AT', '4WD', 3000, 'COUPE', NULL, NULL, 'petrol', 66182355, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 DAKAR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 EDITION 50 YRS PORSCHE DESIGN', NULL, '8AT', '4WD', 3000, 'COUPE', NULL, NULL, 'petrol', 57509346, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 EDITION 50 YRS PORSCHE DESIGN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 GT3', NULL, '7AT', '4WD', 4000, 'COUPE', NULL, NULL, 'petrol', 61087074, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 GT3'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 GT3', NULL, '7MT', '4WD', 4000, 'COUPE', NULL, NULL, 'petrol', 61087074, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 GT3'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 GT3 RS', NULL, '7AT', '4WD', 4000, 'COUPE', NULL, NULL, 'petrol', 78678513, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 GT3 RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 GT3 TOURING PACKAGE', NULL, '6MT', '4WD', 4000, 'COUPE', NULL, NULL, 'petrol', 61087074, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 GT3 TOURING PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 GT3 TOURING PACKAGE', NULL, '7AT', '4WD', 4000, 'COUPE', NULL, NULL, 'petrol', 61087074, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 GT3 TOURING PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 S/T', NULL, '6MT', '4WD', 4000, 'COUPE', NULL, NULL, 'petrol', 96665100, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 S/T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 TARGA 4', NULL, '8AT', '4WD', 3000, 'CONVERTIBLE', NULL, NULL, 'petrol', 39736432, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 TARGA 4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 TARGA 4 GTS', NULL, '8AT', '4WD', 3000, 'CONVERTIBLE', NULL, NULL, 'petrol', 51074837, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 TARGA 4 GTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 TARGA 4S', NULL, '8AT', '4WD', 3000, 'CONVERTIBLE', NULL, NULL, 'petrol', 44670050, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 TARGA 4S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 TURBO', NULL, '8AT', '4WD', 3700, 'COUPE', NULL, NULL, 'petrol', 67789968, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 TURBO S', NULL, '8AT', '4WD', 3700, 'COUPE', NULL, NULL, 'petrol', 78839499, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 TURBO S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'CAYEN', NULL, '8AT', '4WD', 3000, 'SUV', NULL, NULL, 'petrol', 18737482, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'CAYEN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'MACAN (BASE)', NULL, '7 AT', '4WD', 2000, 'SUV', NULL, NULL, 'petrol', 12671780, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'MACAN (BASE)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'MACAN ELECTRIC', NULL, '1 AT', '4WD', NULL, 'SUV', NULL, NULL, 'electric', 17346018, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'MACAN ELECTRIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'MACAN ELECTRIC 4', NULL, '1 AT', '4WD', NULL, 'SUV', NULL, NULL, 'electric', 18156580, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'MACAN ELECTRIC 4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'MACAN ELECTRIC 4S', NULL, '1 AT', '4WD', NULL, 'SUV', NULL, NULL, 'electric', 20169474, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'MACAN ELECTRIC 4S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'MACAN ELECTRIC TURBO', NULL, '1 AT', '4WD', NULL, 'SUV', NULL, NULL, 'electric', 24911260, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'MACAN ELECTRIC TURBO'
);