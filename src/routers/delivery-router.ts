import { Router } from "express";
import { DeliveryController } from "../controllers/delivery-controller";
import { ensureAuthenticate } from "../middlewares/ensure-authenticate";
import { verifyUserAutorization } from "../middlewares/verify-user-autorization";

const deliveryRouter = Router()
const deliveryController = new DeliveryController()
deliveryRouter.use(ensureAuthenticate,verifyUserAutorization(['sale']))
deliveryRouter.post('/',deliveryController.create)
deliveryRouter.get('/',deliveryController.findmany)
deliveryRouter.put('/:id/status',deliveryController.updateStatus)
export {deliveryRouter}