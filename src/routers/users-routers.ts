import { Router } from "express";
import { UserController } from "../controllers/users-controller";
import { SessionController } from "../controllers/session-controller";

const usersRouter = Router()
const usersController = new UserController()


usersRouter.post('/', usersController.create)


export {usersRouter}