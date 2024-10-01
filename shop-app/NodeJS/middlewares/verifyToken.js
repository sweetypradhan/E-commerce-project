// import jwt from "jsonwebtoken";
// import userModel from "../Model/user.model.js";

// export function verifyToken(req, res, next) {
//     if(
//         req.header && req.header.authorization && req.header.authorization.split(" ")[0] === "JWT"
//     ) {
//         jwt.verify(
//             req.headers.authorization.split(" ")[1], "secretKey", function (err, verifiedToken){
//                 if (err) {
//                     return res.status(403).json({ message: "Invalid JSON Token"})
//                  }

//                  userModel.findById(verifiedToken._id).then((user) => {
//                     req.user = user;
//                     next();
//                 }).catch((err) => {
//                     res.status(500).json({message: err.message });
//                 });
//             }
//         )
//     } else {
//         res.status(403).json({ message: "token not present "})
//     }
// }

import jwt from "jsonwebtoken";
import userModel from "../Model/user.model.js";

export function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    // Check if the authorization header exists and starts with "JWT "
    if (authHeader && authHeader.startsWith("JWT ")) {
        const token = authHeader.split(" ")[1]; // Extract the token

        jwt.verify(token, "secretKey", (err, verifiedToken) => {
            if (err) {
                return res.status(403).json({ message: "Invalid JSON Token" });
            }

            // Attach the user information to the request object
            userModel.findById(verifiedToken.id) // Use verifiedToken.id
                .then(user => {
                    if (!user) {
                        return res.status(404).json({ message: "User not found" });
                    }
                    req.user = user; // Set user in request
                    next(); // Proceed to the next middleware/route handler
                })
                .catch(err => {
                    res.status(500).json({ message: err.message });
                });
        });
    } else {
        res.status(403).json({ message: "Token not present" });
    }
}
