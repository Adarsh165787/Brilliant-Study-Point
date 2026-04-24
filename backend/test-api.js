const jwt = require('jsonwebtoken');
const http = require('http');
require('dotenv').config();

async function test() {
  // Teacher's ID
  const teacherId = '69eba496a68fb1dd4882b676';
  
  // Generate token
  const token = jwt.sign({ user: { id: teacherId } }, process.env.JWT_SECRET, { expiresIn: 3600 });
  
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/users/students',
    method: 'GET',
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json'
    }
  };
  
  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      console.log('Status:', res.statusCode);
      console.log('Students:', data);
      process.exit(0);
    });
  });
  
  req.on('error', (e) => {
    console.error('Error:', e.message);
    process.exit(1);
  });
  
  req.end();
}

test();
