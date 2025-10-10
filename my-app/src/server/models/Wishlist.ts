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

        const wishlists = {
            userId: new ObjectId(payload.userId),
            productId: new ObjectId(payload.productId),
            createdAt: new Date(),
            updatedAt: new Date()
        }

        await collection.insertOne(wishlists)

        return 'Successfull add wishlist'
    }

    static async getWishlistById(userId: ObjectId) {
        const collection = this.connection()

        const payload = [
            {
                $match: { userId: new ObjectId(userId) }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: "Product"
                }
            },
            {
                $sort: { createdAt: -1 }
            }
        ]

        const data = await collection.aggregate(payload).toArray()

        return data
    }

    static async deleteWishlist() {
        const collection = this.connection()
        const query = { _id: ObjectId }
        await collection.deleteOne(query)

        return 'Successfull delete wishlist'
    }
}