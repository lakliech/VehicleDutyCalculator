INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF TSI COMFORTLINE TECH EDITION', 'WVWZZZAUZKP04', 'AT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 2871249, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF TSI COMFORTLINE TECH EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'THE BEETLE DESIGN MEISTER', 'WVWZZZ16ZKM70', 'AT', '2WD', 1200, 'COUPE', NULL, NULL, 'petrol', 4289363, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'THE BEETLE DESIGN MEISTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF VARIANT TSI COMFORTLINE MEISTER', 'WVWZZZAUZLP55', 'AT', '2WD', 1200, 'WAGON', NULL, NULL, 'petrol', 2544826, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF VARIANT TSI COMFORTLINE MEISTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'SHARAN TSI COMFORTLINE', 'WVWZZZ7NZJV02', 'AT', '2WD', 1400, 'WAGON', NULL, NULL, 'petrol', 2572882, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'SHARAN TSI COMFORTLINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'TIGUAN DYNAUDIO EDITION', 'ABA-5NCZE', 'AT', '2WD', 1400, 'WAGON', NULL, NULL, 'petrol', 3592399, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'TIGUAN DYNAUDIO EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF TOURAN TSI COMFORTLINE', 'WVGZZZ1TZLW04', 'AT', '2WD', 1400, 'WAGON', NULL, NULL, 'petrol', 3766930, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF TOURAN TSI COMFORTLINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF TOURAN TSI R LINE', 'WVGZZZ1TZLW04', 'AT', '2WD', 1400, 'WAGON', NULL, NULL, 'petrol', 4398106, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF TOURAN TSI R LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'SHARAN TSI HIGHLINE', 'WVWZZZ7NZLV01', 'AT', '2WD', 1400, 'HATCHBACK', NULL, NULL, 'petrol', 5471220, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'SHARAN TSI HIGHLINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF ETSI R LINE', 'WVWZZZCDZMW35', 'AT', '2WD', 1500, 'HATCHBACK', NULL, NULL, 'diesel', 3860968, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF ETSI R LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF VARIANT ETSI R LINE', 'WVWZZZCDZMW80', 'AT', '2WD', 1500, 'WAGON', NULL, NULL, 'petrol', 3860968, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF VARIANT ETSI R LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF ETSI STYLE', 'WVWZZZCDZNW16', 'AT', '2WD', 1500, 'HATCHBACK', NULL, NULL, 'petrol', 4599726, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF ETSI STYLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF TOURAN TSI COMFORTLINE', 'WVGZZZ1TZNW00', 'AT', '2WD', 1500, 'WAGON', NULL, NULL, 'petrol', 3107698, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF TOURAN TSI COMFORTLINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF TOURAN TSI HIGHLINE', 'WVGZZZ1TZNW01', 'AT', '2WD', 1500, 'WAGON', NULL, NULL, 'petrol', 5244253, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF TOURAN TSI HIGHLINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF VARIANT ETSI R LINE', 'WVWZZZCD7PW51', 'AT', '2WD', 1500, 'WAGON', NULL, NULL, 'hybrid', 4912605, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF VARIANT ETSI R LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'PASSAT VARIANT TSI ELEGANCE ADVANCE', 'WVWZZZ3CZNE03', 'AT', '2WD', 1500, 'WAGON', NULL, NULL, 'petrol', 4707115, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'PASSAT VARIANT TSI ELEGANCE ADVANCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'TIGUAN TSI R LINE', 'WVGZZZ5NZNW02', 'AT', '2WD', 1500, 'WAGON', NULL, NULL, 'diesel', 5326100, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'TIGUAN TSI R LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF ETSI R LINE PLATINUM EDITION', 'WVWZZZCD8RW01', 'AT', '2WD', 1500, 'HATCHBACK', NULL, NULL, 'hybrid', 6076855, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF ETSI R LINE PLATINUM EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF VARIANT ETSI STYLE PLATINUM EDITION', 'WVWZZZCD4RW81', 'AT', '2WD', 1500, 'WAGON', NULL, NULL, 'petrol', 5604150, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF VARIANT ETSI STYLE PLATINUM EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'PASSAT ETSI ELEGANCE', 'WVWZZZCJXSD00', 'AT', '2WD', 1500, 'SEDAN', NULL, NULL, 'petrol', 6479708, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'PASSAT ETSI ELEGANCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'OTHER', '269', 'AT', '2WD', 1600, 'OTHER', NULL, NULL, 'petrol', 4285211, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'OTHER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'NEW BEETLE', 'WVWZZZ9CZ7M55', 'AT', '2WD', 1800, 'COUPE', NULL, NULL, 'petrol', 698898, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'NEW BEETLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'ARTEON TSI 4MOTION R LINE', 'WVWZZZ3NZM01', 'AT', '4WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 4532601, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'ARTEON TSI 4MOTION R LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'PASSAT TDI ELEGANCELINE', 'LDA-3CDFC', 'AT', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 3186520, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'PASSAT TDI ELEGANCELINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'PASSAT TDI HIGHLINE', 'LDA-3CDFC', 'AT', '2WD', 2000, 'SEDAN', NULL, NULL, 'diesel', 3243513, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'PASSAT TDI HIGHLINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'PASSAT TDI HIGHLINE', 'LDA-3CDFC', 'AT', '2WD', 2000, 'SEDAN', NULL, NULL, 'diesel', 3478660, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'PASSAT TDI HIGHLINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'PASSAT ALLTRACK TDI 4MOTION ADVANCE', 'LDA-3CDFCF', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'diesel', 2965305, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'PASSAT ALLTRACK TDI 4MOTION ADVANCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'POLO GTI BASE GRADE', 'WVWZZZAWZJU04', 'AT', '2WD', 2000, 'HATCHBACK', NULL, NULL, 'petrol', 2426197, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'POLO GTI BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'THE BEETLE DESIGN', 'WVWZZZ16ZKM70', 'AT', '2WD', 2000, 'COUPE', NULL, NULL, 'petrol', 3873598, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'THE BEETLE DESIGN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'TIGUAN TDI 4MOTION R LINE', 'WVGZZZ5NZKW33', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'diesel', 4437614, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'TIGUAN TDI 4MOTION R LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'TIGUAN TDI 4MOTION R LINE', 'WVGZZZ5NZKW33', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'diesel', 4437614, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'TIGUAN TDI 4MOTION R LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'CARAVEL', 'WV2ZZZ7HZJH11', 'AT', '2WD', 2000, 'VAN', NULL, NULL, 'diesel', 11882960, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'CARAVEL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'PASSAT 2.0TSI R LINE', 'WVWZZZ3CZKE05', 'AT', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 3625997, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'PASSAT 2.0TSI R LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'SHARAN TDI HIGHLINE', '3DA-7NDLU', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'diesel', 5751821, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'SHARAN TDI HIGHLINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'TIGUAN TDI 4MOTION HIGHLINE', 'WVGZZZ5NZKW34', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'diesel', 3231903, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'TIGUAN TDI 4MOTION HIGHLINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'TIGUAN TDI 4MOTION COMFORTLINE', 'WVGZZZ5NZKW91', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'diesel', 2597597, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'TIGUAN TDI 4MOTION COMFORTLINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'TIGUAN TDI 4MOTION HIGHLINE', 'WVGZZZ5NZKW34', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'diesel', 3231903, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'TIGUAN TDI 4MOTION HIGHLINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'ARTEON TSI 4MOTION ELEGANCE', 'WVWZZZ3HZKE01', 'AT', '4WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 4036132, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'ARTEON TSI 4MOTION ELEGANCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'CALIFORNIA', 'WV2ZZZ7HZLH03', 'AT', '4WD', 2000, 'VAN', NULL, NULL, 'diesel', 21724740, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'CALIFORNIA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF TDI COMFORTLINE MEISTER', 'WVWZZZAUZLW10', 'AT', '2WD', 2000, 'HATCHBACK', NULL, NULL, 'diesel', 3696288, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF TDI COMFORTLINE MEISTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF TDI HIGHLINE MEISTER', 'WVWZZZAUZLP00', 'AT', '2WD', 2000, 'HATCHBACK', NULL, NULL, 'diesel', 4179669, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF TDI HIGHLINE MEISTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF GTI PERFORMANCE', 'WVWZZZAUZLW12', 'AT', '2WD', 2000, 'HATCHBACK', NULL, NULL, 'petrol', 5162897, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF GTI PERFORMANCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF GTI TCR', '3BA-AUDNU', 'AT', '2WD', 2000, 'HATCHBACK', NULL, NULL, 'petrol', 7563975, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF GTI TCR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF TOURAN TDI PREMIUM', 'LDA-1TDFG', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'diesel', 3186520, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF TOURAN TDI PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF VARIANT TDI HIGHLINE MEISTER', 'WVWZZZAUZLP55', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'diesel', 3845735, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF VARIANT TDI HIGHLINE MEISTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF VARIANT TDI COMFORTLINE MEISTER', 'AUDFG-WVWZZZAUZLP53', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'diesel', 2893536, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF VARIANT TDI COMFORTLINE MEISTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'PASSAT VARIANT TDI HIGHLINE', 'WVWZZZ3CZKE05', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'diesel', 2525828, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'PASSAT VARIANT TDI HIGHLINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'T-ROC TDI STYLE DESIGN PACKAGE', 'WVGZZZA1ZLV15', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'diesel', 3686156, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'T-ROC TDI STYLE DESIGN PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'T-ROC TDI R LINE', 'WVGZZZA1ZLV12', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'diesel', 3524888, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'T-ROC TDI R LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'T-ROC TDI SPORT', 'WVGZZZA1ZLV15', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'diesel', 3022297, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'T-ROC TDI SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'THE BEETLE 2.0 R LINE MEISTER', 'ABA-16CPL', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'diesel', 5710660, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'THE BEETLE 2.0 R LINE MEISTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'ARTEON TSI 4MOTION R LINE ADVANCE', 'WVWZZZ3HZNE00', 'AT', '4WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 5281527, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'ARTEON TSI 4MOTION R LINE ADVANCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF TDI STYLE', '3DA-CDDTS', 'AT', '2WD', 2000, 'HATCHBACK', NULL, NULL, 'diesel', 3480982, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF TDI STYLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF R TSI 4MOTION', '3BA-CDDNFF', 'AT', '2WD', 2000, 'HATCHBACK', NULL, NULL, 'petrol', 7850838, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF R TSI 4MOTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF R BASE GRADE', 'WVWZZZCD8PW11', 'AT', '2WD', 2000, 'HATCHBACK', NULL, NULL, 'petrol', 8211580, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF R BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF R VARIANT', '3BA-CDDNFV', 'AT', '2WD', 2000, 'HATCHBACK', NULL, NULL, 'petrol', 7435003, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF R VARIANT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF TOURAN TDI HIGHLINE', 'WVGZZZ1TZMW02', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'diesel', 4951603, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF TOURAN TDI HIGHLINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF TOURAN TDI COMFORTLINE', 'WVGZZZ1TZNW01', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'diesel', 5281527, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF TOURAN TDI COMFORTLINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'PASSAT TSI ELEGANCE ADVANCE', 'WVWZZZ3CZME12', 'AT', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 5323954, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'PASSAT TSI ELEGANCE ADVANCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'PASSAT VARIANT TDI ELEGANCE', 'WVWZZZ3CZME08', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'diesel', 3404781, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'PASSAT VARIANT TDI ELEGANCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'T-ROC TDI STYLE', 'WVGZZZA1ZPV55', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'petrol', 4272124, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'T-ROC TDI STYLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'ARTEON SHOOTING BRAKE TSI 4MOTION R LINE ADVANCE', 'WVWZZZ3HZPE50', 'AT', '4WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 8208625, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'ARTEON SHOOTING BRAKE TSI 4MOTION R LINE ADVANCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'CALIFORNIA BEACH', 'WV2ZZZ7HZPH08', 'AT', '4WD', 2000, 'VAN', NULL, NULL, 'diesel', 20371482, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'CALIFORNIA BEACH'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF TDI ACTIVE ADVANCE', 'WVWZZZCD4PW20', 'AT', '2WD', 2000, 'HATCHBACK', NULL, NULL, 'petrol', 4535768, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF TDI ACTIVE ADVANCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF TDI ACTIVE ADVANCE PLATINUM EDITION', 'WVWZZZCD7RW01', 'AT', '2WD', 2000, 'HATCHBACK', NULL, NULL, 'diesel', 4579673, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF TDI ACTIVE ADVANCE PLATINUM EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF TDI ACTIVE BASIC', 'WVWZZZCD0RW00', 'AT', '2WD', 2000, 'HATCHBACK', NULL, NULL, 'diesel', 3962886, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF TDI ACTIVE BASIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF TDI STYLE PLATINUM EDITION', 'WVWZZZCD1RW00', 'AT', '2WD', 2000, 'HATCHBACK', NULL, NULL, 'diesel', 5307912, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF TDI STYLE PLATINUM EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF GTI BASE GRADE', 'WVWZZZAUZLW11', 'AT', '2WD', 2000, 'HATCHBACK', NULL, NULL, 'petrol', 5268228, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF GTI BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF R 20 YEARS', '7BA-CDDNFF', 'AT', '2WD', 2000, 'HATCHBACK', NULL, NULL, 'petrol', 9631752, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF R 20 YEARS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF R VARIANT TSI 4MOTION', 'WVWZZZCD9PW51', 'AT', '2WD', 2000, 'HATCHBACK', NULL, NULL, 'petrol', 7933161, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF R VARIANT TSI 4MOTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF VARIANT TDI R LINE', 'WVWZZZCD5PW52', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'diesel', 6097576, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF VARIANT TDI R LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF VARIANT TDI ACTIVE ADVANCE PLATINUM EDITION', 'WVWZZZCD6RW81', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'diesel', 5149599, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF VARIANT TDI ACTIVE ADVANCE PLATINUM EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'POLO GTI', 'WVWZZZAWZPU04', 'AT', '2WD', 2000, 'HATCHBACK', NULL, NULL, 'petrol', 4255871, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'POLO GTI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'GOLF VARIANT TDI ACTIVE ADVANCE', 'WVWZZZCD3RW82', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'diesel', 5240154, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'GOLF VARIANT TDI ACTIVE ADVANCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'PASSAT ALLTRACK TDI 4MOTION', 'WVWZZZ3C4RE01', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'diesel', 8208625, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'PASSAT ALLTRACK TDI 4MOTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'TRANSPORTER', 'WV1ZZZ7HZJH02', 'AT', '2WD', 2500, 'WAGON', NULL, NULL, 'hybrid', 9852334, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'TRANSPORTER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'TOUAREG V6 UPGRADE PACKAGE', 'DBA-7PCGRA', 'AT', '4WD', 3600, 'WAGON', NULL, NULL, 'petrol', 5581899, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'TOUAREG V6 UPGRADE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'ID.4 PRO LAUNCH EDITION', 'ZAA-E2EBJ', 'AT', '2WD', NULL, 'WAGON', NULL, NULL, 'electric', 5549603, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'ID.4 PRO LAUNCH EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'ID.4 LITE', 'WVGZZZE2ZPE07', 'AT', '2WD', NULL, 'WAGON', NULL, NULL, 'electric', 5135034, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'ID.4 LITE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLKSWAGEN', 'ID.4 PRO', 'WVGZZZE2ZPE06', 'AT', '2WD', NULL, 'WAGON', NULL, NULL, 'electric', 6435944, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLKSWAGEN' AND model = 'ID.4 PRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'C40 RECHARGE RECHARGE PLUS SINGLE MOTOR', NULL, 'AT', '2WD', NULL, 'SUV', NULL, '5', 'electric', 8337950, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'C40 RECHARGE RECHARGE PLUS SINGLE MOTOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'C40 RECHARGE RECHARGE ULTIMATE SINGLE MOTOR', 'ZAA-XE400RXCE', 'AT', '2WD', NULL, 'SUV', NULL, '5', 'electric', 8465664, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'C40 RECHARGE RECHARGE ULTIMATE SINGLE MOTOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'C40 RECHARGE RECHARGE ULTIMATE TWIN MOTOR', NULL, 'AT', '2WD', NULL, 'SUV', NULL, '5', 'electric', 9178151, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'C40 RECHARGE RECHARGE ULTIMATE TWIN MOTOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'EX30 ULTRA SINGLE MOTOR EXTENDED RANGE', 'ZAA-2E400R', 'AT', '2WD', NULL, 'SUV', NULL, '5', 'electric', 9472423, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'EX30 ULTRA SINGLE MOTOR EXTENDED RANGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'S60 B5 INSCRIPTION', NULL, 'AT', '2WD', 2000, 'SEDAN', NULL, '5', 'hybrid', 8553208, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'S60 B5 INSCRIPTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'S60 B5 R-DESIGN', NULL, 'AT', '2WD', 2000, 'SEDAN', NULL, '5', 'hybrid', 8584567, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'S60 B5 R-DESIGN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'S60 RECHARGE ULTIMATE T6 AWD PLUG IN HYBRID', NULL, 'AT', '4WD', 2000, 'SEDAN', NULL, '5', 'hybrid', 12002715, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'S60 RECHARGE ULTIMATE T6 AWD PLUG IN HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'S60 T4 MOMENTUM', 'DBA-ZB420', 'AT', '2WD', 2000, 'SEDAN', NULL, '5', 'petrol', 7933865, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'S60 T4 MOMENTUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'S60 T5 INSCRIPTION', 'DBA-ZB420', 'AT', '2WD', 2000, 'SEDAN', NULL, '5', 'petrol', 12985824, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'S60 T5 INSCRIPTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'S60 T6 TWIN ENGINE AWD INSCRIPTION', NULL, 'AT', '4WD', 2000, 'SEDAN', NULL, '5', 'petrol', 7564524, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'S60 T6 TWIN ENGINE AWD INSCRIPTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'S60 ULTIMATE B4', '5AA-ZB420TM', 'AT', '2WD', 2000, 'SEDAN', NULL, '5', 'hybrid', 8610047, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'S60 ULTIMATE B4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'S90 B6 AWD INSCRIPTION', '5AA-PB420TM', 'AT', '4WD', 2000, 'SEDAN', NULL, '5', 'hybrid', 11484589, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'S90 B6 AWD INSCRIPTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'S90 RECHARGE ULTIMATE T8 AWD PLUGIN HYBRID', '5LA-PB420P2A', 'AT', '4WD', 2000, 'SEDAN', NULL, '5', 'hybrid', 12611325, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'S90 RECHARGE ULTIMATE T8 AWD PLUGIN HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'V60', NULL, 'AT', '2WD', 2000, 'S. WAGON', NULL, '5', 'petrol', 12171270, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'V60'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'V60 B5 INSCRIPTION', NULL, 'AT', '2WD', 2000, 'S. WAGON', NULL, '5', 'hybrid', 10330227, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'V60 B5 INSCRIPTION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'V60 B5 R-DESIGN', NULL, 'AT', '2WD', 2000, 'S. WAGON', NULL, '5', 'petrol', 10100260, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'V60 B5 R-DESIGN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'V60 CROSS COUNTRY B5 AWD PRO', NULL, 'AT', '4WD', 2000, 'S. WAGON', NULL, '5', 'hybrid', 12543660, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'V60 CROSS COUNTRY B5 AWD PRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'V60 CROSS COUNTRY D4 CLASSIC', 'LDA-FD4204T', 'AT', '2WD', 2000, 'S. WAGON', NULL, '5', 'diesel', 10218603, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'V60 CROSS COUNTRY D4 CLASSIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'V60 CROSS COUNTRY ULTRA B5 AWD', '5AA-ZB420TM2', 'AT', '4WD', 2000, 'S. WAGON', NULL, '5', 'hybrid', 10528835, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'V60 CROSS COUNTRY ULTRA B5 AWD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'V60 D4 CLASSIC', 'LDA-FD4204T', 'AT', '2WD', 2000, 'S. WAGON', NULL, '5', 'diesel', 3647069, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'V60 D4 CLASSIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'VOLVO', 'V60 D4 CLASSIC', 'LDA-FD4204T', 'AT', '2WD', 2000, 'S. WAGON', NULL, '5', 'diesel', 3859229, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'VOLVO' AND model = 'V60 D4 CLASSIC'
);