INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  GRAND CHEROKEE 4XE LIMITED 4XE', '1C4RJYK64P876', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'hybrid', 14765610, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  GRAND CHEROKEE 4XE LIMITED 4XE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  GRAND CHEROKEE 4XE SUMMIT RESERVE 4XE', '1C4RJYN68P876', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'hybrid', 16768493, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  GRAND CHEROKEE 4XE SUMMIT RESERVE 4XE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  GRAND CHEROKEE ALTITUDE', 'DBA-WK36TA', 'AT', '4WD', 3600, 'WAGON', NULL, NULL, 'petrol', 13010247, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  GRAND CHEROKEE ALTITUDE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  GRAND CHEROKEE L LIMITED', '1C4RJKKG4P876', 'AT', '4WD', 3600, 'WAGON', NULL, NULL, 'petrol', 17243004, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  GRAND CHEROKEE L LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  GRAND CHEROKEE L SUMMIT RESERVE', '1C4RJKNG6P880', 'AT', '4WD', 3600, 'WAGON', NULL, NULL, 'petrol', 19215481, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  GRAND CHEROKEE L SUMMIT RESERVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  GRAND CHEROKEE SRT8', '1C4RJFHJ4HC92', 'AT', '4WD', 6400, 'WAGON', NULL, NULL, 'petrol', 21516923, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  GRAND CHEROKEE SRT8'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  GRAND CHEROKEE STERLING EDITION', 'DBA-WK36TA', 'AT', '4WD', 3600, 'WAGON', NULL, NULL, 'petrol', 22559676, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  GRAND CHEROKEE STERLING EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  GRAND CHEROKEE SUMMIT', '1C4RJFKG8JC47', 'AT', '4WD', 3600, 'WAGON', NULL, NULL, 'petrol', 22001058, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  GRAND CHEROKEE SUMMIT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  GRAND CHEROKEE TRACKHAWK', '1C4RJFP92JC35', 'AT', '4WD', 6200, 'WAGON', NULL, NULL, 'petrol', 43192610, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  GRAND CHEROKEE TRACKHAWK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  RENEGADE LIMITED', '1C4BU0000KPJ9', 'AT', '2WD', 1300, 'WAGON', NULL, NULL, 'petrol', 9098545, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  RENEGADE LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  RENEGADE LONGITUDE', '1C4BU000KPJ9', 'AT', '2WD', 1300, 'WAGON', NULL, NULL, 'petrol', 5959598, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  RENEGADE LONGITUDE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  RENEGADE NIGHT EAGLE', '3BA-BV13PM', 'AT', '2WD', 1300, 'WAGON', NULL, NULL, 'petrol', 7562154, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  RENEGADE NIGHT EAGLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  RENEGADE TRAILHAWK', '1C4BU0000JPH9', 'AT', '4WD', 2400, 'WAGON', NULL, NULL, 'petrol', 8267246, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  RENEGADE TRAILHAWK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  TRAILHAWK', 'MCANJRDB1KFA5', 'AT', '4WD', 2400, 'WAGON', NULL, NULL, 'petrol', 9724101, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  TRAILHAWK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  WRANGLER', '1C4HJXGG2LW15', 'AT', '2WD', 3600, 'WAGON', NULL, NULL, 'petrol', 17687685, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  WRANGLER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  WRANGLER OVERLAND NACHO', '1C4HJXHG8MW70', 'AT', '2WD', 3600, 'WAGON', NULL, NULL, 'petrol', 18483724, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  WRANGLER OVERLAND NACHO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  WRANGLER RUBICON', '7BA-JL36S', 'AT', '4WD', 3600, 'WAGON', NULL, NULL, 'petrol', 15065701, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  WRANGLER RUBICON'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  WRANGLER RUBICON SOFT TOP', '7BA-JL36S', 'AT', '4WD', 3600, 'WAGON', NULL, NULL, 'petrol', 18577938, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  WRANGLER RUBICON SOFT TOP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  WRANGLER SPORTS', '1C4HJXGG6KW60', 'AT', '4WD', 3600, 'WAGON', NULL, NULL, 'petrol', 14867244, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  WRANGLER SPORTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  WRANGLER UNLIMITED BLACK&TAN', 'ABA-JL36L', 'AT', '2WD', 3600, 'WAGON', NULL, NULL, 'petrol', 14866355, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  WRANGLER UNLIMITED BLACK&TAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  WRANGLER UNLIMITED LIMITED EDITION WITH SUNRIDER FLIP TOP FOR HARDTOP', '7BA-JL36L', 'AT', '2WD', 3600, 'WAGON', NULL, NULL, 'petrol', 22677607, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  WRANGLER UNLIMITED LIMITED EDITION WITH SUNRIDER FLIP TOP FOR HARDTOP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  WRANGLER UNLIMITED RUBICON POWER TOP', '3BA-JL20L', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'petrol', 17397523, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  WRANGLER UNLIMITED RUBICON POWER TOP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  WRANGLER UNLIMITED SAHARA', '1C4HJXEGXKW59', 'AT', '2WD', 3600, 'WAGON', NULL, NULL, 'petrol', 26167745, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  WRANGLER UNLIMITED SAHARA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER  WRANGLER UNLIMITED WILLYS', 'ABA-JL36L', 'AT', '2WD', 3600, 'WAGON', NULL, NULL, 'petrol', 20293044, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER  WRANGLER UNLIMITED WILLYS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER COMPASS LONGITUDE', 'ABA-M624', 'AT', '4WD', 2400, 'WAGON', NULL, NULL, 'petrol', 6706834, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER COMPASS LONGITUDE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER GLADIATOR', '1C6HJTAG2ML61', 'AT', '4WD', 3600, 'WAGON', NULL, NULL, 'petrol', 20487290, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER GLADIATOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER GLADIATOR RUBICON', '7BF-JT36', 'AT', '4WD', 2400, 'WAGON', NULL, NULL, 'petrol', 26151166, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER GLADIATOR RUBICON'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER GRAND CHEROKEE', '1C4RJFEG9KC75', 'AT', '4WD', 3600, 'WAGON', NULL, NULL, 'petrol', 13930316, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER GRAND CHEROKEE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER GRAND CHEROKEE LIMITED', '1C4PJHKN2P877', 'AT', '4WD', 3600, 'WAGON', NULL, NULL, 'petrol', 16719341, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER GRAND CHEROKEE LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER OTHER', '1C6HATAG3LL11', 'AT', '4WD', 3600, 'WAGON', NULL, NULL, 'petrol', 21002950, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER OTHER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER RENEGADE 4XE TRAILHAWK 4XE', '1C4PJDCW3PP03', 'AT', '2WD', 1300, 'WAGON', NULL, NULL, 'petrol', 10369590, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER RENEGADE 4XE TRAILHAWK 4XE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER WRANGLER', '7BA-JL36S', 'AT', '4WD', 3600, 'WAGON', NULL, NULL, 'petrol', 14680875, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER WRANGLER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER WRANGLER RUBICON SOFT TOP', '7BA-JL36S', 'AT', '2WD', 3600, 'WAGON', NULL, NULL, 'petrol', 18577938, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER WRANGLER RUBICON SOFT TOP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER WRANGLER UNLIMITED RUBICON', '1C4JJXFG7PW54', 'AT', '2WD', 3600, 'WAGON', NULL, NULL, 'petrol', 20870755, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER WRANGLER UNLIMITED RUBICON'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER WRANGLER UNLIMITED RUBICON LIMITED EDITION WITH SUNRIDER FLIP TOP FOR HARDTOP', '7BA-JL36L', 'AT', '2WD', 3600, 'WAGON', NULL, NULL, 'petrol', 19487604, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER WRANGLER UNLIMITED RUBICON LIMITED EDITION WITH SUNRIDER FLIP TOP FOR HARDTOP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER WRANGLER UNLIMITED RUBICON SKY ONE TOUCH POWER TOP', '1C4HJXMG5KW59', 'AT', '2WD', 3600, 'WAGON', NULL, NULL, 'petrol', 26560492, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER WRANGLER UNLIMITED RUBICON SKY ONE TOUCH POWER TOP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER WRANGLER UNLIMITED SAHARA LAUNCH EDITION', 'ABA-JL36L', 'AT', '2WD', 3600, 'WAGON', NULL, NULL, 'petrol', 27120172, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER WRANGLER UNLIMITED SAHARA LAUNCH EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER WRANGLER UNLIMITED SPORT', '3BA-JL20L', 'AT', '2WD', 3600, 'WAGON', NULL, NULL, 'petrol', 14454161, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER WRANGLER UNLIMITED SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'JEEP', 'CHRYSLER WRANGLER UNLIMITED SPORT ALTITUDE', '3BA-JL20L', 'AT', '2WD', 3600, 'WAGON', NULL, NULL, 'petrol', 12248354, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'JEEP' AND model = 'CHRYSLER WRANGLER UNLIMITED SPORT ALTITUDE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'CARNIVAL', 'SPORT+ HEV', 'Auto', '2WD', 1598, 'STATION WAGON', NULL, NULL, 'petrol', 10456791, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'CARNIVAL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'CARNIVAL', 'GT-LINE HEV', 'Auto', '2WD', 1600, 'STATION WAGON', NULL, NULL, 'petrol', 11685652, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'CARNIVAL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'CARNIVAL', 'GT-LINE', 'Auto', '4WD', 2200, 'STATION WAGON', NULL, NULL, 'diesel', 11180641, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'CARNIVAL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'CARNIVAL', 'GT-LINE LITE', 'Auto', '4WD', 2200, 'STATION WAGON', NULL, NULL, 'diesel', 10518005, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'CARNIVAL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'CARNIVAL', 'S', 'Auto', '4WD', 2200, 'STATION WAGON', NULL, NULL, 'diesel', 8038859, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'CARNIVAL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'CARNIVAL', 'SPECIAL EDITION', 'Auto', '4WD', 2200, 'STATION WAGON', NULL, NULL, 'diesel', 9670199, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'CARNIVAL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'CARNIVAL', 'SPORT', 'Auto', '4WD', 2200, 'STATION WAGON', NULL, NULL, 'diesel', 8941758, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'CARNIVAL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'CARNIVAL', 'SPORT+', 'Auto', '4WD', 2200, 'STATION WAGON', NULL, NULL, 'diesel', 9910461, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'CARNIVAL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'CARNIVAL', 'GT-LINE', 'Auto', '4WD', 3500, 'STATION WAGON', NULL, NULL, 'petrol', 11706526, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'CARNIVAL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'CARNIVAL', 'GT-LINE LITE', 'Auto', '4WD', 3500, 'STATION WAGON', NULL, NULL, 'petrol', 10990879, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'CARNIVAL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'CARNIVAL', 'S', 'Auto', '4WD', 3500, 'STATION WAGON', NULL, NULL, 'petrol', 8313401, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'CARNIVAL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'CARNIVAL', 'SPECIAL EDITION', 'Auto', '4WD', 3500, 'STATION WAGON', NULL, NULL, 'petrol', 10113261, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'CARNIVAL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'CARNIVAL', 'SPORT', 'Auto', '4WD', 3500, 'STATION WAGON', NULL, NULL, 'petrol', 9288533, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'CARNIVAL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'CARNIVAL', 'SPORT+', 'Auto', '4WD', 3500, 'STATION WAGON', NULL, NULL, 'petrol', 10334732, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'CARNIVAL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'CERATO', 'GT', 'Auto', '2WD', 1600, 'HATCHBACK', NULL, NULL, 'petrol', 5640821, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'CERATO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'CERATO', 'S', 'Auto', '2WD', 2000, 'HATCHBACK', NULL, NULL, 'petrol', 4141091, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'CERATO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'CERATO', 'S SAFETY PACK', 'Auto', '2WD', 2000, 'HATCHBACK', NULL, NULL, 'petrol', 4294125, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'CERATO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'CERATO', 'SPORT', 'Auto', '2WD', 2000, 'HATCHBACK', NULL, NULL, 'petrol', 4462462, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'CERATO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'CERATO', 'SPORT+', 'Auto', '2WD', 2000, 'HATCHBACK', NULL, NULL, 'petrol', 4929215, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'CERATO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'CERATO', 'SPORT SAFETY PACK', 'Auto', '2WD', 2000, 'HATCHBACK', NULL, NULL, 'petrol', 4615496, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'CERATO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'CERATO', 'GT', 'Auto', '2WD', 1600, 'SEDAN', NULL, NULL, 'petrol', 5640821, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'CERATO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'CERATO', 'S', 'Auto', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 4141091, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'CERATO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'CERATO', 'S SAFETY PACK', 'Auto', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 4294125, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'CERATO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'CERATO', 'SPORT', 'Auto', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 4462462, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'CERATO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'CERATO', 'SPORT+', 'Auto', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 4929215, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'CERATO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'CERATO', 'SPORT SAFETY PACK', 'Auto', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 4615496, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'CERATO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'EV3', 'AIR 2WD LR', 'Auto', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 7179912, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'EV3'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'EV3', 'AIR 2WD SR', 'Auto', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 6410275, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'EV3'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'EV3', 'EARTH 2WD LR SUBTLE GREY', 'Auto', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 7891641, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'EV3'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'EV3', 'EARTH 2WD LR WARM GREY', 'Auto', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 7891641, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'EV3'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'EV3', 'GT-LINE 2WD LR', 'Auto', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 8612123, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'EV3'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'EV5', 'AIR 2WD LR', 'Auto', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 8237742, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'EV5'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'EV5', 'AIR 2WD SR', 'Auto', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 7645196, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'EV5'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'EV5', 'EARTH AWD LR BLACK', 'Auto', '4WD', NULL, 'SUV', NULL, NULL, 'electric', 8722553, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'EV5'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'EV5', 'EARTH AWD LR NOUGAT', 'Auto', '4WD', NULL, 'SUV', NULL, NULL, 'electric', 8722553, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'EV5'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'EV5', 'GT-LINE AWD LR', 'Auto', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 9665240, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'EV5'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'EV6', 'AIR RWD', 'Auto', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 9775669, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'EV6'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'EV6', 'GT AWD', 'Auto', '4WD', NULL, 'SUV', NULL, NULL, 'electric', 13411749, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'EV6'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'EV6', 'GT-LINE AWD', 'Auto', '4WD', NULL, 'SUV', NULL, NULL, 'electric', 11795714, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'EV6'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'EV6', 'GT-LINE RWD', 'Auto', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 10718357, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'EV6'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'EV9', 'AIR', 'Auto', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 13062955, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'EV9'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'EV9', 'EARTH', 'Auto', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 14342317, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'EV9'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'EV9', 'GT LINE', 'Auto', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 16295027, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'EV9'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'K4', 'GT-LINE', 'Auto', '2WD', 1600, 'SEDAN', NULL, NULL, 'petrol', 6578918, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'K4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'K4', 'S', 'Auto', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 4681301, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'K4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'K4', 'S SAFETY PACK', 'Auto', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 5002671, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'K4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'K4', 'SPORT', 'Auto', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 5385255, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'K4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'K4', 'SPORT+', 'Auto', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 5752536, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'K4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'NIRO', 'EV GT-LINE BLACK C PILLAR', 'Auto', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 9744695, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'NIRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'NIRO', 'EV GT-LINE BODY C PILLAR', 'Auto', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 9744695, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'NIRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'NIRO', 'EV GT-LINE GREY C PILLAR', 'Auto', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 9744695, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'NIRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'NIRO', 'EV S', 'Auto', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 8967651, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'NIRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'NIRO', 'HEV GT-LINE BLK C PILLAR (HYB)', 'Auto', '2WD', 1600, 'SUV', NULL, NULL, 'petrol/electric', 7751156, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'NIRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'NIRO', 'HEV GT-LINE BODY C PILL (HYB)', 'Auto', '2WD', 1600, 'SUV', NULL, NULL, 'petrol/electric', 7751156, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'NIRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'NIRO', 'HEV S (HYBRID)', 'Auto', '2WD', 1600, 'SUV', NULL, NULL, 'petrol/electric', 6886516, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'NIRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'OPTIMA', 'GT NAV (BLACK LEATHER)', 'Auto', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 6901819, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'OPTIMA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'OPTIMA', 'GT NAV (BLACK LEATHER) SUNROOF', 'Auto', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 7103824, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'OPTIMA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'OPTIMA', 'SI', 'Auto', '2WD', 2400, 'SEDAN', NULL, NULL, 'petrol', 5117447, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'OPTIMA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'PICANTO', 'GT LINE (PE2)', 'Auto', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 3334604, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'PICANTO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'PICANTO', 'SPORT (PE2)', 'Auto', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 3059144, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'PICANTO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'KIA', 'PICANTO', 'GT LINE (PE2)', 'Auto', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 3089750, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'KIA' AND model = 'PICANTO'
);