import jwt from "jsonwebtoken"; 
import userModel from "../Model/user.model.js";

export function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization; // Retrieve the Authorization header from the request

    // Check if the Authorization header exists and starts with "JWT "
    if (authHeader && authHeader.startsWith("JWT ")) {
        const token = authHeader.split(" ")[1];  // Extract the token from the header

        // Verify the token using the secret key
        jwt.verify(token, "secretKey", function (err, verifiedToken) {
            if (err) {
                return res.status(403).json({ message: "Invalid JSON Token" });
            }

            // Find the user associated with the verified token ID
            userModel.findById(verifiedToken._id).then((user) => {
                req.user = user; // Attach the user information to the request object
                next();   // Proceed to the next middleware or route handler
            }).catch((err) => {
                res.status(500).json({ message: err.message });  // Handle errors during user lookup
            });
        });
    } else {
        res.status(403).json({ message: "token not present" });
    }
}























