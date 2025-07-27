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
        float(cleaned)
        return cleaned
    except:
        return 'NULL'

def parse_engine_capacity(value):
    """Parse engine capacity, handling both numeric and kWh values"""
    if not value or value.strip() == '':
        return 'NULL'
    
    # Handle electric vehicle kWh values
    if 'kWh' in str(value) or 'EV' in str(value):
        return f"'{str(value).strip()}'"
    
    # Handle numeric values
    try:
        # Remove any non-numeric characters except decimal point
        numeric = re.sub(r'[^\d.]', '', str(value))
        if numeric:
            return f"'{numeric}'"
    except:
        pass
    
    return f"'{str(value).strip()}'" if value else 'NULL'

def escape_sql_string(value):
    """Escape single quotes in SQL strings"""
    if value is None or value == '':
        return 'NULL'
    
    # Replace single quotes with escaped quotes
    escaped = str(value).replace("'", "''")
    return f"'{escaped}'"

def parse_seating(value):
    """Parse seating to integer"""
    if not value or value.strip() == '':
        return 'NULL'
    
    try:
        return str(int(value))
    except:
        return 'NULL'

def generate_sql_inserts():
    """Generate SQL INSERT statements from CSV file"""
    
    csv_file_path = 'attached_assets/CRSP2025_1753605083938.csv'
    sql_file_path = 'scripts/crsp2025_inserts.sql'
    
    try:
        with open(csv_file_path, 'r', encoding='utf-8') as file:
            csv_reader = csv.DictReader(file)
            
            with open(sql_file_path, 'w', encoding='utf-8') as sql_file:
                sql_file.write("-- CRSP 2025 Data Import\n")
                sql_file.write("-- Auto-generated SQL inserts\n\n")
                
                insert_count = 0
                
                for row in csv_reader:
                    try:
                        # Extract and clean the data - handle BOM in column names
                        make_key = 'Make' if 'Make' in row else '\ufeffMake'
                        make = row[make_key].strip() if row[make_key] else None
                        model = row['Model'].strip() if row['Model'] else None
                        model_number = row['Model \nnumber'].strip() if row['Model \nnumber'] else None
                        transmission = row['Transmission'].strip() if row['Transmission'] else None
                        drive_config = row['Drive\nConfiguration'].strip() if row['Drive\nConfiguration'] else None
                        engine_capacity = row['Engine \nCapacity'].strip() if row['Engine \nCapacity'] else None
                        body_type = row['Body \nType '].strip() if row['Body \nType '] else None
                        gvw = row['GVW'].strip() if row['GVW'] else None
                        seating = row['Seating'].strip() if row['Seating'] else None
                        fuel_type = row['Fuel'].strip() if row['Fuel'] else None
                        crsp_2025 = row['CRSP2025'].strip() if row['CRSP2025'] else None
                        
                        # Skip rows without essential data
                        if not make or not model:
                            continue
                        
                        # Format SQL insert
                        sql_line = f"""INSERT INTO vehicle_references_2025 (make, model, model_number, transmission, drive_configuration, engine_capacity, body_type, gvw, seating, fuel_type, crsp_2025) VALUES (
    {escape_sql_string(make)},
    {escape_sql_string(model)},
    {escape_sql_string(model_number)},
    {escape_sql_string(transmission)},
    {escape_sql_string(drive_config)},
    {parse_engine_capacity(engine_capacity)},
    {escape_sql_string(body_type)},
    {escape_sql_string(gvw)},
    {parse_seating(seating)},
    {escape_sql_string(fuel_type)},
    {clean_crsp_value(crsp_2025)}
);

"""
                        sql_file.write(sql_line)
                        insert_count += 1
                        
                        if insert_count % 100 == 0:
                            print(f"Generated {insert_count} SQL inserts...")
                            
                    except Exception as e:
                        print(f"Error processing row: {e}")
                        print(f"Row data: {row}")
                        continue
                
                print(f"✅ SQL generation completed!")
                print(f"📊 Generated: {insert_count} INSERT statements")
                print(f"📁 Output file: {sql_file_path}")
                
    except FileNotFoundError:
        print(f"❌ CSV file not found: {csv_file_path}")
    except Exception as e:
        print(f"❌ SQL generation failed: {e}")

if __name__ == "__main__":
    generate_sql_inserts()