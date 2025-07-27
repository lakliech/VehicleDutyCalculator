INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', '500C TWIN AIR DOLCEVITA', 'ZFABF1C85NJF9', 'AT', '2WD', 900, 'SUV', NULL, NULL, 'petrol', 5255099, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = '500C TWIN AIR DOLCEVITA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', '500C TWIN AIR DOLCEVITA', 'ZFABF1C88NJG9', 'AT', '2WD', 900, 'SUV', NULL, NULL, 'petrol', 6815014, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = '500C TWIN AIR DOLCEVITA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', '500E ICON', 'ZFAEFAA43PX13', 'AT', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 9795890, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = '500E ICON'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', '500E OPEN', 'ZFAEFAJ49NX09', 'AT', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 8733874, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = '500E OPEN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', '500E POP', 'ZFAEFAC48NX07', 'AT', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 9835405, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = '500E POP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', '500X BASE GRADE', 'ZFANF2D18MP95', 'AT', '2WD', 1300, 'HATCHBACK', NULL, NULL, 'petrol', 5870239, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = '500X BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', '500X BASE GRADE', 'ZFANF2D16MP94', 'AT', '2WD', 1300, 'SUV', NULL, NULL, 'petrol', 6415468, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = '500X BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', '500X CLUB', '3BA-33413PM', 'AT', '2WD', 1300, 'SUV', NULL, NULL, 'petrol', 6830565, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = '500X CLUB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', '500X CROSS', 'ZFA3340000P85', 'AT', '2WD', 1300, 'HATCHBACK', NULL, NULL, 'petrol', 6884708, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = '500X CROSS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', '500X CROSS', 'ZFA3340000P84', 'AT', '2WD', 1300, 'SUV', NULL, NULL, 'petrol', 7615733, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = '500X CROSS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', '500X CROSS', '3BA-33413PM', 'AT', '2WD', 1300, 'SUV', NULL, NULL, 'petrol', 8136519, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = '500X CROSS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', '500X CROSS', 'ZFANF2D13NP97', 'AT', '2WD', 1300, 'SUV', NULL, NULL, 'petrol', 5546847, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = '500X CROSS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', '500X INDIGO', 'VYFECYHZ3PJ78', 'AT', '2WD', 1300, 'SUV', NULL, NULL, 'petrol', 8248984, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = '500X INDIGO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', '500X INFINITO', '3BA-33413PM', 'AT', '2WD', 1300, 'SUV', NULL, NULL, 'petrol', 6534393, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = '500X INFINITO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'CINQUECENTO', '00FIAT110F121', 'AT', '2WD', 500, 'WAGON', NULL, NULL, 'petrol', 7063502, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'CINQUECENTO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'CINQUECENTO BASE GRADE', 'FIAT110F256', 'AT', '2WD', 500, 'WAGON', NULL, NULL, 'petrol', 7491964, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'CINQUECENTO BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'CINQUECENTO BASE GRADE', 'FIAT110F516', 'MT', '2WD', 500, 'WAGON', NULL, NULL, 'petrol', 5735737, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'CINQUECENTO BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'DOBLO BASE GRADE', 'VYFEBYHZ7SJ56', 'AT', '2WD', 1500, 'SUV', NULL, NULL, 'petrol', 5656631, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'DOBLO BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'DOBLO MAXI', 'VYFECYHZ3RJ53', 'AT', '2WD', 1500, 'MINIVAN', NULL, NULL, 'petrol', 8725569, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'DOBLO MAXI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'DOBLO MAXI', 'VYFECYHZ3PJ78', 'AT', '2WD', 1500, 'MINIVAN', NULL, NULL, 'petrol', 7760969, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'DOBLO MAXI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'DUCATO', 'ZFA25000002W9', 'AT', '2WD', 2200, 'VAN', NULL, NULL, 'diesel', 29108692, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'DUCATO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'DUCATO', 'ZFA25000002H9', 'AT', '2WD', 2300, 'VAN', NULL, NULL, 'diesel', 33856651, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'DUCATO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'DUCATO L2H2', 'ZAF25000002W5', 'AT', '2WD', 2200, 'VAN', NULL, NULL, 'diesel', 13268165, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'DUCATO L2H2'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'FIAT FIAT OTHER', 'ZFA25000002Y4', 'AT', '2WD', 2300, 'VAN', NULL, NULL, 'petrol', 28638788, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'FIAT FIAT OTHER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'PANDA 30', 'ZFA141A000573', 'MT', '2WD', 650, 'SUV', NULL, NULL, 'petrol', 4596340, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'PANDA 30'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'PANDA 4X4 FORESTA', 'ABA-13909', 'MT', '4WD', 900, 'SUV', NULL, NULL, 'petrol', 6224245, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'PANDA 4X4 FORESTA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'PANDA 4X4 SUCCOSA', 'ZFA31200003C5', 'MT', '4WD', 900, 'SUV', NULL, NULL, 'petrol', 9327411, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'PANDA 4X4 SUCCOSA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'PANDA COMFORT', 'ABA-13909', 'AT', '2WD', 900, 'SUV', NULL, NULL, 'petrol', 6030072, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'PANDA COMFORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'PANDA CROSS 4X4', 'ZFABF6G84M3G1', 'MT', '4WD', 900, 'SUV', NULL, NULL, 'petrol', 9885711, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'PANDA CROSS 4X4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'PANDA EASY', 'ZFA31200003A3', 'AT', '2WD', 900, 'SUV', NULL, NULL, 'petrol', 3960172, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'PANDA EASY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'PANDA STREET 4X4', '7BA-13909', 'MT', '4WD', 900, 'SUV', NULL, NULL, 'petrol', 7436396, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'PANDA STREET 4X4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'SCUDO LWB', NULL, 'MAN', NULL, 2000, 'VAN', NULL, NULL, 'petrol', 8444508, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'SCUDO LWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'DOBLO', 'SWB (LOW)', 'MAN', NULL, 1400, 'VAN', NULL, NULL, 'petrol', 5397336, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'DOBLO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'DOBLO', 'SWB (LOW)', 'AUT', NULL, 1600, 'VAN', NULL, NULL, 'diesel', 7398998, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'DOBLO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'DOBLO', 'SWB (LOW)', 'MAN', NULL, 1600, 'VAN', NULL, NULL, 'diesel', 6719863, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'DOBLO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'DOBLO', 'MAXI LWB (LOW)', 'MAN', NULL, 2000, 'VAN', NULL, NULL, 'diesel', 7899413, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'DOBLO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'DOLCEVITA', '500C', 'AUT', NULL, 1200, 'CONVERTIBLE', NULL, NULL, 'petrol', 5602864, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'DOLCEVITA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'DOLCEVITA', '500C', 'MAN', NULL, 1200, 'CONVERTIBLE', NULL, NULL, 'petrol', 5066705, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'DOLCEVITA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'POP', '500X', 'AUT', NULL, 1400, 'SUV', NULL, NULL, 'petrol', 5576056, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'POP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'POP', '500X', 'MAN', NULL, 1400, 'SUV', NULL, NULL, 'petrol', 4396506, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'POP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'POP STAR', '500X', 'AUT', NULL, 1400, 'SUV', NULL, NULL, 'petrol', 5817328, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'POP STAR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'DOLCEVITA', '500', 'AUT', NULL, 1200, 'HATCHBACK', NULL, NULL, 'petrol', 4225910, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'DOLCEVITA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'DUCATO', 'LWB\MR', 'AUT', NULL, 2200, 'VAN', NULL, NULL, 'diesel', 8776732, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'DUCATO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'DUCATO', 'MWB\MR', 'AUT', NULL, 2200, 'VAN', NULL, NULL, 'diesel', 8456499, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'DUCATO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'DUCATO', 'XLWB\MR', 'AUT', NULL, 2200, 'VAN', NULL, NULL, 'diesel', 9479491, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'DUCATO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FIAT', 'LA PRIMA', '500E', 'AUT', NULL, NULL, 'HATCHBACK', NULL, NULL, 'electric', 7676826, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FIAT' AND model = 'LA PRIMA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'ECOSPORT', 'TITANIUM', 'AUT', '4WD', 1000, 'SUV', NULL, NULL, 'petrol', 6240894, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'ECOSPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'ECOSPORT', 'TREND', 'AUT', '4WD', 1000, 'SUV', NULL, NULL, 'petrol', 5275807, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'ECOSPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'PUMA', 'BASE', 'AUT', NULL, 1000, 'SUV', NULL, NULL, 'petrol', 4443420, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'PUMA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'PUMA', 'ST-LINE', 'AUT', NULL, 1000, 'SUV', NULL, NULL, 'petrol', 5066705, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'PUMA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'PUMA', 'ST-LINE V', 'AUT', NULL, 1000, 'SUV', NULL, NULL, 'petrol', 5368294, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'PUMA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'ECOSPORT', 'AMBIENTE', 'AUT', '4WD', 1500, 'SUV', NULL, NULL, 'petrol', 4857603, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'ECOSPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'FIESTA', 'ST', 'MAN', '2WD', 1500, 'HATCHBACK', NULL, NULL, 'petrol', 5928389, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'FIESTA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'ENDURA', 'ST-LINE (AWD)', 'AUT', 'AWD', 2000, 'SUV', NULL, NULL, 'diesel', 6862838, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'ENDURA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'ENDURA', 'ST-LINE (FWD)', 'AUT', 'FWD', 2000, 'SUV', NULL, NULL, 'diesel', 8283660, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'ENDURA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'ENDURA', 'TITANIUM (AWD)', 'AUT', 'AWD', 2000, 'SUV', NULL, NULL, 'diesel', 10669569, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'ENDURA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'ENDURA', 'TITANIUM (FWD)', 'AUT', 'FWD', 2000, 'SUV', NULL, NULL, 'diesel', 8927052, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'ENDURA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'ENDURA', 'TREND (AWD)', 'AUT', 'AWD', 2000, 'SUV', NULL, NULL, 'diesel', 5978176, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'ENDURA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'ENDURA', 'TREND (AWD)', 'AUT', 'FWD', 2000, 'SUV', NULL, NULL, 'diesel', 5468824, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'ENDURA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'ESCAPE', '(FWD)', 'AUT', 'FWD', 2000, 'SUV', NULL, NULL, 'diesel', 6353487, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'ESCAPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'ESCAPE', 'ST-LINE (AWD)', 'AUT', 'AWD', 2000, 'SUV', NULL, NULL, 'petrol', 5770414, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'ESCAPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'ESCAPE', 'ST-LINE (FWD)', 'AUT', 'FWD', 2000, 'SUV', NULL, NULL, 'diesel', 6695289, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'ESCAPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'ESCAPE', 'VIGNALE (AWD)', 'AUT', 'AWD', 2000, 'SUV', NULL, NULL, 'diesel', 8545038, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'ESCAPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'ESCAPE', 'VIGNALE (FWD)', 'AUT', 'FWD', 2000, 'SUV', NULL, NULL, 'diesel', 8303766, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'ESCAPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'EVEREST', 'AMBIENTE (4WD)', 'AUT', '4WD', 2000, 'SUV', NULL, NULL, 'diesel', 8662384, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'EVEREST'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'EVEREST', 'AMBIENTE (RWD)', 'AUT', 'RWD', 2000, 'SUV', NULL, NULL, 'diesel', 7931258, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'EVEREST'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'EVEREST', 'SPORT (RWD)', 'AUT', 'RWD', 2000, 'SUV', NULL, NULL, 'diesel', 9320397, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'EVEREST'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'EVEREST', 'TREND (4WD)', 'AUT', '4WD', 2000, 'SUV', NULL, NULL, 'diesel', 9802941, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'EVEREST'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'MONDEO', 'AMBIENTE TDCI', 'AUT', '2WD', 2000, 'HATCHBACK', NULL, NULL, 'diesel', 7452614, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'MONDEO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'MONDEO', 'AMBIENTE TDCI', 'AUT', '2WD', 2000, 'STATION WAGON', NULL, NULL, 'diesel', 7774309, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'MONDEO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'RANGER', 'XL 2.0 (4X4)', 'AUT', '4*4', 2000, 'DOUBLE CABIN', NULL, NULL, 'diesel', 7162113, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'RANGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'RANGER', 'XL 2.0 (4X4)', 'AUT', '4*4', 2000, 'SINGLE CABIN', NULL, NULL, 'diesel', 7015887, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'RANGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'RANGER', 'XL 2.0 HI-RIDER (4X2)', 'AUT', '4*2', 2000, 'DOUBLE CABIN', NULL, NULL, 'diesel', 6182404, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'RANGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'RANGER', 'XL 2.0 HI-RIDER (4X2)', 'AUT', '4*2', 2000, 'SINGLE CABIN', NULL, NULL, 'diesel', 5392787, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'RANGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'RANGER', 'SPORT 2.0 (4X4)', 'AUT', '4*4', 2000, 'DOUBLE CABIN', NULL, NULL, 'diesel', 9671338, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'RANGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'RANGER', 'WILDTRAK 2.0 (4X4)', 'AUT', '4*4', 2000, 'DOUBLE CABIN', NULL, NULL, 'diesel', 10183126, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'RANGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'RANGER', 'WILDTRAK X 2.0 (4X4)', 'AUT', '4*4', 2000, 'DOUBLE CABIN', NULL, NULL, 'diesel', 11352928, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'RANGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'RANGER', 'XLS 2.0 (4X4)', 'AUT', '4*4', 2000, 'DOUBLE CABIN', NULL, NULL, 'diesel', 8426961, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'RANGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'RANGER', 'XLT', 'AUT', '4*4', 2000, 'DOUBLE CABIN', NULL, NULL, 'diesel', 9307237, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'RANGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'RANGER', 'XLT HI-RIDER', 'AUT', NULL, 2000, 'DOUBLE CABIN', NULL, NULL, 'diesel', 8252953, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'RANGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'TOURNEO CUSTOM', 'ACTIVE (LWB)', 'AUT', NULL, 2000, 'STATION WAGON', NULL, NULL, 'diesel', 9649404, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'TOURNEO CUSTOM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'TOURNEO CUSTOM', 'ACTIVE (SWB)', 'AUT', NULL, 2000, 'STATION WAGON', NULL, NULL, 'diesel', 9649404, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'TOURNEO CUSTOM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'TOURNEO CUSTOM', 'TITANIUM X (LWB)', 'AUT', NULL, 2000, 'STATION WAGON', NULL, NULL, 'diesel', 10380530, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'TOURNEO CUSTOM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'TOURNEO CUSTOM', 'TITANIUM X (SWB)', 'AUT', NULL, 2000, 'STATION WAGON', NULL, NULL, 'diesel', 10380530, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'TOURNEO CUSTOM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'TRANSIT', '410L (RWD) SRW', 'AUT', NULL, 2000, 'PEOPLE MOVER', NULL, NULL, 'diesel', 10234305, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'TRANSIT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'TRANSIT', '430E ELWB (RWD) DRW', 'AUT', NULL, 2000, 'SINGLE CABIN', NULL, NULL, 'diesel', 9210728, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'TRANSIT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'TRANSIT', '350L LWB (FWD) SRW', 'AUT', NULL, 2000, 'VAN', NULL, NULL, 'diesel', 8772053, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'TRANSIT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'TRANSIT', '350L LWB (RWD) SRW', 'AUT', NULL, 2000, 'VAN', NULL, NULL, 'diesel', 9210728, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'TRANSIT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'TRANSIT', '430E LWB (RWD) JUMBO DRW', 'AUT', NULL, 2000, 'VAN', NULL, NULL, 'diesel', 9795629, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'TRANSIT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'TRANSIT CUSTOM', 'SPORT DCIV (LWB)', 'AUT', NULL, 2000, 'VAN', NULL, NULL, 'diesel', 9210728, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'TRANSIT CUSTOM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'TRANSIT CUSTOM', 'SPORT (SWB)', 'AUT', NULL, 2000, 'VAN', NULL, NULL, 'diesel', 8772053, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'TRANSIT CUSTOM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'TRANSIT CUSTOM', 'TREND (LWB)', 'AUT', NULL, 2000, 'VAN', NULL, NULL, 'diesel', 8421112, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'TRANSIT CUSTOM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'TRANSIT CUSTOM', 'TREND (SWB)', 'AUT', NULL, 2000, 'VAN', NULL, NULL, 'diesel', 8274887, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'TRANSIT CUSTOM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'FOCUS', 'ST', 'MAN', '2WD', 2300, 'HATCHBACK', NULL, NULL, 'petrol', 8961519, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'FOCUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'FOCUS', 'ST', 'AUT', '2WD', 2300, 'HATCHBACK', NULL, NULL, 'petrol', 8961519, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'FOCUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'FOCUS', 'ST X', 'AUT', '2WD', 2300, 'HATCHBACK', NULL, NULL, 'petrol', 9811714, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'FOCUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'RANGER', 'PHEV SPORT (4X4)', 'AUT', '4*4', 2300, 'DOUBLE CABIN', NULL, NULL, 'diesel', 11111657, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'RANGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'RANGER', 'PHEV STORMTRAK (4X4)', 'AUT', '4*4', 2300, 'DOUBLE CABIN', NULL, NULL, 'diesel', 12720134, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'RANGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'RANGER', 'PHEV WILDTRAK (4X4)', 'AUT', '4*4', 2300, 'DOUBLE CABIN', NULL, NULL, 'diesel', 11696558, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'RANGER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'FORD', 'RANGER', 'PHEV XLT (4X4)', 'AUT', '4*4', 2300, 'DOUBLE CABIN', NULL, NULL, 'diesel', 10526756, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'FORD' AND model = 'RANGER'
);