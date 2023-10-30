import Output from '@/components/posts/Output'
import ViewBlog from '@/components/posts/ViewBlog'
import axios from 'axios'
import { cookies } from 'next/headers'
import React from 'react'

const FullViewBlog = async ({ params }: {
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
    const blogs: { [key: string]: BlogView } = {};
    const body = blog?.body
    const parsedBlog = parseBlogBody(body)
    if (parsedBlog.mdx == undefined || parsedBlog.mdx == null || parsedBlog.mdx == '') {
        return
    }
    parsedBlog[blog.id] = {
        title: blog.title,
        body: parsedBlog.mdx,
        description: parsedBlog.description,
        image: parsedBlog.image || '/blog_default_banner.jpg',
        id: blog.id,
        likes: blog.likes,
        createdAt: new Date(blog.created_at?.split(" ")[0]).toDateString(),
        tags: blog.tags,
        views: blog.views,
        author: blog.author_id,
    }
    return (
        <div>
            <div>
                <div className="flex flex-col items-center py-12">
                    <a className="font-bold text-white-800 uppercase hover:text-white-700 text-5xl" href="#">
                        {parsedBlog[blog.id].title}
                    </a>
                    <p className="text-lg pt-5 mt-2 text-white-600">
                        {parsedBlog[blog.id].description}
                    </p>
                </div>
                <ViewBlog blog={parsedBlog[blog.id]} />
            </div>
        </div>
    )
}

export default FullViewBlog
