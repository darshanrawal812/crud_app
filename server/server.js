import express from "express";
import cors from "cors";
import mysql from "mysql";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL");
});

// API endpoint to fetch all users
app.get("/", (req, res) => {
  // Query to select all records from the "users" table
  const query = "SELECT * FROM users";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching users: " + err.stack);
      res.status(500).json({ error: "Failed to fetch users" });
      return;
    }
    res.json(result);
  });
});

// API endpoint to insert a new user
app.post("/users", (req, res) => {
  const { name, phone, email } = req.body;
  const query = "INSERT INTO users (name, phone, email) VALUES (?, ?, ?)";
  db.query(query, [name, phone, email], (err, result) => {
    if (err) {
      console.error("Error inserting user: " + err.stack);
      res.status(500).json({ error: "Failed to insert user" });
      return;
    }
    res.json({ message: "User inserted successfully", id: result.insertId });
  });
});

// API endpoint to fetch a specific user by ID
app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  const query = "SELECT * FROM users WHERE id = ?";
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching user: " + err.stack);
      res.status(500).json({ error: "Failed to fetch user" });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(result[0]); // Send the first (and only) user found
  });
});

// API endpoint to update a specific user by ID
app.put("/edit/:id", (req, res) => {
  const userId = req.params.id;
  const { name, phone, email } = req.body;
  const query = "UPDATE users SET name = ?, phone = ?, email = ? WHERE id = ?";
  db.query(query, [name, phone, email, userId], (err, result) => {
    if (err) {
      console.error("Error updating user: " + err.stack);
      res.status(500).json({ error: "Failed to update user" });
      return;
    }
    res.json({ message: "User updated successfully" });
  });
});

// API endpoint to delete a specific user by ID
app.delete("/delete/:id", (req, res) => {
  const userId = req.params.id;
  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Error deleting user: " + err.stack);
      res.status(500).json({ error: "Failed to delete user" });
      return;
    }
    res.json({ message: "User deleted successfully" });
  });
});

app.listen(8081, () => {
  console.log("Server running on port 8081");
});
