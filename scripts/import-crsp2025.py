#!/usr/bin/env python3
"""
Script to import CRSP 2025 data into the vehicle_references table
"""

import csv
import psycopg2
import os
import re

def clean_crsp_value(value_str):
    """Clean CRSP value string and convert to decimal"""
    if not value_str or value_str.strip() == '':
        return None
    
    # Remove quotes, spaces, and commas
    cleaned = str(value_str).strip().replace('"', '').replace("'", "").replace(',', '').replace(' ', '')
    
    # Try to extract numeric value
    try:
        return float(cleaned)
    except ValueError:
        return None

def clean_engine_capacity(engine_str):
    """Extract numeric engine capacity from string"""
    if not engine_str or engine_str.strip() == '':
        return None
    
    engine_str = str(engine_str).strip()
    
    # Handle electric vehicles with kWh
    if 'kWh' in engine_str.upper():
        return None  # Skip electric vehicles for engine capacity
    
    # Extract numeric values
    numbers = re.findall(r'\d+', engine_str)
    if numbers:
        return int(numbers[0])
    
    return None

def clean_seating(seating_str):
    """Clean seating number"""
    if not seating_str or seating_str.strip() == '':
        return None
    
    try:
        return str(int(float(seating_str)))
    except (ValueError, TypeError):
        return None

def normalize_fuel_type(fuel_str):
    """Normalize fuel type values"""
    if not fuel_str or fuel_str.strip() == '':
        return None
    
    fuel_map = {
        'GASOLINE': 'petrol',
        'PETROL': 'petrol', 
        'DIESEL': 'diesel',
        'ELECTRIC': 'electric',
        'HYBRID': 'hybrid',
        'PLUG-IN HYBRID': 'hybrid'
    }
    
    fuel_upper = str(fuel_str).strip().upper()
    return fuel_map.get(fuel_upper, fuel_upper.lower())

def main():
    # Database connection
    DATABASE_URL = os.getenv('DATABASE_URL')
    if not DATABASE_URL:
        print("ERROR: DATABASE_URL environment variable not set")
        return
    
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    # Read CSV file
    with open('attached_assets/CRSP2025_1753595396478.csv', 'r', encoding='utf-8') as csvfile:
        # Read first to get total count
        reader = csv.DictReader(csvfile)
        rows = list(reader)
    
    print(f"Found {len(rows)} records in CRSP 2025 CSV")
    
    # Process each row
    successful_imports = 0
    skipped_records = 0
    
    for index, row in enumerate(rows):
        try:
            make = str(row['Make']).strip().upper() if row['Make'] and row['Make'].strip() else None
            model = str(row['Model']).strip() if row['Model'] and row['Model'].strip() else None
            model_number = str(row['Model \nnumber']).strip() if row['Model \nnumber'] and row['Model \nnumber'].strip() else None
            transmission = str(row['Transmission']).strip() if row['Transmission'] and row['Transmission'].strip() else None
            drive_config = str(row['Drive\nConfiguration']).strip() if row['Drive\nConfiguration'] and row['Drive\nConfiguration'].strip() else None
            engine_capacity = clean_engine_capacity(row['Engine \nCapacity'])
            body_type = str(row['Body \nType ']).strip() if row['Body \nType '] and row['Body \nType '].strip() else None
            gvw = str(row['GVW']).strip() if row['GVW'] and row['GVW'].strip() else None
            seating = clean_seating(row['Seating'])
            fuel_type = normalize_fuel_type(row['Fuel'])
            crsp2025 = clean_crsp_value(row['CRSP2025'])
            
            if not make or not model or not crsp2025:
                print(f"Skipping row {index}: Missing required data (make={make}, model={model}, crsp2025={crsp2025})")
                skipped_records += 1
                continue
            
            # Check if record already exists (by make, model, and model_number)
            cur.execute("""
                SELECT id FROM vehicle_references 
                WHERE UPPER(make) = %s AND model = %s AND model_number = %s
            """, (make, model, model_number))
            
            existing = cur.fetchone()
            
            if existing:
                # Update existing record with CRSP2025 value
                cur.execute("""
                    UPDATE vehicle_references 
                    SET crsp_2025 = %s,
                        transmission = %s,
                        drive_configuration = %s,
                        engine_capacity = %s,
                        body_type = %s,
                        gvw = %s,
                        seating = %s,
                        fuel_type = %s
                    WHERE id = %s
                """, (crsp2025, transmission, drive_config, engine_capacity, 
                     body_type, gvw, seating, fuel_type, existing[0]))
            else:
                # Insert new record
                cur.execute("""
                    INSERT INTO vehicle_references 
                    (make, model, model_number, transmission, drive_configuration, 
                     engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """, (make, model, model_number, transmission, drive_config,
                     engine_capacity, body_type, gvw, seating, fuel_type, crsp2025))
            
            successful_imports += 1
            
            if successful_imports % 100 == 0:
                print(f"Processed {successful_imports} records...")
                conn.commit()
                
        except Exception as e:
            print(f"Error processing row {index}: {e}")
            continue
    
    # Final commit
    conn.commit()
    
    print(f"\nImport completed:")
    print(f"Successfully imported/updated: {successful_imports} records")
    print(f"Skipped records: {skipped_records}")
    
    # Verify import
    cur.execute("SELECT COUNT(*) FROM vehicle_references WHERE crsp_2025 IS NOT NULL")
    count = cur.fetchone()[0]
    print(f"Total records with CRSP 2025 values: {count}")
    
    cur.close()
    conn.close()

if __name__ == "__main__":
    main()