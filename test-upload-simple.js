const fs = require('fs');
const path = require('path');

// Test if multer upload directory exists
const uploadDir = 'uploads/excel';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Created upload directory:', uploadDir);
} else {
  console.log('Upload directory exists:', uploadDir);
}

// Check file exists and size
const filePath = './test-upload.xlsx';
if (fs.existsSync(filePath)) {
  const stats = fs.statSync(filePath);
  console.log('Test file exists:', filePath);
  console.log('File size:', stats.size, 'bytes');
  console.log('File readable:', fs.constants.R_OK);
} else {
  console.log('Test file not found:', filePath);
}

console.log('Test complete. Ready for upload!');