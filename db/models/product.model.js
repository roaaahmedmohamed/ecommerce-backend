import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    price: { type: Number},
    stock: { type: Number, default: 0 },
    category: { type: String },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User", 
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const productModel = model("Product", productSchema);
