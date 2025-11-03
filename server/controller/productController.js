import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import cloudinary from "../config/cloudinary.js";

// createProduct
const createProduct = asyncHandler(async (req, res) => {
    const {name,price,description,category,stock,brand,image,discountPercentage} = req.body;

    // check if product with same name exists
    const productExists = await Product.findOne({name});
    if(productExists){
        res.status(400);
        throw new Error("Product already exists");
    }
    
    // upload image to cloudinary
    uploadImage = await cloudinary.uploader.upload(image);
    const product = await Product.create({
        name,
        price,
        description,
        category,
        stock:stock || 0,
        brand,
        image: "", // uploadImage.url,
        discountPercentage: discountPercentage || 0
    });
    if (product) {
        res.status(201).json({
            success: true,
            product
        });
    }else{
        res.status(400);
        throw new Error("Invalid Product Data");
    }
    

    });

    export {createProduct};

