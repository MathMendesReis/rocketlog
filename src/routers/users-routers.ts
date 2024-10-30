import { Router } from "express";
import { UserController } from "@/controllers/users-controller";

const usersRouter = Router()

const userController = new UserController()

usersRouter.post("/",userController.create)

export {usersRouter}