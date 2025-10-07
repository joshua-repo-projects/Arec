import z from "zod";
import { getDB } from "../config/mongoDB";
import bcrypt from "bcryptjs";

interface IUser {
    name: string
    username: string
    email: string
    password: string
}

const userSchema = z.object({
    username: z.string(),
    email: z.email(),
    password: z.string().min(5, 'Password minimal is 5')
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

        if (existingUsername) {
            throw new Error('Username already exists')
        }

        const existingEmail = await collection.findOne({email: payload.email})

        if (existingEmail) {
            throw new Error('Email already exists')
        }

        payload.password = bcrypt.hashSync(payload.password, 10)
        await collection.insertOne(payload)

        return 'Register successfull'
    }
} 