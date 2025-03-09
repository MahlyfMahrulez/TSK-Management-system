const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

const router = express.Router();
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'task_manager'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

        bcrypt.compare(password, results[0].password, (err, isMatch) => {
            if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

            res.status(200).json({ message: 'Login successful', userId: results[0].id });
        });
    });
});

module.exports = router;