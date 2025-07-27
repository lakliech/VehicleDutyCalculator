INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NPR 45/55-155 (MWB) SERVICEPACK-X', NULL, '6AT-MT', '2WD', 5200, 'SINGLE CAB', NULL, NULL, 'diesel', 13715129, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NPR 45/55-155 (MWB) SERVICEPACK-X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NPR 45/55-155 (MWB) TRADEPACK', NULL, '6MT', '2WD', 5200, 'SINGLE CAB', NULL, NULL, 'diesel', 10532134, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NPR 45/55-155 (MWB) TRADEPACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NPR 45/55-155 (MWB) TRADEPACK PREM', NULL, '6AT-MT', '2WD', 5200, 'SINGLE CAB', NULL, NULL, 'diesel', 10925313, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NPR 45/55-155 (MWB) TRADEPACK PREM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NPR 45/55-155 (SWB)', NULL, '6AT-MT', '2WD', 5200, 'SINGLE CAB', NULL, NULL, 'diesel', 9229159, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NPR 45/55-155 (SWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NPR 45/55-155 (SWB) SERVICEPACK', NULL, '6AT-MT', '2WD', 5200, 'SINGLE CAB', NULL, NULL, 'diesel', 14111846, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NPR 45/55-155 (SWB) SERVICEPACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NPR 45/55-155 (SWB) TRADEPACK', NULL, '6MT', '2WD', 5200, 'SINGLE CAB', NULL, NULL, 'diesel', 10288116, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NPR 45/55-155 (SWB) TRADEPACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NPR 45/55-155 (SWB) TRADEPACK PREM', NULL, '6AT-MT', '2WD', 5200, 'SINGLE CAB', NULL, NULL, 'diesel', 10681295, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NPR 45/55-155 (SWB) TRADEPACK PREM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NPR 65/45-190', NULL, '6AT-MT', '2WD', 5200, 'DUAL CAB', NULL, NULL, 'diesel', 12386874, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NPR 65/45-190'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NPR 65/45-190 (MWB)', NULL, '6MT', '2WD', 5200, 'SINGLE CAB', NULL, NULL, 'diesel', 10004221, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NPR 65/45-190 (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NPR 75-190', NULL, '6AT-MT', '2WD', 5200, 'DUAL CAB', NULL, NULL, 'diesel', 13454756, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NPR 75-190'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NPR 75-190 (LWB)', NULL, '6AT-MT', '2WD', 5200, 'SINGLE CAB', NULL, NULL, 'diesel', 11303386, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NPR 75-190 (LWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NPR 75-190 (MLWB)', NULL, '6AT-MT', '2WD', 5200, 'SINGLE CAB', NULL, NULL, 'diesel', 11271812, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NPR 75-190 (MLWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NPR 75-190 (MWB)', NULL, '6AT-MT', '2WD', 5200, 'SINGLE CAB', NULL, NULL, 'diesel', 11233297, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NPR 75-190 (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NPS 75/45-155 (4WD)', NULL, '5AT', '4WD', 5200, 'DUAL CAB', NULL, NULL, 'diesel', 16058778, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NPS 75/45-155 (4WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'NPS 75-155 4WD SERVICEPACK-X', NULL, '5AT-MT', '2WD', 5200, 'SINGLE CAB', NULL, NULL, 'diesel', 18172382, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'NPS 75-155 4WD SERVICEPACK-X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'ISUZU ELF TRUCK FULL FLATLOW DUMP', 'NJR85-707', 'AT', '2WD', 3000, 'TRK', NULL, NULL, 'diesel', 12540486, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'ISUZU ELF TRUCK FULL FLATLOW DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'ISUZU ELF TRUCK LONG HIGH FLOOR', 'NLR88-700', 'AT', '2WD', 3000, 'TRK', NULL, NULL, 'diesel', 12302489, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'ISUZU ELF TRUCK LONG HIGH FLOOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'ISUZU ELF TRUCK', 'NJR88-700', 'MT', '2WD', 3000, 'TRK', NULL, NULL, 'diesel', 9718296, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'ISUZU ELF TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'ISUZU ELF TRUCK FULL FLATLOW', 'NJR88-700', 'AT', '2WD', 3000, 'TRK', NULL, NULL, 'diesel', 7748650, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'ISUZU ELF TRUCK FULL FLATLOW'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'ISUZU FORWARD', 'FRR90-713', 'MT', '2WD', 5200, 'TRK', NULL, NULL, 'diesel', 18388410, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'ISUZU FORWARD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'ISUZU FORWARD', 'FRR90-716', 'AT', '2WD', 5200, 'TRK', NULL, NULL, 'diesel', 24107641, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'ISUZU FORWARD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'ISUZU FORWARD BASEGRADE', 'FRR90-715', 'AT', '2WD', 5200, 'TRK', NULL, NULL, 'diesel', 36219157, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'ISUZU FORWARD BASEGRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'ISUZU', 'ISUZU FORWARD BASEGRADE', 'FRR90-717', 'MT', '2WD', 5200, 'TRK', NULL, NULL, 'diesel', 9530220, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'ISUZU' AND model = 'ISUZU FORWARD BASEGRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 35S14V H1 SRW (WB3000)', NULL, '6MT', NULL, 2300, 'VAN', NULL, NULL, 'diesel', 8130054, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 35S14V H1 SRW (WB3000)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 35S14V H1 SRW (WB3520)', NULL, '6MT', NULL, 2300, 'VAN', NULL, NULL, 'diesel', 8418032, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 35S14V H1 SRW (WB3520)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 35S14V H2 SRW (WB3520L)', NULL, '6MT', NULL, 2300, 'VAN', NULL, NULL, 'diesel', 9067614, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 35S14V H2 SRW (WB3520L)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 35S14V H2 SRW (WB4100)', NULL, '6MT', NULL, 2300, 'VAN', NULL, NULL, 'diesel', 9646699, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 35S14V H2 SRW (WB4100)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 35S14V H1 SRW (WB3000)', NULL, '8AT', NULL, 2300, 'VAN', NULL, NULL, 'diesel', 8751329, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 35S14V H1 SRW (WB3000)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 35S14V H1 SRW (WB3520)', NULL, '8AT', NULL, 2300, 'VAN', NULL, NULL, 'diesel', 9039306, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 35S14V H1 SRW (WB3520)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 35S14V H2 SRW (WB3520L)', NULL, '8AT', NULL, 2300, 'VAN', NULL, NULL, 'diesel', 9688889, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 35S14V H2 SRW (WB3520L)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 35S14V H2 SRW (WB4100)', NULL, '8AT', NULL, 2300, 'VAN', NULL, NULL, 'diesel', 10267974, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 35S14V H2 SRW (WB4100)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C18 DRW (WB3450)', NULL, '6AT', NULL, 3000, 'DUAL CAB', NULL, NULL, 'diesel', 10501014, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C18 DRW (WB3450)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C18 DRW (WB3750)', NULL, '6AT', NULL, 3000, 'DUAL CAB', NULL, NULL, 'diesel', 10568835, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C18 DRW (WB3750)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C18 DRW (WB4100)', NULL, '6AT', NULL, 3000, 'DUAL CAB', NULL, NULL, 'diesel', 10636655, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C18 DRW (WB4100)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C18 DRW (WB4350)', NULL, '6AT', NULL, 3000, 'DUAL CAB', NULL, NULL, 'diesel', 10704476, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C18 DRW (WB4350)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C18 DRW (WB3750)', NULL, '6AT', NULL, 3000, 'DUAL CAB', NULL, NULL, 'diesel', 12111757, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C18 DRW (WB3750)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C18 DRW (WB4100)', NULL, '6AT', NULL, 3000, 'DUAL CAB', NULL, NULL, 'diesel', 12179578, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C18 DRW (WB4100)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C18 DRW (WB4350)', NULL, '6AT', NULL, 3000, 'DUAL CAB', NULL, NULL, 'diesel', 12247399, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C18 DRW (WB4350)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C18 DRW (WB4750)', NULL, '6AT', NULL, 3000, 'DUAL CAB', NULL, NULL, 'diesel', 12315219, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C18 DRW (WB4750)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C18 DRW (WB3450)', NULL, '8AT', NULL, 3000, 'DUAL CAB', NULL, NULL, 'diesel', 11174061, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C18 DRW (WB3450)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C18 DRW (WB3750)', NULL, '8AT', NULL, 3000, 'DUAL CAB', NULL, NULL, 'diesel', 11241882, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C18 DRW (WB3750)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C18 DRW (WB4100)', NULL, '8AT', NULL, 3000, 'DUAL CAB', NULL, NULL, 'diesel', 11309703, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C18 DRW (WB4100)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C18 DRW (WB4350)', NULL, '8AT', NULL, 3000, 'DUAL CAB', NULL, NULL, 'diesel', 11377524, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C18 DRW (WB4350)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C21 DRW (WB3450)', NULL, '8AT', NULL, 3000, 'DUAL CAB', NULL, NULL, 'diesel', 11587621, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C21 DRW (WB3450)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C21 DRW (WB3750)', NULL, '8AT', NULL, 3000, 'DUAL CAB', NULL, NULL, 'diesel', 11655441, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C21 DRW (WB3750)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C21 DRW (WB4100)', NULL, '8AT', NULL, 3000, 'DUAL CAB', NULL, NULL, 'diesel', 11723262, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C21 DRW (WB4100)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C21 DRW (WB4350)', NULL, '8AT', NULL, 3000, 'DUAL CAB', NULL, NULL, 'diesel', 11791083, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C21 DRW (WB4350)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C18 DRW (WB3750)', NULL, '8AT', NULL, 3000, 'DUAL CAB', NULL, NULL, 'diesel', 12784805, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C18 DRW (WB3750)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C18 DRW (WB4100)', NULL, '8AT', NULL, 3000, 'DUAL CAB', NULL, NULL, 'diesel', 12852625, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C18 DRW (WB4100)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C18 DRW (WB4350)', NULL, '8AT', NULL, 3000, 'DUAL CAB', NULL, NULL, 'diesel', 12920446, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C18 DRW (WB4350)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C18 DRW (WB4750)', NULL, '8AT', NULL, 3000, 'DUAL CAB', NULL, NULL, 'diesel', 12988267, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C18 DRW (WB4750)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C21 DRW (WB4100)', NULL, '8AT', NULL, 3000, 'DUAL CAB', NULL, NULL, 'diesel', 13266185, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C21 DRW (WB4100)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C21 DRW (WB4350)', NULL, '8AT', NULL, 3000, 'DUAL CAB', NULL, NULL, 'diesel', 13334005, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C21 DRW (WB4350)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C21 DRW (WB4750)', NULL, '8AT', NULL, 3000, 'DUAL CAB', NULL, NULL, 'diesel', 13401826, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C21 DRW (WB4750)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C18 DRW (WB3450)', NULL, '6AT', NULL, 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 8929750, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C18 DRW (WB3450)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C18 DRW (WB3750)', NULL, '6AT', NULL, 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 8992353, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C18 DRW (WB3750)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C18 DRW (WB4100)', NULL, '6AT', NULL, 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 9054957, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C18 DRW (WB4100)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C18 DRW (WB4350)', NULL, '6AT', NULL, 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 9117561, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C18 DRW (WB4350)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C18 DRW (WB4750)', NULL, '6AT', NULL, 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 9180165, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C18 DRW (WB4750)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C18 DRW (WB3750)', NULL, '6AT', NULL, 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 10416590, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C18 DRW (WB3750)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C18 DRW (WB4100)', NULL, '6AT', NULL, 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 10479193, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C18 DRW (WB4100)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C18 DRW (WB4350)', NULL, '6AT', NULL, 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 10541797, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C18 DRW (WB4350)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C18 DRW (WB4750)', NULL, '6AT', NULL, 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 10604401, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C18 DRW (WB4750)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 45C18 TRADIE MADE 3173 TRAY', NULL, '8AT', NULL, 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 7988788, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 45C18 TRADIE MADE 3173 TRAY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 45C18 TRADIE MADE 4223 TRAY', NULL, '8AT', NULL, 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 8124883, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 45C18 TRADIE MADE 4223 TRAY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C18 DRW (WB3450)', NULL, '8AT', NULL, 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 9624516, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C18 DRW (WB3450)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C18 DRW (WB3750)', NULL, '8AT', NULL, 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 9613628, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C18 DRW (WB3750)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C18 DRW (WB4100)', NULL, '8AT', NULL, 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 9676232, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C18 DRW (WB4100)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C18 DRW (WB4350)', NULL, '8AT', NULL, 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 9738836, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C18 DRW (WB4350)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C18 DRW (WB4750)', NULL, '8AT', NULL, 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 9801439, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C18 DRW (WB4750)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C21 DRW (WB3450)', NULL, '8AT', NULL, 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 10006263, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C21 DRW (WB3450)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C21 DRW (WB3750)', NULL, '8AT', NULL, 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 9995375, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C21 DRW (WB3750)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C21 DRW (WB4100)', NULL, '8AT', NULL, 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 10057979, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C21 DRW (WB4100)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C21 DRW (WB4350)', NULL, '8AT', NULL, 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 10120583, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C21 DRW (WB4350)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C21 DRW (WB4750)', NULL, '8AT', NULL, 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 10183186, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C21 DRW (WB4750)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C18 DRW (WB3750)', NULL, '8AT', NULL, 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 11037864, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C18 DRW (WB3750)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C18 DRW (WB4100)', NULL, '8AT', NULL, 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 11100468, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C18 DRW (WB4100)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C18 DRW (WB4350)', NULL, '8AT', NULL, 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 11163072, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C18 DRW (WB4350)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C18 DRW (WB4750)', NULL, '8AT', NULL, 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 11225675, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C18 DRW (WB4750)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C21 DRW (WB3750)', NULL, '8AT', NULL, 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 11419611, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C21 DRW (WB3750)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C21 DRW (WB4100)', NULL, '8AT', NULL, 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 11482215, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C21 DRW (WB4100)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C21 DRW (WB4350)', NULL, '8AT', NULL, 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 11544819, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C21 DRW (WB4350)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C21 DRW (WB4750)', NULL, '8AT', NULL, 3000, 'SINGLE CAB', NULL, NULL, 'diesel', 11607422, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C21 DRW (WB4750)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 35S18V H1 SRW (WB3520)', NULL, '6MT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 8904572, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 35S18V H1 SRW (WB3520)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 35S18V H2 SRW (WB3520L)', NULL, '6MT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 9554154, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 35S18V H2 SRW (WB3520L)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 35S18V H2 SRW (WB4100)', NULL, '6MT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 10133239, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 35S18V H2 SRW (WB4100)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 35S21V H1 SRW (WB3520)', NULL, '6MT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 8799779, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 35S21V H1 SRW (WB3520)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 35S21V H2 SRW (WB3520L)', NULL, '6MT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 9449361, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 35S21V H2 SRW (WB3520L)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 35S21V H2 SRW (WB4100)', NULL, '6MT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 10028446, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 35S21V H2 SRW (WB4100)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C18V H2 DRW (WB3520L)', NULL, '6MT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 10226192, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C18V H2 DRW (WB3520L)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C18V H2 DRW (WB4100)', NULL, '6MT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 10796023, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C18V H2 DRW (WB4100)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C18V H3 DRW (WB4100)', NULL, '6MT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 11365717, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C18V H3 DRW (WB4100)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C18V H3 DRW (WB4100L)', NULL, '6MT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 11935412, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C18V H3 DRW (WB4100L)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C21V H2 DRW (WB3520L)', NULL, '6MT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 10607939, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C21V H2 DRW (WB3520L)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C21V H2 DRW (WB4100)', NULL, '6MT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 11177770, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C21V H2 DRW (WB4100)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C21V H3 DRW (WB4100)', NULL, '6MT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 11747464, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C21V H3 DRW (WB4100)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C21V H3 DRW (WB4100L)', NULL, '6MT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 12317159, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C21V H3 DRW (WB4100L)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C18V H3 DRW (WB4100)', NULL, '6MT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 12335668, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C18V H3 DRW (WB4100)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C18V H3 DRW (WB4100L)', NULL, '6MT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 12980487, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C18V H3 DRW (WB4100L)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C21V H3 DRW (WB4100)', NULL, '6MT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 12717415, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C21V H3 DRW (WB4100)'
);