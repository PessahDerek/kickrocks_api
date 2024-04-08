import {Router} from "express";
import * as product from '../handlers/product'
import {onlyAdmin} from "../middleware/auth/onlyAdmin";

const productRoutes = Router();

productRoutes
    .get('/', product.fetch)

    .post('/add-product', onlyAdmin, product.add)
    .delete('/:product_id', onlyAdmin, product.erase)
    .put('/edit', onlyAdmin, product.edit)

export default productRoutes;