INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'OPEL', 'ASTRA CDTI SELECT', NULL, '6MT', '2WD', 2000, 'HATCHBACK', NULL, NULL, 'diesel', 4868516, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'OPEL' AND model = 'ASTRA CDTI SELECT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'OPEL', 'ASTRA CDTI SELECT SPORTS TOURER', NULL, '6AT', '4WD', 2000, 'WAGON', NULL, NULL, 'diesel', 4981737, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'OPEL' AND model = 'ASTRA CDTI SELECT SPORTS TOURER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'OPEL', 'ASTRA CDTI SPORTS TOURER', NULL, '6AT', '4WD', 2000, 'WAGON', NULL, NULL, 'diesel', 4472241, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'OPEL' AND model = 'ASTRA CDTI SPORTS TOURER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'OPEL', 'ASTRA GTC 1.4', NULL, '6MT', '2WD', 1400, 'HATCHBACK', NULL, NULL, 'petrol', 3736303, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'OPEL' AND model = 'ASTRA GTC 1.4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'OPEL', 'ASTRA GTC 1.6 SPORT', NULL, '6MT', '2WD', 1600, 'HATCHBACK', NULL, NULL, 'petrol', 4925127, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'OPEL' AND model = 'ASTRA GTC 1.6 SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'OPEL', 'ASTRA OPC', NULL, '6MT', '2WD', 2000, 'HATCHBACK', NULL, NULL, 'petrol', 7019721, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'OPEL' AND model = 'ASTRA OPC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'OPEL', 'CORSA (BASE)', NULL, '5MT', '2WD', 1400, 'HATCHBACK', NULL, NULL, 'petrol', 3113586, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'OPEL' AND model = 'CORSA (BASE)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'OPEL', 'CORSA COLOUR', NULL, '5MT', '2WD', 1400, 'HATCHBACK', NULL, NULL, 'petrol', 2906013, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'OPEL' AND model = 'CORSA COLOUR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'OPEL', 'CORSA ENJOY', NULL, '5MT', '2WD', 1400, 'HATCHBACK', NULL, NULL, 'petrol', 2957907, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'OPEL' AND model = 'CORSA ENJOY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'OPEL', 'CORSA OPC', NULL, '6MT', '2WD', 1600, 'HATCHBACK', NULL, NULL, 'petrol', 4642073, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'OPEL' AND model = 'CORSA OPC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'OPEL', 'INSIGNIA (BASE)', NULL, '6AT', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 6340393, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'OPEL' AND model = 'INSIGNIA (BASE)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'OPEL', 'INSIGNIA CDTI', NULL, '6AT', '2WD', 2000, 'SEDAN', NULL, NULL, 'diesel', 6170561, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'OPEL' AND model = 'INSIGNIA CDTI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'OPEL', 'INSIGNIA CDTI SELECT', NULL, '6AT', '2WD', 2000, 'SEDAN', NULL, NULL, 'diesel', 7246163, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'OPEL' AND model = 'INSIGNIA CDTI SELECT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'OPEL', 'INSIGNIA CDTI SELECT SPORTS TOURER', NULL, '6AT', '4WD', 2000, 'WAGON', NULL, NULL, 'diesel', 7529217, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'OPEL' AND model = 'INSIGNIA CDTI SELECT SPORTS TOURER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'OPEL', 'INSIGNIA CDTI SPORTS TOURER', NULL, '6AT', '4WD', 2000, 'WAGON', NULL, NULL, 'diesel', 6453614, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'OPEL' AND model = 'INSIGNIA CDTI SPORTS TOURER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'OPEL', 'INSIGNIA OPC', NULL, '6AT', '2WD', 2800, 'HATCHBACK', NULL, NULL, 'petrol', 11718405, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'OPEL' AND model = 'INSIGNIA OPC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'OPEL', 'INSIGNIA SELECT', NULL, '6AT', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 7019721, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'OPEL' AND model = 'INSIGNIA SELECT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'OPEL', 'INSIGNIA SELECT SPORTS TOURER', NULL, '6AT', '4WD', 2000, 'WAGON', NULL, NULL, 'petrol', 7868881, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'OPEL' AND model = 'INSIGNIA SELECT SPORTS TOURER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'OPEL', 'INSIGNIA SPORTS TOURER', NULL, '6AT', '4WD', 2000, 'WAGON', NULL, NULL, 'petrol', 6680057, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'OPEL' AND model = 'INSIGNIA SPORTS TOURER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'OPEL', 'ZAFIRA TOURER', NULL, '6AT', '4WD', 1600, 'WAGON', NULL, NULL, 'petrol', 5774286, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'OPEL' AND model = 'ZAFIRA TOURER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'OPEL', 'ZAFIRA TOURER LUXURY', NULL, '6AT', '4WD', 2000, 'WAGON', NULL, NULL, 'diesel', 6849889, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'OPEL' AND model = 'ZAFIRA TOURER LUXURY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '2008 ALLURE', NULL, '6AT', NULL, 1200, 'SUV', NULL, NULL, 'electric', 6018420, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '2008 ALLURE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '2008 ALLURE', NULL, '6AT', NULL, 1200, 'SUV', NULL, NULL, 'petrol', 5402393, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '2008 ALLURE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '2008 ALLURE HYBRID', NULL, '6AT', NULL, 1200, 'SUV', NULL, NULL, 'electric', 5740127, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '2008 ALLURE HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '2008 GT', NULL, '6AT', NULL, 1200, 'SUV', NULL, NULL, 'electric', 6798585, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '2008 GT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '2008 GT', NULL, '6AT', NULL, 1200, 'SUV', NULL, NULL, 'petrol', 6010314, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '2008 GT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '2008 GT HYBRID', NULL, '6AT', NULL, 1200, 'SUV', NULL, NULL, 'electric', 6685782, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '2008 GT HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '3008 ALLURE 1.6 THP', NULL, '6AT', NULL, 1600, 'SUV', NULL, NULL, 'electric', 7931683, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '3008 ALLURE 1.6 THP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '3008 ALLURE 1.6 THP', NULL, '6AT', NULL, 1600, 'SUV', NULL, NULL, 'petrol', 6764812, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '3008 ALLURE 1.6 THP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '3008 ALLURE HYBRID', NULL, '6AT', NULL, 1200, 'SUV', NULL, NULL, 'electric', 7158610, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '3008 ALLURE HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '3008 GT 1.6 THP', NULL, '6AT', NULL, 1600, 'SUV', NULL, NULL, 'electric', 9176233, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '3008 GT 1.6 THP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '3008 GT PREMIUM HYBRID', NULL, '6AT', NULL, 1200, 'SUV', NULL, NULL, 'electric', 8779733, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '3008 GT PREMIUM HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '3008 GT SPORT 1.6 THP', NULL, '8AT', NULL, 1600, 'SUV', NULL, NULL, 'electric', 9473439, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '3008 GT SPORT 1.6 THP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '3008 GT SPORT 1.6 THP', NULL, '8AT', NULL, 1600, 'SUV', NULL, NULL, 'petrol', 7754373, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '3008 GT SPORT 1.6 THP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '3008 GT SPORT 1.6L THP AWD PHEV', NULL, '8AT', NULL, 1600, 'SUV', NULL, NULL, 'electric', 11201286, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '3008 GT SPORT 1.6L THP AWD PHEV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '308 GT', NULL, '8AT', NULL, 1200, 'HATCHBACK', NULL, NULL, 'petrol', 5942767, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '308 GT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '308 GT HYBRID', NULL, '6AT', NULL, 1200, 'HATCHBACK', NULL, NULL, 'electric', 6618235, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '308 GT HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '308 GT PREMIUM', NULL, '8AT', NULL, 1200, 'HATCHBACK', NULL, NULL, 'petrol', 6618235, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '308 GT PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '308 GT PREMIUM', NULL, '8AT', NULL, 1200, 'WAGON', NULL, NULL, 'petrol', 6820876, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '308 GT PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '308 GT SPORT PHEV', NULL, '8AT', NULL, 1600, 'HATCHBACK', NULL, NULL, 'electric', 8779733, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '308 GT SPORT PHEV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '408 GT PHEV', NULL, '8AT', NULL, 1600, 'SUV', NULL, NULL, 'electric', 9185014, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '408 GT PHEV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '408 GT PREMIUM HYBRID', NULL, '6AT', NULL, 1200, 'SUV', NULL, NULL, 'electric', 7834078, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '408 GT PREMIUM HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '508 GT PHEV', NULL, '8AT', NULL, 1600, 'SEDAN', NULL, NULL, 'electric', 10123577, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '508 GT PHEV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '508 GT PHEV', NULL, '8AT', NULL, 1600, 'WAGON', NULL, NULL, 'electric', 10290755, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '508 GT PHEV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', 'BOXER PRO LWB', NULL, '6MT', NULL, 2000, 'VAN', NULL, NULL, 'diesel', 7366249, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = 'BOXER PRO LWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', 'E-2008 GT', NULL, '1AT', NULL, NULL, 'SUV', NULL, NULL, 'electric', 7615902, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = 'E-2008 GT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', 'E-208 GT', NULL, '1AT', NULL, NULL, 'HATCHBACK', NULL, NULL, 'electric', 7597326, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = 'E-208 GT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', 'E-308 GT', NULL, '1AT', NULL, NULL, 'HATCHBACK', NULL, NULL, 'electric', 9185014, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = 'E-308 GT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', 'E-EXPERT PRO LONG', NULL, '1AT', NULL, NULL, 'VAN', NULL, NULL, 'electric', 10806137, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = 'E-EXPERT PRO LONG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', 'E-PARTNER PRO LONG', NULL, '1AT', NULL, NULL, 'VAN', NULL, NULL, 'electric', 6687133, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = 'E-PARTNER PRO LONG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', 'EXPERT CITY SHORT', NULL, '6MT', NULL, 2000, 'VAN', NULL, NULL, 'diesel', 5875221, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = 'EXPERT CITY SHORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', 'EXPERT PREMIUM LONG', NULL, '8AT', NULL, 2000, 'VAN', NULL, NULL, 'diesel', 7361250, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = 'EXPERT PREMIUM LONG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', 'EXPERT PREMIUM SHORT', NULL, '8AT', NULL, 2000, 'VAN', NULL, NULL, 'diesel', 7023516, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = 'EXPERT PREMIUM SHORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', 'EXPERT PRO LONG', NULL, '6MT', NULL, 2000, 'VAN', NULL, NULL, 'diesel', 6348048, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = 'EXPERT PRO LONG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', 'EXPERT PRO LONG', NULL, '8AT', NULL, 2000, 'VAN', NULL, NULL, 'diesel', 6820876, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = 'EXPERT PRO LONG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', 'EXPERT PRO SHORT', NULL, '8AT', NULL, 2000, 'VAN', NULL, NULL, 'diesel', 6483142, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = 'EXPERT PRO SHORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', 'PARTNER CITY SHORT', NULL, '6MT', NULL, 1200, 'VAN', NULL, NULL, 'petrol', 4086581, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = 'PARTNER CITY SHORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', 'PARTNER PREMIUM LONG', NULL, '8AT', NULL, 1200, 'VAN', NULL, NULL, 'petrol', 5739789, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = 'PARTNER PREMIUM LONG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', 'PARTNER PREMIUM SHORT', NULL, '8AT', NULL, 1200, 'VAN', NULL, NULL, 'petrol', 4885322, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = 'PARTNER PREMIUM SHORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', 'PARTNER PRO LONG', NULL, '8AT', NULL, 1200, 'VAN', NULL, NULL, 'petrol', 5331131, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = 'PARTNER PRO LONG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', 'PARTNER PRO SHORT', NULL, '8AT', NULL, 1200, 'VAN', NULL, NULL, 'petrol', 4941048, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = 'PARTNER PRO SHORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '208 TECH PACK EDITION', 'ABA-A9HN01', 'AT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 1107943, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '208 TECH PACK EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '2008 CROSSCITY', 'VF3CUHNZTHY15', 'AT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 1203336, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '2008 CROSSCITY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '2008', 'VF3CUHNZTJY21', 'AT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 1483901, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '2008'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '208 ALLURE FUN EDITION', 'VF3CCHNZTKW10', 'AT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 1551043, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '208 ALLURE FUN EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '208 ALLURE CIELO PACKAGE', 'ABA-A9HN01', 'AT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 1376512, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '208 ALLURE CIELO PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '208 STYLE', 'VR3UPHNKSNT00', 'AT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 2692655, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '208 STYLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '308 TECH PACK EDITION', 'VF3LPHNSRKS30', 'AT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 2025102, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '308 TECH PACK EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '308 SW ALLURE BLUE HDI', 'VF3LCYHZRJS41', 'AT', '2WD', 1500, 'SUV', NULL, NULL, 'diesel', 1807616, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '308 SW ALLURE BLUE HDI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '2008 GT LINE BLACK PACK', 'ABA-A94HN01', 'AT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 1646629, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '2008 GT LINE BLACK PACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '308 SW ALLURE SPECIAL EDITION', 'ABA-T9WHN02', 'AT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 1712997, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '308 SW ALLURE SPECIAL EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '208 GT', 'VR3UPHNKSPT55', 'AT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 4008797, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '208 GT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '2008 ALLURE', 'VR3USHNSSLJ79', 'AT', '2WD', 1200, 'SUV', NULL, NULL, 'petrol', 3035138, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '2008 ALLURE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '208 ALLURE', '3BA-P21HN05', 'AT', '2WD', 1200, 'SUV', NULL, NULL, 'petrol', 2343399, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '208 ALLURE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '308 ALLURE', 'VR3FPHNSTPY62', 'AT', '2WD', 1200, 'SUV', NULL, NULL, 'petrol', 3780475, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '308 ALLURE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '308 ALLURE BLUE HDI SPECIAL EDITION', 'LDA-T9BH01', 'AT', '2WD', 1600, 'SUV', NULL, NULL, 'diesel', 1959068, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '308 ALLURE BLUE HDI SPECIAL EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '308 TECH PACK EDITION BLUE HDI', 'VF3LBYHZRKS38', 'AT', '2WD', 1500, 'SUV', NULL, NULL, 'diesel', 2249361, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '308 TECH PACK EDITION BLUE HDI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '5008 CROSSCITY', 'ABA-P875G01', 'AT', '2WD', 1600, 'SUV', NULL, NULL, 'petrol', 2278227, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '5008 CROSSCITY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', 'E-208 GT', 'VR3UHZKXZPT50', 'AT', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 4061040, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = 'E-208 GT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '2008 GT PACK BLUE HDI', 'VR3UDYHZSNJ56', 'AT', '2WD', 1500, 'HATCHBACK', NULL, NULL, 'diesel', 3639418, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '2008 GT PACK BLUE HDI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '308 SW GT LINE BLUE HDI BLACK PACK', 'LDA-T9WYH01', 'AT', '2WD', 1500, 'SUV', NULL, NULL, 'diesel', 2759797, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '308 SW GT LINE BLUE HDI BLACK PACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '308 SW GT LINE BLUE HDI', 'VF3LCYHZRKS26', 'AT', '2WD', 1500, 'SUV', NULL, NULL, 'diesel', 2559531, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '308 SW GT LINE BLUE HDI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '3008 GT LINE', 'VF3M45GFRKS49', 'AT', '2WD', 1600, 'SUV', NULL, NULL, 'petrol', 3246679, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '3008 GT LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', 'E-208 GT LINE', 'ZAA-P21ZK01', 'AT', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 3256811, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = 'E-208 GT LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '308 SW ROADTRIP', '3BA-T9WHN05', 'AT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 3270039, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '308 SW ROADTRIP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '208 GT LINE', '3BA-P21HN05', 'AT', '2WD', 1200, 'SUV', NULL, NULL, 'petrol', 2959869, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '208 GT LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '308 GT PURETECH EDITION', 'VR3FPHNSTPY60', 'AT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 5271148, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '308 GT PURETECH EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '308 GT HYBRID', 'PY50', 'AT', '2WD', 1600, 'SUV', NULL, NULL, 'hybrid', 6731883, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '308 GT HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '308', 'PY61', 'AT', '2WD', 1600, 'SUV', NULL, NULL, 'hybrid', 6731883, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '308'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '2008 GT BLUE HDI DEBUT EDITION', 'VR3UDYHZSPJ83', 'AT', '2WD', 1200, 'SUV', NULL, NULL, 'petrol', 5391888, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '2008 GT BLUE HDI DEBUT EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '5008 ALLURE', 'VF3M45GZWJL00', 'AT', '2WD', 1600, 'SUV', NULL, NULL, 'petrol', 2374903, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '5008 ALLURE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '2008 GT', 'VR3USHNSSPJ77', 'AT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 5441616, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '2008 GT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', 'E-2008 GT', 'VR3UKZKXZMJ55', 'AT', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 3406258, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = 'E-2008 GT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '308 GT HYBRID SPECIAL EDITION', '3LA-P515G06H', 'AT', '2WD', 1600, 'SUV', NULL, NULL, 'hybrid', 6849034, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '308 GT HYBRID SPECIAL EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '508 SW ALLURE', 'VR3F45GFRLY00', 'AT', '2WD', 1600, 'HATCHBACK', NULL, NULL, 'petrol', 3083934, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '508 SW ALLURE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '308 GT BLUE HDI', 'VF3LHAHWWHS24', 'AT', '2WD', 2000, 'SUV', NULL, NULL, 'diesel', 2406988, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '308 GT BLUE HDI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', 'RIFTER DEBUT EDITION', 'VR3ECYHZRKJ83', 'AT', '2WD', 1500, 'WAGON', NULL, NULL, 'diesel', 3122404, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = 'RIFTER DEBUT EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '408 ALLURE', '3BA-P54HN05', 'AT', '2WD', 1200, 'SUV', NULL, NULL, 'petrol', 4894997, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '408 ALLURE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '2008 GT BLUE HDI', 'VR3UDYHZSNJ70', 'AT', '2WD', 1500, 'HATCHBACK', NULL, NULL, 'diesel', 4230347, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '2008 GT BLUE HDI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PEUGEOT', '308 ALLURE BLUE HDI', 'VR3FBYHZTNY58', 'AT', '2WD', 1500, 'SUV', NULL, NULL, 'diesel', 4249116, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PEUGEOT' AND model = '308 ALLURE BLUE HDI'
);