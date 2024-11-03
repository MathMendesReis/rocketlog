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
  it('Should be authenticate a user',async () => {
    const createUser = await request(app).post("/users").send({
      "name":"jhondow",
      "email":"jhondow@g.ail.com",
      "password":"secret"
    })
    user_id = createUser.body.user.id

    const response = await request(app).post("/session/auth").send({
      "email":"jhondow@g.ail.com",
      "password":"secret"
    })

    expect(response.status).toBe(200)
    expect(response.body.token).toEqual(expect.any(String))
 
   
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