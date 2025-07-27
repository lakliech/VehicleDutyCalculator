INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA  AXIO', '6AA-NKE165-AEXNB', 'CVT', '2WD', 1496, 'SALOON', '1415', '5', 'petrol', 3236062, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA  AXIO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA AXIO EX', '6AA-NKE165-AEXNB', 'CVT', '2WD', 1496, 'VAN', '1415', '5', 'petrol', 3698165, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA AXIO EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA AXIO EX', '6AA-NKE165-AEXNB', 'CVT', '2WD', 1496, 'SALOON', '1415', '5', 'petrol', 3650211, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA AXIO EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA AXIO G', 'DBA-NRE161-VQQBXE', 'CVT', '2WD', 1496, 'SALOON', '1405', '4', 'petrol', 3406106, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA AXIO G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA AXIO HYBRID EX', 'DAA-NKE165-AEXNB', 'CVT', '2WD', 1496, 'SALOON', '1415', '5', 'petrol', 3236062, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA AXIO HYBRID EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA AXIO HYBRID EX', '6AA-NKE165-AEXNB', 'CVT', '2WD', 1496, 'SALOON', '1415', '5', 'petrol', 3578112, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA AXIO HYBRID EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA AXIO HYBRID G', 'DAA-NKE165-AEXEB', 'CVT', '2WD', 1496, 'SALOON', '1415', '5', 'petrol', 3579355, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA AXIO HYBRID G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA CROSS Z HYBRID', '6AA-ZVG11-KHXEB', 'CVT', '2WD', 1797, 'SALOON', '1685', '5', 'petrol', 5222272, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA CROSS Z HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA CROSS Z HYBRID', '6AA-ZVG13-KHXEB', 'CVT', '2WD', 1797, 'SALOON', '1675', '5', 'petrol', 5676383, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA CROSS Z HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA FIELDER EX', '6AA-NKE165-AWXNB', 'CVT', '2WD', 1496, 'WAGON', '1445', '5', 'petrol', 3955374, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA FIELDER EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA FIELDER EX', '6AA-NKE165G-AWXNB', 'CVT', '2WD', 1496, 'WAGON', '1445', '5', 'petrol', 3907419, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA FIELDER EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA FIELDER HYBRID EX', '6AA-NKE165-AWXNB', 'CVT', '2WD', 1496, 'WAGON', '1445', '5', 'petrol', 3843704, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA FIELDER HYBRID EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA FIELDER HYBRID G', 'DAA-NKE165G-AWXEB-X', 'CVT', '2WD', 1496, 'WAGON', '1445', '5', 'petrol', 3938606, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA FIELDER HYBRID G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA FILEDER HYBRID EX', 'DAA-NKE165G-AWXNB', 'CVT', '2WD', 1496, 'WAGON', '1445', '5', 'petrol', 3477509, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA FILEDER HYBRID EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA FILEDER HYBRID G', 'DAA-NKE165G-VQQBXE', 'CVT', '2WD', 1496, 'WAGON', '1485', '5', 'petrol', 3958727, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA FILEDER HYBRID G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA FILEDER HYBRID WX', '6AA-NKE165G-AWXNB', 'CVT', '2WD', 1496, 'WAGON', '1445', '5', 'petrol', 3477509, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA FILEDER HYBRID WX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA HIGH 1ZR', 'ZRE182R-GEXGKN', 'CVT', '2WD', 1800, 'SEDAN', NULL, NULL, 'petrol', 4620000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA HIGH 1ZR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA MID 1ZR', 'ZRE182R-GEFNKN', 'MT', '2WD', 1800, 'SEDAN', NULL, NULL, 'petrol', 4368000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA MID 1ZR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA MID 1ZR', 'ZRE182R-GEXNKN', 'CVT', '2WD', 1800, 'SEDAN', NULL, NULL, 'petrol', 4620000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA MID 1ZR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA HYBRID WXB', '6AA-ZWE211-AEXSB', 'CVT', '2WD', 1797, 'WAGON', '1645', '5', 'petrol', 4366448, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA HYBRID WXB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA SPORT G', '6AA-ZWE219-BHXNZ-Z', 'CVT', '2WD', 1797, 'WAGON', '1665', '5', 'petrol', 5047614, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA SPORT G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA SPORT G', '6AA-ZWE219H-BHXNZ-Z', 'CVT', '2WD', 1797, 'WAGON', '1665', '5', 'petrol', 5201488, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA SPORT G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA SPORT GZ (HYBRID)', '6AA-2WE219H-BHXNZ-Z', 'CVT', '2WD', 1797, 'WAGON', '1665', '5', 'petrol', 5047614, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA SPORT GZ (HYBRID)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA SPORT HYBRID G', '6AA-ZWE211-BHXNB-Z', 'CVT', '2WD', 1797, 'WAGON', '1675', '5', 'petrol', 4485216, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA SPORT HYBRID G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA SPORT HYBRID G', '6AA-ZWE213H-BHXNB-Z', 'CVT', '2WD', 1797, 'WAGON', '1665', '5', 'petrol', 4962032, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA SPORT HYBRID G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA SPORT HYBRID G Z', '6AA-ZWE213H-BHXNB-Z', 'CVT', '2WD', 1797, 'WAGON', '1665', '5', 'petrol', 4510938, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA SPORT HYBRID G Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA SPORT HYBRID G Z', '6AA-ZWE211H-BHXNB-Z', 'CVT', '2WD', 1797, 'WAGON', '1675', '5', 'petrol', 4348983, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA SPORT HYBRID G Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA TOURING HYBRID WXB', '6AA-ZWE211W-AWXSB', 'CVT', '2WD', 1797, 'WAGON', '1665', '5', 'petrol', 4445045, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA TOURING HYBRID WXB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA TOURING WXB', '6AA-ZWE219-AWXSB', 'CVT', '2WD', 1797, 'WAGON', '1665', '5', 'petrol', 4977751, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA TOURING WXB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA TOURING WXB', '6AA-ZWE211W-AHXEB', 'CVT', '2WD', 1797, 'WAGON', '1665', '5', 'petrol', 4882563, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA TOURING WXB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA TOURING WXB (HYBRID)', '6AA-ZWE219W-AEXSB', 'CVT', '2WD', 1797, 'WAGON', '1665', '5', 'petrol', 4977751, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA TOURING WXB (HYBRID)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA TOURING WXB HYBRID', '6AA-ZWE219W-AWZSB', 'CVT', '2WD', 1797, 'WAGON', '1665', '5', 'petrol', 5097043, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA TOURING WXB HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA WXB', '6AA-ZWE219-AEXSB', 'CVT', '2WD', 1797, 'WAGON', '1645', '5', 'petrol', 4890422, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA WXB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA WXB HYBRID', '6AA-ZWE219-AEXSB', 'CVT', '2WD', 1797, 'WAGON', '1645', '5', 'petrol', 5009714, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA WXB HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COROLLA Z(HYBRID)', '6AA-ZVG13-KHXEB', 'CVT', '4WD', 1797, 'WAGON', '1685', '5', 'petrol', 5676383, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COROLLA Z(HYBRID)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'CROWN', '6AA-AZSH20-AEXAB', 'CVT', '2WD', 2487, 'SEDAN', '2045', '5', 'petrol', 9379131, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'CROWN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'CROWN 2.0 ATHLETE G.T', 'DAA-ARS210-AEZYZ', '8AT', '2WD', 1998, 'SEDAN', '1905', '5', 'petrol', 8778082, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'CROWN 2.0 ATHLETE G.T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'CROWN COMFORT DELUX', 'DBA-TSS10-AEPDC', '4AT', '2WD', 1998, 'SEDAN', '1675', '5', 'petrol', 4357981, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'CROWN COMFORT DELUX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'CROWN CROSSOVER RS', '5AA-TZSH35-AETAT', '6AT', '4WD', 2185, 'SEDAN', '2185', '5', 'petrol', 11702082, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'CROWN CROSSOVER RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'CROWN G', '6AA-GW224-AEXEB', 'CVT', '2WD', 3456, 'SEDAN', '2175', '5', 'petrol', 13945458, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'CROWN G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'CROWN HYBRID SALOON G', 'DAA-AWS210-AEXUH', 'CVT', 'AWD', 2493, 'SEDAN', '1955', '5', 'petrol', 9365039, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'CROWN HYBRID SALOON G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'CROWN MAJESTA F VERSION', 'DAA-GWS214-AEXZB(F)', 'CVT', 'AWD', 3456, 'SEDAN', '2105', '5', 'petrol', 12243058, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'CROWN MAJESTA F VERSION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'CROWN RS ADVANCE', '6AA-AZSH20-AEXAB', 'CVT', '2WD', 2487, 'SEDAN', '2045', '5', 'petrol', 9379131, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'CROWN RS ADVANCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'CROWN RS ADVANCED', '5AA-TZSH35-AETAT(F)', '6AT', 'AWD', 2393, 'SEDAN', '2195', '5', 'petrol', 11178108, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'CROWN RS ADVANCED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'CROWN SEDAN SUPER SALOON', 'DBA-TSS10H-CEPJC', '4AT', '2WD', 1998, 'SEDAN', '1735', '5', 'petrol', 4961981, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'CROWN SEDAN SUPER SALOON'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'CROWN SPORT RS', '6LA-AZSH37W-BNXGB', 'CVT', '4WD', 2305, 'SEDAN', '2305', '5', 'petrol', 13361332, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'CROWN SPORT RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'CROWN SPORT Z', '6AA-AZSH36-BNXGB', 'CVT', '4WD', 2085, 'SEDAN', '2085', '5', 'petrol', 10304818, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'CROWN SPORT Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'CROWN SPORT Z (2.5L HYBRID)', '6AA-AZSH36W-BNXGB', 'CVT', '4WD', 2487, 'SEDAN', '2085', '5', 'petrol', 10304818, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'CROWN SPORT Z (2.5L HYBRID)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'CROWN TURBO HYBRID CROSSIOVER RS', '5AA-TZSH35-ATAT(F)', '6AT', '4WD', 2393, 'SEDAN', '2195', '5', 'petrol', 11178108, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'CROWN TURBO HYBRID CROSSIOVER RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'CROWN Z', '6AA-AZSH32-CEVGB', 'CVT', '2WD', 2295, 'SEDAN', '2295', '5', 'petrol', 12750029, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'CROWN Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'DRIVING INSTRUCTION CAR', 'DBA-NZE161-BEMNK', '5MT', '2WD', 1496, 'SEDAN', '1355', '5', 'petrol', 2929223, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'DRIVING INSTRUCTION CAR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'DRIVING ISTRUCTION CAR', '3BA-NZE161-BEMNK', '5MT', '2WD', 1496, 'SEDAN', '1355', '5', 'petrol', 3257357, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'DRIVING ISTRUCTION CAR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'DYNA', '2KG-XZU630D-TMFQY', '6MT', '4WD', 4009, 'TRUCK', '6025', '3', 'diesel', 9646358, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'DYNA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'DYNA ALUMINIUM VAN G', '2DG-GDY231-TGMGC', '5MT', '2WD', 2754, 'VAN', '3555', '3', 'diesel', 6630015, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'DYNA ALUMINIUM VAN G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'DYNA CARGO', 'NBG-BZU600-TQMQP', '5MT', '2WD', 4104, 'TRUCK', '5575', '3', 'diesel', 6096393, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'DYNA CARGO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'DYNA CARGO G PACKAGE', '2DG-GDY231-TGMGC', '5MT', '2WD', 2754, 'TRUCK', '3555', '2', 'diesel', 6189877, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'DYNA CARGO G PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'DYNA CARGO S/CAB', 'TSG-XKC605-TQUMC', '5AMT', '4WD', 4009, 'TRUCK', '4595', '3', 'diesel', 7803717, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'DYNA CARGO S/CAB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'DYNA CARGO STANDARD CAB', 'NBG-BZU600-TQMQP', '5MT', '2WD', 4104, 'TRUCK', '5575', '3', 'diesel', 6096393, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'DYNA CARGO STANDARD CAB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'DYNA DUMP', '2RG-XZU600D-TUFMX-K', '6MT', '2WD', 4009, 'TRUCK', '5215', '3', 'diesel', 9138103, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'DYNA DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'DYNA DUMP', '2RG-XZU600D-TUFMX-K', '6M', '4WD', 4009, 'TRUCK', '5215', '3', 'diesel', 9225114, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'DYNA DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'DYNA DUMP', 'TKG-XZU600D-TUMMB-K', '5MT', '4WD', 4009, 'TRUCK', '5115', '3', 'diesel', 8025532, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'DYNA DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'DYNA DUMP G PACKAGE', '2KG-XZU630D-TMFQY', '6MT', '2WD', 4009, 'TRUCK', '6025', '3', 'diesel', 9646358, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'DYNA DUMP G PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'DYNA ROUTE VAN', 'LDF-KDY241V-REMGY', '5MT', '2WD', 2992, 'VAN', '3435', '3', 'diesel', 5180354, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'DYNA ROUTE VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'DYNA SLIDE TYPE DUMP', '2RG-ZXU630D-TMFQY', '6MT', '4WD', 4009, 'TRUCK', '6025', '3', 'diesel', 8986151, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'DYNA SLIDE TYPE DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ESQUIRE HYBRID Gi', '6AA-ZWR80G-CPXGB', 'CVT', '2WD', 1797, 'MINIVAN', '2005', '7', 'petrol', 5365492, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ESQUIRE HYBRID Gi'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ESQUIRE HYBRID Gi', 'DAA-ZWR80G-CPXGB(L)', 'CVT', '2WD', 1797, 'MINIVAN', '2005', '7', 'petrol', 5431862, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ESQUIRE HYBRID Gi'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ESQUIRE XI', 'DBA-ZRR80G-VTTNCE', 'CVT', '2WD', 1986, 'MINIVAN', '2045', '7', 'petrol', 5547136, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ESQUIRE XI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ESTIMA AERAS SMART', 'DBA-ACR50W-GFXVK', 'CVT', 'AWD', 2362, 'MINIVAN', '2165', '7', 'petrol', 5702328, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ESTIMA AERAS SMART'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ESTIMA AERAS SMART', 'DBA-ACR50W-GFXVK', 'CVT', '2WD', 2362, 'MINIVAN', '2165', '7', 'petrol', 5684321, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ESTIMA AERAS SMART'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ESTIMA HYBRID AERAS', 'DAA-AHR20W-GFSB', 'CVT', '4WD', 2362, 'MINIVAN', '2405', '7', 'petrol', 7546969, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ESTIMA HYBRID AERAS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ESTIMA HYBRID AERAS PREMIUM G', 'DAA-AHR20W-GFXB', 'CVT', 'AWD', 2362, 'MINIVAN', '2375', '7', 'petrol', 7996002, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ESTIMA HYBRID AERAS PREMIUM G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ESTIMA HYBRID AERAS PREMIUM G', 'DAA-AHR20W-GFXZB', 'CVT', '4WD', 2362, 'MINIVAN', '2375', '7', 'petrol', 7970751, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ESTIMA HYBRID AERAS PREMIUM G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'FJ Cruiser', 'CBA-GSJ15W-GKASK-A', '5AT', 'AWD', 3994, 'SUV', '2215', '5', 'petrol', 5857060, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'FJ Cruiser'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'FORTUNER 1GD-E4', 'GUN156R-SNFSXN', 'MT', '4WD', 2800, 'S/WAGON', NULL, NULL, 'diesel', 7529000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'FORTUNER 1GD-E4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'FORTUNER EXECUTIVE TMT -E4', 'GUN156R-SDTHX', '6AT', '4WD', 2800, 'S/WAGON', NULL, NULL, 'diesel', 7592000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'FORTUNER EXECUTIVE TMT -E4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'FORTUNER GD- EXECUTIVE PLUS EURO 4', 'GUN156R-SJTSXJ', '6AT', '4WD', 2800, 'S/WAGON', NULL, NULL, 'diesel', 7592000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'FORTUNER GD- EXECUTIVE PLUS EURO 4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'GR COROLLA RZ', '4BA-GZEA14H-BHFRZ', 'MT', '4WD', 1618, 'HATCHBACK', '1745', '5', 'petrol', 9169542, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'GR COROLLA RZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'GR RZ', '3BA-ZN8-C2E8', '6MT', '2WD', 2387, 'HATCHBACK', '1490', '4', 'petrol', 6071110, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'GR RZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'GR RZ', '3BA-ZN8-B2E8', '6MT', '2WD', 2387, 'HATCHBACK', '1490', '4', 'petrol', 5849294, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'GR RZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'GR SUPRA', '3BA-DB02-ZURW', 'CVT', '2WD', 2997, 'HATCHBACK', '1640', '5', 'petrol', 12772735, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'GR SUPRA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'GR YARIS RZ', '4BA-GXPA16-AGFGZ(H)', 'MT', '4WD', 1618, 'HATCHBACK', '1500', '4', 'petrol', 7964402, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'GR YARIS RZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'GR YARIS RZ', '4BA-GXPA16-AGFG(H)', '6MT', '2WD', 1618, 'HATCHBACK', '1500', '4', 'petrol', 7645826, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'GR YARIS RZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'GR YARIS RZ', '4BA-GXPA16-AGFGZ(H)', '5MT', '2WD', 1618, 'HATCHBACK', '1500', '4', 'petrol', 7240366, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'GR YARIS RZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'GR YARIS RZ HIGH PERFORMANCE', '4BA-GXPA16-AGFGZ(H)', 'CVT', '2WD', 1618, 'HATCHBACK', '1500', '5', 'petrol', 7964402, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'GR YARIS RZ HIGH PERFORMANCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'GR86 RZ', '3BA-ZN8-A2E8', 'CVT', '2WD', 2387, 'COUPE', '1490', '5', 'petrol', 5849294, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'GR86 RZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'GRANACE', '3DA-GDH303W-RDTDJY', '5AT', '2WD', 2754, 'MINIVAN', '3210', '5', 'diesel', 16033599, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'GRANACE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'GRANACE PREMIUM', '3DA-GDH303W-RDTJY', 'CVT', '2WD', 2754, 'MINIVAN', '3070', '6', 'diesel', 12260987, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'GRANACE PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'GRANACE PREMIUM', '3DA-GDH303W-RDTJY', '6AT', '2WD', 2754, 'MINIVAN', '3070', '6', 'diesel', 12677861, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'GRANACE PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HARRIER', 'DBA-ASU60W-ANTST(S)', '6AT', '2WD', 1998, 'SUV', '1975', '5', 'petrol', 7084126, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HARRIER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HARRIER PHEV Z (PLUG-IN-HYBRID)', '6LA-AXUP85-ANKSB', 'CVT', '4WD', 2487, 'SUV', '2225', '5', 'petrol', 10828792, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HARRIER PHEV Z (PLUG-IN-HYBRID)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HARRIER PHEV Z (PLUG-IN-HYBRID)', '6LA-AXUP85-ANXSB', 'CVT', '2WD', 2487, 'SUV', '2225', '5', 'petrol', 10828792, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HARRIER PHEV Z (PLUG-IN-HYBRID)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HARRIER PROGRESS', 'DBA-ASU60W-ANTST(S)', '6AT', '2WD', 1996, 'SUV', '1975', '5', 'petrol', 7106567, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HARRIER PROGRESS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HARRIER Z', '6AA-AXUH80-ANXSB(S)', 'CVT', '2WD', 2487, 'SUV', '1965', '5', 'petrol', 8607143, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HARRIER Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HARRIER Z LEATHER PACKAGE HYBRID', '6AA-AXHU80-ANXSB(S)', 'CVT', '2WD', 2487, 'SUV', '1965', '5', 'petrol', 8418513, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HARRIER Z LEATHER PACKAGE HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HARRIER Z LEATHER PACKAGE', '6AA-AXUH80-ANXSB(S)', '6AT', '2WD', 2487, 'SUV', '1965', '5', 'petrol', 8607143, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HARRIER Z LEATHER PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE COMMUTER GL', '3BF-TRH223B-LETNK', '6AT', '2WD', 2693, 'VAN', '2860', '14', 'petrol', 5193691, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE COMMUTER GL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE COMMUTER GL', 'CBF-TRH223B-LETNK', '6AT', '2WD', 2693, 'VAN', '2860', '14', 'diesel', 5162889, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE COMMUTER GL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE COMMUTER GL', 'CBF-TRH223B-LETNK', '6AT', '2WD', 2693, 'VAN', '2860', '14', 'petrol', 5162889, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE COMMUTER GL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE DX', '3BF-TRH200K-VTZYF', 'CVT', '2WD', 1998, 'VAN', '2670', '10', 'petrol', 6570632, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE DX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE DX', 'CBF-TRH200K-VTZYF', 'CVT', '2WD', 1998, 'VAN', '2670', '10', 'petrol', 6532207, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE DX'
);