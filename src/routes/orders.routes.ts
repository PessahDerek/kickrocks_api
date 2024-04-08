import {Router} from "express";
import * as order from '../handlers/order/order.handlers'
import {onlyMembers} from "../middleware/auth/onlyMembers";
import {onlyAdmin} from "../middleware/auth/onlyAdmin";

const ordersRoutes = Router();

ordersRoutes
    .get('/:user_id', onlyMembers, order.fetch)
    .post('/create', onlyMembers, order.place)
    .delete('/cancel', onlyMembers, order.cancel)

    .get('/', onlyAdmin, order.adminFetch)
    .post('/update', onlyAdmin, order.update)


export default ordersRoutes;