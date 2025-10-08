import { ErrorHandler } from "@/server/helpers/errorHandler"
import User from "@/server/models/User"
import { HTTPStatus } from "@/server/types/Index"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const message = await User.register(body)
        return Response.json({message}, {status: HTTPStatus.Created})
    } catch (error: unknown) {
        console.log(error, '<< error register api')
        const {message, status} = ErrorHandler(error)
        return Response.json({message}, {status})
    }
}