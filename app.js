// Import required modules
const express = require('express');
const bodyParser = require('body-parser');


// Create an instance of Express
const app = express();

// Use bodyParser middleware to parse POST request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Define in-memory storage for users (Replace this with a database in a real application)
const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' }
];

// Define route for handling login POST requests
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Find user in the users array
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    res.send('Login successful'); // Replace this with your logic for successful login
  } else {
    res.status(401).send('Invalid username or password'); // Return unauthorized status for failed login
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
