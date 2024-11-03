import {Request,Response} from 'express'
import {z} from "zod"
import {hash} from 'bcrypt'
import { prisma } from '../database/prisma'
import { AppError } from '../utils/app-error'
export class UserController {
   async create(request:Request, response:Response){
    const bodySchema = z.object({
      name:z.string(),
      email:z.string().email(),
      password:z.string().min(6)
    })
    const {email,name,password} = bodySchema.parse(request.body)
    const userWithSameEmail = await prisma.user.findFirst({where:{email}})
    if(userWithSameEmail){
      throw new AppError("User already exists")
    }
    const hashPassword = await hash(password,8)
    const user = await prisma.user.create({
      data:{
        name,
        email,
        password:hashPassword
      }
    })

    const {password:_,...userWithoutPassword} = user
     response.status(201).json({user:userWithoutPassword})
  }
}