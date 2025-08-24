import { Schema,model } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    confirmToken: String,
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const userModel = model("User",userSchema)
