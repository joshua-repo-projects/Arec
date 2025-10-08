import User from "@/server/models/User"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        console.log(body, '<<< body')
        const message = await User.register(body)
        return Response.json({message}, {status: 201})
    } catch (error: unknown) {
        console.log(error, '<< error')
    }
}