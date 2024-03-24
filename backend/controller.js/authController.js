const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

const Signup = async (req, res, next) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({
        message: "Username already taken",
      });
    }

    //password hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      //_id : Math.random().toString(36).substr(2),
      fullName,
      username,
      password: hashedPassword,
      gender,
      profileImage: gender === "male" ? boyProfile : girlProfile,
    });

    if (newUser) {
      jwt.generateTokenandCookie(newUser._id, res);
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    }
  } catch (error) {
    console.error("Error in Signup:", error);
    return res.status(500).json({
      message: "An unexpected error occurred while signing up",
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password!" });
    }

    const validPassword = await bcrypt.compare(password, user.password || "");
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid username or password!" });
    }

    jwt.generateTokenandCookie(user._id, res);
    res.status(200).send(user);
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({
      message: "An unexpected error occurred while logging in",
    });
  }
};

const logout = async (req, res) => {
  try {
    // remove the token from cookies and httpOnly
    res.cookie("jwt", "", { maxAge: 0 });
    // res.clearCookie('token');
    res.json({ message: "Logged out" });
  } catch (error) {
    console.error("Error in logout:", error);
    return res.status(500).json({
      message: "An unexpected error occurred while logging out",
    });
  }
};

module.exports = { Signup, login, logout };
