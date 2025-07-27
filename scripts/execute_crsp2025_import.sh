#!/bin/bash

# Execute CRSP2025 SQL import in batches
echo "Starting CRSP2025 data import..."

# Split the SQL file into individual batch files
csplit -f batch_ -s scripts/crsp2025_inserts.sql '/-- Batch/' '{*}'

# Execute each batch
batch_count=0
for batch_file in batch_*; do
    if [ -s "$batch_file" ]; then
        batch_count=$((batch_count + 1))
        echo "Executing batch $batch_count..."
        
        # Extract the SQL statement from the batch file
        sql_statement=$(grep -A 10000 "INSERT INTO" "$batch_file" | grep -B 10000 -m 1 "^;" | head -n -1)
        
        if [ ! -z "$sql_statement" ]; then
            echo "$sql_statement;" > temp_batch.sql
            # Here we would execute the SQL, but we'll do it manually for now
            echo "Batch $batch_count prepared"
        fi
    fi
done

echo "Total batches prepared: $batch_count"

# Clean up
rm batch_* temp_batch.sql 2>/dev/null

echo "Import preparation complete!"