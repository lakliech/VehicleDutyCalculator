INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE FINE TECH TOURER', 'CBA-TRH224W-VTNGTQ', '6AT', '2WD', 2693, 'VAN', '2820', '10', 'petrol', 7814196, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE FINE TECH TOURER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE FINE TECH TOURER', 'CBA-TRH224W-VTNGTQ', '6AT', '2WD', 2693, 'VAN', '2820', '10', 'diesel', 7814196, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE FINE TECH TOURER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE FINE TECH TOURER', '3BA-TRH224W-VTNGTQ', '6AT', '4WD', 2693, 'VAN', '2820', '10', 'petrol', 8842407, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE FINE TECH TOURER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE FINE TECH TOWER', '3BA-TRH224W-VTNGTQ', '6AT', '2WD', 2270, 'VAN', '2820', '10', 'petrol', 8773068, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE FINE TECH TOWER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE LOW TEMP REFRIGERATING    VAN', '3DF-GDH201V-VTBTTB', '6AT', '2WD', 2754, 'VAN', '3235', '3', 'diesel', 8856904, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE LOW TEMP REFRIGERATING    VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE LOW TEMPERATURE REFRIGERATING VAN', '3DF-GDH201V-VTBTTB', '6AT', '2WD', 2754, 'VAN', '3265', '3', 'petrol', 8951045, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE LOW TEMPERATURE REFRIGERATING VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE SCHOOL BUS', '3BA-TRH219W-VTNHTD', '6AT', '4WD', 2693, 'BUS', '2580', '14', 'petrol', 6692194, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE SCHOOL BUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE SCHOOL BUS', '3BA-TRH219W-VTNHTD', '6AT', '4WD', 2693, 'VAN', '2580', '14', 'petrol', 5933607, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE SCHOOL BUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE SCHOOL BUS', 'CBA-TRH219W-VTNHTD', '6AT', 'AWD', 2693, 'VAN', '2580', '14', 'diesel', 5861520, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE SCHOOL BUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE VAN', '3BF-TRH200K-VTASTL', 'CVT/6AT', '2WD', 1998, 'VAN', '3185', '6', 'petrol', 5380512, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE VAN', '3DF-GDH201V-VTBTTB', '6AT', '2WD', 2754, 'VAN', '3265', '3', 'petrol', 9049028, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE VAN', '3DF-GDH211K-KRTEY', 'CVT', '2WD', 2754, 'VAN', '3150', '5', 'petrol', 6793495, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE VAN', 'QDF-KDH201C-SRPEY', '4AT', '2WD', 2982, 'VAN', '3030', '2', 'petrol', 5467625, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE VAN', 'CBF-TRH200K-VTASTL', '6AT', '2WD', 1998, 'VAN', '3040', '6', 'petrol', 4645901, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE VAN', 'QDF-QDH201V-SRTEY', '6AT', '2WD', 2754, 'VAN', '3105', '5', 'diesel', 5761965, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE VAN GL', '3DF-GDH211K-KRTEY', '6AT', '2WD', 2754, 'VAN', '315', '5', 'diesel', 6687827, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE VAN GL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE VAN GL', 'QDF-GDH201V-SRTEY', '6AT', '2WD', 2754, 'VAN', '3040', '5', 'diesel', 5761965, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE VAN GL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE VAN MODERATE TEMPERATURE REFRIGERATING VAN', '3BF-TRH200V-VTBPTK', '6AT', '2WD', 1998, 'VAN', '2985', '3', 'petrol', 5785941, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE VAN MODERATE TEMPERATURE REFRIGERATING VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE VAN VAN WITH LIFT', '3BF-TRH200K-VTASTL', '6AT', '2WD', 1998, 'VAN', '3185', '6', 'petrol', 5330560, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE VAN VAN WITH LIFT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE WAGON', '3BA-TRH224-LDTNK', 'CVT', '2WD', 2693, 'VAN', '2590', '10', 'petrol', 6513169, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE WAGON'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE WAGON', 'CBA-TRH224W-LDTNK', '6AT', '2WD', 2693, 'VAN', '2590', '10', 'petrol', 5831829, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE WAGON'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE WAGON GRAND CABIN', '3BA--TRH224W-LDTNK', '6AT', '2WD', 2693, 'VAN', '2590', '10', 'petrol', 6513169, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE WAGON GRAND CABIN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE WAGON GRAND CABIN', '3BA-TRH224W-LDTNK', 'CVT', '2WD', 2693, 'VAN', '2590', '5', 'petrol', 6463217, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE WAGON GRAND CABIN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE WAGON GRAND CABIN', 'CBA-TRH224W-LDTNK', 'CVT', 'AWD', 2693, 'VAN', '2590', '10', 'petrol', 5713478, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE WAGON GRAND CABIN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE WAGON GRAND CABIN', 'CBA-TRH224W-LDTNK', '6AT', '2WD', 2693, 'VAN', '2590', '10', 'petrol', 5831829, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE WAGON GRAND CABIN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE WELCAB DX', '3BF-TRH200K-VTZYF', '6AT', '2WD', 1998, 'VAN', '2670', '5', 'petrol', 6616043, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE WELCAB DX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HIACE WELCAB DX', '3BF-TRH200K-VTZYBUW', 'CVT', '2WD', 1998, 'VAN', '2690', '10', 'petrol', 7171455, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HIACE WELCAB DX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HILUX 2GD 4 S/CAB  STD-E4 (VEHICLE STABILITY CONTROL; AIRBAGS;  WITH AIR CONDITIONER)', 'GUN125R-BJFSXJ', 'MT', '4WD', 2400, 'S/CAB', NULL, NULL, 'diesel', 4462500, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HILUX 2GD 4 S/CAB  STD-E4 (VEHICLE STABILITY CONTROL; AIRBAGS;  WITH AIR CONDITIONER)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HILUX 2GD D/CAB BASIC-E4 ( WITHOUT CENTRAL LOCKING)', 'GUN125R-DJFLXJ', 'MT', '4WD', 2400, 'D/CAB', NULL, NULL, 'diesel', 4462500, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HILUX 2GD D/CAB BASIC-E4 ( WITHOUT CENTRAL LOCKING)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HILUX 2GD D/CAB -E4 (FABRIC SEATS)', 'GUN126R-DJFHXJ', 'MT', '4WD', 2800, 'D/CAB', NULL, NULL, 'diesel', 6589000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HILUX 2GD D/CAB -E4 (FABRIC SEATS)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HILUX 2GD D/CAB -E4 (LEATHER SEATS)', 'GUN126R-DJTHXJ', 'AT', '4WD', 2800, 'D/CAB', NULL, NULL, 'diesel', 6951000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HILUX 2GD D/CAB -E4 (LEATHER SEATS)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HILUX 2GD D/CAB STD-E4 (INCLUDES CENTRAL LOCKING)', 'GUN125R-DJFLXJ', 'MT', '4WD', 2400, 'D/CAB', NULL, NULL, 'diesel', 5712000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HILUX 2GD D/CAB STD-E4 (INCLUDES CENTRAL LOCKING)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HILUX 2GD S/CAB -E4 (WITH DIFF LOCK;  WITH AIR CONDITIONER; DRIVER & PASSANGER AIRBAGS)', 'GUN135R-BJFLXJ', 'MT', '2WD', 2400, 'S/CAB', NULL, NULL, 'diesel', 3400000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HILUX 2GD S/CAB -E4 (WITH DIFF LOCK;  WITH AIR CONDITIONER; DRIVER & PASSANGER AIRBAGS)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HILUX D/C GD-6 COMFORT PLUS TMT-E4*', 'GUN125R-DTFSX', '6MT', '4WD', 2400, 'D/CAB', NULL, NULL, 'diesel', 5240000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HILUX D/C GD-6 COMFORT PLUS TMT-E4*'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HILUX D/C GD-6 COUNTRY TMT - E4', 'GUN125R-DTFLX', '6MT', '4WD', 2400, 'D/CAB', NULL, NULL, 'diesel', 4823839, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HILUX D/C GD-6 COUNTRY TMT - E4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HILUX D/CAB DELUXE 2GD  - E0', 'GUN125R-DNFSXN', 'MT', '4WD', 2400, 'D/CAB', NULL, NULL, 'diesel', 5240000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HILUX D/CAB DELUXE 2GD  - E0'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HILUX D/CAB DELUXE 2GD - E4', 'GUN125R-DNTSXN', 'AT', '4WD', 2400, 'D/CAB', NULL, NULL, 'diesel', 5712000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HILUX D/CAB DELUXE 2GD - E4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HILUX Z', '3DF-GUN125-DTTHX', '10AT', '4WD', 2393, 'D/CAB', '2875', '5', 'diesel', 7112071, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HILUX Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HILUX Z', '3DF-GUN125-DTTHX', '6AT/CVT', '4WD', 2393, 'D/CAB', '2875', '5', 'diesel', 6780221, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HILUX Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HILUX Z', 'QDF-GUN125-DTTHH', '6AT', '4WD', 2393, 'D/CAB', '2855', '5', 'diesel', 6074603, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HILUX Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HILUX Z', 'GDF-GUN125-DTTHH', '6AT', 'AWD', 2393, 'D/CAB', '2855', '5', 'diesel', 6071068, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HILUX Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HILUX Z', 'QDF-GUN125-DTTHH', '6AT', '4WD', 2393, 'D/CAB', '2855', '5', 'diesel', 6536049, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HILUX Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'HYBRID F / VITZ HYBRID F', 'DAA-NHP130-VTPBXN', 'CVT', '2WD', 1496, 'HATCHBACK', '1160', '5', 'petrol', 3451521, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'HYBRID F / VITZ HYBRID F'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ISIS PLATANA V-SELECTION 2.0L', 'DBA-ZGM11W-AWXSP(U)', 'CVT', '2WD', 1986, 'VAN', '1855', '7', 'petrol', 4071271, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ISIS PLATANA V-SELECTION 2.0L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'JPN TAXI', 'DAA-NTP10-AHXGN(K)', 'CVT', '2WD', 1496, 'VAN', '1685', '5', 'petrol', 5432560, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'JPN TAXI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'JPN TAXI', 'DAA-NTP10-AHXGN', 'CVT', '2WD', 1496, 'VAN', '1685', '5', 'petrol', 5432560, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'JPN TAXI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'JPN TAXI', '6AA-NTP10-AHXGN(K)', 'CVT', '2WD', 1496, 'VAN', '1685', '5', 'petrol', 5975817, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'JPN TAXI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'JPN TAXI TAKUMI', '6AA-NTP10-AHXGN', 'CVT', '2WD', 1496, 'VAN', '1685', '5', 'petrol', 5975817, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'JPN TAXI TAKUMI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'JPN TAXI TAKUMI', 'DAA-NTP10-AHXGN', 'CVT', '2WD', 1496, 'VAN', '1685', '5', 'petrol', 5449769, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'JPN TAXI TAKUMI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LAND CRUISER 200 VXR 1VD', 'VDJ200R-GNTVZ', 'AT', '4WD', 4500, 'S/WAGON', NULL, NULL, 'diesel', 20160000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LAND CRUISER 200 VXR 1VD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LAND CRUISER PRADO TZ-G', '3DA-GDJ151W-GKTZY', '6AT/CVT', '4WD', 2754, 'SUV', '2715', '7', 'diesel', 9681289, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LAND CRUISER PRADO TZ-G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LAND CRUISER PRADO TZ-G', 'LDA-GDJ151W-GKTZY', '6AT', '4WD', 2754, 'SUV', '2715', '7', 'diesel', 9367394, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LAND CRUISER PRADO TZ-G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LAND CRUISER PRADO TZ-G', 'LDA-GDJ151W-GKTZY', '6AT', 'AWD', 2754, 'SUV', '2705', '7', 'diesel', 9397068, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LAND CRUISER PRADO TZ-G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LAND CRUISER ZX', '3BA-VJA300W-GNUZZ', '5MT', '4WD', 3444, 'SUV', '2885', '7', 'petrol', 13770032, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LAND CRUISER ZX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LAND CRUISER ZX', '3BA-VJA300W-GNUZZ', '10AT', '4WD', 3444, 'SUV', '2885', '7', 'petrol', 13770032, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LAND CRUISER ZX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LAND CRUISER ZX', '3BA-VJA300W-GNUZZ', 'CVT', '4WD', 3444, 'SUV', '2885', '5', 'petrol', 13770032, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LAND CRUISER ZX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LAND CRUISER ZX', '3BA-URJ202W-GNTVK', '6AT', '4WD', 4608, 'SUV', '3130', '8', 'petrol', 11959178, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LAND CRUISER ZX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LAND CRUISER ZX', 'CBA-URJ202W-GNYVK', '6AT', '4WD', 4608, 'SUV', '3130', '8', 'petrol', 11959178, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LAND CRUISER ZX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LAND CRUISER ZX', 'CBA-URJ202W-GNTVK', '6AT', 'AWD', 4608, 'SUV', '3130', '8', 'petrol', 11978139, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LAND CRUISER ZX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LANDCRUISER 79VD SINGLE CABIN E4', 'VDJ79R-TJMNYJ', 'MT', '4WD', 4500, 'S/CAB', NULL, NULL, 'diesel', 6439508, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LANDCRUISER 79VD SINGLE CABIN E4'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LANDCRUISER HARDTOP LX', 'VDJ76R-RKMNY', '5MT', '4WD', 4500, 'S/WAGON', NULL, NULL, 'diesel', 11519792, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LANDCRUISER HARDTOP LX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LITE ACE DX', 'DBF-S412-ZMRFJD', '5MT', '4WD', 1495, 'VAN', '2090', '2', 'petrol', 2877855, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LITE ACE DX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LITE ACE TRUCK DX', 'DBF-S402U-TQRFJD', '4AT', '2WD', 1495, 'TRUCK', '2050', '2', 'diesel', 2369200, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LITE ACE TRUCK DX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LITE ACE VAN', 'DBF-S412M-ZMRFJD', '5MT', '2WD', 1495, 'VAN', '2055', '5', 'petrol', 2895689, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LITE ACE VAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'LITE ACE VAN GL', 'DBF-S412M-ZMRFJD', '5MT', '4WD', 1495, 'VAN', '2090', '5', 'diesel', 2895689, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'LITE ACE VAN GL'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'MARK X', 'DBA-GRX133-AETTH', '6AT', '2WD', 3456, 'SEDAN', '1835', '5', 'petrol', 6724680, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'MARK X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'MARK X 350RDS', 'DBA-GRX133-AETTH', '5MT', 'AWD', 3456, 'SEDAN', '1835', '5', 'petrol', 6745982, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'MARK X 350RDS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'MARK X 350RDS', 'DBA-GR133-AETTH', '6AT', '2WD', 3456, 'SEDAN', '1835', '5', 'petrol', 6724680, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'MARK X 350RDS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'MIRAI', 'ZBA-JPD10-CEDSS', 'CVT', '2WD', NULL, 'SEDAN', '2070', '5', 'electric', 10353164, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'MIRAI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'MIRAI', 'ZBA-JPD10-CEDSS', 'CVT', 'AWD', 3456, 'SEDAN', '2070', '4', 'petrol', 12678283, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'MIRAI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'MIRAI', 'ZBA-JPD10-CEDSS', 'CVT', '2WD', NULL, 'SEDAN', '2070', '4', 'electric', 10297832, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'MIRAI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'MIRAI Z', 'ZBA-JPD20-CEDHS', 'CVT', '4WD', 2487, 'SEDAN', '2205', '5', 'petrol', 13797977, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'MIRAI Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'MIRAI Z', 'ZBA-JPD20-CEDHS', 'CVT', '2WD', NULL, 'SEDAN', '1645', '5', 'electric', 12329733, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'MIRAI Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'MIRAI Z ADVANCED DRIVE', 'ZBA-JPD20-CEDHS(T)', 'CVT', '2WD', NULL, 'SEDAN', '2245', '5', 'electric', 12987564, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'MIRAI Z ADVANCED DRIVE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'NOAH CROWN Z', 'ZBA-KZSM30-CEDGS', 'CVT', '2WD', NULL, 'VAN', '1645', '5', 'electric', 12757016, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'NOAH CROWN Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'NOAH G (HYBRID)', '6AA-ZWR92W-APXGB', 'CVT', '2WD', 1797, 'VAN', '2055', '7', 'petrol', 6048404, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'NOAH G (HYBRID)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'NOAH HYBRID Si', '6AA-ZWR80W-APXSB', 'CVT', '2WD', 1797, 'VAN', '2005', '5', 'petrol', 5846325, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'NOAH HYBRID Si'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'NOAH HYBRID Si', 'DAA-ZWR80W-APXSB', 'CVT', '2WD', 1797, 'VAN', '2005', '7', 'petrol', 5314841, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'NOAH HYBRID Si'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'NOAH S-Z (HYBRID)', '6AA-ZWR90W-APXRB', 'CVT', '2WD', 1797, 'VAN', '2055', '7', 'petrol', 6409946, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'NOAH S-Z (HYBRID)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'NOAH WELCAB G HYBRID', '6AA-ZWR92W-APXGB', 'CVT', '2WD', 1797, 'VAN', '2055', '5', 'petrol', 6048404, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'NOAH WELCAB G HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'NOAH WELCAB S-G HYBRID', '6AA-ZWR90W-APXSB-W', 'CVT', '2WD', 1797, 'VAN', '2065', '5', 'petrol', 5976795, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'NOAH WELCAB S-G HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'NOAH WELCAB X', '6BA-MZRAW-VTRGAB', 'CVT', '2WD', 1986, 'VAN', '2025', '7', 'petrol', 5023162, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'NOAH WELCAB X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'NOAH X', 'DBA-ZRR80G-VTRFAE', 'CVT', '2WD', 1986, 'VAN', '2025', '8', 'petrol', 4665874, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'NOAH X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'NOAH X', '3BA-ZRR80G-VTRFAE', 'CVT', '2WD', 1986, 'VAN', '2025', '7', 'petrol', 4721004, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'NOAH X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PASSO MODA', '5BA-M700A-GBSE(G)', 'CVT', '2WD', 996, 'HATCHBACK', '1185', '5', 'petrol', 2632444, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PASSO MODA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PASSO MODA G', '5BA-M700A-GBSE(G)', '8AT', '2WD', 996, 'HATCHBACK', '1185', '5', 'petrol', 2632444, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PASSO MODA G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PASSO MODA G', '5BA-M700A-GBSE(G)', 'CVT', '2WD', 998, 'HATCHBACK', '1185', '5', 'petrol', 2632444, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PASSO MODA G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PASSO X G PACKAGE', 'DBA-M700A-GBNE(G)', 'CVT', '2WD', 996, 'HATCHBACK', '1185', '5', 'petrol', 2253917, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PASSO X G PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PIXIS EPOCH G', '5BA-LA350A-GBPF', 'CVT', '2WD', 658, 'HATCHBACK', '890', '5', 'petrol', 2065714, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PIXIS EPOCH G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PIXIS EPOCH G', 'DBA-LA350A-GBPF', 'CVT', '2WD', 658, 'HATCHBACK', '890', '4', 'petrol', 1877922, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PIXIS EPOCH G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PIXIS EPOCH GSA III', '5BA-LA350A-GBPF', 'CVT', '2WD', 658, 'HATCHBACK', '890', '4', 'petrol', 2065714, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PIXIS EPOCH GSA III'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PIXIS EPOCH GSA III', 'DBA-LA350-GBPF', 'CVT', '2WD', 658, 'HATCHBACK', '890', '4', 'petrol', 1883871, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PIXIS EPOCH GSA III'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PIXIS G', '5BA-LA350A-GBPF', 'CVT', '2WD', 658, 'HATCHBACK', '890', '4', 'petrol', 1877922, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PIXIS G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PIXIS G TURBO', '3BA-LA250A-GBVZ', 'CVT', '2WD', 658, 'HATCHBACK', '1060', '4', 'petrol', 2355786, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PIXIS G TURBO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PIXIS JOY  F G TURBO SA III', '3BA-LA20A-GBVZ', 'CVT', '2WD', 658, 'HATCHBACK', '1069', '5', 'petrol', 2590527, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PIXIS JOY  F G TURBO SA III'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PIXIS JOY C G', 'DBA-LA250A-GBGZ', 'CVT', '2WD', 658, 'HATCHBACK', '1060', '4', 'petrol', 2355786, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PIXIS JOY C G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PIXIS JOY C G TURBOSA III', 'DBA-LA250A-GBGZ', 'CVT', '2WD', 658, 'HATCHBACK', '1060', '4', 'petrol', 2363249, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PIXIS JOY C G TURBOSA III'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PIXIS JOY F G', '3BA-LA250A-GBVZ(P)', 'CVT', '2WD', 658, 'HATCHBACK', '1060', '5', 'petrol', 2702028, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PIXIS JOY F G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PIXIS JOY F G', 'DBA-LA250A-GBGZ', 'CVT', '2WD', 658, 'HATCHBACK', '1060', '4', 'petrol', 2355786, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PIXIS JOY F G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'PIXIS MEGA G', 'DBA-LA700A-GBVZ', 'CVT', '2WD', 658, 'HATCHBACK', '1240', '4', 'petrol', 2598910, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'PIXIS MEGA G'
);