// 

const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

const router = express.Router();

// ✅ Establish MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'task_manager'
});

// ✅ Check if the database is connected
db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        throw err;
    }
    console.log('✅ Connected to MySQL');
});

// ✅ POST /api/login - Authenticate User
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    console.log(`🔍 Checking login for email: ${email}`);

    // Query database for the user
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('❌ Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length === 0) {
            console.log('⚠️ No user found with that email');
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0]; // Retrieve user data from query result

        // Compare the provided password with the hashed password in the database
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('❌ Error comparing passwords:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (!isMatch) {
                console.log('⚠️ Password does not match');
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            console.log('✅ Login successful for:', email);
            res.status(200).json({ message: 'Login successful', userId: user.id });
        });
    });
});

module.exports = router;
