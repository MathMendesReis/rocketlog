import express from 'express'
import "express-async-errors"
import { errorHandling } from './middlewares/error-handling'
import { router } from './routers'
const app = express()
app.use(express.json())
app.use(errorHandling)
app.use(router)
export {app}