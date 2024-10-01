import { addToCart, updateCartQuantity, removeFromCart } from "../Controller/cart.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export function cartRoutes(app){
    app.post("/cart/", verifyToken, addToCart);
    app.put("/cart/:id", verifyToken, updateCartQuantity);
    app.delete("/cart/:id", verifyToken, removeFromCart);
}

