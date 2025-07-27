INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 911GT3', 'WP0ZZZ99ZNS26', 'AT', '2WD', 4000, 'COUPE', NULL, NULL, 'petrol', 52020363, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 911GT3'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 911GT3 TOURING PACKAGE', 'WP0ZZZ99ZPS26', 'MT', '2WD', 4000, 'COUPE', NULL, NULL, 'petrol', 54826568, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 911GT3 TOURING PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'CAYENNE E-HYBRID PLATINUM EDITION', '3LA-E3NF', 'AT', '4WD', 4000, 'WAGON', NULL, NULL, 'hybrid', 17738710, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'CAYENNE E-HYBRID PLATINUM EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'CAYENNE COUPE CAYENNE TURBO GT COUPE', 'WP1ZZZ9YZNDA5', 'AT', '4WD', 4000, 'COUPE', NULL, NULL, 'petrol', 45626396, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'CAYENNE COUPE CAYENNE TURBO GT COUPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 CAYMAN 718 CAYMAN GT4 RS', 'WP0ZZZ98ZPS27', 'MT', '2WD', 4000, 'COUPE', NULL, NULL, 'petrol', 39976998, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 CAYMAN 718 CAYMAN GT4 RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 CAYMAN 718 CAYMAN GT4', 'WP0ZZZ98ZPS27', 'MT', '2WD', 4000, 'COUPE', NULL, NULL, 'petrol', 25390703, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 CAYMAN 718 CAYMAN GT4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 911GT3', 'WP0ZZZ99ZPS26', 'MT', '2WD', 4000, 'COUPE', NULL, NULL, 'petrol', 55687613, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 911GT3'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '911 911GT3RS', 'WP0ZZZ99ZPS27', 'AT', '2WD', 4000, 'COUPE', NULL, NULL, 'petrol', 94912230, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '911 911GT3RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'CAYENNE COUPE CAYENNE S COUPE', '7BA-E3RM', 'AT', '4WD', 4000, 'COUPE', NULL, NULL, 'petrol', 27823819, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'CAYENNE COUPE CAYENNE S COUPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 BOXSTER 718 BOXSTER GTS 4.0', 'WP0ZZZ98ZRK22', 'MT', '2WD', 4000, 'CONVERTIBLE', NULL, NULL, 'petrol', 24435697, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 BOXSTER 718 BOXSTER GTS 4.0'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 SPYDER 718 SPYDER RS', 'WP0ZZZ98ZRK23', 'AT', '2WD', 4000, 'CONVERTIBLE', NULL, NULL, 'petrol', 54220759, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 SPYDER 718 SPYDER RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'CAYENNE COUPE CAYENNE TURBO E-HYBRID COUPE', 'WP1ZZZ9YZRDA8', 'AT', '4WD', 4000, 'COUPE', NULL, NULL, 'hybrid', 43697086, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'CAYENNE COUPE CAYENNE TURBO E-HYBRID COUPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'MACAN MACAN GTS', 'WP1ZZZ95ZRLB4', 'AT', '4WD', 4000, 'COUPE', NULL, NULL, 'petrol', 22060473, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'MACAN MACAN GTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', '718 CAYMAN 718 CAYMAN GT4 RS', '99999', 'AT', '2WD', 4000, 'COUPE', NULL, NULL, 'petrol', 48831420, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = '718 CAYMAN 718 CAYMAN GT4 RS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'TAYCAN TAYCAN TURBO', 'ZAA-J1MC', 'AT', '4WD', NULL, 'COUPE', NULL, NULL, 'electric', 20930869, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'TAYCAN TAYCAN TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'TAYCAN TAYCAN 4S', 'WP0ZZZY1ZMSA2', 'AT', '4WD', NULL, 'COUPE', NULL, NULL, 'electric', 11787671, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'TAYCAN TAYCAN 4S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'TAYCAN TAYCAN TURBO S', 'WP0ZZZY1ZMSA5', 'AT', '4WD', NULL, 'COUPE', NULL, NULL, 'electric', 22491914, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'TAYCAN TAYCAN TURBO S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'TAYCAN TAYCAN GTS', 'WP0ZZZY1ZRSA4', 'AT', '4WD', NULL, 'COUPE', NULL, NULL, 'electric', 20345047, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'TAYCAN TAYCAN GTS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'TAYCAN CROSS TURISMO TAYCAN 4 CROSS TURISMO', 'WP0ZZZY1ZPSA5', 'AT', '4WD', NULL, 'COUPE', NULL, NULL, 'electric', 15984688, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'TAYCAN CROSS TURISMO TAYCAN 4 CROSS TURISMO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'TAYCAN CROSS TURISMO TAYCAN TURBO CROSS TURISMO', 'WPOZZZY1ZSSA7', 'AT', '4WD', NULL, 'COUPE', NULL, NULL, 'electric', 32436656, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'TAYCAN CROSS TURISMO TAYCAN TURBO CROSS TURISMO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'MACAN ELECTRIC MACAN', 'ZAA-H2SA12', 'AT', '2WD', NULL, 'HATCHBACK', NULL, NULL, 'electric', 18264802, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'MACAN ELECTRIC MACAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'MACAN ELECTRIC MACAN 4', 'ZAA-H2SA22', 'AT', '2WD', NULL, 'HATCHBACK', NULL, NULL, 'electric', 17706777, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'MACAN ELECTRIC MACAN 4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'TAYCAN CROSS TURISMO TAYCAN 4S CROSS TURISMO', 'WP0ZZZY1ZSSA6', 'AT', '4WD', NULL, 'COUPE', NULL, NULL, 'electric', 18405169, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'TAYCAN CROSS TURISMO TAYCAN 4S CROSS TURISMO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'PORSCHE', 'TAYCAN TAYCAN', 'WP0ZZZY1ZPSA0', 'AT', '2WD', NULL, 'COUPE', NULL, NULL, 'electric', 13318850, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'PORSCHE' AND model = 'TAYCAN TAYCAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'ARKANA ESPIRIT ALPINE', NULL, '7AT', '2WD', 1300, 'SUV', NULL, NULL, 'petrol', 5572611, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'ARKANA ESPIRIT ALPINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'ARKANA INTENS', NULL, '7AT', '2WD', 1300, 'SUV', NULL, NULL, 'petrol', 4658703, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'ARKANA INTENS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'ARKANA R.S. LINE', NULL, '7AT', '2WD', 1300, 'SUV', NULL, NULL, 'petrol', 5121849, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'ARKANA R.S. LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'ARKANA TECHNO', NULL, '7AT', '2WD', 1300, 'SUV', NULL, NULL, 'petrol', 5077268, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'ARKANA TECHNO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'ARKANA ZEN', NULL, '7AT', '2WD', 1300, 'SUV', NULL, NULL, 'petrol', 4209179, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'ARKANA ZEN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'CAPTUR INTENS', NULL, '7AT', '2WD', 1300, 'SUV', NULL, NULL, 'petrol', 4440752, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'CAPTUR INTENS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'CAPTUR LIFE', NULL, '7AT', '2WD', 1300, 'SUV', NULL, NULL, 'petrol', 3664301, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'CAPTUR LIFE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'CAPTUR R.S. LINE', NULL, '7AT', '2WD', 1300, 'SUV', NULL, NULL, 'petrol', 4685947, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'CAPTUR R.S. LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'CAPTUR ZEN', NULL, '7AT', '2WD', 1300, 'SUV', NULL, NULL, 'petrol', 3623436, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'CAPTUR ZEN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'KANGOO E-TECH SWB EV45', NULL, 'AT', '2WD', NULL, 'VAN', NULL, NULL, 'electric', 8374452, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'KANGOO E-TECH SWB EV45'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'KANGOO PETROL LWB', NULL, '7AT', '2WD', 1300, 'VAN', NULL, NULL, 'petrol', 5447537, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'KANGOO PETROL LWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'KANGOO PETROL SWB', NULL, '6AT', '2WD', 1300, 'VAN', NULL, NULL, 'petrol', 4828358, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'KANGOO PETROL SWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'KANGOO PETROL SWB', NULL, '7AT', '4WD', 1300, 'VAN', NULL, NULL, 'petrol', 5199865, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'KANGOO PETROL SWB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'KOLEOS INTENS', NULL, 'CVT', '2WD', 2500, 'SUV', NULL, NULL, 'petrol', 4799876, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'KOLEOS INTENS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'KOLEOS LIFE', NULL, 'CVT', '2WD', 2500, 'SUV', NULL, NULL, 'petrol', 5066010, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'KOLEOS LIFE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'KOLEOS LIFE', NULL, 'CVT', '2WD', 2500, 'SUV', NULL, NULL, 'petrol', 4472949, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'KOLEOS LIFE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'KOLEOS ZEN', NULL, 'CVT', '2WD', 2500, 'SUV', NULL, NULL, 'petrol', 5741478, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'KOLEOS ZEN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'MASTER LWB FWD PLATFORM CAB (110KW)', NULL, '6AT', '2WD', 2300, 'SINGLE CAB', NULL, NULL, 'diesel', 7051886, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'MASTER LWB FWD PLATFORM CAB (110KW)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'MASTER PRO ELWB RWD (120KW) L4H3', NULL, '6AT', '2WD', 2300, 'VAN', NULL, NULL, 'diesel', 8132635, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'MASTER PRO ELWB RWD (120KW) L4H3'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'MASTER PRO LWB FWD (110KW) L3H2', NULL, '6AT', '2WD', 2300, 'PEOPLE MOVER', NULL, NULL, 'diesel', 9280930, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'MASTER PRO LWB FWD (110KW) L3H2'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'MASTER PRO LWB FWD (110KW) L3H2', NULL, '6AT', '2WD', 2300, 'VAN', NULL, NULL, 'diesel', 7727354, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'MASTER PRO LWB FWD (110KW) L3H2'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'MASTER PRO LWB FWD (120KW) L3H2', NULL, '6AT', '2WD', 2300, 'VAN', NULL, NULL, 'diesel', 7389620, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'MASTER PRO LWB FWD (120KW) L3H2'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'MASTER PRO LWB RWD (120KW) L3H2', NULL, '6AT', '4WD', 2300, 'VAN', NULL, NULL, 'diesel', 7727354, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'MASTER PRO LWB RWD (120KW) L3H2'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'MASTER PRO MWB FWD (110KW) L2H2', NULL, '6AT', '2WD', 2300, 'VAN', NULL, NULL, 'diesel', 7457167, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'MASTER PRO MWB FWD (110KW) L2H2'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'MASTER PRO MWB FWD (120KW) L2H2', NULL, '6AT', '4WD', 2300, 'VAN', NULL, NULL, 'diesel', 7389620, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'MASTER PRO MWB FWD (120KW) L2H2'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'MASTER PRO SWB FWD (110KW) L1H1', NULL, '6AT', '2WD', 2300, 'VAN', NULL, NULL, 'diesel', 6714152, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'MASTER PRO SWB FWD (110KW) L1H1'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'MEGANE E-TECH TECHNC1:C73', NULL, 'AT', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 7428797, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'MEGANE E-TECH TECHNC1:C73'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'MEGANE E-TECH TECHNO EV60', NULL, 'AT', '4WD', NULL, 'SUV', NULL, NULL, 'electric', 6003560, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'MEGANE E-TECH TECHNO EV60'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'MEGANE R.S. TROPHY', NULL, '6AT', '2WD', 1800, 'HATCHBACK', NULL, NULL, 'petrol', 7801655, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'MEGANE R.S. TROPHY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'MEGANE R.S. ULTIME', NULL, '6AT', '2WD', 1800, 'HATCHBACK', NULL, NULL, 'petrol', 7920538, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'MEGANE R.S. ULTIME'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'TRAFIC L1 SWB PREMIUM', NULL, '6AT', '2WD', 2000, 'VAN', NULL, NULL, 'diesel', 5676633, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'TRAFIC L1 SWB PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'TRAFIC L1 SWB PRO', NULL, '6AT', '4WD', 2000, 'VAN', NULL, NULL, 'diesel', 6619586, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'TRAFIC L1 SWB PRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'TRAFIC L2 LWB CREW LIFESTYLE', NULL, '6AT', '2WD', 2000, 'VAN', NULL, NULL, 'diesel', 8510897, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'TRAFIC L2 LWB CREW LIFESTYLE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'TRAFIC L2 LWB CREW PRO', NULL, '6AT', '2WD', 2000, 'VAN', NULL, NULL, 'diesel', 7835429, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'TRAFIC L2 LWB CREW PRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'TRAFIC L2 LWB PREMIUM', NULL, '6AT', '2WD', 2000, 'VAN', NULL, NULL, 'diesel', 7565242, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'TRAFIC L2 LWB PREMIUM'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'TRAFIC L2 LWB PRO', NULL, '6AT', '4WD', 2000, 'VAN', NULL, NULL, 'diesel', 7159961, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'TRAFIC L2 LWB PRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'TRAFIC L2 LWB PRO', NULL, '6AT', '2WD', 2000, 'VAN', NULL, NULL, 'diesel', 6889774, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'TRAFIC L2 LWB PRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'TWINGO TEMPO', 'DBA-AHH4B', 'AT', '2WD', 900, 'HATCHBACK', NULL, NULL, 'petrol', 1556461, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'TWINGO TEMPO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'TWINGO GT', 'VF1AHB55AJ078', 'AT', '2WD', 900, 'HATCHBACK', NULL, NULL, 'petrol', 2605389, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'TWINGO GT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'TWINGO ZEN', 'VF1AHB115H076', 'AT', '2WD', 900, 'HATCHBACK', NULL, NULL, 'petrol', 913289, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'TWINGO ZEN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'TWINGO LE COQ SPORTIF', 'VF1AH0008K080', 'AT', '2WD', 900, 'HATCHBACK', NULL, NULL, 'petrol', 2900854, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'TWINGO LE COQ SPORTIF'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'TWINGO PLAY', 'DBA-AHH4B', 'AT', '2WD', 900, 'HATCHBACK', NULL, NULL, 'petrol', 1423531, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'TWINGO PLAY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'TWINGO GT BLANC', 'VF1AHB55AJ077', 'AT', '2WD', 900, 'HATCHBACK', NULL, NULL, 'petrol', 2014460, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'TWINGO GT BLANC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'TWINGO', 'VF1AHB55AJ077', 'AT', '2WD', 900, 'HATCHBACK', NULL, NULL, 'petrol', 2309925, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'TWINGO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'TWINGO EDC CANVAS TOP', 'VF1AHB22AK078', 'AT', '2WD', 900, 'HATCHBACK', NULL, NULL, 'petrol', 1631730, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'TWINGO EDC CANVAS TOP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'TWINGO CIEL', '3BA-AHH4B', 'AT', '2WD', 900, 'HATCHBACK', NULL, NULL, 'petrol', 3295193, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'TWINGO CIEL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'TWINGO SIGNATURE', 'VF1AH0006L080', 'AT', '2WD', 900, 'HATCHBACK', NULL, NULL, 'petrol', 2677756, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'TWINGO SIGNATURE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'TWINGO S', '7BA-AHB4D', 'AT', '2WD', 900, 'HATCHBACK', NULL, NULL, 'petrol', 1980792, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'TWINGO S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'TWINGO SANDRE', '3BA-AHH4B', 'AT', '2WD', 900, 'HATCHBACK', NULL, NULL, 'petrol', 2664405, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'TWINGO SANDRE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'TWINGO INTENS', 'VF1AH000XN084', 'AT', '2WD', 900, 'HATCHBACK', NULL, NULL, 'petrol', 3934883, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'TWINGO INTENS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'TWINGO EDC', 'VF1AH0000K080', 'AT', '2WD', 900, 'HATCHBACK', NULL, NULL, 'petrol', 2826939, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'TWINGO EDC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'TWINGO INTENS', 'VF1AH000XN084', 'AT', '2WD', 900, 'HATCHBACK', NULL, NULL, 'petrol', 3934883, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'TWINGO INTENS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'TWINGO INTENS CANVAS TOP', 'VF1AH0006N084', 'AT', '2WD', 900, 'HATCHBACK', NULL, NULL, 'petrol', 3816658, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'TWINGO INTENS CANVAS TOP'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'TWINGO INTENS EDC EDITION FINALE', '3BA-AHH4B', 'AT', '2WD', 900, 'HATCHBACK', NULL, NULL, 'petrol', 4772516, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'TWINGO INTENS EDC EDITION FINALE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'KANGOO ZEN', 'VF1KW14B3H076', 'AT', '2WD', 1200, 'WAGON', NULL, NULL, 'petrol', 1877467, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'KANGOO ZEN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'KANGOO 20 ANS', 'ABA-KWH5F1', 'AT', '2WD', 1200, 'WAGON', NULL, NULL, 'petrol', 2720518, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'KANGOO 20 ANS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'CAPTUR INTENS LEATHER', 'VF12R021AJ077', 'AT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 2100178, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'CAPTUR INTENS LEATHER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'KANGOO ESCAPADE', 'VF1KW14B3K079', 'AT', '2WD', 1200, 'WAGON', NULL, NULL, 'petrol', 2679110, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'KANGOO ESCAPADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'LUTECIA LIMITED', 'VF15RBUODJ078', 'AT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 1423531, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'LUTECIA LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'LUTECIA GT LINE', 'ABA-RH5F1', 'AT', '2WD', 1200, 'HATCHBACK', NULL, NULL, 'petrol', 1346714, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'LUTECIA GT LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'KANGOO COULEUR', 'VF1KW14B3K080', 'AT', '2WD', 1200, 'WAGON', NULL, NULL, 'petrol', 3228438, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'KANGOO COULEUR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'KANGOO PAYSAGE', 'VF1KW14B3K080', 'AT', '2WD', 1200, 'WAGON', NULL, NULL, 'petrol', 3713333, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'KANGOO PAYSAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'KANGOO LA POSTE', 'ABA-KWH5F1', 'AT', '2WD', 1200, 'WAGON', NULL, NULL, 'petrol', 3373558, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'KANGOO LA POSTE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'KANGOO PANACHE', 'VE1KW14B3L081', 'AT', '2WD', 1200, 'WAGON', NULL, NULL, 'petrol', 2664405, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'KANGOO PANACHE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'LUTECIA INTENS', '7BA-BJAH5H', 'AT', '2WD', 1300, 'HATCHBACK', NULL, NULL, 'petrol', 2812234, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'LUTECIA INTENS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'CAPTUR INTENS TECH PACK', 'VF1RJB001L081', 'AT', '2WD', 1300, 'HATCHBACK', NULL, NULL, 'hybrid', 2606744, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'CAPTUR INTENS TECH PACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'CAPTUR INTENS', 'VF1RJB002M082', 'AT', '2WD', 1300, 'HATCHBACK', NULL, NULL, 'petrol', 3295193, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'CAPTUR INTENS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'LUTECIA INTENS TECH PACK', 'VF1RJA008M081', 'AT', '2WD', 1300, 'HATCHBACK', NULL, NULL, 'petrol', 3107698, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'LUTECIA INTENS TECH PACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'LUTECIA INTENS PLUS', 'VF1RJA009M083', 'AT', '2WD', 1300, 'HATCHBACK', NULL, NULL, 'petrol', 2930265, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'LUTECIA INTENS PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'KANGOO PREMIERE EDITION', '3BA-KFKH5H', 'AT', '2WD', 1300, 'WAGON', NULL, NULL, 'petrol', 5037408, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'KANGOO PREMIERE EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'ARKANA SPORT LINE MILD HYBRID', '7AA-LJLH5HH', 'AT', '2WD', 1300, 'HATCHBACK', NULL, NULL, 'hybrid', 5038376, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'ARKANA SPORT LINE MILD HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'KANGOO VARIETE(BLACK BUMPER SPECIFICATIONS)', '3BA-KFKH5H', 'AT', '2WD', 1300, 'WAGON', NULL, NULL, 'petrol', 5269794, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'KANGOO VARIETE(BLACK BUMPER SPECIFICATIONS)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'LUTECIA INTENS EDITION FINALE', '3BA-BJAH5H', 'AT', '2WD', 1300, 'HATCHBACK', NULL, NULL, 'petrol', 3827494, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'LUTECIA INTENS EDITION FINALE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'KANGOO', 'VF1KW32H25925', 'AT', '2WD', 1500, 'WAGON', NULL, NULL, 'diesel', 5633755, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'KANGOO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'KANGOO CREATIF', '7DA-KFKK9K', 'AT', '2WD', 1500, 'WAGON', NULL, NULL, 'diesel', 6047250, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'KANGOO CREATIF'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'RENAULT', 'LUTECIA SPORT CHASSIS CUP', 'VF15RA63DH076', 'AT', '2WD', 1600, 'HATCHBACK', NULL, NULL, 'petrol', 2453849, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'RENAULT' AND model = 'LUTECIA SPORT CHASSIS CUP'
);