import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MySQL
const db = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12802687",       // your MySQL username
  password: "mAJMwwPcIP",       // your MySQL password
  database: "sql12802687",
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL!");
  }
});

// Routes
app.get("/api/zones", (req, res) => {
  db.query("SELECT * FROM Zones", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post("/zones", (req, res) => {
  const { name, email } = req.body;
  db.query("INSERT INTO zones (name, email) VALUES (?, ?)", [name, email], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, name, email });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
