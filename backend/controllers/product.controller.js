import mongoose from "mongoose";
import express from 'express';
import Product from "../models/product.model.js";

export const getProduct = async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    } catch (error) {
        console.log("Error in fetching products:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};

export const createProduct = async (req, res) => {
    const product = req.body;

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields"})
    }

    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch (error) {
        console.log("Error in Create product", error.message);
        res.status(500).json({success: false, message: "Server Error"})
    }

};


export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted"});
    } catch (error) {
        console.log("Error in deleting product", error.message);
        res.status(404).json({success:false, message: "Produt not found"});
    }
};


export const updateProduct = async (req, res) => {
    const { id } = req.params;

    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.send(404).json({ success: false, message: "Invalid product Id"});
    }
    try {
       const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true}, { runValidators: true });
       res.status(200).json({ success: true, data: updatedProduct})
    } catch (error) {
        res.send(500).json({ success: false, message: "Server Error"});
    }
};
