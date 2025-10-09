import { ErrorHandler } from "@/server/helpers/errorHandler";
import Wishlist from "@/server/models/Wishlist";
import { HTTPStatus } from "@/server/types/Index";
import { NextRequest } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const message = await Wishlist.createWishlist(body)
        return Response.json({message}, {status: HTTPStatus.Created})
    } catch (error) {
        console.log(error, 'wishlist error')
        const {message, status} = ErrorHandler(error)
        return Response.json({message}, {status})
    }
}

export async function GET(req: NextRequest) {
    try {
        const data = await Wishlist.getAllWishtlists()
        return Response.json({data}, {status: HTTPStatus.OK})
    } catch (error) {
        console.log(error, '<<< error get wishlist')
        const {message, status} = ErrorHandler(error)
        return Response.json({message}, {status})
    }
}