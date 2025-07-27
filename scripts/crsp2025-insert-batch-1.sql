INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AIWAYS', 'U5', NULL, 'AT', 'FWD', NULL, 'SUV', '2,155', '5', 'electric', 5910345, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AIWAYS' AND model = 'U5'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AIWAYS', 'U6', NULL, 'AT', 'FWD', NULL, 'SUV', '1,820', '5', 'electric', 8232266, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AIWAYS' AND model = 'U6'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', '3.0TFSI QUATTRO S LINE PACKAGE', 'WAUZZZ4M8JD01', 'AT', '4WD', 3000, 'SUV', NULL, NULL, 'petrol', 16210629, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = '3.0TFSI QUATTRO S LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A1 SPORTBACK 1.0 TFSI', 'DBA-8XCHZ', 'AT', '2WD', 1000, 'HATCHBACK', NULL, NULL, 'petrol', 5953578, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A1 SPORTBACK 1.0 TFSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A1 SPORTBACK 1ST EDITION', '3BA-GBDAD', 'AT', '2WD', 1500, 'HATCHBACK', NULL, NULL, 'petrol', 8573479, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A1 SPORTBACK 1ST EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A1 SPORTBACK 25 TFSI', '3BA-GBDKL', 'AT', '2WD', 1500, 'HATCHBACK', NULL, NULL, 'petrol', 6633385, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A1 SPORTBACK 25 TFSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A1 SPORTBACK 25 TFSI ADVANCED', 'WAUZZZGB4NR02', 'AT', '2WD', 990, 'HATCHBACK', NULL, NULL, 'petrol', 6211139, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A1 SPORTBACK 25 TFSI ADVANCED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A1 SPORTBACK 25 TFSI S LINE', '3BA-GBDKL', 'AT', '2WD', 1000, 'HATCHBACK', NULL, NULL, 'petrol', 9024534, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A1 SPORTBACK 25 TFSI S LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A1 SPORTBACK 35 TFSI ADVANCED', 'WAUZZZGB8LR00', 'AT', '2WD', 1500, 'HATCHBACK', NULL, NULL, 'petrol', 5688277, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A1 SPORTBACK 35 TFSI ADVANCED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A1 SPORTBACK 35 TFSI S LINE', '3BA-GBDAD', 'AT', '2WD', 1500, 'HATCHBACK', NULL, NULL, 'petrol', 7845191, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A1 SPORTBACK 35 TFSI S LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A1 SPORTBACK CITYCARVER BLACK STYLE PLUS', '3BA-GBDKR', 'AT', '2WD', 1000, 'HATCHBACK', NULL, NULL, 'petrol', 8158328, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A1 SPORTBACK CITYCARVER BLACK STYLE PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A1 SPORTBACK CITYCARVER LIMITED EDITION', '3BA-GBDKR', 'AT', '2WD', 990, 'HATCHBACK', NULL, NULL, 'petrol', 11355485, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A1 SPORTBACK CITYCARVER LIMITED EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A1 SPORTBACK MIDNIGHT LIMITED', 'DBA-8XCHZ', 'AT', '2WD', 1000, 'HATCHBACK', NULL, NULL, 'petrol', 5429426, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A1 SPORTBACK MIDNIGHT LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A3 SEDAN 1.4 TFSI', 'WAUZZZ8V1J109', 'AT', '2WD', 1400, 'SEDAN', NULL, NULL, 'petrol', 6619134, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A3 SEDAN 1.4 TFSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A3 SEDAN 1.4 TFSI SPORT S LINE PACKAGE', '8VCXSL', 'AT', '2WD', 1400, 'SEDAN', NULL, NULL, 'petrol', 8844309, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A3 SEDAN 1.4 TFSI SPORT S LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A3 SEDAN 30 TFSI ADVANCED', 'WAUZZZGYXMA10', 'AT', '2WD', 1000, 'SEDAN', NULL, NULL, 'petrol', 6875789, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A3 SEDAN 30 TFSI ADVANCED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A3 SEDAN 30 TFSI SPORT', 'DBA-8VCXSL', 'AT', '2WD', 1400, 'SEDAN', NULL, NULL, 'petrol', 6912446, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A3 SEDAN 30 TFSI SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A3 SEDAN 40 TFSI QUATTRO S LINE', 'WAUZZZGY8PA09', 'AT', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 7644850, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A3 SEDAN 40 TFSI QUATTRO S LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A3 SEDAN 40 TFSI QUATTRO SIGNATURE EDITION', 'ABA-8VCZPL', 'AT', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 7406694, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A3 SEDAN 40 TFSI QUATTRO SIGNATURE EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A3 SEDAN S LINE BLACK STYLING', 'WAUZZZ8V8KA09', 'AT', '2WD', 1400, 'SEDAN', NULL, NULL, 'petrol', 7433050, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A3 SEDAN S LINE BLACK STYLING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A3 SEDAN S LINE TECHNO LIMITED', 'DBA-8VCXSL', 'AT', '2WD', 1400, 'SEDAN', NULL, NULL, 'petrol', 9227978, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A3 SEDAN S LINE TECHNO LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A3 SPORTBACK 30 TFSI', 'WAUZZZ8V9LA04', 'AT', '2WD', 1400, 'HATCHBACK', NULL, NULL, 'petrol', 5353748, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A3 SPORTBACK 30 TFSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A3 SPORTBACK 30 TFSI ADVANCED', 'WAUZZZGY4NA06', 'AT', '2WD', 1000, 'HATCHBACK', NULL, NULL, 'petrol', 4706728, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A3 SPORTBACK 30 TFSI ADVANCED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A3 SPORTBACK 30 TFSI S LINE', 'WAUZZZGY0NA08', 'AT', '2WD', 1000, 'HATCHBACK', NULL, NULL, 'petrol', 7929361, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A3 SPORTBACK 30 TFSI S LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A3 SPORTBACK 30 TFSI SPORT', 'WAUZZZ8VXLA05', 'AT', '2WD', 1000, 'HATCHBACK', NULL, NULL, 'petrol', 5161437, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A3 SPORTBACK 30 TFSI SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A3 SPORTBACK 30 TFSI SPORT SIGNATURE EDITION', 'WAUZZZ8V8LA05', 'AT', '2WD', 1400, 'HATCHBACK', NULL, NULL, 'petrol', 3806292, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A3 SPORTBACK 30 TFSI SPORT SIGNATURE EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A3 SPORTBACK 40 TFSI QUATTRO ADVANCED', 'WAUZZZGY4PA07', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'petrol', 8220506, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A3 SPORTBACK 40 TFSI QUATTRO ADVANCED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A3 SPORTBACK 40 TFSI QUATTRO S LINE', 'WAUZZZGY4PA06', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'petrol', 8105314, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A3 SPORTBACK 40 TFSI QUATTRO S LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A3 SPORTBACK S LINE TECHNO LIMITED', 'WAUZZZ8V8JA10', 'AT', '2WD', 1400, 'HATCHBACK', NULL, NULL, 'petrol', 9285474, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A3 SPORTBACK S LINE TECHNO LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A4 2.0TFSI QUATTRO TUXEDO STYLE', 'DBA-8WCYRF', 'AT', '4WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 9857611, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A4 2.0TFSI QUATTRO TUXEDO STYLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A4 35TDI S-LINE', 'WAUZZZF41RA09', 'AT', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 8502190, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A4 35TDI S-LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A4 35TFSI ADVANCED', '3AA-8WDEM', 'AT', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 7192943, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A4 35TFSI ADVANCED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A4 35TFSI MEISTERSTUECK', 'WAUZZZF44KA12', 'AT', '2WD', 1400, 'SEDAN', NULL, NULL, 'petrol', 9081614, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A4 35TFSI MEISTERSTUECK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A4 35TFSI MEISTERSTUECK', 'WAUZZZF43SA00', 'AT', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 7881867, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A4 35TFSI MEISTERSTUECK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A4 35TFSI SPORT', 'ABA-8WCVN', 'AT', '2WD', 1400, 'SEDAN', NULL, NULL, 'petrol', 10539104, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A4 35TFSI SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A4 40TFSI MEISTERSTUECK S LINE PACKAGE', 'WAUZZZF43KA12', 'AT', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 9026879, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A4 40TFSI MEISTERSTUECK S LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A4 45TFSI QUATTRO ADVANCED', 'WAUZZZF41NA00', 'AT', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 8242398, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A4 45TFSI QUATTRO ADVANCED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A4 45TFSI QUATTRO S-LINE', 'WAUZZZF48MA02', 'AT', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 10058141, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A4 45TFSI QUATTRO S-LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A4 45TFSI QUATTRO SPORT S LINE PACKAGE', 'WAUZZZF42KA04', 'AT', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 9321458, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A4 45TFSI QUATTRO SPORT S LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A4 ALLROAD QUATTRO', '8WDDWA', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'hybrid', 9847057, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A4 ALLROAD QUATTRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A4 ALLROAD QUATTRO ABSOLUTE', 'ABA-8WCYRA', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'petrol', 10883478, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A4 ALLROAD QUATTRO ABSOLUTE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A4 ALLROAD QUATTRO BASE GRADE', 'WAUZZZF48PA08', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'petrol', 11549975, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A4 ALLROAD QUATTRO BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A4 AVANT 1.4TFSI TUXEDO STYLE', 'ABA-8WCVN', 'AT', '2WD', 1400, 'WAGON', NULL, NULL, 'petrol', 9680753, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A4 AVANT 1.4TFSI TUXEDO STYLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A4 AVANT 35 TDI ADVANCED', 'WAUZZZF49PA00', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'hybrid', 7576148, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A4 AVANT 35 TDI ADVANCED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A4 AVANT 35 TDI S-LINE', 'WAUZZZF43RA04', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'diesel', 8797707, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A4 AVANT 35 TDI S-LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A4 AVANT 35 TFSI SPORT', 'WAUZZZF47KA03', 'AT', '2WD', 1400, 'WAGON', NULL, NULL, 'petrol', 8051262, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A4 AVANT 35 TFSI SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A4 AVANT 45 TFSI QUATTRO MEISTERSTUECK', 'WAUZZZF48KA09', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'petrol', 9630110, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A4 AVANT 45 TFSI QUATTRO MEISTERSTUECK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A4 AVANT BLACK STYLE PLUS', 'WAUZZZF47PA05', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'petrol', 9981246, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A4 AVANT BLACK STYLE PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A4 BLACK STYLE PLUS', 'WAUZZZF40PA03', 'AT', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 8795860, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A4 BLACK STYLE PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A5 45TFSI QUATTRO SPORT', 'DBA-F5CYRF', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'petrol', 8564512, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A5 45TFSI QUATTRO SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A5 CABRIOLET 2.0TFSI QUATTRO SPORT', 'ABA-F5CYRC', 'AT', '4WD', 2000, 'CONVERTIBLE', NULL, NULL, 'petrol', 19275565, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A5 CABRIOLET 2.0TFSI QUATTRO SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A5 SPORTBACK 40TFSI SPORT', 'WAUZZZF56KA09', 'AT', '2WD', 2000, 'WAGON', NULL, NULL, 'petrol', 9819147, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A5 SPORTBACK 40TFSI SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A5 SPORTBACK 45TFSI QUATTRO S LINE', 'WAUZZZF5XMA04', 'AT', '4WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 15353810, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A5 SPORTBACK 45TFSI QUATTRO S LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A5 SPORTBACK 45TFSI QUATTRO SPORT', 'WAUZZZF56KA06', 'AT', '4WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 15687217, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A5 SPORTBACK 45TFSI QUATTRO SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A5 SPORTBACK BLACK STYLE PLUS', 'WAUZZZF58PA03', 'AT', '2WD', 2000, 'SEDAN', NULL, NULL, 'diesel', 10221881, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A5 SPORTBACK BLACK STYLE PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A5 SPORTBACK S LINE COMPETITION PLUS', '3AA-F5DDWL', 'AT', '4WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 14027834, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A5 SPORTBACK S LINE COMPETITION PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A6 2.0 TFSI QUATTRO S LINE PACKAGE', 'WAUZZZ4GXJN00', 'AT', '4WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 10653095, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A6 2.0 TFSI QUATTRO S LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A6 45 TFSI QUATTRO', 'WAUZZZF26LN02', 'AT', '4WD', 2000, 'SEDAN', NULL, NULL, 'hybrid', 12511637, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A6 45 TFSI QUATTRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A6 45 TFSI QUATTRO SPORT', 'WAUZZZF2XNN06', 'AT', '4WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 21151195, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A6 45 TFSI QUATTRO SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A6 45 TFSI QUATTRO SPORT S LINE PACKAGE', 'WAUZZZF2XLN05', 'AT', '2WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 12713340, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A6 45 TFSI QUATTRO SPORT S LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A6 45 TFSI QUATTRO SPORT S LINE PACKAGE', 'WAUZZZF29MN09', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'hybrid', 10269928, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A6 45 TFSI QUATTRO SPORT S LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A6 55 TFSI QUATTRO DEBUT PACKAGE', 'WAUZZZF2XKN05', 'AT', '4WD', 3000, 'SEDAN', NULL, NULL, 'petrol', 11766864, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A6 55 TFSI QUATTRO DEBUT PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A6 55 TFSI QUATTRO S LINE', 'WAUZZZF21LN08', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'hybrid', 9637732, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A6 55 TFSI QUATTRO S LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A6 AVANT', 'WAUZZZF21NN04', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'petrol', 13009443, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A6 AVANT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A6 AVANT 40 TDI QUATTRO S LINE', 'WAUZZZF20LN06', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'diesel', 15158159, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A6 AVANT 40 TDI QUATTRO S LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A6 AVANT 40 TDI QUATTRO SPORT', 'WAUZZZF28NN01', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'diesel', 12679097, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A6 AVANT 40 TDI QUATTRO SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A6 AVANT 40 TDI QUATTRO SPORT S LINE PACKAGE', 'WAUZZZF24MN06', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'petrol', 16449334, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A6 AVANT 40 TDI QUATTRO SPORT S LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A6 AVANT 45 TFSI QUATTRO S LINE', 'WAUZZZF2XNN06', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'petrol', 11542361, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A6 AVANT 45 TFSI QUATTRO S LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A6 AVANT 45 TFSI QUATTRO SPORT', 'WAUZZZF23LN05', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'petrol', 13682449, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A6 AVANT 45 TFSI QUATTRO SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A6 AVANT 45 TFSI QUATTRO SPORT S LINE PACKAGE', 'WAUZZZF24NN03', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'petrol', 15983684, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A6 AVANT 45 TFSI QUATTRO SPORT S LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A7 SPORTBACK', 'WAUZZZF28KN0226497', 'AT', '4WD', 3000, 'SEDAN', NULL, NULL, 'petrol', 15980246, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A7 SPORTBACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A7 SPORTBACK 2.0 TFSI QUATTRO', 'WAUZZZ4G9JN02', 'AT', '4WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 11481750, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A7 SPORTBACK 2.0 TFSI QUATTRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A7 SPORTBACK 40TDI QUATTRO S LINE PACKAGE', 'WAUZZZF28LN05', 'AT', '4WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 13158961, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A7 SPORTBACK 40TDI QUATTRO S LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A7 SPORTBACK 45TFSI QUATTRO', 'WAUZZZF24PN03', 'AT', '4WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 16791411, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A7 SPORTBACK 45TFSI QUATTRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A7 SPORTBACK 45TFSI QUATTRO S LINE PACKAGE', 'WAUZZZF28LN07', 'AT', '4WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 15831281, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A7 SPORTBACK 45TFSI QUATTRO S LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A7 SPORTBACK 55 TFSI QUATTRO 1ST EDITION', 'AAA-F2DLZS', 'AT', '4WD', 3000, 'SEDAN', NULL, NULL, 'hybrid', 20322540, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A7 SPORTBACK 55 TFSI QUATTRO 1ST EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A7 SPORTBACK 55 TFSI QUATTRO S LINE', 'WAUZZZF24KN05', 'AT', '4WD', 2000, 'SEDAN', NULL, NULL, 'hybrid', 16967967, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A7 SPORTBACK 55 TFSI QUATTRO S LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A8', 'WAUZZZF85JN01', 'AT', '4WD', 4000, 'SEDAN', NULL, NULL, 'hybrid', 19975006, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A8'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A8 55TFSI QUATTRO', 'WAUZZZF81NN00', 'AT', '4WD', 3000, 'SEDAN', NULL, NULL, 'petrol', 18588387, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A8 55TFSI QUATTRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A8 60TFSI E QUATTRO', 'WAUZZZF81PN01', 'AT', '4WD', 3000, 'SEDAN', NULL, NULL, 'hybrid', 23583181, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A8 60TFSI E QUATTRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'A8 60TFSI QUATTRO', 'WAUZZZF82KN00', 'AT', '4WD', 4000, 'SEDAN', NULL, NULL, 'hybrid', 16130015, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'A8 60TFSI QUATTRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'E-TRON 50 QUATTRO ADVANCED', 'WAUZZZGE8MB01', 'AT', '4WD', NULL, 'WAGON', NULL, NULL, 'electric', 14782195, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'E-TRON 50 QUATTRO ADVANCED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'E-TRON 50 QUATTRO S LINE', 'ZAA-GEEASB', 'AT', '4WD', NULL, 'WAGON', NULL, NULL, 'electric', 18322333, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'E-TRON 50 QUATTRO S LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'E-TRON 55 QUATTRO S LINE', 'ZAA-GEEAS', 'AT', '4WD', NULL, 'WAGON', NULL, NULL, 'electric', 13338081, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'E-TRON 55 QUATTRO S LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'E-TRON S SPORTBACK', 'ZAA-GEEAV', 'AT', '4WD', NULL, 'WAGON', NULL, NULL, 'electric', 14807525, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'E-TRON S SPORTBACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q2 1.0TFSI SPORT', 'ABA-GACHZ', 'AT', '2WD', 990, 'WAGON', NULL, NULL, 'petrol', 7262085, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q2 1.0TFSI SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q2 1.4 TFSI CYLINDER ON DEMAND SPORT', 'ABA-GACZE', 'AT', '2WD', 1400, 'WAGON', NULL, NULL, 'petrol', 8950454, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q2 1.4 TFSI CYLINDER ON DEMAND SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q2 30TFSI SPORT', 'WAUZZZGA4LA03', 'AT', '2WD', 990, 'WAGON', NULL, NULL, 'petrol', 8069536, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q2 30TFSI SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q2 35TFSI ADVANCED', 'WAUZZZGAXNA04', 'AT', '2WD', 1500, 'WAGON', NULL, NULL, 'petrol', 6205980, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q2 35TFSI ADVANCED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q2 HASHTAG BLACK ELEGANCE', 'WAUZZZGA5KA07', 'AT', '2WD', 1000, 'SUV', NULL, NULL, 'petrol', 6631020, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q2 HASHTAG BLACK ELEGANCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q2 HASHTAG CONTRAST STYLING', 'WAUZZZGA7LA00', 'AT', '2WD', 1000, 'SUV', NULL, NULL, 'petrol', 6849238, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q2 HASHTAG CONTRAST STYLING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q3 2.0TFSI QUATTRO 180PS', 'ABA-8UCULB', 'AT', '2WD', 2000, 'SUV', NULL, NULL, 'petrol', 7526719, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q3 2.0TFSI QUATTRO 180PS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q3 35 TDI QUATTRO ADVANCED', 'WAUZZZF39M105', 'AT', '2WD', 1500, 'SUV', NULL, NULL, 'diesel', 9475761, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q3 35 TDI QUATTRO ADVANCED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q3 35 TDI QUATTRO S LINE', '3DA-F3DFGF', 'AT', '2WD', 2000, 'SUV', NULL, NULL, 'diesel', 10395171, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q3 35 TDI QUATTRO S LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q3 35 TFSI ADVANCED', 'WAUZZZF3XL112', 'AT', '2WD', 1500, 'SUV', NULL, NULL, 'petrol', 8502532, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q3 35 TFSI ADVANCED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q3 35 TFSI S LINE', '3AA-F3DFY', 'AT', '2WD', 1500, 'SUV', NULL, NULL, 'hybrid', 7239799, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q3 35 TFSI S LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q3 SPORTBACK 35 TDI QUATTRO S LINE', 'WAUZZZF32P102', 'AT', '4WD', 2000, 'SUV', NULL, NULL, 'diesel', 9483641, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q3 SPORTBACK 35 TDI QUATTRO S LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q3 SPORTBACK 35 TFSI', 'WAUZZZF37N105', 'AT', '2WD', 1500, 'SUV', NULL, NULL, 'petrol', 7683302, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q3 SPORTBACK 35 TFSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q3 SPORTBACK 35 TFSI S LINE', 'WAUZZZF35N110', 'AT', '2WD', 1500, 'SUV', NULL, NULL, 'petrol', 10078751, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q3 SPORTBACK 35 TFSI S LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q3 SPORTBACK HIGH STYLE', 'WAUZZZF39R104', 'AT', '2WD', 1500, 'SUV', NULL, NULL, 'petrol', 8696148, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q3 SPORTBACK HIGH STYLE'
);