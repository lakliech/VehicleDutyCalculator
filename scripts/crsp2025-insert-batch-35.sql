INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MINI', 'JOHN COOPER WORKS', 'WMWXP92000TP2', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'petrol', 14148416, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MINI' AND model = 'JOHN COOPER WORKS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'D:5 P', '3DA-CV1W-LUXEZ', '8AT', '4WD', 2267, 'MINVAN', '1635', '8', 'diesel', 7817515, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'D:5 P'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'DELCA D:2 HYBRID MZ', 'DAA-MB36S-MBZBM', 'CVT', '2WD', 1242, 'MINVAN', '1725', '5', 'petrol', 3165640, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'DELCA D:2 HYBRID MZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'DELCA D:5 P', '3DA-CV1W-LUXFZ', '8AT', '4WD', 2267, 'MINVAN', '3115', '8', 'diesel', 8036536, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'DELCA D:5 P'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'DELICA  MINI G PREMIUM', '5AA-B34A-HXTG', 'CVT', '4WD', 659, 'MINVAN', '3115', '4', 'petrol', 3901719, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'DELICA  MINI G PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'DELICA D:2', '5AA-MB37S-MSVBJRM', 'CVT', '4WD', 1242, 'MINVAN', '3115', '4', 'petrol', 3591023, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'DELICA D:2'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'DELICA D:2', '3DA-CV1W-LUHFZ', '8AT', '4WD', 2267, 'MINVAN', '3115', '4', 'diesel', 7690189, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'DELICA D:2'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'DELICA D:2', '3DA-CV1W-LUHFZ', '8AT', '4WD', 2267, 'MINVAN', '2090', '7', 'diesel', 7550463, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'DELICA D:2'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'DELICA D:2 CUSTOM HYBRID MV', '5AA-MB37S-MSVBJRM', 'CVT', '4WD', 1242, 'MINVAN', '2570', '5', 'petrol', 3720130, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'DELICA D:2 CUSTOM HYBRID MV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'DELICA D:2 CUSTOM HYBRID MV', '5AA-MB37S-MSVBJRM', 'CVT', '2WD', 1242, 'MINVAN', '1350', '5', 'petrol', 3720130, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'DELICA D:2 CUSTOM HYBRID MV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'DELICA D:2 CUSTOM HYBRID SV', 'DAA-MB46S-MSVHRM', '5AMT', '2WD', 1242, 'MINVAN', '2160', '5', 'petrol', 3569729, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'DELICA D:2 CUSTOM HYBRID SV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'Delica D:2 Custom Hybrid SV Navi Package', 'DAA-MB46S-MSVHRN', '5AMT', '2WD', 1242, 'MINVAN', '2160', '5', 'petrol', 3589849, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'Delica D:2 Custom Hybrid SV Navi Package'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'DELICA D:2 GS', '5AA-MB37S-MSVBJRM', 'CVT', '2WD', 1242, 'MINVAN', '1150', '5', 'petrol', 3591023, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'DELICA D:2 GS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'DELICA D:2 HYBRID MZ', '5AA-MB37S-MBZBJ', 'CVT', '4WD', 1242, 'MINVAN', '870', '5', 'petrol', 3576268, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'DELICA D:2 HYBRID MZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'DELICA D:2 HYBRID MZ', '5AA-MB37S-MBZBJ', 'CVT', '2WD', 1242, 'MINVAN', '870', '5', 'petrol', 3576268, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'DELICA D:2 HYBRID MZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'Delica D:2 Hybrid Mz Navi Package', 'DAA-MB36S-MBZBN', 'CVT', '2WD', 1242, 'MINVAN', '870', '5', 'petrol', 3321239, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'Delica D:2 Hybrid Mz Navi Package'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'DELICA D:2 HYBRID XT', '5AA-MB37S-MBZBJ', 'CVT', '2WD', 1242, 'MINVAN', '870', '5', 'petrol', 3447161, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'DELICA D:2 HYBRID XT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'Delica D:3 G', 'DBA-BM20 WPBM', '4AT', '2WD', 1597, 'MINVAN', '920', '7', 'petrol', 3405830, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'Delica D:3 G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'DELICA D:5', '3DA-CV1W-LUHFZ', 'CVT', '4WD', 2267, 'MINVAN', '1485', '7', 'diesel', 7690189, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'DELICA D:5'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'DELICA D:5', '3DA-CV1W-LUHFZ', '8AT', '2WD', 2267, 'MINVAN', '1485', '7', 'diesel', 7524264, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'DELICA D:5'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'DELICA D:5', '3DA-CV1W-LUXFZ', 'CVT', '4WD', 2267, 'MINVAN', '3115', '8', 'petrol', 7663816, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'DELICA D:5'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'DELICA D:5', '3DA-CV1W-LUHFZ', '8AT', '4WD', 2267, 'MINVAN', '1485', '7', 'diesel', 7690189, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'DELICA D:5'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'DELICA D:5 D', 'DBA-CV5W-LTHHZ3', 'CVT', '4WD', 2359, 'MINVAN', '1525', '7', 'petrol', 5828335, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'DELICA D:5 D'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'DELICA D:5 D-POWER PACKAGE', 'LDA-CV1W-LLHFZ', '6AT', '4WD', 2267, 'MINVAN', '1515', '8', 'deisel', 5716554, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'DELICA D:5 D-POWER PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'DELICA D:5 D-PREMIUM', 'LDA-CV1W-LLXFZ', '6AT', '2WD', 2267, 'MINVAN', '1546', '8', 'deisel', 6558406, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'DELICA D:5 D-PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'DELICA D:5 P', '3DA-CV1W-LUXFZ', '8AT', '4WD', 2267, 'MINVAN', '1575', '8', 'diesel', 7817515, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'DELICA D:5 P'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'DELICA D:5 ROADEST G-POWER PACKAGE', 'DBA-CV2W-LTHH5', 'CVT', '2WD', 1998, 'MINVAN', '1575', '8', 'petrol', 4885183, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'DELICA D:5 ROADEST G-POWER PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'DELICA D:5 URBAN GEAR G-POWER PACKAGE', '3DA-CV1W-LUFFZ', '8AT', '4WD', 2267, 'MINVAN', '1545', '7', 'diesel', 6926934, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'DELICA D:5 URBAN GEAR G-POWER PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'DELICA MINI T PREMIUM', '4AA-B38A-HXTTZZ', 'CVT', '4WD', 659, 'MINVAN', '1575', '4', 'petrol', 3753329, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'DELICA MINI T PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'DELICA MINI T PREMIUM', '4AA-B38A-HXTTZZ', 'CVT', '4WD', 659, 'MINVAN', '1675', '4', 'petrol', 3808661, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'DELICA MINI T PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'DELICA VAN GX', 'DBF-BVM20-VHBM', '4AT', '2WD', 1597, 'MINVAN', '2000', '5', 'petrol', 3292302, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'DELICA VAN GX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'DELICAD:5', 'DBA-CV5W-LTHZ3', 'CVT', '2WD', 659, 'MINVAN', '3115', '7', 'petrol', 5595202, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'DELICAD:5'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'ECLIPSE CROSS', '5BA-GK1W-XTPXZ', 'CVT', '4WD', 1498, 'SUV', '3115', '5', 'petrol', 5610628, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'ECLIPSE CROSS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'ECLIPSE CROSS (PHEV)', '5LA-GL3W-XDPHZ', 'CVT', '4WD', 2359, 'SUV', '2090', '5', 'petrol', 7877073, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'ECLIPSE CROSS (PHEV)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'ECLIPSE CROSS (PHEV) G', '5BA-GK1W-XTPXZ', 'CVT', '4WD', 1498, 'SUV', '2570', '5', 'petrol', 5597885, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'ECLIPSE CROSS (PHEV) G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'ECLIPSE CROSS (PHEV) P', '5LA-GL3W-XDPHZ', 'CVT', '4WD', 2359, 'SUV', '1350', '5', 'petrol', 8122991, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'ECLIPSE CROSS (PHEV) P'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'ECLIPSE CROSS G PLUS', 'DBA-GK1W-XTPXZ', 'CVT', '4WD', 1498, 'SUV', '2160', '5', 'petrol', 4805469, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'ECLIPSE CROSS G PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'ECLIPSE CROSS G PLUS PACKAE', '5BA-GK1W-XTPXZ', 'CVT', '4WD', 1498, 'SUV', '2160', '5', 'petrol', 4837326, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'ECLIPSE CROSS G PLUS PACKAE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'EK CUSTOM', 'DBA-B11W-LTHTF1', 'CVT', '2WD', 659, 'WAGON', '1150', '4', 'petrol', 3606890, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'EK CUSTOM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'EK CUSTOMS T SAFETY PACKAGE', 'DBA-B11W-LTHF1', 'CVT', '2WD', 659, 'WAGON', '870', '4', 'petrol', 2509835, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'EK CUSTOMS T SAFETY PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'EK K', '4AA-B38W-LTTZZ', 'CVT', '4WD', 659, 'WAGON', '870', '4', 'petrol', 3052462, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'EK K'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'EK SPACE', '5AA-B34A-HXTCG', 'CVT', '2WD', 659, 'WAGON', '870', '4', 'petrol', 2346061, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'EK SPACE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'EK SPACE', '4AA-B35A-HXTHZ', 'CVT', '2WD', 659, 'WAGON', '870', '4', 'petrol', 3526134, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'EK SPACE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'EK SPACE', 'DBA-B11A-HXTHF2', 'CVT', '2WD', 659, 'WAGON', '920', '4', 'petrol', 3423854, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'EK SPACE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'EK SPACE CUSTOMS T SAFETY PACKAGE', 'DBA-B11A-HXTHF1', 'CVT', '2WD', 659, 'WAGON', '1485', '4', 'petrol', 2838681, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'EK SPACE CUSTOMS T SAFETY PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'EK SPACE G', '5AA-B34A-HXTDG', 'CVT', '4WD', 659, 'WAGON', '1485', '4', 'petrol', 2785026, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'EK SPACE G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'EK SPACE G', '5AA-B34A-HXTDG', 'CVT', '2WD', 659, 'WAGON', '1485', '4', 'petrol', 2840357, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'EK SPACE G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'EK SPACE G SAFETY PACKAGE', 'DBA-B11A-HXTMX1', 'CVT', '2WD', 659, 'WAGON', '1525', '4', 'petrol', 2293748, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'EK SPACE G SAFETY PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'EK SPACE M', '5AA-B34A-HXTCG', 'CVT', '4WD', 659, 'WAGON', '1515', '4', 'petrol', 2346061, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'EK SPACE M'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'EK SPACE T', '4AA-B35A-HXTHZ', 'CVT', '2WD', 659, 'WAGON', '1546', '4', 'petrol', 3526134, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'EK SPACE T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'EK WAGON', '5BA-B33W-LTDE', 'CVT', '2WD', 659, 'WAGON', '1575', '4', 'petrol', 2360816, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'EK WAGON'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'EK WAGON', 'DBA-B11W-LTMX', 'CVT', '2WD', 659, 'WAGON', '1575', '4', 'petrol', 1963435, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'EK WAGON'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'EK WAGON G', '5BA-B33W-LTDE', 'CVT', '4WD', 659, 'WAGON', '1545', '4', 'petrol', 2360816, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'EK WAGON G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'EK WAGON G', 'DBA-B11W-LTDXT1', 'CVT', '2WD', 659, 'WAGON', '1575', '4', 'petrol', 2129430, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'EK WAGON G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'EK WAGON G SAFETY', '5BA-B33W-LTDE', 'CVT', '2WD', 659, 'WAGON', '1675', '4', 'petrol', 2146197, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'EK WAGON G SAFETY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'EK WAGON G SAFETY PACKAGE', 'DBA-B11W-LTDX1', 'CVT', '2WD', 659, 'WAGON', '1515', '4', 'petrol', 2194822, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'EK WAGON G SAFETY PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'EK X EV', 'ZAA-B5AW-LDEB', 'CVT', '2WD', NULL, 'WAGON', '1546', '4', 'electric', 5122019, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'EK X EV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'EK X EV P', 'ZAA-B5AW-LDEB', 'CVT', '2WD', NULL, 'WAGON', '1575', '4', 'electric', 4813391, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'EK X EV P'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'EK X SPACE', '4AA-B35A-HXTTZ', 'CVT', '2WD', 659, 'WAGON', '1575', '4', 'petrol', 2833650, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'EK X SPACE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'EK X SPACE T', '4AA-B35A-HXTTZ', 'CVT', '2WD', 659, 'WAGON', '1515', '4', 'petrol', 3366008, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'EK X SPACE T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'EK X T', '4AA-B38W-LTTZZ', 'CVT', '2WD', 659, 'WAGON', '1546', '4', 'petrol', 3052462, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'EK X T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'EK X T', '4AA-B38W-LTTZZ', 'CVT', '4WD', 659, 'WAGON', '1575', '4', 'petrol', 3214768, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'EK X T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'HYBRID MZ', '5AA-MB37S-MBZBJ', 'CVT', '2WD', 1242, 'SUV', '1575', '5', 'petrol', 3447161, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'HYBRID MZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'I MIEV X', 'ZAA-HD4W-LDD', 'CVT', '2WD', NULL, 'HATCHBACK', '1545', '4', 'electric', 4195982, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'I MIEV X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'I MIEV X', 'ZAA-HA4W-LDO', 'CVT', '2WD', 659, 'HATCHBACK', '1575', '4', 'petrol', 4074420, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'I MIEV X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'I-MIEV X', 'ZAA-HD4W-LDD', 'CVT', '2WD', NULL, 'HATCHBACK', '1675', '4', 'electric', 4195982, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'I-MIEV X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'LANCER CARGO 15M', 'DBF-CVY12-CMM', 'CVT', '2WD', 1498, 'VAN', '1700(1715)', '2', 'petrol', 2726410, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'LANCER CARGO 15M'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'MINICAB EV CD', 'ZAB-U69V-HLDDI', 'CVT', '2WD', NULL, 'VAN', '1560', '2', 'electric', 4168316, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'MINICAB EV CD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'MINICAB G', 'HBD-DS17V-LVBDJ3', '4AT', '2WD', 658, 'VAN', '1330', '4', 'petrol', 1911456, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'MINICAB G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'MINICAB MIEV CD', 'ZAB-568V-HLDDD', '2WD', '2WD', NULL, 'VAN', '1560', '4', 'electric', 4076097, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'MINICAB MIEV CD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'MINICAB MIEV CD', 'ZAB-U68V-HLDDD', 'CVT', '2WD', NULL, 'VAN', '1546', '4', 'electric', 4076097, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'MINICAB MIEV CD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'MINICAB MIEV VAN CD', 'ZAB-U68V-HLDDA', 'CVT', '2WD', NULL, 'VAN', '1570', '4', 'electric', 3060147, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'MINICAB MIEV VAN CD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'MINICAB TRUCK', 'EBD-DS16T-SKXJJ4', '5MT', '4WD', 658, 'TRUCK', '1200', '2', 'petrol', 1914810, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'MINICAB TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'MINICAB TRUCK G', '3BD-DS16T-SKXJH', '5MT', '4WD', 658, 'TRUCK', '1240', '2', 'petrol', 2537878, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'MINICAB TRUCK G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'MINICAB TRUCK G', '3BD-DS16T-SKXJ6', '5MT', '4WD', 658, 'TRUCK', '1240', '2', 'petrol', 2150556, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'MINICAB TRUCK G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'MINICAB TRUCK G', '3BD-DS16T-SKXJJ5', '5MT', '4WD', 658, 'TRUCK', '1200', '2', 'petrol', 2122890, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'MINICAB TRUCK G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'MINICAB TRUCK G', 'EBD-DS16T-SKXJJ4', '5MT', '4WD', 658, 'TRUCK', '1160', '2', 'petrol', 1914810, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'MINICAB TRUCK G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'MINICAB TRUCK M', 'EBD-DS16T-SKCFG', '5MT', '2WD', 658, 'TRUCK', '1150', '2', 'petrol', 1352272, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'MINICAB TRUCK M'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'MINICAB VAN G', '5BD-DS17V-LVBEH', 'CVT', '2WD', 658, 'VAN', '1370', '4', 'petrol', 2552633, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'MINICAB VAN G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'MINICAB VAN G', '5BD-DS17V-LVBDJ5', '4AT', '2WD', 658, 'VAN', '1240', '4', 'petrol', 2239087, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'MINICAB VAN G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'MINICAB VAN G', '5BA-DS17V-LVBDJ4', '4AT', '2WD', 658, 'VAN', '1330', '4', 'petrol', 2161958, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'MINICAB VAN G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'MINICAB VAN G', 'HBD-DS17V-LVBDJ3', '4AT', '2WD', 658, 'VAN', '1330', '4', 'petrol', 1911456, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'MINICAB VAN G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'MINICAB VAN G', 'HBD-DS17V-LVBND2', '5AMT', '2WD', 658, 'VAN', '1230', '4', 'petrol', 1768936, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'MINICAB VAN G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'MINICAB VAN G', '5BD-DS17V-LVBDJ5', '4AT', '2WD', 658, 'VAN', '1575', '4', 'petrol', 2239087, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'MINICAB VAN G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'MINICAB-MIEV VAN  CD', 'ZAB-UV68V-HLDDA', 'CVT', '2WD', NULL, 'VAN', '1570', '4', 'electric', 3739077, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'MINICAB-MIEV VAN  CD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'MIRAGE', '5BA-A034A-XTHX', 'CVT', '2WD', 1192, 'HATCHBACK', '1635', '5', 'petrol', 2631941, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'MIRAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'MIRAGE G', '5BA-A03A-XTHX', 'CVT', '2WD', 1192, 'HATCHBACK', '1725', '5', 'petrol', 2711250, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'MIRAGE G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'MIRAGE G', 'DBA-A03A-XTNX', 'CVT', '2WD', 1192, 'HATCHBACK', '3115', '5', 'petrol', 2305485, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'MIRAGE G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'OUTLANDER 24G NAVI PACKAGE', 'DBA-GF8W-XTXXZ', 'CVT', '2WD', 2359, 'SUV', '3115', '7', 'petrol', 5311348, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'OUTLANDER 24G NAVI PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'OUTLANDER 24G PLUS PACKAGE', 'DBA-GF8W-XTXXZ', 'CVT', '4WD', 2359, 'SUV', '3115', '7', 'petrol', 5431862, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'OUTLANDER 24G PLUS PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'OUTLANDER PHEV P', '5LA-GNOW-XDHUZ', 'CVT', '4WD', 2359, 'SUV', '3115', '7', 'petrol', 9581210, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'OUTLANDER PHEV P'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'OUTLANDER PHEV S EDITION', 'DLA-XDPHZ', 'CVT', '2WD', 1998, 'SUV', '2090', '5', 'petrol', 7745206, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'OUTLANDER PHEV S EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'OUTLANDER PHEV S EDITION', '5LA-GG3W-XDPHZ', 'CVT', '4WD', 2359, 'SUV', '2570', '5', 'petrol', 8231629, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'OUTLANDER PHEV S EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'PAJERO LONG SUPER EXCEED', 'LDA-V98W-LYXJ', '5AT', '2WD', 3200, 'SUV', '1350', '7', 'diesel', 8648712, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'PAJERO LONG SUPER EXCEED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'PAJERO SHORT VR-II', 'LDA-V88W-MYXJ', '5AT', '2WD', 3200, 'SUV', '2160', '5', 'diesel', 6988763, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'PAJERO SHORT VR-II'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'PAJERO SUPER  LONG EXCEED', 'LDA-V98W-LYXJ', '5AMT', '4WD', 3200, 'SUV', '2160', '7', 'deisel', 8008066, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'PAJERO SUPER  LONG EXCEED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'RVR', '5BA-GA4W-XTHXZ', 'CVT', '4WD', 1798, 'WAGON', '1150', '5', 'petrol', 4559096, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'RVR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'RVR G', '5BA-GA4W-XTHXZ', 'CVT', '4WD', 1798, 'WAGON', '870', '5', 'petrol', 4712795, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'RVR G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'RVR G', '5BA-GA4W-XTHZ', 'CVT', '2WD', 1798, 'WAGON', '870', '5', 'petrol', 4376732, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'RVR G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'RVR G', 'DBA-GA4W-XTHZ', 'CVT', '2WD', 1798, 'WAGON', '870', '5', 'petrol', 4104462, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'RVR G'
);