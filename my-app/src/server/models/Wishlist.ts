import { ObjectId } from "mongodb"
import { getDB } from "../config/mongoDB"
import z from "zod"

interface IWishlist {
    userId: ObjectId
    productId: ObjectId
}

const wishlistSchema = z.object({
    userId: z.string(),
    productId: z.string()
})

export default class Wishlist {
    static connection() {
        const db = getDB()
        const collection = db.collection('wishlists')

        return collection
    }

    static async createWishlist(payload: IWishlist): Promise<string> {
        wishlistSchema.parse(payload)
        const collection = this.connection()
        await collection.insertOne(payload)

        return 'Successfull add wishlist'
    }
}