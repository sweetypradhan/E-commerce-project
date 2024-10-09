import mongoose from "mongoose";

// Define the schema for the shopping cart
const cartSchema = new mongoose.Schema({
    // Reference to the product being added to the cart
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 }       // Quantity of the product in the cart
});

// Create a model from the cart schema
const cartModel = mongoose.model("Cart", cartSchema);
export default cartModel;
