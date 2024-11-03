import { Router } from "express";
import { DeliveryLogsController } from "../controllers/delivery-logs-controller";
import { ensureAuthenticate } from "../middlewares/ensure-authenticate";

const deliveryLogsRouter = Router()
const deliveryLogsController = new DeliveryLogsController()
deliveryLogsRouter.use(ensureAuthenticate)

deliveryLogsRouter.post('/:deliveryId',deliveryLogsController.create)
deliveryLogsRouter.get('/:deliveryId',deliveryLogsController.findmany)
export {deliveryLogsRouter}