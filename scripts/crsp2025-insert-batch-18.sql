INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'D-MAX LS-M (4WD)', NULL, '6MT', '4WD', 3000, 'DUAL CAB', NULL, NULL, 'diesel', 9586646, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'D-MAX LS-M (4WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'D-MAX LS-M HI-RIDE (4WD)', NULL, '6AT', '4WD', 3000, 'DUAL CAB', NULL, NULL, 'diesel', 12041872, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'D-MAX LS-M HI-RIDE (4WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'D-MAX LS-T (4WD)', NULL, '6AT', '4WD', 3000, 'DUAL CAB', NULL, NULL, 'diesel', 11316567, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'D-MAX LS-T (4WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'D-MAX LS-T HIGH-RIDE (2WD)', NULL, '6AT', '2WD', 3000, 'DUAL CAB', NULL, NULL, 'diesel', 9550606, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'D-MAX LS-T HIGH-RIDE (2WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'D-MAX LS-TERRAIN HI-RIDE (4WD)', NULL, '6AT', '4WD', 3000, 'DUAL CAB', NULL, NULL, 'diesel', 12568958, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'D-MAX LS-TERRAIN HI-RIDE (4WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'D-MAX LS-U (2WD)', NULL, '6AT', '2WD', 3000, 'DUAL CAB', NULL, NULL, 'diesel', 11417479, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'D-MAX LS-U (2WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'D-MAX LS-U (2WD) HIGH-RIDE', NULL, '6AT', '2WD', 3000, 'DUAL CAB', NULL, NULL, 'diesel', 8035287, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'D-MAX LS-U (2WD) HIGH-RIDE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'D-MAX LS-U (4WD)', NULL, '6AT', '4WD', 3000, 'DUAL CAB', NULL, NULL, 'diesel', 11129609, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'D-MAX LS-U (4WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'D-MAX LS-U HI-RIDE (2WD)', NULL, '6AT', '2WD', 3000, 'DUAL CAB', NULL, NULL, 'diesel', 9203721, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'D-MAX LS-U HI-RIDE (2WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'D-MAX LS-U HI-RIDE (4WD)', NULL, '6MT', '4WD', 3000, 'DUAL CAB', NULL, NULL, 'diesel', 11393152, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'D-MAX LS-U HI-RIDE (4WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'D-MAX LS-U+ (4WD)', NULL, '6AT', '4WD', 3000, 'DUAL CAB', NULL, NULL, 'diesel', 9657088, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'D-MAX LS-U+ (4WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'D-MAX SX (2WD)', NULL, '6AT', '2WD', 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 7096003, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'D-MAX SX (2WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'D-MAX SX (2WD) HIGH-RIDE', NULL, '6AT', '2WD', 1900, 'DUAL CAB', NULL, NULL, 'diesel', 6231458, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'D-MAX SX (2WD) HIGH-RIDE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'D-MAX SX (4WD)', NULL, '6MT', '4WD', 3000, 'DUAL CAB', NULL, NULL, 'diesel', 9406446, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'D-MAX SX (4WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'D-MAX SX LOW-RIDE (2WD)', NULL, '6MT', '2WD', 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 6362450, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'D-MAX SX LOW-RIDE (2WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'D-MAX X-RIDER (4WD)', NULL, '6AT', '4WD', 3000, 'DUAL CAB', NULL, NULL, 'diesel', 8772469, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'D-MAX X-RIDER (4WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'D-MAX X-RIDER LIMITED EDITION (4WD)', NULL, '6MT', '4WD', 3000, 'DUAL CAB', NULL, NULL, 'diesel', 12244597, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'D-MAX X-RIDER LIMITED EDITION (4WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'D-MAX X-RUNNER LTD ED (4WD)', NULL, '6AT', '4WD', 3000, 'DUAL CAB', NULL, NULL, 'diesel', 10415566, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'D-MAX X-RUNNER LTD ED (4WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'D-MAX X-TERRAIN (4WD)', NULL, '6AT', '4WD', 3000, 'DUAL CAB', NULL, NULL, 'diesel', 10394270, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'D-MAX X-TERRAIN (4WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FRD 110-240 (XLWB)', NULL, '6AT-MT', '2WD', 5200, 'SINGLE CAB', NULL, NULL, 'diesel', 16418660, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FRD 110-240 (XLWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FRD 110-260 (LWB)', NULL, '6MT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 17023875, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FRD 110-260 (LWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FRD 110-260 (LWB) AW', NULL, '6AT-MT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 19051557, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FRD 110-260 (LWB) AW'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FRR 110-240 (LWB)', NULL, '6AT-MT', '2WD', 5200, 'SINGLE CAB', NULL, NULL, 'diesel', 15577591, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FRR 110-240 (LWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FRR 110-240 (MLWB)', NULL, '6AT-MT', '2WD', 5200, 'SINGLE CAB', NULL, NULL, 'diesel', 15487768, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FRR 110-240 (MLWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FRR 110-240 (MWB)', NULL, '6AT-MT', '2WD', 5200, 'SINGLE CAB', NULL, NULL, 'diesel', 15365283, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FRR 110-240 (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FRR 110-240 (SWB) PTO', NULL, '6MT', '2WD', 5200, 'SINGLE CAB', NULL, NULL, 'diesel', 14936175, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FRR 110-240 (SWB) PTO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FRR 110-240 (XLWB)', NULL, '6AT-MT', '2WD', 5200, 'SINGLE CAB', NULL, NULL, 'diesel', 15670136, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FRR 110-240 (XLWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FRR 110-260', NULL, '6AT-MT', '2WD', 7800, 'DUAL CAB', NULL, NULL, 'diesel', 22572963, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FRR 110-260'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FRR 110-260 (LWB)', NULL, '6AT-MT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 17840446, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FRR 110-260 (LWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FRR 110-260 (MWB)', NULL, '6AT-MT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 17676996, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FRR 110-260 (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FRR 110-260 (XLWB)', NULL, '6AT-MT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 17922103, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FRR 110-260 (XLWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FSD 140/120-260 (LWB)', NULL, '6AT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 21320264, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FSD 140/120-260 (LWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FSD 140/120-260 (LWB) AW', NULL, '6AT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 21810343, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FSD 140/120-260 (LWB) AW'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FSR 120-260 (SWB)', NULL, '6AT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 20327994, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FSR 120-260 (SWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FSR 120-260 DC', NULL, '6AT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 25118272, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FSR 120-260 DC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FSR 140/120-240 (LWB)', NULL, '6AT', '2WD', 5200, 'SINGLE CAB', NULL, NULL, 'diesel', 19135664, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FSR 140/120-240 (LWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FSR 140/120-240 (SWB)', NULL, '6AT', '2WD', 5200, 'SINGLE CAB', NULL, NULL, 'diesel', 19071563, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FSR 140/120-240 (SWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FSR 140/120-260 (LWB)', NULL, '6AT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 20571740, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FSR 140/120-260 (LWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FSR 140/120-260 (MWB)', NULL, '6AT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 20408426, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FSR 140/120-260 (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FSR 140/120-260 (XLWB)', NULL, '6AT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 20653533, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FSR 140/120-260 (XLWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FSS 110-210 (4WD)', NULL, '6MT', '4WD', 5200, 'DUAL CAB', NULL, NULL, 'diesel', 26855845, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FSS 110-210 (4WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FTR 150-260 (LWB)', NULL, '6AT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 23734048, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FTR 150-260 (LWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FTR 150-260 (MLWB)', NULL, '6AT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 23536710, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FTR 150-260 (MLWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FTR 150-260 (MWB)', NULL, '6AT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 23271324, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FTR 150-260 (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FTS 139-260 (4WD)', NULL, '6AT', '4WD', 7800, 'DUAL CAB', NULL, NULL, 'diesel', 33400696, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FTS 139-260 (4WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FVD 165-260', NULL, '6AT', '2WD', 7800, 'DUAL CAB', NULL, NULL, 'diesel', 32661155, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FVD 165-260'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FVD 165-300 (LWB)', NULL, '6AT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 26843279, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FVD 165-300 (LWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FVD 165-300 (MLWB)', NULL, '6AT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 26817557, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FVD 165-300 (MLWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FVD 165-300 (MLWB) DC', NULL, '6AT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 32397459, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FVD 165-300 (MLWB) DC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FVL 240-300 (LWB)', NULL, '6AT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 28797878, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FVL 240-300 (LWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FVR 165-300 (LWB)', NULL, '9MT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 23993582, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FVR 165-300 (LWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FVR 165-300 (MLWB)', NULL, '6AT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 25960157, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FVR 165-300 (MLWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FVR 165-300 (MWB)', NULL, '9MT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 23728196, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FVR 165-300 (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FVY 240-300 (LWB)', NULL, '6AT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 32446045, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FVY 240-300 (LWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FVY 240-300 (LWB) DC', NULL, '6AT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 38025948, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FVY 240-300 (LWB) DC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FVY 240-300 (MWB) AW', NULL, '6AT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 32019659, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FVY 240-300 (MWB) AW'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FVY 240-300 (MWB) DC', NULL, '6AT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 37659852, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FVY 240-300 (MWB) DC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FVZ 240-300 (LWB)', NULL, '9MT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 29057275, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FVZ 240-300 (LWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FVZ 240-300 (MLWB)', NULL, '6AT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 31066040, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FVZ 240-300 (MLWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FVZ 240-300 (MLWB) DC', NULL, '6AT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 36645943, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FVZ 240-300 (MLWB) DC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FVZ 240-300 (MWB)', NULL, '6AT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 30882312, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FVZ 240-300 (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FVZ 240-300 (MWB) DC', NULL, '6AT', '2WD', 7800, 'SINGLE CAB', NULL, NULL, 'diesel', 36462214, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FVZ 240-300 (MWB) DC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FXD 165-350 (LWB)', NULL, '6AT', '2WD', 9800, 'SINGLE CAB', NULL, NULL, 'diesel', 28282077, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FXD 165-350 (LWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FXD 165-350 (XLWB)', NULL, '9MT', '2WD', 9800, 'SINGLE CAB', NULL, NULL, 'diesel', 25459599, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FXD 165-350 (XLWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FXL 240-350 (LWB)', NULL, '9MT', '2WD', 9800, 'SINGLE CAB', NULL, NULL, 'diesel', 27708436, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FXL 240-350 (LWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FXZ 240-350 (LWB)', NULL, '6AT', '2WD', 9800, 'SINGLE CAB', NULL, NULL, 'diesel', 32275518, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FXZ 240-350 (LWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FXZ 240-350 (MLWB)', NULL, '6AT', '2WD', 9800, 'SINGLE CAB', NULL, NULL, 'diesel', 32080494, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FXZ 240-350 (MLWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FYH 300-350 (LWB)', NULL, '6AT', '2WD', 9800, 'SINGLE CAB', NULL, NULL, 'diesel', 35179653, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FYH 300-350 (LWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FYH 300-350 (MWB)', NULL, '6AT', '2WD', 9800, 'SINGLE CAB', NULL, NULL, 'diesel', 35100174, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FYH 300-350 (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FYJ 300-350 (LWB)', NULL, '6AT', '2WD', 9800, 'SINGLE CAB', NULL, NULL, 'diesel', 35607128, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FYJ 300-350 (LWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FYJ 300-350 (MWB)', NULL, '6AT', '2WD', 9800, 'SINGLE CAB', NULL, NULL, 'diesel', 36561019, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FYJ 300-350 (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FYJ 300-350 (XLWB)', NULL, '6AT', '2WD', 9800, 'SINGLE CAB', NULL, NULL, 'diesel', 35764590, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FYJ 300-350 (XLWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FYJ 300-350 AGITATOR', NULL, '6AT', '2WD', 9800, 'SINGLE CAB', NULL, NULL, 'diesel', 39557972, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FYJ 300-350 AGITATOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'FYX 350-350', NULL, '5AT', '2WD', 9800, 'SINGLE CAB', NULL, NULL, 'diesel', 39893718, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'FYX 350-350'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'MU-X LS-M (2WD)', NULL, '6AT', '2WD', 1900, 'SUV', NULL, NULL, 'diesel', 6450912, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'MU-X LS-M (2WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'MU-X LS-M (4WD)', NULL, '6AT', '4WD', 1900, 'SUV', NULL, NULL, 'diesel', 7267483, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'MU-X LS-M (4WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'MU-X LS-T (2WD)', NULL, '6AT', '2WD', 3000, 'SUV', NULL, NULL, 'diesel', 8628435, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'MU-X LS-T (2WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'MU-X LS-T (4WD)', NULL, '6AT', '4WD', 3000, 'SUV', NULL, NULL, 'diesel', 9445006, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'MU-X LS-T (4WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'MU-X LS-U (2WD)', NULL, '6AT', '2WD', 3000, 'SUV', NULL, NULL, 'diesel', 7607721, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'MU-X LS-U (2WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'MU-X LS-U (4WD)', NULL, '6AT', '4WD', 1900, 'SUV', NULL, NULL, 'diesel', 8152102, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'MU-X LS-U (4WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'MU-X X-TERRAIN (4WD)', NULL, '6AT', '4WD', 3000, 'SUV', NULL, NULL, 'diesel', 10125482, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'MU-X X-TERRAIN (4WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NLR 45-140 (SWB) SERVICEPACK-X', NULL, '6AT-MT', '2WD', 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 11618310, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NLR 45-140 (SWB) SERVICEPACK-X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NLR 45-150 (MWB)', NULL, '5MT', '2WD', 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 7817035, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NLR 45-150 (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NLR 45-150 (MWB) TRAYPACK', NULL, '5MT', '2WD', 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 8640411, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NLR 45-150 (MWB) TRAYPACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NLR 45-150 (SWB)', NULL, '5MT', '2WD', 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 7577236, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NLR 45-150 (SWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NLR 45-150 (SWB) SERVICEPACK', NULL, '6AT-MT', '2WD', 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 11947660, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NLR 45-150 (SWB) SERVICEPACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NLR 45-150 (SWB) TRAYPACK', NULL, '5MT', '2WD', 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 8280848, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NLR 45-150 (SWB) TRAYPACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NLS 45-150 (AWD)', NULL, '5MT', '4WD', 3000, 'DUAL CAB', NULL, NULL, 'diesel', 10865477, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NLS 45-150 (AWD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NLS 45-150 AWD SERVICEPACK-X', NULL, '5MT', '2WD', 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 12737693, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NLS 45-150 AWD SERVICEPACK-X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NLS 45-150 AWD TRAYPACK', NULL, '5MT', '2WD', 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 9436568, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NLS 45-150 AWD TRAYPACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NNR 45-150 (MWB)', NULL, '6AT-MT', '2WD', 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 8784264, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NNR 45-150 (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NNR 45-150 (MWB) VANPACK', NULL, '6AT-MT', '2WD', 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 10663058, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NNR 45-150 (MWB) VANPACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NNR 45-150 (SWB)', NULL, '6AT-MT', '2WD', 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 8543920, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NNR 45-150 (SWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NNR 45-150 CREW IFS TRAYPACK', NULL, '6AT-MT', '2WD', 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 10835491, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NNR 45-150 CREW IFS TRAYPACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NNR 45-150 IFS', NULL, '6AT-MT', '2WD', 3000, 'DUAL CAB', NULL, NULL, 'diesel', 10919439, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NNR 45-150 IFS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NNR 55/45-150 (MWB) IFS TRAYPACK', NULL, '6AT-MT', '2WD', 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 9864860, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NNR 55/45-150 (MWB) IFS TRAYPACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NNR 55/45-150 IFS (MWB)', NULL, '6AT-MT', '2WD', 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 9026513, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NNR 55/45-150 IFS (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NNR 55/45-150 IFS (SWB)', NULL, '6AT-MT', '2WD', 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 8786169, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NNR 55/45-150 IFS (SWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NNR 65-150 IFS (MWB)', NULL, '6AT-MT', '2WD', 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 9694877, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NNR 65-150 IFS (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NPR 45/55-155 (MWB)', NULL, '6AT-MT', '2WD', 5200, 'SINGLE CAB', NULL, NULL, 'diesel', 9375870, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NPR 45/55-155 (MWB)'
);