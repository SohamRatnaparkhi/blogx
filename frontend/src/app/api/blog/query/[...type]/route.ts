import { NextRequest, NextResponse } from "next/server";
import { allBlogs, getBlog } from "../handlers";

const request = async (request: NextRequest) => {
    const possibleTypes = ['allBlogs', 'postWithId'];
    const currentType = request.url.split('/').reverse();
    const type = possibleTypes.includes(currentType[0]) ? currentType[0] : possibleTypes.includes(currentType[1]) ? currentType[1] : "";
    // console.log("url = " + request.nextUrl + "figma = " + type)
    const token = request.headers.get('Authorization') || '';
    if (type == 'allBlogs') {
        try {
            const {data, status, statusText} = await allBlogs(token);
            // console.log(data)
            if (status - 400 < 0) {
                return NextResponse.json({
                    blog: data,
                    status: status
                })
            } else {
                return NextResponse.json({
                    error: statusText,
                    status: status
                })
            }
        } catch (error) {
            console.log(error)
            return NextResponse.json({
                error: error,
                status: 404
            })
        }
    }
    else if (type == 'postWithId') {
        try {
            const id = request.url.split('/').reverse()[0];
            const {data, status, statusText} = await getBlog(token, id);
            // console.log(data)
            if (status - 400 < 0) {
                return NextResponse.json({
                    blog: data,
                    status: status
                })
            } else {
                return NextResponse.json({
                    error: statusText,
                    status: status
                })
            }
        } catch (error) {
            console.log(error)
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