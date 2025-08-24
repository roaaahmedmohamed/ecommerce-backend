import mongoose from "mongoose";

export const dbConnection = mongoose
  .connect(
    "mongodb+srv://roaa:roaa1234@ecommerce-cluster.v7t5rmg.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=ecommerce-cluster"
  )
  .then(() => {
    console.log("DB atals connected");
  })
  .catch((err) => {
    console.log("DB connection error:", err);
  });
