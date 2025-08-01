
#!/bin/bash

echo "🧪 Starting Gariyangu E2E Test Suite"
echo "=================================="

# Start the application server
echo "🚀 Starting application server..."
npm run dev &
SERVER_PID=$!

# Wait for server to be ready
echo "⏳ Waiting for server to start..."
sleep 10

# Check if server is running
if curl -f http://0.0.0.0:5000 > /dev/null 2>&1; then
    echo "✅ Server is running"
else
    echo "❌ Server failed to start"
    kill $SERVER_PID
    exit 1
fi

# Run tests
echo "🧪 Running E2E tests..."
npm run cypress:run

# Capture test results
TEST_EXIT_CODE=$?

# Cleanup
echo "🧹 Cleaning up..."
kill $SERVER_PID

# Report results
if [ $TEST_EXIT_CODE -eq 0 ]; then
    echo "✅ All tests passed!"
else
    echo "❌ Some tests failed"
fi

exit $TEST_EXIT_CODE
