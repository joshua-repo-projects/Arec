import Wishlist from "@/server/models/Wishlist";
import { NextRequest } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const message = await Wishlist.createWishlist(body)
        return Response.json({message}, {status: 201})
    } catch (error) {
        console.log(error, 'wishlist error')
    }
}