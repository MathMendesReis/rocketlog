import {Request,Response,NextFunction} from 'express'
import { AppError } from '../utils/app-error'
import { verify } from 'jsonwebtoken'
import { authConfig } from '../configs/auth-config'

interface TokenPayload {
  role:string,
  sub:string
}
export function ensureAuthenticate(
  request:Request,
  response:Response,
  nextFunction:NextFunction,
){
try {
  const authHeader = request.headers.authorization
  if(!authHeader){
    throw new AppError('Jwt not found',401)
  }

  //Bearer token
  const [,token] = authHeader.split(" ")
  console.log(token)
  const {role, sub:user_id} = verify(token,authConfig.jwt.secret) as TokenPayload

  request.user = {
    id:user_id,
    role
  }
  return nextFunction()
} catch (error) {
  throw new AppError('Invalid web token',401)

}
}