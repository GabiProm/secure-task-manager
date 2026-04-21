//--------------------------------------------------
// PARA PRUEBAS CON CONEXIÓN A LA BASE DE DATOS, DESCOMENTAR EL CÓDIGOS SIGUIENTE Y COMENTAR EL CÓDIGOS DE PRUEBA
//--------------------------------------------------

require("dotenv").config();
const express = require("express");
const pool = require("./db");

const app = express();

const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:5173",  // Docker Compose
    "http://localhost:30080"  // Kubernetes NodePort
  ],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));



app.use(express.json());

// Healthcheck
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;
    await pool.query(
      "INSERT INTO tasks (title) VALUES ($1)",
      [title]
    );
    res.status(201).json({ message: "Task created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});


//--------------------------------------------------
// PARA PRUEBAS LOCALES SIN CONEXIÓN A LA BASE DE DATOS, COMENTAMOS EL CÓDIGOS ANTERIOR Y USAMOS ESTE CÓDIGO DE PRUEBA
//--------------------------------------------------
/*
const express = require("express");

const app = express();
app.use(express.json());

// Endpoint de prueba
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "API is running" });
});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
*/

//--------------------------------------------------