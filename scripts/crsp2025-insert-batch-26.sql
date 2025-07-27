INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR T/C  5 DOOR 340PS LIMITED EDITION', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 23289374, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR T/C  5 DOOR 340PS LIMITED EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR T/C  MHEV 5 340PS R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 24960052, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR T/C  MHEV 5 340PS R-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR T/C  MHEV AWD 5 DOOR 340PS R-DYNAMIC SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 22171024, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR T/C  MHEV AWD 5 DOOR 340PS R-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR T/C 5 DOOR 300PS R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 25840379, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR T/C 5 DOOR 300PS R-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR T/C 5 DOOR 300PS R-DYNAMIC SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 25374222, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR T/C 5 DOOR 300PS R-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR T/C 5 DOOR 300PS S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 22327390, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR T/C 5 DOOR 300PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR T/C 5 DOOR 340PS R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 23750408, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR T/C 5 DOOR 340PS R-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR T/C 5 DOOR 340PS R-DYNAMIC SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 22360003, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR T/C 5 DOOR 340PS R-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR T/C DIESEL AWD 5 DOOR 300PS LIMITED EDITION', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 25340596, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR T/C DIESEL AWD 5 DOOR 300PS LIMITED EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR T/C MHEV 5 DOOR  340PS R-DYNAMIC LIMITED EDITION', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 22228844, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR T/C MHEV 5 DOOR  340PS R-DYNAMIC LIMITED EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR T/C MHEV 5 DOOR 340PS R-DYNAMIC SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 23315241, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR T/C MHEV 5 DOOR 340PS R-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY FIRST EDITION', NULL, 'AUT', '4WD', 3000, 'S/WAGON', NULL, NULL, 'diesel', 24379271, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY FIRST EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY HSE', NULL, 'AUT', '4WD', 3000, 'S/WAGON', NULL, NULL, 'diesel', 18774841, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY HSE LUXURY', NULL, 'AUT', '4WD', 3000, 'S/WAGON', NULL, NULL, 'diesel', 21082548, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY HSE LUXURY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SE', NULL, 'AUT', '4WD', 3000, 'S/WAGON', NULL, NULL, 'diesel', 16480321, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  DEFENDER 110  HSE', NULL, 'AUT', 'AWD', 3000, 'S/WAGON', NULL, NULL, 'petrol', 20799790, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  DEFENDER 110  HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  DEFENDER 110 FIRST EDITION', NULL, 'AUT', 'AWD', 3000, 'S/WAGON', NULL, NULL, 'petrol', 19978145, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  DEFENDER 110 FIRST EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  DEFENDER 110 SE', NULL, 'AUT', 'AWD', 3000, 'S/WAGON', NULL, NULL, 'petrol', 19080422, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  DEFENDER 110 SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  DEFENDER 110 X', NULL, 'AUT', 'AWD', 3000, 'S/WAGON', NULL, NULL, 'petrol', 25257975, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  DEFENDER 110 X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  DEFENDER 110 X-DYNAMIC  HSE', NULL, 'AUT', 'AWD', 3000, 'S/WAGON', NULL, NULL, 'petrol', 21788807, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  DEFENDER 110 X-DYNAMIC  HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  DEFENDER 110 X-DYNAMIC  SE', NULL, 'AUT', 'AWD', 3000, 'S/WAGON', NULL, NULL, 'petrol', 19932498, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  DEFENDER 110 X-DYNAMIC  SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  DEFENDER 90 X', NULL, 'AUT', 'AWD', 3000, 'S/WAGON', NULL, NULL, 'petrol', 24497192, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  DEFENDER 90 X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  DEFENDER 90 X-DYNAMIC S', NULL, 'AUT', 'AWD', 3000, 'S/WAGON', NULL, NULL, 'petrol', 17589289, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  DEFENDER 90 X-DYNAMIC S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  SPORT HSE', NULL, 'AUT', 'FWD', 3000, 'S/WAGON', NULL, NULL, 'diesel', 24725427, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  SPORT HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  SPORT HSE SILVER EDITION', NULL, 'AUT', 'FWD', 3000, 'S/WAGON', NULL, NULL, 'diesel', 26208953, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  SPORT HSE SILVER EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  SPORT MHEV HSE', NULL, 'AUT', 'FWD', 3000, 'S/WAGON', NULL, NULL, 'petrol', 22595237, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  SPORT MHEV HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  SPORT MHEV HSE SILVER EDITION', NULL, 'AUT', 'FWD', 3000, 'S/WAGON', NULL, NULL, 'petrol', 23888567, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  SPORT MHEV HSE SILVER EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  SPORT MHEV HST', NULL, 'AUT', 'FWD', 3000, 'S/WAGON', NULL, NULL, 'petrol', 25562288, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  SPORT MHEV HST'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  SPORT MHEV SE', NULL, 'AUT', 'FWD', 3000, 'S/WAGON', NULL, NULL, 'petrol', 21149750, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  SPORT MHEV SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  SPORT SE', NULL, 'AUT', 'FWD', 3000, 'S/WAGON', NULL, NULL, 'diesel', 22912229, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  SPORT SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  SPORT SUPER. HSE', NULL, 'AUT', 'FWD', 3000, 'S/WAGON', NULL, NULL, 'diesel', 24062786, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  SPORT SUPER. HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  SPORT SUPER. HSE DYNAMIC', NULL, 'AUT', 'FWD', 3000, 'S/WAGON', NULL, NULL, 'diesel', 27346322, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  SPORT SUPER. HSE DYNAMIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  SPORT SUPER. SE', NULL, 'AUT', 'FWD', 3000, 'S/WAGON', NULL, NULL, 'diesel', 22252884, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  SPORT SUPER. SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SUPER. HSE SWB', NULL, 'AUT', 'FWD', 3000, 'S/WAGON', NULL, NULL, 'diesel', 31302391, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SUPER. HSE SWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SUPER. SWB', NULL, 'AUT', 'FWD', 3000, 'S/WAGON', NULL, NULL, 'diesel', 29505676, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SUPER. SWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SUPERCHARGED', NULL, 'AUT', '4WD', 3000, 'S/WAGON', NULL, NULL, 'diesel', 28236438, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SUPERCHARGED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SUPERCHARGED HSE', NULL, 'AUT', '4WD', 3000, 'S/WAGON', NULL, NULL, 'diesel', 30544144, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SUPERCHARGED HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SWB', NULL, 'AUT', 'FWD', 3000, 'S/WAGON', NULL, NULL, 'diesel', 30165021, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER TURBOCHARGED TD6', NULL, 'AUT', '4WD', 3000, 'S/WAGON', NULL, NULL, 'diesel', 28895783, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER TURBOCHARGED TD6'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER TURBOCHARGED TD6 HSE', NULL, 'AUT', '4WD', 3000, 'S/WAGON', NULL, NULL, 'diesel', 31203489, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER TURBOCHARGED TD6 HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  T/C 339PS 5 DOOR AUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 4367, 'S/WAGON', NULL, '4', 'diesel', 47038971, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  T/C 339PS 5 DOOR AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  T/C 339PS 5 DOOR VOGUE SE', NULL, 'AUT', 'AWD', 4367, 'S/WAGON', NULL, '5', 'diesel', 39467386, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  T/C 339PS 5 DOOR VOGUE SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  T/C  5 DOOR  530PS FIRST EDITION', NULL, 'AUT', 'AWD', 4395, 'S/WAGON', NULL, '5', 'petrol', 52300213, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  T/C  5 DOOR  530PS FIRST EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  T/C  5 DOOR 530PS AUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 4395, 'S/WAGON', NULL, '5', 'petrol', 50228551, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  T/C  5 DOOR 530PS AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  T/C  5 DOOR LWB 530PS AUTOBIGRAPHY 7 SEATS', NULL, 'AUT', 'AWD', 4395, 'S/WAGON', NULL, '7', 'petrol', 51261085, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  T/C  5 DOOR LWB 530PS AUTOBIGRAPHY 7 SEATS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  T/C  5 DOOR LWB 530PS HSE', NULL, 'AUT', 'AWD', 4395, 'S/WAGON', NULL, '5', 'petrol', 46815454, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  T/C  5 DOOR LWB 530PS HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  T/C 339PS 5 DOOR  VOGUE SE', NULL, 'AUT', 'AWD', 4395, 'S/WAGON', NULL, '5', 'diesel', 39262660, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  T/C 339PS 5 DOOR  VOGUE SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  T/C 339PS 5 DOOR LWB SVAUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 4395, 'S/WAGON', NULL, '4', 'diesel', 66704257, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  T/C 339PS 5 DOOR LWB SVAUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  T/C 339PS 5 DOOR SVAUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 4395, 'S/WAGON', NULL, '4', 'diesel', 66908984, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  T/C 339PS 5 DOOR SVAUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  T/C 5 DOOR 530PS SV', NULL, 'AUT', 'AWD', 4395, 'S/WAGON', NULL, '5', 'petrol', 60136195, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  T/C 5 DOOR 530PS SV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  T/C 5 DOOR AUTO 530PS FIRST EDITION', NULL, 'AUT', 'AWD', 4395, 'S/WAGON', NULL, '5', 'petrol', 49669427, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  T/C 5 DOOR AUTO 530PS FIRST EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  T/C 5 DOOR LWB 530PS AUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 4395, 'S/WAGON', NULL, '5', 'petrol', 51612516, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  T/C 5 DOOR LWB 530PS AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT  T/C  5 DOOR 530PS FIRST EDITION', NULL, 'AUT', 'AWD', 4395, 'S/WAGON', NULL, '5', 'petrol', 42896638, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT  T/C  5 DOOR 530PS FIRST EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT  T/C 5 DOOR 530PS AUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 4395, 'S/WAGON', NULL, '5', 'petrol', 42540922, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT  T/C 5 DOOR 530PS AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT  T/C 5 DOOR 530PS DYNAMIC HSE', NULL, 'AUT', 'AWD', 4395, 'S/WAGON', NULL, '5', 'petrol', 41126298, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT  T/C 5 DOOR 530PS DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C  5 DOOR  530PS AUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 4395, 'S/WAGON', NULL, '4', 'petrol', 47697657, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C  5 DOOR  530PS AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C  5 DOOR 530PS HSE', NULL, 'AUT', 'AWD', 4395, 'S/WAGON', NULL, '5', 'petrol', 43525653, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C  5 DOOR 530PS HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C  5 DOOR LWB  530PS HSE 7 SEATS', NULL, 'AUT', 'AWD', 4395, 'S/WAGON', NULL, '7', 'petrol', 47279962, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C  5 DOOR LWB  530PS HSE 7 SEATS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C  5 DOOR LWB 530PS SV', NULL, 'AUT', 'AWD', 4395, 'S/WAGON', NULL, '5', 'petrol', 67653714, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C  5 DOOR LWB 530PS SV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C  AWD 5 DOOR LWB  530PS FIRST EDITION', NULL, 'AUT', 'AWD', 4395, 'S/WAGON', NULL, '5', 'petrol', 50986798, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C  AWD 5 DOOR LWB  530PS FIRST EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C  AWD 5 DOOR LWB 530PS HSE 7 SEATS', NULL, 'AUT', 'AWD', 4395, 'S/WAGON', NULL, '7', 'petrol', 44890497, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C  AWD 5 DOOR LWB 530PS HSE 7 SEATS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C 339PS 5 DOOR  AUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 4395, 'S/WAGON', NULL, '4', 'diesel', 46834245, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C 339PS 5 DOOR  AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C 339PS 5 DOOR AUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 4395, 'S/WAGON', NULL, '4', 'diesel', 49086896, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C 339PS 5 DOOR AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C 339PS 5 DOOR LWB AUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 4395, 'S/WAGON', NULL, '4', 'diesel', 48882170, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C 339PS 5 DOOR LWB AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C 339PS 5 DOOR LWB VOGUE SE', NULL, 'AUT', 'AWD', 4395, 'S/WAGON', NULL, '5', 'diesel', 40917945, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C 339PS 5 DOOR LWB VOGUE SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C 339PS 5 DOOR VOGUE SE', NULL, 'AUT', 'AWD', 4395, 'S/WAGON', NULL, '5', 'diesel', 41122671, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C 339PS 5 DOOR VOGUE SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C 5 DOOR 530PS HSE', NULL, 'AUT', 'AWD', 4395, 'S/WAGON', NULL, '5', 'petrol', 45845557, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C 5 DOOR 530PS HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C 5 DOOR LWB 530PS AUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 4395, 'S/WAGON', NULL, '4', 'petrol', 49014698, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C 5 DOOR LWB 530PS AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C 5 DOOR LWB 530PS FIRST EDITION', NULL, 'AUT', 'AWD', 4395, 'S/WAGON', NULL, '5', 'petrol', 53684177, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C 5 DOOR LWB 530PS FIRST EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  AUT.BIOGRAPHY LWB', NULL, 'AUT', 'FWD', 5000, 'S/WAGON', NULL, NULL, 'diesel', 49780527, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  AUT.BIOGRAPHY LWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  S/C  5 DOOR 525PS FIFTY', NULL, 'AUT', 'AWD', 5000, 'S/WAGON', NULL, '5', 'petrol', 49457049, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  S/C  5 DOOR 525PS FIFTY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  S/C  5 DOOR 525PS WESTMINSTER BLACK', NULL, 'AUT', 'AWD', 5000, 'S/WAGON', NULL, '5', 'petrol', 39714443, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  S/C  5 DOOR 525PS WESTMINSTER BLACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  S/C 5 DOOR 525PS WESTMINSTER', NULL, 'AUT', 'AWD', 5000, 'S/WAGON', NULL, '5', 'petrol', 38778173, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  S/C 5 DOOR 525PS WESTMINSTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  S/C 525PS  5 DOOR  VOGUE SE', NULL, 'AUT', 'AWD', 5000, 'S/WAGON', NULL, '5', 'petrol', 39394858, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  S/C 525PS  5 DOOR  VOGUE SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  S/C 525PS  5 DOOR LWB  VOGUE SE', NULL, 'AUT', 'AWD', 5000, 'S/WAGON', NULL, '5', 'petrol', 41050473, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  S/C 525PS  5 DOOR LWB  VOGUE SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  SPORT SUPER. AUTO. BIO', NULL, 'AUT', 'FWD', 5000, 'S/WAGON', NULL, NULL, 'diesel', 32472728, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  SPORT SUPER. AUTO. BIO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  SPORT SUPER. AUTO.BIO.', NULL, 'AUT', 'FWD', 5000, 'S/WAGON', NULL, NULL, 'diesel', 32143055, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  SPORT SUPER. AUTO.BIO.'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  SPORT SUPER. DYNAMIC', NULL, 'AUT', 'FWD', 5000, 'S/WAGON', NULL, NULL, 'diesel', 28516659, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  SPORT SUPER. DYNAMIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  SPORT SUPER. HSE DYNAMIC', NULL, 'AUT', 'FWD', 5000, 'S/WAGON', NULL, NULL, 'diesel', 28846332, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  SPORT SUPER. HSE DYNAMIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  SPORT SUPER. SVR', NULL, 'AUT', 'FWD', 5000, 'S/WAGON', NULL, NULL, 'diesel', 38077158, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  SPORT SUPER. SVR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  SPORT SUPER. SVR', NULL, 'AUT', 'FWD', 5000, 'S/WAGON', NULL, NULL, 'diesel', 37747486, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  SPORT SUPER. SVR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  SPORT SUPER. SVR CARBON EDITION', NULL, 'AUT', 'FWD', 5000, 'S/WAGON', NULL, NULL, 'diesel', 42857407, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  SPORT SUPER. SVR CARBON EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER AUT.BIO SWB', NULL, 'AUT', 'FWD', 5000, 'S/WAGON', NULL, NULL, 'diesel', 47637656, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER AUT.BIO SWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER FIFTY   LWB', NULL, 'AUT', 'FWD', 5000, 'S/WAGON', NULL, NULL, 'diesel', 51099216, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER FIFTY   LWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER FIFTY   SWB', NULL, 'AUT', 'FWD', 5000, 'S/WAGON', NULL, NULL, 'diesel', 48956346, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER FIFTY   SWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER HSE SWB', NULL, 'AUT', 'FWD', 5000, 'S/WAGON', NULL, NULL, 'diesel', 31697998, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER HSE SWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER P525 HSE LWB', NULL, 'AUT', 'FWD', 5000, 'S/WAGON', NULL, NULL, 'diesel', 38505732, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER P525 HSE LWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER P525 HSE SWB', NULL, 'AUT', 'FWD', 5000, 'S/WAGON', NULL, NULL, 'diesel', 34928787, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER P525 HSE SWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER P525 WESTMINSTER LWB', NULL, 'AUT', 'FWD', 5000, 'S/WAGON', NULL, NULL, 'diesel', 38736503, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER P525 WESTMINSTER LWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER P525 WESTMINSTER SWB', NULL, 'AUT', 'FWD', 5000, 'S/WAGON', NULL, NULL, 'diesel', 37417813, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER P525 WESTMINSTER SWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER S/C 5 DOOR  525PS WESTMINSTER', NULL, 'AUT', 'AWD', 5000, 'S/WAGON', NULL, '5', 'petrol', 38982900, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER S/C 5 DOOR  525PS WESTMINSTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER S/C 5 DOOR 525PS FIFTY', NULL, 'AUT', 'AWD', 5000, 'S/WAGON', NULL, '5', 'petrol', 49661775, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER S/C 5 DOOR 525PS FIFTY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER S/C 5 DOOR 525PS WESTMINSTER BLACK', NULL, 'AUT', 'AWD', 5000, 'S/WAGON', NULL, '5', 'petrol', 39919169, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER S/C 5 DOOR 525PS WESTMINSTER BLACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER S/C 525PS   5 DOOR  VOGUE SE', NULL, 'AUT', 'AWD', 5000, 'S/WAGON', NULL, '5', 'petrol', 39599585, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER S/C 525PS   5 DOOR  VOGUE SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER S/C 525PS  5 DOOR AUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 5000, 'S/WAGON', NULL, '4', 'petrol', 46966773, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER S/C 525PS  5 DOOR AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER S/C 525PS  5 DOOR LWB AUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 5000, 'S/WAGON', NULL, '4', 'petrol', 49014698, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER S/C 525PS  5 DOOR LWB AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER S/C 525PS 5 DOOR AUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 5000, 'S/WAGON', NULL, '4', 'petrol', 47171500, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER S/C 525PS 5 DOOR AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER S/C 525PS 5 DOOR VOGUE SE', NULL, 'AUT', 'AWD', 5000, 'S/WAGON', NULL, '5', 'petrol', 41255199, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER S/C 525PS 5 DOOR VOGUE SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER S/C 565PS  5 DOOR DYNAMIC SVAUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 5000, 'S/WAGON', NULL, '4', 'petrol', 57928050, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER S/C 565PS  5 DOOR DYNAMIC SVAUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER S/C 565PS  5 DOOR SVAUTOBIOGRAPHY DYNAMIC', NULL, 'AUT', 'AWD', 5000, 'S/WAGON', NULL, '4', 'petrol', 59383932, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER S/C 565PS  5 DOOR SVAUTOBIOGRAPHY DYNAMIC'
);