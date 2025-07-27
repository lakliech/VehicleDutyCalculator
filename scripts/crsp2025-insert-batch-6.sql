INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'CAPTIVA', NULL, 'AT', '2WD', 2400, 'SUV', NULL, NULL, 'petrol', 5882081, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'CAPTIVA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'COLORADO CREW CAB SHORT Z2', NULL, 'AT', '4WD', 3600, 'D/CAB', NULL, NULL, 'petrol', 9442632, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'COLORADO CREW CAB SHORT Z2'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'CAMARO CONVERTIBLE HERITAGE EDITION', NULL, 'AT', '2WD', 2000, 'CONVERTIBLE', NULL, NULL, 'petrol', 18857431, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'CAMARO CONVERTIBLE HERITAGE EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'CAMARO SS', NULL, 'AT', '2WD', 6200, 'COUPE', NULL, NULL, 'petrol', 11696762, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'CAMARO SS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'CAMARO ZL1', NULL, 'MT', '2WD', 6500, 'COUPE', NULL, NULL, 'petrol', 22138610, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'CAMARO ZL1'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'CAMARO LT RS', NULL, 'AT', '2WD', 2000, 'CONVERTIBLE', NULL, NULL, 'petrol', 20575087, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'CAMARO LT RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'CAMARO FINAL EDITION', NULL, 'AT', '2WD', 6200, 'COUPE', NULL, NULL, 'petrol', 20500228, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'CAMARO FINAL EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'CAMARO CONVERTIBLE', '7BA-A1XC', 'AT', '2WD', 2000, 'CONVERTIBLE', NULL, NULL, 'petrol', 13801293, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'CAMARO CONVERTIBLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'CAMARO LT RS HERITAGE EDITION', 'ABA-A1XC', 'AT', '2WD', 2000, 'COUPE', NULL, NULL, 'petrol', 20624771, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'CAMARO LT RS HERITAGE EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'CAMARO LT RS', NULL, 'AT', '2WD', 2000, 'COUPE', NULL, NULL, 'petrol', 10208057, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'CAMARO LT RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'CHEVELLE MARIBU', NULL, 'AT', '2WD', 6200, 'S. WAGON', NULL, NULL, 'petrol', 22634120, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'CHEVELLE MARIBU'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'CORVETTE 3LT', NULL, 'AT', '2WD', 6200, 'COUPE', NULL, NULL, 'petrol', 22223054, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'CORVETTE 3LT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'CORVETTE', NULL, 'AT', '2WD', 6200, 'COUPE', NULL, NULL, 'petrol', 20018244, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'CORVETTE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'CORVETTE CONVERTIBLE EDITION CERV I', '7BA-Y2XC', 'AT', '2WD', 6200, 'CONVERTIBLE', NULL, NULL, 'petrol', 10234666, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'CORVETTE CONVERTIBLE EDITION CERV I'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'CORVETTE 2LT', NULL, 'AT', '2WD', 6200, 'COUPE', NULL, NULL, 'petrol', 13646222, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'CORVETTE 2LT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'CORVETTE CONVERTIBLE', NULL, 'AT', '2WD', 6200, 'COUPE', NULL, NULL, 'petrol', 26090813, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'CORVETTE CONVERTIBLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'CORVETTE Z06', NULL, 'AT', '2WD', 5500, 'COUPE', NULL, NULL, 'petrol', 40506157, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'CORVETTE Z06'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'CORVETTE 2LT', NULL, 'AT', '2WD', 6200, 'COUPE', NULL, NULL, 'petrol', 26774508, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'CORVETTE 2LT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'CORVETTE Z06 3LZ', NULL, 'AT', '2WD', 5500, 'COUPE', NULL, NULL, 'petrol', 39450464, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'CORVETTE Z06 3LZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'CHEVY VAN', NULL, 'AT', '2WD', 5700, 'VAN', NULL, NULL, 'petrol', 7243404, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'CHEVY VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'CAMARO 2SS', NULL, 'AT', NULL, 6200, 'COUPE', NULL, NULL, 'petrol', 24518398, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'CAMARO 2SS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'CORVETTE STINGRAY', NULL, 'ATM', NULL, 6200, 'CONVERTIBLE', NULL, NULL, 'petrol', 50977981, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'CORVETTE STINGRAY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'CORVETTE  E-RAY 3LZ', NULL, 'ATM', NULL, 6200, 'COUPE', NULL, NULL, 'petrol', 59372297, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'CORVETTE  E-RAY 3LZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'CORVETTE STINGRAY', NULL, 'ATM', NULL, 6200, 'COUPE', NULL, NULL, 'petrol', 46955705, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'CORVETTE STINGRAY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'SILVERADO 1500 LT Trail Boss', NULL, 'ATM', NULL, 6200, 'D/CAB', NULL, NULL, 'petrol', 29954717, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'SILVERADO 1500 LT Trail Boss'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'SILVERADO 1500 LTZ Premium Tech Pack', NULL, 'ATM', NULL, 6200, 'D/CAB', NULL, NULL, 'petrol', 29654920, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'SILVERADO 1500 LTZ Premium Tech Pack'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'SILVERADO 2500 HD LTZ Premium', NULL, 'ATM', NULL, 6200, 'D/CAB', NULL, NULL, 'diesel', 26470712, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'SILVERADO 2500 HD LTZ Premium'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'SILVERADO 1500 LTZ Premium', NULL, 'ATM', NULL, 6200, 'D/CAB', NULL, NULL, 'petrol', 20747315, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'SILVERADO 1500 LTZ Premium'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'SILVERADO 1500 ZR2', NULL, 'ATM', NULL, 6200, 'D/CAB', NULL, NULL, 'petrol', 21939689, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'SILVERADO 1500 ZR2'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'SILVERADO HD LTZ Premium (NB1)', NULL, 'ATM', NULL, 6500, 'D/CAB', NULL, NULL, 'diesel', 25914271, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'SILVERADO HD LTZ Premium (NB1)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHEVROLET', 'SILVERADO HD LTZ Premium (NB2)', NULL, 'ATM', NULL, 6500, 'D/CAB', NULL, NULL, 'diesel', 2591427, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHEVROLET' AND model = 'SILVERADO HD LTZ Premium (NB2)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CHRYSLER', 'CHRYSLER 300', 'ABA-LX36', 'AT', '2WD', 3600, 'SEDAN', NULL, '5', 'petrol', 2357346, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CHRYSLER' AND model = 'CHRYSLER 300'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'BERLINGO DEBUT EDITION', NULL, 'AT', '2WD', 1500, 'VAN', NULL, '7', 'diesel', 4415368, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'BERLINGO DEBUT EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'BERLINGO FEEL', NULL, 'MT', '2WD', 1200, 'VAN', NULL, '7', 'petrol', 7918185, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'BERLINGO FEEL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'BERLINGO MAX BLUE HDI', NULL, 'AT', '2WD', 1500, 'VAN', NULL, '7', 'diesel', 6836295, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'BERLINGO MAX BLUE HDI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'BERLINGO SHINE', '3DA-K9CYH01', 'AT', '2WD', 1500, 'VAN', NULL, '7', 'diesel', 11129014, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'BERLINGO SHINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'BERLINGO SHINE BLUE HDI', NULL, 'AT', '2WD', 1500, 'VAN', NULL, '7', 'diesel', 9467850, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'BERLINGO SHINE BLUE HDI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'BERLINGO SHINE XTR PACK', '3DA-K9CYH01', 'AT', '2WD', 1500, 'VAN', NULL, '7', 'diesel', 11519261, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'BERLINGO SHINE XTR PACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'BERLINGO SURF EDITION BY RIP CURL', '3DA-K9CYH01', 'AT', '2WD', 1500, 'VAN', NULL, '7', 'diesel', 7332815, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'BERLINGO SURF EDITION BY RIP CURL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'C3 AIRCROSS SURF EDITION BY RIP CURL', NULL, 'AT', '2WD', 1500, 'SUV', NULL, '5', 'diesel', 6869614, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'C3 AIRCROSS SURF EDITION BY RIP CURL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'C5 AIRCROSS SHINE', NULL, 'AT', '2WD', 2000, 'SUV', NULL, '5', 'diesel', 7965224, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'C5 AIRCROSS SHINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'C3 AIRCROSS', NULL, 'AT', '2WD', 1500, 'SUV', NULL, '5', 'diesel', 6395027, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'C3 AIRCROSS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'C3 AIRCROSS CUIR', NULL, 'AT', '2WD', 1200, 'SUV', NULL, '5', 'petrol', 5205619, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'C3 AIRCROSS CUIR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'C3 AIRCROSS EDITION  HDI', NULL, 'AT', '2WD', 1500, 'SUV', NULL, '5', 'diesel', 6663819, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'C3 AIRCROSS EDITION  HDI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'C3 AIRCROSS HDI', NULL, 'AT', '2WD', 1500, 'SUV', NULL, '5', 'diesel', 6346308, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'C3 AIRCROSS HDI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'C3 AIRCROSS SHINE PACK', NULL, 'AT', '2WD', 1200, 'SUV', NULL, '5', 'petrol', 5639159, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'C3 AIRCROSS SHINE PACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'C3 EDITION 2021', '5BA-B6HN05', 'AT', '2WD', 1200, 'HATCHBACK', NULL, '5', 'petrol', 6206498, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'C3 EDITION 2021'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'C3 ELLE', NULL, 'AT', '2WD', 1200, 'HATCHBACK', NULL, '5', 'petrol', 3664541, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'C3 ELLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'C3 JCC+', 'ABA-B6HN01', 'AT', '2WD', 1200, 'HATCHBACK', NULL, '5', 'petrol', 5017464, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'C3 JCC+'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'C3 ORIGINS', NULL, 'AT', '2WD', 1200, 'HATCHBACK', NULL, '5', 'petrol', 8247064, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'C3 ORIGINS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'C3 SHINE', '3BA-B6HN05', 'AT', '2WD', 1200, 'HATCHBACK', NULL, '5', 'petrol', 7142918, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'C3 SHINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'C4 CACTUS', NULL, 'AT', '2WD', 1200, 'HATCHBACK', NULL, '5', 'petrol', 7179005, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'C4 CACTUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'C4 FEEL', NULL, 'AT', '2WD', 1200, 'HATCHBACK', NULL, '5', 'petrol', 5185459, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'C4 FEEL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'C4 MAX BLUE HDI', NULL, 'AT', '2WD', 1500, 'HATCHBACK', NULL, '5', 'diesel', 8545368, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'C4 MAX BLUE HDI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'C4 PICASSO SHINE BLUE HDI', 'LDA-B78AH01', 'AT', '2WD', 2000, 'S. WAGON', NULL, '5', 'diesel', 6966211, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'C4 PICASSO SHINE BLUE HDI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'C4 SHINE', NULL, 'AT', '2WD', 1200, 'HATCHBACK', NULL, '5', 'petrol', 5508011, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'C4 SHINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'C4 SHINE BLUE HDI', NULL, 'AT', '2WD', 1500, 'HATCHBACK', NULL, '5', 'diesel', 6389427, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'C4 SHINE BLUE HDI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'C5 AIRCROSS MAX PLUG-IN HYBRID', NULL, 'AT', '2WD', 1600, 'SUV', NULL, '5', 'hybrid', 9060834, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'C5 AIRCROSS MAX PLUG-IN HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'C5 AIRCROSS PLUG-IN HYBRID', NULL, 'AT', '2WD', 1600, 'SUV', NULL, '5', 'hybrid', 8114180, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'C5 AIRCROSS PLUG-IN HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'C5 AIRCROSS PLUG-IN HYBRID EDITION NOIRE', '3LA-C845G06H', 'AT', '2WD', 1600, 'SUV', NULL, '5', 'hybrid', 13374677, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'C5 AIRCROSS PLUG-IN HYBRID EDITION NOIRE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'C5 AIRCROSS SHINE NAPPA LEATHER PACKAGE', NULL, 'AT', '2WD', 2000, 'SUV', NULL, '5', 'diesel', 7377240, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'C5 AIRCROSS SHINE NAPPA LEATHER PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'C5 AIRCROSS SHINE PACK BLUE HDI', NULL, 'AT', '2WD', 2000, 'SUV', NULL, '5', 'diesel', 9041235, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'C5 AIRCROSS SHINE PACK BLUE HDI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'C5 X HYPNOS PLUG-IN HYBRID', '3LA-E435G06H', 'AT', '2WD', 1600, 'S. WAGON', NULL, '5', 'hybrid', 13827425, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'C5 X HYPNOS PLUG-IN HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'C5 X SHINE PACK', NULL, 'AT', '2WD', 1600, 'S. WAGON', NULL, '5', 'petrol', 7418399, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'C5 X SHINE PACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'E-C4 MAX', NULL, 'AT', '2WD', NULL, 'HATCHBACK', NULL, '5', 'electric(ev)', 7375117, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'E-C4 MAX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'E-C4 SHINE', 'ZAA-C41ZK01', 'AT', '2WD', NULL, 'HATCHBACK', NULL, '5', 'electric(ev)', 7186472, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'E-C4 SHINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'GRAND C4 PICASSO DUNE BEIGE', 'LDA-B787AH01', 'AT', '2WD', 2000, 'S. WAGON', NULL, '5', 'diesel', 5035384, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'GRAND C4 PICASSO DUNE BEIGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'GRAND C4 PICASSO SHINE BLUE HDI', 'LDA-B787AH01', 'AT', '2WD', 2000, 'S. WAGON', NULL, '5', 'diesel', 9223174, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'GRAND C4 PICASSO SHINE BLUE HDI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'GRAND C4 PICASSO WILD BLUE', 'LDA-B787AH01', 'AT', '2WD', 2000, 'S. WAGON', NULL, '5', 'diesel', 5882081, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'GRAND C4 PICASSO WILD BLUE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'GRAND C4 SPACETOURER SHINE', NULL, 'AT', '2WD', 1600, 'VAN', NULL, '7', 'petrol', 7898586, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'GRAND C4 SPACETOURER SHINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'CITROEN', 'GRAND C4 SPACETOURER SHINE BLUE HDI', 'LDA-B787AH01', 'AT', '2WD', 200, 'VAN', NULL, '7', 'diesel', 10854746, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'CITROEN' AND model = 'GRAND C4 SPACETOURER SHINE BLUE HDI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'ALTIS G', '6AA-AXVH70N-DEXNB', 'CVT', '4WD', 2497, 'SEDAN', '1845', '5', 'petrol', 5798644, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'ALTIS G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'ALTIS G', 'DAA-AXVH70N-DEXNB', 'CVT', '2WD', 2487, 'SEDAN', '1845', '5', 'petrol', 5658917, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'ALTIS G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'ATRAI', 'ABA-S331G-ZQCZ', 'CVT', '4WD', 658, 'WAGON', '1310', '4', 'petrol', 3160610, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'ATRAI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'ATRAI SA III', '3BA-S331G-ZQCZ', 'CVT', '4WD', 658, 'WAGON', '1310', '4', 'petrol', 3177377, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'ATRAI SA III'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'ATRAI RAR SEAT LIFT', '3BA-S331G-ZQCZ', '4AT', '4WD', 658, 'WAGON', '1310', '4', 'petrol', 3177377, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'ATRAI RAR SEAT LIFT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'ATRAI RAR SEAT LIFT', 'ABA-S331G-ZQCZ', 'CVT', '4WD', 658, 'WAGON', '1290', '4', 'petrol', 2959404, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'ATRAI RAR SEAT LIFT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'ATRAI RS', '3BD-S700V-ZBXZ', 'CVT', '2WD', 658, 'VAN', '1430', '4', 'petrol', 2803469, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'ATRAI RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'ATRAI SLOPER', '3BD-S710V-ZBXZ', 'CVT', '4WD', 658, 'VAN', '1290', '4', 'petrol', 3688776, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'ATRAI SLOPER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'ATRAI SLOPER', '3BA-S331G-ZQCZ', '4AT', '2WD', 658, 'WAGON', '1320', '4', 'petrol', 3454035, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'ATRAI SLOPER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'ATRAI SLOPER', '3BD-S710-ZBXZ', 'CVT', '4WD', 658, 'WAGON', '1290', '4', 'petrol', 3688776, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'ATRAI SLOPER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'ATRAI SLOPER', 'ABA-S331G-ZQCZ', 'CVT', '2WD', 658, 'WAGON', '980', '4', 'petrol', 3437268, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'ATRAI SLOPER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'ATRAI SLOPER', 'ABA-S331G-ZQCZ', '4AT', '4WD', 658, 'WAGON', '1320', '4', 'petrol', 3437268, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'ATRAI SLOPER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'ATRAI SLOPER WITH REAR SEAT', 'ABA-S331G-ZQCZ', 'CVT', '2WD', 658, 'WAGON', '1320', '4', 'petrol', 3267920, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'ATRAI SLOPER WITH REAR SEAT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'ATRAI WAGON CUSTOM TURBO RS', 'ABA-S321G-ZQXZ', 'CVT', '2WD', 658, 'WAGON', '1200', '4', 'petrol', 2371356, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'ATRAI WAGON CUSTOM TURBO RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'ATRAI WAGON CUSTOM TURBO RS LIMITED', '3BA-S321G-ZQXZ', 'CVT', '2WD', 658, 'WAGON', '1230', '4', 'petrol', 2565376, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'ATRAI WAGON CUSTOM TURBO RS LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'ATRAI WAGON RS', '3BA-S321G-ZQXZ', '4AT', '2WD', 658, 'WAGON', '1230', '4', 'petrol', 2821913, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'ATRAI WAGON RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'ATRAI WAGON RS', 'ABA-S321G-ZQXZ', '4AT', '2WD', 658, 'WAGON', '1230', '4', 'petrol', 2565376, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'ATRAI WAGON RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'BOON  STYLESA III', '5BA-M700S-GBSE', 'CVT', '2WD', 996, 'HATCHBACK', '1185', '5', 'petrol', 2600587, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'BOON  STYLESA III'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'BOON  XL SA III', '5BA-M700S-GBNE', 'CVT', '2WD', 996, 'HATCHBACK', '1185', '5', 'petrol', 2305485, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'BOON  XL SA III'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'BOON CILQ', '5BA-M700S-GBSE', 'CVT', '2WD', 996, 'HATCHBACK', '1185', '5', 'petrol', 2632444, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'BOON CILQ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'BOON CILQ G PACKAGEV SA III 2WD', '5BA-M700S-GBSE', 'CVT', '2WD', 996, 'HATCHBACK', '1185', '5', 'petrol', 2632444, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'BOON CILQ G PACKAGEV SA III 2WD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'BOON CILQG SA II', 'DBA-M700S-GBSE', 'CVT', '2WD', 996, 'HATCHBACK', '1185', '5', 'petrol', 2573759, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'BOON CILQG SA II'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'BOON CLIQ G SA III', '5BA-M700S-GBSE', 'CVT', '2WD', 996, 'HATCHBACK', '1185', '5', 'petrol', 2895689, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'BOON CLIQ G SA III'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'BOON STYLE', '5BA-M700S-GBSE', 'CVT', '2WD', 996, 'HATCHBACK', '1185', '5', 'petrol', 2364170, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'BOON STYLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'BOON STYLESA III', '5BA-M700S-GBSE', 'CVT', '2WD', 996, 'HATCHBACK', '1185', '5', 'petrol', 2364170, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'BOON STYLESA III'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'BOON X', '5BA-M700S-GBNE', 'CVT', '2WD', 996, 'HATCHBACK', '1185', '5', 'petrol', 2095895, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'BOON X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'BOON X L PACKAGE', '5BA-M700S-GBNE', 'CVT', '2WD', 996, 'HATCHBACK', '1185', '5', 'petrol', 2095895, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'BOON X L PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'BOON XL SA II', 'DBA-M700S-GBNE', 'CVT', '2WD', 996, 'HATCHBACK', '1185', '5', 'petrol', 2053977, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'BOON XL SA II'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'DAIHATSU', 'CAST ACTIVA G', 'DBA-LA250S-GBGF', 'CVT', '2WD', 658, 'WAGON', '1060', '4', 'petrol', 2297101, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'DAIHATSU' AND model = 'CAST ACTIVA G'
);