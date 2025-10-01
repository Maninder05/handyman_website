import User from "../models/ModalUser.js";

// Signup
export const signupUser = async (req, res) => {
  try {
    const { username, email, password, userType } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    // Save user
    const newUser = new User({ username, email, password, userType });
    await newUser.save();

    res.status(201).json({ message: "Signup successful", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
