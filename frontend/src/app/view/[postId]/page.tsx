import Output from '@/components/posts/Output'
import axios from 'axios'
import { cookies } from 'next/headers'
import React from 'react'

const ViewBlog = async ({ params }: {
    params: {
        postId: string
    }
}) => {
    const cookieStore = cookies()
    const token = cookieStore.get('auth_token')?.value
    const serverUrl = process.env.NEXT_JS_SERVER_URL
    const { data } = await axios.get(serverUrl + '/api/blog/query/postWithId/' + params.postId, {
        headers: {
            'Authorization': token,
        },
    })
    // console.log(data)
    const parseBlogBody = (body: string) => {
        try {
            const blogBody = JSON.parse(body)
            return blogBody
        } catch (error) {
            return {
                
            }
        }
    }

    const { blog } = data
    const parsedBlog: { [key: string]: { title: string, body: any, description?: any } } = {};
    const body = blog.body
    parsedBlog[blog.id] = {
        title: blog.title,
        body: parseBlogBody(body).mdx,
        description: parseBlogBody(body).description,
    }
    return (
        <div>
            <div>
                <h1>{parsedBlog[blog.id].title}</h1>
                <div className='text-left text-lg'>
                    <p>{parsedBlog[blog.id].description}</p>
                    <Output mdString={parsedBlog[blog.id].body} title={parsedBlog[blog.id].title} />
                </div>
            </div>
        </div>
    )
}

export default ViewBlog
