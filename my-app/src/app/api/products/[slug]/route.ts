import Product from "@/server/models/Product";
import { NextRequest } from "next/server";

interface IParams {
    params: Promise<{slug: string}>
}

export async function GET(req: NextRequest, params: IParams) {
    try {
        const {slug} = await params.params
        const data = await Product.getProductBySlug(slug)
        return Response.json({data}, {status: 200})
    } catch (error) {
        console.log(error, 'error product/slug')
    }
}