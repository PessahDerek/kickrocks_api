import mongoose, {Schema} from "mongoose";
import {ProductModel} from "../../../env.d.types";


const Product = new Schema<ProductModel>({
    make: String,
    name: String,
    type: String,
    description: String,
    images: [String],
    price: Number,
    discount: {type: Number, required: false},
})

const Products = mongoose.model('Products', Product)

export default Products;

