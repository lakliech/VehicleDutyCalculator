INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'PICANTO', 'SPORT (PE2)', 'Auto', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 2814290, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'PICANTO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'RIO', 'GT-LINE', 'Auto', '2WD', 1000, 'HATCHBACK', NULL, NULL, 'petrol', 4271552, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'RIO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'RIO', 'S', 'Auto', '2WD', 1400, 'HATCHBACK', NULL, NULL, 'petrol', 3514036, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'RIO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'RIO', 'S', 'MANUAL', '2WD', 1400, 'HATCHBACK', NULL, NULL, 'petrol', 3177362, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'RIO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'RIO', 'SPORT', 'Auto', '2WD', 1400, 'HATCHBACK', NULL, NULL, 'petrol', 3829668, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'RIO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'RIO', 'SPORT', 'MANUAL', '2WD', 1400, 'HATCHBACK', NULL, NULL, 'petrol', 3450910, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'RIO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SELTOS', 'GT-LINE (AWD) (SUNROOF)', 'Auto', 'AWD', 1600, 'SUV', NULL, NULL, 'petrol', 6958442, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SELTOS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SELTOS', 'GT-LINE (AWD) (TWO-TONE)', 'Auto', 'AWD', 1600, 'SUV', NULL, NULL, 'petrol', 6958442, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SELTOS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SELTOS', 'SPORT+ (AWD)', 'Auto', '2WD', 2000, 'SUV', NULL, NULL, 'petrol', 6101453, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SELTOS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SELTOS', 'GT-LINE (FWD) (SUNROOF)', 'Auto', '2WD', 2000, 'SUV', NULL, NULL, 'petrol', 6435066, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SELTOS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SELTOS', 'GT-LINE (FWD) (TWO-TONE)', 'Auto', '2WD', 2000, 'SUV', NULL, NULL, 'petrol', 6435066, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SELTOS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SELTOS', 'S (FWD)', 'Auto', '2WD', 2000, 'SUV', NULL, NULL, 'petrol', 4598662, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SELTOS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SELTOS', 'SPORT (FWD)', 'Auto', '2WD', 2000, 'SUV', NULL, NULL, 'petrol', 5088370, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SELTOS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SELTOS', 'SPORT+ (FWD)', 'Auto', '2WD', 2000, 'SUV', NULL, NULL, 'petrol', 5562774, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SELTOS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SORENTO', 'GT-LINE 7 SEAT PHEV AWD', 'Auto', 'AWD', 1600, 'SUV', NULL, NULL, 'petrol', 12955832, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SORENTO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SORENTO', 'GT-LINE HEV AWD', 'Auto', '4wd', 1600, 'SUV', NULL, NULL, 'petrol', 11221960, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SORENTO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SORENTO', 'GT-LINE HEV FWD', 'Auto', '2WD', 1600, 'SUV', NULL, NULL, 'petrol', 10762859, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SORENTO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SORENTO', 'GT-LINE 7 SEAT', 'Auto', '2WD', 2200, 'SUV', NULL, NULL, 'diesel', 10527187, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SORENTO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SORENTO', 'S 7 SEAT', 'Auto', '2WD', 2200, 'SUV', NULL, NULL, 'diesel', 8245455, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SORENTO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SORENTO', 'SPORT 7 SEAT', 'Auto', '2WD', 2200, 'SUV', NULL, NULL, 'diesel', 8646403, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SORENTO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SORENTO', 'SPORT+ 7 SEAT', 'Auto', '2WD', 2200, 'SUV', NULL, NULL, 'diesel', 9400859, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SORENTO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SORENTO', 'GT-LINE 7 SEAT', 'Auto', '4WD', 3500, 'SUV', NULL, NULL, 'petrol', 10873533, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SORENTO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SORENTO', 'S 7 SEAT', 'Auto', '4WD', 3500, 'SUV', NULL, NULL, 'petrol', 8409262, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SORENTO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SORENTO', 'SPORT 7 SEAT', 'Auto', '4WD', 3500, 'SUV', NULL, NULL, 'petrol', 8842286, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SORENTO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SORENTO', 'SPORT+ 7 SEAT', 'Auto', '4WD', 3500, 'SUV', NULL, NULL, 'petrol', 9657098, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SORENTO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SOUL', 'SI', 'Auto', '2WD', 2000, 'HATCHBACK', NULL, NULL, 'petrol', 2424053, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SOUL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SPORTAGE', 'GT-LINE HEV (FWD)', 'Auto', '2WD', 1600, 'SUV', NULL, NULL, 'petrol/electric', 8481127, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SPORTAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SPORTAGE', 'SX HEV (FWD)', 'Auto', '2WD', 1600, 'SUV', NULL, NULL, 'petrol/electric', 7031897, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SPORTAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SPORTAGE', 'GT-LINE (AWD)', 'Auto', '2WD', 1600, 'SUV', NULL, NULL, 'petrol', 7639442, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SPORTAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SPORTAGE', 'SX+ (AWD)', 'Auto', '2WD', 1600, 'SUV', NULL, NULL, 'petrol', 6741134, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SPORTAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SPORTAGE', 'S (FWD)', 'Auto', '2WD', 2000, 'SUV', NULL, NULL, 'petrol', 5355413, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SPORTAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SPORTAGE', 'S (FWD)', 'Auto', '2WD', 2000, 'SUV', NULL, NULL, 'petrol', 5587943, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SPORTAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SPORTAGE', 'SX (FWD)', 'Auto', '2WD', 2000, 'SUV', NULL, NULL, 'petrol', 6359365, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SPORTAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SPORTAGE', 'SX+ (FWD)', 'Auto', '2WD', 2000, 'SUV', NULL, NULL, 'petrol', 7121473, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SPORTAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SPORTAGE', 'SX (FWD)', 'MANUAL', '2WD', 2000, 'SUV', NULL, NULL, 'petrol', 6020651, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SPORTAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SPORTAGE', 'GT-LINE (AWD)', 'Auto', '2WD', 2000, 'SUV', NULL, NULL, 'diesel', 8962386, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SPORTAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SPORTAGE', 'S (AWD)', 'Auto', '4WD', 2000, 'SUV', NULL, NULL, 'diesel', 6841187, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SPORTAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SPORTAGE', 'SX (AWD)', 'Auto', '4WD', 2000, 'SUV', NULL, NULL, 'diesel', 7273895, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SPORTAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'SPORTAGE', 'SX+ (AWD)', 'Auto', '4WD', 2000, 'SUV', NULL, NULL, 'diesel', 8036003, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'SPORTAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'STINGER', '2.0 GT-LINE', 'Auto', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 11759745, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'STINGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'STINGER', '2.0 GT-LINE (RED LEATHER)', 'Auto', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 11759745, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'STINGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'STINGER', '200S', 'Auto', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 10246115, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'STINGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'STINGER', '3.3 GT (RED LEATHER)', 'Auto', '2WD', 3300, 'SEDAN', NULL, NULL, 'petrol', 13017224, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'STINGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'STINGER', '330S', 'Auto', '2WD', 3300, 'SEDAN', NULL, NULL, 'petrol', 10991287, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'STINGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'STONIC', 'GT-LINE', 'Auto', '2WD', 1000, 'SUV', NULL, NULL, 'petrol', 4332837, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'STONIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'STONIC', 'S', 'Auto', '2WD', 1000, 'SUV', NULL, NULL, 'petrol', 3476566, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'STONIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'STONIC', 'SPORT', 'Auto', '2WD', 1000, 'SUV', NULL, NULL, 'petrol', 3900636, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'STONIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  3 DOOR  300PS', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 14624976, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  3 DOOR  300PS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  3 DOOR  300PS S', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 17633718, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  3 DOOR  300PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  3 DOOR 300PS X-DYNAMIC SE', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 19551498, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  3 DOOR 300PS X-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  5 DOOR  300PS X-DYNAMIC HSE', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 20759317, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  5 DOOR  300PS X-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  5 DOOR 300PS', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 15915872, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  5 DOOR 300PS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  AWD 3 DOOR 300PS X-DYNAMIC S', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 16812378, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  AWD 3 DOOR 300PS X-DYNAMIC S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  MHEV 3 DOOR 400PS S', NULL, 'AUT', 'MHEV', 1997, 'S/WAGON', NULL, '5', 'petrol', 17851911, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  MHEV 3 DOOR 400PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  PHEV  5 DOOR 404PS X-DYNAMIC HSE', NULL, 'AUT', 'PHEV', 1997, 'S/WAGON', NULL, '5', 'petrol', 23389798, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  PHEV  5 DOOR 404PS X-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  PHEV 5 DOOR  404PS S', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 20347277, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  PHEV 5 DOOR  404PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  PHEV 5 DOOR  404PS X-DYNAMIC S', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 21092235, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  PHEV 5 DOOR  404PS X-DYNAMIC S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  PHEV 5 DOOR 404PS S', NULL, 'AUT', 'PHEV', 1997, 'S/WAGON', NULL, '5', 'petrol', 20124215, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  PHEV 5 DOOR 404PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C  PHEV 5 DOOR 404PS X-DYNAMIC SE', NULL, 'AUT', 'PHEV', 1997, 'S/WAGON', NULL, '5', 'petrol', 21618088, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C  PHEV 5 DOOR 404PS X-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C 3 DOOR  300PS X-DYNAMIC HSE', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 19467812, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C 3 DOOR  300PS X-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C 3 DOOR 300PS S', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 15849227, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C 3 DOOR 300PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C 3 DOOR 300PS X-DYNAMIC SE', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 17696407, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C 3 DOOR 300PS X-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C 5 DOOR 300PS X-DYNAMIC SE', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 18987607, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C 5 DOOR 300PS X-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER  T/C3 DOOR  300PS X-DYNAMIC HSE', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 19792819, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER  T/C3 DOOR  300PS X-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C  5 DOOR  300PS S', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 17140427, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C  5 DOOR  300PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C  5 DOOR 300PS X-DYNAMIC SE', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 18960523, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C  5 DOOR 300PS X-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C  AWD 5 DOOR  300PS S', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 16913714, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C  AWD 5 DOOR  300PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C  PHEV 5 DOOR  404PS X', NULL, 'AUT', 'PHEV', 1997, 'S/WAGON', NULL, '5', 'petrol', 26265555, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C  PHEV 5 DOOR  404PS X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C  PHEV 5 DOOR 404PS X-DYNAMIC HSE', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 23792099, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C  PHEV 5 DOOR 404PS X-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C  PHEV 5 DOOR 404PS X-DYNAMIC SE', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 22137854, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C  PHEV 5 DOOR 404PS X-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C 5 DOOR 300PS S', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 18465710, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C 5 DOOR 300PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C 5 DOOR 300PS X-DYNAMIC HSE', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 20614768, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C 5 DOOR 300PS X-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C 5 DOOR 300PS X-DYNAMIC S', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 17658672, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C 5 DOOR 300PS X-DYNAMIC S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DEFENDER T/C PHEV 5 DOOR  404PS X', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 27024207, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DEFENDER T/C PHEV 5 DOOR  404PS X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT  5 DOOR 250PS URBAN EDITION', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 12999945, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT  5 DOOR 250PS URBAN EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT  T/C 249PS  5 DOOR  R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 15388117, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT  T/C 249PS  5 DOOR  R-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT  T/C 249PS  5 DOOR  S', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 12277506, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT  T/C 249PS  5 DOOR  S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT  T/C 249PS  5 DOOR R-DYNAMIC SE', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 13689214, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT  T/C 249PS  5 DOOR R-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT  T/C 249PS 5 DOOR  R-DYNAMIC S', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 12722107, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT  T/C 249PS 5 DOOR  R-DYNAMIC S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT  T/C 249PS 5 DOOR R-DYNAMIC SE', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 13750174, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT  T/C 249PS 5 DOOR R-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT  T/C 5 DOOR 249PS', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 11547852, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT  T/C 5 DOOR 249PS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT 249PS 5 DOOR  R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 16247573, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT 249PS 5 DOOR  R-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT T/C  5 DOOR 250PS URBAN EDITION', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 12411404, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT T/C  5 DOOR 250PS URBAN EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT T/C 249PS 5 DOOR  R-DYNAMIC SE', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 14921681, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT T/C 249PS 5 DOOR  R-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT T/C 249PS 5 DOOR  S', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 12993250, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT T/C 249PS 5 DOOR  S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT T/C 249PS 5 DOOR R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 15334938, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT T/C 249PS 5 DOOR R-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'DISCOVERY SPORT T/C 249PS 5 DOOR S', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 12338466, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'DISCOVERY SPORT T/C 249PS 5 DOOR S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE  T/C  5 DOOR  249PS AUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 19480289, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE  T/C  5 DOOR  249PS AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE  T/C  5 DOOR  249PS R-DYNAMIC S', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 14523031, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE  T/C  5 DOOR  249PS R-DYNAMIC S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE  T/C  5 DOOR  249PS R-DYNAMIC SE', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 16193709, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE  T/C  5 DOOR  249PS R-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE  T/C  5 DOOR  249PS S', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 14301187, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE  T/C  5 DOOR  249PS S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE  T/C  5 DOOR 249PS AUTOBIOGRAPHY', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 19723740, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE  T/C  5 DOOR 249PS AUTOBIOGRAPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE  T/C 249PS  5 DOOR  S', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 14916812, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE  T/C 249PS  5 DOOR  S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE  T/C 249PS  5 DOOR R-DYNAMIC SE', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 16759123, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE  T/C 249PS  5 DOOR R-DYNAMIC SE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE  T/C 249PS 5 DOOR', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'diesel', 13890060, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE  T/C 249PS 5 DOOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE  T/C 249PS 5 DOOR  R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 18056409, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE  T/C 249PS 5 DOOR  R-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE  T/C 5 DOOR 249PS BRONZE COLLECTION', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 15841011, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE  T/C 5 DOOR 249PS BRONZE COLLECTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE  T/C AWD 5 DOOR 249PS R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 17464825, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE  T/C AWD 5 DOOR 249PS R-DYNAMIC HSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE T/C  5 DOOR 249PS BRONZE COLLECTION', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 15207431, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE T/C  5 DOOR 249PS BRONZE COLLECTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'LANDROVER', 'RANGE ROVER EVOQUE T/C 249PS 5 DOOR R-DYNAMIC HSE', NULL, 'AUT', 'AWD', 1997, 'S/WAGON', NULL, '5', 'petrol', 18030238, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'LANDROVER' AND model = 'RANGE ROVER EVOQUE T/C 249PS 5 DOOR R-DYNAMIC HSE'
);