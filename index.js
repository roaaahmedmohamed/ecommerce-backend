import express from "express";
import { dbConnection } from "./db/dbConnection.js";
import { userRoutes } from "./src/modules/User/user.routes.js";
import { cartRoutes } from "./src/modules/cart/cart.routes.js";
import { productRoutes } from "./src/modules/product/product.routes.js";
import { orderRoutes } from "./src/modules/order/order.routes.js";

const app = express();

dbConnection;

app.use("/users", userRoutes);
app.use("/cart", cartRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
