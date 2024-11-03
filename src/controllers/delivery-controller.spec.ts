import request from 'supertest'
import { app } from '../app'
import { prisma } from '../database/prisma'

describe('Delivery controller',()=>{
  let delivery_id:string
  let user_id:string
  afterAll(async()=>{
    await prisma.user.delete({
      where: {
        id: user_id
      },
    })
    await prisma.delivery.delete({
      where: {
        id: delivery_id
      },
    })
  })
  it('create',async()=>{
    const user = await request(app).post("/users").send({
      "name":"jhondow",
      "email":"jhondow@g.ail.com",
      "password":"secret"
    })
    user_id = user.body.user.id

    const response = await request(app).post("/delivery").send({
      "user_id":"d83c58b1-f81d-4e83-b453-a8c0116d33df",
      "description":"Teclado"
    })
    delivery_id = response.body.delivery.id
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })

  it('findmany',async()=>{
    const response = await request(app).get("/delivery")
    expect(response.status).toBe(200)
  })
})