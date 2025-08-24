
import { Router } from "express";
import express from "express";


import { addToCart,  getCart, removeFromCart,  updateCartItem } from "./cart.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

export const cartRoutes = Router();
cartRoutes.use(express.json());




cartRoutes.get("/", authMiddleware, getCart); //http://localhost:3000/cart
cartRoutes.post("/add", authMiddleware, addToCart); //http://localhost:3000/cart/add
cartRoutes.put("/update", authMiddleware, updateCartItem); //http://localhost:3000/cart/update
cartRoutes.delete("/remove", authMiddleware, removeFromCart); //http://localhost:3000/cart/remove