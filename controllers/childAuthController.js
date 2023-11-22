const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { ParentModel, ChildModel } = require("../models/userModel");
const jWT_SECRET = process.env.JWT_SECRET;

// Endpoint to create a child with parent verification
const createChild = async (req, res) => {
  try {
    let { name, username, password } = req.body;
    const userId = req.decoded.id;
    const parent = await ParentModel.findById(userId).select("-password");

    console.log("parent is: " + parent);

    // Create a child associated with the parent
    const user = await ChildModel.findOne({ username: username });
    if (user) {
      return res
        .status(400)
        .json({ status: 400, message: "Child already exists!" });
    }

    password = await bcrypt.hash(password, 10);
    const child = await ChildModel.create({
      name,
      username,
      password,
      parent: parent._id, // Associate child with parent
    });

    return res
      .status(201)
      .json({ message: "Child created successfully", child });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Endpoint to login a child with its token verification
const loginChild = async (req, res) => {
  // Login logic
  const { username, password } = req.body;

  // Check if both username and password are provided
  if (!username || !password) {
    return res.status(400).json({
      status: 400,
      message: "Both username and password are required",
    });
  }

  // Find the user in the database
  const user = await ChildModel.findOne({ username: username }).lean();
  console.log(user);

  if (!user) {
    // User not found
    return res.status(404).json({
      status: 404,
      message: "Invalid username or password",
    });
  }

  // Compare the provided password with the hashed password stored in the database
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    // Passwords match, send a successful login response
    console.log("passwords match");
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      jWT_SECRET
    );
    console.log(token);
    return res.status(200).json({
      status: 200,
      message: "Login successful",
      data: token,
    });
  } else {
    // Passwords do not match
    return res.status(401).json({
      status: 401,
      message: "Invalid username or password",
    });
  }
};

module.exports = { createChild, loginChild };
