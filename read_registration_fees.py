#!/usr/bin/env python3
import pandas as pd
import sys

try:
    # Read the Excel file
    file_path = "attached_assets/registration fees_1752042456237.xlsx"
    
    # Try to read all sheets
    excel_file = pd.ExcelFile(file_path)
    print("Available sheets:", excel_file.sheet_names)
    
    for sheet_name in excel_file.sheet_names:
        print(f"\n=== SHEET: {sheet_name} ===")
        df = pd.read_excel(file_path, sheet_name=sheet_name)
        print("Shape:", df.shape)
        print("Columns:", df.columns.tolist())
        print("\nFirst few rows:")
        print(df.head(10).to_string())
        print("\n" + "="*50)
    
except Exception as e:
    print(f"Error reading Excel file: {e}")
    sys.exit(1)