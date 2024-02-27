// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const userService = require("../services/userService");
const verifyToken = require("../middleware/authMiddleware");

// Create user
router.post("/user", async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});

// User login route
router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const [role, token] = await userService.login(req.body);
    res.status(200).json({ token: token, role: role });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

// Get user by email
router.get("/user/:userRollNo", verifyToken, async (req, res) => {
  try {
    const { userRollNo } = req.params;
    const user = await userService.getUserByRollNo(userRollNo);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Error fetching user" });
  }
});

// Get user by email
router.get("/users", verifyToken, async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
});

// Update user
router.patch("/user/:userRollNo", verifyToken, async (req, res) => {
  try {
    const { userRollNo } = req.params;
    const updatedUser = await userService.updateUser(userRollNo, req.body);
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Error updating user" });
  }
});

// Delete user
router.delete("/user/:userRollNo", verifyToken, async (req, res) => {
  try {
    const { userRollNo } = req.params;
    await userService.deleteUser(userRollNo);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Error deleting user" });
  }
});

module.exports = router;
