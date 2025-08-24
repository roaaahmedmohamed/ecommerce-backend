import { cartModel } from "../../../db/models/cart.model.js";
import { orderModel } from "../../../db/models/order.model.js";

// Create order from cart
 const createOrder = async (req, res) => {
  try {
    const cart = await cartModel.findOne({ user: req.user._id }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total
    let totalPrice = 0;
    cart.items.forEach(item => {
      totalPrice += item.product.price * item.quantity;
    });

    // Create order
    const order = await orderModel.create({
      user: req.user._id,
      items: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      })),
      totalPrice
    });

    // Clear cart after order
    cart.items = [];
    await cart.save();

    res.status(201).json({ message: "Order created", order });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

// Get all orders (admin only)
 const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().populate("user", "name email").populate("items.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

// Get user orders (only his own)
const getMyOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ user: req.user._id }).populate("items.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

// Update order status (admin only)
 const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
};



export{
  createOrder,
  getAllOrders,
  getMyOrders,
  updateOrderStatus
}