INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q4 E-TRON 40 E-TRON', 'WAUZZZFZ5PP07', 'AT', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 8565779, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q4 E-TRON 40 E-TRON'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q4 E-TRON 40 E-TRON ADVANCED', 'WAUZZZFZ6NP05', 'AT', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 8381784, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q4 E-TRON 40 E-TRON ADVANCED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q4 E-TRON 40 E-TRON S LINE', 'WAUZZZFZ7PP07', 'AT', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 9026243, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q4 E-TRON 40 E-TRON S LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q4 SPORTBACK E-TRON', 'WAUZZZFZ6PP07', 'AT', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 8565779, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q4 SPORTBACK E-TRON'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q4 SPORTBACK E-TRON 40 E-TRON ADVANCED', 'WAUZZZFZ2NP05', 'AT', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 10995001, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q4 SPORTBACK E-TRON 40 E-TRON ADVANCED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q4 SPORTBACK E-TRON 40 E-TRON ADVANCED', 'ZAA-FZEBJ', 'AT', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 7293471, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q4 SPORTBACK E-TRON 40 E-TRON ADVANCED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q4 SPORTBACK E-TRON 40 E-TRON S LINE', 'WAUZZZFZ6PP07', 'AT', '2WD', NULL, 'SUV', NULL, NULL, 'electric', 9026243, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q4 SPORTBACK E-TRON 40 E-TRON S LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q5', 'WAUZZZFYXJ221', 'AT', '4WD', 2000, 'SUV', NULL, NULL, 'petrol', 14290370, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q5'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q5 2.0TFSI QUATTRO', 'DBA-FYDAXS', 'AT', '4WD', 2000, 'SUV', NULL, NULL, 'petrol', 11605988, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q5 2.0TFSI QUATTRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q5 40TDI QUATTRO', 'LDA-FYDETS', 'AT', '4WD', 2000, 'SUV', NULL, NULL, 'diesel', 8213972, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q5 40TDI QUATTRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q5 40TDI QUATTRO ADVANCED', 'WAUZZZFY1N201', 'AT', '4WD', 2000, 'SUV', NULL, NULL, 'diesel', 9999037, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q5 40TDI QUATTRO ADVANCED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q5 40TDI QUATTRO S LINE', 'WAUZZZFY6R207', 'AT', '4WD', 2000, 'SUV', NULL, NULL, 'diesel', 18765814, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q5 40TDI QUATTRO S LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q5 40TDI QUATTRO S LINE', 'WAUZZZFY5M208', 'AT', '2WD', 2000, 'SUV', NULL, NULL, 'electric', 13120122, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q5 40TDI QUATTRO S LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q5 40TDI QUATTRO S LINE', 'WAUZZZFY3M208', 'AT', '4WD', 2000, 'SUV', NULL, NULL, 'hybrid', 12314204, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q5 40TDI QUATTRO S LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q5 40TDI QUATTRO SPORT', 'LDA-FYDETS', 'AT', '4WD', 2000, 'SUV', NULL, NULL, 'diesel', 10922880, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q5 40TDI QUATTRO SPORT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q5 45TFSI QUATTRO SPORT S LINE PACKAGE', 'WAUZZZFY0J220', 'AT', '4WD', 2000, 'SUV', NULL, NULL, 'petrol', 11565279, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q5 45TFSI QUATTRO SPORT S LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q5 BLACK EDITION', 'DBA-FYDAXS', 'AT', '4WD', 2000, 'SUV', NULL, NULL, 'petrol', 13447844, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q5 BLACK EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q5 S LINE DYNAMIC LIMITED', 'LDA-FYDETS', 'AT', '4WD', 2000, 'SUV', NULL, NULL, 'diesel', 10935545, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q5 S LINE DYNAMIC LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q5 TDI 1ST EDITION BLACK STYLING', 'WAUZZZFY0K203', 'AT', '4WD', 2000, 'SUV', NULL, NULL, 'petrol', 12068186, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q5 TDI 1ST EDITION BLACK STYLING'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q7', 'WAUZZZ4M3KD01', 'AT', '4WD', 2000, 'SUV', NULL, NULL, 'petrol', 14998556, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q7'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q7 3.0TFSI QUATTRO', 'WAUZZZ4M1JD02', 'AT', '4WD', 3000, 'SUV', NULL, NULL, 'petrol', 16805885, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q7 3.0TFSI QUATTRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q7 45 S LINE LIMITED', 'ABA-4MCYRA', 'AT', '4WD', 2000, 'SUV', NULL, NULL, 'petrol', 15537453, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q7 45 S LINE LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q7 50TDI QUATTRO S LINE', '3DA-4MCVMA', 'AT', '4WD', 3000, 'SUV', NULL, NULL, 'petrol', 16333057, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q7 50TDI QUATTRO S LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q8', 'WAUZZZF13LD01', 'AT', '4WD', 3000, 'SUV', NULL, NULL, 'petrol', 12329666, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q8'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q8 55TFSI QUATTRO', 'WAUZZZF1XMD01', 'AT', '4WD', 3000, 'SUV', NULL, NULL, 'diesel', 17156958, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q8 55TFSI QUATTRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q8 55TFSI QUATTRO DEBUT PACKAGE LUXURY', 'WAUZZZF12LD00', 'AT', '4WD', 3000, 'SUV', NULL, NULL, 'petrol', 16601737, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q8 55TFSI QUATTRO DEBUT PACKAGE LUXURY'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q8 55TFSI QUATTRO DEBUT PACKAGE S LINE', NULL, 'AT', '4WD', 3000, 'SUV', NULL, NULL, 'petrol', 19018646, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q8 55TFSI QUATTRO DEBUT PACKAGE S LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q8 55TFSI QUATTRO S LINE', 'WAUZZZF16PD04', 'AT', '4WD', 3000, 'SUV', NULL, NULL, 'hybrid', 21838461, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q8 55TFSI QUATTRO S LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q8 BRONZE EDITION', '3DA-F1CVMA', 'AT', '4WD', 3000, 'SUV', NULL, NULL, 'diesel', 22824816, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q8 BRONZE EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q8 E-TRON 55 E-TRON QUATTRO S LINE', 'ZAA-GEEDE', 'AT', '4WD', NULL, 'SUV', NULL, NULL, 'electric', 14091047, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q8 E-TRON 55 E-TRON QUATTRO S LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q8 SPORTBACK E-TRON 55 E-TRON QUATTRO S LINE', 'ZAA-GEEDE', 'AT', '4WD', NULL, 'COUPE', NULL, NULL, 'petrol', 16031811, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q8 SPORTBACK E-TRON 55 E-TRON QUATTRO S LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'Q8 SPORTBACK E-TRON 55 E-TRON QUATTRO S LINE', 'ZAA-GEEDE', 'AT', '4WD', NULL, 'SUV', NULL, NULL, 'electric', 16031811, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'Q8 SPORTBACK E-TRON 55 E-TRON QUATTRO S LINE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'R8', '7BA-4SDMWF', 'AT', '4WD', 5200, 'COUPE', NULL, NULL, 'petrol', 78781073, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'R8'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'R8 JAPAN FINAL EDITION', 'WUAZZZFX0L790', 'AT', '4WD', 5200, 'COUPE', NULL, NULL, 'petrol', 75636805, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'R8 JAPAN FINAL EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'R8 SPYDER BASEGRADE', 'ABA-4SDKAF', 'AT', '4WD', 5200, 'COUPE', NULL, NULL, 'petrol', 93028529, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'R8 SPYDER BASEGRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'R8 SPYDER V10 PERFORMANCE 5.2 FSI QUATTRO S TRONIC', 'WUAZZZFX3N790', 'AT', '4WD', NULL, 'COUPE', NULL, NULL, 'petrol', 68074087, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'R8 SPYDER V10 PERFORMANCE 5.2 FSI QUATTRO S TRONIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'R8 SPYDER V10 PERFORMANCE 5.2 FSI QUATTRO S TRONIC', 'WUAZZZFX3N790', 'AT', '4WD', 5200, 'CONVERTIBLE', NULL, NULL, 'petrol', 46091830, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'R8 SPYDER V10 PERFORMANCE 5.2 FSI QUATTRO S TRONIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'R8 V10 COUPE PERFORMANCE 5.2 FSI QUATTRO S TRONIC', 'WUAZZZFX0L790', 'AT', '4WD', 5200, 'COUPE', NULL, NULL, 'petrol', 79658152, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'R8 V10 COUPE PERFORMANCE 5.2 FSI QUATTRO S TRONIC'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'RS E-TRON GT', 'FWEBGE', 'AT', '4WD', NULL, 'SEDAN', NULL, NULL, 'electric', 21149084, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'RS E-TRON GT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'RS E-TRON GT BASE GRADE', 'WAUZZZFW2N790', 'AT', '4WD', NULL, 'SEDAN', NULL, NULL, 'electric', 19394023, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'RS E-TRON GT BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'RS Q3', '3BA-F3DNWF', 'AT', '4WD', 2500, 'SEDAN', NULL, NULL, 'petrol', 19875646, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'RS Q3'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'RS Q3 BASE GRADE', 'WAUZZZF36N190', 'AT', '4WD', 2500, 'SEDAN', NULL, NULL, 'petrol', 14755458, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'RS Q3 BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'RS Q3 SPORTBACK', 'WUAZZZF39P190', 'AT', '4WD', 2500, 'SEDAN', NULL, NULL, 'petrol', 18325236, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'RS Q3 SPORTBACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'RS Q3 SPORTBACK BASE GRADE', 'WUAZZZF33M190', 'AT', '4WD', 2500, 'SEDAN', NULL, NULL, 'petrol', 20818346, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'RS Q3 SPORTBACK BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'RS Q8', 'WUAZZZF19MD02', 'AT', '4WD', 4000, 'SEDAN', NULL, NULL, 'hybrid', 44201782, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'RS Q8'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'RS Q8 BASE GRADE', 'WUAZZZF14MD02', 'AT', '4WD', 4000, 'SEDAN', NULL, NULL, 'hybrid', 50042117, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'RS Q8 BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'RS3', 'WUAZZZGY0PA90', 'AT', '4WD', 2500, 'COUPE', NULL, NULL, 'petrol', 18198234, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'RS3'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'RS3 BASE GRADE', 'ABA-8VDAZL', 'AT', '4WD', 2500, 'COUPE', NULL, NULL, 'petrol', 25842682, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'RS3 BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'RS3 SPORTBACK', 'WUAZZZGYXPA90', 'AT', '4WD', 2500, 'WAGON', NULL, NULL, 'petrol', 15309603, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'RS3 SPORTBACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'RS3 SPORTBACK BASE GRADE', 'ABA-8VDAZF', 'AT', '4WD', 2500, 'WAGON', NULL, NULL, 'petrol', 8001280, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'RS3 SPORTBACK BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'RS4 AVANT', 'WUAZZZF46PA90', 'AT', '4WD', 2900, 'WAGON', NULL, NULL, 'petrol', 24958241, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'RS4 AVANT'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'RS4 AVANT BASE GRADE', 'WUAZZZF47PA90', 'AT', '4WD', 2900, 'WAGON', NULL, NULL, 'petrol', 27151401, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'RS4 AVANT BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'RS5', 'F5DECF', 'AT', '4WD', 2900, 'SEDAN', NULL, NULL, 'petrol', 23449821, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'RS5'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'RS5 BASE GRADE', 'ABA-F5DECF', 'AT', '4WD', 2900, 'SEDAN', NULL, NULL, 'petrol', 22210232, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'RS5 BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'RS5 SPORTBACK BASE GRADE', 'WUAZZZF54KA90', 'AT', '4WD', 2900, 'SEDAN', NULL, NULL, 'petrol', 18708880, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'RS5 SPORTBACK BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'RS6 AVANT BASE GRADE', 'WUAZZZF26MN90', 'AT', '4WD', 4000, 'SEDAN', NULL, NULL, 'hybrid', 40646357, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'RS6 AVANT BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'RS6 AVANT PERFORMANCE BASE GRADE', 'WUAZZZF23RN90', 'AT', '4WD', 4000, 'SEDAN', NULL, NULL, 'hybrid', 39529456, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'RS6 AVANT PERFORMANCE BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'RS7 SPORTBACK BASE GRADE', 'WUAZZZF22MN90', 'AT', '4WD', 4000, 'SEDAN', NULL, NULL, 'hybrid', 32869610, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'RS7 SPORTBACK BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'RS7 SPORTBACK PERFORMANCE BASE GRADE', 'WAUZZZ4G8GN90', 'AT', '4WD', 4000, 'SEDAN', NULL, NULL, 'petrol', 32173134, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'RS7 SPORTBACK PERFORMANCE BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'S3 SEDAN', '3BA-GYDNFF', 'AT', '4WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 10356033, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'S3 SEDAN'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'S3 SEDAN BASE GRADE', 'WAUZZZ8V4KA09', 'AT', '4WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 9999037, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'S3 SEDAN BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'S3 SPORTBACK', 'WAUZZZ8V2LA05', 'AT', '4WD', 2000, 'SEDAN', NULL, NULL, 'petrol', 11837577, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'S3 SPORTBACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'S4 AVANT BASE GRADE', 'WAUZZZF47PA06', 'AT', '4WD', 3000, 'SEDAN', NULL, NULL, 'petrol', 13860664, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'S4 AVANT BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'S4 BASE GRADE', 'WAUZZZF48LA07', 'AT', '4WD', 3000, 'SEDAN', NULL, NULL, 'petrol', 14870006, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'S4 BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'S5 CABRIOLET', 'F5CWGC', 'AT', '4WD', 3000, 'SEDAN', NULL, NULL, 'petrol', 27354645, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'S5 CABRIOLET'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'S5 CABRIOLET BASE GRADE', 'WAUZZZF59JN01', 'AT', '4WD', 3000, 'SEDAN', NULL, NULL, 'petrol', 26600774, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'S5 CABRIOLET BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'S5 SPORTBACK BASE GRADE', 'WAUZZZF55JA06', 'AT', '4WD', 3000, 'SEDAN', NULL, NULL, 'petrol', 16133659, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'S5 SPORTBACK BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'S6 BASE GRADE', 'WAUZZZF22MN06', 'AT', '4WD', 2900, 'SEDAN', NULL, NULL, 'hybrid', 17888081, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'S6 BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'S7 SPORTBACK', 'WAUZZZF24NN02', 'AT', '4WD', 2900, 'SEDAN', NULL, NULL, 'hybrid', 24160998, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'S7 SPORTBACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'S7 SPORTBACK BASE GRADE', 'WAUZZZF2XNN01', 'AT', '4WD', 2900, 'SEDAN', NULL, NULL, 'petrol', 22463884, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'S7 SPORTBACK BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'S8 BASE GRADE', 'WAUZZZF80RN00', 'AT', '4WD', 2900, 'SEDAN', NULL, NULL, 'hybrid', 26233488, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'S8 BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'SQ2', 'WAUZZZGA1PA01', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'petrol', 10265907, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'SQ2'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'SQ2 BASE GRADE', '3BA-GADNUF', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'petrol', 13256529, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'SQ2 BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'SQ5', 'FYCWGS', 'AT', '4WD', 3000, 'WAGON', NULL, NULL, 'petrol', 14174274, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'SQ5'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'SQ5 BASE GRADE', 'WAUZZZFY2N208', 'AT', '4WD', 3000, 'WAGON', NULL, NULL, 'petrol', 16098302, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'SQ5 BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'SQ5 SPORTBACK', 'WAUZZZFY8N204', 'AT', '4WD', 3000, 'WAGON', NULL, NULL, 'petrol', 16005777, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'SQ5 SPORTBACK'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'SQ5 SPORTBACK BASE GRADE', '3BA-FYCWGA', 'AT', '4WD', 3000, 'WAGON', NULL, NULL, 'petrol', 17302113, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'SQ5 SPORTBACK BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'SQ7', '3BA-4MDWRA', 'AT', '4WD', 4000, 'WAGON', NULL, NULL, 'petrol', 24606472, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'SQ7'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'SQ8', 'WAUZZZF10PD03', 'AT', '2WD', 4000, 'WAGON', NULL, NULL, 'petrol', 24213725, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'SQ8'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'SQ8 BASE GRADE', '3BA-F1DWRA', 'AT', '4WD', 4000, 'WAGON', NULL, NULL, 'petrol', 23994443, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'SQ8 BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'TT COUPE 2.0TFSI QUATTRO', 'ABA-FVCHHF', 'AT', '4WD', 2000, 'COUPE', NULL, NULL, 'petrol', 10653095, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'TT COUPE 2.0TFSI QUATTRO'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'TT COUPE 40TFSI', 'TRUZZZFV1P100', 'AT', '4WD', 2000, 'COUPE', NULL, NULL, 'petrol', 14755458, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'TT COUPE 40TFSI'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'TT COUPE 40TFSI S LINE PACKAGE', 'TRUZZZFV9N100', 'AT', '4WD', 2000, 'COUPE', NULL, NULL, 'petrol', 12767752, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'TT COUPE 40TFSI S LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'TT COUPE 45TFSI QUATTRO S LINE PACKAGE', 'TRUZZZFVXP100', 'AT', '4WD', 2000, 'COUPE', NULL, NULL, 'petrol', 14022294, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'TT COUPE 45TFSI QUATTRO S LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'TT COUPE FINAL EDITION', '3BA-FVDNPF', 'AT', '4WD', 2000, 'COUPE', NULL, NULL, 'petrol', 17021794, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'TT COUPE FINAL EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'TT COUPE S LINE DYNAMIC LIMITED', 'ABA-FVCJS', 'AT', '2WD', 1800, 'COUPE', NULL, NULL, 'petrol', 12494952, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'TT COUPE S LINE DYNAMIC LIMITED'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'TT COUPE S-LINE COMPETITION PLUS', '3BA-FVDNPF', 'AT', '4WD', 2000, 'COUPE', NULL, NULL, 'petrol', 14662581, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'TT COUPE S-LINE COMPETITION PLUS'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'TT ROADSTER 45 TFSI QUATTRO S LINE PACKAGE', NULL, 'AT', '4WD', 2000, 'CONVERTIBLE', NULL, NULL, 'petrol', 14373865, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'TT ROADSTER 45 TFSI QUATTRO S LINE PACKAGE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'TT ROADSTER FINAL EDITION', 'ABA-FVCHHF', 'AT', '4WD', 2000, 'CONVERTIBLE', NULL, NULL, 'petrol', 21858426, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'TT ROADSTER FINAL EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'TT ROADSTER FINAL EDITION', 'TRUZZZFV2L100', 'AT', '4WD', 2000, 'COUPE', NULL, NULL, 'petrol', 19865936, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'TT ROADSTER FINAL EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'TT RS COUPE BASE GRADE', NULL, 'AT', '4WD', 2500, 'COUPE', NULL, NULL, 'petrol', 35056186, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'TT RS COUPE BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'TTS COUPE', 'ABA-FVCJXF', 'AT', '4WD', 2000, 'COUPE', NULL, NULL, 'petrol', 18857016, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'TTS COUPE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'TTS COUPE BASE GRADE', '3BA-FVDNFF', 'AT', '4WD', 4000, 'WAGON', NULL, NULL, 'petrol', 18315486, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'TTS COUPE BASE GRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'AUDI', 'TTS COUPE MEMORIAL EDITION', '3BA-FVDNFF', 'AT', '4WD', 2000, 'WAGON', NULL, NULL, 'petrol', 15393433, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'AUDI' AND model = 'TTS COUPE MEMORIAL EDITION'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BENTLEY', 'BENTAYGA BASEGRADE', NULL, 'AT', '4WD', 6000, 'SUV', NULL, '5', 'petrol', 63120742, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BENTLEY' AND model = 'BENTAYGA BASEGRADE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BENTLEY', 'BENTAYGA', NULL, 'AT', '2WD', 6000, 'SUV', NULL, '5', 'petrol', 13646222, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BENTLEY' AND model = 'BENTAYGA'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BENTLEY', 'BENTAYGA AZURE', '7BA-BADCU', 'AT', '4WD', 4000, 'SUV', NULL, '5', 'petrol', 10234666, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BENTLEY' AND model = 'BENTAYGA AZURE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BENTLEY', 'BENTAYGA EWB AZURE', NULL, 'AT', '4WD', 4000, 'SUV', NULL, '5', 'petrol', 53984287, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BENTLEY' AND model = 'BENTAYGA EWB AZURE'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BENTLEY', 'BENTAYGA HYBRID', NULL, 'AT', '4WD', 3000, 'SUV', NULL, '5', 'hybrid', 51820062, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BENTLEY' AND model = 'BENTAYGA HYBRID'
);

INSERT INTO vehicle_references 
(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025, created_at)
SELECT 'BENTLEY', 'BENTAYGA S', NULL, 'AT', '4WD', 4000, 'SUV', NULL, '5', 'petrol', 58655493, NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM vehicle_references 
  WHERE UPPER(make) = 'BENTLEY' AND model = 'BENTAYGA S'
);