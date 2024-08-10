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
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://sachet.ndma.gov.in/');
    
    const alerts = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('#style-1'));
      return headings.map(heading => heading.textContent.trim());
    });
    
    await browser.close();
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch disaster alerts' });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
