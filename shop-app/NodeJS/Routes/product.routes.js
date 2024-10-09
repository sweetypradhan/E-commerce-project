import { createProduct, fetchProducts, fetchProductById } from "../Controller/product.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export function routes(app) {
    app.post("/api/product", createProduct);       // Route to create a new product
    app.get("/api/products", verifyToken, fetchProducts);   // Route to fetch all products; requires token verification
    app.get("/api/product/:id", fetchProductById);  // Route to fetch a specific product by its ID
}