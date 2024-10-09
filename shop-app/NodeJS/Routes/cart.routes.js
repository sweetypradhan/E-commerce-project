import { addToCart, updateCartQuantity, removeFromCart } from "../Controller/cart.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export function cartRoutes(app){
    app.post("/cart/", verifyToken, addToCart);  // Route to add an item to the cart; requires token verification
    app.put("/cart/:id", verifyToken, updateCartQuantity);   // Route to update the quantity of a specific cart item; requires token verification
    app.delete("/cart/:id", verifyToken, removeFromCart);    // Route to remove an item from the cart; requires token verification
}

