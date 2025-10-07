import User from "@/server/models/User"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        console.log(body, '<<< body')
        const message = await User.register(body)
        return Response.json({message}, {status: 201})
    } catch (error: unknown) {
        console.log(error, '<< error')
    }
}