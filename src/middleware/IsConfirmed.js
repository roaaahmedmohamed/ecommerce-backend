
import { userModel } from "../../db/models/user.model.js";

export const checkConfirmed = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.isConfirmed) {
      return res.status(403).json({ message: "Please confirm your email first." });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Error checking confirmation", error });
  }
};
