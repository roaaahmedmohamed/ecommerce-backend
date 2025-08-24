import { Router } from "express";
import express from "express";
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  updateOrderStatus,
  
} from "./order.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { authorizeRole } from "../../middleware/authorize.js";


export const orderRoutes = Router();
orderRoutes.use(express.json());





// User
orderRoutes.post("/", authMiddleware, createOrder);//http://localhost:3000/orders
orderRoutes.get("/my-orders", authMiddleware, getMyOrders);//http://localhost:3000/orders/my-orders

// Admin
orderRoutes.get("/", authMiddleware, authorizeRole("admin"), getAllOrders);//http://localhost:3000/orders
orderRoutes.put("/:orderId/status", authMiddleware, authorizeRole("admin"), updateOrderStatus);  //http://localhost:3000/orders/<ORDER_ID>/status
