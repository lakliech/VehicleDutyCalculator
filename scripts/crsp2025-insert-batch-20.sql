INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C21V H3 DRW (WB4100L)', NULL, '6MT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 13362234, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C21V H3 DRW (WB4100L)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 35S18V H1 SRW (WB3520)', NULL, '8AT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 9525847, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 35S18V H1 SRW (WB3520)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 35S18V H2 SRW (WB3520L)', NULL, '8AT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 10175429, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 35S18V H2 SRW (WB3520L)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 35S18V H2 SRW (WB4100)', NULL, '8AT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 10649721, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 35S18V H2 SRW (WB4100)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 35S21V H1 SRW (WB3520)', NULL, '8AT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 9421053, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 35S21V H1 SRW (WB3520)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 35S21V H2 SRW (WB3520L)', NULL, '8AT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 10070636, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 35S21V H2 SRW (WB3520L)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 35S21V H2 SRW (WB4100)', NULL, '8AT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 10649721, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 35S21V H2 SRW (WB4100)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C18V H2 DRW (WB3520L)', NULL, '8AT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 10847467, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C18V H2 DRW (WB3520L)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C18V H2 DRW (WB4100)', NULL, '8AT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 11417297, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C18V H2 DRW (WB4100)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C18V H3 DRW (WB4100)', NULL, '8AT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 11986992, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C18V H3 DRW (WB4100)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C18V H3 DRW (WB4100L)', NULL, '8AT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 12556686, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C18V H3 DRW (WB4100L)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C21V H2 DRW (WB3520L)', NULL, '8AT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 11229214, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C21V H2 DRW (WB3520L)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C21V H2 DRW (WB4100)', NULL, '8AT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 11799044, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C21V H2 DRW (WB4100)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C21V H3 DRW (WB4100)', NULL, '8AT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 12368739, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C21V H3 DRW (WB4100)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 50C21V H3 DRW (WB4100L)', NULL, '8AT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 12938433, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 50C21V H3 DRW (WB4100L)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C18V H3 DRW (WB4100)', NULL, '8AT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 12956942, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C18V H3 DRW (WB4100)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C18V H3 DRW (WB4100L)', NULL, '8AT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 13601761, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C18V H3 DRW (WB4100L)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C21V H3 DRW (WB4100)', NULL, '8AT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 13338689, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C21V H3 DRW (WB4100)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'IVECO DAILY', 'E6 70C21V H3 DRW (WB4100L)', NULL, '8AT', NULL, 3000, 'VAN', NULL, NULL, 'diesel', 13983508, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'IVECO DAILY' AND model = 'E6 70C21V H3 DRW (WB4100L)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAC', 'HFC4251KR1', 'HFC4251KR1', 'AT', '6×4', 11600, 'TRUCK', '33,800', '2', 'diesel', 8443350, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAC' AND model = 'HFC4251KR1'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAC', 'HFC4251KR1 4X2', 'HFC4251KR1', 'AT', '4×2', 11600, 'TRUCK', NULL, '2', 'diesel', 8021183, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAC' AND model = 'HFC4251KR1 4X2'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAC', 'HFC4251KR1 6X2', 'HFC4251KR1', 'AT', '6×2', 11600, 'TRUCK', NULL, '2', 'diesel', 8232266, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAC' AND model = 'HFC4251KR1 6X2'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAC', 'HFC4251KR1 8X4', 'HFC4251KR1', 'AT', '8×4', 11600, 'TRUCK', NULL, '2', 'diesel', 9287685, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAC' AND model = 'HFC4251KR1 8X4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAC', 'HFC4251KR1 AUTO', 'HFC4251KR1', 'AT', '6×4', 11600, 'TRUCK', NULL, '2', 'diesel', 9498769, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAC' AND model = 'HFC4251KR1 AUTO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAC', 'HFC4251KR1 CNG', 'HFC4251KR1CNG', 'AT', '6×4', 11600, 'TRUCK', NULL, '2', 'cng', 9076601, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAC' AND model = 'HFC4251KR1 CNG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAC', 'HFC4251KR1 DAYCAB', 'HFC4251KR1', 'AT', '6×4', 11600, 'TRUCK', NULL, '2', 'diesel', 8443350, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAC' AND model = 'HFC4251KR1 DAYCAB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAC', 'HFC4251KR1 EURO5', 'HFC4251KR1', 'AT', '6×4', 11600, 'TRUCK', NULL, '2', 'diesel', 8654434, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAC' AND model = 'HFC4251KR1 EURO5'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAC', 'HFC4251KR1 EURO6', 'HFC4251KR1', 'AT', '6×4', 11600, 'TRUCK', NULL, '2', 'diesel', 8865518, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAC' AND model = 'HFC4251KR1 EURO6'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAC', 'HFC4251KR1 EV', 'HFC4251KR1EV', 'AT', '6×4', NULL, 'TRUCK', NULL, '2', 'electric', 9498769, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAC' AND model = 'HFC4251KR1 EV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAC', 'HFC4251KR1 HIGHCAB', 'HFC4251KR1', 'AT', '6×4', 11600, 'TRUCK', NULL, '2', 'diesel', 9076601, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAC' AND model = 'HFC4251KR1 HIGHCAB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAC', 'HFC4251KR1 LNG', 'HFC4251KR1LNG', 'AT', '6×4', 11600, 'TRUCK', NULL, '2', 'lng', 8865518, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAC' AND model = 'HFC4251KR1 LNG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAC', 'HFC4251KR1 LOWCAB', 'HFC4251KR1', 'AT', '6×4', 11600, 'TRUCK', NULL, '2', 'diesel', 8232266, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAC' AND model = 'HFC4251KR1 LOWCAB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAC', 'HFC4251KR1 MANUAL', 'HFC4251KR1', 'MT', '6×4', 11600, 'TRUCK', NULL, '2', 'diesel', 8443350, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAC' AND model = 'HFC4251KR1 MANUAL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAC', 'HFC4251KR1 SLEEPER', 'HFC4251KR1', 'AT', '6×4', 11600, 'TRUCK', NULL, '2', 'diesel', 9287685, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAC' AND model = 'HFC4251KR1 SLEEPER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAC', 'HFC4251KR1', 'HFC4251KR1', 'AT', '6×4', 11600, 'TRUCK', NULL, '2', 'diesel', 13026883, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAC' AND model = 'HFC4251KR1'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAC', 'HFC4251KR1 EV', 'HFC4251KR1EV', 'AT', '6×4', NULL, 'TRUCK', NULL, '2', 'electric', 14655243, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAC' AND model = 'HFC4251KR1 EV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAC', 'HFC4251KR1 LNG', 'HFC4251KR1LNG', 'AT', '6×4', 11600, 'TRUCK', NULL, '2', 'lng', 13678227, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAC' AND model = 'HFC4251KR1 LNG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAC', 'HFC4251KR1 CNG', 'HFC4251KR1CNG', 'AT', '6×4', 11600, 'TRUCK', NULL, '2', 'cng', 14003899, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAC' AND model = 'HFC4251KR1 CNG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAC', 'HFC4251KR1 4X2', 'HFC4251KR1', 'AT', '4×2', 11600, 'TRUCK', NULL, '2', 'diesel', 12375539, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAC' AND model = 'HFC4251KR1 4X2'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAC', 'HFC4251KR1 6X2', 'HFC4251KR1', 'AT', '6×2', 11600, 'TRUCK', NULL, '2', 'diesel', 12701211, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAC' AND model = 'HFC4251KR1 6X2'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAC', 'HFC4251KR1 8X4', 'HFC4251KR1', 'AT', '8×4', 11600, 'TRUCK', NULL, '2', 'diesel', 14329571, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAC' AND model = 'HFC4251KR1 8X4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAC', 'HFC4251KR1 EURO5', 'HFC4251KR1', 'AT', '6×4', 11600, 'TRUCK', NULL, '2', 'diesel', 13352555, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAC' AND model = 'HFC4251KR1 EURO5'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAC', 'HFC4251KR1 EURO6', 'HFC4251KR1', 'AT', '6×4', 11600, 'TRUCK', NULL, '2', 'diesel', 13678227, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAC' AND model = 'HFC4251KR1 EURO6'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAC', 'HFC4251KR1 HIGHCAB', 'HFC4251KR1', 'AT', '6×4', 11600, 'TRUCK', NULL, '2', 'diesel', 14003899, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAC' AND model = 'HFC4251KR1 HIGHCAB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAC', 'HFC4251KR1 LOWCAB', 'HFC4251KR1', 'AT', '6×4', 11600, 'TRUCK', NULL, '2', 'diesel', 12701211, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAC' AND model = 'HFC4251KR1 LOWCAB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAC', 'HFC4251KR1 SLEEPER', 'HFC4251KR1', 'AT', '6×4', 11600, 'TRUCK', NULL, '2', 'diesel', 14329571, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAC' AND model = 'HFC4251KR1 SLEEPER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAC', 'HFC4251KR1 DAYCAB', 'HFC4251KR1', 'AT', '6×4', 11600, 'TRUCK', NULL, '2', 'diesel', 13026883, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAC' AND model = 'HFC4251KR1 DAYCAB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAC', 'HFC4251KR1 AUTO', 'HFC4251KR1', 'AT', '6×4', 11600, 'TRUCK', NULL, '2', 'diesel', 14655243, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAC' AND model = 'HFC4251KR1 AUTO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAC', 'HFC4251KR1 MANUAL', 'HFC4251KR1', 'MT', '6×4', 11600, 'TRUCK', NULL, '2', 'diesel', 13026883, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAC' AND model = 'HFC4251KR1 MANUAL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'XF SPORTBRAKE XF SPORTBRAKE R-SPORT', 'SAJBA2AN9LCY8', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'diesel', 10642843, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'XF SPORTBRAKE XF SPORTBRAKE R-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'XF PRESTIGE', 'SAJBB4AX8LCY8', 'AT', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 8072370, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'XF PRESTIGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'I-PACE HSE', 'SADHA2A19L1F7', 'AT', '4WD', NULL, 'COUPE', NULL, NULL, 'electric', 15090143, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'I-PACE HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'F-TYPE R-DYNAMIC COUPE', '3BA-J60XC', 'AT', '2WD', 2000, 'COUPE', NULL, NULL, 'petrol', 19301850, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'F-TYPE R-DYNAMIC COUPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'F-TYPE HERITAGE 60 EDITION', '3BA-J60MC', 'AT', '4WD', 5000, 'COUPE', NULL, NULL, 'petrol', 57520674, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'F-TYPE HERITAGE 60 EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'F-PACE SVR JAPAN SV EDITION', '7BA-DC5SC', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'petrol', 22947618, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'F-PACE SVR JAPAN SV EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'F-PACE S P250', '3BA-DC2XC', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'petrol', 12189182, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'F-PACE S P250'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'F-PACE S D200', 'SADCA2AN6PA71', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'hybrid', 13725721, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'F-PACE S D200'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'F-PACE R-DYNAMIC SE D200', 'PA71', 'AT', '4WD', 1990, 'WAGON', NULL, NULL, 'petrol', 13760851, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'F-PACE R-DYNAMIC SE D200'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'F-PACE PRESTIGE', 'SADCA2AX7KA60', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'petrol', 10401679, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'F-PACE PRESTIGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'F-PACE PORTFOLIO', 'SADCA2AX7KA35', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'petrol', 13643398, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'F-PACE PORTFOLIO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'E-PACE SENSORY PERFORMANCE EDITION', 'SADFA2AN0L1Z7', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'diesel', 14685331, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'E-PACE SENSORY PERFORMANCE EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'E-PACE R-DYNAMIC SE D200', 'SADFA2AN6P103', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'hybrid', 8945126, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'E-PACE R-DYNAMIC SE D200'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'E-PACE R-DYNAMIC HSE P250', 'SADFA2AX2N103', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'petrol', 11534672, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'E-PACE R-DYNAMIC HSE P250'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'E-PACE BASE GRADE 180PS', 'SADFA2AN8J1Z3', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'diesel', 9225566, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'E-PACE BASE GRADE 180PS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'XJ XJ R-SPORT', 'SAJKC1682J8W1', 'AT', '2WD', 3000, 'SEDAN', NULL, NULL, 'petrol', 11335725, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'XJ XJ R-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'XJ PREMIUM LUXURY', 'CBA-J128B', 'AT', '2WD', 3000, 'SEDAN', NULL, NULL, 'petrol', 14520753, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'XJ PREMIUM LUXURY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'XF SPORTBRAKE XF SPORTBRAKE PRESTIGE', 'SAJBB2AN4JCY6', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'diesel', 11285140, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'XF SPORTBRAKE XF SPORTBRAKE PRESTIGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'XF R-DYNAMIC HSE P250', '3BA-JB2XD', 'AT', '4WD', 2000, 'COUPE', NULL, NULL, 'petrol', 12613943, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'XF R-DYNAMIC HSE P250'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'XF PRESTIGE', 'SAJBB4AX0JCY7', 'AT', '4WD', 2000, 'COUPE', NULL, NULL, 'petrol', 10192330, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'XF PRESTIGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'I-PACE FIRST EDITION', 'ZAA-DH1AA', 'AT', '4WD', NULL, 'COUPE', NULL, NULL, 'electric', 12343122, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'I-PACE FIRST EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'I-PACE BLACK EDITION', 'ZAA-DH1CA', 'AT', '4WD', NULL, 'COUPE', NULL, NULL, 'electric', 13340191, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'I-PACE BLACK EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'F-TYPE R-DYNAMIC CONVERTIBLE', 'SAJDB5AX0PCK8', 'AT', '2WD', 2000, 'CONVERTIBLE', NULL, NULL, 'petrol', 18241858, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'F-TYPE R-DYNAMIC CONVERTIBLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'F-TYPE R-DYNAMIC BLACK CURATED FOR JAPAN', '7BA-J60MD', 'AT', '4WD', 5000, 'COUPE', NULL, NULL, 'petrol', 28317090, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'F-TYPE R-DYNAMIC BLACK CURATED FOR JAPAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'F-TYPE R75 COUPE P575', '3BA-J60MC', 'AT', '4WD', 2000, 'COUPE', NULL, NULL, 'petrol', 39922692, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'F-TYPE R75 COUPE P575'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'F-TYPE R AWD COUPE', 'SAJDA1AE2KCK6', 'AT', '4WD', 5000, 'COUPE', NULL, NULL, 'petrol', 33887536, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'F-TYPE R AWD COUPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'F-TYPE COUPE', 'DBA-J60XB', 'AT', '2WD', 2000, 'COUPE', NULL, NULL, 'petrol', 21151195, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'F-TYPE COUPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'F-PACE SVR', '7BA-DC5SC', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'petrol', 27696563, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'F-PACE SVR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'F-PACE S', 'SADCA2AV7JA29', 'AT', '4WD', 3000, 'WAGON', NULL, NULL, 'petrol', 15717899, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'F-PACE S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'F-PACE R-SPORT', 'JAGUAR F-PACE PURE', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'diesel', 9958404, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'F-PACE R-SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'F-PACE R-DYNAMIC SE P250', 'SADCA2AX3NA70', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'petrol', 14187843, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'F-PACE R-DYNAMIC SE P250'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'F-PACE PURE', 'SADCA2AX6KA60', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'petrol', 14961616, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'F-PACE PURE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'F-PACE BASE GRADE D200', 'SADCA2AN2NA69', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'diesel', 13871369, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'F-PACE BASE GRADE D200'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'E-PACE S P200', '3BA-DF2XB', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'petrol', 10435981, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'E-PACE S P200'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'E-PACE S 250PS', 'DBA-DF2XA', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'petrol', 8676598, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'E-PACE S 250PS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'E-PACE S 180PS', 'SADFA2AN8J1Z2', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'diesel', 10112721, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'E-PACE S 180PS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'E-PACE R-DYNAMIC SE P250', '3BA-DF2XB', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'petrol', 12373729, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'E-PACE R-DYNAMIC SE P250'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'E-PACE R-DYNAMIC SE 300PS', 'SADFA2AX1J1Z0', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'petrol', 11992572, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'E-PACE R-DYNAMIC SE 300PS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JAGUAR', 'E-PACE R-DYNAMIC HSE 300PS', 'SADFA2AX0J1Z2', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'petrol', 10883478, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JAGUAR' AND model = 'E-PACE R-DYNAMIC HSE 300PS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  AVENGER', 'ZACNJAC55RJK9', 'AT', '4WD', NULL, 'WAGON', NULL, NULL, 'electric', 9348899, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  AVENGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  AVENGER ALTITUDE', 'ZAA-FH1JE', 'AT', '4WD', NULL, 'WAGON', NULL, NULL, 'electric', 8579763, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  AVENGER ALTITUDE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  CHEROKEE 80TH ANNIVERSARY EDITION', '3BA-KL20L', 'AT', '4WD', NULL, 'WAGON', NULL, NULL, 'electric', 7295899, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  CHEROKEE 80TH ANNIVERSARY EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  CHEROKEE LIMITED', 'KL20L-1C4PJMHN2KD42', 'AT', '4WD', NULL, 'WAGON', NULL, NULL, 'electric', 8878183, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  CHEROKEE LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  CHEROKEE LONGITUDE LAUNCH EDITION', 'ABA-KL24', 'AT', '4WD', 2400, 'WAGON', NULL, NULL, 'petrol', 9041622, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  CHEROKEE LONGITUDE LAUNCH EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  CHEROKEE NIGHT EAGLE', 'ABA-KL32L', 'AT', '4WD', 3200, 'WAGON', NULL, NULL, 'petrol', 8447873, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  CHEROKEE NIGHT EAGLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  CHEROKEE TRAILHAWK', 'ABA-KL32L', 'AT', '4WD', 3200, 'WAGON', NULL, NULL, 'petrol', 15431579, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  CHEROKEE TRAILHAWK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  COMMANDER LIMITED', '3DA-H620', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'diesel', 9849168, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  COMMANDER LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  COMPASS 80TH ANNIVERSARY EDITION', '3BA-M624', 'AT', '4WD', 2400, 'WAGON', NULL, NULL, 'petrol', 9888852, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  COMPASS 80TH ANNIVERSARY EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  COMPASS LIMITED', 'ABA-M624', 'AT', '4WD', 2400, 'WAGON', NULL, NULL, 'diesel', 12869542, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  COMPASS LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  COMPASS S MODEL', 'ABA-M624', 'AT', '4WD', 2400, 'WAGON', NULL, NULL, 'petrol', 9504574, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  COMPASS S MODEL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  GRAND CHEROKEE 4XE LIMITED 4XE', '1C4RJYK64P876', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'petrol', 15916619, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  GRAND CHEROKEE 4XE LIMITED 4XE'
);