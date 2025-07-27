#!/usr/bin/env python3

import csv
import os
import psycopg2
from decimal import Decimal
import re

def clean_crsp_value(value):
    """Clean CRSP value by removing quotes, commas, and spaces"""
    if not value or value.strip() == '':
        return None
    
    # Remove quotes, spaces, and commas
    cleaned = re.sub(r'[",\s]', '', str(value))
    
    try:
        return Decimal(cleaned)
    except:
        return None

def parse_engine_capacity(value):
    """Parse engine capacity, handling both numeric and kWh values"""
    if not value or value.strip() == '':
        return value
    
    # Handle electric vehicle kWh values
    if 'kWh' in str(value):
        return str(value).strip()
    
    # Handle numeric values
    try:
        # Remove any non-numeric characters except decimal point
        numeric = re.sub(r'[^\d.]', '', str(value))
        if numeric:
            return numeric
    except:
        pass
    
    return str(value).strip() if value else value

def parse_seating(value):
    """Parse seating to integer"""
    if not value or value.strip() == '':
        return None
    
    try:
        return int(value)
    except:
        return None

def import_crsp2025_data():
    """Import CRSP2025 data from CSV file"""
    
    # Database connection
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    
    csv_file_path = 'attached_assets/CRSP2025_1753605083938.csv'
    
    try:
        with open(csv_file_path, 'r', encoding='utf-8') as file:
            csv_reader = csv.DictReader(file)
            
            # Skip the header row and start importing data
            imported_count = 0
            skipped_count = 0
            
            for row in csv_reader:
                try:
                    # Extract and clean the data
                    make = row['Make'].strip() if row['Make'] else None
                    model = row['Model'].strip() if row['Model'] else None
                    model_number = row['Model \nnumber'].strip() if row['Model \nnumber'] else None
                    transmission = row['Transmission'].strip() if row['Transmission'] else None
                    drive_config = row['Drive\nConfiguration'].strip() if row['Drive\nConfiguration'] else None
                    engine_capacity = parse_engine_capacity(row['Engine \nCapacity'])
                    body_type = row['Body \nType '].strip() if row['Body \nType '] else None
                    gvw = row['GVW'].strip() if row['GVW'] else None
                    seating = parse_seating(row['Seating'])
                    fuel_type = row['Fuel'].strip() if row['Fuel'] else None
                    crsp_2025 = clean_crsp_value(row['CRSP2025'])
                    
                    # Skip rows without essential data
                    if not make or not model:
                        skipped_count += 1
                        continue
                    
                    # Insert into database
                    cur.execute("""
                        INSERT INTO vehicle_references_2025 
                        (make, model, model_number, transmission, drive_configuration, 
                         engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    """, (make, model, model_number, transmission, drive_config, 
                          engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025))
                    
                    imported_count += 1
                    
                    if imported_count % 100 == 0:
                        print(f"Imported {imported_count} records...")
                        conn.commit()  # Commit every 100 records
                        
                except Exception as e:
                    print(f"Error processing row: {e}")
                    print(f"Row data: {row}")
                    skipped_count += 1
                    continue
            
            # Final commit
            conn.commit()
            print(f"✅ Import completed!")
            print(f"📊 Imported: {imported_count} records")
            print(f"⚠️ Skipped: {skipped_count} records")
            
    except FileNotFoundError:
        print(f"❌ CSV file not found: {csv_file_path}")
    except Exception as e:
        print(f"❌ Import failed: {e}")
        conn.rollback()
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    import_crsp2025_data()