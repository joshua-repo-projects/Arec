import { ErrorHandler } from "@/server/helpers/errorHandler";
import User from "@/server/models/User";
import { HTTPStatus } from "@/server/types/Index";
import { NextRequest } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const token = await User.login(body)
        return Response.json({token}, {status: HTTPStatus.OK})
    } catch (error) {
        console.log(error, '<<< login api')
        const {message, status} = ErrorHandler(error)
        return Response.json({message}, {status})
    }
}