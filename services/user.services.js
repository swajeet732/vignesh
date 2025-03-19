const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

const registerUser = async (email, password, role) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword, role });

  return user;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  user.token = token;
  await user.save();

  return { user, token };
};

module.exports = { registerUser, loginUser };
