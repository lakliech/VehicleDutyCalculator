INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'IGNIS GLX (QLD)', NULL, 'CVT', '2WD', 1200, 'SUV', NULL, NULL, 'petrol', 4402031, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'IGNIS GLX (QLD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'IGNIS GLX SHADOW', NULL, 'CVT', '2WD', 1200, 'SUV', NULL, NULL, 'hybrid', 4680054, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'IGNIS GLX SHADOW'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'JIMNY GL LITE (QLD)', NULL, '5MT', '2WD', 1500, 'SUV', NULL, NULL, 'petrol', 6365569, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'JIMNY GL LITE (QLD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'JIMNY GLX', NULL, '4AT', '2WD', 1500, 'SUV', NULL, NULL, 'hybrid', 6142571, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'JIMNY GLX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'JIMNY GLX (QLD)', NULL, '5MT', '2WD', 1500, 'SUV', NULL, NULL, 'petrol', 6689929, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'JIMNY GLX (QLD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'JIMNY LITE', NULL, '5MT', '2WD', 1500, 'SUV', NULL, NULL, 'hybrid', 5372216, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'JIMNY LITE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'JIMNY XL', NULL, '4AT', '2WD', 1500, 'SUV', NULL, NULL, 'hybrid', 6487204, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'JIMNY XL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'JIMNY XL HERITAGE EDITION', NULL, '5MT', '2WD', 1500, 'SUV', NULL, NULL, 'hybrid', 7723827, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'JIMNY XL HERITAGE EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'S-CROSS 2WD', NULL, '6AT', '2WD', 1400, 'SUV', NULL, NULL, 'hybrid', 6394530, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'S-CROSS 2WD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'S-CROSS ALLGRIP', NULL, '6AT', '2WD', 1400, 'SUV', NULL, NULL, 'hybrid', 6232349, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'S-CROSS ALLGRIP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'S-CROSS ALLGRIP PRESTIGE', NULL, '6AT', '2WD', 1400, 'SUV', NULL, NULL, 'hybrid', 6857901, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'S-CROSS ALLGRIP PRESTIGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'S-CROSS GLP 2WD (QLD)', NULL, '6AT', '2WD', 1400, 'SUV', NULL, NULL, 'petrol', 6162844, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'S-CROSS GLP 2WD (QLD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'S-CROSS GLX 2WD (QLD)', NULL, '6AT', '2WD', 1400, 'SUV', NULL, NULL, 'petrol', 6579878, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'S-CROSS GLX 2WD (QLD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'S-CROSS PLUS 2WD', NULL, '6AT', '2WD', 1400, 'SUV', NULL, NULL, 'hybrid', 6904238, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'S-CROSS PLUS 2WD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'S-CROSS TURBO GL+ (QLD)', NULL, '6AT', '2WD', 1400, 'SUV', NULL, NULL, 'petrol', 6464035, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'S-CROSS TURBO GL+ (QLD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'S-CROSS TURBO GLX (QLD)', NULL, '6AT', '2WD', 1400, 'SUV', NULL, NULL, 'petrol', 7228599, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'S-CROSS TURBO GLX (QLD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'S-CROSS TURBO GLXS (QLD)', NULL, '6AT', '2WD', 1400, 'SUV', NULL, NULL, 'petrol', 7390779, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'S-CROSS TURBO GLXS (QLD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'SWIFT GL (QLD)', NULL, 'CVT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 3961828, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'SWIFT GL (QLD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'SWIFT GL NAVI', NULL, '5MT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 3591131, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'SWIFT GL NAVI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'SWIFT GL NAVI (QLD)', NULL, '5MT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 4124008, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'SWIFT GL NAVI (QLD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'SWIFT GL NAVI PLUS', NULL, 'CVT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 4031334, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'SWIFT GL NAVI PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'SWIFT GL PLUS (QLD)', NULL, 'CVT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 4216683, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'SWIFT GL PLUS (QLD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'SWIFT GL PLUS SPECIAL EDITION (QLD)', NULL, 'CVT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 4842234, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'SWIFT GL PLUS SPECIAL EDITION (QLD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'SWIFT GL S', NULL, 'CVT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 4147177, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'SWIFT GL S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'SWIFT GL S PLUS', NULL, 'CVT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 4402031, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'SWIFT GL S PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'SWIFT GL SHADOW', NULL, 'CVT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 4402031, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'SWIFT GL SHADOW'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'SWIFT GL SPECIAL EDITION (QLD)', NULL, 'CVT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 4471537, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'SWIFT GL SPECIAL EDITION (QLD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'SWIFT GLX (QLD)', NULL, '6AT', '2WD', 1000, 'HATCHBACK', NULL, NULL, 'petrol', 4958077, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'SWIFT GLX (QLD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'SWIFT GLX SHADOW', NULL, '6AT', '2WD', 1000, 'HATCHBACK', NULL, NULL, 'petrol', 5977495, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'SWIFT GLX SHADOW'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'SWIFT GLX TURBO', NULL, '6AT', '2WD', 1000, 'HATCHBACK', NULL, NULL, 'hybrid', 5189763, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'SWIFT GLX TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'SWIFT HYBRID', NULL, '5MT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'hybrid', 3811232, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'SWIFT HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'SWIFT HYBRID GLX', NULL, 'CVT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'hybrid', 4459953, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'SWIFT HYBRID GLX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'SWIFT HYBRID PLUS', NULL, 'CVT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'hybrid', 4297773, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'SWIFT HYBRID PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'SWIFT SPORT TURBO', NULL, '6AT', '2WD', 1400, 'HATCHBACK', NULL, NULL, 'hybrid', 5583629, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'SWIFT SPORT TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'SWIFT SPORT TURBO (QLD)', NULL, '6MT', '2WD', 1400, 'HATCHBACK', NULL, NULL, 'petrol', 5792146, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'SWIFT SPORT TURBO (QLD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'VITARA 1.6L', NULL, '5MT', '2WD', 1600, 'SUV', NULL, NULL, 'petrol', 5212932, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'VITARA 1.6L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'VITARA BEAT', NULL, '6AT', '2WD', 1600, 'SUV', NULL, NULL, 'petrol', 5815315, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'VITARA BEAT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'VITARA GL+ (QLD)', NULL, '5MT', '2WD', 1600, 'SUV', NULL, NULL, 'petrol', 5398280, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'VITARA GL+ (QLD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'VITARA SHADOW', NULL, '6AT', '2WD', 1600, 'SUV', NULL, NULL, 'hybrid', 6649384, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'VITARA SHADOW'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'VITARA S-TURBO (2WD) (QLD)', NULL, '6AT', '2WD', 1400, 'SUV', NULL, NULL, 'petrol', 7020081, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'VITARA S-TURBO (2WD) (QLD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'VITARA S-TURBO SUNROOF (4WD) (QLD)', NULL, '6AT', '4WD', 1400, 'SUV', NULL, NULL, 'petrol', 6811564, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'VITARA S-TURBO SUNROOF (4WD) (QLD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'VITARA TURBO', NULL, '6AT', '2WD', 1400, 'SUV', NULL, NULL, 'hybrid', 6649384, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'VITARA TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'VITARA TURBO ALLGRIP', NULL, '6AT', '2WD', 1400, 'SUV', NULL, NULL, 'hybrid', 7483453, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'VITARA TURBO ALLGRIP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'VITARA TURBO BEAT', NULL, '6AT', '2WD', 1400, 'SUV', NULL, NULL, 'hybrid', 6649384, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'VITARA TURBO BEAT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'VITARA TURBO SHADOW', NULL, '6AT', '2WD', 1400, 'SUV', NULL, NULL, 'hybrid', 7668802, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'VITARA TURBO SHADOW'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'TOURING STYLE HYBRID XT', '4AA-MM53S', 'CVT', '2WD', 658, 'SEDAN', '1110', '5', 'petrol', 3111482, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'TOURING STYLE HYBRID XT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'ATENZA SEDAN 25S L PACKAGE', '6BA-GJ5FP', '6AT', '2WD', 2488, 'SEDAN', '1815', '5', 'petrol', 6902145, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'ATENZA SEDAN 25S L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'ATENZA WAGON XD L PACKAGE', '3DA-GJ2AW', '6AT', 'AW', 2188, 'SEDAN', '1965', '5', 'diesel', 8164733, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'ATENZA WAGON XD L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'ATENZA ZD L PACKAGE', 'LDA-GJ2FP', '6AT', '2WD', 2188, 'SEDAN', '1815', '5', 'diesel', 7354572, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'ATENZA ZD L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'AXELA 15S PROACTIVE', 'DBA-BM5FP', '6AT', '2WD', 1496, 'SEDAN', '1545', '5', 'petrol', 4020079, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'AXELA 15S PROACTIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'AXELA HYBRID-S L PACKAGE', 'DAA-BYEEP', 'CVT', '2WD', 1997, 'SEDAN', '1695', '5', 'petrol', 5609552, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'AXELA HYBRID-S L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'AXELA SPORT 15XD L PACKAGE', 'LDA-BMLFS', '6AT', '2WD', 1498, 'SEDAN', '1635', '5', 'diesel', 5030149, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'AXELA SPORT 15XD L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'AXELA SPORT 22XD L PACKAGE', 'LDA-BM2FS', '6AT', '2WD', 2188, 'SEDAN', '1725', '5', 'diesel', 6018334, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'AXELA SPORT 22XD L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'BONGO BRAWNY GL', '3BF-TRH200M', '6AT', '2WD', 1998, 'VAN', '3115', '6', 'petrol', 5074592, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'BONGO BRAWNY GL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'BONGO BRAWNY VAN GL', '3BF-TRH200M', '6AT', '2WD', 1998, 'VAN', '3115', '6', 'diesel', 5728713, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'BONGO BRAWNY VAN GL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'BONGO BRAWNY VAN GL', 'CBF-TRH200M', '6AT', '2WD', 1998, 'VAN', '3115', '6', 'diesel', 5159774, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'BONGO BRAWNY VAN GL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'BONGO BRAWNY VAN GL', '3BF-TRH200M', '6AT', '2WD', 1998, 'VAN', '3115', '6', 'petrol', 5582051, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'BONGO BRAWNY VAN GL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'BONGO TRUCK DX', '5BF-S413F', '4AT', 'AWD', 1496, 'TRUCK', '2090', '2', 'petrol', 4308757, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'BONGO TRUCK DX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'BONGO TRUCK GL', 'DBF-SLP2T', '5MT', '2WD', 1998, 'TRUCK', '2570', '2', 'diesel', 3486846, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'BONGO TRUCK GL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'BONGO VAN BUSTER', 'HBD-DG17V', '5AMT', '2WD', 658, 'VAN', '1350', '4', 'petrol', 2288819, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'BONGO VAN BUSTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'BONGO VAN DX', '5BF-S413Z', '4AT', '2WD/AWD', 1496, 'VAN', '2160', '5', 'petrol', 4748743, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'BONGO VAN DX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'BONGO VAN DX', '5GF-S413Z', '4AT', 'AWD', 1496, 'VAN', '2160', '5', 'petrol', 4748743, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'BONGO VAN DX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'BONGO VAN GL', 'DBF-SLP2V', '5MT', '2WD', 1798, 'VAN', '1150', '5', 'diesel', 3964525, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'BONGO VAN GL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CAROL GS', 'DBA-HB36S', NULL, '2WD', 658, 'HATCHBACK', '870', '4', 'petrol', 2066603, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CAROL GS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CAROL GS', '5BA-DKLFW', 'CVT', '2WD', 658, 'HATCHBACK', '870', '4', 'petrol', 2217710, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CAROL GS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CAROL GS', 'DBA-DBHB36S', 'CVT', '2WD', 658, 'HATCHBACK', '870', '4', 'petrol', 2066603, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CAROL GS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CAROL GS', 'DBA-HB36S', 'CVT', '2WD', 658, 'HATCHBACK', '870', '4', 'petrol', 1894891, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CAROL GS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CAROL HYBRID GS', '5AA-HB97S', 'CVT', '2WD', 657, 'HATCHBACK', '920', '4', 'petrol', 2217710, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CAROL HYBRID GS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-3 15S', '5BA-DKLFW', '6AT', '2WD', 1496, 'SUV', '1485', '5', 'petrol', 3474641, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-3 15S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-3 15S TOURING', '5BA-DKLFW', '6AT', '2WD', 1496, 'SUV', '1485', '5', 'petrol', 4022099, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-3 15S TOURING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-3 15S URBAN DRESSER', '5BA-DKLFY', '6AT', '2WD', 1496, 'SUV', '1485', '5', 'petrol', 5115399, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-3 15S URBAN DRESSER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-3 20S', '6BA-DKEFW', '6AT', '2WD', 1997, 'SUV', '1525', '5', 'petrol', 4145496, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-3 20S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-3 20S Proactive', '6BA-DKEFW', '6AT', '2WD', 1997, 'SUV', '1515', '5', 'petrol', 4272596, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-3 20S Proactive'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-3 XD L Package', 'LDA-DKEFW', '6AT', '2WD', 1498, 'SUV', '1546', '5', 'diesel', 5252364, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-3 XD L Package'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-3 XD PROACTIVE SPACKAGE', '3DA-DK8FW', '6AT', '2WD', 1756, 'SUV', '1575', '5', 'diesel', 5315493, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-3 XD PROACTIVE SPACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-3 XD TOURING', '3DA-DK8FY', '6AT', '2WD', 1756, 'SUV', '1575', '5', 'diesel', 5578532, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-3 XD TOURING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-3 XD TOUTING', '3DA-DK8FW', '6AT', '2WD', 1756, 'SUV', '1545', '5', 'diesel', 5161879, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-3 XD TOUTING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-3 XD VIVID MONOTONE', '3DA-DK8FY', '6AT', '2WD', 1756, 'SUV', '1575', '5', 'diesel', 6717386, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-3 XD VIVID MONOTONE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-30 20S', '5BA-DMEP', '6AT', '2WD', 1997, 'SUV', '1675', '5', 'petrol', 4576880, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-30 20S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-30 20S PROACTIVE TOURING SELECTION', '5AA-DMEJ3R', '4WD', '6AT', 1997, 'SUV', '1695', '5', 'petrol', 6340083, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-30 20S PROACTIVE TOURING SELECTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-30 20S RETRO SPORTS EDITION', '5AA-DMEJ3R', '6AT', '2WD', 1997, 'SUV', '1695', '5', 'petrol', 6678036, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-30 20S RETRO SPORTS EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-30 X L PACKAGE', '5AA-DMFP', '6AT', '2WD', 1997, 'SUV', '1765', '5', 'petrol', 6826600, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-30 X L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-30 X L PACKAGE', '3AA-DMFP', '6AT', '2WD', 2997, 'SUV', '1765', '5', 'petrol', 6651732, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-30 X L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-30 XD PROACTIVE', '3DA-DM8R', '6AT', '4WD', 1756, 'SUV', '1735', '5', 'diesel', 6421099, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-30 XD PROACTIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-30 XD PROACTIVE', '3DA-DM8P', '6AT', '2WD', 1756, 'SUV', '1735', '5', 'diesel', 6215087, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-30 XD PROACTIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-30 XD TOURING', '3DA-DM8R', '6AT', '2WD', 1756, 'SUV', '1735', '5', 'diesel', 6932658, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-30 XD TOURING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-5 20S', '6BA-KFEP', '6AT', '4WD', 1997, 'SUV', '1935', '5', 'petrol', 6839016, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-5 20S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-5 20S', '6BA-KFEP', '6AT', '2WD', 1997, 'SUV', '1875', '5', 'petrol', 6333981, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-5 20S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-5 20S BLACK TONE EDITION', '6BA-KFEP', '6AT', '2WD', 1997, 'SUV', '1925', '5', 'petrol', 6400266, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-5 20S BLACK TONE EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-5 20S BLACK TONE EDITION', '6BA-KFEP', '6AT', '4WD', 1997, 'SUV', '1825', '5', 'petrol', 6816920, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-5 20S BLACK TONE EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'Cx-5 20S PROACTIVE', 'DBA-KFEP', '6AT', '2WD', 1997, 'SUV', '1805', '5', 'petrol', 5239738, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'Cx-5 20S PROACTIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-5 20S PROACTIVE', '5BA-KFEP', '6AT', '2WD', 1997, 'SUV', '1805', '5', 'petrol', 5239738, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-5 20S PROACTIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-5 25S', '4AA-MM53S', '6AT', 'AWD', 2488, 'SUV', '1945', '5', 'petrol', 6733800, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-5 25S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-5 25S', '6BA-KF5P', 'CVT', 'AWD', 2488, 'SUV', '1945', '5', 'petrol', 6584394, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-5 25S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-5 25S  L PACKAGE', '6BA-KF5P', '6AT', '2WD', 2498, 'SUV', '1865', '5', 'petrol', 6735904, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-5 25S  L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-5 25S L PACKAGE', '6BA-KF5P', '6AT', 'AWD', 2488, 'SUV', '1945', '5', 'petrol', 6584394, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-5 25S L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-5 25S SPORTS APPEARANCE', '6BA-KF5P', '6AT', '4WD', 2488, 'SUV', '1865', '5', 'petrol', 7536806, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-5 25S SPORTS APPEARANCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-5 25S SPORTS APPEARANCE', '6BA-KF5P', '6AT', '2WD', 2488, 'SUV', '1865', '5', 'petrol', 7536806, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-5 25S SPORTS APPEARANCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-5 25T L PACKAGE', '5BA-KF5P', '6AT', '2WD', 2488, 'SUV', '1895', '5', 'petrol', 7395606, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-5 25T L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAZDA', 'CX-5 XD', '3DA-KF2P', '6AT', '2WD', 2188, 'SUV', '1945', '5', 'diesel', 6586498, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAZDA' AND model = 'CX-5 XD'
);