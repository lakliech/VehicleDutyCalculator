INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR  T/C  5 DOOR  250PS R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 21494232, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR  T/C  5 DOOR  250PS R-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR  T/C  5 DOOR  250PS R-DYNAMIC LIMITED EDITION', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 19960191, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR  T/C  5 DOOR  250PS R-DYNAMIC LIMITED EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR  T/C  5 DOOR 250PS LIMITED EDITION', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 20819570, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR  T/C  5 DOOR 250PS LIMITED EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR  T/C  5 DOOR 250PS R-DYNAMIC SE', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 19701220, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR  T/C  5 DOOR 250PS R-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR  T/C 250PS  5 DOOR AUTO R-DYNAMIC SE', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 20720364, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR  T/C 250PS  5 DOOR AUTO R-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR  T/C 250PS  5 DOOR R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 22576673, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR  T/C 250PS  5 DOOR R-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR  T/C 250PS  5 R-DYNAMIC SE', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'diesel', 19890199, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR  T/C 250PS  5 R-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR  T/C 5 DOOR 250PS R-DYNAMIC LE', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 21308906, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR  T/C 5 DOOR 250PS R-DYNAMIC LE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR T/C   5 DOOR  250PS S', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 17848867, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR T/C   5 DOOR  250PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR T/C 250PS  5 DOOR AUTO S', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 18037846, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR T/C 250PS  5 DOOR AUTO S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR T/C 250PS 5 DOOR  R-DYNAMIC S', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 20299804, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR T/C 250PS 5 DOOR  R-DYNAMIC S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR T/C 250PS 5 DOOR R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 21481755, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR T/C 250PS 5 DOOR R-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C   5 DOOR 200PS X-DYNAMIC SE', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 18286774, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C   5 DOOR 200PS X-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  3 DOOR  240PS FIRST EDITION 90', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 17613938, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  3 DOOR  240PS FIRST EDITION 90'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  3 DOOR 240PS', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 14624976, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  3 DOOR 240PS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  3 DOOR 240PS X-DYNAMIC HSE', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 19546325, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  3 DOOR 240PS X-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  3 DOOR 240PS X-DYNAMIC SE', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 18138269, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  3 DOOR 240PS X-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  3 DOOR 300PS', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 16108502, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  3 DOOR 300PS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  5 DOOR 200PS S', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 16240269, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  5 DOOR 200PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  5 DOOR 200PS X-DYNAMIC HSE', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 19941323, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  5 DOOR 200PS X-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  5 DOOR 240PS S', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 18466927, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  5 DOOR 240PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  5 DOOR 300PS XS EDITION', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 20052398, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  5 DOOR 300PS XS EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C 3 DOOR 240PS X-DYNAMIC HSE', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 19871027, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C 3 DOOR 240PS X-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C 3 DOOR 240PS X-DYNAMIC SE', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 17696407, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C 3 DOOR 240PS X-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C 5 DOOR  240PS X-DYNAMIC S', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 17658672, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C 5 DOOR  240PS X-DYNAMIC S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C 5 DOOR 240PS', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 15916176, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C 5 DOOR 240PS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C 5 DOOR 240PS S', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 16913714, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C 5 DOOR 240PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C 5 DOOR 240PS X-DYNAMIC SE', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 18960523, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C 5 DOOR 240PS X-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C  5 DOOR 240PS FIRST EDITION 110', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 18655905, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C  5 DOOR 240PS FIRST EDITION 110'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C  5 DOOR 240PS X-DYNAMIC HSE', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 20614768, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C  5 DOOR 240PS X-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C  AWD 3 DOOR 300PS XS EDITION', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 19207929, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C  AWD 3 DOOR 300PS XS EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C  AWD 5 DOOR  200PS X-DYNAMIC S', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 16985227, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C  AWD 5 DOOR  200PS X-DYNAMIC S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C 3 DOOR  240PS S', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 16067419, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C 3 DOOR  240PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C 3 DOOR 240PS S', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 17634935, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C 3 DOOR 240PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C 5 DOOR  240PS X-DYNAMIC HSE', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 20759317, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C 5 DOOR  240PS X-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C 5 DOOR  240PS X-DYNAMIC SE', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 18987607, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C 5 DOOR  240PS X-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT  T/C  5 DOOR  199PS', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 11787708, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT  T/C  5 DOOR  199PS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT  T/C  5 DOOR  199PS R-DYNAMIC S', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 13066285, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT  T/C  5 DOOR  199PS R-DYNAMIC S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT  T/C  5 DOOR 199PS R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 15732164, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT  T/C  5 DOOR 199PS R-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT  T/C  5 DOOR 199PS S', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 12621684, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT  T/C  5 DOOR 199PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT  T/C  5 DOOR 199PS URBAN EDITION', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 12650898, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT  T/C  5 DOOR 199PS URBAN EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT  T/C 5 DOOR 199PS R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 15678812, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT  T/C 5 DOOR 199PS R-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT  T/C 5 DOOR AUTO 199PS R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 16598446, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT  T/C 5 DOOR AUTO 199PS R-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT T/C  5 DOOR  199PS R-DYNAMIC SE', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 14094525, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT T/C  5 DOOR  199PS R-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT T/C  5 DOOR  199PS S', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 12682513, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT T/C  5 DOOR  199PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT T/C  5 DOOR 199PS R-DYNAMIC SE', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 14033392, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT T/C  5 DOOR 199PS R-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT T/C 5 DOOR 199PS R-DYNAMIC SE', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 15272858, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT T/C 5 DOOR 199PS R-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT T/C 5 DOOR 199PS S', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 13344731, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT T/C 5 DOOR 199PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT T/C 5 DOOR AUTO 199PS URBAN EDITION', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 13244308, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT T/C 5 DOOR AUTO 199PS URBAN EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE  T/C  5 DOOR  199PS R-DYNAMIC S', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 14523031, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE  T/C  5 DOOR  199PS R-DYNAMIC S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE  T/C  5 DOOR 199PS LAFAYETTE EDITION', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 15046145, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE  T/C  5 DOOR 199PS LAFAYETTE EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE  T/C  5 DOOR 199PS R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 17510167, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE  T/C  5 DOOR 199PS R-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE  T/C  5 DOOR 199PS R-DYNAMIC SE', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 16193709, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE  T/C  5 DOOR 199PS R-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE  T/C  AWD 5 DOOR 199PS AUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 19099594, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE  T/C  AWD 5 DOOR 199PS AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE  T/C 5 DOOR  199PS BRONZE COLLECTION', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 15207431, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE  T/C 5 DOOR  199PS BRONZE COLLECTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE  T/C 5 DOOR  199PS R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 17464825, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE  T/C 5 DOOR  199PS R-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE  T/C 5 DOOR 199PS AUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 19723740, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE  T/C 5 DOOR 199PS AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE  T/C 5 DOOR 199PS BRONZE COLLECTION', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 15841011, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE  T/C 5 DOOR 199PS BRONZE COLLECTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE  T/C 5 DOOR 199PS R-DYNAMIC SE', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 16239052, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE  T/C 5 DOOR 199PS R-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE  T/C 5 DOOR 199PS S', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 14346530, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE  T/C 5 DOOR 199PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE  T/C DIESEL  5 DOOR  199PS S', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 14301187, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE  T/C DIESEL  5 DOOR  199PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE 1999CC T/C DIESEL AWD 5 DOOR 199PS R-DYNAMIC SE', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 16759123, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE 1999CC T/C DIESEL AWD 5 DOOR 199PS R-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE T/C  5 DOOR 199PS', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 13342601, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE T/C  5 DOOR 199PS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE T/C  5 DOOR 199PS AUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 19144936, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE T/C  5 DOOR 199PS AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE T/C  5 DOOR 199PS S', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 14916812, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE T/C  5 DOOR 199PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE T/C DIESEL  5 DOOR 199PS R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 18056409, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE T/C DIESEL  5 DOOR 199PS R-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR  T/C   5 DOOR 199PS R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 22075774, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR  T/C   5 DOOR 199PS R-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR  T/C  5 DOOR  199PS R-DYNAMIC SE', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 20282762, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR  T/C  5 DOOR  199PS R-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR  T/C  5 DOOR  199PS S', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 18430714, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR  T/C  5 DOOR  199PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR  T/C  5 DOOR 199PS LIMITED EDITION', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 21401113, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR  T/C  5 DOOR 199PS LIMITED EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR  T/C  5 DOOR 199PS R-DYNAMIC LE', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 21919662, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR  T/C  5 DOOR 199PS R-DYNAMIC LE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR  T/C  5 DOOR 199PS R-DYNAMIC SE', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 21331121, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR  T/C  5 DOOR 199PS R-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR  T/C  5 DOOR 199PS S', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 18619692, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR  T/C  5 DOOR 199PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR  T/C 5 DOOR  199PS R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 23187734, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR  T/C 5 DOOR  199PS R-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR  T/C AWD 5 DOOR 199PS R-DYNAMIC LIMITED EDITION', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 20541733, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR  T/C AWD 5 DOOR 199PS R-DYNAMIC LIMITED EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR T/C  5 DOOR 199PS R-DYNAMIC S', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 20910560, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR T/C  5 DOOR 199PS R-DYNAMIC S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR T/C 5 DOOR 199PS R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 22063298, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR T/C 5 DOOR 199PS R-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER VELAR T/C 5 DOOR 199PS R-DYNAMIC SE', NULL, 'AUT', 'AWD', 1999, 'S/WAGON', NULL, '5', 'diesel', 20471741, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER VELAR T/C 5 DOOR 199PS R-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT  HSE', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 12963732, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT  HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT  HSE 286HP', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 15124354, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT  HSE 286HP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT  HSE LUXURY', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 14299666, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT  HSE LUXURY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT  HSE LUXURY 286HP', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 16189449, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT  HSE LUXURY 286HP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT  HSE R-DYNAMIC', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 16067724, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT  HSE R-DYNAMIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT  S', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 12750713, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT  S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT  S R- DYNAMIC', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 13115888, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT  S R- DYNAMIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT  SE', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 13800592, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT  SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT  SE R-DYNAMIC', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 14287493, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT  SE R-DYNAMIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT  SR- DYNAMIC', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 13268045, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT  SR- DYNAMIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT  STANDARD', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 11503030, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT  STANDARD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT HSE', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'diesel', 12840485, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT HSE LUXURY', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'diesel', 14179462, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT HSE LUXURY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT LANDMARK', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 13694083, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT LANDMARK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT SE', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'diesel', 11471077, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  DEFENDER 110', NULL, 'AUT', 'AWD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 15367804, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  DEFENDER 110'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  DEFENDER 110 S', NULL, 'AUT', 'AWD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 16372037, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  DEFENDER 110 S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  DEFENDER 90', NULL, 'AUT', 'AWD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 14028827, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  DEFENDER 90'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  DEFENDER 90 S', NULL, 'AUT', 'AWD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 15033060, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  DEFENDER 90 S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  EVOQUE  P250 FIRST EDITION', NULL, 'AUT', 'AWD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 17300191, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  EVOQUE  P250 FIRST EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  EVOQUE 286HP AUT.BIO', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 19962930, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  EVOQUE 286HP AUT.BIO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER  EVOQUE 286HP HSE DYNAMIC', NULL, 'AUT', '4WD', 2000, 'S/WAGON', NULL, NULL, 'petrol', 17437132, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER  EVOQUE 286HP HSE DYNAMIC'
);