const express = require("express");
const bodyParser = require("body-parser");
const puppeteer = require('puppeteer');
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;
const saltRounds = 10;
const secretKey = 'Pradeep@00';
const moment = require('moment');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Pradeep@00",
  database: "DisasterDeck",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

app.use(bodyParser.json());
app.use(cors());

app.post("/register", (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).send("All fields are required");
  }

  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).send("An error occurred while hashing the password");
    }

    const query = `INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;

    db.query(query, [firstName, lastName, email, hashedPassword], (err, results) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          console.error("Duplicate entry:", err);
          return res.status(400).send("Email already registered");
        }
        console.error("Error inserting data into the database:", err);
        return res.status(500).send("An error occurred while inserting data into the database");
      }

      const user = { id: results.insertId, firstName, lastName, email };
      const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

      res.json({ message: "Registration successful", token, user });
    });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  const query = `SELECT * FROM users WHERE email = ?`;

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error fetching user from database:", err);
      return res.status(500).send("An error occurred while fetching user from database");
    }

    if (results.length === 0) {
      return res.status(400).send("Invalid email or password");
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).send("An error occurred while comparing passwords");
      }

      if (!isMatch) {
        return res.status(400).send("Invalid email or password");
      }

      const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
      res.json({ token });
    });
  });
});

app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;

  const query = 'SELECT id, first_name, last_name, email FROM users WHERE id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user data:", err);
      return res.status(500).send("An error occurred while fetching user data");
    }
    if (results.length === 0) {
      return res.status(404).send("User not found");
    }
    res.json(results[0]);
  });
});

app.get('/api/disaster-alerts', async (req, res) => {
  // Create an array of disaster alerts with random data
  const disasterAlerts = [
    {
      alert: "Flood in Assam",
      location: "Assam",
      latitude: 26.2006,
      longitude: 92.9376
    },
    {
      alert: "Cyclone in Odisha",
      location: "Odisha",
      latitude: 20.9517,
      longitude: 85.0985
    },
    {
      alert: "Earthquake in Himachal Pradesh",
      location: "Himachal Pradesh",
      latitude: 31.1048,
      longitude: 77.1734
    },
    {
      alert: "Landslide in Uttarakhand",
      location: "Uttarakhand",
      latitude: 30.0668,
      longitude: 79.0193
    },
    {
      alert: "Flood in Bihar",
      location: "Bihar",
      latitude: 25.0961,
      longitude: 85.3131
    },
    {
      alert: "Cyclone in West Bengal",
      location: "West Bengal",
      latitude: 22.9868,
      longitude: 87.8550
    },
    {
      alert: "Heatwave in Rajasthan",
      location: "Rajasthan",
      latitude: 27.0238,
      longitude: 74.2179
    },
    {
      alert: "Tsunami Warning in Tamil Nadu",
      location: "Tamil Nadu",
      latitude: 11.1271,
      longitude: 78.6569
    },
    {
      alert: "Drought in Maharashtra",
      location: "Maharashtra",
      latitude: 19.7515,
      longitude: 75.7139
    },
    {
      alert: "Wildfire in Madhya Pradesh",
      location: "Madhya Pradesh",
      latitude: 22.9734,
      longitude: 78.6569
    }
  ];

  // Send the disaster alerts as the response
  res.json(disasterAlerts);
});


app.post('/api/emergency-contact', (req, res) => {
  const { name, email, message } = req.body;

  console.log('Received data:', { name, email, message }); // Add this line

  if (!name || !email || !message) {
    console.error("Validation error: Missing fields");
    return res.status(400).send("All fields are required");
  }

  const query = `INSERT INTO emergency_contacts (name, email, message) VALUES (?, ?, ?)`;

  db.query(query, [name, email, message], (err, results) => {
    if (err) {
      console.error("Error inserting data into the database:", err);
      return res.status(500).send("An error occurred while inserting data into the database");
    }

    console.log('Data inserted successfully');
    res.json({ message: "Emergency contact message sent successfully!" });
  });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
