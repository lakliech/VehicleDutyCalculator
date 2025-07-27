INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO HYBRID', 'XKU645', 'AT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 9527169, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO HYBRID', 'XKU605', 'AT', '2WD', 4000, 'TRK', NULL, NULL, 'hybrid', 7464987, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO LONG', 'XZC710', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 13563989, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO LONG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO LONG ALL LOW FLOOR', 'XZU645', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 15262626, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO LONG ALL LOW FLOOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO LONG ALL LOW FLOOR', 'XZC710', 'AT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 11129638, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO LONG ALL LOW FLOOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO LONG ALL LOW FLOOR TURBO', 'XZU620', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 25408392, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO LONG ALL LOW FLOOR TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO LONG ALL LOW FLOOR TURBO', 'XZU655', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 15737354, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO LONG ALL LOW FLOOR TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO ROUTE VAN', 'XZC605', 'MT', '2WD', 4000, 'VAN', NULL, NULL, 'diesel', 9999533, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO ROUTE VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO SEMI LONG ALL LOW FLOOR', 'XZC645', 'AT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 12173025, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO SEMI LONG ALL LOW FLOOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO SEMI LONG DOUBLE CAB HIGH FLOOR', 'XZU685', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 15381650, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO SEMI LONG DOUBLE CAB HIGH FLOOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO SEMI LONG HIGH FLOOR', 'XZU685', 'MT', '4WD', 4000, 'TRK', NULL, NULL, 'diesel', 11355818, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO SEMI LONG HIGH FLOOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO WIDE CAB SUPER LONG ALL LOW FLOOR', 'XZU722', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 11020476, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO WIDE CAB SUPER LONG ALL LOW FLOOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO WIDE CAB SUPER LONG ALL LOW FLOOR', 'XZU720', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 24584873, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO WIDE CAB SUPER LONG ALL LOW FLOOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO WIDE CAB SUPER LONG ALL LOW FLOOR', 'XZU720M', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 13079371, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO WIDE CAB SUPER LONG ALL LOW FLOOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO WIDE CAB SUPER LONG HIGH FLOOR', 'XZU720', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 17388632, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO WIDE CAB SUPER LONG HIGH FLOOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'DUTRO WIDE CAB SUPER LONG HIGH FLOOR', 'XZU720', 'MT', '2WD', 4000, 'TRK', NULL, NULL, 'diesel', 20028737, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'DUTRO WIDE CAB SUPER LONG HIGH FLOOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'MELPHA', 'RR2AJD', 'AT', '2WD', 5120, 'BUS', NULL, NULL, 'diesel', 73202697, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'MELPHA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'MELPHA', 'RR2AJD', 'MT', '2WD', 5120, 'BUS', NULL, NULL, 'diesel', 58135946, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'MELPHA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'PONCHO', 'HX9JHC', 'MT', '2WD', 5100, 'BUS', NULL, NULL, 'diesel', 41887591, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'PONCHO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'PONCHO', 'HX9JHC', 'AT', '2WD', 5100, 'BUS', NULL, NULL, 'diesel', 41887591, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'PONCHO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'PROFIA', 'FR1AH', 'MT', '2WD', 8600, 'TRK', NULL, NULL, 'diesel', 52327626, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'PROFIA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'PROFIA', 'FS1AG', 'MT', '2WD', 8600, 'TRK', NULL, NULL, 'diesel', 34444042, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'PROFIA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'PROFIA', 'FS1AG', 'MT', '2WD', 8860, 'TRK', NULL, NULL, 'diesel', 47264801, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'PROFIA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'PROFIA', 'FW1AH', 'MT', '2WD', 8900, 'TRK', NULL, NULL, 'diesel', 89275149, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'PROFIA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'PROFIA BASEGRADE', 'FR1AH', 'AT', '2WD', 8860, 'TRK', NULL, NULL, 'diesel', 21973786, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'PROFIA BASEGRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'PROFIA BASEGRADE', 'FW1AH', 'AT', '2WD', 8860, 'TRK', NULL, NULL, 'diesel', 50591648, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'PROFIA BASEGRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'PROFIA BASEGRADE', 'FW1AH', 'AT', '2WD', 8860, 'TRK', NULL, NULL, 'diesel', 82293221, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'PROFIA BASEGRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'PROFIA BASEGRADE', 'FW1AH', 'MT', '2WD', 8860, 'TRK', NULL, NULL, 'diesel', 34661720, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'PROFIA BASEGRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'PROFIA BASEGRADE', 'FW1AH', 'AT', '2WD', 9900, 'TRK', NULL, NULL, 'diesel', 52342697, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'PROFIA BASEGRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'RANGER', 'FD2AB', 'MT', '2WD', 5100, 'TRK', NULL, NULL, 'diesel', 31920907, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'RANGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'RANGER', 'FD2AB', 'MT', '2WD', 5100, 'TRK', NULL, NULL, 'diesel', 35355513, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'RANGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'RANGER', 'FC2AB', 'MT', '2WD', 5100, 'TRK', NULL, NULL, 'diesel', 15741919, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'RANGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'RANGER', 'FD2AB', 'MT', '2WD', 5100, 'TRK', NULL, NULL, 'diesel', 32251847, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'RANGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'RANGER', 'FD2AB', 'MT', '2WD', 5100, 'TRK', NULL, NULL, 'diesel', 32251847, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'RANGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'RANGER', 'FD2AB', 'MT', '2WD', 5100, 'TRK', NULL, NULL, 'diesel', 35179718, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'RANGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'RANGER', 'FD2JKBA', 'MT', '2WD', 5100, 'TRK', NULL, NULL, 'diesel', 27672032, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'RANGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'RANGER', 'FX1AB', 'MT', '2WD', 5100, 'TRK', NULL, NULL, 'diesel', 26107769, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'RANGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'RANGER BASEGRADE', 'FD2AB', 'MT', '2WD', 5100, 'TRK', NULL, NULL, 'diesel', 20850382, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'RANGER BASEGRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'RANGER BASEGRADE', 'FE2AB', 'MT', '2WD', 5100, 'TRK', NULL, NULL, 'diesel', 27545394, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'RANGER BASEGRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'RANGER DUMP', 'FC2AB', 'MT', '2WD', 5100, 'TRK', NULL, NULL, 'diesel', 36859254, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'RANGER DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'RANGER DUMP', 'FC2AB', 'MT', '2WD', 5100, 'TRK', NULL, NULL, 'diesel', 19908458, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'RANGER DUMP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'RANGER PRO', 'FE2AC', 'MT', '2WD', 5120, 'TRK', NULL, NULL, 'diesel', 19888145, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'RANGER PRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'RANGER PRO', 'FD2AB', 'MT', '2WD', 5200, 'TRK', NULL, NULL, 'diesel', 31562807, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'RANGER PRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'RIESSE', 'GDB70', 'AT', '2WD', 2700, 'VAN', NULL, NULL, 'diesel', 16316043, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'RIESSE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'RIESSE II', 'XZB70M', 'AT', '2WD', 4000, 'BUS', NULL, NULL, 'diesel', 35764379, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'RIESSE II'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'RIESSE II GX TURBO', 'XZB70', 'AT', '2WD', 4000, 'BUS', NULL, NULL, 'diesel', 45799860, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'RIESSE II GX TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'RIESSE II LX', 'XZB60', 'AT', '2WD', 4000, 'BUS', NULL, NULL, 'diesel', 68016797, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'RIESSE II LX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HINO', 'RIESSE II LX TURBO', 'XZB70', 'MT', '2WD', 4000, 'VAN', NULL, NULL, 'diesel', 34509741, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HINO' AND model = 'RIESSE II LX TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'ACCORD E:HEV', '6AA-CY2', 'CVT', '2WD', 1993, 'SEDAN', '1855', '5', 'petrol', 9517810, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'ACCORD E:HEV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'ACCORD EX', '6AA-CV3', 'CVT', '2WD', 1993, 'SEDAN', '1835', '5', 'petrol', 8121594, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'ACCORD EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'ACCORD EX', '6AA-CV3', 'CVT', '2WD', 1496, 'SEDAN', '1835', '5', 'petrol', 7796730, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'ACCORD EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'ACCORD EX', '6AA-CV3', '6MT', '2WD', 1993, 'SEDAN', '1835', '5', 'petrol', 6903498, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'ACCORD EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'ACCORD HYBRID EX', 'DAA-CR7', 'CVT', '2WD', 1993, 'SEDAN', '1875', '5', 'petrol', 6630534, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'ACCORD HYBRID EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'ACTY DUMP FRAME TORII', 'EBD-HA9', '5MT', '4WD', 656, 'TRUCK', '1450', '2', 'petrol', 2260213, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'ACTY DUMP FRAME TORII'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'ACTY TRUCK', 'EBD-HA9', '5MT', 'AWD', 656, 'TRUCK', '1430', '2', 'petrol', 2340696, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'ACTY TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'ACTYB TRUCK FREEZING VAN', 'EBD-HA9', '5MT', 'AWD/4WD', 656, 'TRUCK', '1430', '2', 'petrol', 2340696, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'ACTYB TRUCK FREEZING VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'ACTY TRUCK LIFTER', 'EBD-HA9', '5MT', 'AWD', 658, 'TRUCK', '1390', '2', 'petrol', 2340696, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'ACTY TRUCK LIFTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'ACTY TRUCK LIFTER V', 'EBD-HA9', '5MT', '4WD', 658, 'TRUCK', '1390', '2', 'petrol', 2340696, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'ACTY TRUCK LIFTER V'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'ACTY TRUCK SDX', 'EBD-HA9', '5MT', '4WD/AWD', 658, 'TRUCK', '1280', '2', 'petrol', 1535872, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'ACTY TRUCK SDX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'CIVIC', 'DBA-FC1', '2WD', '2WD', 1496, 'SEDAN', '1575', '5', 'petrol', 4114662, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'CIVIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'CIVIC  EX', '6BA-FLT1', 'CVT', '2WD', 1496, 'SEDAN', '1645', '5', 'petrol', 6020082, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'CIVIC  EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'CIVIC', 'DBA-FK7', '2WD', '2WD', 1496, 'SEDAN', '1575', '5', 'petrol', 4347725, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'CIVIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'CIVIC E:HEV', '6AA-FL4', 'CVT', '2WD', 1993, 'SEDAN', '1735', '5', 'petrol', 6881872, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'CIVIC E:HEV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'CIVIC E:HEV EX', '6AA-FL4', 'CVT', '2WD', 1993, 'SEDAN', '1765', '5', 'petrol', 7523565, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'CIVIC E:HEV EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'CIVIC EX', '6BA-FL1', 'CVT', '2WD', 1496, 'SEDAN', '1645', '5', 'petrol', 5935240, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'CIVIC EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'CIVIC HATCHBACK', 'DBA-FK7', '6MT', '2WD', 1496, 'HATCHBACK', '1595', '5', 'petrol', 4347725, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'CIVIC HATCHBACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'CIVIC HATCHBACK', '6BA-FK7', '6MT', '2WD', 1496, 'HATCHBACK', '1605', '5', 'petrol', 4493599, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'CIVIC HATCHBACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'CIVIC RS', '5BA-FL1', '6MT', '2WD', 1496, 'SEDAN', '1625', '5', 'petrol', 7040028, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'CIVIC RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'CIVIC SEDAN', 'DBA-FC1', 'CVT', '2WD', 1496, 'SEDAN', '1575', '5', 'petrol', 4114662, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'CIVIC SEDAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'CIVIC TYPE R', '6BA-FL5', '6MT', '2WD', 1995, 'SEDAN', '1650', '4', 'petrol', 8728181, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'CIVIC TYPE R'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'CIVIC TYPE R', 'DBA-FK8', '6MT', '2WD', 1995, 'SEDAN', '1610', '4', 'petrol', 6986876, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'CIVIC TYPE R'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'CLARITY FUEL CELL', 'ZBA-ZC4', 'CVT', '2WD', NULL, 'SEDAN', '2165', '5', 'electric', 10918776, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'CLARITY FUEL CELL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'CLARITY PHEV EX', '6LA-ZC5', 'CVT', '2WD', 1496, 'SEDAN', '2125', '5', 'petrol', 9129720, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'CLARITY PHEV EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'CR-V EHEV EX MASTERPIECE', '6AA-RT5', '7AT', '2WD', 1993, 'SUV', '1925', '5', 'petrol', 6478831, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'CR-V EHEV EX MASTERPIECE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'CR-V E:FCEV', 'ZBA-ZC8', 'CVT', '2WD', NULL, 'SUV', '2285', '5', 'electric', 12441779, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'CR-V E:FCEV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'CR-V HYBRID EX', '6AA-RT5', '7AT', '2WD', 1993, 'SUV', '1925', '5', 'petrol', 6703372, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'CR-V HYBRID EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'Fit 13G.F', 'DBA-GK3', '(FF/CVT)', '2WD', 1317, 'HATCHBACK', '1305', '5', 'petrol', 2218296, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'Fit 13G.F'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'FIT E:HEV BASIC', '6AA-GR3', 'CVT', '2WD', 1496, 'HATCHBACK', '1485', '5', 'petrol', 3288040, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'FIT E:HEV BASIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'FIT E:HEV HOME', '6AA-GR3', 'CVT', '2WD', 1496, 'HATCHBACK', '1465', '4', 'petrol', 3721975, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'FIT E:HEV HOME'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'FIT E:HVE BASIC', '6AA-GR3', 'CVT', '2WD', 1496, 'HATCHBACK', '1465', '5', 'petrol', 3616845, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'FIT E:HVE BASIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'FIT HYBRID', 'DAA-GP5', '7AT', '2WD', 1496, 'HATCHBACK', '1445', '5', 'petrol', 3423854, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'FIT HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'FIT HYBRID F', 'DAA-GP5', '2WD', '2WD', 1496, 'HATCHBACK', '1415', '5', 'petrol', 2969464, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'FIT HYBRID F'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'FIT HYBRID MODULE', 'DAA-GP5', '7AT', '2WD', 1496, 'HATCHBACK', '1425', '5', 'petrol', 3504337, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'FIT HYBRID MODULE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'FIT HYBRID S', 'DAA-GP7', '7AT', '2WD', 1496, 'HATCHBACK', '1445', '5', 'petrol', 3423854, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'FIT HYBRID S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'FIT HYBRID S SENSING', 'DAA-GP5', 'CVT', '2WD', 1496, 'HATCHBACK', '1445', '5', 'petrol', 3423854, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'FIT HYBRID S SENSING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'FREED CROSSTAR', '5BA-GT2', 'CVT', '2WD', 1496, 'MINIVAN', '1800', '6', 'petrol', 5021765, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'FREED CROSSTAR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'FREED E:HEV AIR EX', '6AA-GT5', 'CVT', '2WD', 1496, 'MINIVAN', '1810', '6', 'petrol', 5108954, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'FREED E:HEV AIR EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'FREED E:HEV CROSSTAR SLOPE', '6AA-GT6', 'CVT', '2WD', 1496, 'MINIVAN', '1860', '6', 'petrol', 5524780, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'FREED E:HEV CROSSTAR SLOPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'FREED G', '5BA-GB5', 'CVT', '2WD', 1496, 'MINIVAN', '1690', '6', 'petrol', 4300106, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'FREED G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'FREED G', 'DBA-GB5', 'CVT', '2WD', 1496, 'MINIVAN', '1680', '6', 'petrol', 4024119, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'FREED G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'FREED G HONDA SENSING', '6BA-GB5', 'CVT', '2WD', 1496, 'MINIVAN', '1690', '6', 'petrol', 4300106, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'FREED G HONDA SENSING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'FREED HYBRID G', '6AA-GB7', '7AT', '2WD', 1496, 'MINIVAN', '1690', '4', 'petrol', 4736556, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'FREED HYBRID G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'FREED HYBRID G', 'DAA-GB7', '7AT', '2WD', 1496, 'MINIVAN', '1740', '6', 'petrol', 3875079, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'FREED HYBRID G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'FREED HYBRID MODULO X', 'DAA-GB7', '7AT', '2WD', 1496, 'MINIVAN', '1770', '6', 'petrol', 4860800, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'FREED HYBRID MODULO X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'FREED+ HYBRID G', 'DAA-GB7', '7AT', '2WD', 1496, 'MINIVAN', '1750', '6', 'petrol', 4564021, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'FREED+ HYBRID G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'FREED+ HYBRID G. HONDA SENSING', '6AA-GB7', 'CVT', '2WD', 1496, 'MINIVAN', '1760', '6', 'petrol', 4831290, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'FREED+ HYBRID G. HONDA SENSING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'GRACE HYBRID DX', 'DAA-GM4', 'CVT', '2WD', 1496, 'SEDAN', '1455', '5', 'petrol', 3356786, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'GRACE HYBRID DX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'GRACE HYBRID EX', 'DAA-GM4', 'CVT', '2WD', 1496, 'SEDAN', '1465', '5', 'petrol', 3653565, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'GRACE HYBRID EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'GRACE LX', 'DBA-GM6', 'CVT', '2WD', 1496, 'SEDAN', '1385', '5', 'petrol', 2746461, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'GRACE LX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HONDA', 'HONDA E', 'ZAA-ZC7', '7AT', '2WD', NULL, 'HATCHBACK', '1760', '5', 'electric', 7545223, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HONDA' AND model = 'HONDA E'
);