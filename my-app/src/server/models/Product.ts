import { getDB } from "../config/mongoDB";


export default class Product {
    static connection() {
        const db = getDB()
        const collection = db.collection('products')
        return collection
    }

    static async getAllProduct() {
        const collection = this.connection()
        const data = await collection.find().toArray()

        return data
    }
}