INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'NX350 F SPORT', '5BA-TAZA25-AWZLT(F)', '8AT', 'AWD', 2393, 'SUV', '2055', '5', 'petrol', 10462010, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'NX350 F SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'NX350H VERSION L', '6AA-AAZH20-AWXLB(L)', 'CVT', '4WD', 2487, 'SUV', '2035', '5', 'petrol', 10786874, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'NX350H VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'NX350H VERSION L', '6AA-AAZH20-AWXLB(L)', 'CVT', '2WD', 2487, 'SUV', '2035', '5', 'petrol', 10619203, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'NX350H VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'NX450H+ VERSION L', '6LA-AAZH26-AWXLB(L)', 'CVT', '4WD', 2487, 'SUV', '2295', '5', 'petrol', 12741297, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'NX450H+ VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'NX450H+ VERSION L', '6LA-AAZH26-AWXLB(L)', 'CVT', 'AWD', 2487, 'SUV', '2285', '5', 'petrol', 12470577, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'NX450H+ VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RC F', '5BA-USC10-FCZRH', '8AT', '4WD', 4968, 'COUPE', '1990', '4', 'petrol', 19843936, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RC F'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RC F', '5BA-USC10-FCZRH', '8AT', '2WD', 4968, 'COUPE', '1990', '4', 'petrol', 17834162, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RC F'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RC F', '5BA-USC10-FCZRH', '8AT', '2WD', 4968, 'COUPE', '1990', '4', 'petrol', 17868459, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RC F'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RC F', 'DBA-USC10-FCZRH', 'AT', '2WD', 4968, 'COUPE', '2010', '4', 'petrol', 16889423, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RC F'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RC200T', 'DBA-ASC10-RCZL(F)', 'AT', '2WD', 1998, 'COUPE', '1900', '4', 'petrol', 9428294, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RC200T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RC300 F SPORT', '3BA-ASC10-RCZLZ(F)', '8AT', '4WD', 1998, 'COUPE', '1900', '4', 'petrol', 11001703, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RC300 F SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RC300 F SPORT', '3BA-ASC10-RCZLZ(F)', '8AT', '2WD', 1998, 'COUPE', '1900', '4', 'petrol', 10001549, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RC300 F SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RC300 FSPORT', 'DBA-ASC10-RCZLZ(F)', '8AT', '2WD', 1998, 'COUPE', '1900', '4', 'petrol', 9832596, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RC300 FSPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RC300H', 'DAA-AVC10-RCXLH(F)', 'CVT', '2WD', 2493, 'COUPE', '1960', '4', 'petrol', 10139864, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RC300H'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RC300H F SPORT', 'DAA-AVC10-RCXLH(F)', 'CVT', '2WD', 2493, 'COUPE', '1960', '4', 'petrol', 10544164, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RC300H F SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RC300H F SPORT', '6AA-AVC10-RCXLH(F)', 'CVT', '2WD', 2493, 'COUPE', '1960', '4', 'petrol', 10712882, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RC300H F SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RC300H F SPORT', '6AA-AVC10-RCXLH(F)', 'CVT', '4WD', 2493, 'COUPE', '1960', '4', 'petrol', 11784171, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RC300H F SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RC350', 'DBA-GSC10-RCZLH(L)', 'AT', '2WD', 3456, 'COUPE', '1910', '4', 'petrol', 11583315, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RC350'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RC350 VERSION L', 'DBA-GSC10-RCZH(L)', '8AT', '2WD', 3456, 'COUPE', '1910', '4', 'petrol', 11929137, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RC350 VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RC350 VERSION L', '3BA-GSC10-RCZLH(L)', 'CVT', '2WD', 3456, 'COUPE', '1910', '4', 'petrol', 12111797, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RC350 VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RC350 VERSION L', '3BA-GSC10-RCZLH(L)', '8AT', '4WD', 3456, 'COUPE', '1910', '4', 'petrol', 13322977, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RC350 VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RX200T F SPORT', 'DBA-AG=L20W-AWTGZ(F)', 'AT', '4WD', 1998, 'SUV', '2175', '5', 'petrol', 9363606, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RX200T F SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RX300 F SPORT', '3BA-AGL20W-AWTGZ(F)', '6AT', '2WD', 1998, 'SUV', '2175', '4', 'petrol', 9717332, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RX300 F SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RX300 F SPORT', 'DBA-AGL20W-AWTGZ(F)', '6AT', '2WD', 1998, 'SUV', '2175', '5', 'petrol', 9558552, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RX300 F SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RX350 F SPORT', '5BA-TALA15-AWZGT(F)', '8AT', '4WD', 2393, 'SUV', '2225', '5', 'petrol', 12348316, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RX350 F SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RX350H VERSION L', '6AA-AALH10-AWXGB(L)', 'CVT', '2WD', 2487, 'SUV', '2215', '5', 'petrol', 13239072, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RX350H VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RX450 VERSION L', '6AA-GYL20W-AWXGB(L)', 'CVT', '2WD', 3456, 'SUV', '2345', '5', 'petrol', 12501063, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RX450 VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RX450H L', '6AA-GYL26W-ARXGB', 'CVT', '2WD', 3456, 'SUV', '1625', '7', 'petrol', 13649995, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RX450H L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RX450H L', 'DBA-GYL26W-ARXGB', 'CVT', '4WD', 3456, 'SUV', '2625', '7', 'petrol', 13649995, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RX450H L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RX450H VERSION L', '6AA-GYL20W-AWXGB(L)', 'CVT', '2WD', 3456, 'SUV', '2345', '5', 'petrol', 13751169, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RX450H VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RX450H VERSION L', 'DAA-GYL20W-AWXGB(L)', 'CVT', '4WD', 3456, 'SUV', '2345', '5', 'petrol', 14267117, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RX450H VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RX450H+ VERSION L', '6LA-AALH16-AWXGB(L)', 'CVT', 'AWD', 2487, 'SUV', '2435', '5', 'petrol', 15230172, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RX450H+ VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RX450HL', 'DAA-GYL26W-ARXGB', 'CVT', '2WD', 3456, 'SUV', '2625', '7', 'petrol', 13431195, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RX450HL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RX500H F SPORT', '5AA-TALH17-AWTGT(P)', '6AT', '4WD', 2393, 'SUV', '2375', '5', 'petrol', 15736680, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RX500H F SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RX500H F SPORT PERFORMANCE', '5AA-TALH17-AWTG(P)', 'CVT', 'AWD', 2393, 'SUV', '2375', '5', 'petrol', 15736680, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RX500H F SPORT PERFORMANCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RX5450H+ VERSION L', '6LA-AALH6-AWXGB(L)', 'CVT', '4WD', 2487, 'SUV', '2435', '5', 'petrol', 15230172, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RX5450H+ VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'RZ450E VERSION L', 'ZAA-XEBM15-AWDLS', 'CVT', 'AWD/4WD', NULL, 'SUV', '2375', '5', 'electric', 13525511, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'RZ450E VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'UX200 VERSION C', '6AA-MZAH10-AWXBB(F)', 'CVT', '2WD', 1986, 'SUV', '1745', '5', 'petrol', 7417723, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'UX200 VERSION C'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'UX200 VERSION C', '6BA-MZAA10-AWXBB©', 'CVT', '4WD', 1986, 'SUV', '1745', '5', 'petrol', 7417723, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'UX200 VERSION C'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'UX200 VERSION C', '6BA-MZAA10-AWXBB(C)', 'CVT', '2WD', 1986, 'SUV', '1745', '5', 'petrol', 6695220, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'UX200 VERSION C'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'UX250H', '6AA-MZAH10-AWDBB(L)', 'CVT', '2WD', 1986, 'SUV', '1855', '5', 'petrol', 8804507, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'UX250H'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'UX250H F SPORT', '6AA-MZAH10-AWXBB(F)', 'CVT', '4WD', 1986, 'SUV', '1855', '5', 'petrol', 8804507, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'UX250H F SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'UX250H F SPORT', '6AA-MZAH10-AWXBB(F)', 'CVT', '2WD', 1986, 'SUV', '1845', '7', 'petrol', 7729408, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'UX250H F SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'UX250H VERSION L', '6AA-MZAH10-AWXBB(L)', 'CVT', '4WD', 1986, 'SUV', '1835', '5', 'petrol', 9068240, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'UX250H VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'UX250H VERSION L', '5AA-MZAH10-AWXBB(L)', 'CVT', '2WD', 1986, 'SUV', '1855', '5', 'petrol', 8231564, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'UX250H VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LEXUS', 'UX300E VERSION L', 'ZAA-KMA10-AWDBS(L)', 'CVT', '2WD', NULL, 'SUV', '2075', '5', 'electric', 9759886, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LEXUS' AND model = 'UX300E VERSION L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'COPMA ZDS 11 SZLIFIEKRA DO SZYN WORKSHOP TRUCK', NULL, NULL, '4X2', NULL, 'TRUCK', NULL, NULL, 'diesel', 32258377, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'COPMA ZDS 11 SZLIFIEKRA DO SZYN WORKSHOP TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGE  DUMP TRUCK', NULL, NULL, '4X4', 177, 'TRUCK', '1200', NULL, 'diesel', 12283139, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGE  DUMP TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGL 12.220', NULL, NULL, NULL, NULL, 'TRUCK', '5000', NULL, 'diesel', 26996372, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGL 12.220'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGL 12.25 TILT TRUCK', NULL, NULL, '4X2', 289, 'TRUCK', NULL, NULL, 'diesel', 22855403, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGL 12.25 TILT TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGM 15.250 HOOK LIFT TRUCK', NULL, NULL, '4X2', 250, 'TRUCK', NULL, NULL, 'petrol', 23198577, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGM 15.250 HOOK LIFT TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGM 18.250 DUMP TRUCK', NULL, NULL, '4X2', 250, 'TRUCK', '10600', NULL, 'diesel', 29512983, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGM 18.250 DUMP TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGM 18.250 REFRIGERATED', NULL, NULL, '4X2', 250, 'TRUCK', '10200', NULL, 'diesel', 30176453, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGM 18.250 REFRIGERATED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGM 18.290 DUMP TRUCK', NULL, NULL, '4X2', 289, 'TRUCK', NULL, NULL, 'petrol', 23198577, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGM 18.290 DUMP TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGM 18.320 4X4 EURO GE EUROMIX 3-SEITEN-KIPPER', NULL, NULL, '4X4', 320, 'TRUCK', NULL, NULL, 'diesel', 26515928, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGM 18.320 4X4 EURO GE EUROMIX 3-SEITEN-KIPPER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGM 18.320 4X4 FLAT FLATBED', NULL, NULL, '4X4', 325, 'TRUCK', NULL, NULL, 'diesel', 37726286, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGM 18.320 4X4 FLAT FLATBED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGM 18.320 DUMP TRUCK', NULL, NULL, '4X4', 320, 'TRUCK', NULL, NULL, 'diesel', 26515928, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGM 18.320 DUMP TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGM 18.320 HOOK LFIT TURCK', NULL, NULL, '4X2', 320, 'TRUCK', NULL, NULL, 'diesel', 25738066, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGM 18.320 HOOK LFIT TURCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGM 18.320 HOOK LIFT TRUCK', NULL, NULL, '4X4', 320, 'TRUCK', NULL, NULL, 'diesel', 30405236, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGM 18.320 HOOK LIFT TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGM 18.320 PLATTFORM TRUCK', NULL, NULL, '4X4', 320, 'TRUCK', NULL, NULL, 'diesel', 26973494, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGM 18.320 PLATTFORM TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGS  41.480 DUMP TRUCK', NULL, NULL, '8X4', 479, 'TRUCK', NULL, NULL, 'diesel', 33836978, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGS  41.480 DUMP TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGS 26.470 HOOK LIFT TRUCK', NULL, NULL, '6X2', 470, 'TRUCK', NULL, NULL, 'diesel', 54107135, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGS 26.470 HOOK LIFT TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGS 28.440 DUMP TRUCK', NULL, NULL, '6X4', 441, 'TRUCK', NULL, NULL, 'diesel', 48021512, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGS 28.440 DUMP TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGS 33 TIMBER TUCK', NULL, NULL, '8X4', 510, 'TRUCK', NULL, NULL, 'diesel', 41844376, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGS 33 TIMBER TUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGS 35.430 HOOK LIFT TRUCK', NULL, NULL, '8X4', 430, 'TRUCK', '18446', NULL, 'diesel', 35461336, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGS 35.430 HOOK LIFT TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGS 35.440 DUMP TRUCK', NULL, NULL, '8X4', 441, 'TRUCK', NULL, NULL, 'diesel', 31549150, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGS 35.440 DUMP TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGS 41.400 BB CHASSIS TRUCK', NULL, NULL, '8X4', 519, 'TRUCK', NULL, NULL, 'diesel', 33608195, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGS 41.400 BB CHASSIS TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGS 41.440', NULL, NULL, '8X4', 440, 'TRUCK', '17500', NULL, 'diesel', 37291598, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGS 41.440'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGS 41.440 DUMP TRUCK', NULL, NULL, '8X4', 480, 'TRUCK', NULL, NULL, 'diesel', 31343245, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGS 41.440 DUMP TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGS 41.480 480HP DUMP TRUCK', NULL, NULL, '8X6', 480, 'TRUCK', NULL, NULL, 'diesel', 33059116, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGS 41.480 480HP DUMP TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGS 41.480 DUMP TRUCK', NULL, NULL, '8X6', 480, 'TRUCK', NULL, NULL, 'diesel', 11210358, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGS 41.480 DUMP TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGS 41.480 DUMP TRUCK', NULL, NULL, '8X4', 480, 'TRUCK', NULL, NULL, 'diesel', 32464281, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGS 41.480 DUMP TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGS 41.520 DUMP TRUCK', NULL, NULL, '8X4', 520, 'TRUCK', NULL, NULL, 'diesel', 32029594, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGS 41.520 DUMP TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGS 44.400 DUMP TUCK', NULL, NULL, '8X4', 400, 'TRUCK', NULL, NULL, 'diesel', 28574973, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGS 44.400 DUMP TUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGS 50.480 BB 10X4, 2X VORHANDEN', NULL, NULL, '8X4', 480, 'TRUCK', '38140', NULL, 'diesel', 26081241, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGS 50.480 BB 10X4, 2X VORHANDEN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGS DUMP TRUCK', NULL, NULL, '8X6', 480, 'TRUCK', NULL, NULL, 'diesel', 31343245, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGS DUMP TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGX 26.480', NULL, NULL, '4X2', 480, 'TRUCK', '8500', NULL, 'diesel', 34660596, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGX 26.480'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGX 26.510 FLATBED TUCK', NULL, NULL, '6X2', 510, 'TRUCK', NULL, NULL, 'diesel', 66118233, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGX 26.510 FLATBED TUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGX 26.520 FLATBED TRUCK', NULL, NULL, '6X2', 519, 'TRUCK', NULL, NULL, 'diesel', 72958839, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGX 26.520 FLATBED TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'TGX XXL 480 CV', NULL, NULL, '4X4', 480, 'TRUCK', NULL, NULL, 'diesel', 29741766, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'TGX XXL 480 CV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MAN', 'ZABUDOWA AUTO KLAPA HYDRAULICZ DMC 26T PRODUCT', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'diesel', 3758902, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MAN' AND model = 'ZABUDOWA AUTO KLAPA HYDRAULICZ DMC 26T PRODUCT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'APV (BASE)', NULL, '5MT', '2WD', 1600, 'VAN', NULL, NULL, 'petrol', 3892322, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'APV (BASE)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'BALENO GL', NULL, '5MT', '2WD', 1400, 'HATCHBACK', NULL, NULL, 'petrol', 3216572, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'BALENO GL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'BALENO GL (QLD)', NULL, '4AT', '2WD', 1400, 'HATCHBACK', NULL, NULL, 'petrol', 3475288, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'BALENO GL (QLD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'BALENO GL SHADOW', NULL, '4AT', '2WD', 1400, 'HATCHBACK', NULL, NULL, 'petrol', 4676193, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'BALENO GL SHADOW'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'BALENO GLX', NULL, '4AT', '2WD', 1400, 'HATCHBACK', NULL, NULL, 'petrol', 4541043, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'BALENO GLX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'BALENO GLX (QLD)', NULL, '4AT', '2WD', 1400, 'HATCHBACK', NULL, NULL, 'petrol', 4180643, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'BALENO GLX (QLD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'BALENO GLX TURBO', NULL, '6AT', '2WD', 1000, 'HATCHBACK', NULL, NULL, 'petrol', 4402031, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'BALENO GLX TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'CELERIO (BASE)', NULL, '5MT', '2WD', 1000, 'HATCHBACK', NULL, NULL, 'petrol', 2872905, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'CELERIO (BASE)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'GRAND VITARA (4X4)', NULL, '5MT', '4WD', 1900, 'SUV', NULL, NULL, 'diesel', 3121967, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'GRAND VITARA (4X4)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'GRAND VITARA ADVENTURE', NULL, '5MT', '2WD', 2400, 'SUV', NULL, NULL, 'petrol', 1662346, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'GRAND VITARA ADVENTURE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'GRAND VITARA NAVIGATOR (4X2)', NULL, '4AT', '2WD', 2400, 'SUV', NULL, NULL, 'hybrid', 9962492, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'GRAND VITARA NAVIGATOR (4X2)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'GRAND VITARA NAVIGATOR (4X4)', NULL, '5MT', '4WD', 2400, 'SUV', NULL, NULL, 'petrol', 5653135, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'GRAND VITARA NAVIGATOR (4X4)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'GRAND VITARA PRESTIGE (4X4)', NULL, '4AT', '4WD', 2400, 'SUV', NULL, NULL, 'petrol', 3081422, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'GRAND VITARA PRESTIGE (4X4)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'GRAND VITARA SPORTS (4X4)', NULL, '5MT', '4WD', 2400, 'SUV', NULL, NULL, 'petrol', 7413947, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'GRAND VITARA SPORTS (4X4)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'GRAND VITARA URBAN (4X4)', NULL, '5MT', '4WD', 2400, 'SUV', NULL, NULL, 'petrol', 2878697, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'GRAND VITARA URBAN (4X4)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'GRAND VITARA URBAN SE (4X2)', NULL, '5MT', '2WD', 2400, 'SUV', NULL, NULL, 'petrol', 5097089, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'GRAND VITARA URBAN SE (4X2)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'IGNIS GL', NULL, '5MT', '2WD', 1200, 'SUV', NULL, NULL, 'hybrid', 3799648, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'IGNIS GL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'IGNIS GL (QLD)', NULL, '5MT', '2WD', 1200, 'SUV', NULL, NULL, 'petrol', 3869154, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'IGNIS GL (QLD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MARUTI SUZUKI', 'IGNIS GLX', NULL, 'CVT', '2WD', 1200, 'SUV', NULL, NULL, 'hybrid', 4309357, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MARUTI SUZUKI' AND model = 'IGNIS GLX'
);