import { NextRequest, NextResponse } from "next/server";
import { login, register } from "../handler";
import { cookies } from 'next/headers'

const request = async (request: NextRequest) => {
    const authType = request.url.split('/').reverse()[0];
    const body = await request.json();
    if (authType == 'login') {
        try {
            const {data, status, statusText} = await login(body)
            const cookieStore = cookies()
            cookieStore.set('auth_token', data.token, {
                expires: new Date(Date.now() + 3000000),
                path: '/',
            })
            if (status - 400 < 0) {
                return NextResponse.json({
                    user: data,
                    status: status
                })
            }
            return NextResponse.json({
                error: statusText,
                status: status
            })
        } catch (error) {
            return NextResponse.json({
                error: error,
                status: 404
            })
        }
    } else if (authType == 'register') {
        try {
            const { data, status, statusText } = await register(body)
            if (status - 400 < 0) {
                return NextResponse.json({
                    user: data,
                    status: status
                })
            }
            return NextResponse.json({
                error: statusText,
                status: status
            })
        } catch (error) {
            return NextResponse.json({
                error: error,
                status: 404
            })
        }
    }
}

export {
    request as POST
}