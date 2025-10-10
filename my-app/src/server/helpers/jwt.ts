import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'

interface IPayload {
    _id: ObjectId
    username: string
}

export const signToken = (payload: IPayload) => {
    return jwt.sign(payload, process.env.JWT_SECRET as string)
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET as string)
}