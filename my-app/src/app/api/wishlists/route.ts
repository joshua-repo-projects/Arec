import { ErrorHandler } from "@/server/helpers/errorHandler";
import { verifyToken } from "@/server/helpers/jwt";
import Wishlist from "@/server/models/Wishlist";
import { HTTPStatus } from "@/server/types/Index";
import { NextRequest } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get('access_token')?.value
        if (!token) {
            return Response.json({ message: "Unauthorized" }, { status: HTTPStatus.Unauthorized });
        }

        const decoded = verifyToken(token)
        const userId = decoded._id
        const body = await req.json()
        const payload = {...body, userId}
        const message = await Wishlist.createWishlist(payload)
        return Response.json({message}, {status: HTTPStatus.Created})
    } catch (error) {
        console.log(error, 'wishlist error')
        const {message, status} = ErrorHandler(error)
        return Response.json({message}, {status})
    }
}

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('access_token')?.value
        if (!token) {
            return Response.json({ message: "Unauthorized" }, { status: HTTPStatus.Unauthorized });
        }
        const decoded = verifyToken(token)
        const userId = decoded._id
        const data = await Wishlist.getWishlistById(userId)
        return Response.json({data}, {status: HTTPStatus.OK})
    } catch (error) {
        console.log(error, '<<< error get wishlist')
        const {message, status} = ErrorHandler(error)
        return Response.json({message}, {status})
    }
}