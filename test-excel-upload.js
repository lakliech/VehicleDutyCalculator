// Test Excel upload functionality
const fs = require('fs');
const FormData = require('form-data');
const fetch = require('node-fetch');

async function testExcelUpload() {
  try {
    console.log('Testing Excel upload...');
    
    // Create FormData and append file
    const form = new FormData();
    const fileBuffer = fs.readFileSync('./test-upload.xlsx');
    form.append('file', fileBuffer, {
      filename: 'test-upload.xlsx',
      contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    
    // Make request to upload endpoint
    const response = await fetch('http://localhost:5000/api/parse-excel', {
      method: 'POST',
      body: form,
      headers: {
        ...form.getHeaders(),
        'Cookie': 'connect.sid=test'
      }
    });
    
    const result = await response.json();
    console.log('Response:', JSON.stringify(result, null, 2));
    console.log('Status:', response.status);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testExcelUpload();