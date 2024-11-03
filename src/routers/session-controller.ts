import { Router } from "express";
import { SessionController } from "../controllers/session-controller";

const sessionRouter = Router()
const sessionController = new SessionController()
sessionRouter.post('/auth',sessionController.execute)
export {sessionRouter}