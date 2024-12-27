const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbconnection = require("./db/dbConfig");
const authMiddleware = require("./middleWare/authMiddleware");
const userRoutes = require("./routes/userRoute");
const questionsRoutes = require("./routes/questionRoute");
const answerRoute = require("./routes/answerRoute");

const app = express();
const port = process.env.PORT || 5500;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/question", authMiddleware, questionsRoutes);
app.use("/api/answer", authMiddleware, answerRoute);

// Starter Function
async function start() {
  try {
      const [rows] = await dbconnection.query("SELECT 'test' AS result");
      console.log("Database test query result:", rows);

      app.listen(port, () => {
          console.log(`Listening on port ${port}`);
      });
  } catch (error) {
      console.error("Error starting the server:", error.message);
      process.exit(1); // Exit on failure
  }
}

start();