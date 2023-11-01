import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail, getUserById } from "./handler";

const request = async (request: NextRequest) => {
    const reqType = request.url.split('/').reverse()[1];
    const identifier = request.url.split('/').reverse()[0];
    const token = request.headers.get('Authorization') || '';
    if (reqType === 'user') {
        try {
            const { data, status, statusText } = await getUserById(token);
            if (status < 400) {
                return NextResponse.json({
                    user: data,
                    status: status
                })
            } else {
                return NextResponse.json({
                    error: statusText,
                    status: status
                })
            }
        } catch (error) {
            return NextResponse.json({
                error: error,
                status: 404
            })
        }
    } else if (reqType == 'email') {
        try {
            const { data, status, statusText } = await getUserByEmail(identifier, token);
            if (status < 400) {
                return NextResponse.json({
                    user: data,
                    status: status
                })
            } else {
                return NextResponse.json({
                    error: statusText,
                    status: status
                })
            }
        } catch (error) {
            return NextResponse.json({
                error: error,
                status: 404
            })
        }
    }
}

export {
    request as GET
}
