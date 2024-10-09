import mongoose from "mongoose";

// Define the schema for the user
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    }
});

// Create a model from the user schema
const userModel = mongoose.model("User", userSchema);

export default userModel;