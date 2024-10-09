import express from "express";
import mongoose from "mongoose";
import { routes } from "./Routes/product.routes.js";
import { cartRoutes } from "./Routes/cart.routes.js";
import { userRoutes } from "./Routes/user.routes.js";
import cors from "cors";

const app = express();

// Middleware to parse JSON
app.use(express.json());

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', 
}));

// Middleware for logging requests
app.use((req, res, next) => {
    console.log("Middleware is accessed");
    next();
}, (req, res, next) => {
    console.log("Request Method:", req.method);
    next();
});

// Route handlers
routes(app);
cartRoutes(app);
userRoutes(app);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

// MongoDB connection
mongoose.connect("mongodb+srv://product:product@cluster0.5znj4.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database connection is successful");
        // Start the server only after a successful DB connection
        app.listen(5000, () => {
            console.log("Server is running on port 5000");
        });
    })
    .catch(err => {
        console.error("Database connection error:", err);
    });
