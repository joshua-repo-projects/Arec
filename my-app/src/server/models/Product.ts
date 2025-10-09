import { getDB } from "../config/mongoDB";


export default class Product {
    static async connection() {
        const db = getDB()
        const collection = db.collection('products')
        await collection.createIndex({sku: 1}, {unique: true})
        return collection
    }

    static async getAllProduct(search?: string, page: number = 1, limit: number = 10) {
        const collection = await this.connection()

        const skip = (page - 1) * limit;
        const filter = search ? {name: {$regex: search, $options: 'i'}} : {};

        const data = await collection.find(filter).skip(skip).limit(limit).toArray();
        const totalProducts = await collection.countDocuments(filter);

        return {
            data,
            pagination: {
                totalProducts,
                totalPages: Math.ceil(totalProducts / limit),
                currentPage: page,
                limit
            }
        };
    }

    static async getProductBySlug(slug: string) {
        const collection = await this.connection()
        const data = await collection.findOne({sku: slug})

        return data
    }
}