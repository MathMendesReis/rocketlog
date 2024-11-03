import { Router } from "express";
import { usersRouter } from "./users-routers";
import { sessionRouter } from "./session-controller";
import { deliveryRouter } from "./delivery-router";
import { deliveryLogsRouter } from "./delivery-logs-router";

const router = Router()

router.use("/users",usersRouter)
router.use("/session",sessionRouter)
router.use("/delivery",deliveryRouter)
router.use("/delivery-logs",deliveryLogsRouter)


export {router}