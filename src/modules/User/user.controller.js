
import bcrypt from "bcrypt";
import { userModel } from "../../../db/models/user.model.js";
import jwt from "jsonwebtoken";

// Register
 const register = async (req, res) => {
  try {
    const exist = await userModel.findOne({ email: req.body.email });
    if (exist) return res.status(409).json({ message: "Email already exists! , Please Login" });

    req.body.password = bcrypt.hashSync(req.body.password, 8);
    const addUser = await userModel.create(req.body);
    addUser.password = undefined;

    res.status(201).json({ message: "Added successfully", user: addUser });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// Login
 const login = async (req, res) => {
  try {
    const exist = await userModel.findOne({ email: req.body.email });
    if (!exist) return res.status(404).json({ message: "Invalid email or password" });

    const matched = bcrypt.compareSync(req.body.password, exist.password);
    if (!matched) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { _id: exist._id, role: exist.role },
      "MY_SECRET_KEY",
      
    );

    res.json({
      message: "Login successfully",
      user: { id: exist._id, email: exist.email, role: exist.role },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Get all users (admin only)
 const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Get user by ID (admin or self)
 const getUserById = async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: "Forbidden: cannot view this user" });
    }

    const user = await userModel.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

// Update user (admin or self)
 const updateUser = async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: "Forbidden: cannot update this user" });
    }

    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 8);
    }

    const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select("-password");

    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

// Delete user (admin only)
 const deleteUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: only admin can delete users" });
    }

    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};


export{
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
}