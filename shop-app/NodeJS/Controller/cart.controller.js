import cartModel from "../Model/cart.model.js";
import productModel from "../Model/product.model.js";

export async function addToCart(req, res) {
    const { productId, quantity } = req.body;

    try {
        // Check if the product exists in the database
        const product = await productModel.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // Create a new cart item with the productId and quantity
        const newCartItem = new cartModel({ productId, quantity });
        const savedCartItem = await newCartItem.save();      // Save the new cart item to the database
        res.status(201).json(savedCartItem);         // Respond with the saved cart item and a 201 status
    } catch (error) {
        res.status(400).json({ message: "Error adding to cart", error });
    }
}

export async function updateCartQuantity(req, res) {
    const { id } = req.params;     // Extract cart item ID from request parameters
    const { quantity } = req.body;    // Extract new quantity from request body

    try {
        // Find the cart item by ID and update its quantity
        const updatedCart = await cartModel.findByIdAndUpdate(id, { quantity }, { new: true });
        // Return 404 if the cart item was not found
        if (!updatedCart) return res.status(404).json({ message: "Cart item not found" });
        // Respond with the updated cart item
        res.json(updatedCart);
    } catch (error) {
        // Handle any errors during the process
        res.status(400).json({ message: "Error updating cart", error });
    }
}

export async function removeFromCart(req, res) {
    const { id } = req.params;    // Extract cart item ID from request parameters

    try {
        // Find the cart item by ID and delete it
        const deletedCart = await cartModel.findByIdAndDelete(id);
        if (!deletedCart) return res.status(404).json({ message: "Cart item not found" });
        res.json({ message: "Cart item removed" });      // Respond with a success message
    } catch (error) {
        res.status(400).json({ message: "Error removing from cart", error });
    }
}
