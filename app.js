const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { connectToDatabase } = require("./config/database");
const app = express();
const port = process.env.PORT || 5500;
require("dotenv").config();

app.use(express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
app.use(cors());

// Connect to the database before starting the server
const startServer = async () => {
  try {
    await connectToDatabase();
    // Require routes (move this to routes/authRoutes.js and routes/userRoutes.js)
    const authRoutes = require("./routes/authRoutes");
    const childRoutes = require("./routes/childRoutes");
    const parentRoutes = require("./routes/parentRoutes");
    const locationRoutes = require("./routes/locationRoutes");
    // const userRoutes = require("./routes/userRoutes");

    // Use routes
    app.use("/api/auth", authRoutes);
    app.use("/api", childRoutes);
    app.use("/api", parentRoutes);
    app.use("/api/location", locationRoutes);
    // app.use("/api/user", userRoutes);

    app.listen(port, () => {
      console.log("Server listening on port: " + port);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

// Start the server
startServer();
