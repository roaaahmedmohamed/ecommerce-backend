import { Router } from "express";
import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  login,
  register,
  updateUser,
} from "./user.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { authorizeRole } from "../../middleware/authorize.js";

export const userRoutes = Router();
userRoutes.use(express.json());




userRoutes.post("/register", register); // POST http://localhost:3000/users/register
userRoutes.post("/login", login); // POST http://localhost:3000/users/login


// Protected
userRoutes.get("/", authMiddleware, authorizeRole("admin"), getAllUsers); // GET http://localhost:3000/users

userRoutes.get("/:id", authMiddleware, getUserById); // GET http://localhost:3000/users/:id

userRoutes.put("/:id", authMiddleware, updateUser); // PUT http://localhost:3000/users/:id

userRoutes.delete("/:id", authMiddleware, authorizeRole("admin"), deleteUser); // DELETE http://localhost:3000/users/:id
