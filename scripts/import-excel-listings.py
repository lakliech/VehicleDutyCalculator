#!/usr/bin/env python3
"""
Excel Car Listings Import Utility

This script reads Excel files containing car inventory data and imports them
into the Gariyangu database as active car listings.

Usage: python scripts/import-excel-listings.py <excel_file_path>
"""

import pandas as pd
import sys
import os
import json
import requests
from datetime import datetime
import re

# Database connection would be handled by the API endpoint
API_BASE_URL = "http://localhost:5000"

def clean_price(price_str):
    """Clean and convert price string to integer"""
    if pd.isna(price_str) or price_str == '':
        return 0
    
    # Convert to string and remove common formatting
    price_str = str(price_str).replace(',', '').replace('$', '').replace('USD', '').strip()
    
    # Extract numeric value
    try:
        # Handle cases like "5600000.0"
        return int(float(price_str))
    except:
        return 0

def clean_year(year_str):
    """Clean and convert year string to integer"""
    if pd.isna(year_str) or year_str == '':
        return 2020  # Default year
    
    try:
        year = int(float(str(year_str)))
        # Validate year range
        if year < 1990 or year > 2025:
            return 2020
        return year
    except:
        return 2020

def clean_mileage(mileage_str):
    """Clean and convert mileage string to integer"""
    if pd.isna(mileage_str) or mileage_str == '':
        return 0
    
    # Convert to string and remove formatting
    mileage_str = str(mileage_str).replace(',', '').replace('km', '').replace('KM', '').strip()
    
    try:
        return int(float(mileage_str))
    except:
        return 0

def determine_fuel_type(make, model, engine_size):
    """Determine fuel type based on vehicle info"""
    make_lower = str(make).lower()
    model_lower = str(model).lower()
    
    # Electric vehicles
    if any(keyword in model_lower for keyword in ['hybrid', 'electric', 'prius', 'leaf', 'tesla']):
        return 'electric'
    
    # Default based on engine size
    try:
        engine = float(engine_size) if engine_size else 1500
        return 'petrol' if engine <= 2500 else 'diesel'
    except:
        return 'petrol'

def determine_body_type(model):
    """Determine body type from model name"""
    model_lower = str(model).lower()
    
    if any(keyword in model_lower for keyword in ['suv', 'cx-', 'rav', 'crv', 'cr-v', 'forester', 'outback']):
        return 'suv'
    elif any(keyword in model_lower for keyword in ['sedan', 'altima', 'camry', 'accord']):
        return 'sedan'
    elif any(keyword in model_lower for keyword in ['hatchback', 'fit', 'march', 'note']):
        return 'hatchback'
    elif any(keyword in model_lower for keyword in ['wagon', 'estate']):
        return 'wagon'
    elif any(keyword in model_lower for keyword in ['coupe', 'sport']):
        return 'coupe'
    else:
        return 'sedan'  # Default

def process_excel_file(file_path):
    """Process Excel file and extract car listings data"""
    try:
        print(f"Reading Excel file: {file_path}")
        
        # Try different sheet names and engines
        df = None
        try:
            df = pd.read_excel(file_path, engine='openpyxl')
        except:
            try:
                df = pd.read_excel(file_path, engine='xlrd')
            except:
                df = pd.read_excel(file_path)
        
        print(f"Loaded {len(df)} rows from Excel file")
        print("Column names:")
        for i, col in enumerate(df.columns):
            print(f"  {i}: {col}")
        
        # Display first few rows to understand structure
        print("\nFirst 3 rows:")
        print(df.head(3).to_string())
        
        return df
        
    except Exception as e:
        print(f"Error reading Excel file: {e}")
        return None

def map_excel_to_listing(row, column_mapping):
    """Map Excel row to car listing format"""
    try:
        # Extract data based on column mapping
        make = str(row.get(column_mapping.get('make', ''), '')).strip()
        model = str(row.get(column_mapping.get('model', ''), '')).strip()
        year = clean_year(row.get(column_mapping.get('year', ''), ''))
        price = clean_price(row.get(column_mapping.get('price', ''), ''))
        mileage = clean_mileage(row.get(column_mapping.get('mileage', ''), ''))
        
        # Skip empty rows
        if not make or not model or price == 0:
            return None
        
        # Determine additional fields
        fuel_type = determine_fuel_type(make, model, None)
        body_type = determine_body_type(model)
        
        listing = {
            'title': f"{year} {make} {model}",
            'make': make,
            'model': model,
            'year': year,
            'price': price,
            'mileage': mileage,
            'fuel_type': fuel_type,
            'transmission': 'automatic',  # Default
            'body_type': body_type,
            'condition': 'used',
            'drive_configuration': '2wd',  # Default
            'exterior_color': 'white',  # Default
            'interior_color': 'black',  # Default
            'description': f"Imported {year} {make} {model} in excellent condition. Contact for viewing and test drive.",
            'county': 'Nairobi',  # Default location
            'area': 'Westlands',
            'seller_name': 'JANS Motors',
            'seller_phone': '0700000000',
            'seller_email': 'sales@jansmotors.co.ke',
            'features': ['Air Conditioning', 'Power Steering', 'Electric Windows'],
            'status': 'active'
        }
        
        return listing
        
    except Exception as e:
        print(f"Error mapping row: {e}")
        return None

def import_listings_to_api(listings):
    """Import listings via API endpoint"""
    success_count = 0
    error_count = 0
    
    for listing in listings:
        try:
            response = requests.post(
                f"{API_BASE_URL}/api/import-listing",
                json=listing,
                headers={'Content-Type': 'application/json'},
                timeout=30
            )
            
            if response.status_code == 200 or response.status_code == 201:
                success_count += 1
                print(f"✓ Imported: {listing['title']}")
            else:
                error_count += 1
                print(f"✗ Failed: {listing['title']} - {response.status_code}: {response.text}")
                
        except Exception as e:
            error_count += 1
            print(f"✗ Error importing {listing['title']}: {e}")
    
    print(f"\nImport Summary:")
    print(f"Successfully imported: {success_count}")
    print(f"Failed: {error_count}")
    print(f"Total processed: {success_count + error_count}")

def main():
    if len(sys.argv) != 2:
        print("Usage: python scripts/import-excel-listings.py <excel_file_path>")
        sys.exit(1)
    
    file_path = sys.argv[1]
    
    if not os.path.exists(file_path):
        print(f"Error: File not found: {file_path}")
        sys.exit(1)
    
    # Process Excel file
    df = process_excel_file(file_path)
    if df is None:
        sys.exit(1)
    
    # Interactive column mapping
    print("\nPlease map Excel columns to car listing fields:")
    print("Available columns:")
    for i, col in enumerate(df.columns):
        print(f"  {i}: {col}")
    
    column_mapping = {}
    
    # Get column mappings from user
    fields = ['make', 'model', 'year', 'price', 'mileage']
    for field in fields:
        while True:
            try:
                col_input = input(f"\nWhich column contains '{field}'? (enter column number or name): ").strip()
                
                # Try as number first
                try:
                    col_idx = int(col_input)
                    if 0 <= col_idx < len(df.columns):
                        column_mapping[field] = df.columns[col_idx]
                        print(f"Mapped '{field}' to column '{df.columns[col_idx]}'")
                        break
                except ValueError:
                    pass
                
                # Try as column name
                if col_input in df.columns:
                    column_mapping[field] = col_input
                    print(f"Mapped '{field}' to column '{col_input}'")
                    break
                
                print("Invalid column. Please try again.")
                
            except KeyboardInterrupt:
                print("\nOperation cancelled.")
                sys.exit(1)
    
    # Process listings
    listings = []
    for _, row in df.iterrows():
        listing = map_excel_to_listing(row, column_mapping)
        if listing:
            listings.append(listing)
    
    print(f"\nProcessed {len(listings)} valid listings from {len(df)} rows")
    
    # Confirm import
    confirm = input(f"\nDo you want to import {len(listings)} listings? (y/N): ").strip().lower()
    if confirm != 'y':
        print("Import cancelled.")
        sys.exit(0)
    
    # Import to database
    import_listings_to_api(listings)

if __name__ == "__main__":
    main()