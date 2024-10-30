import {Request,Response} from 'express'
export class UserController {
  create(request:Request, response:Response){
    return response.json({message:"ok"})
  }
}