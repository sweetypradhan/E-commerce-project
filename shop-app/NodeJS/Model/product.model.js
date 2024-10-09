import mongoose from "mongoose";

// Define the schema for the product
const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    images: { type: String, required: true },
    stock: { type: Number, default: 0 } 
});

// Create a model from the product schema
const productModel = mongoose.model("Product", productSchema);
export default productModel;
