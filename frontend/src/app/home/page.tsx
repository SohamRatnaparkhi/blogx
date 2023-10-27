import axios from 'axios'
import React from 'react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Output from '@/components/posts/Output'

const Feed = async () => {
  const cookieStore = cookies()
  const token = cookieStore.get('auth_token')?.value
  const { data } = await axios.get('http://localhost:3000/api/blog/query/allBlogs', {
    headers: {
      'Authorization': token,
    },
  })
  // console.log(data.blog)
  const parseBlogBody = (body: string) => {
    const blogBody = JSON.parse(body)
    return blogBody
  }
  const blogs: { [key: string]: { title: string, body: any, description?: any } } = {};
  data.blog?.forEach((blog: any, i: number) => {
    const body = blog.body
    blogs[blog.id] = {
      title: blog.title,
      body: parseBlogBody(body).mdx,
      description: parseBlogBody(body).description,
    }
  })
  return (
    <div>
      {
        //display blogs
        Object.keys(blogs).map((key: string, i: number) => {
          return (
            <div key={i}>
              <Link href={`/blog/${key}`}>
                <h1>{blogs[key].title}</h1>
              </Link>
              <div className='text-left' key={i}>
                <p>{blogs[key].description}</p>
                <Output mdString={blogs[key].body} title={blogs[key].title} />
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Feed
