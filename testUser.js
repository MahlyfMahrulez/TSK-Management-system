const mysql = require('mysql2');
const bcrypt = require('bcrypt');

// ✅ Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'task_manager'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('✅ Connected to MySQL');
});

// ✅ Create a test user with a hashed password
const email = 'user@example.com';
const plainPassword = 'password123';

bcrypt.hash(plainPassword, 10, (err, hash) => {
    if (err) {
        console.error('Error hashing password:', err);
        return;
    }

    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(sql, [email, hash], (err, result) => {
        if (err) {
            console.error('Error inserting test user:', err);
            return;
        }
        console.log('✅ Test user created successfully');
        db.end(); // Close the database connection
    });
});

