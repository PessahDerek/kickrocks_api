import mongoose, {Schema} from "mongoose";
import {OrderModel} from "../../../env.d.types";
import Products from "./Products";


const Order = new Schema<OrderModel>({
    count: Number,
    cost: Number,
    product: {type: [mongoose.Types.ObjectId], ref: Products, required: true},
    date: {type: String, required: true, default: new Date().toDateString},
    completed: {type: Boolean, required: false, default: false}
})


const Orders = mongoose.model('Orders', Order)
export default Orders;
