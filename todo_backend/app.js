const express = require("express");
const { Pool } = require("pg");
const cors = require("cors"); // Import the cors middleware

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5055;

app.use(
  cors({
    origin: "*", // Allow requests from any origin
  })
);

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "postgres",
  password: process.env.DB_PASSWORD || "pass123",
  port: process.env.DB_PORT || 5432,
});

// Create a "todos" table if it doesn't exist within the existing database
pool.query(
  `
  CREATE TABLE IF NOT EXISTS todos (
    id serial PRIMARY KEY,
    task text NOT NULL,
    completed boolean DEFAULT false
  )
`,
  (err, result) => {
    if (err) {
      console.error("Error creating todos table", err);
    } else {
      console.log("Todos table created or already exists");
    }
  }
);

app.use(express.json());

// Create a new todo item
app.post("/todos", (req, res) => {
  const { task } = req.body;
  pool.query(
    "INSERT INTO todos (task) VALUES ($1) RETURNING *",
    [task],
    (err, result) => {
      if (err) {
        console.error("Error creating todo", err);
        res.status(500).json({ error: "Error creating todo" });
      } else {
        res.status(201).json(result.rows[0]);
      }
    }
  );
});

// Get all todo items
app.get("/todos", (req, res) => {
  pool.query("SELECT * FROM todos", (err, result) => {
    if (err) {
      console.error("Error retrieving todos", err);
      res.status(500).json({ error: "Error retrieving todos" });
    } else {
      res.json(result.rows);
    }
  });
});

// Get a single todo item by ID
app.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  pool.query("SELECT * FROM todos WHERE id = $1", [id], (err, result) => {
    if (err) {
      console.error("Error retrieving todo", err);
      res.status(500).json({ error: "Error retrieving todo" });
    } else {
      if (result.rows.length === 0) {
        res.status(404).json({ error: "Todo not found" });
      } else {
        res.json(result.rows[0]);
      }
    }
  });
});

// Update a todo item by ID
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;
  pool.query(
    "UPDATE todos SET task = $1, completed = $2 WHERE id = $3 RETURNING *",
    [task, completed, id],
    (err, result) => {
      if (err) {
        console.error("Error updating todo", err);
        res.status(500).json({ error: "Error updating todo" });
      } else {
        if (result.rows.length === 0) {
          res.status(404).json({ error: "Todo not found" });
        } else {
          res.json(result.rows[0]);
        }
      }
    }
  );
});

// Delete a todo item by ID
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "DELETE FROM todos WHERE id = $1 RETURNING *",
    [id],
    (err, result) => {
      if (err) {
        console.error("Error deleting todo", err);
        res.status(500).json({ error: "Error deleting todo" });
      } else {
        if (result.rows.length === 0) {
          res.status(404).json({ error: "Todo not found" });
        } else {
          res.json({ message: "Todo deleted successfully" });
        }
      }
    }
  );
});

// Check the initial database connection
pool.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    // You can handle the error here, e.g., exit the application
  } else {
    console.log("Connected to the database");
    // Continue setting up your Express routes and start the server
    app.use(express.json());

    // ... Define your routes here ...

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});
