import { login, register } from "../Controller/user.controller.js";

export function userRoutes(app){
    app.post("/register", register);  // Route to create a new user
    app.post("/login", login);      // Route for user login
}

