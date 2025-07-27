INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R STINGRAY HYBRID T', 'DAA-MH55S/WSTB-MJ', 'CVT', '2WD', 658, 'WAGON', '1020', '4', 'petrol', 2575436, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R STINGRAY HYBRID T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R STINGRAY HYBRID T', '4AA-MH55S/WSTB-AJ2', 'CVT', '2WD', 658, 'WAGON', '1020', '4', 'petrol', 2772115, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R STINGRAY HYBRID T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R STINGRAY HYBRID T', '4AA-MH55S/WSTB-MJ2', 'CVT', '2WD', 658, 'WAGON', '1020', '4', 'petrol', 2630768, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R STINGRAY HYBRID T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R STINGRAY HYBRID T', 'DAA-MH55S/WSTB-AJ', 'CVT', '2WD', 658, 'WAGON', '1020', '4', 'petrol', 2583594, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R STINGRAY HYBRID T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R STINGRAY HYBRID T', 'DAA-MH55S/WSTB-AJ', 'CVT', '2WD', 658, 'WAGON', '1020', '4', 'petrol', 2575436, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R STINGRAY HYBRID T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R STINGRAY L', 'DBA-MH35S/WSKE-AJ', 'CVT', '2WD', 658, 'WAGON', '1040', '4', 'petrol', 2577113, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R STINGRAY L'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R STINGRAY X', '4BA-HA36S/ASWF-A3', '5MT', '2WD', 658, 'WAGON', '890', '4', 'petrol', 2578454, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R STINGRAY X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGON R STINGRAY X', '5BA-MH85S/WSKE-AJ2', 'CVT', '2WD', 657, 'WAGON', '1595', '4', 'petrol', 2665979, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGON R STINGRAY X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'WAGONV R CUSTOM Z HYBRID ZT', '4AA-MH55S/WZTB-A3', 'CVT', '2WD', 658, 'WAGON', '1020', '4', 'petrol', 2738916, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'WAGONV R CUSTOM Z HYBRID ZT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'XBEE HYBRID HYBRID MZ', 'DAA-MN71S/CBZK-J', '6AT', '2WD', 996, 'SUV', '1235', '5', 'petrol', 3110309, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'XBEE HYBRID HYBRID MZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'XBEE HYBRID MZ', '4AA-MN71S/CBZK-J3', '6AT', '4WD', 996, 'SUV', '1235', '5', 'petrol', 3520936, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'XBEE HYBRID MZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'XBEE HYBRID MZ', '4AA-MN71S/CBZK-J3', '6AT', '2WD', 996, 'SUV', '1235', '5', 'petrol', 3520936, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'XBEE HYBRID MZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'XBEE HYBRID MZ', '4AA-MN71S/CBZK-J4', '6AT', '2WD', 996, 'SUV', '1235', '5', 'petrol', 3672176, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'XBEE HYBRID MZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'XBEE HYBRID MZ', '4AA-MN71S/CBZK-J2', '6AT', '2WD', 996, 'SUV', '1235', '5', 'petrol', 3458227, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'XBEE HYBRID MZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'SUZUKI', 'XBEE HYBRID MZ', '4AA-MN71S/CBZK-JM2', '6AT', '2WD', 996, 'SUV', '1235', '5', 'petrol', 3227679, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'SUZUKI' AND model = 'XBEE HYBRID MZ'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TATA', 'ATA   XENON  YODHA PICKUP 4SPTC  BSI', NULL, 'MANUAL', '2WD', 2956, 'PICK UP', '3450', NULL, 'diesel', 2001444, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TATA' AND model = 'ATA   XENON  YODHA PICKUP 4SPTC  BSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TATA', 'LPG 1216 48 WB CAB AND CHASSIS(KITS)', NULL, 'MANUAL', '2WD', 5676, 'TRUCK', '12600', NULL, 'diesel', 3784679, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TATA' AND model = 'LPG 1216 48 WB CAB AND CHASSIS(KITS)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TATA', 'LPK 2516 (6X4) II  PPER', NULL, 'MANUAL', '6X4', 5883, 'TIPPER', '25000', NULL, 'diesel', 6206071, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TATA' AND model = 'LPK 2516 (6X4) II  PPER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TATA', 'LPK 2518 (6X4) TIPPER (BOGGY)', NULL, 'MANUAL', '6X4', 5883, 'TIPPER', '25000', NULL, 'diesel', 7331079, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TATA' AND model = 'LPK 2518 (6X4) TIPPER (BOGGY)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TATA', 'LPK 2518 (6X4) TRANSIT MIXER STETTOR', NULL, 'MANUAL', '6X4', 5883, 'TRANSIT  MIXER', '25000', NULL, 'diesel', 11766009, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TATA' AND model = 'LPK 2518 (6X4) TRANSIT MIXER STETTOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TATA', 'LPO 1316TC BUS CHASSIS CHASSIS 60 SEATER', NULL, 'MAN  UAL', '4X2', 5883, 'BUS', NULL, NULL, 'diese l', 4122799, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TATA' AND model = 'LPO 1316TC BUS CHASSIS CHASSIS 60 SEATER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TATA', 'LPT  809/38 CBC CKD', NULL, 'MANUAL', '2WD', 3784, 'TRUCK', '8720', NULL, 'diesel', 2541304, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TATA' AND model = 'LPT  809/38 CBC CKD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TATA', 'LPT 1518 CAB / CHASSIS', NULL, 'MANUAL', '2WD', 5883, 'TRUCK', '16000', NULL, 'diesel', 5077718, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TATA' AND model = 'LPT 1518 CAB / CHASSIS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TATA', 'NOVUS V3T6F - CKD (12 SPEED)', NULL, 'MANUAL', '6X4', 11015, 'PRIM£ MOVER', NULL, NULL, 'diesel', 11347862, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TATA' AND model = 'NOVUS V3T6F - CKD (12 SPEED)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TATA', 'SIGNA 1618 TIPP LR', NULL, 'MANUAL', '4X2', 5883, 'TIPPER', '16200', NULL, 'diesel', 5027798, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TATA' AND model = 'SIGNA 1618 TIPP LR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TATA', 'SIGNA LPT 25T8 (6X4) CAB / CHASSIS', NULL, 'MANUAL', '6X4', 5883, 'TRUCK', '25000', NULL, 'diesel', 5069998, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TATA' AND model = 'SIGNA LPT 25T8 (6X4) CAB / CHASSIS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TATA', 'TATA  407 DT DSLB', NULL, 'MANUAL', '2WD', 2956, 'PICK UP', '5400', NULL, 'diesel', 2418304, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TATA' AND model = 'TATA  407 DT DSLB'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TATA', 'TATA DAEWOO  F8C6F(11051CC)', NULL, 'MANUAL', '6X4', 11015, 'BUS', NULL, NULL, 'diesel', 9006240, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TATA' AND model = 'TATA DAEWOO  F8C6F(11051CC)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TATA', 'TATA INTRA  V20 AC BS-IV', NULL, 'MANUAL', '2WD', 1396, 'PICK UP', '2300', NULL, 'diesel', 1540324, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TATA' AND model = 'TATA INTRA  V20 AC BS-IV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TATA', 'TATA XENON', NULL, '6AT', '2WD', 2200, 'DUAL CAB', NULL, NULL, 'diesel', 5195600, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TATA' AND model = 'TATA XENON'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TATA', 'TATA XENON', NULL, '5MT', '2WD', 2200, 'SINGLE CAB', NULL, NULL, 'diesel', 5856057, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TATA' AND model = 'TATA XENON'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TATA', 'TATA XENON/31  DC 4X4   ABS EV', NULL, 'MANUAL', '4WD', 2956, 'PICK UP', '3150', NULL, 'diesel', 3242246, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TATA' AND model = 'TATA XENON/31  DC 4X4   ABS EV'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TATA', 'TRAVELLER  AM8ULANCE', NULL, 'MANUAL', '2WD', 2596, 'AMBULANCE', '6780', NULL, 'di esel', 7496074, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TATA' AND model = 'TRAVELLER  AM8ULANCE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TATA', 'TRAVELLER  BUS', NULL, 'MAN UAL', '2WD', 2596, 'MINI BUS', '6780', NULL, 'di esel', 5731931, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TATA' AND model = 'TRAVELLER  BUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', '86 GT LIMITED', '4BA-ZN6-H2L7', '6AT', '2WD', 1998, 'COUPE', '1480', '4', 'petrol', 5257204, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = '86 GT LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', '86 GT LIMITED', 'DBA-ZN6-G2L7', '6AT', '2WD', 1998, 'COUPE', '1480', '4', 'petrol', 5257204, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = '86 GT LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'AERAS/ESTIMA HYBRID AERAS', 'DAA-AHR20W-GFXSB(W)', 'CVT', 'AWD', 2362, 'VAN', '2405', '7', 'petrol', 7570876, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'AERAS/ESTIMA HYBRID AERAS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ALION A18 G PACKAGE', 'DBA-ZRT260-VTQBCXG', 'CVT', '2WD', 1797, 'SEDAN', '1545', '5', 'petrol', 3954256, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ALION A18 G PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ALLION A15 G PLUS', '3BA-NZT260-CEXEK(J)', 'CVT', '2WD', 1496, 'SEDAN', '1475', '5', 'petrol', 3524152, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ALLION A15 G PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ALLION A20', 'DBA-ZRT261-CEXGP(J)', 'CVT', '2WD', 1986, 'SEDAN', '1545', '5', 'petrol', 4287058, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ALLION A20'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ALLION A20 G-PLUS PACKAGE', 'DBA-ZRT261-CEXGP', 'CVT', '2WD', 1986, 'SEDAN', '1545', '5', 'petrol', 4300638, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ALLION A20 G-PLUS PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ALLION A20 G-PLUS', 'DBA-ZRT261-CEXGP(J)', 'CVT', '2WD', 1986, 'SEDAN', '1545', '5', 'petrol', 4287058, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ALLION A20 G-PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ALPHARD EXECUTIVE LOUNGE (HYRID)', '6AA-AAH45W-PFXVB', 'CVT', '4WD', 2487, 'VAN', '2675', '7', 'petrol', 15230172, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ALPHARD EXECUTIVE LOUNGE (HYRID)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ALPHARD EXECUTIVE LOUNGE S (HYBRID)', '6AA-AYH30W-PFXZB', 'CVT', '4WD', 2493, 'VAN', '2625', '7', 'petrol', 13539483, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ALPHARD EXECUTIVE LOUNGE S (HYBRID)'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ALPHARD G', '6AA-AYH30W-PFQB(B)', 'CVT', '4WD', 2493, 'VAN', '2575', '5', 'petrol', 8744012, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ALPHARD G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ALPHARD G F', 'DAA-AYH30W-PFXQB(B)', 'CVT', '4WD', 2493, 'VAN', '2575', '7', 'petrol', 8942486, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ALPHARD G F'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ALPHARD HYBRID EXCLUSIVE LOUNGE S', '6AA-AY30W-PFXZB', 'CVT', '2WD', 2493, 'VAN', '2625', '5', 'petrol', 13539483, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ALPHARD HYBRID EXCLUSIVE LOUNGE S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ALPHARD HYBRID G', 'DAA-AYH30W-PFXQB(B)', 'CVT', '4WD', 2493, 'VAN', '2575', '7', 'petrol', 8977418, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ALPHARD HYBRID G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ALPHARD HYBRID G', 'DAA-AYH30W-PFQB(B)', 'CVT', 'AWD', 2493, 'VAN', '2565', '7', 'petrol', 8690476, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ALPHARD HYBRID G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ALPHARD S', 'DBA-AGH30W-VTSCXSP', 'CVT', 'AWD', 2493, 'VAN', '2425', '7', 'petrol', 6414482, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ALPHARD S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ALPHARD S', 'DBA-AGH30W-VTSCXSP', 'CVT', '2WD', 2493, 'VAN', '2425', '7', 'petrol', 6671933, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ALPHARD S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'ALPHARD S', '3BA-AGH30W-VTSCXSP', 'CVT', '2WD', 2493, 'VAN', '2425', '7', 'petrol', 6836112, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'ALPHARD S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'APLHARD WELCAB G', '3BA-AGH40W-PFXQK-W', 'CVT', '2WD', 2493, 'VAN', '2435', '7', 'petrol', 8243855, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'APLHARD WELCAB G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'AQUA CROSSOVER', 'DAA-NHP10H-AHXXB', 'CVT', '2WD', 1496, 'HATCHBACK', '1375', '5', 'petrol', 3212673, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'AQUA CROSSOVER'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'AQUA G', '6AA-NHP10-AHXEB', 'CVT', '2WD', 1496, 'HATCHBACK', '1365', '5', 'petrol', 3241092, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'AQUA G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'AQUA S', 'DAA-NHP10-VTUQXN', 'CVT', '2WD', 1496, 'HATCHBACK', '1465', '5', 'petrol', 4513720, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'AQUA S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'AQUA S', '6AA-NHP-VTUQXN', 'CVT', '2WD', 1496, 'HATCHBACK', '1465', '5', 'petrol', 4513720, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'AQUA S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'AQUA WELCAB X', '6AA-MXPK11-AHXNB(U)', 'CVT', '2WD', 1490, 'HATCHBACK', '1395', '5', 'petrol', 3635121, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'AQUA WELCAB X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'AQUA WELCAB X', '6AA-MXPK11-VQQLXN', 'CVT', '2WD', 1490, 'HATCHBACK', '1445', '5', 'petrol', 3616677, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'AQUA WELCAB X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'AQUA WELCAB X', '6AA-MXPK11-YVQQLXN', 'CVT', '2WD', 1496, 'HATCHBACK', '1445', '5', 'petrol', 3641828, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'AQUA WELCAB X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'AQUA X', '6AA-MXPK11-VQQLXN', 'CVT', '2WD', 1490, 'HATCHBACK', '1445', '5', 'petrol', 3616677, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'AQUA X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'AQUA Z', '6AA-MXPK11-AHXEB', 'CVT', '2WD', 1490, 'HATCHBACK', '1405', '5', 'petrol', 4024119, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'AQUA Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'AURIS HYBRID G PACKAGE', 'DAA-ZWE186H-BHXNB-V', 'CVT', '2WD', 1797, 'HATCHBACK', '1675', '5', 'petrol', 4595312, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'AURIS HYBRID G PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'AVENSIS LI', 'DBA-ZRT272W-AWXGP', 'CVT', '2WD', 1986, 'SEDAN', '1755', '5', 'petrol', 4840607, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'AVENSIS LI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'BELTA GLX', 'K15BR-HEPRSKN', '4AT', '2WD', 1500, 'SEDAN', NULL, NULL, 'petrol', 2195000, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'BELTA GLX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'BZ4X', 'ZAA-YEAM15-MWDHS', 'CVT', '2WD', NULL, 'SUV', '1645', '5', 'electric', 9990434, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'BZ4X'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'BZ4X Z', 'ZAA-YEAM15-MWDHS', 'CVT', '4WD', NULL, 'SUV', '2285', '5', 'electric', 9990434, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'BZ4X Z'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'C+ POD', 'ZAZ-RMV12-AGDQS', 'CVT', '2WD', NULL, 'HATCHBACK', '800', '5', 'electric', 2877245, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'C+ POD'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'C+ WALK S', 'ZEV11-ABDDSS', 'CVT', '2WD', NULL, 'HATCHBACK', '1645', '1', 'electric', 776180, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'C+ WALK S'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'C+ WALK T', 'ZEV11-ABDHSS', 'CVT', '2WD', NULL, 'HATCHBACK', '1645', '1', 'electric', 578216, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'C+ WALK T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'C+POD G', 'ZAZ-RMV12-AGDQS', 'CVT', '2WD', NULL, 'HATCHBACK', '800', '1', 'electric', 2637475, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'C+POD G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'C+WALK T', 'ZEV11-ABDBSS', 'CVT', '2WD', NULL, 'HATCHBACK', '1645', '1', 'electric', 544402, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'C+WALK T'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'CAMRY', 'DAA-AXVH70-AEXSB', 'CVT', '2WD', 2487, 'SEDAN', '1875', '5', 'petrol', 7065708, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'CAMRY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'CAMRY G LEATHER PACKAGE', 'DAA-AXVH70-AEXNB(L)', 'CVT', 'AWD', 2487, 'SEDAN', '1875', '5', 'petrol', 6806955, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'CAMRY G LEATHER PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'CAMRY WS', '6AA-AXVH70-AEXSB(L)', 'CVT', '2WD', 2487, 'SEDAN', '1875', '5', 'petrol', 7831662, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'CAMRY WS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'CAMRY WS LEATHER PACKAGE', '6AA-AXV70-AEXSB(L)', 'CVT', '2WD', 2487, 'SEDAN', '1875', '5', 'petrol', 7814196, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'CAMRY WS LEATHER PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'CAMRY WS LEATHER PACKAGE', '6AA-AXVH70-AEXSB(L)', 'CVT', '2WD', 2487, 'SEDAN', '1875', '5', 'petrol', 7065708, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'CAMRY WS LEATHER PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'CAMRY WS LEATHER PACKAGE', 'DAA-AXVH70-AEXSB(L)', 'CVT', '2WD', 2487, 'SEDAN', '1875', '5', 'petrol', 6986318, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'CAMRY WS LEATHER PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'CENTURY', '6AA-UWG60-AEXGH', 'CVT', '4WD', 4968, 'SEDAN', '2645', '5', 'petrol', 37877019, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'CENTURY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'CENTURY', '6AA-UWG60-AEXGH', 'CVT', '2WD', 4968, 'SEDAN', '2645', '5', 'petrol', 34232955, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'CENTURY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'CENTURY', 'DAA-UWG60-AEXGH', 'CVT', '2WD', 4968, 'SEDAN', '2645', '5', 'petrol', 34232955, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'CENTURY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'CENTURY', 'DBA-GZG50-AETGK', '6AT', 'AWD', 4996, 'SEDAN', '2345', '5', 'petrol', 21968482, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'CENTURY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'CENTURY 3.5', '6LA-GRG75-CNGB', 'CVT', '4WD', 2790, 'SEDAN', '2790', '4', 'petrol', 43664484, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'CENTURY 3.5'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'CENTURY SEDAN', '6AA-UWG60-AEXGH', 'CVT', '4WD', 4968, 'SEDAN', '2645', '5', 'petrol', 37877019, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'CENTURY SEDAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'CENTURY SEDAN 5.0L HYBRID', '6AA-UWG60-AEXGH', 'CVT', '2WD', 2645, 'SEDAN', '2645', '5', 'petrol', 35071314, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'CENTURY SEDAN 5.0L HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'CENTURY V6 3.5L PLUG-IN HYBRID E-FOURADVANCED', '6LA-GRG75-CNXGB', 'CVT', '4WD', 3456, 'SEDAN', '2790', '4', 'petrol', 47157643, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'CENTURY V6 3.5L PLUG-IN HYBRID E-FOURADVANCED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'C-HR G', '6AA-ZYX11-AHXEB', 'CVT', '2WD', 1797, 'SUV', '1715', '5', 'petrol', 4755459, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'C-HR G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'C-HR G', 'DAA-ZYX10-AHXEB', 'CVT', '2WD', 1797, 'SUV', '1715', '5', 'petrol', 4737111, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'C-HR G'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'C-HR S GR SPORT HYBRID', '6AA-ZYX11-AHXNB(G)', 'CVT', '2WD', 1797, 'SUV', '1725', '5', 'petrol', 5492992, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'C-HR S GR SPORT HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'C-HR S GR SPORT', '6AA-ZYX11-AHXNB(G)', 'CVT', '2WD', 1797, 'SUV', '1725', '5', 'petrol', 5510458, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'C-HR S GR SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COASTER EX', '2KG-XZB70-ZRTQH', '6AT', 'AWD', 4009, 'BUS', '5515', '29', 'diesel', 14990891, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COASTER EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COASTER EX', 'SDG-XZB70-ZRTQH', '6AT', '2WD', 4009, 'VAN', '5475', '29', 'diesel', 14292259, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COASTER EX'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COASTER GX LONGBODY', '2KG-GDB70-ZXTEY', '6AT', '2WD', 2754, 'BUS', '5050', '24', 'diesel', 14666027, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COASTER GX LONGBODY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COASTER GX LONGBODY', '2KG-GDB70-ZXTEY', '6AT', '4WD', 2754, 'BUS', '5050', '24', 'diesel', 14711438, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COASTER GX LONGBODY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COASTER STANDARD  W/FOLDING DOOR', 'HZB70R-ZGMNS', '5MT', '2WD', 4200, 'BUS', NULL, '30', 'diesel', 6583500, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COASTER STANDARD  W/FOLDING DOOR'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COMFORT SG', 'DBA-TSS11-BEPFC', '4AT', '2WD', 1998, 'SEDAN', '1665', '5', 'petrol', 5191030, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COMFORT SG'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COMFORT TRAINING CAR DELUXE', 'CBA-TSS13Y-BEMDK', '4AT', '2WD', 1998, 'SEDAN', '1615', '5', 'petrol', 4357981, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COMFORT TRAINING CAR DELUXE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COPEN GR SPORT', '3BA-LA400A-KMVZ', '5MT', '4WD', 658, 'CONVRTIBLE', '960', '2', 'petrol', 4086493, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COPEN GR SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COPEN GR SPORT', '3BA-LA400A-KMVZ', '5MT', '2WD', 658, 'CONVRTIBLE', '960', '2', 'petrol', 4086493, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COPEN GR SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'TOYOTA', 'COPEN GR SPORT', '3BA-LA400A-KMVZ', 'CVT/6AT', '2WD', 658, 'CONVRTIBLE', '960', '5', 'petrol', 4086493, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'TOYOTA' AND model = 'COPEN GR SPORT'
);