INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY  T/C 300PS 5 DOOR  R-DYNAMIC SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '7', 'diesel', 20690237, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY  T/C 300PS 5 DOOR  R-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY  T/C 360PS  5 DOOR R-DYNAMIC SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 19593798, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY  T/C 360PS  5 DOOR R-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY  T/C 360PS  5 DOOR S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 18600825, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY  T/C 360PS  5 DOOR S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY  T/C 360PS 5 DOOR  R-DYNAMIC SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '7', 'petrol', 19367085, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY  T/C 360PS 5 DOOR  R-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY  T/C 360PS 5 DOOR S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '7', 'petrol', 18374112, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY  T/C 360PS 5 DOOR S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY  T/C 5 DOOR 300PS R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 21690463, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY  T/C 5 DOOR 300PS R-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY T/C  MHEV 5 DOOR 360PS METROPOLITAN EDITION', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '7', 'petrol', 23117133, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY T/C  MHEV 5 DOOR 360PS METROPOLITAN EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY T/C 300PS  5 DOOR R-DYNAMIC SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 20935843, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY T/C 300PS  5 DOOR R-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY T/C 300PS 5 DOOR  S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '7', 'diesel', 21655518, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY T/C 300PS 5 DOOR  S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY T/C 300PS 5 DOOR R-DYNAMIC SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '7', 'diesel', 22992340, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY T/C 300PS 5 DOOR R-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY T/C 360PS  5 DOOR R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 20290370, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY T/C 360PS  5 DOOR R-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY T/C 360PS MHEV 5 DOOR R-DYNAMIC SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '7', 'petrol', 21223698, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY T/C 360PS MHEV 5 DOOR R-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY T/C 360PS MHEV 5 DOOR S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '7', 'petrol', 19989709, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY T/C 360PS MHEV 5 DOOR S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY T/C 360PS MHEV DOOR R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '7', 'petrol', 21955266, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY T/C 360PS MHEV DOOR R-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY T/C 360PS PETROL AWD 5 DOOR AUTO R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '7', 'petrol', 20063657, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY T/C 360PS PETROL AWD 5 DOOR AUTO R-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY T/C 5 DOOR 300PS METROPOLITAN EDITION', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '7', 'diesel', 25107847, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY T/C 5 DOOR 300PS METROPOLITAN EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY T/C 5 DOOR 300PS R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '7', 'diesel', 23784872, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY T/C 5 DOOR 300PS R-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANG+A3:A39E ROVER  T/C 400PS  5 DOOR VOGUE SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 36095472, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANG+A3:A39E ROVER  T/C 400PS  5 DOOR VOGUE SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  T/C  5 DOOR 350PS AUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '4', 'diesel', 46834245, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  T/C  5 DOOR 350PS AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  T/C  5 DOOR LWB 350PS HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 43550049, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  T/C  5 DOOR LWB 350PS HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  T/C  AWD 5 DOOR LWB 350PS FIRST EDITION', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 50854270, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  T/C  AWD 5 DOOR LWB 350PS FIRST EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  T/C  MHEV 5 DOOR 360PS SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 36465516, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  T/C  MHEV 5 DOOR 360PS SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  T/C  MHEV AWD 5 DOOR 360PS', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 34606164, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  T/C  MHEV AWD 5 DOOR 360PS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  T/C 400PS  5 DOOR AUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '4', 'petrol', 42895953, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  T/C 400PS  5 DOOR AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  T/C 5 DOOR  350PS HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 40417502, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  T/C 5 DOOR  350PS HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  T/C 5 DOOR 350PS AUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 49321623, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  T/C 5 DOOR 350PS AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  T/C AWD 5 DOOR LWB 350PS HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 41340914, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  T/C AWD 5 DOOR LWB 350PS HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  T/C AWD 5 DOOR LWB 350PS HSE 7 SEATS', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '7', 'diesel', 41782675, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  T/C AWD 5 DOOR LWB 350PS HSE 7 SEATS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  T/C MHEV  5 DOOR LWB  360PS HSE 7 SEATS', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '7', 'petrol', 37894874, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  T/C MHEV  5 DOOR LWB  360PS HSE 7 SEATS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  T/C MHEV 5 DOOR  400PS FIRST EDITION', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 45188343, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  T/C MHEV 5 DOOR  400PS FIRST EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  T/C MHEV 5 DOOR AUTO 360PS AUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '4', 'petrol', 42558470, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  T/C MHEV 5 DOOR AUTO 360PS AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT  T/C  5 DOOR  350PS AUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 37369681, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT  T/C  5 DOOR  350PS AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT  T/C  5 DOOR 350PS DYNAMIC S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 31930417, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT  T/C  5 DOOR 350PS DYNAMIC S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT  T/C  5 DOOR 350PS FIRST EDITION', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 37725397, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT  T/C  5 DOOR 350PS FIRST EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT  T/C  5 DOOR 360PS HSE SILVER', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 25085764, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT  T/C  5 DOOR 360PS HSE SILVER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT  T/C  MHEV  5 DOOR 400PS DYNAMIC SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 32101973, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT  T/C  MHEV  5 DOOR 400PS DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT  T/C 249PS 5 DOOR S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 22558428, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT  T/C 249PS 5 DOOR S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT  T/C 249PS 5 DOOR SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 23267900, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT  T/C 249PS 5 DOOR SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT  T/C 258PS 5 DOOR SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 23063173, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT  T/C 258PS 5 DOOR SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT  T/C 300PS  5 DOOR S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 23364477, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT  T/C 300PS  5 DOOR S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT  T/C 360PS 5 DOOR  HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 24127583, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT  T/C 360PS 5 DOOR  HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT  T/C 360PS 5 DOOR S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 20282312, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT  T/C 360PS 5 DOOR S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT  T/C 400PS  5 DOOR HST', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 28140920, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT  T/C 400PS  5 DOOR HST'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT  T/C 5 DOOR  350PS DYNAMIC HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 35954727, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT  T/C 5 DOOR  350PS DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT  T/C 5 DOOR  350PS DYNAMIC SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 33809219, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT  T/C 5 DOOR  350PS DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT T/C  5 DOOR  360PS HSE SILVER', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 24896786, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT T/C  5 DOOR  360PS HSE SILVER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT T/C  5 DOOR 350PS HSE DYNAMIC BLACK', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 33257411, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT T/C  5 DOOR 350PS HSE DYNAMIC BLACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT T/C  MHEV 5 DOOR  400PS DYNAMIC S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 30367998, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT T/C  MHEV 5 DOOR  400PS DYNAMIC S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT T/C 249PS 5 DOOR HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 26536050, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT T/C 249PS 5 DOOR HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT T/C 258PS  5 DOOR HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 26536050, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT T/C 258PS  5 DOOR HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT T/C 258PS 5 DOOR S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 22558428, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT T/C 258PS 5 DOOR S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT T/C 300PS 5 DOOR HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 26536050, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT T/C 300PS 5 DOOR HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT T/C 300PS 5 DOOR SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 23267900, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT T/C 300PS 5 DOOR SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT T/C 350PS 5 DOOR HSE DYNAMIC', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 32450923, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT T/C 350PS 5 DOOR HSE DYNAMIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT T/C 360PS 5 DOOR  SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 21597190, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT T/C 360PS 5 DOOR  SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT T/C 360PS 5 DOOR HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 24316561, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT T/C 360PS 5 DOOR HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT T/C 360PS 5 DOOR S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 20471290, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT T/C 360PS 5 DOOR S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT T/C 360PS 5 DOOR SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 21786169, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT T/C 360PS 5 DOOR SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT T/C 400PS 5 DOOR HST', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 27951942, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT T/C 400PS 5 DOOR HST'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER SPORT T/C 5 DOOR 350PS HST', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 32265347, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER SPORT T/C 5 DOOR 350PS HST'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C   5 DOOR LWB  350PS AUTOBIOGRAPHY 7 SEATS', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '7', 'diesel', 48547882, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C   5 DOOR LWB  350PS AUTOBIOGRAPHY 7 SEATS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C  5 DOOR  350PS FIRST EDITION', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 48953708, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C  5 DOOR  350PS FIRST EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C  5 DOOR 350PS FIRST EDITION', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 51548230, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C  5 DOOR 350PS FIRST EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C  5 DOOR 350PS SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 40271457, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C  5 DOOR 350PS SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C  5 DOOR 350PS SV', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 59228937, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C  5 DOOR 350PS SV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C  5 DOOR LWB 350PS AUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 51473394, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C  5 DOOR LWB 350PS AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C  5 DOOR LWB 350PS HSE 7 SEATS', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '7', 'diesel', 44014227, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C  5 DOOR LWB 350PS HSE 7 SEATS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C  5 DOOR LWB 350PS SV', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 67514592, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C  5 DOOR LWB 350PS SV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C  MHEV 5 DOOR  360PS HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 36635019, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C  MHEV 5 DOOR  360PS HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C  MHEV 5 DOOR 360PS HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 38597229, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C  MHEV 5 DOOR 360PS HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C  MHEV 5 DOOR 400PS FIRST EDITION', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 47583286, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C  MHEV 5 DOOR 400PS FIRST EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C  MHEV 5 DOOR LWB 360PS HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 39492517, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C  MHEV 5 DOOR LWB 360PS HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C  MHEV AWD 5 DOOR LWB 360PS AUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '4', 'petrol', 44448862, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C  MHEV AWD 5 DOOR LWB 360PS AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C  MHEV AWD 5 DOOR LWB 360PS HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 37487399, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C  MHEV AWD 5 DOOR LWB 360PS HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C 360PS 5 DOOR VOGUE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 31111739, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C 360PS 5 DOOR VOGUE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C 360PS PETROL 5 DOOR VOGUE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 30922760, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C 360PS PETROL 5 DOOR VOGUE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C 400PS  5 DOOR SVAUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '4', 'petrol', 61456913, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C 400PS  5 DOOR SVAUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C 400PS  5 DOOR VOGUE SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 35906494, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C 400PS  5 DOOR VOGUE SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C 400PS 5 DOOR AUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '4', 'petrol', 43084932, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C 400PS 5 DOOR AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C 400PS 5 DOOR LWB  VOGUE SE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 37465489, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C 400PS 5 DOOR LWB  VOGUE SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C 400PS 5 DOOR LWB AUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '4', 'petrol', 44816777, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C 400PS 5 DOOR LWB AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C 400PS 5 DOOR LWB SVAUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '4', 'petrol', 61267935, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C 400PS 5 DOOR LWB SVAUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C 5 DOOR 350PS HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 42580153, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C 5 DOOR 350PS HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C 5 DOOR LWB 350PS AUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '4', 'diesel', 48882170, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C 5 DOOR LWB 350PS AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C 5 DOOR LWB 350PS AUTOBIOGRAPHY 7 SEATS', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '7', 'diesel', 51121964, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C 5 DOOR LWB 350PS AUTOBIOGRAPHY 7 SEATS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C 5 DOOR LWB 350PS FIRST EDITION', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 53545055, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C 5 DOOR LWB 350PS FIRST EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C MHEV 5 DOOR 360PS AUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 44820124, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C MHEV 5 DOOR 360PS AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C MHEV 5 DOOR LWB  360PS AUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 46806071, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C MHEV 5 DOOR LWB  360PS AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C MHEV 5 DOOR LWB 360PS AUTOBIOGRAPHY 7 SEATS', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '7', 'petrol', 46481673, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C MHEV 5 DOOR LWB 360PS AUTOBIOGRAPHY 7 SEATS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER T/C MHEV 5 DOOR LWB 360PS HSE 7 SEATS', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '7', 'petrol', 39920990, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER T/C MHEV 5 DOOR LWB 360PS HSE 7 SEATS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR  T/C  5 DOOR 300PS R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 27156102, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR  T/C  5 DOOR 300PS R-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR  T/C  5 DOOR 300PS R-DYNAMIC LE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 26011809, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR  T/C  5 DOOR 300PS R-DYNAMIC LE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR  T/C  5 DOOR 300PS R-DYNAMIC S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 24689493, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR  T/C  5 DOOR 300PS R-DYNAMIC S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR  T/C  5 DOOR 300PS S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 22122664, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR  T/C  5 DOOR 300PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR  T/C  5 DOOR 340PS S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 20507650, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR  T/C  5 DOOR 340PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR  T/C  MHEV 5 DOOR 340PS R-DYNAMIC LE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 23903782, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR  T/C  MHEV 5 DOOR 340PS R-DYNAMIC LE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR  T/C  MHEV 5 DOOR 340PS R-DYNAMIC S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 22682879, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR  T/C  MHEV 5 DOOR 340PS R-DYNAMIC S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR  T/C  MHEV AWD  5 DOOR 340PS S', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 20318671, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR  T/C  MHEV AWD  5 DOOR 340PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR  T/C MHEV   5 DOOR 340PS R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'petrol', 23762581, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR  T/C MHEV   5 DOOR 340PS R-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR T/C  5 DOOR 300PS R-DYNAMIC LIMITED EDITION', NULL, 'AUT', 'AWD', 2996, 'S/WAGON', NULL, '5', 'diesel', 24191688, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR T/C  5 DOOR 300PS R-DYNAMIC LIMITED EDITION'
);