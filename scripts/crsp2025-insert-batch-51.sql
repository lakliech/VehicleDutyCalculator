INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'TOWNACE GL', '5BF-S413M-ZQDFJD', '4AT', '4WD', 1496, 'VAN', '2160', '5', 'petrol', 3935253, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'TOWNACE GL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'TOWNACE MODERATE TEMPERATURE REFRIGERATING TRUCK', '5BF-S403U-VTCBB', '4AT', '2WD', 1496, 'TRUCK', '2250', '2', 'petrol', 5652210, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'TOWNACE MODERATE TEMPERATURE REFRIGERATING TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'TOWNACE POWER LIFT', '5BF-S403U-VTCABB', '4AT', '4WD', 1496, 'TRUCK', '2150', '3', 'petrol', 3361053, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'TOWNACE POWER LIFT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'TOWNACE POWER LIFT CAR', 'DBF-S402U-VTCABB', '4AT', '2WD', 1495, 'TRUCK', '2130', '2', 'diesel', 3039886, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'TOWNACE POWER LIFT CAR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'TOWNACE TRUCK DX', '5BF-S413U-TQDFJD', 'CVT', '4WD', 1496, 'TRUCK', '2090', '2', 'petrol', 3569729, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'TOWNACE TRUCK DX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'TOYOACE CARGO', '2KG-XZU730-TKFSF', '6MT', '2WD', 4009, 'TRUCK', '7865', '3', 'diesel', 9749406, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'TOYOACE CARGO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'TOYOACE CARGO WIDE CAB', 'TSG-XKU710-TQVMC', '6AMT', '4WD', 4009, 'TRUCK', '5115', '3', 'diesel', 8558239, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'TOYOACE CARGO WIDE CAB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'TOYOACE DUMP', '2RG-XZU600D-TWFMX-K', '6MT', '2WD', 4009, 'TRUCK', '4985', '3', 'diesel', 7983614, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'TOYOACE DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'TOYOACE DUMP', 'TPG-XZU610D-TWTMB-K', '6AT', '4WD', 4009, 'TRUCK', '4865', '3', 'diesel', 7340873, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'TOYOACE DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'TOYOACE ROUTE VAN', 'LDF-KDY241V-RENGY', '5MT', '2WD', 2982, 'TRUCK', '3435', '3', 'diesel', 5180354, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'TOYOACE ROUTE VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'TOYOACE ROUTE VAN', 'TG-XZ605V-RETMB', '6AT', '4WD', 4009, 'TRUCK', '4515', '3', 'diesel', 7148749, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'TOYOACE ROUTE VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'TOYOTA DRIVING INSTRUCTION CAR', '3BA-NZE161-BEMNK', '5MT', '2WD', 1496, 'SUV', '1355', '5', 'petrol', 2929223, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'TOYOTA DRIVING INSTRUCTION CAR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'TOYOTA DRIVING INSTRUCTION CAR', 'DBA-NZE161-BEMNK', '5MT', '2WD', 1496, 'SUV', '1355', '5', 'petrol', 2912456, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'TOYOTA DRIVING INSTRUCTION CAR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'VELFIRE GOLDEN EYES', '3BA-AG30W-NFXSK', 'CVT', '2WD', 2493, 'VAN', '2355', '7', 'petrol', 7520771, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'VELFIRE GOLDEN EYES'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'VELFIRE Z PREMIER', '5BA-TAHA40W-PFZTT', 'CVT', '2WD', 2393, 'VAN', '2565', '7', 'petrol', 11440095, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'VELFIRE Z PREMIER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'VELLFIRE 3.5ZA G EDITION', 'DBA-GGH30W-NFTRK©', 'CVT', 'AWD', 3456, 'VAN', '2455', '7', 'petrol', 8033594, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'VELLFIRE 3.5ZA G EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'VELLFIRE GOLDEN EYES II', '3BA-AGH30W-NFXSK', 'CVT', '2WD', 2493, 'VAN', '2355', '5', 'petrol', 7405497, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'VELLFIRE GOLDEN EYES II'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'VELLFIRE ZG', '3BA-GGH30W-NFZRK', 'CVT', '2WD', 3456, 'VAN', '2475', '5', 'petrol', 9019971, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'VELLFIRE ZG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'VELLFIRE ZG', 'DBA-GGH30W-NFZRK', 'CVT', '2WD', 3456, 'VAN', '2475', '7', 'petrol', 8678893, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'VELLFIRE ZG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'VITZ HYBRID  F', 'DAA-NHP130-VTPBXN', 'CVT', '2WD', 1496, 'SUV', '1445', '5', 'petrol', 3440622, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'VITZ HYBRID  F'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'VITZ HYBRID U', 'DAA-NHP130-AHXEB', 'CVT', '2WD', 1496, 'SUV', '1385', '5', 'petrol', 3251359, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'VITZ HYBRID U'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'VOXY  ZS', '3BA-ZRR80W-VTSNBS', 'CVT', '2WD', 1986, 'SEDAN', '2065', '7', 'petrol', 5141930, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'VOXY  ZS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'VOXY HYBRID ZS', '6AA-ZWR80W-BPXSB', 'CVT', '2WD', 1797, 'SEDAN', '2005', '7', 'petrol', 5314841, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'VOXY HYBRID ZS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'VOXY HYBRID ZS', 'DAA-ZRW80W-BPXSB', 'CVT', '2WD', 1797, 'SEDAN', '2005', '7', 'petrol', 5303643, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'VOXY HYBRID ZS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'VOXY S-Z HYBRID', '6AA-ZWR90W-BPXRB', 'CVT', '2WD', 1797, 'SEDAN', '2055', '7', 'petrol', 6532207, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'VOXY S-Z HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'VOXY WELCAB S-G', '6BA-MZRA90W-VTPNBE', 'CVT', '2WD', 1996, 'SEDAN', '2055', '7', 'petrol', 5526177, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'VOXY WELCAB S-G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'VOXY ZS', '3BA-ZRR80W-VTSNBS', 'CVT', '2WD', 1986, 'SEDAN', '2065', '7', 'petrol', 5141930, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'VOXY ZS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'VOXY ZS', 'DBA-ZRR80-VTSNBS', 'CVT', '2WD', 1986, 'SEDAN', '2065', '7', 'petrol', 5141930, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'VOXY ZS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'WISH 2.0Z', 'DBA-ZGE22W-HWXQP', 'CVT', '2WD', 1986, 'WAGON', '1760', '6', 'petrol', 4206662, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'WISH 2.0Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'XI/ESQUIRE XI', 'DBA-ZRR80G-VTTNCE', 'CVT', '2WD', 1986, 'SUV', '2045', '7', 'petrol', 5582229, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'XI/ESQUIRE XI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'YARIS CROSS HYBRID Z', '6AA-MXPJ10-BHXGB', 'CVT', '2WD', 1490, 'SUV', '1465', '5', 'petrol', 4332635, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'YARIS CROSS HYBRID Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'YARIS CROSS Z', '6AA-MXPJ10-BHXGB', 'CVT', '4WD', 1490, 'SUV', '1465', '5', 'petrol', 4369522, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'YARIS CROSS Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'YARIS HYBRID Z', '6AA-MXPH10-AHXEB', 'CVT', '2WD', 1490, 'SUV', '1365', '5', 'petrol', 3896688, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'YARIS HYBRID Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'YARIS WELCAB 1.5X', '5BA-MXPA10-VQQLXN', 'CVT', '2WD', 1490, 'SUV', '1315', '5', 'petrol', 2888982, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'YARIS WELCAB 1.5X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'YARIS X', '5BA-MXPA10-VQQLXN', 'CVT', '2WD', 1490, 'SUV', '2425', '5', 'petrol', 2848741, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'YARIS X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'YARIS Z HYBRID', '6AA-MXPH10-AHXEB', 'CVT', '2WD', 1490, 'SUV', '1365', '5', 'petrol', 3940283, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'YARIS Z HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LAND CRUISER 250 VX', '3BA-TRJ250W', 'AT', '4WD', 2700, 'SUV', NULL, NULL, 'petrol', 13124686, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LAND CRUISER 250 VX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LAND CRUISER 250 VX', '3DA-GDJ250W', 'AT', '4WD', 2800, 'SUV', NULL, NULL, 'petrol', 18438297, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LAND CRUISER 250 VX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LAND CRUISER 250 ZX FIRST EDITION', '3DA-GDJ250W', 'AT', '4WD', 2800, 'SUV', NULL, NULL, 'diesel', 21390097, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LAND CRUISER 250 ZX FIRST EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LAND CRUISER 70 AX', 'GDJ76W', 'AT', '4WD', 2800, 'SUV', NULL, NULL, 'diesel', 14593728, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LAND CRUISER 70 AX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LAND CRUISER 80', 'HDJ81005', 'AT', '4WD', 4200, 'SUV', NULL, NULL, 'diesel', 4161686, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LAND CRUISER 80'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LAND CRUISER AX', 'FJA300-407', 'AT', '4WD', 3500, 'SUV', NULL, NULL, 'petrol', 15581638, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LAND CRUISER AX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LAND CRUISER AX G SELECTION', 'URJ202-421', 'AT', '4WD', 4600, 'SUV', NULL, NULL, 'petrol', 13451168, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LAND CRUISER AX G SELECTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LAND CRUISER GR SPORT', '3BA-VJA300W', 'AT', '4WD', 3500, 'SUV', NULL, NULL, 'petrol', 21291614, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LAND CRUISER GR SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LAND CRUISER GX', '3BA-VJA300W', 'AT', '4WD', 3500, 'SUV', NULL, NULL, 'petrol', 13022100, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LAND CRUISER GX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LAND CRUISER PRADO TX', 'LDA-GDJ150W', 'AT', '4WD', 2800, 'SUV', NULL, NULL, 'diesel', 7283399, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LAND CRUISER PRADO TX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LAND CRUISER PRADO TX L PACKAGE', 'GDJ150-004', 'AT', '4WD', 2800, 'SUV', NULL, NULL, 'diesel', 8647290, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LAND CRUISER PRADO TX L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LAND CRUISER PRADO TX L PACKAGE 70TH ANNIVERSARY LIMITED', '3BA-TRJ150W', 'AT', '4WD', 2700, 'SUV', NULL, NULL, 'petrol', 8452717, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LAND CRUISER PRADO TX L PACKAGE 70TH ANNIVERSARY LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LAND CRUISER PRADO TX L PACKAGE BLACK EDITION', '3DA-GDJ150W', 'AT', '4WD', 2800, 'SUV', NULL, NULL, 'diesel', 9431308, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LAND CRUISER PRADO TX L PACKAGE BLACK EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LAND CRUISER PRADO TX L PACKAGE MATT BLACK EDITION', '3BA-TRJ150W', 'AT', '4WD', 2700, 'SUV', NULL, NULL, 'petrol', 8329945, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LAND CRUISER PRADO TX L PACKAGE MATT BLACK EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LAND CRUISER PRADO TZ-G', '3DA-GDJ151W', 'AT', '4WD', 2800, 'SUV', NULL, NULL, 'diesel', 10587717, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LAND CRUISER PRADO TZ-G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LAND CRUISER VX', '3BA-VJA300W', 'AT', '4WD', 3500, 'SUV', NULL, NULL, 'petrol', 17511294, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LAND CRUISER VX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LAND CRUISER ZX', '3BA-VJA300W', 'AT', '4WD', 3500, 'SUV', NULL, NULL, 'petrol', 20137770, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LAND CRUISER ZX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VAUXHALL', 'COMBI (136PS)', '1GK0NPLZEFT0A0K0', 'AT', NULL, NULL, NULL, NULL, NULL, 'electric', 8170348, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VAUXHALL' AND model = 'COMBI (136PS)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VAUXHALL', 'COMBI 100KW (136PS)', '1GK0NNLZEFT0A0K0', 'AT', NULL, NULL, NULL, NULL, NULL, 'electric', 7157146, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VAUXHALL' AND model = 'COMBI 100KW (136PS)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VAUXHALL', 'DESIGN (136PS)', '1GK0NPLZEFT0A0K0', 'AT', NULL, NULL, NULL, NULL, NULL, 'electric', 9222014, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VAUXHALL' AND model = 'DESIGN (136PS)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VAUXHALL', 'DESIGN 1.2 (100PS) TURBO', '1GJOA5HL81T0A0H0', 'AT', NULL, 1200, NULL, NULL, NULL, 'electric', 3683254, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VAUXHALL' AND model = 'DESIGN 1.2 (100PS) TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VAUXHALL', 'DESIGN 1.2 (100PS) TURBO', '1GJOA5HL6KT0A0H0', 'AT', NULL, 1200, NULL, NULL, NULL, 'electric', 3385704, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VAUXHALL' AND model = 'DESIGN 1.2 (100PS) TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VAUXHALL', 'DESIGN 1.2 (100PS) TURBO HYBRID', '1GJOA5NPLZEFT5A5', 'AT', NULL, 1200, NULL, NULL, NULL, 'electric', 3798490, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VAUXHALL' AND model = 'DESIGN 1.2 (100PS) TURBO HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VAUXHALL', 'DESIGN 1.2 (136PS) HYBRID', '1GO6SYPJH7TXA0B0', 'AT', NULL, 1200, NULL, NULL, NULL, 'petrol', 5767824, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VAUXHALL' AND model = 'DESIGN 1.2 (136PS) HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VAUXHALL', 'DESIGN 1.5 (130PS) TURBO', '1GK9AF8P41T0A070', 'AT', NULL, 1500, NULL, NULL, '5', 'diesel', 4777998, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VAUXHALL' AND model = 'DESIGN 1.5 (130PS) TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VAUXHALL', 'DESIGN 100KW (136PS)', '1GK9CL8ZIFT0A070', 'AT', NULL, NULL, NULL, NULL, '7', 'electric', 6027613, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VAUXHALL' AND model = 'DESIGN 100KW (136PS)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VAUXHALL', 'DESIGN 100KW (136PS)', '1GK9AF8ZIFT0A070', 'AT', NULL, NULL, NULL, NULL, '5', 'electric', 5858746, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VAUXHALL' AND model = 'DESIGN 100KW (136PS)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VAUXHALL', 'DESIGN 2.0 (180PS) TURBO', '1GK0NNQWQ1T0A0', 'AT', NULL, 2000, NULL, NULL, NULL, 'diesel', 7090538, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VAUXHALL' AND model = 'DESIGN 2.0 (180PS) TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VAUXHALL', 'DESIGN XL 1.5 (100PS) TURBO', '1GK9CL8P6KT0A070', 'AT', NULL, 1500, NULL, NULL, '7', 'diesel', 4485607, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VAUXHALL' AND model = 'DESIGN XL 1.5 (100PS) TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VAUXHALL', 'DESIGN XL 1.5 (130PS) TURBO', '1GK9CL8P41T0A070', 'AT', NULL, 1500, NULL, NULL, NULL, 'diesel', 4932793, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VAUXHALL' AND model = 'DESIGN XL 1.5 (130PS) TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VAUXHALL', 'GS 1.2 (100PS) TURBO', '1GJOA5TL81T0A0H0', 'AT', NULL, 1200, NULL, NULL, NULL, 'electric', 4092600, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VAUXHALL' AND model = 'GS 1.2 (100PS) TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VAUXHALL', 'GS 1.2 (100PS) TURBO', '1GJOA5TL6KT0A0H0', 'AT', NULL, 1200, NULL, NULL, NULL, 'electric', 3795051, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VAUXHALL' AND model = 'GS 1.2 (100PS) TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VAUXHALL', 'GS 1.2 (136PS) HYBRID', '1GO6SYUJH7TXA0B0', 'AT', NULL, 1200, NULL, NULL, NULL, 'diesel', 6103212, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VAUXHALL' AND model = 'GS 1.2 (136PS) HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VAUXHALL', 'ULTIMATE (136PS', '1GK0NPLZEFT0A0K0', 'AT', NULL, NULL, NULL, NULL, NULL, 'electric', 10221143, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VAUXHALL' AND model = 'ULTIMATE (136PS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VAUXHALL', 'ULTIMATE 1.2 (100PS) TURBO', '1GJOA5NPLZEFT5A5', 'AT', NULL, 1200, NULL, NULL, NULL, 'electric', 4570744, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VAUXHALL' AND model = 'ULTIMATE 1.2 (100PS) TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VAUXHALL', 'ULTIMATE 1.2 (100PS) TURBO', '1GJOA5TL6KT040H0', 'AT', NULL, 1200, NULL, NULL, NULL, 'electric', 4273194, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VAUXHALL' AND model = 'ULTIMATE 1.2 (100PS) TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VAUXHALL', 'ULTIMATE 1.2 (100PS) TURBO HYBRID', '1GJOA5TJGWT040', 'AT', NULL, 1200, NULL, NULL, NULL, 'electric', 4685980, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VAUXHALL' AND model = 'ULTIMATE 1.2 (100PS) TURBO HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VAUXHALL', 'ULTIMATE 1.2 (136PS) HYBRID', '1GO6SYUJH7TX40B0', 'AT', NULL, 1200, NULL, NULL, NULL, 'petrol', 6404203, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VAUXHALL' AND model = 'ULTIMATE 1.2 (136PS) HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VAUXHALL', 'ULTIMATE 100KW (136PS)', '1GK9AF5ZIFT0A070', 'AT', NULL, NULL, NULL, NULL, '5', 'electric', 6330637, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VAUXHALL' AND model = 'ULTIMATE 100KW (136PS)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VAUXHALL', 'ULTIMATE XL 100KW (136PS)', '1GK9CL5ZIFT0A070', 'AT', NULL, NULL, NULL, NULL, '5', 'electric', 6499504, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VAUXHALL' AND model = 'ULTIMATE XL 100KW (136PS)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VAUXHALL', 'XL COMBI (136PS)', '1GK0NPLZEFT0A0K0', 'AT', NULL, NULL, NULL, NULL, NULL, 'electric', 7326013, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VAUXHALL' AND model = 'XL COMBI (136PS)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VAUXHALL', 'XL COMBI (136PS)', '1GK0NPLZEFT0A0K0', 'AT', NULL, NULL, NULL, NULL, NULL, 'electric', 8339215, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VAUXHALL' AND model = 'XL COMBI (136PS)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VAUXHALL', 'XL DESIGN (136PS)', '1GK0NPLZEFT0A0K0', 'AT', NULL, NULL, NULL, NULL, NULL, 'electric', 9390881, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VAUXHALL' AND model = 'XL DESIGN (136PS)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VAUXHALL', 'XL DESIGN 2.0 (180PS) TURBO', '1GK0NPQWQ1T0A0', 'AT', NULL, 2000, NULL, NULL, NULL, 'diesel', 7259405, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VAUXHALL' AND model = 'XL DESIGN 2.0 (180PS) TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VAUXHALL', 'XL ULTIMATE (136PS)', '1GK0NPLZEFT0A0K0', 'AT', NULL, NULL, NULL, NULL, NULL, 'electric', 10390010, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VAUXHALL' AND model = 'XL ULTIMATE (136PS)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VAUXHALL', 'YES 1.2 (100PS) TURBO', '1GJOA5HL6KT02CH0', 'AT', NULL, 1200, NULL, NULL, NULL, 'electric', 2980660, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VAUXHALL' AND model = 'YES 1.2 (100PS) TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF ETSI ACTIVE BASIC', 'WVWZZZCDZNW16', 'AT', '2WD', 990, 'HATCHBACK', NULL, NULL, 'petrol', 3565504, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF ETSI ACTIVE BASIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'POLO TSI COMFORTLINE', 'WVWZZZAWZJU03', 'AT', '2WD', 1000, 'HATCHBACK', NULL, NULL, 'petrol', 1768724, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'POLO TSI COMFORTLINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'POLO TSI HIGHLINE', 'WVWZZZAWZJU01', 'AT', '2WD', 1000, 'HATCHBACK', NULL, NULL, 'petrol', 1929904, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'POLO TSI HIGHLINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'POLO TSI TREND LINE', 'WVWZZZAWZJU04', 'AT', '2WD', 1000, 'HATCHBACK', NULL, NULL, 'petrol', 1913650, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'POLO TSI TREND LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'UP! MOVE UP!', 'WVWZZZAAZJD15', 'AT', '2WD', 1000, 'WAGON', NULL, NULL, 'petrol', 1348262, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'UP! MOVE UP!'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'UP! SPICE UP!', 'WVWZZZAAZKD15', 'AT', '2WD', 1000, 'WAGON', NULL, NULL, 'petrol', 2234462, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'UP! SPICE UP!'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'UP! UP! GTI', 'WVWZZZAAZKD16', 'AT', '2WD', 1000, 'WAGON', NULL, NULL, 'petrol', 2181058, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'UP! UP! GTI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'POLO TSI COMFORTLINE LIMITED', 'WVWZZZAWZLU08', 'AT', '2WD', 1000, 'HATCHBACK', NULL, NULL, 'petrol', 2437437, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'POLO TSI COMFORTLINE LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'T-CROSS TSI 1ST PLUS', 'WVGZZZC1ZLY05', 'AT', '2WD', 1000, 'WAGON', NULL, NULL, 'petrol', 2257488, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'T-CROSS TSI 1ST PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'T-CROSS TSI 1ST', 'WVGZZZC1ZLY07', 'AT', '2WD', 1000, 'WAGON', NULL, NULL, 'petrol', 2338175, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'T-CROSS TSI 1ST'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF ETSI ACTIVE', 'WVWZZZCDZNW10', 'AT', '2WD', 1000, 'HATCHBACK', NULL, NULL, 'hybrid', 3734036, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF ETSI ACTIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'POLO TSI ACTIVE', 'WVWZZZAWZNU07', 'AT', '2WD', 1000, 'HATCHBACK', NULL, NULL, 'petrol', 2679110, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'POLO TSI ACTIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'POLO TSI R-LINE', '3BA-AWDLA', 'AT', '2WD', 1000, 'HATCHBACK', NULL, NULL, 'petrol', 3683728, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'POLO TSI R-LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'T-CROSS TSI ACTIVE', 'WVGZZZC1ZNY02', 'AT', '2WD', 1000, 'HATCHBACK', NULL, NULL, 'petrol', 3462178, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'T-CROSS TSI ACTIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF VARIANT ETSI ACTIVE BASIC', 'WVWZZZCD6RW81', 'AT', '2WD', 1000, 'WAGON', NULL, NULL, 'hybrid', 4375080, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF VARIANT ETSI ACTIVE BASIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF VARIANT ETSI ACTIVE', 'WVWZZZCD2PW52', 'AT', '2WD', 1000, 'WAGON', NULL, NULL, 'hybrid', 4274657, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF VARIANT ETSI ACTIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'THE BEETLE EXCLUSIVE', 'DBA-16CBZ', 'AT', '2WD', 1200, 'COUPE', NULL, NULL, 'petrol', 2425053, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'THE BEETLE EXCLUSIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'THE BEETLE BLACK STYLE', 'DBA-16CBZ', 'AT', '2WD', 1200, 'COUPE', NULL, NULL, 'petrol', 2561079, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'THE BEETLE BLACK STYLE'
);