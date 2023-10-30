import axios from 'axios'
import React from 'react'
import { cookies } from 'next/headers'
import ViewBlog from '@/components/posts/ViewBlog'

const PersonalFeed = async () => {
  const cookieStore = cookies()
  const token = cookieStore.get('auth_token')?.value
  const serverUrl = process.env.NEXT_JS_SERVER_URL
  const { data } = await axios.get(serverUrl + '/api/blog/query/myPosts', {
    headers: {
      'Authorization': token,
    },
  })
  const parseBlogBody = (body: string) => {
    try {
      const blogBody = JSON.parse(body)
      return blogBody
    } catch (error) {
      return {

      }
    }
  }
  const blogs: { [key: string]: BlogView } = {};
  data.blog?.forEach((blog: any, i: number) => {
    const body = blog.body
    const parsedBlog = parseBlogBody(body)
    if (parsedBlog.mdx == undefined || parsedBlog.mdx == null || parsedBlog.mdx == '') {
      return
    }
    blogs[blog.id] = {
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
  })
  return (
    <div className="flex flex-col items-center py-12">
      <a className="font-bold text-white-800 uppercase hover:text-white-700 text-5xl" href="#">
        My Posts
      </a>
    <div className='container mx-auto flex flex-wrap my-5 w-full h-fit max-h-1/3 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 overflow-y-auto'>
      <section className='w-full flex flex-col items-center'>
        {
          //display blogs
          Object.keys(blogs).map((key: string, i: number) => {
            return (
              <ViewBlog key={i} blog={blogs[key]} isShort={true} />
            )
          })
        }
      </section>
    </div>
    </div>
  )
}

export default PersonalFeed
