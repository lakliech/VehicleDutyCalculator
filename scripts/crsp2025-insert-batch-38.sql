INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV200 VANETTE 16X-2R', '3BA-M20', 'CVT', '2WD', 1597, 'VAN', '1625', '5', 'petrol', 4073023, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV200 VANETTE 16X-2R'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV200 VANETTE 16X-2R', 'DBA-M20', '4AT', '4WD', 1597, 'VAN', '1585', '5', 'petrol', 3133363, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV200 VANETTE 16X-2R'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV200 VANETTE 16X-2R', 'DBA-M20', 'CVT', '2WD', 1597, 'VAN', '1585', '5', 'petrol', 3008029, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV200 VANETTE 16X-2R'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV200 VANETTE CHAIR CAB 2-WHEELCHAIR', '5BF-VM20', 'CVT', '2WD', 1597, 'VAN', '1800', '6', 'petrol', 5044121, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV200 VANETTE CHAIR CAB 2-WHEELCHAIR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV200 VANETTE FREEZING VAN', '5BF-VM20', 'CVT', '2WD', 1597, 'VAN', '2065', '2', 'petrol', 5083594, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV200 VANETTE FREEZING VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV200 VANETTE GX', '5BF-VM20', 'CVT', '2WD', 1597, 'VAN', '2080', '5', 'petrol', 4436137, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV200 VANETTE GX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV200 VANETTE GX', '3BF-VNM20', 'E-AT', '4WD', 1597, 'VAN', '2180', '5', 'petrol', 5829034, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV200 VANETTE GX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV200 VANETTE MULTIBED VAN', '3BF-VNM20', 'E-AT', '2WD', 1597, 'VAN', '2180', '5', 'petrol', 5585037, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV200 VANETTE MULTIBED VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV200 VANETTE ROUTE VAN', '5BF-VM20', 'CVT', '2WD', 1597, 'VAN', '2020', '2', 'petrol', 3971198, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV200 VANETTE ROUTE VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV200 VANETTE VAN GX', 'DBF-VM20', '5MT', '2WD', 1597, 'VAN', '1970', '5', 'petrol', 3163055, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV200 VANETTE VAN GX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV200 VANETTE VAN GX', '5BF-VM20', 'CVT', '2WD', 1597, 'VAN', '650', '5', 'petrol', 4251698, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV200 VANETTE VAN GX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV200 VANETTE VAN WITH LIFTER', '5BF-VM20', 'CVT', '2WD', 1597, 'VAN', '2065', '2', 'petrol', 5025957, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV200 VANETTE VAN WITH LIFTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV200 VANETTE VX', '5BF-VM20', 'CVT', '2WD', 1597, 'VAN', '2020', '2', 'petrol', 4146030, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV200 VANETTE VX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV350 CARAVAN', 'CBF-DS4E26', 'CVT', '2WD', 2488, 'VAN', '2620', '5', 'petrol', 5434237, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV350 CARAVAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV350 CARAVAN', 'CBF-CS4E26', '5AT', '2WD', 2488, 'VAN', '2790', '10', 'petrol', 6165285, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV350 CARAVAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV350 CARAVAN', 'CBA-KS26', '5AT', '2WD', 2488, 'VAN', '2450', '10', 'petrol', 4637168, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV350 CARAVAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV350 CARAVAN', 'CBF-DS8E26', 'cVT', '2WD', 2488, 'VAN', '2790', '10', 'petrol', 6422172, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV350 CARAVAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV350 CARAVAN', 'CBF-CS4E26', '5AT', '2WD', 2488, 'VAN', '2790', '14', 'petrol', 6165285, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV350 CARAVAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV350 CARAVAN DX', 'CBF-VR2E26', '5E-AT', '2WD', 1998, 'VAN', '3125', '3', 'petrol', 3585727, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV350 CARAVAN DX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV350 CARAVAN DX', 'CBF-VR2E26', '5AT', '2WD', 1998, 'VAN', '1250', '3', 'petrol', 3585727, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV350 CARAVAN DX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV350 CARAVAN DX', 'CBF-CS2E26', '5AT', '2WD', 2488, 'VAN', '3155(3085)', '5', 'petrol', 4198777, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV350 CARAVAN DX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV350 CARAVAN DX', 'CBF-CS4E26', '5E-AT', '2WD', 2488, 'VAN', '3155', '9', 'petrol', 4030826, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV350 CARAVAN DX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV350 CARAVAN GX', 'CBF-VR2E26', '5E-AT', '2WD', 1998, 'VAN', '2920', '5', 'petrol', 4705285, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV350 CARAVAN GX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV350 CARAVAN GX', 'CBF-VR2E26', '5AT', '2WD', 1998, 'VAN', '2920(2925) (2935)', '5', 'petrol', 4705285, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV350 CARAVAN GX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV350 CARAVAN PREMIUM GX', 'CBF-VR2E26', '5E-AT', '2WD', 1998, 'VAN', '2920', '5', 'petrol', 4705285, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV350 CARAVAN PREMIUM GX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NV350 CARAVAN WAGON WIDE BODY', 'CBF-DS8E26', '5AT', '2WD', 2488, 'VAN', '2730', '10', 'petrol', 6154946, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NV350 CARAVAN WAGON WIDE BODY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'ROOX', '44A-B45A', 'CVT', '2WD', 659, 'MINIVAN', '1220', '7', 'petrol', 3240589, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'ROOX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'ROOX G', '44A-B45A', 'CVT', '2WD', 659, 'MINIVAN', '1220', '4', 'petrol', 3283010, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'ROOX G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'ROOX HIGHWAY STAR G TURBO PROPILOT EDTIONS', '4AA-B45A', 'CVT', '4WD', 659, 'MINIVAN', '1230', '4', 'petrol', 3631600, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'ROOX HIGHWAY STAR G TURBO PROPILOT EDTIONS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'ROOX HUGHWAY STAR G TURBO', '44A-B45A', 'CVT', '2WD', 659, 'MINIVAN', '1230', '5', 'petrol', 2945990, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'ROOX HUGHWAY STAR G TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'ROOX HUGHWAY STAR X', 'DAA-B44A', 'CVT', '2WD', 659, 'MINIVAN', '1230', '7', 'petrol', 6239061, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'ROOX HUGHWAY STAR X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'ROOX X', '5AA-B44A', 'CVT', '2WD', 659, 'MINIVAN', '1230', '7', 'petrol', 3472479, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'ROOX X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'ROOX X SLIDE-UP SEAT', '5AA-B44A', 'CVT', '2WD', 659, 'MINIVAN', '1210', '4', 'petrol', 3375230, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'ROOX X SLIDE-UP SEAT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'SAKURA G', 'ZAA-B6AW', 'CVT', '4WD', NULL, 'MINIVAN', '1330', '4', 'electric', 4737310, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'SAKURA G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'SAKURA G', 'ZAA-B6AW', 'CVT', '2WD', NULL, 'MINIVAN', '1330', '4', 'electric', 3687392, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'SAKURA G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'SERENA CHAIR CAB', '6AA-GFC28', 'CVT', '2WD', 1433, 'MINIVAN', '2295', '7', 'petrol', 6948312, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'SERENA CHAIR CAB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'SERENA E-POWER', 'DAA-HFC27', 'CVT', '2WD', 1198, 'MINIVAN', '2145', '7', 'petrol', 5285009, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'SERENA E-POWER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'SERENA E-POWER', '6AA-HFC27', 'CVT', '2WD', 1198, 'MINIVAN', '2165', '7', 'petrol', 6007171, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'SERENA E-POWER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'SERENA E-POWER HIGHWAY STAR CHAIR CAB', 'DAA-HFC27', 'CVT', '2WD', 1198, 'MINIVAN', '2205', '7', 'petrol', 6336311, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'SERENA E-POWER HIGHWAY STAR CHAIR CAB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'SERENA E-POWER HIGHWAY STAR V', 'DAA-HFC27', 'CVT', '2WD', 1198, 'MINIVAN', '2145', '5', 'petrol', 5333634, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'SERENA E-POWER HIGHWAY STAR V'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'SERENA E-POWER HIGHWAY STAR V', '6AA-HFC27', 'CVT', '2WD', 1198, 'MINIVAN', '2205', '7', 'petrol', 6621185, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'SERENA E-POWER HIGHWAY STAR V'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'SERENA E-POWER HIGHWAY STAR V SECOND SLIDE-UP SEAT', '6AA-GFC28', 'CVT', '2WD', 1433, 'MINIVAN', '2235', '7', 'petrol', 6490568, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'SERENA E-POWER HIGHWAY STAR V SECOND SLIDE-UP SEAT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'SERENA E-POWER HIGHWAY STAR V STEP TYPE', 'DAA-HFC27', 'CVT', '2WD', 1198, 'MINIVAN', '2185', '7', 'petrol', 6313340, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'SERENA E-POWER HIGHWAY STAR V STEP TYPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'SERENA E-POWER LUXION', '6AA-GFC28', 'CVT', '4WD', 1433, 'MINIVAN', '2235', '7', 'petrol', 8045220, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'SERENA E-POWER LUXION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'SERENA E-POWER LUXION', '6AA-GFC28', 'CVT', '2WD', 1433, 'MINIVAN', '2235', '7', 'petrol', 8128217, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'SERENA E-POWER LUXION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'SERENA E-POWER STAR V', '6AA-GFC28', 'CVT', '2WD', 1433, 'MINIVAN', '2235', '7', 'petrol', 6713572, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'SERENA E-POWER STAR V'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'SERENA HIGHWAY STAR', 'DAA-GF C27', 'CVT', '2WD', 1997, 'MINIVAN', '2090', '8', 'petrol', 4331517, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'SERENA HIGHWAY STAR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'SERENA HIGHWAY STAR V', 'DAA-GF C27', 'CVT', '2WD', 1997, 'MINIVAN', '2160', '8', 'petrol', 5093025, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'SERENA HIGHWAY STAR V'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'SERENA MULTIBED', '5BA-FC28', 'CVT', '4WD', 1997, 'MINIVAN', '1955', '5', 'petrol', 6707039, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'SERENA MULTIBED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'SERENA V', '5BA-FC28', 'CVT', '2WD', 1997, 'MINIVAN', '1935', '5', 'petrol', 6532207, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'SERENA V'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'SKYLINE 350GT HYBRID TYPE SP', 'DAA-HV37', '7M-AT', '2WD', 3498, 'SEDAN', '2085', '5', 'petrol', 8631735, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'SKYLINE 350GT HYBRID TYPE SP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'SKYLINE 400R', '5BA-RV37', '7M-AT', '4WD', 2997, 'SEDAN', '2035', '5', 'petrol', 10303596, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'SKYLINE 400R'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'SKYLINE 400R', '5BA-RV37', '7M-AT', '2WD', 2997, 'SEDAN', '2035', '5', 'petrol', 9825208, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'SKYLINE 400R'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'SKYLINE GT TYPE SP (HYBRID)', '5AA-HV37', '7MT-AT', '2WD', 3498, 'SEDAN', '2115', '7', 'petrol', 10328572, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'SKYLINE GT TYPE SP (HYBRID)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'SKYLINE NISMO', '5BA-RV37', '7MT', '4WD', 2997, 'SEDAN', '2015', '5', 'petrol', 14793527, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'SKYLINE NISMO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'SYLPHY G', 'DBA-TB17', 'CVT', '2WD', 1798, 'SEDAN', '1515', '5', 'petrol', 3975215, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'SYLPHY G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'SYLPHY X PASSENGER''S SWIVEL SEAT (2WD)', 'DBA-TB17', 'CVT', '2WD', 1798, 'SEDAN', '1525', '5', 'petrol', 3641618, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'SYLPHY X PASSENGER''S SWIVEL SEAT (2WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'TEANA XV NAVI AVM PACKAGE', 'DBA-L33', 'CVT', '2WD', 2488, 'SEDAN', '1755', '5', 'petrol', 5681623, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'TEANA XV NAVI AVM PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'TEANA XV NAVI AVM PACKAGE', 'DBA-L33', 'CVT', '2WD', 2498, 'SEDAN', '1755', '5', 'petrol', 5681623, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'TEANA XV NAVI AVM PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'VANETTE 16X-2R', '3BA-M20', 'CVT', '4WD', 1597, 'MINIVAN', '1625', '5', 'petrol', 4073023, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'VANETTE 16X-2R'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'WINGROAD 15M', 'DBA-Y12', 'CVT', '2WD', 1498, 'WAGON', '1495', '5', 'petrol', 3135459, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'WINGROAD 15M'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'X-TRAIL 20X', 'DBA-NT32', 'CVT', '4WD', 1997, 'SUV', '1815', '5', 'petrol', 4455524, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'X-TRAIL 20X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'X-TRAIL 20X HYBRID', 'DAA-HNT32', 'CVT', '4WD', 1997, 'SUV', '1915', '5', 'petrol', 5010936, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'X-TRAIL 20X HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'X-TRAIL 20XI', 'DBA-NT32', 'CVT', '4WD', 1997, 'SUV', '1815', '5', 'petrol', 5082546, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'X-TRAIL 20XI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'X-TRAIL 20XI', '5BA-NT32', 'CVT', '4WD', 1997, 'SUV', '1845', '5', 'petrol', 5459388, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'X-TRAIL 20XI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'X-TRAIL 20XI HYBRID', 'DAA-NT32', '6AMT', '4WD', 1997, 'SUV', '1915', '5', 'petrol', 5341040, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'X-TRAIL 20XI HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'X-TRAIL 20XI HYBRID', 'DBA-HNT32', 'CVT', '4WD', 1997, 'SUV', '1915', '5', 'petrol', 5088834, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'X-TRAIL 20XI HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'X-TRAIL 20XI X-TREAMER X', 'DBA-NT32', 'CVT', '4WD', 1997, 'SUV', '1875', '5', 'petrol', 5452681, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'X-TRAIL 20XI X-TREAMER X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'X-TRAIL 20XI X-TREMER X', 'DBA-NT32', 'CVT', '4WD', 1997, 'SUV', '1875', '5', 'petrol', 6184638, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'X-TRAIL 20XI X-TREMER X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'X-TRAIL SLIDE UP SEAT 20X X-TREMER X (4WD 2ROW)', 'DBA-NT32', 'CVT', '2WD', 1997, 'SUV', '1875', '5', 'petrol', 5267683, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'X-TRAIL SLIDE UP SEAT 20X X-TREMER X (4WD 2ROW)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'X-TRAIL X E-4ORCE', '6AA-SNT33', 'CVT', '4WD', 1497, 'SUV', '2125', '5', 'petrol', 6370516, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'X-TRAIL X E-4ORCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NAVARA SL', NULL, '6AT', '2WD', 2300, 'SINGLE CAB', NULL, '5', 'diesel', 5268509, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NAVARA SL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NAVARA SL', NULL, '7AT', '2WD', 2300, 'DUAL CAB', NULL, '4', 'diesel', 5361593, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NAVARA SL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NAVARA ST', NULL, '7AT', '2WD', 2300, 'DUAL CAB', NULL, '4', 'diesel', 6076472, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NAVARA ST'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NAVARA ST-X  CLOTH/NO SUNROOF', NULL, '7AT', '2WD', 2300, 'DUAL CAB', NULL, '4', 'diesel', 6582844, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NAVARA ST-X  CLOTH/NO SUNROOF'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NAVARA ST', NULL, '6AT', '4WD', 2300, 'DUAL CAB', NULL, '4', 'diesel', 6731777, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NAVARA ST'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NAVARA ST-X  LEATHER/NO SUNROOF', NULL, '7AT', '2WD', 2300, 'DUAL CAB', NULL, '4', 'diesel', 6761564, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NAVARA ST-X  LEATHER/NO SUNROOF'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NAVARA ST-X  LEATHER/SUNROOF', NULL, '7AT', '2WD', 2300, 'DUAL CAB', NULL, '4', 'diesel', 6895604, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NAVARA ST-X  LEATHER/SUNROOF'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NAVARA PRO-4X', NULL, '6AT', '4WD', 2300, 'DUAL CAB', NULL, '4', 'diesel', 7163683, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NAVARA PRO-4X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NAVARA ST-X  CLOTH/NO SUNROOF', NULL, '6AT', '4WD', 2300, 'DUAL CAB', NULL, '4', 'diesel', 7178577, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NAVARA ST-X  CLOTH/NO SUNROOF'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NAVARA PRO-4X', NULL, '7AT', '4WD', 2300, 'DUAL CAB', NULL, '4', 'diesel', 7223257, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NAVARA PRO-4X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NAVARA SL WARRIOR', NULL, '6AT', '4WD', 2300, 'DUAL CAB', NULL, '4', 'diesel', 7536016, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NAVARA SL WARRIOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NAVARA BLACK EDITION', NULL, '7AT', '4WD', 2300, 'DUAL CAB', NULL, '4', 'diesel', 7789202, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NAVARA BLACK EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NAVARA ST-X  LEATHER/SUNROOF', NULL, '7AT', '4WD', 2300, 'DUAL CAB', NULL, '4', 'diesel', 7818989, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NAVARA ST-X  LEATHER/SUNROOF'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NAVARA BLACK EDITION HSP', NULL, '7AT', '4WD', 2300, 'DUAL CAB', NULL, '4', 'diesel', 7848776, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NAVARA BLACK EDITION HSP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NAVARA SL WARRIOR', NULL, '7AT', '4WD', 2300, 'DUAL CAB', NULL, '4', 'diesel', 7848776, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NAVARA SL WARRIOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NAVARA PRO-4X WARRIOR', NULL, '6AT', '4WD', 2300, 'DUAL CAB', NULL, '4', 'diesel', 8265788, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NAVARA PRO-4X WARRIOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN', 'NAVARA PRO-4X WARRIOR', NULL, '7AT', '4WD', 2300, 'DUAL CAB', NULL, '4', 'diesel', 8593441, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN' AND model = 'NAVARA PRO-4X WARRIOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN DIESEL/UD', 'TRUCKS KAZET', 'FBA2Y-58', 'AT', '2WD', 3000, 'TRK', NULL, NULL, 'diesel', 7709834, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN DIESEL/UD' AND model = 'TRUCKS KAZET'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN DIESEL/UD', 'TRUCKS CONDOR', 'BRR90-700', 'MT', '2WD', 5200, 'TRK', NULL, NULL, 'diesel', 12549773, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN DIESEL/UD' AND model = 'TRUCKS CONDOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN DIESEL/UD', 'TRUCKS QUON', 'JNCMCG0D9PU07', 'MT', '2WD', 9900, 'TRK', NULL, NULL, 'diesel', 30650868, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN DIESEL/UD' AND model = 'TRUCKS QUON'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN DIESEL/UD', 'TRUCKS QUON', 'JNCMB02G3JU02', 'AT', '2WD', 10800, 'TRK', NULL, NULL, 'diesel', 18051581, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN DIESEL/UD' AND model = 'TRUCKS QUON'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN DIESEL/UD', 'TRUCKS QUON BASEGRADE', 'JNCMC90D6RU08', 'AT', '2WD', 12770, 'TRK', NULL, NULL, 'diesel', 49709432, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN DIESEL/UD' AND model = 'TRUCKS QUON BASEGRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'NISSAN DIESEL/UD', 'TRUCKS QUON', 'JNCMC10GXSU10', 'AT', '2WD', 9900, 'TRK', NULL, NULL, 'diesel', 26553914, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'NISSAN DIESEL/UD' AND model = 'TRUCKS QUON'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'OPEL', 'ASTRA 1.4', NULL, '6MT', '2WD', 1400, 'HATCHBACK', NULL, NULL, 'petrol', 3321158, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'OPEL' AND model = 'ASTRA 1.4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'OPEL', 'ASTRA 1.4 SPORTS TOURER', NULL, '6AT', '4WD', 1400, 'WAGON', NULL, NULL, 'petrol', 3840089, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'OPEL' AND model = 'ASTRA 1.4 SPORTS TOURER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'OPEL', 'ASTRA 1.6 SELECT', NULL, '6MT', '2WD', 1600, 'HATCHBACK', NULL, NULL, 'petrol', 4415631, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'OPEL' AND model = 'ASTRA 1.6 SELECT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'OPEL', 'ASTRA 1.6 SELECT SPORTS TOURER', NULL, '6AT', '4WD', 1600, 'WAGON', NULL, NULL, 'petrol', 4585463, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'OPEL' AND model = 'ASTRA 1.6 SELECT SPORTS TOURER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'OPEL', 'ASTRA 1.6 SPORTS', NULL, '6AT', '2WD', 1600, 'HATCHBACK', NULL, NULL, 'petrol', 3736303, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'OPEL' AND model = 'ASTRA 1.6 SPORTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'OPEL', 'ASTRA CDTI', NULL, '6MT', '2WD', 2000, 'HATCHBACK', NULL, NULL, 'diesel', 4245799, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'OPEL' AND model = 'ASTRA CDTI'
);