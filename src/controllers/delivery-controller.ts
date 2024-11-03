import {Request,Response} from 'express'
import z from 'zod'
import { prisma } from '../database/prisma'
import { AppError } from '../utils/app-error'

export class DeliveryController {
  async create(request:Request, response:Response){
    const bodySchema = z.object({
      user_id:z.string().uuid(),
      description:z.string(),
    })

    const {user_id,description} = bodySchema.parse(request.body)

    const userWithSameId = await prisma.user.findFirst({
      where:{
        id:user_id
      }
    })

    if(!userWithSameId){
      throw new AppError("User already exists",401)
    }

    const delivery =await prisma.delivery.create({
      data:{
        userId:userWithSameId.id,
        description
      }
    })
    response.json({delivery})
  }
  async findmany(request:Request, response:Response){
    const deliverys = await prisma.delivery.findMany({
      include:{
        user:{
          select:{
            name:true,
            email:true
          }
        }
      }
    })
    response.json({deliverys})
  }

  async updateStatus(request:Request, response:Response){
    const paramsSchema = z.object({
      id:z.string().uuid(),
    })
    const bodySchema = z.object({
      status:z.enum(['processing','shipped','delivered']),
    })

    const {id} = paramsSchema.parse(request.params)
    const {status} = bodySchema.parse(request.body)

     await prisma.delivery.update({
      where:{
        id
      },
      data:{
        status
      }
    })
    response.json()
  }
}