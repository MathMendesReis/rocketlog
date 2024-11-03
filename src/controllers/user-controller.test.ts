import { app } from "../app"
import request from 'supertest'
import { prisma } from "../database/prisma"
describe('User controller',()=>{
  let user_id:string
  afterAll(async()=>{
    
    await prisma.user.delete({
      where: {
        id: user_id
      },
    })
  })
  it('Should be register a user',async () => {
    const response = await request(app).post("/users").send({
      "name":"jhondow",
      "email":"jhondow@g.ail.com",
      "password":"secret"
    })
    user_id = response.body.user.id
    expect(response.status).toBe(201)
    expect(response.body.user).toHaveProperty("id")
   
  })
  it('Should throw user already existes',async () => {
    const response = await request(app).post("/users").send({
      "name":"jhondow",
      "email":"jhondow@g.ail.com",
      "password":"secret"
    })
    expect(response.status).toBe(400)
  })
})