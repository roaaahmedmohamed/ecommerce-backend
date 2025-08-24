import { productModel } from "../../../db/models/product.model.js";

//create Product
 const createProduct = async (req, res) => {
  try {
    const product = await productModel.create({
      ...req.body,
      owner: req.user._id,
    });
    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

//get All Products
 const getAllProducts = async (req, res) => {
  try {
    const products = await productModel
      .find()
      .populate("owner", "name email role");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

//get Product By Id
 const getProductById = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.id)
      .populate("owner", "name email role");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

//update Product
 const updateProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

   
    if (req.user.role === "admin") {
      Object.assign(product, req.body);
    }
    
    else if (product.owner.toString() === req.user._id.toString()) {
      if (req.body.stock !== undefined) {
        product.stock = req.body.stock;
      } else {
        return res
          .status(400)
          .json({ message: "Quantity field is required for update" });
      }
    }
   
    else {
      return res
        .status(403)
        .json({ message: "Forbidden: not allowed to update this product" });
    }

    await product.save();
    res.json({ message: "Product updated", product });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

//deleteProduct
const deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    
    if (
      req.user.role !== "admin" &&
      product.owner.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Forbidden: not allowed to delete this product" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};


export{
  getAllProducts,
  createProduct,
  deleteProduct,
  getProductById,
  updateProduct
}