# 🛒 E-commerce Backend

## 📖 Overview
This is a **Node.js + Express + MongoDB (Mongoose)** backend project for an e-commerce application.  
It includes authentication, role-based authorization, and basic features for managing users, products, carts, and orders.

---

## 🚀 Features
- 👤 **Authentication & Authorization**
  - Register / Login with JWT
  - Roles: `user` and `admin`
  - Admin can manage products and categories
- 📦 **Products**
  - Add, update, delete (admin only)
  - List and view details
- 🛍️ **Cart**
  - Users can add/remove products from their cart
  - Update product quantities
- 📑 **Orders**
  - Place an order from cart
  - View user orders
  - Admin can view all orders

---

## 🛠️ Tech Stack
- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **JWT** for authentication



🔑 Auth
POST/   http://localhost:3000/users/register   → Register new user

POST /  http://localhost:3000/users/login  → Login and get token

👤 Users

GET /  http://localhost:3000/users  → Get all users (admin only)

GET /  http://localhost:3000/users/:id    → Get user by ID

PUT /  http://localhost:3000/users/:id  → Update user

DELETE /   http://localhost:3000/users/:id   → Delete user (admin only)

📦 Products

POST /    http://localhost:3000/products  → Create product (admin only)

GET /     http://localhost:3000/products  → Get all products

GET /     http://localhost:3000/products/:id  → Get single product

PUT /     http://localhost:3000/products/:id  → Update product (admin only)

DELETE /   http://localhost:3000/products/:id  → Delete product(admin only) 

🛒 Cart

POST /     http://localhost:3000/cart/add   → Add product to cart

PUT /    http://localhost:3000/cart/update  → Update quantity

DELETE /    http://localhost:3000/cart/remove   → Remove from cart

GET /     http://localhost:3000/cart    → View my cart  (admin can view all carts)

📑 Orders

POST /    http://localhost:3000/orders   → Place an order

GET /    http://localhost:3000/orders/my-orders    → View my orders

GET /    http://localhost:3000/orders   → View all orders  (admin only)

put /    http://localhost:3000/orders/<ORDER_ID>/status →  update Order Status  (admin only)



--------------------------------------

👩‍💻 Roles & Permissions

Admin:

Manage users, products, carts, orders

User:

Browse products, manage cart (his cart), place orders


----------------------------------------------------------

🧪 Testing with Postman

1-Import the Postman collection (included in repo if added).

2-Register Then Use login endpoint to get token.

3-Add token in Authorization Header:    Authorization: Bearer <your_token>

--------------------------------------------


📌 Notes
.Make sure MongoDB Atlas is running.
.Default role = user, set role: admin manually in DB if needed.

- **Postman** for testing

---
