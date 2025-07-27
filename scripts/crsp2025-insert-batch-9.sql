INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER R/T', '2C3CDZBT7KH65', 'AT', '2WD', 5700, 'COUPE', NULL, NULL, 'petrol', 11489692, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER R/T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER R/T', '2C3CDZBT3MH58', 'AT', '2WD', 5700, 'COUPE', NULL, NULL, 'petrol', 17504350, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER R/T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER R/T', '2C3CDZFJ9HH50', 'AT', '2WD', 6400, 'COUPE', NULL, NULL, 'petrol', 11580082, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER R/T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER R/T', '2C3CDZFJXKH55', 'AT', '2WD', 6400, 'COUPE', NULL, NULL, 'petrol', 13375045, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER R/T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER R/T', '2C3CDZFJXKH56', 'AT', '2WD', 6400, 'COUPE', NULL, NULL, 'petrol', 18466043, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER R/T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER R/T', '2C3CDZFJ2MH55', 'AT', '2WD', 6400, 'COUPE', NULL, NULL, 'petrol', 17903697, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER R/T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER R/T', '2C3CDZFJ0NH25', 'MT', '2WD', 6400, 'COUPE', NULL, NULL, 'petrol', 28459356, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER R/T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER R/T', '2C3CDZFJ1PH58', 'AT', '2WD', 6400, 'COUPE', NULL, NULL, 'petrol', 29967590, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER R/T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER R/T', '2C3CDZFJ0PH68', 'AT', '2WD', 6400, 'COUPE', NULL, NULL, 'petrol', 24725941, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER R/T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER R/T', '2C3CDZFJ3PH67', 'AT', '2WD', 6400, 'D/CAB', NULL, NULL, 'petrol', 21263450, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER R/T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER R/T', '2C3CDZF2PH68*', 'AT', '2WD', 6400, 'COUPE', NULL, NULL, 'petrol', 21263450, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER R/T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER R/T PLUS', '2C3CDZBT6KH57', 'AT', '2WD', 5700, 'COUPE', NULL, NULL, 'petrol', 12432368, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER R/T PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER R/T PLUS', '2C3CDZBT0KH52', 'AT', '2WD', 5700, 'COUPE', NULL, NULL, 'petrol', 13549899, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER R/T PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER R/T PLUS', '2C3CDZBT0MH56', 'AT', '2WD', 5700, 'COUPE', NULL, NULL, 'petrol', 16241109, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER R/T PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER R/T PLUS', '2C3CDZBT3NH21', 'AT', '2WD', 5700, 'COUPE', NULL, NULL, 'petrol', 15298432, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER R/T PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER R/T PLUS', 'H60', 'mt', '2WD', 5700, 'COUPE', NULL, NULL, 'petrol', 12658591, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER R/T PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER R/T PLUS', '2C3CDZBT8PH65', 'AT', '2WD', 5700, 'COUPE', NULL, NULL, 'petrol', 15486869, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER R/T PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER SRT HELLCA', '2C3CDZC96PH54', 'AT', '2WD', 6200, 'COUPE', NULL, NULL, 'petrol', 29609486, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER SRT HELLCA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER SRT HELLCAT', '2C3CDZL97KH53', 'AT', '2WD', 6100, 'COUPE', NULL, NULL, 'petrol', 33776330, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER SRT HELLCAT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER SRT HELLCAT', '2C3CDZC96GH15', 'AT', '2WD', 6200, 'COUPE', NULL, NULL, 'petrol', 14419720, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER SRT HELLCAT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER SRT HELLCAT', '2C3CDZC90KH58', 'AT', '2WD', 6200, 'COUPE', NULL, NULL, 'petrol', 21143423, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER SRT HELLCAT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER SRT HELLCAT', '2C3CDZC95KH61', 'AT', '2WD', 6200, 'COUPE', NULL, NULL, 'petrol', 23011736, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER SRT HELLCAT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER SRT HELLCAT', '2C3CDZL97MH62', 'AT', '2WD', 6200, 'COUPE', NULL, NULL, 'petrol', 34681468, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER SRT HELLCAT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER SRT HELLCAT', '2C3CDZC94LH25', 'AT', '2WD', 6200, 'COUPE', NULL, NULL, 'petrol', 25668618, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER SRT HELLCAT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER SRT HELLCAT', '2C3CDZC9XPH52', 'A', '2WD', 6200, 'COUPE', NULL, NULL, 'petrol', 34681468, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER SRT HELLCAT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER SRT HELLCAT', '2C3CDZC96PH62', 'AT', '2WD', 6200, 'COUPE', NULL, NULL, 'petrol', 32216480, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER SRT HELLCAT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER SRT HELLCAT', '2C3CDZC91PH69', 'AT', '2WD', 6200, 'COUPE', NULL, NULL, 'petrol', 31873688, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER SRT HELLCAT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER SXT', '2C3CDZAGXHH56', 'AT', '2WD', 3600, 'COUPE', NULL, NULL, 'petrol', 6677767, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER SXT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER SXT', '2C3CDZAG6KH53', 'AT', '2WD', 3600, 'COUPE', NULL, NULL, 'petrol', 7584881, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER SXT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER SXT', '2C3CDZAG9LH11', 'AT', '2WD', 3600, 'COUPE', NULL, NULL, 'petrol', 8284294, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER SXT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER SXT', '2C3CDZAG8JH30', 'AT', '2WD', 3600, 'COUPE', NULL, NULL, 'petrol', 7567840, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER SXT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER SXT PLUS', '2C3CDZAG6GH10', 'AT', '2WD', 3600, 'COUPE', NULL, NULL, 'petrol', 9453194, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER SXT PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARENGER SXT PLUS', '2C3CDZAG5MH66', 'AT', '2WD', 3600, 'COUPE', NULL, NULL, 'petrol', 10169895, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARENGER SXT PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARGER', '2C3CDXL99MH61', 'AT', '2WD', 6200, 'COUPE', NULL, NULL, 'petrol', 34153450, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARGER', '2C3CDXL99PH58', 'AT', '2WD', 6200, 'COUPE', NULL, NULL, 'petrol', 39604280, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARGER', '2C3CDXEJ1JH29', 'AT', '2WD', 6400, 'COUPE', NULL, NULL, 'petrol', 13601515, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARGER', '2C3CDXGJXPH63', 'AT', '2WD', 6400, 'COUPE', NULL, NULL, 'petrol', 22463220, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARGER SXT', '2C3CDXHG6JH17', 'AT', '2WD', 3600, 'SEDAN', NULL, NULL, 'petrol', 8322080, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARGER SXT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'CHARGER SXT', '2C3CDXJG0KH74', 'AT', '2WD', 3600, 'COUPE', NULL, NULL, 'petrol', 11664545, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'CHARGER SXT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO', '1C4SDJGJ0JC46', 'AT', '4WD', 6400, 'SUV', NULL, NULL, 'petrol', 14784245, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO CITADEL', '1C4SDJET5KC82', 'AT', '2WD', 5700, 'SUV', NULL, NULL, 'petrol', 9641877, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO CITADEL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'DURANGO RT', '1C4SDJCT9KC77', 'AT', '4WD', 5700, 'SUV', NULL, NULL, 'petrol', 10841648, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'DURANGO RT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'RAM', '1C6RREFT9KN55', 'AT', '2WD', 5700, 'D/CAB', NULL, NULL, 'petrol', 13014966, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'RAM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'RAM', '1C6SRFLT1KN83', 'AT', '2WD', 5700, 'D/CAB', NULL, NULL, 'petrol', 15260646, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'RAM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'RAM BASE GRADE', '2B6HB21Y9LK71', 'AT', '2WD', 5200, 'WAGON', NULL, NULL, 'petrol', 4328114, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'RAM BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'RAM RARAMY', '1C6RR7PT7HS81', 'AT', '4WD', 5700, 'COUPE', NULL, NULL, 'petrol', 8887637, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'RAM RARAMY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DODGE', 'RAM RARAMY', '1C6SRFJT8KN72', 'AT', '2WD', 5700, 'D/CAB', NULL, NULL, 'petrol', 14695089, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DODGE' AND model = 'RAM RARAMY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DONGFENG', 'FENGSHEN E70', NULL, 'AT', 'FWD', NULL, 'SEDAN', '1,600', '5', 'electric', 3482882, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DONGFENG' AND model = 'FENGSHEN E70'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DONGFENG', 'FORTHING T5 EVO', NULL, 'AT', 'FWD', 1500, 'SUV', '1,700', '5', 'petrol', 3869869, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DONGFENG' AND model = 'FORTHING T5 EVO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DONGFENG', 'FENGON E3 EV', NULL, 'AT', 'FWD', NULL, 'SUV', '1,800', '5', 'electric', 3905049, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DONGFENG' AND model = 'FENGON E3 EV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DONGFENG', 'EX1 NANO BOX', NULL, 'AT', 'FWD', NULL, 'SUV', '1,200', '4', 'electric', 1583128, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DONGFENG' AND model = 'EX1 NANO BOX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DONGFENG', 'EΠ 007', NULL, 'AT', 'RWD/AWD', NULL, 'SEDAN', '2,300', '5', 'electric', 4221675, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DONGFENG' AND model = 'EΠ 007'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DONGFENG', 'NAMMI 01', NULL, 'AT', 'FWD', NULL, 'HATCHBACK', '1,500', '5', 'electric', 2005296, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DONGFENG' AND model = 'NAMMI 01'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DONGFENG', 'LINGXI L', NULL, 'AT', 'FWD', NULL, 'SEDAN', '1,700', '5', 'electric', 3482882, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DONGFENG' AND model = 'LINGXI L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DONGFENG', 'EΠ 008', NULL, 'AT', 'RWD/AWD', NULL, 'SUV', '2,600', '5', 'electric', 4327217, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DONGFENG' AND model = 'EΠ 008'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DONGFENG', 'AEOLUS SKY EV01', NULL, 'AT', 'FWD', NULL, 'SUV', '2,000', '5', 'electric', 4010591, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DONGFENG' AND model = 'AEOLUS SKY EV01'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DONGFENG', 'FORTHING XINGHAI S7', NULL, 'AT', 'FWD', NULL, 'SEDAN', '2,000', '5', 'electric', 4854926, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DONGFENG' AND model = 'FORTHING XINGHAI S7'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', 'PRO 6042HT TRUCK', 'MAN', '4WD', '260 HP', NULL, '3', NULL, NULL, 'diesel', 7925409, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = 'PRO 6042HT TRUCK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', 'PRO 60', 'MAN', '4WD', NULL, NULL, '3', NULL, NULL, 'diesel', 8334839, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = 'PRO 60'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', 'PRO 6028', 'MAN', '4WD', NULL, NULL, '3', NULL, NULL, 'diesel', 6770229, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = 'PRO 6028'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', 'PRO 6019', 'MAN', '4WD', NULL, NULL, '3', NULL, NULL, 'diesel', 5907500, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = 'PRO 6019'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', 'PRO 6035T', 'MAN', '4WD', '191HP', NULL, '3', NULL, NULL, 'diesel', 7157726, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = 'PRO 6035T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', 'PRO 6035TM', 'MAN', '4WD', '191HP', NULL, '3', NULL, NULL, 'diesel', 5980613, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = 'PRO 6035TM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', 'PRO 6042HT', 'MAN', '4WD', '260 HP', NULL, '3', NULL, NULL, 'diesel', 7925409, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = 'PRO 6042HT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', 'PRO 8028XM', 'MAN', '4WD', '258HP', NULL, '3', NULL, NULL, 'diesel', 10279635, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = 'PRO 8028XM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', 'PRO 8035XM', 'MAN', '4WD', '258HP', NULL, '3', NULL, NULL, 'diesel', 13174895, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = 'PRO 8035XM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', 'PRO 6019T', 'MAN', '4WD', '154.5HP', NULL, '3', NULL, NULL, 'diesel', 6214573, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = 'PRO 6019T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', 'PRO 6028T', 'MAN', '4WD', '191HP', NULL, '3', NULL, NULL, 'diesel', 8758892, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = 'PRO 6028T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', 'ICHER PRO 6055 4X2', 'MAN', '4WD', '191HP', NULL, '3', NULL, NULL, 'diesel', 7309800, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = 'ICHER PRO 6055 4X2'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', 'PRO 8055', 'MAN', '4WD', '248HP', NULL, '3', NULL, NULL, 'diesel', 8709176, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = 'PRO 8055'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', 'PRO 2049', 'MAN', '4WD', '75HP', NULL, '3', NULL, NULL, 'diesel', 2149511, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = 'PRO 2049'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', 'PRO 2049CNG', 'MAN', '4WD', '75HP', NULL, '3', NULL, NULL, 'diesel', 2193379, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = 'PRO 2049CNG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', 'PRO 2050', 'MAN', '4WD', '285HP', NULL, '3', NULL, NULL, 'diesel', 2778280, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = 'PRO 2050'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', 'PRO 2055', 'MAN', '4WD', '70HP', NULL, '3', NULL, NULL, 'diesel', 2705167, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = 'PRO 2055'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', 'PRO 2050 CNG', 'MAN', '4WD', '285HP', NULL, '3', NULL, NULL, 'diesel', 2807525, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = 'PRO 2050 CNG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', 'PRO 2055DSD', 'MAN', '4WD', '90HP', NULL, '3', NULL, NULL, 'diesel', 2807525, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = 'PRO 2055DSD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', 'PRO 2055K', 'MAN', '4WD', '75HP', NULL, '3', NULL, NULL, 'diesel', 2582338, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = 'PRO 2055K'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', 'PRO 2059', 'MAN', '4WD', '70HP', NULL, '3', NULL, NULL, 'diesel', 2573564, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = 'PRO 2059'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', 'PRO 2059 CNG', 'MAN', '4WD', '70HP', NULL, '3', NULL, NULL, 'diesel', 2529697, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = 'PRO 2059 CNG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', 'PRO 2059XP', 'MAN', '4WD', '90HP', NULL, '3', NULL, NULL, 'diesel', 3091202, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = 'PRO 2059XP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', 'PRO 2059XP CNG', 'MAN', '4WD', '70HP', NULL, '3', NULL, NULL, 'diesel', 2968373, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = 'PRO 2059XP CNG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', 'PRO 2075', 'MAN', '4WD', '90HP', NULL, '3', NULL, NULL, 'diesel', 3692188, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = 'PRO 2075'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', 'PRO 2075 CNG', 'MAN', '4WD', '70HP', NULL, '3', NULL, NULL, 'diesel', 3216956, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = 'PRO 2075 CNG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', 'PRO 2080XP', 'MAN', '4WD', '90HP', NULL, '3', NULL, NULL, 'diesel', 3392426, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = 'PRO 2080XP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', 'PRO 2090', 'MAN', '4WD', '90HP', NULL, '3', NULL, NULL, 'diesel', 3524029, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = 'PRO 2090'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', 'PRO 2095', 'MAN', '4WD', '90HP', NULL, '3', NULL, NULL, 'diesel', 3582519, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = 'PRO 2095'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', 'PRO 2095XP', 'MAN', '4WD', '90HP', NULL, '3', NULL, NULL, 'diesel', 3443605, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = 'PRO 2095XP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'EICHER', '2095XP CNG', 'MAN', '4WD', '70HP', NULL, '3', NULL, NULL, 'diesel', 3719970, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'EICHER' AND model = '2095XP CNG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CAMINHÃO TIPPER CA3312P2K2 HLQ', NULL, 'MT', '8X4', 340, 'TRK', '80000', NULL, 'diesel', 10533518, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CAMINHÃO TIPPER CA3312P2K2 HLQ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'BACK DUMPER CA3252P2K2 J5P', NULL, 'MT', '6X4', 7700, 'TRK', NULL, NULL, 'diesel', 6360413, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'BACK DUMPER CA3252P2K2 J5P'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA3310P6', NULL, 'MT', '8X4', 8600, 'TRK', NULL, NULL, 'diesel', 11943039, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA3310P6'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA3120PK', NULL, 'MT', '4X4', 8600, 'TRK', NULL, NULL, 'diesel', 5343089, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA3120PK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA6371', NULL, 'MT', '4X4', 7100, 'VAN', NULL, NULL, 'diesel', 1125000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA6371'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA1024V MINI', NULL, 'MT', '4X4', 1100, 'S/CAB', NULL, NULL, 'diesel', 840000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA1024V MINI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA1021 DJA ADMIRAL', NULL, 'MT', '4X4', 970, 'S/CAB', NULL, NULL, 'diesel', 2543220, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA1021 DJA ADMIRAL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA1021 DJA ADMIRAL', NULL, 'MT', '4X4', 970, 'DOUBLE  CAB', NULL, NULL, 'diesel', 2949180, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA1021 DJA ADMIRAL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'BQ2023 GRAND TIGER', NULL, 'MT', '4X4', 2237, 'DOUBLE  CAB', NULL, NULL, 'diesel', 3963600, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'BQ2023 GRAND TIGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA1223', NULL, 'MT', '6X4', 2237, 'TRK', NULL, NULL, 'diesel', 5040000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA1223'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA3250', NULL, 'MT', '6X4', NULL, 'TIPPER', NULL, NULL, 'diesel', 6960000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA3250'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FAW', 'CA3320', NULL, 'MT', '6X4', 8000, 'TIPPER', NULL, NULL, 'diesel', 7440000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FAW' AND model = 'CA3320'
);