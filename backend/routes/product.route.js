import express from 'express';
import Product from '../models/product.model.js';
import { createProduct, deleteProduct, updateProduct, getProduct } from '../controllers/product.controller.js';

const router = express.Router();

// create a product
router.post("/", createProduct);

// Delete a product

router.delete("/:id", deleteProduct);

// Get all products

router.get("/", getProduct);

// Update a product

router.put("/:id", updateProduct);

export default router;