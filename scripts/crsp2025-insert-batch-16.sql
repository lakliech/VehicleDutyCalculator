INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I30 (BASE)', '(BASE)', 'AUT', NULL, 2000, 'HATCHBACK', NULL, NULL, 'petrol', 3801857, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I30 (BASE)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I30 (BASE)', '(BASE)', 'MAN', NULL, 2000, 'HATCHBACK', NULL, NULL, 'petrol', 3509406, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I30 (BASE)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I30 (BASE)', '(BASE)', 'AUT', NULL, 2000, 'SEDAN', NULL, NULL, 'petrol', 4240532, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I30 (BASE)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I30 ACTIVE', 'ACTIVE', 'AUT', NULL, 2000, 'HATCHBACK', NULL, NULL, 'petrol', 4021194, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I30 ACTIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I30 ELITE', 'ELITE', 'AUT', NULL, 2000, 'HATCHBACK', NULL, NULL, 'petrol', 4503738, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I30 ELITE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I30 ELITE', 'ELITE', 'AUT', NULL, 2000, 'SEDAN', NULL, NULL, 'petrol', 4898546, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I30 ELITE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I30 N', 'N', 'MAN', NULL, 2000, 'HATCHBACK', NULL, NULL, 'petrol', 7311263, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I30 N'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I30 N', 'N', 'AUT', NULL, 2000, 'HATCHBACK', NULL, NULL, 'petrol', 7311263, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I30 N'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I30 N PREMIUM', 'N PREMIUM', 'MAN', NULL, 2000, 'HATCHBACK', NULL, NULL, NULL, 7823051, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I30 N PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I30 N PREMIUM', 'N PREMIUM', 'MAN', NULL, 2000, 'HATCHBACK', NULL, NULL, 'petrol', 7194282, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I30 N PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I30 N PREMIUM', 'N PREMIUM', 'AUT', NULL, 2000, 'HATCHBACK', NULL, NULL, NULL, 7823051, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I30 N PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I30 N PREMIUM', 'N PREMIUM', 'MAN', NULL, 2000, 'SEDAN', NULL, NULL, 'petrol', 7603713, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I30 N PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I30 N PREMIUM', 'N PREMIUM', 'AUT', NULL, 2000, 'SEDAN', NULL, NULL, 'petrol', 7603713, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I30 N PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I30 N PREMIUM WITH SUNROOF', 'N PREMIUM WITH SUNROOF', 'MAN', NULL, 2000, 'HATCHBACK', NULL, NULL, 'petrol', 8115501, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I30 N PREMIUM WITH SUNROOF'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I30 N PREMIUM WITH SUNROOF', 'N PREMIUM WITH SUNROOF', 'AUT', NULL, 2000, 'HATCHBACK', NULL, NULL, 'petrol', 8115501, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I30 N PREMIUM WITH SUNROOF'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I30 N PREMIUM WITH SUNROOF', 'N PREMIUM WITH SUNROOF', 'MAN', NULL, 2000, 'SEDAN', NULL, NULL, 'petrol', 7896164, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I30 N PREMIUM WITH SUNROOF'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I30 N PREMIUM WITH SUNROOF', 'N PREMIUM WITH SUNROOF', 'AUT', NULL, 2000, 'SEDAN', NULL, NULL, 'petrol', 7896164, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I30 N PREMIUM WITH SUNROOF'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I30 PREMIUM', 'PREMIUM', 'AUT', NULL, 2000, 'SEDAN', NULL, NULL, 'petrol', 5629672, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I30 PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I40 ACTIVE TOURER', 'ACTIVE TOURER', 'AUT', NULL, 2000, 'STATION WAGON', NULL, NULL, 'petrol', 5307977, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I40 ACTIVE TOURER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'I40 PREMIUM TOURER', 'PREMIUM TOURER', 'AUT', NULL, 2000, 'STATION WAGON', NULL, NULL, 'petrol', 6594759, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'I40 PREMIUM TOURER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'KONA (BASE)', 'KONA (BASE)', 'AUT', NULL, 2000, 'SUV', NULL, NULL, 'petrol', 4752321, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'KONA (BASE)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'KONA PREMIUM', 'KONA PREMIUM', 'AUT', NULL, 2000, 'SUV', NULL, NULL, 'petrol', 5775897, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'KONA PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'KONA PREMIUM SUNROOF', 'KONA PREMIUM SUNROOF', 'AUT', NULL, 2000, 'SUV', NULL, NULL, 'petrol', 5995235, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'KONA PREMIUM SUNROOF'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'TUCSON (FWD)', '(FWD)', 'AUT', NULL, 2000, 'SUV', NULL, NULL, 'petrol', 5717407, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'TUCSON (FWD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'TUCSON ELITE (AWD)', 'ELITE (AWD)', 'AUT', NULL, 2000, 'SUV', NULL, NULL, 'diesel', 6821408, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'TUCSON ELITE (AWD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'TUCSON ELITE N LINE (AWD)', 'ELITE N LINE (AWD)', 'AUT', NULL, 2000, 'SUV', NULL, NULL, 'diesel', 7186971, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'TUCSON ELITE N LINE (AWD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'TUCSON HIGHLANDER (AWD)', 'HIGHLANDER (AWD)', 'AUT', NULL, 2000, 'SUV', NULL, NULL, 'diesel', 7844985, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'TUCSON HIGHLANDER (AWD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'TUCSON HIGHLANDER (AWD) NO SRF', 'HIGHLANDER (AWD) NO SRF', 'AUT', NULL, 2000, 'SUV', NULL, NULL, 'diesel', 7625647, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'TUCSON HIGHLANDER (AWD) NO SRF'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'TUCSON HIGHLANDER (FWD)', 'HIGHLANDER (FWD)', 'AUT', NULL, 2000, 'SUV', NULL, NULL, 'petrol', 6967633, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'TUCSON HIGHLANDER (FWD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'TUCSON HIGHLANDER (FWD) NO SRF', 'HIGHLANDER (FWD) NO SRF', 'AUT', NULL, 2000, 'SUV', NULL, NULL, 'petrol', 6748295, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'TUCSON HIGHLANDER (FWD) NO SRF'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'TUCSON HIGHLANDER N LINE (AWD)', 'HIGHLANDER N LINE (AWD)', 'AUT', NULL, 2000, 'SUV', NULL, NULL, 'diesel', 8064323, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'TUCSON HIGHLANDER N LINE (AWD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'TUCSON HIGHLANDER N LINE (AWD) NO SRF', 'HIGHLANDER N LINE (AWD) NO SRF', 'AUT', NULL, 2000, 'SUV', NULL, NULL, 'diesel', 7844985, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'TUCSON HIGHLANDER N LINE (AWD) NO SRF'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'TUCSON HIGHLANDER N LINE (FWD)', 'HIGHLANDER N LINE (FWD)', 'AUT', NULL, 2000, 'SUV', NULL, NULL, 'petrol', 7186971, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'TUCSON HIGHLANDER N LINE (FWD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'TUCSON HIGHLANDER N LINE (FWD) NO SRF', 'HIGHLANDER N LINE (FWD) NO SRF', 'AUT', NULL, 2000, 'SUV', NULL, NULL, 'petrol', 6967633, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'TUCSON HIGHLANDER N LINE (FWD) NO SRF'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'TUCSON N LINE (FWD)', 'N LINE (FWD)', 'AUT', NULL, 2000, 'SUV', NULL, NULL, 'petrol', 5797831, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'TUCSON N LINE (FWD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'TUCSON PREMIUM (AWD)', 'PREMIUM (AWD)', 'AUT', NULL, 2000, 'SUV', NULL, NULL, 'petrol', 8130124, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'TUCSON PREMIUM (AWD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'TUCSON PREMIUM N LINE (AWD)', 'PREMIUM N LINE (AWD)', 'AUT', NULL, 2000, 'SUV', NULL, NULL, 'petrol', 8349462, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'TUCSON PREMIUM N LINE (AWD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'VELOSTER (BASE)', '(BASE)', 'AUT', NULL, 2000, 'HATCHBACK', NULL, NULL, 'petrol', 3860347, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'VELOSTER (BASE)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'VELOSTER (BASE)', '(BASE)', 'MAN', NULL, 2000, 'HATCHBACK', NULL, NULL, 'petrol', 3570821, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'VELOSTER (BASE)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'PALISADE CALLIGRAPHY (7 SEAT)', 'PALISADE CALLIGRAPHY (7 SEAT)', 'AUT', NULL, 2200, 'SUV', NULL, NULL, 'diesel', 11583818, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'PALISADE CALLIGRAPHY (7 SEAT)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'PALISADE CALLIGRAPHY (8 SEAT)', 'PALISADE CALLIGRAPHY (8 SEAT)', 'AUT', NULL, 2200, 'SUV', NULL, NULL, 'diesel', 11583818, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'PALISADE CALLIGRAPHY (8 SEAT)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'PALISADE CALLIGRAPHY BLACK INK (7 SEAT)', 'PALISADE CALLIGRAPHY BLACK INK (7 SEAT)', 'AUT', NULL, 2200, 'SUV', NULL, NULL, 'diesel', 11949381, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'PALISADE CALLIGRAPHY BLACK INK (7 SEAT)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'PALISADE CALLIGRAPHY BLACK INK (8 SEAT)', 'PALISADE CALLIGRAPHY BLACK INK (8 SEAT)', 'AUT', NULL, 2200, 'SUV', NULL, NULL, 'diesel', 11949381, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'PALISADE CALLIGRAPHY BLACK INK (8 SEAT)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'PALISADE ELITE (7 SEAT)', 'PALISADE ELITE (7 SEAT)', 'AUT', NULL, 2200, 'SUV', NULL, NULL, 'diesel', 10352748, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'PALISADE ELITE (7 SEAT)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'PALISADE ELITE (8 SEAT)', 'PALISADE ELITE (8 SEAT)', 'AUT', NULL, 2200, 'SUV', NULL, NULL, 'diesel', 10352748, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'PALISADE ELITE (8 SEAT)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'STARIA (BASE)', 'STARIA (BASE)', 'AUT', NULL, 2200, 'STATION WAGON', NULL, NULL, 'diesel', 7676826, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'STARIA (BASE)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'STARIA ELITE', 'STARIA ELITE', 'AUT', NULL, 2200, 'STATION WAGON', NULL, NULL, 'diesel', 8846628, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'STARIA ELITE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'STARIA HIGHLANDER', 'STARIA HIGHLANDER', 'AUT', NULL, 2200, 'STATION WAGON', NULL, NULL, 'diesel', 9870204, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'STARIA HIGHLANDER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'STARIA LOAD 2S 2.2D LIFTBACK', 'STARIA LOAD 2S 2.2D LIFTBACK', 'AUT', NULL, 2200, 'VAN', NULL, NULL, 'diesel', 6834568, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'STARIA LOAD 2S 2.2D LIFTBACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'STARIA LOAD 2S 2.2D TWIN SWING', 'STARIA LOAD 2S 2.2D TWIN SWING', 'AUT', NULL, 2200, 'VAN', NULL, NULL, 'diesel', 6834568, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'STARIA LOAD 2S 2.2D TWIN SWING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'STARIA LOAD 5S 2.2D LIFTBACK', 'STARIA LOAD 5S 2.2D LIFTBACK', 'AUT', NULL, 2200, 'OTHER', NULL, NULL, 'diesel', 7404847, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'STARIA LOAD 5S 2.2D LIFTBACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'STARIA LOAD 5S 2.2D TWIN SWING', 'STARIA LOAD 5S 2.2D TWIN SWING', 'AUT', NULL, 2200, 'OTHER', NULL, NULL, 'diesel', 7404847, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'STARIA LOAD 5S 2.2D TWIN SWING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'STARIA LOAD PREMIUM 2S 2.2D LIFTBACK', 'STARIA LOAD PREMIUM 2S 2.2D LIFTBACK', 'AUT', NULL, 2200, 'VAN', NULL, NULL, 'diesel', 7565694, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'STARIA LOAD PREMIUM 2S 2.2D LIFTBACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', '6S LIFTBACK', 'LIFTBACK', 'AUT', NULL, 2500, 'VAN', NULL, NULL, 'diesel', 9624059, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = '6S LIFTBACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', '6S LIFTBACK', 'LIFTBACK', 'MAN', NULL, 2500, 'VAN', NULL, NULL, 'diesel', 8846628, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = '6S LIFTBACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', '6S TWIN SWING', 'TWIN SWING', 'AUT', NULL, 2500, 'VAN', NULL, NULL, 'diesel', 9650867, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = '6S TWIN SWING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', '6S TWIN SWING', 'TWIN SWING', 'MAN', NULL, 2500, 'VAN', NULL, NULL, 'diesel', 8900244, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = '6S TWIN SWING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'ILOAD 3S LIFTBACK', '3S LIFTBACK', 'AUT', NULL, 2500, 'VAN', NULL, NULL, 'diesel', 9195131, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'ILOAD 3S LIFTBACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'ILOAD 3S LIFTBACK', '3S LIFTBACK', 'MAN', NULL, 2500, 'VAN', NULL, NULL, 'diesel', 8417700, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'ILOAD 3S LIFTBACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'ILOAD 3S TWIN SWING', '3S TWIN SWING', 'AUT', NULL, 2500, 'VAN', NULL, NULL, 'diesel', 9302363, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'ILOAD 3S TWIN SWING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'ILOAD 3S TWIN SWING', '3S TWIN SWING', 'MAN', NULL, 2500, 'VAN', NULL, NULL, 'diesel', 8551740, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'ILOAD 3S TWIN SWING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IMAX ACTIVE', 'IMAX ACTIVE', 'AUT', NULL, 2500, 'STATION WAGON', NULL, NULL, 'diesel', 9999370, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IMAX ACTIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'IMAX ELITE', 'IMAX ELITE', 'AUT', NULL, 2500, 'STATION WAGON', NULL, NULL, 'diesel', 11125304, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'IMAX ELITE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'SANTA FE (7 SEAT) (2WD)', 'SANTA FE (7 SEAT) (2WD)', 'AUT', NULL, 2500, 'SUV', NULL, NULL, 'hybrid', 7749938, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'SANTA FE (7 SEAT) (2WD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'SANTA FE (7 SEAT) (AWD)', 'SANTA FE (7 SEAT) (AWD)', 'AUT', NULL, 2500, 'SUV', NULL, NULL, 'hybrid', 8188614, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'SANTA FE (7 SEAT) (AWD)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'SANTA FE CALLIGRAPHY (6 SEAT)', 'SANTA FE CALLIGRAPHY (6 SEAT)', 'AUT', NULL, 2500, 'SUV', NULL, NULL, 'hybrid', 10674443, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'SANTA FE CALLIGRAPHY (6 SEAT)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'SANTA FE CALLIGRAPHY (6 SEAT)', 'SANTA FE CALLIGRAPHY (6 SEAT)', 'AUT', NULL, 2500, 'SUV', NULL, NULL, 'hybrid', 10717580, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'SANTA FE CALLIGRAPHY (6 SEAT)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'SANTA FE CALLIGRAPHY (6 SEAT)', 'SANTA FE CALLIGRAPHY (6 SEAT)', 'AUT', NULL, 2500, 'SUV', NULL, NULL, 'hybrid', 10717580, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'SANTA FE CALLIGRAPHY (6 SEAT)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'SANTA FE CALLIGRAPHY (7 SEAT)', 'SANTA FE CALLIGRAPHY (7 SEAT)', 'AUT', NULL, 2500, 'SUV', NULL, NULL, 'hybrid', 10601331, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'SANTA FE CALLIGRAPHY (7 SEAT)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'SANTA FE CALLIGRAPHY (7 SEAT)', 'SANTA FE CALLIGRAPHY (7 SEAT)', 'AUT', NULL, 2500, 'SUV', NULL, NULL, 'hybrid', 10644467, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'SANTA FE CALLIGRAPHY (7 SEAT)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'SANTA FE CALLIGRAPHY (7 SEAT)', 'SANTA FE CALLIGRAPHY (7 SEAT)', 'AUT', NULL, 2500, 'SUV', NULL, NULL, 'hybrid', 10644467, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'SANTA FE CALLIGRAPHY (7 SEAT)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'SANTA FE ELITE (7 SEAT)', 'SANTA FE ELITE (7 SEAT)', 'AUT', NULL, 2500, 'SUV', NULL, NULL, 'hybrid', 9139078, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'SANTA FE ELITE (7 SEAT)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'STARIA (BASE)', 'STARIA (BASE)', 'AUT', NULL, 3500, 'STATION WAGON', NULL, NULL, 'hybrid', 7841329, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'STARIA (BASE)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'STARIA (BASE)', 'STARIA (BASE)', 'AUT', NULL, 3500, 'STATION WAGON', NULL, NULL, 'petrol', 7841329, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'STARIA (BASE)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'STARIA ELITE', 'STARIA ELITE', 'AUT', NULL, 3500, 'STATION WAGON', NULL, NULL, 'hybrid', 9108615, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'STARIA ELITE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'STARIA ELITE', 'STARIA ELITE', 'AUT', NULL, 3500, 'STATION WAGON', NULL, NULL, 'petrol', 9108615, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'STARIA ELITE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'STARIA HIGHLANDER', 'STARIA HIGHLANDER', 'AUT', NULL, 3500, 'STATION WAGON', NULL, NULL, 'hybrid', 10217489, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'STARIA HIGHLANDER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'STARIA HIGHLANDER', 'STARIA HIGHLANDER', 'AUT', NULL, 3500, 'STATION WAGON', NULL, NULL, 'petrol', 10217489, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'STARIA HIGHLANDER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'GENESIS BASE', 'BASE', 'AUT', NULL, 3800, 'SEDAN', NULL, NULL, 'petrol', 25540329, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'GENESIS BASE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'GENESIS ULTIMATE PACK', 'ULTIMATE PACK', 'AUT', NULL, 3800, 'SEDAN', NULL, NULL, 'petrol', 34103558, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'GENESIS ULTIMATE PACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'PALISADE CALLIGRAPHY (7 SEAT)', 'PALISADE CALLIGRAPHY (7 SEAT)', 'AUT', NULL, 3800, 'SUV', NULL, NULL, 'petrol', 12023371, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'PALISADE CALLIGRAPHY (7 SEAT)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'PALISADE CALLIGRAPHY (8 SEAT)', 'PALISADE CALLIGRAPHY (8 SEAT)', 'AUT', NULL, 3800, 'SUV', NULL, NULL, 'petrol', 12023371, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'PALISADE CALLIGRAPHY (8 SEAT)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'PALISADE CALLIGRAPHY BLACK INK (7 SEAT)', 'PALISADE CALLIGRAPHY BLACK INK (7 SEAT)', 'AUT', NULL, 3800, 'SUV', NULL, NULL, 'petrol', 12419398, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'PALISADE CALLIGRAPHY BLACK INK (7 SEAT)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'PALISADE ELITE (7 SEAT)', 'PALISADE ELITE (7 SEAT)', 'AUT', NULL, 3800, 'SUV', NULL, NULL, 'petrol', 10581834, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'PALISADE ELITE (7 SEAT)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'PALISADE ELITE (8 SEAT)', 'PALISADE ELITE (8 SEAT)', 'AUT', NULL, 3800, 'SUV', NULL, NULL, 'petrol', 10581834, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'PALISADE ELITE (8 SEAT)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'PALISADECALLIGRAPHY BLACK INK (8 SEAT)', 'PALISADECALLIGRAPHY BLACK INK (8 SEAT)', 'AUT', NULL, 3800, 'SUV', NULL, NULL, 'petrol', 12419398, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'PALISADECALLIGRAPHY BLACK INK (8 SEAT)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'BASE', NULL, 'MAN', NULL, 3900, 'S/CABIN', NULL, NULL, 'electric', 21933788, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'BASE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 (MWB)', NULL, 'MAN', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 10164994, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 (MWB)', NULL, 'AUT', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 11138124, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 (SWB)', NULL, 'MAN', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 9770479, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 (SWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 (SWB)', NULL, 'AUT', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 10743608, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 (SWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 CHILLER (MWB)', NULL, 'MAN', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 11005351, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 CHILLER (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 CHILLER (MWB)', NULL, 'MAN', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 11978480, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 CHILLER (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 CHILLER (SWB)', NULL, 'MAN', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 10438143, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 CHILLER (SWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 CHILLER (SWB)', NULL, 'AUT', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 11409810, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 CHILLER (SWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 FREEZER (MWB)', NULL, 'MAN', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 11671699, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 FREEZER (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 FREEZER (MWB)', NULL, 'AUT', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 12644828, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 FREEZER (MWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 FREEZER (SWB)', NULL, 'MAN', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 11042054, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 FREEZER (SWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 FREEZER (SWB)', NULL, 'AUT', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 12015183, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 FREEZER (SWB)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'HYUNDAI', 'EX4 PREMIUM FREEZER (MWB)', NULL, 'MAN', NULL, 3900, 'TRUCK', NULL, NULL, 'diesel', 12162578, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'HYUNDAI' AND model = 'EX4 PREMIUM FREEZER (MWB)'
);