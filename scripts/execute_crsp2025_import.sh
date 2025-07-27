#!/bin/bash

echo "🚀 Starting CRSP 2025 batch import..."

# Get database URL from environment
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL not set"
    exit 1
fi

# Count total batches
TOTAL_BATCHES=$(ls scripts/crsp2025_batch_* | wc -l)
echo "📊 Found $TOTAL_BATCHES batch files to import"

# Import each batch file
BATCH_COUNT=0
for batch_file in scripts/crsp2025_batch_*; do
    BATCH_COUNT=$((BATCH_COUNT + 1))
    echo "📈 Processing batch $BATCH_COUNT/$TOTAL_BATCHES: $batch_file"
    
    # Execute the SQL batch using psql
    if command -v psql &> /dev/null; then
        psql "$DATABASE_URL" -f "$batch_file" -q
        if [ $? -eq 0 ]; then
            echo "✅ Batch $BATCH_COUNT completed successfully"
        else
            echo "❌ Batch $BATCH_COUNT failed"
            exit 1
        fi
    else
        echo "❌ psql not found, cannot execute SQL batches"
        exit 1
    fi
    
    # Small delay between batches
    sleep 1
done

echo "🎉 All batches imported successfully!"
echo "🔍 Verifying import..."

# Verify the import
psql "$DATABASE_URL" -c "SELECT COUNT(*) as total_records, COUNT(DISTINCT make) as unique_makes FROM vehicle_references_2025;" -q

echo "✅ CRSP 2025 import completed!"