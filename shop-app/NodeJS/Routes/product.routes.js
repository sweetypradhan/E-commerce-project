import { createProduct, fetchProducts, fetchProductById } from "../Controller/product.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export function routes(app) {
    app.post("/api/product", createProduct);
    app.get("/api/products", verifyToken, fetchProducts);
    app.get("/api/product/:id", fetchProductById);
}