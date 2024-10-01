// controllers/cart.controller.js
import cartModel from "../Model/cart.model.js";
import productModel from "../Model/product.model.js";

export async function addToCart(req, res) {
    const { productId, quantity } = req.body;

    try {
        const product = await productModel.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const newCartItem = new cartModel({ productId, quantity });
        const savedCartItem = await newCartItem.save();
        res.status(201).json(savedCartItem);
    } catch (error) {
        res.status(400).json({ message: "Error adding to cart", error });
    }
}

export async function updateCartQuantity(req, res) {
    const { id } = req.params;
    const { quantity } = req.body;

    try {
        const updatedCart = await cartModel.findByIdAndUpdate(id, { quantity }, { new: true });
        if (!updatedCart) return res.status(404).json({ message: "Cart item not found" });
        res.json(updatedCart);
    } catch (error) {
        res.status(400).json({ message: "Error updating cart", error });
    }
}

export async function removeFromCart(req, res) {
    const { id } = req.params;

    try {
        const deletedCart = await cartModel.findByIdAndDelete(id);
        if (!deletedCart) return res.status(404).json({ message: "Cart item not found" });
        res.json({ message: "Cart item removed" });
    } catch (error) {
        res.status(400).json({ message: "Error removing from cart", error });
    }
}
