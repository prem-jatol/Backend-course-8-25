const User = require("./../models/Auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    // const user = new User({req.body});
    // user.save()
    res.status(202).json({ message: "User registered", user });
  } catch (err) {
    res.status(400).json({ error: err.message || "internal server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ error: "Invalid email" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

  // ✅ Store token in HttpOnly cookie
  res.cookie("token", token, {
    httpOnly: true,   // JS can't access this cookie
    secure: process.env.NODE_ENV === "production", // Only https in prod
    sameSite: "lax", //strict or none
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  res.json({ message: "Login successful", token, user });
};

exports.userList = async (req, res) => {
  const users = await User.find();
  res.json({ message: "Users list", users });
};