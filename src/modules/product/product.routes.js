
import { Router } from "express";
import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./product.controller.js";
// import { checkRole } from "../../middleware/isAdmin.middleware.js"; // Admin only
import { authMiddleware } from "../../middleware/auth.middleware.js";

export const productRoutes = Router();
productRoutes.use(express.json());

 


productRoutes.post("/", authMiddleware, createProduct); //http://localhost:3000/products
productRoutes.get("/", getAllProducts); //http://localhost:3000/products
productRoutes.get("/:id", getProductById); //http://localhost:3000/products/:id
productRoutes.put("/:id", authMiddleware, updateProduct); //http://localhost:3000/products/:id
productRoutes.delete("/:id", authMiddleware, deleteProduct); //http://localhost:3000/products/:id
