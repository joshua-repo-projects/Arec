import Product from "@/server/models/Product";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
    try {
        const data = await Product.getAllProduct()
        return Response.json({data}, {status: 200})
    } catch (error) {
        console.log(error, 'error')
    }
}