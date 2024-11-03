import {Request,Response} from 'express'
import z from 'zod'
import { prisma } from '../database/prisma'
export class DeliveryLogsController {
  async create(request:Request,response:Response){
    const bodySchema = z.object({
      description:z.string(),
    })
    const paramsSchema = z.object({
      deliveryId:z.string(),
    })
    const {description} =bodySchema.parse(request.body)
    const {deliveryId} =paramsSchema.parse(request.params)

    await prisma.deliveryLog.create({
      data:{
        deliveryId,
        description
      }
    })

    response.status(201).json()

  }
  async findmany(request:Request,response:Response){
    const paramsSchema = z.object({
      deliveryId:z.string(),
    })
    const {deliveryId} =paramsSchema.parse(request.params)

    const logs = await prisma.deliveryLog.findMany({
      where:{
        deliveryId
      }
    })
    response.json({logs})
  }
  async execute(request:Request,response:Response){}
}
/* id          String @id @default(uuid())
description String
deliveryId  String @map("delivery_id")

delivery Delivery @relation(fields: [deliveryId], references: [id])

createdAt DateTime @default(now()) @map("created_at")
updateAt  DateTime @updatedAt @map("update_at") */