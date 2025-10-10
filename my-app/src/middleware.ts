import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { BaseError } from "./server/helpers/customErrors";
import { HTTPStatus } from "./server/types/Index";
import * as jose from 'jose'
import { ErrorHandler } from "./server/helpers/errorHandler";

export async function middleware(req: NextRequest) {
    try {
        const api = req.nextUrl.pathname.startsWith('/api')
        const protectedPaths = ['/api/wishlists']

        if(api) {
            if (protectedPaths.includes(req.nextUrl.pathname)) {
                const cookieStore = await cookies()
                const token = cookieStore.get('access_token')
                if(!token) throw new BaseError('Unauhtorized', HTTPStatus.Unauthorized)

                const secret = new TextEncoder().encode('rahasia')
                const jwt = token.value

                const { payload } = await jose.jwtVerify<{_id: string, username: string}>(jwt, secret)

                const requestHeaders = new Headers(req.headers)
                requestHeaders.set('x-user-id', payload._id)
                requestHeaders.set('x-user-username', payload.username)

                const resp = NextResponse.next({
                    request: {
                        headers: requestHeaders,
                    }
                })

                return resp
            }
        }
    } catch (error: unknown) {
        console.log(error, '<<< error middleware')
        const {message, status} = ErrorHandler(error)
        return Response.json({message}, {status})
    }
}