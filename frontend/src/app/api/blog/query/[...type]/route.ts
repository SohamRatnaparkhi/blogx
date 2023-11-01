import { NextRequest, NextResponse } from "next/server";
import { allBlogs, getBlog, getMyBlogs } from "../handlers";
import { cookies } from "next/headers";

const request = async (request: NextRequest) => {
    const possibleTypes = ['allBlogs', 'postWithId', 'myPosts'];
    const currentType = request.url.split('/').reverse();
    const type = possibleTypes.includes(currentType[0]) ? currentType[0] : possibleTypes.includes(currentType[1]) ? currentType[1] : "";
    // console.log(currentType)
    // console.log("url = " + request.url + "type = " + type)
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
            let id = request.url.split('/').reverse()[0];
            const cookieStore = cookies()
            if (id == "undefined" || id == "" || id == undefined) {
                console.log("in")
                id = cookieStore.get('last_post')?.value || "";
            }
            console.log("id=" + id)
            const {data, status, statusText} = await getBlog(token, id);
            console.log(data.id)
            cookieStore.set('last_post', data.id, {
                expires: new Date(Date.now() + 3000000),
                path: '/',
            })
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
    else if (type == 'myPosts') {
        try {
            const {data, status, statusText} = await getMyBlogs(token);
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
    else {
        return NextResponse.json({
            error: "Invalid request",
            status: 404
        })
    }
}

export {
    request as GET
}