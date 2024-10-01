import express from "express";
import mongoose from "mongoose";
import { routes } from "./Routes/product.routes.js";
import { cartRoutes } from "./Routes/cart.routes.js";
import { userRoutes } from "./Routes/user.routes.js";
import cors from "cors";

const app = new express();

app.use(express.json());
app.use(cors());


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

app.use((req,res,next) =>{
    console.log("Middleware is accessed");
    next();
},
(req, res, next) =>{
    console.log("Request", req.method);
    next();
}
);


app.listen(5000, () => {
    console.log("server is running on port 5000");
    
})

// mongoose.connect("mongodb://127.0.0.1:27017")

mongoose.connect("mongodb+srv://product:product@cluster0.5znj4.mongodb.net/")

const db = mongoose.connection;

db.on("open", () => {
    console.log("Database connection is successful");
});

db.on("error", () => {
    console.log("Database connection is not successful");
});

routes(app);
cartRoutes(app);
userRoutes(app);