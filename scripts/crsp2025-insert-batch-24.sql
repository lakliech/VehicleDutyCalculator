INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  EVOQUE AUT.BIO', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 19049991, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  EVOQUE AUT.BIO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  EVOQUE CONVERTIBLE HSE DYNAMIC', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 17589289, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  EVOQUE CONVERTIBLE HSE DYNAMIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  EVOQUE CONVERTIBLE SE DYNAMIC', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 15854705, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  EVOQUE CONVERTIBLE SE DYNAMIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  EVOQUE HSE', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 15550392, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  EVOQUE HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  EVOQUE HSE DYNAMIC', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 16524193, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  EVOQUE HSE DYNAMIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  EVOQUE LANDMARK EDITION', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 14728747, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  EVOQUE LANDMARK EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  EVOQUE P250 S', NULL, 'AUT', 'AWD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 12978947, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  EVOQUE P250 S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  EVOQUE P250 SE', NULL, 'AUT', 'AWD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 14363571, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  EVOQUE P250 SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  EVOQUE P300 R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 16980663, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  EVOQUE P300 R-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  EVOQUE P300 R-DYNAMIC S', NULL, 'AUT', 'AWD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 14180983, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  EVOQUE P300 R-DYNAMIC S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  EVOQUE P300 R-DYNAMIC SE', NULL, 'AUT', 'AWD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 15565607, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  EVOQUE P300 R-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  EVOQUE R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 16250312, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  EVOQUE R-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  EVOQUE R-DYNAMIC S', NULL, 'AUT', 'AWD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 13663651, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  EVOQUE R-DYNAMIC S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  EVOQUE R-DYNAMIC SE', NULL, 'AUT', 'AWD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 15093922, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  EVOQUE R-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  EVOQUE S', NULL, 'AUT', 'AWD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 13176751, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  EVOQUE S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  EVOQUE SE', NULL, 'AUT', 'AWD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 14607022, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  EVOQUE SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  EVOQUE SE PREMIUM', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 13967964, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  EVOQUE SE PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  PHEV  AUT.BIO', NULL, 'AUT', 'FWD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 39864996, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  PHEV  AUT.BIO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  PHEV HSE', NULL, 'AUT', 'FWD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 29518356, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  PHEV HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  SPORT PHEV AUT.BIO.', NULL, 'AUT', 'FWD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 27388166, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  SPORT PHEV AUT.BIO.'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  SPORT PHEV HSE', NULL, 'AUT', 'FWD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 24040723, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  SPORT PHEV HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  SPORT PHEV HSE SILVER EDITION', NULL, 'AUT', 'FWD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 25257975, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  SPORT PHEV HSE SILVER EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE  HSE DYNAMIC', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'diesel', 16493762, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE  HSE DYNAMIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE  HSE DYNAMIC CONVERTIBLE', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'diesel', 17558857, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE  HSE DYNAMIC CONVERTIBLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE AUTOBIOGRAPHY', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'diesel', 19019559, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE HSE', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'diesel', 15519960, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE LAND MARK EDITION', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'diesel', 14728747, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE LAND MARK EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE SE', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'diesel', 12720281, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE SE DYNAMIC', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'diesel', 15550392, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE SE DYNAMIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE SE PREMIUM', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'diesel', 13937533, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE SE PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR 250', NULL, 'AUT', 'AWD', 2000, 'S/WAGON', NULL, NULL, 'diesel', 15647163, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR 250'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT  T/C 258PS  5 DOOR HSE', NULL, 'AUT', 'AWD', 2993, 'S/WAGON', NULL, '5', 'diesel', 26331324, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT  T/C 258PS  5 DOOR HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT  T/C 258PS 5 DOOR  S', NULL, 'AUT', 'AWD', 2993, 'S/WAGON', NULL, '5', 'diesel', 22353702, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT  T/C 258PS 5 DOOR  S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C 258PS 5 DOOR  VOGUE', NULL, 'AUT', 'AWD', 2993, 'S/WAGON', NULL, '5', 'diesel', 30717222, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C 258PS 5 DOOR  VOGUE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C 258PS 5 DOOR AUTO VOGUE', NULL, 'AUT', 'AWD', 2993, 'S/WAGON', NULL, '5', 'diesel', 30921949, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C 258PS 5 DOOR AUTO VOGUE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  3 DOOR 300PS X', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 30056229, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  3 DOOR 300PS X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  5 DOOR 300PS', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 18849677, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  5 DOOR 300PS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  5 DOOR 300PS S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 19613528, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  5 DOOR 300PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  5 DOOR 300PS X-DYNAMIC HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 23623003, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  5 DOOR 300PS X-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  5 DOOR 300PS X-DYNAMIC S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 20420565, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  5 DOOR 300PS X-DYNAMIC S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  AWD 3 DOOR 300PS S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 18696709, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  AWD 3 DOOR 300PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  MHEV  5 DOOR 400PS FIRST EDITION 110', NULL, 'AUT', 'MHEV', 2996, 'S/WAGON', NULL, '5', 'petrol', 21687167, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  MHEV  5 DOOR 400PS FIRST EDITION 110'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  MHEV  5 DOOR 400PS S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 20591336, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  MHEV  5 DOOR 400PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  MHEV 3 DOOR  400PS X-DYNAMIC HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 21795502, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  MHEV 3 DOOR  400PS X-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  MHEV 3 DOOR  400PS XS EDITION', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 22982627, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  MHEV 3 DOOR  400PS XS EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  MHEV 3 DOOR 400PS X', NULL, 'AUT', 'MHEV', 2996, 'S/WAGON', NULL, '5', 'petrol', 25424130, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  MHEV 3 DOOR 400PS X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  MHEV 3 DOOR 400PS X-DYNAMIC HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 23413838, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  MHEV 3 DOOR 400PS X-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  MHEV 3 DOOR 400PS X-DYNAMIC SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 20140648, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  MHEV 3 DOOR 400PS X-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  MHEV 5 DOOR  400PS X', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 28712840, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  MHEV 5 DOOR  400PS X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  MHEV 5 DOOR  400PS X-DYNAMIC HSE', NULL, 'AUT', 'MHEV', 2996, 'S/WAGON', NULL, '5', 'petrol', 22762000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  MHEV 5 DOOR  400PS X-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  MHEV 5 DOOR  400PS X-DYNAMIC S', NULL, 'AUT', 'MHEV', 2996, 'S/WAGON', NULL, '5', 'petrol', 19888069, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  MHEV 5 DOOR  400PS X-DYNAMIC S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  MHEV 5 DOOR  400PS X-DYNAMIC SE', NULL, 'AUT', 'MHEV', 2996, 'S/WAGON', NULL, '5', 'petrol', 20990290, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  MHEV 5 DOOR  400PS X-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  MHEV 5 DOOR  400PS XS EDITION', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 22054777, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  MHEV 5 DOOR  400PS XS EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  MHEV 5 DOOR 400PS X', NULL, 'AUT', 'MHEV', 2996, 'S/WAGON', NULL, '5', 'petrol', 25844386, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  MHEV 5 DOOR 400PS X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  MHEV 5 DOOR 400PS X-DYNAMIC HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 24484411, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  MHEV 5 DOOR 400PS X-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  MHEV AWD  5 DOOR 400PS S', NULL, 'AUT', 'MHEV', 2996, 'S/WAGON', NULL, '5', 'petrol', 19143110, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  MHEV AWD  5 DOOR 400PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  MHEV AWD 3 DOOR 400PS S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 18070407, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  MHEV AWD 3 DOOR 400PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  MHEV AWD 3 DOOR 400PS XS EDITION', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 21499101, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  MHEV AWD 3 DOOR 400PS XS EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C 3  300PS X-DYNAMIC S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 19503747, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C 3  300PS X-DYNAMIC S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C 3 DOOR  300PS X', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 27735336, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C 3 DOOR  300PS X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C 3 DOOR  300PS X-DYNAMIC HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 22732228, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C 3 DOOR  300PS X-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C 3 DOOR  300PS X-DYNAMIC SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 20461115, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C 3 DOOR  300PS X-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C 3 DOOR 300PS X-DYNAMIC HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 22380138, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C 3 DOOR 300PS X-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C 5 DOOR  300PS 75TH ANNIVERSARY EDITION', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 29166773, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C 5 DOOR  300PS 75TH ANNIVERSARY EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C 5 DOOR  300PS X-DYNAMIC HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 23779268, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C 5 DOOR  300PS X-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C 5 DOOR  LWB 300PS X-DYNAMIC HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '7', 'diesel', 28797540, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C 5 DOOR  LWB 300PS X-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C 5 DOOR 300PS X-DYNAMIC SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 21860245, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C 5 DOOR 300PS X-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C DIESEL  5 DOOR LWB 300PS X', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '7', 'diesel', 32599652, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C DIESEL  5 DOOR LWB 300PS X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C DIESEL 5 DOOR  300PS X-DYNAMIC HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 25590487, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C DIESEL 5 DOOR  300PS X-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C MHEV 3 DOOR  400PS X', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 26095444, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C MHEV 3 DOOR  400PS X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C MHEV 3 DOOR 400PS X-DYNAMIC S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 18815061, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C MHEV 3 DOOR 400PS X-DYNAMIC S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C MHEV 5 DOOR 400PS S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 18916397, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C MHEV 5 DOOR 400PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C MHEV 5 DOOR 400PS X-DYNAMIC SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 20962902, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C MHEV 5 DOOR 400PS X-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C MHEV AWD 5 DOOR 400PS 75TH ANNIVERSARY EDITION', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 27785598, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C MHEV AWD 5 DOOR 400PS 75TH ANNIVERSARY EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C MHEV DOOR LWB 400PS X', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '7', 'petrol', 30623316, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C MHEV DOOR LWB 400PS X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER 2996C T/C DIESEL AWD 3 DOOR AUTO 300PS X-DYNAMIC SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 20939799, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER 2996C T/C DIESEL AWD 3 DOOR AUTO 300PS X-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C  5 DOOR  300PS S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 19859133, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C  5 DOOR  300PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C  5 DOOR 300PS S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 21372659, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C  5 DOOR 300PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C  5 DOOR 300PS X', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 27463356, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C  5 DOOR 300PS X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C  5 DOOR 300PS X-DYNAMIC SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 23708718, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C  5 DOOR 300PS X-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C  AWD 5 DOOR  300PS X', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 28285229, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C  AWD 5 DOOR  300PS X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C  MHEV 3 DOOR  400PS 75TH ANNIVERSARY EDITION', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 26818187, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C  MHEV 3 DOOR  400PS 75TH ANNIVERSARY EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C  MHEV 3 DOOR  400PS X-DYNAMIC HSE', NULL, 'AUT', 'MHEV', 2996, 'S/WAGON', NULL, '5', 'petrol', 21470192, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C  MHEV 3 DOOR  400PS X-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C  MHEV 3 DOOR 400PS FIRST EDITION 90', NULL, 'AUT', 'MHEV', 2996, 'S/WAGON', NULL, '5', 'petrol', 20402053, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C  MHEV 3 DOOR 400PS FIRST EDITION 90'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C  MHEV 3 DOOR 400PS X', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 28275238, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C  MHEV 3 DOOR 400PS X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C  MHEV 3 DOOR 400PS X-DYNAMIC SE', NULL, 'AUT', 'MHEV', 2996, 'S/WAGON', NULL, '5', 'petrol', 19699090, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C  MHEV 3 DOOR 400PS X-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C  MHEV 5 DOOR 400PS X', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 26602734, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C  MHEV 5 DOOR 400PS X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C  MHEV 5 DOOR 400PS X-DYNAMIC S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 19661355, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C  MHEV 5 DOOR 400PS X-DYNAMIC S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C  MHEV AWD 5 DOOR LWB 400PS X-DYNAMIC HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '7', 'petrol', 27453288, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C  MHEV AWD 5 DOOR LWB 400PS X-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C 3 DOOR  300PS S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 18460004, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C 3 DOOR  300PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C 3 DOOR  300PS X-DYNAMIC SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 22841350, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C 3 DOOR  300PS X-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C 3 DOOR 300PS X', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 27008408, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C 3 DOOR 300PS X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C 3 DOOR 300PS X-DYNAMIC HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 24722790, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C 3 DOOR 300PS X-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C 5 DOOR  300PS X-DYNAMIC SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 21830574, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C 5 DOOR  300PS X-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C 5 DOOR 300PS X', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 30530298, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C 5 DOOR 300PS X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C MHEV 5 DOOR  400PS X-DYNAMIC SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 22747697, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C MHEV 5 DOOR  400PS X-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C MHEV 5 DOOR 400PS XS EDITION', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 23475310, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C MHEV 5 DOOR 400PS XS EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY  T/C  5 DOOR 300PS R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '7', 'diesel', 21444858, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY  T/C  5 DOOR 300PS R-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY  T/C 300PS  5 DOOR  S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '7', 'diesel', 19614846, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY  T/C 300PS  5 DOOR  S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY  T/C 300PS  5 DOOR S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 19860452, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY  T/C 300PS  5 DOOR S'
);