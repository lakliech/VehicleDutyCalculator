INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'CAST ACTIVA GSA III', 'DBA-LAS250S-GBGF', 'CVT', '2WD', 658, 'WAGON', '1060', '4', 'petrol', 2196498, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'CAST ACTIVA GSA III'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'CAST SPORT', 'DBA-LA250S-GBSZ', 'CVT', '2WD', 658, 'WAGON', '1070', '4', 'petrol', 2556992, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'CAST SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'CAST SPORT SPORT SA III', 'DBA-LAS25S-GBSZ', 'CVT', '2WD', 658, 'WAGON', '1070', '4', 'petrol', 2556992, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'CAST SPORT SPORT SA III'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'CAST STYLE G', '5BA-LA250S-GBVF', 'CVT', '2WD', 658, 'WAGON', '1060', '4', 'petrol', 2526811, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'CAST STYLE G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'CAST STYLE G', 'DBA-LA250S-GBVF', 'CVT', '2WD', 658, 'WAGON', '1060', '4', 'petrol', 2297101, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'CAST STYLE G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'CAST STYLE GSA III', 'DBA-LAS250S-GBVF', 'CVT', '2WD', 658, 'WAGON', '1060', '4', 'petrol', 2196498, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'CAST STYLE GSA III'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'COPEN CERO', '3BA-LA400K-KBPZ', 'CVT', '2WD', 658, 'CONVERTIBLE', '980', '2', 'petrol', 3259033, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'COPEN CERO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'COPEN CERO', 'DBA-LA400K-KBPZ', 'CVT', '2WD', 658, 'HATCHBACK', '980', '2', 'petrol', 2959404, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'COPEN CERO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'COPEN CLIQ G SA III', '3BA-LA400K-KBPZ', 'CVT', '2WD', 658, 'HATCHBACK', '980', '2', 'petrol', 3259033, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'COPEN CLIQ G SA III'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'COPEN G', '3BA-LA400K-KBPZ', 'CVT', '2WD', 658, 'CONVERTIBLE', '980', '2', 'petrol', 3166814, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'COPEN G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'COPEN GR', '3BA-LA400K-KBVZ', 'CVT', '2WD', 658, 'CONVERTIBLE', '980', '2', 'petrol', 3994273, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'COPEN GR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'COPEN GR', 'DBA-LA400K-KBVZ', 'CVT', '2WD', 658, 'CONVERTIBLE', '980', '2', 'petrol', 3627804, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'COPEN GR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'COPEN GR SPORT', '3BA-LA400K-KBVZ', 'CVT', '2WD', 658, 'CONVERTIBLE', '980', '2', 'petrol', 3994273, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'COPEN GR SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'COPEN GR SPORT', '3BA-LA400K-KBVZ', 'CVT', '2WD', 658, 'CONVERTIBLE', '980', '4', 'petrol', 3627804, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'COPEN GR SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'COPEN ROBE', '3BA-LA400K-KBPZ', 'CVT', '2WD', 658, 'CONVERTIBLE', '980', '2', 'petrol', 3166814, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'COPEN ROBE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'COPEN ROBE', '3BA-LA400K-KBPZ', 'CVT', '2WD', 658, 'CONVERTIBLE', '980', '4', 'petrol', 2875568, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'COPEN ROBE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'COPEN ROBE', 'DBA-LA400K-KBPZ', 'CVT', '2WD', 658, 'CONVERTIBLE', '980', '2', 'petrol', 2875568, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'COPEN ROBE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'COPEN STYLE SA III', '3BA-LA400K-KBPZ', 'CVT', '2WD', 658, 'CONVERTIBLE', '980', '2', 'petrol', 3166814, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'COPEN STYLE SA III'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'COPEN X L SA III', '3BA-LA400K-KBVZ', 'CVT', '2WD', 658, 'CONVERTIBLE', '980', '2', 'petrol', 3994273, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'COPEN X L SA III'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'COPEN XPLAY', '3BA-LA400K-KBPZ', 'CVT', '2WD', 658, 'CONVERTIBLE', '980', '2', 'petrol', 3166814, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'COPEN XPLAY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'COPEN XPLAY', '3BA-LA400K-KBPZ', 'CVT', '2WD', 658, 'CONVERTIBLE', '980', '4', 'petrol', 2875568, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'COPEN XPLAY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'COPEN XPLAY', 'DBA-LA400K-KBPZ', 'CVT', '2WD', 658, 'CONVERTIBLE', '980', '2', 'petrol', 2875568, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'COPEN XPLAY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'GRAN MAX', '5BF-S413V-ZQDFJD', '4AT', '4WD', 1496, 'VAN', NULL, '4', 'petrol', 3577502, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'GRAN MAX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'GRAN MAX CARGO GL', '5BF-S413V-ZQDFJD', '4AT', '4WD', 1496, 'VAN', '2160', '5', 'petrol', 3935253, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'GRAN MAX CARGO GL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'GRAN MAX GL', '5BF-S413P-TQDFJD', '4AT', '4WD', 1496, 'TRUCK', '2090', '2', 'petrol', 3569729, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'GRAN MAX GL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'GRAN MAXV GL', '5BF-S413P-TQDJD', '4AT', '4WD', 1496, 'TRUCK', '2090', '2', 'petrol', 3245209, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'GRAN MAXV GL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET CADDIE D', 'HBD-LA700V-GBDF', 'CVT', '2WD', 658, 'VAN', '1230', '2', 'petrol', 1953374, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET CADDIE D'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET CADDIE D DELUXE', 'HBD-LA700V-GBDF', 'CVT', '2WD', 658, 'VAN', '1230', '2', 'petrol', 1953374, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET CADDIE D DELUXE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET CADDLE D DELUXE', 'GBD700V-GBDF', 'CVT', '2WD', 658, 'VAN', '1230', '2', 'petrol', 1953374, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET CADDLE D DELUXE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET CARGO DECKVAN', '3BD-S331W-ZQRF', '4AT', '4WD', 658, 'VAN', '1430', '4', 'petrol', 2511721, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET CARGO DECKVAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET CARGO DECKVAN G', '3BD-S331W-ZQRF', '4AT', '4WD', 658, 'VAN', '1430', NULL, 'petrol', 2762893, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET CARGO DECKVAN G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET CARGO DECKVAN G', '3BD-S710W-ZBGF', 'CVT', '4WD', 658, 'VAN', '1430', '4', 'petrol', 2858801, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET CARGO DECKVAN G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET CARGO DECKVAN G', 'EBD-S331W-ZQRF', '4AT', '4WD', 658, 'VAN', '1430', '4', 'petrol', 2511721, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET CARGO DECKVAN G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET CARGO DECKVAN GL', 'EBD-S331W-ZQRF', '4AT', '4WD', 658, 'VAN', '250', '4', 'petrol', 2251989, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET CARGO DECKVAN GL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET CARGO DELUXE', '3BD-S321V-ZQDF', '4AT', '2WD', 658, 'VAN', '1390', '4', 'petrol', 1810853, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET CARGO DELUXE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET CARGO DELUXE', '3BD-S700V-ZBDF', 'CVT', '2WD', 658, 'VAN', '1370', '4', 'petrol', 2028827, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET CARGO DELUXE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET CARGO DELUXE', 'EBD-S321V-ZMDF', '5MT', '2WD', 658, 'VAN', '350', '2', 'petrol', 1596873, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET CARGO DELUXE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET CARGO DELUXE', 'EBD-S321V-ZQDF', '4AT', '2WD', 658, 'VAN', '1390', '4', 'petrol', 1794086, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET CARGO DELUXE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET JUMBO', 'EBD-S500P-ZQJF', '4AT', '2WD', 658, 'TRUCK', '1270', '2', 'petrol', 1936607, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET JUMBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET SLOPER', '3BD-S331V-ZQDF', '4AT', '4WD', 658, 'VAN', '1270', '5', 'petrol', 3034856, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET SLOPER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET SLOPER', '3BD-S710V-ZBDF', 'CVT', '4WD', 658, 'VAN', '1240', '4', 'petrol', 3060007, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET SLOPER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET SLOPER', 'EBD-S331V-ZQDF', '4AT', '4WD', 658, 'VAN', '1270', '4', 'petrol', 3018089, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET SLOPER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET TRUCK', '3BD-S510P-TMRF', '5MT', '4WD', 658, 'TRUCK', '1390', '2', 'petrol', 2280334, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET TRUCK', '3BD-S510P-ZQRF-ZQRF', '4AT', '4WD', 658, 'TRUCK', '1420', NULL, 'petrol', 3495115, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET TRUCK', 'EBD-S510P-ZQRF', '4AT', '4WD', 658, 'TRUCK', '1420', '2', 'petrol', 3085158, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET TRUCK ALUMINIUM MODERATE TEMP REFRIGERATING', '3BD-S510P-ZBRF', '4AT', '4WD', 658, 'TRUCK', '1470', '2', 'petrol', 3541225, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET TRUCK ALUMINIUM MODERATE TEMP REFRIGERATING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET TRUCK COLOR ALUMINIUM MODERATE REFRIGERATING TRUCK', '3BD-S510P-ZBRF', '4WD', '4AT', 658, 'TRUCK', '1470', '2', 'petrol', 3541225, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET TRUCK COLOR ALUMINIUM MODERATE REFRIGERATING TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET TRUCK Color Alumiunium Moderate Temperature refrigerating Truck', '3BD-S510P-ZQRF', '4AT', '4WD', 658, 'TRUCK', '1420', '2', 'petrol', 3177377, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET TRUCK Color Alumiunium Moderate Temperature refrigerating Truck'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET TRUCK COLOR MODERATE TEMPERATURE REFRIGERATING TRUCK', '3BD-S510P-ZBRF', '4AT', '4WD', 658, 'TRUCK', '1480', '2', 'petrol', 3541225, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET TRUCK COLOR MODERATE TEMPERATURE REFRIGERATING TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET TRUCK EXTRA', '3BD-S500P-TMNF', '5MT', '2WD', 658, 'TRUCK', '1220', '2', 'petrol', 1618031, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET TRUCK EXTRA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET TRUCK EXTRA', '3BD-S510P-TBNF', 'CVT', '4WD', 658, 'TRUCK', '1320', '2', 'petrol', 2220308, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET TRUCK EXTRA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET TRUCK EXTRA', 'EBD-S500P-TMNF', '5MT', '2WD', 658, 'TRUCK', '1220', '2', 'petrol', 1609648, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET TRUCK EXTRA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET TRUCK JUMBO', '3BD-S500P-ZMJF', '5MT', '2WD', 658, 'TRUCK', '1260', '2', 'petrol', 1794086, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET TRUCK JUMBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET TRUCK JUMBO', '3BD-S510P-ZBGF', 'CVT', '4WD', 658, 'TRUCK', '1350', '2', 'petrol', 2434592, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET TRUCK JUMBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET TRUCK JUMBO', 'EBD-S500P-ZQJF', '4AT', '2WD', 658, 'TRUCK', '1270', '2', 'petrol', 1936607, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET TRUCK JUMBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET TRUCK JUMBO EXTRA', '3BD-S510P-ZBGF', 'CVT', '4WD', 658, 'TRUCK', '1350', '2', 'petrol', 2434592, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET TRUCK JUMBO EXTRA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET TRUCK MODERATE TEMPERATURE REFRIGERATING TRUCK', 'EBD-S510P-ZQRF', '4AT', '4WD', 658, 'TRUCK', '1420', '2', 'petrol', 3085158, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET TRUCK MODERATE TEMPERATURE REFRIGERATING TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET TRUCK MULTIPURPOSE DUMP', 'EBD-S510P-TMRF', '5MT', '4WD', 658, 'TRUCK', '1470', '2', 'petrol', 2255183, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET TRUCK MULTIPURPOSE DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET TRUCK PANEL VAN', '3BD-S510P-TQRF', '4AT', '4WD', 658, 'TRUCK', '1390', '2', 'petrol', 2204882, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET TRUCK PANEL VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET TRUCK PANEL VAN', '3BD-S510P-ZBRF', 'CVT', '4WD', 658, 'TRUCK', '1430', '2', 'petrol', 2563699, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET TRUCK PANEL VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET TRUCK PANEL VAN', 'EBD-S510P-TQRF', '4AT', '4WD', 658, 'TRUCK', '1390', '2', 'petrol', 2075775, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET TRUCK PANEL VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET TRUCK PTO', '3BD-S510P-TMRF', '5MT', '4WD', 658, 'TRUCK', '1470', '2', 'petrol', 2347403, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET TRUCK PTO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET TRUCK VEHICLE TAIL', '3BDS510P-TMRF', '5MT', '4WD', 658, 'TRUCK', '1390', NULL, 'petrol', 2508367, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET TRUCK VEHICLE TAIL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET TRUCK VERTICAL LIFT', '3BD-S510P-TMRF', 'CVT', '4WD', 658, 'TRUCK', '1400', '2', 'petrol', 2748138, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET TRUCK VERTICAL LIFT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET TRUCK VERTICAL TAIL LIFT', '3BD-S510P-TMRF', '5MT', '4WD', 658, 'TRUCK', '1400', '2', 'petrol', 2748138, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET TRUCK VERTICAL TAIL LIFT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HIJET TRUCK VERTICAL TAIL LIFT', 'EBD-S510P-TMRF', '5MT', '4WD', 658, 'TRUCK', '1390', '2', 'petrol', 2179731, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HIJET TRUCK VERTICAL TAIL LIFT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'HUJET TRUCK JUMBO', '3BD-S500P-ZMJF', '5MT', '2WD', 658, 'TRUCK', '1260', NULL, 'petrol', 1973495, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'HUJET TRUCK JUMBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MEBIUS S', 'DAA-ZVW41N-BXXB(T)', 'CVT', '2WD', 1797, 'WAGON', '1735', '5', 'petrol', 4879943, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MEBIUS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MEBIUS S TOURING', '6AA-ZVW41N-BXXEB(T)', 'CVT', '2WD', 1797, 'WAGON', '1735', '5', 'petrol', 4879943, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MEBIUS S TOURING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MEBIUS STOURING SELECTION', 'DAA-ZVW41N-BXXEB (T)', 'CVT', '2WD', 1797, 'WAGON', '1735', '5', 'petrol', 4741168, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MEBIUS STOURING SELECTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MIRA', 'DBA-L275S-GMMF', 'MT', '2WD', 658, 'WAGON', '970', '4', 'petrol', 1373311, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MIRA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MIRA COCOA', 'DBA-L675S-GBXF', 'CVT', '2WD', 658, 'WAGON', '1030', '4', 'petrol', 2179731, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MIRA COCOA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MIRA E:S', '5BA-LA350S-GBPF', 'CVT', '2WD', 658, 'WAGON', '890', '4', 'petrol', 1877922, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MIRA E:S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MIRA E:S G', '5BA-LA350S-GBPF', 'CVT', '2WD', 658, 'WAGON', '890', '4', 'petrol', 1877922, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MIRA E:S G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MIRA G', '5BA-LA350S-GBPF', 'CVT', '2WD', 658, 'WAGON', '890', '4', 'petrol', 1877922, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MIRA G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MIRA TOCOT G', '5BA-LA550S-GBVF', 'CVT', '2WD', 658, 'WAGON', '940', '4', 'petrol', 2012059, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MIRA TOCOT G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MIRA TOCOT G', '5BA-LA650S-GBVF', 'CVT', '2WD', 658, 'WAGON', '940', '4', 'petrol', 2102602, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MIRA TOCOT G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MIRA TOCOT G', 'DBA-LA550S-GBVF', 'CVT', '2WD', 658, 'WAGON', '940', '4', 'petrol', 2012059, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MIRA TOCOT G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MIRA VAN TX', 'HBD-L275V-FBRF', 'CVT', '2WD', 658, 'VAN', '200', '2', 'petrol', 1253545, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MIRA VAN TX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MOVE CANBUS', '3BA-LA800S-GBVF', 'CVT', '2WD', 658, 'VAN', '1140', '4', 'petrol', 2655918, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MOVE CANBUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MOVE CANBUS G', '5BA-LA800S-GBVF', 'CVT', '2WD', 658, 'VAN', '1140', '4', 'petrol', 2414471, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MOVE CANBUS G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MOVE CANBUS GMAKE SA III', 'DBA-LAS8000S-GBVF', 'CVT', '2WD', 658, 'VAN', '1140', '4', 'petrol', 2397704, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MOVE CANBUS GMAKE SA III'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MOVE CANBUS STRIPES G', '5BA-LA850S-GBPF', 'CVT', '2WD', 658, 'VAN', '1100', '4', 'petrol', 2803469, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MOVE CANBUS STRIPES G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MOVE CANBUS THEORY G', '5BA-LA850S-GBPZ', 'CVT', '2WD', 658, 'VAN', '1120', '4', 'petrol', 3006352, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MOVE CANBUS THEORY G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MOVE CANBUSV G', '5BA-LA800S-GBVF', 'CVT', '2WD', 658, 'VAN', '1140', '4', 'petrol', 2414471, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MOVE CANBUSV G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MOVE CUSTOM RS', '3BA-LA150S-GBVZ', 'CVT', '2WD', 658, 'VAN', '1070', '4', 'petrol', 2523458, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MOVE CUSTOM RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MOVE CUSTOM RS', 'DBA-LA150S-GBVZ', 'CVT', '2WD', 658, 'VAN', '1070', '4', 'petrol', 2523458, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MOVE CUSTOM RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MOVE CUSTOM RSHYPER SA II', 'DBA-LA150S-GBVZ', 'CVT', '2WD', 658, 'VAN', '1070', '4', 'petrol', 2523458, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MOVE CUSTOM RSHYPER SA II'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MOVE CUSTOM X', '5BA-LA150S-GBVF', 'CVT', '2WD', 658, 'VAN', '1100', '4', 'petrol', 2538548, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MOVE CUSTOM X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MOVE CUSTOM X', 'DBA-LA150S-GBVF', 'CVT', '2WD', 658, 'VAN', '1100', '4', 'petrol', 2689453, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MOVE CUSTOM X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MOVE CUSTOM XLIMITED SA III', 'DBA-LA150S-GBVF', 'CVT', '2WD', 658, 'VAN', '1100', '4', 'petrol', 2959404, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MOVE CUSTOM XLIMITED SA III'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MOVE CUSTOMSA III', '5BA-LA150S-GBVF', 'CVT', '2WD', 658, 'VAN', '1100', '4', 'petrol', 2538548, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MOVE CUSTOMSA III'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MOVE L', '5BA-LA150S-GBMF', 'CVT', '2WD', 658, 'VAN', '1090', '4', 'petrol', 2203205, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MOVE L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MOVE L', 'DBA-LA150S-GBMF', 'CVT', '2WD', 658, 'VAN', '1090', '4', 'petrol', 2203205, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MOVE L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MOVE L SA III', '5BA-LA650-GBMF', 'CVT', '2WD', 658, 'VAN', '1090', '4', 'petrol', 2206559, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MOVE L SA III'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MOVE LSA III', 'DBA-LA150S-GBMF', 'CVT', '2WD', 658, 'VAN', '1090', '4', 'petrol', 2196498, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MOVE LSA III'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MOVE RS', '3BA-LA150S-GBVZ', 'CVT', '2WD', 658, 'VAN', '1070', '4', 'petrol', 2775804, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MOVE RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MOVE X', '5BA-LA50S-GBGF', 'CVT', '2WD', 658, 'VAN', '1040', '4', 'petrol', 1978525, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MOVE X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MOVE X', 'DBA-LA150S-GBGF', 'CVT', '2WD', 658, 'VAN', '1040', '4', 'petrol', 1978525, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MOVE X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'MOVE xSA II', 'DBA-LA150S-GBGF', 'CVT', '2WD', 658, 'VAN', '1040', '4', 'petrol', 1978525, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'MOVE xSA II'
);