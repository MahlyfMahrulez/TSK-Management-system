// 
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Import the authentication routes

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON request bodies

// Register routes
app.use('/api', authRoutes); // All routes in auth.js will be prefixed with "/api"

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
