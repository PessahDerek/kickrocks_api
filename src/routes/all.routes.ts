import {Router} from "express";
import authRoutes from "./auth.routes";
import productRoutes from "./product.routes";
import ordersRoutes from "./orders.routes";


const routes = Router();

routes
    .get("/", (req, res, next)=>{
        res.send("Server healthy").end()
    })
    .use('/auth', authRoutes)
    .use('/product', productRoutes)
    .use('/orders', ordersRoutes)

export default routes

