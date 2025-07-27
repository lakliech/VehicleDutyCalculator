INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'V60 PLUS B4', NULL, 'AT', '2WD', 2000, 'S. WAGON', NULL, '5', 'hybrid', 9192151, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'V60 PLUS B4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'V60 RECHARGE ULTIMATE T6 AWD PLUGIN HYBRID', NULL, 'AT', '4WD', 2000, 'S. WAGON', NULL, '5', 'hybrid', 18527378, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'V60 RECHARGE ULTIMATE T6 AWD PLUGIN HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'V60 T5 INSCRIPTION', NULL, 'AT', '2WD', 2000, 'S. WAGON', NULL, '5', 'petrol', 9897732, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'V60 T5 INSCRIPTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'V60 T5 MOMENTUM', NULL, 'AT', '2WD', 2000, 'S. WAGON', NULL, '5', 'petrol', 8889535, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'V60 T5 MOMENTUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'V60 T6 TWIN ENGINE AWD INSCRIPTION', NULL, 'AT', '4WD', 2000, 'S. WAGON', NULL, '5', 'hybrid', 16487073, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'V60 T6 TWIN ENGINE AWD INSCRIPTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'V60 ULTIMATE B4', '5AA-ZB420TM2', 'AT', '2WD', 2000, 'S. WAGON', NULL, '5', 'hybrid', 11671484, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'V60 ULTIMATE B4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'V60 ULTIMATE B4 DARK EDITION', '5AA-ZB420TM', 'AT', '2WD', 2000, 'S. WAGON', NULL, '5', 'hybrid', 9622406, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'V60 ULTIMATE B4 DARK EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'V60 ULTRA B4', NULL, 'AT', '2WD', 2000, 'S. WAGON', NULL, '5', 'hybrid', 12749454, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'V60 ULTRA B4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'V90 90TH ANNIVERSARY EDITION', 'DBA-PB420', 'AT', '2WD', 2000, 'S. WAGON', NULL, '5', 'petrol', 13333015, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'V90 90TH ANNIVERSARY EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'V90 B6 AWD INSCRIPTION', NULL, 'AT', '4WD', 2000, 'S. WAGON', NULL, '5', 'hybrid', 9526275, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'V90 B6 AWD INSCRIPTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'V90 B6 AWD R-DESIGN', NULL, 'AT', '4WD', 2000, 'S. WAGON', NULL, '5', 'hybrid', 21739955, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'V90 B6 AWD R-DESIGN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'V90 CROSS COUNTRY B6 AWD PRO', NULL, 'AT', '4WD', 2000, 'S. WAGON', NULL, '5', 'hybrid', 13262307, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'V90 CROSS COUNTRY B6 AWD PRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'V90 CROSS COUNTRY D4 AWD PRO', NULL, 'AT', '4WD', 2000, 'S. WAGON', NULL, '5', 'diesel', 7878986, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'V90 CROSS COUNTRY D4 AWD PRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'V90 CROSS COUNTRY T5 AWD', 'DBA-PB420', 'AT', '4WD', 2000, 'S. WAGON', NULL, '5', 'petrol', 14503607, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'V90 CROSS COUNTRY T5 AWD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'V90 CROSS COUNTRY T5 AWD SUMMUM', NULL, 'AT', '2WD', 2000, 'S. WAGON', NULL, '5', 'petrol', 12436143, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'V90 CROSS COUNTRY T5 AWD SUMMUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'V90 D4 INSCRIPTION', 'LDA-PD4204T', 'AT', '2WD', 2000, 'S. WAGON', NULL, '5', 'diesel', 12386864, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'V90 D4 INSCRIPTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'V90 D4 NORDIC EDITION', NULL, 'AT', '2WD', 2000, 'S. WAGON', NULL, '5', 'diesel', 14425209, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'V90 D4 NORDIC EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'V90 RECHARGE ULTIMATE T8 AWD PLUG IN HYBRID', NULL, 'AT', '4WD', 2000, 'S. WAGON', NULL, '5', 'hybrid', 16630149, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'V90 RECHARGE ULTIMATE T8 AWD PLUG IN HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'V90 T5 MOMENTUM', NULL, 'AT', '2WD', 2000, 'S. WAGON', NULL, '5', 'petrol', 10671967, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'V90 T5 MOMENTUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'V90 T6 AWD INSCRIPTION', NULL, 'AT', '4WD', 2000, 'S. WAGON', NULL, '5', 'petrol', 9734776, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'V90 T6 AWD INSCRIPTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'V90 T8 TWIN ENGINE AWD INSCRIPTION', NULL, 'AT', '4WD', 2000, 'S. WAGON', NULL, '5', 'hybrid', 14604404, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'V90 T8 TWIN ENGINE AWD INSCRIPTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'V90 ULTIMATE B5', '5AA-PB420TM2', 'AT', '2WD', 2000, 'S. WAGON', NULL, '5', 'hybrid', 14755600, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'V90 ULTIMATE B5'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'VOLVO V90', NULL, 'AT', '4WD', 2000, 'S. WAGON', NULL, '5', 'diesel', 15379572, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'VOLVO V90'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'XC40 RECHARGE RECHARGE PLUS SINGLE MOTOR', 'ZAA-XE400RXCE', 'AT', '2WD', NULL, 'SUV', NULL, '5', 'electric', 6488731, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'XC40 RECHARGE RECHARGE PLUS SINGLE MOTOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'XC40 RECHARGE RECHARGE ULTIMATE SINGLE MOTOR', 'ZAA-XE400RXCE', 'AT', '2WD', NULL, 'SUV', NULL, '5', 'electric', 7067242, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'XC40 RECHARGE RECHARGE ULTIMATE SINGLE MOTOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'XC40 RECHARGE RECHARGE ULTIMATE TWIN MOTOR', 'ZAA-XE400AXCE', 'AT', '4WD', NULL, 'SUV', NULL, '5', 'electric', 6247331, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'XC40 RECHARGE RECHARGE ULTIMATE TWIN MOTOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'XC60 B5 AWD INSCRIPTION', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'hybrid', 11199696, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'XC60 B5 AWD INSCRIPTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'XC60 D4 AWD INSCRIPTION', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'diesel', 11446090, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'XC60 D4 AWD INSCRIPTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'XC60 D4 AWD MOMENTUM', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'diesel', 18201747, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'XC60 D4 AWD MOMENTUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'XC60 PLUS B5', '5AA-UB420TXCM', 'AT', '4WD', 2000, 'SUV', NULL, '5', 'hybrid', 11559020, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'XC60 PLUS B5'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'XC60 RECHARGE PLUG IN HYBRID T8 AWD INSCRIPTION EXPRESSION', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'hybrid', 10129005, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'XC60 RECHARGE PLUG IN HYBRID T8 AWD INSCRIPTION EXPRESSION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'XC60 T5 AWD INSCRIPTION', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'petrol', 14056739, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'XC60 T5 AWD INSCRIPTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'XC60 T6 AWD R-DESIGN', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'petrol', 14348155, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'XC60 T6 AWD R-DESIGN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'XC60 T8 TWIN ENGINE AWD INSCRIPTION', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'hybrid', 15333728, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'XC60 T8 TWIN ENGINE AWD INSCRIPTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'XC60 ULTIMATE B5 AWD', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'hybrid', 11412771, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'XC60 ULTIMATE B5 AWD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'XC60 ULTRA B5 AWD', '5AA-UB420TXCM2A', 'AT', '4WD', 2000, 'SUV', NULL, '5', 'hybrid', 16608590, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'XC60 ULTRA B5 AWD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'XC90', NULL, 'AT', '2WD', 2000, 'SUV', NULL, '5', 'hybrid', 17260599, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'XC90'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'XC90 B5 AWD MOMENTUM', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'petrol', 12559993, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'XC90 B5 AWD MOMENTUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'XC90 B5 AWD MOMENTUM', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'hybrid', 12559993, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'XC90 B5 AWD MOMENTUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'XC90 B6 AWD INSCRIPTION', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'hybrid', 15819571, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'XC90 B6 AWD INSCRIPTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'XC90 B6 AWD R DESIGN', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'hybrid', 15243160, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'XC90 B6 AWD R DESIGN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'XC90 D5 AWD INSCRIPTION', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'diesel', 18160084, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'XC90 D5 AWD INSCRIPTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'XC90 RECHARGE PLUG IN HYBRID T8 AWD INSCRIPTION', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'hybrid', 16153229, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'XC90 RECHARGE PLUG IN HYBRID T8 AWD INSCRIPTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'XC90 RECHARGE ULTIMATE T8 AWD PLUGIN HYBRID', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'hybrid', 16865343, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'XC90 RECHARGE ULTIMATE T8 AWD PLUGIN HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'XC90 T6 AWD INSCRIPTION', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'petrol', 21247168, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'XC90 T6 AWD INSCRIPTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'XC90 ULTIMATE B5 AWD', '5AA-LB420TXCM2A', 'AT', '4WD', 2000, 'SUV', NULL, '5', 'hybrid', 14942635, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'XC90 ULTIMATE B5 AWD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'XC90 ULTIMATE B6 AWD', '5AA-LB420TXCM', 'AT', '4WD', 2000, 'SUV', NULL, '5', 'hybrid', 16153229, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'XC90 ULTIMATE B6 AWD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'XC90 ULTIMATE B6 AWD', '5AA-LB420TXCM', 'AT', '4WD', 2000, 'SUV', NULL, '5', 'hybrid', 16843643, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'XC90 ULTIMATE B6 AWD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'XC90 ULTIMATE B6 AWD', NULL, 'AT', '4WD', 2000, 'SUV', NULL, '5', 'hybrid', 14550646, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'XC90 ULTIMATE B6 AWD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'XC90 ULTRA B5 AWD', '5AA-LB420TXCM2', 'AT', '4WD', 2000, 'SUV', NULL, '5', 'hybrid', 18958566, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'XC90 ULTRA B5 AWD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'XC90 ULTRA B5 AWD', '5AA-LB420TXCM2A', 'AT', '4WD', 2000, 'SUV', NULL, '5', 'hybrid', 15512980, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'XC90 ULTRA B5 AWD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'XPENG', 'G6 AWD PERFORMANCE', NULL, 'AUT', 'AWD', NULL, NULL, '2195 kg', '5', 'electric', 10891922, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'XPENG' AND model = 'G6 AWD PERFORMANCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'XPENG', 'G6 RWD LONG RANGE', NULL, 'AUT', 'RWD', NULL, NULL, '2100 kg', '5', 'electric', 10047587, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'XPENG' AND model = 'G6 RWD LONG RANGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'XPENG', 'G6 RWD STANDARD RANGE', NULL, 'AUT', 'RWD', NULL, NULL, '2100 kg', '5', 'electric', 9203252, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'XPENG' AND model = 'G6 RWD STANDARD RANGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'XPENG', 'G9 AWD PERFORMANCE', NULL, 'AUT', 'AWD', NULL, NULL, '2415 kg', '5', 'electric', 14691429, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'XPENG' AND model = 'G9 AWD PERFORMANCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'XPENG', 'G9 RWD LONG RANGE', NULL, 'AUT', 'RWD', NULL, NULL, '2285 kg', '5', 'electric', 13002759, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'XPENG' AND model = 'G9 RWD LONG RANGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'XPENG', 'G9 RWD STANDARD RANGE', NULL, 'AUT', 'RWD', NULL, NULL, '2310 kg', '5', 'electric', 12158424, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'XPENG' AND model = 'G9 RWD STANDARD RANGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'XPENG', 'P7 AWD PERFORMANCE', NULL, 'AUT', 'AWD', NULL, NULL, '2215 kg', '5', 'electric', 12369508, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'XPENG' AND model = 'P7 AWD PERFORMANCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'XPENG', 'P7 RWD LONG RANGE', NULL, 'AUT', 'RWD', NULL, NULL, '2095 kg', '5', 'electric', 10469754, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'XPENG' AND model = 'P7 RWD LONG RANGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'XPENG', 'P7 WING EDITION', NULL, 'AUT', 'AWD', NULL, NULL, '2255 kg', '5', 'electric', 14691429, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'XPENG' AND model = 'P7 WING EDITION'
);