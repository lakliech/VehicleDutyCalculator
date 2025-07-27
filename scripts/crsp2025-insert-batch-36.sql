INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'TOWN BOX', '3BA-DS17W-LHCD5', '4AT', '2WD', 658, 'MINVAN', '870', '4', 'petrol', 2982375, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'TOWN BOX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'TOWN BOX G', '3BA-DS17W-LHCD5', '4AT', '4WD', 658, 'MINVAN', '920', '4', 'petrol', 2982375, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'TOWN BOX G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'TOWN BOX G', '3BA-DS17W-LHCE', 'CVT', '2WD', 658, 'MINVAN', '1485', '4', 'petrol', 3222146, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'TOWN BOX G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'TOWN BOX G', '3BA-DS17W-LHCD4', 'CVT', '2WD', 658, 'MINVAN', '1485', '4', 'petrol', 2942134, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'TOWN BOX G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'TOWN BOX G', 'ABA-DS17W-LHCSQ3', '4AT', '2WD', 658, 'MINVAN', '1485', '4', 'petrol', 2612324, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'TOWN BOX G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'TOWN BOX G', 'ABA-DS17W-LHCD2', '4AT', '2WD', 658, 'MINVAN', '1525', '4', 'petrol', 2498307, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'TOWN BOX G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI', 'TRITON GSR', '3DF-LC2T-JLPRD', '6AT', '4WD', 2439, 'D/CAB', '1515', '5', 'diesel', 9433275, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI' AND model = 'TRITON GSR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER', 'FBAV0 -', 'MT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 7210621, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER', 'FEBM0-', 'MT', '2WD', 3000, 'TRUCK', NULL, '4', 'diesel', 12206973, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER', 'FBA60-', 'MT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 7751206, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER', 'FBA20-', 'MT', '2WD', 2990, 'TRUCK', NULL, '2', 'diesel', 6378318, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER', 'FEA20-', 'AT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 5024999, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER', 'FEA2W-', 'MT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 6157841, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER', 'FEB90-', 'MT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 8020579, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER', 'FE73DY-', 'MT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 5967913, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER', 'FEB50-', 'MT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 7803532, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER', 'FBA30-', 'MT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 8240241, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER', 'FDA00-', 'MT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 7645876, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER ALL LOW FLOOR', 'FBA20-', 'MT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 6666658, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER ALL LOW FLOOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER ALL LOW FLOOR', 'FBAV0-', 'AT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 8622560, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER ALL LOW FLOOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER ALL LOW FLOOR DUMP', 'FBA30-', 'MT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 7361335, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER ALL LOW FLOOR DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER ALL LOW FLOOR DUMP', 'FBA60-', 'MT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 7607036, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER ALL LOW FLOOR DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER ALL LOW FLOOR DUMP', 'FBA60-', 'AT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 7706879, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER ALL LOW FLOOR DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER BASEGRADE', 'FBA20-', 'AT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 4694823, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER BASEGRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER DOUBLE CAB', 'FBA00-', 'AT', '2WD', 3000, 'TRUCK', NULL, '4', 'diesel', 8220204, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER DOUBLE CAB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER DOUBLE CAB', 'FDA00-', 'AT', '2WD', 3000, 'TRUCK', NULL, '4', 'diesel', 13159564, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER DOUBLE CAB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER DOUBLE CAB ALL LOW FLOOR', 'FBA20-', 'MT', '2WD', 3000, 'TRUCK', NULL, '4', 'diesel', 7161438, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER DOUBLE CAB ALL LOW FLOOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER DOUBLE CAB ALL LOW FLOOR', 'FBA20-', 'AT', '2WD', 3000, 'TRUCK', NULL, '4', 'diesel', 7226874, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER DOUBLE CAB ALL LOW FLOOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER DOUBLE CAB LONG', 'FEB50-', 'AT', '2WD', 3000, 'TRUCK', NULL, '4', 'diesel', 11937630, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER DOUBLE CAB LONG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER DOUBLE CAB LONG ALL LOW FLOOR', 'FBA00-', 'AT', '2WD', 3000, 'TRUCK', NULL, '4', 'diesel', 9698771, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER DOUBLE CAB LONG ALL LOW FLOOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER DUMP', 'FBA30-', 'MT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 9378149, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER DUMP', 'FEBM0-', 'MT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 14339221, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER DUMP', 'FBA60-', 'AT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 7475953, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER GUTS', 'SZ5F24-', 'MT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 9471629, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER GUTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER LONG', 'FEA20-', 'AT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 6199002, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER LONG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER LONG', 'FEA80-', 'AT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 9302989, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER LONG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER LONG', 'FEAV0-', 'AT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 10162510, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER LONG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER LONG', 'FEB90-', 'MT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 9408425, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER LONG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER LONG', 'FEA50-', 'MT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 13477697, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER LONG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER LONG', 'FEAV0-', 'MT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 11777418, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER LONG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER LONG', 'FEB50-', 'MT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 20428216, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER LONG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER LONG', 'FEB50-', 'MT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 16418798, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER LONG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER LONG ALL LOW FLOOR', 'FBA00-', 'MT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 3648794, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER LONG ALL LOW FLOOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER LONG ALL LOW FLOOR', 'FEAV0-', 'MT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 7246083, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER LONG ALL LOW FLOOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER LONG ALL LOW FLOOR', 'FEA20-', 'AT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 16753717, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER LONG ALL LOW FLOOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER LONG ALL LOW FLOOR', 'FEA50-', 'MT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 20844822, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER LONG ALL LOW FLOOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER LONG CUSTOM', 'FEA80-', 'MT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 12669774, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER LONG CUSTOM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER LONG HIGH FLOOR DX', 'FEA80-', 'MT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 13529413, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER LONG HIGH FLOOR DX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER LONG TURBO', 'FEB50-', 'AT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 13810037, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER LONG TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER SEMI LONG ALL LOW FLOOR SA', 'FEAV0-', 'MT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 12166867, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER SEMI LONG ALL LOW FLOOR SA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER SUPER LONG', 'FEB20-', 'AT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 8287570, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER SUPER LONG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER SUPER LONG ALL LOW FLOOR', 'FEB90-', 'MT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 12636107, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER SUPER LONG ALL LOW FLOOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER SUPER SUPER LONG', 'FED90-', 'AT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 11755556, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER SUPER SUPER LONG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER SUPER SUPER LONG', 'FEC90-', 'MT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 19631844, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER SUPER SUPER LONG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER SUPER SUPER LONG DX TURBO', 'FEB80-', 'MT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 16557409, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER SUPER SUPER LONG DX TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER WIDE CAB LONG ALL LOW FLOOR', 'FEB80-', 'MT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 11514619, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER WIDE CAB LONG ALL LOW FLOOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'MITSUBISHI FUSO', 'CANTER WIDE CAB LONG ALL LOW FLOOR', 'FEBS0-', 'AT', '2WD', 3000, 'TRUCK', NULL, '2', 'diesel', 12062733, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'MITSUBISHI FUSO' AND model = 'CANTER WIDE CAB LONG ALL LOW FLOOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NETA', 'NETA N01', NULL, 'AT', 'FWD', NULL, 'SUV', NULL, '5', 'electric', 2673728, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NETA' AND model = 'NETA N01'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NETA', 'NETA V', NULL, 'AT', 'FWD', NULL, 'SUV', NULL, '5', 'electric', 4221675, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NETA' AND model = 'NETA V'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NETA', 'NETA U PRO', NULL, 'AT', 'FWD/AWD', NULL, 'SUV', NULL, '5', 'electric', 5628900, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NETA' AND model = 'NETA U PRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NETA', 'NETA S', NULL, 'AT', 'RWD/AWD', NULL, 'SEDAN', NULL, '5', 'electric', 7359787, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NETA' AND model = 'NETA S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NETA', 'NETA GT', NULL, 'AT', 'RWD/AWD', 228, 'COUPE', NULL, '4', 'electric', 8443350, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NETA' AND model = 'NETA GT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NETA', 'NETA V-II', NULL, 'AT', 'FWD', NULL, 'SUV', NULL, '5', 'electric', 4221675, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NETA' AND model = 'NETA V-II'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NIO', 'ES8', NULL, 'AT', 'AWD', NULL, 'SUV', '2,600', '6', 'electric', 14775863, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NIO' AND model = 'ES8'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NIO', 'ES6', NULL, 'AT', 'AWD', NULL, 'SUV', '2,300', '5', 'electric', 10976355, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NIO' AND model = 'ES6'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NIO', 'EC6', NULL, 'AT', 'AWD', NULL, 'SUV-COUPE', '2,300', '5', 'electric', 10132020, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NIO' AND model = 'EC6'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NIO', 'ET5', NULL, 'AT', 'AWD', NULL, 'SEDAN', '2,145', '5', 'electric', 9076601, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NIO' AND model = 'ET5'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NIO', 'ET7', NULL, 'AT', 'AWD', NULL, 'SEDAN', '2,400', '5', 'electric', 13720444, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NIO' AND model = 'ET7'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NIO', 'ES7 (EL7 IN EUROPE)', NULL, 'AT', 'AWD', NULL, 'SUV', '2,500', '5', 'electric', 13720444, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NIO' AND model = 'ES7 (EL7 IN EUROPE)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NIO', 'EC7', NULL, 'AT', 'AWD', NULL, 'SUV-COUPE', '2,400', '5', 'electric', 13720444, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NIO' AND model = 'EC7'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NIO', 'EL6 (ES6 IN EUROPE)', NULL, 'AT', 'AWD', NULL, 'SUV', '2,300', '5', 'electric', 10976355, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NIO' AND model = 'EL6 (ES6 IN EUROPE)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NIO', 'ET5 TOURING', NULL, 'AT', 'AWD', NULL, 'STATION WAGON', '2,200', '5', 'electric', 9076601, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NIO' AND model = 'ET5 TOURING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NIO', 'ET9', NULL, 'AT', 'AWD', NULL, 'SEDAN', '2,379', '4', 'electric', 21108375, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NIO' AND model = 'ET9'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'AD VE', '5BF-VY12', 'CVT', '2WD', 1498, 'VAN', '1700', '5', 'petrol', 2814536, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'AD VE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'ARIYA B6', 'ZAA-FE0', 'CVT', '2WD', NULL, 'SUV', '2195', '5', 'electric', 8284375, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'ARIYA B6'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'ARIYA B9 E-4ORCE', 'ZAA-FE0', 'CVT', '2WD', NULL, 'SUV', '2485', '5', 'electric', 13222877, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'ARIYA B9 E-4ORCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'ATLAS DIESEL DX', '2RG-AHR88A', '6AMT', '4WD', 2999, 'TRUCK', '3915', '3', 'diesel', 6571051, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'ATLAS DIESEL DX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'ATLAS DIESEL DX', '2RG-AHS88A', '5AMT', '4WD', 2999, 'TRUCK', '4520', '5', 'diesel', 7110953, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'ATLAS DIESEL DX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'ATLAS DIESEL DX DOUBLE CAB', '2RG-AHS88A', '5AMT', '4WD', 2999, 'TRUCK', '4520', '6', 'diesel', 7407243, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'ATLAS DIESEL DX DOUBLE CAB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'ATLAS DIESEL DX S/CAB', '2RG-AHR88A', '6AMT', '2WD', 2999, 'TRUCK', '3915', '3', 'diesel', 6844845, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'ATLAS DIESEL DX S/CAB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'ATLAS F24 D/CAB DX', 'CBF-SQ2F24', '5AT', '4WD', 1998, 'TRUCK', '3270', '6', 'petrol', 4211003, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'ATLAS F24 D/CAB DX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'ATLAS GASOLIN', 'CBF-SQ2F24', '5AMT', '4WD', 1998, 'TRUCK', '3270', '3', 'petrol', 4042563, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'ATLAS GASOLIN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'ATLAS GASOLIN DOUBLE CAB', 'CBF-SQ2F24', '5AT', '2WD', 1998, 'TRUCK', '3270', '6', 'diesel', 4211003, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'ATLAS GASOLIN DOUBLE CAB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'AURA E-POWER G', '6AA-FE13', 'CVT', '2WD', 1198, 'HATCHBACK', '1535', '5', 'petrol', 4590681, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'AURA E-POWER G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'AURA E-POWER G LEATHER EDITION', '6AA-FE13', 'CVT', '2WD', 1198, 'HATCHBACK', '1535', '5', 'petrol', 4666301, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'AURA E-POWER G LEATHER EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'CARAVAN', '3BF-CSE26', 'CVT', '2WD', 2488, 'VAN', '2800', '10', 'petrol', 7080633, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'CARAVAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'CARAVAN', '3BF-DS4E26', '7M-AT', '2WD', 2488, 'VAN', '2650', '10', 'petrol', 6379737, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'CARAVAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'CARAVAN', '3BF-CS4E26', '7M-AT', '2WD', 2488, 'VAN', '2800', '10', 'petrol', 6549253, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'CARAVAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'CARAVAN', '3BF-VR2E26', '7M-AT', '2WD', 1998, 'VAN', '3185', '6', 'petrol', 5779082, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'CARAVAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'CARAVAN CHAIR CAB', '3BF-CS4E26', '7M-AT', '2WD', 2488, 'VAN', '2800', '10', 'petrol', 7029982, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'CARAVAN CHAIR CAB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'CARAVAN EXCLUSIVE KINDERGARTEN VEHICLE', '3BA-KS2E26', '7M-AT', '2WD', 2488, 'VAN', '2410', '14', 'petrol', 6872266, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'CARAVAN EXCLUSIVE KINDERGARTEN VEHICLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'CARAVAN EXCLUSIVE KINDERGARTEN VEHICLE FOR ATTENDING', '3BA-KS2E26', '7M-AT', '2WD', 2488, 'VAN', '2410', '13', 'petrol', 6772362, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'CARAVAN EXCLUSIVE KINDERGARTEN VEHICLE FOR ATTENDING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'CARAVAN GRAND GX', '3BF-VR2E26', '7M-AT', '2WD', 1998, 'VAN', '2990', '5', 'petrol', 6874187, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'CARAVAN GRAND GX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'CARAVAN GRAND PREMIUM GX', '3BF-VR2E26', '7M-AT', '2WD', 1998, 'VAN', '3010', '5', 'petrol', 7024044, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'CARAVAN GRAND PREMIUM GX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'CARAVAN GX', '3BF-VR2E26', '7MT-AT', '2WD', 1998, 'VAN', '2930', '5', 'petrol', 5316064, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'CARAVAN GX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'CARAVAN GX', '3BF-VR2E26', '7M-AT', '2WD', 1998, 'VAN', '2930', '5', 'petrol', 5175813, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'CARAVAN GX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'CARAVAN GX', '3BF-DS4E26', '7M-AT', '2WD', 2488, 'VAN', '2460', '10', 'petrol', 6651324, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'CARAVAN GX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'CARAVAN REFRIDGERATING DX', '3BF-VR2E26', '7M-AT', '2WD', 1998, 'VAN', '3265', '3', 'petrol', 7120105, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'CARAVAN REFRIDGERATING DX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'CARAVAN REFRIGERATING VAN DX', '3BF-VR2E26', '7M-AT', '2WD', 1998, 'VAN', '3265', '3', 'petrol', 6749307, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'CARAVAN REFRIGERATING VAN DX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'CARAVAN WAGON WIDEBODY', '3BF-DS4E26', '7M-AT', '2WD', 2488, 'VAN', '2650', '10', 'petrol', 6760834, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'CARAVAN WAGON WIDEBODY'
);