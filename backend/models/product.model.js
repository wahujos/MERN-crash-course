import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price cannot be negative"]
    },
    image: {
        type: String,
        required: true,
    },
},
{ timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;