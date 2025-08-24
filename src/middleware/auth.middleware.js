import jwt from "jsonwebtoken";
import { userModel } from "../../db/models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer token
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, "MY_SECRET_KEY"); 
    const user = await userModel.findById(decoded._id);

    if (!user) return res.status(401).json({ message: "Invalid token" });

    req.user = user; 
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error });
  }
};
