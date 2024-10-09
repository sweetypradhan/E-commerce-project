# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh




GitHub link :- https://github.com/sweetypradhan/E-commerce-project

ShoppyGlobe E-commerce Backend

Project Overview:-
ShoppyGlobe is a backend API for an e-commerce application built using Node.js, Express, and MongoDB. This API facilitates product management and shopping cart functionality, complete with user authentication and authorization.

Technologies Used:-
Node.js: JavaScript runtime for building the server.
Express.js: Web framework for Node.js to build APIs.
MongoDB: NoSQL database for storing product and cart data.
JWT (JSON Web Tokens): For user authentication.

Features:-
Fetch a list of products and details of individual products.
Add, update, and remove items from a shopping cart.
User registration and login with JWT authentication.
Protected routes to ensure only authenticated users can modify cart items.

API Endpoints

Products
GET /products: Fetch a list of all products.
GET /products/id
: Fetch details of a specific product by its ID.

Cart
POST /cart: Add a product to the shopping cart.
PUT /cart/
: Update the quantity of a product in the cart.
DELETE /cart/
: Remove a product from the cart.

Authentication
POST /register: Register a new user.  (signUp)
POST /login: Authenticate user and return a JWT token.

How to run the project:-

cd shop-app
cd NodeJS
npm start             //to start a server or connect to database


cd shop-app
npm run dev         // Running the Application


If you dont have any account .... then you have to first signUp and create an account .... then Login with your email, password and only after successful login you will navigate to Home page, and you will get your accessToken and after 10 min your accessToken will expire.