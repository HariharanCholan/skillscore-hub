const express = require("express");
const cors = require("cors");
const db = require("./db.cjs");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   REGISTER USER
========================= */
app.post("/register", (req, res) => {
  const { name, email, password, role } = req.body;

  db.run(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password, role],
    function (err) {
      if (err) {
        return res.status(500).json({ message: "User already exists" });
      }
      res.json({ message: "User registered successfully", id: this.lastID });
    }
  );
});

/* =========================
   LOGIN USER
========================= */
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, user) => {
      if (err) return res.status(500).json(err);

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.json(user);
    }
  );
});

/* =========================
   GET ALL USERS (for dashboard)
========================= */
app.get("/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

/* =========================
   START SERVER
========================= */
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});