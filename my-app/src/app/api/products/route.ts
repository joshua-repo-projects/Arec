import { ErrorHandler } from "@/server/helpers/errorHandler";
import Product from "@/server/models/Product";
import { HTTPStatus } from "@/server/types/Index";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const search = searchParams.get('search')

        let data

        if(search) {
            data = await Product.searchProduct(search)
        } else {
            data = await Product.getAllProduct()
        }
        return Response.json({data}, {status: HTTPStatus.OK})
    } catch (error) {
        console.log(error, '<<< error prodcuts api')
        const {message, status} = ErrorHandler(error)
        return Response.json({message}, {status})
    }
}