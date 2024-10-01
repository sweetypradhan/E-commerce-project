import productModel from "../Model/product.model.js";

export function createProduct(req,res) {
    const { title, description, category, price, discountPercentage, rating, images, stock } = req.body;

    const newProduct = new productModel ({
        title: title,
        description: description,
        category: category,
        price: price,
        discountPercentage: discountPercentage,
        rating: rating,
        images: images,
        stock: stock
    });

    newProduct.save().then(data => {
        if(!data) {
            return res.status(400).json({message: "Something went wrong"});
        }

        res.send(data);
    });
}

export function fetchProducts(req,res) {
    productModel.find().then((data) => {
        if(!data) {
            return res.status(400).send("Something went wrong");
        }

        res.send(data);
    }).catch(err => res.status(500).json({message: "Internal Server Error" || err.message }))
}

export function fetchProductById(req, res){
    const { id } = req.params;

    productModel.findById(id).then((data) => {
        if(!data) {
            return res.status(400).send("Product not found");
        }

        res.send(data);
    }).catch(err => res.status(500).json({message: "Internal Server Error" || err.message }))
}