// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//     title: String,
//     description: String,
//     category: String,
//     price: Number,
//     discountPercentage: Number,
//     rating: Number,
//     images: String
// });

// const productModel = mongoose.model("product", productSchema);

// export default productModel;





import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    images: { type: String, required: true },
    stock: { type: Number, default: 0 } // Stock quantity
});

const productModel = mongoose.model("Product", productSchema);
export default productModel;
