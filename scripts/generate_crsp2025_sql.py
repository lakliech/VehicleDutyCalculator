#!/usr/bin/env python3

import csv
import re

def clean_crsp_value(value):
    """Clean CRSP value by removing quotes, commas, and spaces"""
    if not value or value.strip() == '':
        return 'NULL'
    
    # Remove quotes, spaces, and commas
    cleaned = re.sub(r'[",\s]', '', str(value))
    
    try:
        return str(int(float(cleaned)))
    except:
        return 'NULL'

def clean_text_value(value):
    """Clean text value and escape single quotes"""
    if not value or value.strip() == '':
        return 'NULL'
    
    # Escape single quotes and wrap in quotes
    cleaned = str(value).strip().replace("'", "''")
    return f"'{cleaned}'"

def clean_integer_value(value):
    """Clean integer value"""
    if not value or value.strip() == '':
        return 'NULL'
    
    try:
        return str(int(value))
    except:
        return 'NULL'

def generate_crsp2025_sql():
    """Generate SQL INSERT statements from CRSP2025 CSV"""
    
    csv_file_path = 'attached_assets/CRSP2025_1753605083938.csv'
    
    try:
        with open(csv_file_path, 'r', encoding='utf-8-sig') as file:
            csv_reader = csv.DictReader(file)
            
            batch_size = 50
            batch_count = 0
            current_batch = []
            
            print("-- CRSP2025 Data Import SQL Statements")
            print("-- Generated from CSV file")
            print()
            
            for row_num, row in enumerate(csv_reader, 1):
                try:
                    # Extract and clean the data
                    make = clean_text_value(row['Make'])
                    model = clean_text_value(row['Model'])
                    model_number = clean_text_value(row['Model \nnumber'])
                    transmission = clean_text_value(row['Transmission'])
                    drive_config = clean_text_value(row['Drive\nConfiguration'])
                    engine_capacity = clean_text_value(row['Engine \nCapacity'])
                    body_type = clean_text_value(row['Body \nType '])
                    gvw = clean_text_value(row['GVW'])
                    seating = clean_integer_value(row['Seating'])
                    fuel_type = clean_text_value(row['Fuel'])
                    crsp_2025 = clean_crsp_value(row['CRSP2025'])
                    
                    # Skip rows without essential data
                    if make == 'NULL' or model == 'NULL':
                        continue
                    
                    # Create INSERT statement for this row
                    insert_values = f"({make}, {model}, {model_number}, {transmission}, {drive_config}, {engine_capacity}, {body_type}, {gvw}, {seating}, {fuel_type}, {crsp_2025})"
                    current_batch.append(insert_values)
                    
                    # When batch is full, output the SQL
                    if len(current_batch) >= batch_size:
                        batch_count += 1
                        
                        print(f"-- Batch {batch_count} (Records {row_num - len(current_batch) + 1} to {row_num})")
                        print("INSERT INTO vehicle_references_2025")
                        print("(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025)")
                        print("VALUES")
                        print(",\n".join(current_batch) + ";")
                        print()
                        
                        current_batch = []
                        
                except Exception as e:
                    print(f"-- Error processing row {row_num}: {e}")
                    continue
            
            # Handle remaining records
            if current_batch:
                batch_count += 1
                print(f"-- Final Batch {batch_count}")
                print("INSERT INTO vehicle_references_2025")
                print("(make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025)")
                print("VALUES")
                print(",\n".join(current_batch) + ";")
                print()
            
            print(f"-- Total batches generated: {batch_count}")
            
    except FileNotFoundError:
        print(f"-- Error: CSV file not found: {csv_file_path}")
    except Exception as e:
        print(f"-- Error: Import failed: {e}")

if __name__ == "__main__":
    generate_crsp2025_sql()