import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FcLike } from 'react-icons/fc'
import { AiOutlineEye } from 'react-icons/ai'
import Output from './Output'

const ViewBlog = ({
    blog,
    isShort = false
}: {
    blog: BlogView,
    isShort?: boolean
}) => {
    return (
        <article className={`flex flex-col ${isShort ? 'w-3/4' : 'w-full'} mx-auto shadow my-2 text-black`}>
            <div className="hover:opacity-75">
                {isShort ? 
                    <Image src={blog.image} alt="Blog Post illustration" width={1000} height={500} />
                    :
                    <Image src={blog.image} alt="Blog Post illustration" width={1500} height={500} />
                }
            </div>
            <div className={`bg-white flex flex-col justify-start ${isShort && 'p-6'}`}>
                {
                    blog.tags.map((tag: string, i: number) => {
                        return (
                            <a href="#" key={i} className="uppercase text-blue-700 text-sm font-bold pb-4">{tag}</a>
                        )
                    })
                }
                {isShort && <a href="#" className="text-3xl font-bold hover:text-gray-700 pb-4">{blog.title}</a>}
                <p className={`text-lg ${!isShort && 'text-right'} pb-3`}>
                    By <a href="#" className="font-semibold hover:text-gray-800">{blog.author}</a>, Published on {blog.createdAt}
                </p>
                {isShort && <a href="#" className="pb-6">{blog.description}...</a>}
                {
                    !isShort && <Output mdString={blog.body} title={blog.title} />
                }
                {isShort && <Link href={`/view/${blog.id}`} className="uppercase text-gray-800 hover:text-black">Continue Reading <i className="fas fa-arrow-right"></i></Link>}
                <div className='flex flex-row gap-2'>
                    <FcLike className='w-6 h-6' />
                    <p>{blog.likes}</p>
                    <AiOutlineEye className='w-6 h-6' />
                    <p>{blog.views}</p>
                </div>
            </div>
        </article>
    )
}

export default ViewBlog
