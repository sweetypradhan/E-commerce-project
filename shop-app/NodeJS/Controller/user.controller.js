import userModel from "../Model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function register(req,res) {
    const { fullName, email, password } = req.body;   // Destructure user details from the request body

    // Check if the user already exists by searching for their email
    userModel.findOne({email}).then((data) => {
        if(data){
            return res.status(400).json({user: "user already exists"})
        } else {
            // Create a new user instance with hashed password
            const newUser = new userModel({
                fullName,
                email,
                password: bcrypt.hashSync(password, 10), // Hash the password with a salt round of 10
            });

            // Save the new user to the database
            newUser.save().then((data) =>{
                res.status(200).json({message: data});  // Respond with success message and user data
            });
        }
    }).catch(err => res.status(500).json({message: err.message}));
}

export function login(req, res){
    const { email, password } = req.body; // Destructure user login credentials from the request body
    
    // Search for the user by their email
    userModel.findOne({email}).then((data) => {
        if(!data){
            return res.status(404).json({message: "user is not registered"})
       
        }

        // Compare the provided password with the hashed password in the database
        let isValidPassword = bcrypt.compareSync(password, data.password);

        if(!isValidPassword) {
            return res.status(403).send({message: "Invalid Password"});
        }

        // Generate a JWT token with user ID as payload, expires in 10 minutes
        let token = jwt.sign({ id: data._id }, "secretKey", { expiresIn: '10m'});

        // Respond with user information and the generated access token
        res.send({
            user: {
                email: data.email,
                fullName: data.fullName,
            },
            accessToken: token,
        });

    }).catch( err => {
        res.status(500).send({ message: err.message }); // Handle errors during user lookup
    })
}