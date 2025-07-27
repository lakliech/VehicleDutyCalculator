INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'EQA EQA250 AMG LINE PACKAGE', NULL, 'AT', '2WD', NULL, 'SUV', NULL, '5', 'electric', 7310171, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'EQA EQA250 AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'EQA EQA250 EDITION 1', 'ZAA-243701C', 'AT', '2WD', NULL, 'SUV', NULL, '5', 'electric', 10778823, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'EQA EQA250 EDITION 1'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'EQB EQB250', NULL, 'AT', '2WD', NULL, 'SUV', NULL, '5', 'electric', 10559998, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'EQB EQB250'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'EQB EQB250 AMG LINE PACKAGE', NULL, 'AT', '2WD', NULL, 'SUV', NULL, '5', 'electric', 11103029, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'EQB EQB250 AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'EQB EQB250+ AMG LINE PACKAGE', NULL, 'AT', '2WD', NULL, 'SUV', NULL, '5', 'electric', 11773795, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'EQB EQB250+ AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'EQB EQB350 4MATIC', NULL, 'AT', '4WD', NULL, 'SUV', NULL, '5', 'electric', 10360355, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'EQB EQB350 4MATIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'EQB EQB350 4MATIC AMG LINE PACKAGE', NULL, 'AT', '4WD', NULL, 'SUV', NULL, '5', 'electric', 10917442, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'EQB EQB350 4MATIC AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'EQC EQC400 4MATIC AMG LINE', NULL, 'AT', '4WD', NULL, 'SUV', NULL, '5', 'electric', 12754035, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'EQC EQC400 4MATIC AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'EQC EQC400 4MATIC AMG LINE PACKAGE', NULL, 'AT', '4WD', NULL, 'SUV', NULL, '7', 'electric', 14292782, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'EQC EQC400 4MATIC AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'EQE EQE350+ AMG LINE PACKAGE', NULL, 'AT', '4WD', NULL, 'SUV', NULL, '5', 'electric', 12609426, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'EQE EQE350+ AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'EQE SUV EQE350 4MATIC SUV AMG LINE PACKAGE', NULL, 'AT', '4WD', NULL, 'SUV', NULL, '5', 'electric', 15212967, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'EQE SUV EQE350 4MATIC SUV AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'EQE SUV EQE350 4MATIC SUV LAUNCH EDITION', 'ZAA-294612', 'AT', '4WD', NULL, 'SUV', NULL, '5', 'electric', 13582194, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'EQE SUV EQE350 4MATIC SUV LAUNCH EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'EQS EQS450+', 'ZAA-297123', 'AT', '2WD', NULL, 'SUV', NULL, '5', 'electric', 17503571, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'EQS EQS450+'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'EQS EQS450+ AMG LINE PACKAGE', NULL, 'AT', '2WD', NULL, 'SUV', NULL, '5', 'electric', 12425007, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'EQS EQS450+ AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'EQS SUV EQS450 4MATIC SUV AMG LINE PACKAGE', NULL, 'AT', '4WD', NULL, 'SUV', NULL, '5', 'electric', 17177275, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'EQS SUV EQS450 4MATIC SUV AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'EQS SUV EQS580 4MATIC SUV SPORT', 'ZAA-296644', 'AT', '4WD', NULL, 'SUV', NULL, '5', 'electric', 22555342, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'EQS SUV EQS580 4MATIC SUV SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'G-CLASS G350D', NULL, 'AT', '4WD', 3000, 'WAGON', NULL, '6', 'diesel', 28557822, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'G-CLASS G350D'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'G-CLASS G350D AMG LINE', NULL, 'AT', '4WD', 3000, 'WAGON', NULL, '6', 'diesel', 46648571, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'G-CLASS G350D AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'G-CLASS G350D HERITAGE EDITION', 'LDA-463348', 'AT', '4WD', 3000, 'WAGON', NULL, '6', 'diesel', 47409410, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'G-CLASS G350D HERITAGE EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'G-CLASS G400D', '3DA-463350', 'AT', '4WD', 3000, 'WAGON', NULL, '6', 'diesel', 47988202, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'G-CLASS G400D'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'G-CLASS G400D AMG LINE', NULL, 'AT', '4WD', 3000, 'WAGON', NULL, '5', 'diesel', 38596700, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'G-CLASS G400D AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'G-CLASS G400D MANUFAKTUR EDITION', NULL, 'AT', '4WD', 3000, 'WAGON', NULL, '5', 'diesel', 35230838, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'G-CLASS G400D MANUFAKTUR EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'G-CLASS G450D LAUNCH EDITION', '7CA-465310C', 'AT', '4WD', 3000, 'WAGON', NULL, '5', 'diesel', 43249699, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'G-CLASS G450D LAUNCH EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'G-CLASS G550 AMG LINE', NULL, 'AT', '4WD', 4000, 'WAGON', NULL, '5', 'petrol', 52522112, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'G-CLASS G550 AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLA-CLASS GLA180', NULL, 'AT', '2WD', 1400, 'SUV', NULL, '5', 'petrol', 9709587, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLA-CLASS GLA180'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLA-CLASS GLA180 AMG LINE PACKAGE', NULL, 'AT', '2WD', 1400, 'SUV', NULL, '5', 'petrol', 9579888, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLA-CLASS GLA180 AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLA-CLASS GLA200D 4MATIC', '3DA-247713M', 'AT', '4WD', 2000, 'SUV', NULL, '5', 'diesel', 12464918, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLA-CLASS GLA200D 4MATIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLA-CLASS GLA200D 4MATIC', '3DA-247713M', 'AT', '2WD', 1400, 'SUV', NULL, '7', 'petrol', 8131078, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLA-CLASS GLA200D 4MATIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLA-CLASS GLA200D 4MATIC AMG LINE', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'diesel', 12624092, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLA-CLASS GLA200D 4MATIC AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLA-CLASS GLA200D 4MATIC AMG LINE PACKAGE', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '7', 'diesel', 11688974, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLA-CLASS GLA200D 4MATIC AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLA-CLASS GLA220 4MATIC', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'petrol', 7724209, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLA-CLASS GLA220 4MATIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLA-CLASS GLA220 4MATIC', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '7', 'diesel', 9381165, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLA-CLASS GLA220 4MATIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLB GLB180', NULL, 'AT', '4WD', 1400, 'SUV', NULL, '5', 'petrol', 9303854, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLB GLB180'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLB GLB180', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '7', 'petrol', 7152045, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLB GLB180'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLB GLB180 AMG LEATHER EXCLUSIVE PACKAGE', NULL, 'AT', '2WD', 1400, 'SUV', NULL, '5', 'petrol', 12040544, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLB GLB180 AMG LEATHER EXCLUSIVE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLB GLB180 AMG LEATHER EXCLUSIVE PACKAGE', NULL, 'AT', '4WD', 1400, 'SUV', NULL, '7', 'petrol', 7896790, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLB GLB180 AMG LEATHER EXCLUSIVE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLB GLB180 AMG LINE', NULL, 'AT', '4WD', 1400, 'SUV', NULL, '5', 'petrol', 13601477, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLB GLB180 AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLB GLB180 AMG LINE', NULL, 'AT', '2WD', 1400, 'SUV', NULL, '7', 'petrol', 10219598, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLB GLB180 AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLB GLB180 AMG LINE PACKAGE', NULL, 'AT', '2WD', 1400, 'SUV', NULL, '5', 'petrol', 11948583, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLB GLB180 AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLB GLB180 AMG LINE PACKAGE', NULL, 'AT', '4WD', 1400, 'SUV', NULL, '7', 'petrol', 11544463, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLB GLB180 AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLB GLB200D', '3DA-247612M', 'AT', '2WD', 2000, 'SUV', NULL, '5', 'diesel', 9716752, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLB GLB200D'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLB GLB200D', '3DA-247612M', 'AT', '2WD', 1400, 'SUV', NULL, '7', 'petrol', 10141544, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLB GLB200D'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLB GLB200D 4MATIC', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'diesel', 13319402, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLB GLB200D 4MATIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLB GLB200D 4MATIC', NULL, 'AT', '2WD', 2000, 'SUV', NULL, '7', 'diesel', 8996993, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLB GLB200D 4MATIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLB GLB200D 4MATIC AMG LEATHER EXCLUSIVE PACKAGE', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '7', 'diesel', 12332779, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLB GLB200D 4MATIC AMG LEATHER EXCLUSIVE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLB GLB200D 4MATIC AMG LINE', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '7', 'diesel', 14253883, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLB GLB200D 4MATIC AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLB GLB200D 4MATIC AMG LINE PACKAGE', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '7', 'diesel', 13329235, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLB GLB200D 4MATIC AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLB GLB200D 4MATIC EDITION BLACK STARS', '3DA-247613M', 'AT', '2WD', 2000, 'SUV', NULL, '5', 'diesel', 15588904, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLB GLB200D 4MATIC EDITION BLACK STARS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLB GLB200D 4MATIC EDITION BLACK STARS', '3DA-247613M', 'AT', '4WD', 2000, 'SUV', NULL, '7', 'diesel', 10284000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLB GLB200D 4MATIC EDITION BLACK STARS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLB GLB200D 4MATIC NIGHT EDITION', '3DA-247613M', 'AT', '4WD', 2000, 'SUV', NULL, '5', 'diesel', 15092214, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLB GLB200D 4MATIC NIGHT EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLB GLB200D 4MATIC NIGHT EDITION', '3DA-247613M', 'AT', '2WD', 2000, 'SUV', NULL, '7', 'diesel', 14434171, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLB GLB200D 4MATIC NIGHT EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLB GLB200D AMG LINE', NULL, 'AT', '2WD', 2000, 'SUV', NULL, '5', 'diesel', 18706749, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLB GLB200D AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLB GLB200D AMG LINE', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '7', 'diesel', 13974272, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLB GLB200D AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLB GLB250 4MATIC SPORTS', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'petrol', 14519894, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLB GLB250 4MATIC SPORTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLB GLB250 4MATIC SPORTS', NULL, 'AT', '2WD', 2000, 'SUV', NULL, '7', 'diesel', 17321063, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLB GLB250 4MATIC SPORTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLC-CLASS GLC200 SPORTS', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'petrol', 12027070, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLC-CLASS GLC200 SPORTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLC-CLASS GLC220D 4MATIC AMG LINE', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '7', 'petrol', 11136176, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLC-CLASS GLC220D 4MATIC AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLC-CLASS GLC220D 4MATIC COUPE', '3DA-253315C', 'AT', '4WD', 2000, 'COUPE', NULL, '2', 'hybrid', 18303747, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLC-CLASS GLC220D 4MATIC COUPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLC-CLASS GLC220D 4MATIC COUPE', '3DA-253315C', 'AT', '4WD', 2000, 'SUV', NULL, '7', 'diesel', 10662368, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLC-CLASS GLC220D 4MATIC COUPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLC-CLASS GLC220D 4MATIC COUPE AMG LINE', NULL, 'AT', '4WD', 2000, 'COUPE', NULL, '4', 'hybrid', 16947914, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLC-CLASS GLC220D 4MATIC COUPE AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLC-CLASS GLC220D 4MATIC COUPE AMG LINE PACKAGE', NULL, 'AT', '4WD', 2000, 'COUPE', NULL, '2', 'hybrid', 18175514, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLC-CLASS GLC220D 4MATIC COUPE AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLC-CLASS GLC220D 4MATIC COUPE AMG LINE PACKAGE', NULL, 'AT', '4WD', 2000, 'COUPE', NULL, '4', 'diesel', 14341030, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLC-CLASS GLC220D 4MATIC COUPE AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLC-CLASS GLC220D 4MATIC COUPE DRIVERS PACKAGE+AMG LINE PACKAGE', '3CA-254305', 'AT', '4WD', 2000, 'COUPE', NULL, '4', 'hybrid', 16829180, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLC-CLASS GLC220D 4MATIC COUPE DRIVERS PACKAGE+AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLC-CLASS GLC220D 4MATIC COUPE SPORTS', NULL, 'AT', '4WD', 2100, 'COUPE', NULL, '2', 'diesel', 12876422, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLC-CLASS GLC220D 4MATIC COUPE SPORTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLC-CLASS GLC220D 4MATIC COUPE SPORTS', NULL, 'AT', '4WD', 2000, 'COUPE', NULL, '4', 'hybrid', 19900976, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLC-CLASS GLC220D 4MATIC COUPE SPORTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLC-CLASS GLC220D 4MATIC COUPE SPORTS(LEATHER VERSION)', NULL, 'AT', '4WD', 2000, 'COUPE', NULL, '2', 'hybrid', 24385429, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLC-CLASS GLC220D 4MATIC COUPE SPORTS(LEATHER VERSION)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLC-CLASS GLC220D 4MATIC COUPE SPORTS(LEATHER VERSION)', NULL, 'AT', '4WD', 2100, 'COUPE', NULL, '4', 'diesel', 11922613, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLC-CLASS GLC220D 4MATIC COUPE SPORTS(LEATHER VERSION)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLC-CLASS GLC220D 4MATIC DRIVERS PACKAGE', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'hybrid', 16791448, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLC-CLASS GLC220D 4MATIC DRIVERS PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLC-CLASS GLC220D 4MATIC DRIVERS PACKAGE', NULL, 'AT', '4WD', 2000, 'COUPE', NULL, '4', 'hybrid', 22579101, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLC-CLASS GLC220D 4MATIC DRIVERS PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLC-CLASS GLC220D 4MATIC LAUREUS EDITION', 'LDA-253905C', 'AT', '4WD', 2100, 'SUV', NULL, '5', 'diesel', 14441928, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLC-CLASS GLC220D 4MATIC LAUREUS EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLC-CLASS GLC220D 4MATIC LAUREUS EDITION', 'LDA-253905C', 'AT', '4WD', 2000, 'SUV', NULL, '7', 'hybrid', 15547637, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLC-CLASS GLC220D 4MATIC LAUREUS EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLC-CLASS GLC220D 4MATIC SPORTS', NULL, 'AT', '4WD', 2100, 'COUPE', NULL, '2', 'hybrid', 17087525, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLC-CLASS GLC220D 4MATIC SPORTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLC-CLASS GLC220D 4MATIC SPORTS', NULL, 'AT', '4WD', 2100, 'SUV', NULL, '7', 'diesel', 13372156, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLC-CLASS GLC220D 4MATIC SPORTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLC-CLASS GLC300 4MATIC', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'petrol', 19196740, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLC-CLASS GLC300 4MATIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLC-CLASS GLC300 4MATIC', NULL, 'AT', '4WD', 2100, 'COUPE', NULL, '4', 'hybrid', 15821782, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLC-CLASS GLC300 4MATIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLC-CLASS GLC300 4MATIC COUPE AMG LINE', NULL, 'AT', '4WD', 2000, 'COUPE', NULL, '2', 'petrol', 20362827, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLC-CLASS GLC300 4MATIC COUPE AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLC-CLASS GLC300 4MATIC COUPE AMG LINE', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '7', 'petrol', 17774759, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLC-CLASS GLC300 4MATIC COUPE AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLC-CLASS GLC350 E 4MATIC COUPE SPORTS ED STAR AMG LEATHER EXCLUSIVE PAC', NULL, 'AT', '4WD', 2000, 'COUPE', NULL, '2', 'hybrid', 18165540, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLC-CLASS GLC350 E 4MATIC COUPE SPORTS ED STAR AMG LEATHER EXCLUSIVE PAC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLC-CLASS GLC350 E 4MATIC COUPE SPORTS ED STAR AMG LEATHER EXCLUSIVE PAC', NULL, 'AT', '4WD', 2000, 'COUPE', NULL, '4', 'petrol', 18854470, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLC-CLASS GLC350 E 4MATIC COUPE SPORTS ED STAR AMG LEATHER EXCLUSIVE PAC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLC-CLASS GLC350 E 4MATIC SPORTS EDITION STAR', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'hybrid', 14397189, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLC-CLASS GLC350 E 4MATIC SPORTS EDITION STAR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLC-CLASS GLC350 E 4MATIC SPORTS EDITION STAR', NULL, 'AT', '4WD', 2000, 'COUPE', NULL, '4', 'hybrid', 16819945, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLC-CLASS GLC350 E 4MATIC SPORTS EDITION STAR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLC-CLASS GLC350E 4M SPORTS ED STAR AMG LEATHER EXCLUSIVE PACKAGE', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '7', 'hybrid', 13330730, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLC-CLASS GLC350E 4M SPORTS ED STAR AMG LEATHER EXCLUSIVE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLE', NULL, 'AT', '4WD', 3000, 'COUPE', NULL, '2', 'diesel', 24721116, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLE', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '7', 'hybrid', 12546554, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLE GLE300D 4MATIC AMG LINE', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'diesel', 24168287, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLE GLE300D 4MATIC AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLE GLE300D 4MATIC AMG LINE', NULL, 'AT', '4WD', 3000, 'COUPE', NULL, '4', 'diesel', 22889922, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLE GLE300D 4MATIC AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLE GLE300D 4MATIC AMG LINE PACKAGE', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'hybrid', 22558816, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLE GLE300D 4MATIC AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLE GLE300D 4MATIC AMG LINE PACKAGE', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '7', 'diesel', 22378044, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLE GLE300D 4MATIC AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLE GLE350D 4MATIC COUPE SPORTS', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '7', 'hybrid', 20887792, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLE GLE350D 4MATIC COUPE SPORTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLE GLE400D 4MATIC COUPE SPORTS', NULL, 'AT', '4WD', 3000, 'COUPE', NULL, '4', 'diesel', 22169222, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLE GLE400D 4MATIC COUPE SPORTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLE GLE400D 4MATIC SPORTS', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'diesel', 21514331, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLE GLE400D 4MATIC SPORTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLE GLE400D 4MATIC SPORTS', NULL, 'AT', '4WD', 3000, 'COUPE', NULL, '4', 'diesel', 23275783, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLE GLE400D 4MATIC SPORTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLE GLE450 4MATIC SPORTS', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'hybrid', 27582715, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLE GLE450 4MATIC SPORTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLE GLE450 4MATIC SPORTS', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '7', 'diesel', 19920677, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLE GLE450 4MATIC SPORTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLE GLE450D 4MATIC COUPE SPORTS', NULL, 'AT', '4WD', 3000, 'COUPE', NULL, '2', 'hybrid', 22349246, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLE GLE450D 4MATIC COUPE SPORTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLE GLE450D 4MATIC COUPE SPORTS', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '7', 'hybrid', 25539551, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLE GLE450D 4MATIC COUPE SPORTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLS GLS400D 4MATIC', '3DA-167923', 'AT', '4WD', 3000, 'SUV', NULL, '5', 'diesel', 30030294, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLS GLS400D 4MATIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLS GLS400D 4MATIC AMG LINE', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'diesel', 29506469, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLS GLS400D 4MATIC AMG LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLS GLS400D 4MATIC AMG LINE PACKAGE', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '7', 'diesel', 27320804, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLS GLS400D 4MATIC AMG LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MERCEDES', 'GLS GLS450D 4MATIC AMG LINE PACKAGE', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'hybrid', 27244464, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MERCEDES' AND model = 'GLS GLS450D 4MATIC AMG LINE PACKAGE'
);