import { ErrorHandler } from "@/server/helpers/errorHandler";
import Product from "@/server/models/Product";
import { HTTPStatus } from "@/server/types/Index";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const search = searchParams.get('search') || ''
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')

        const data = await Product.getAllProduct(search, page, limit)
        return Response.json({data}, {status: HTTPStatus.OK})
    } catch (error) {
        console.log(error, '<<< error prodcuts api')
        const {message, status} = ErrorHandler(error)
        return Response.json({message}, {status})
    }
}