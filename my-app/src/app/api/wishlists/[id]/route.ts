import { ErrorHandler } from "@/server/helpers/errorHandler";
import Wishlist from "@/server/models/Wishlist";
import { HTTPStatus } from "@/server/types/Index";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest, {params} : {params: Promise<{id: string}>}) {
    try {
        const {id} = await params
        const resp = await Wishlist.deleteWishlist(id)
        if (!resp) {
            return Response.json({message: 'Wishlist not found'}, {status: HTTPStatus.NotFound})
        }
        return Response.json({resp}, {status: HTTPStatus.OK})
    } catch (error) {
        console.log(error, '<< error api delete wishlist')
        const {message, status} = ErrorHandler(error)
        return Response.json({message}, {status})
    }
}