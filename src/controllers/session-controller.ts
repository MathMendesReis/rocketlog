import {Request,Response} from 'express'
import {z} from "zod"
import {compare, hash} from 'bcrypt'
import { prisma } from '../database/prisma'
import { AppError } from '../utils/app-error'
import { authConfig } from '../configs/auth-config'
import { sign } from 'jsonwebtoken'
export class SessionController {
   async execute(request:Request, response:Response){
    const bodySchema = z.object({
      email:z.string().email(),
      password:z.string().min(6)
    })
    const {email,password} = bodySchema.parse(request.body)
    const user = await prisma.user.findFirst({where:{email}})
    if(!user){
      throw new AppError("Invalid email or password",401)
    }
    const passwordMatchead = await compare(password,user.password)
    if(!passwordMatchead){
      throw new AppError("Invalid email or password",401)
    }

    const {expiresIn,secret} = authConfig.jwt
    const token = sign({role:user.role},secret,{
      subject:user.id,
      expiresIn
    })
    const {password:_,...userWithoutPassword} = user

    
    response.json({token,user:userWithoutPassword})
  }
}