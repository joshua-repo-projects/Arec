import User from "@/server/models/User";
import { NextRequest } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const token = await User.login(body)
        return Response.json({token}, {status: 200})
    } catch (error) {
        console.log(error, '<<< login api')
    }
}