import z from "zod";
import { getDB } from "../config/mongoDB";
import { signToken } from "../helpers/jwt";
import { checkPassword, hashPassword } from "../helpers/bcrypt";
import { BaseError } from "../helpers/customErrors";
import { HTTPStatus } from "../types/Index";

interface IUser {
    name: string
    username: string
    email: string
    password: string
}

interface ILogin {
    email: string
    password: string
}

const userSchema = z.object({
    username: z.string(),
    email: z.email(),
    password: z.string().nonempty('Password is required').min(5, 'Password minimal is 5')
})

const loginSchema = z.object({
    email: z.email(),
    password: z.string()
})

export default class User {
    static connection() {
        const db = getDB()
        const collection = db.collection('users')
        return collection
    }

    static async register(payload: IUser): Promise<string> {
        userSchema.parse(payload)
        const collection = this.connection()
        const existingUsername = await collection.findOne({username: payload.username})
        if (existingUsername) throw new BaseError('Username already exists', HTTPStatus.BadRequest)

        const existingEmail = await collection.findOne({email: payload.email})
        if (existingEmail) throw new BaseError('Email already exists', HTTPStatus.BadRequest)

        payload.password = hashPassword(payload.password)
        await collection.insertOne(payload)

        return 'Register successfull'
    }

    static async login(payload: ILogin): Promise<string> {
        loginSchema.parse(payload)
        const collection = this.connection()

        const user = await collection.findOne({email: payload.email})
        if(!user) throw new BaseError('Invalid email/password', HTTPStatus.Unauthorized)

        const isValid = checkPassword(payload.password, user.password)
        if(!isValid) throw new BaseError('Invalid email/password', HTTPStatus.Unauthorized)
        
        const token = signToken({_id: user._id, username: user.username})

        return token
    }
} 