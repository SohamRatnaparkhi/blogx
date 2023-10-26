"use client";

import React, { useEffect, useState } from 'react'
import matter from 'gray-matter'
import html from 'remark-html'
import {remark} from 'remark'

const Output = ({ mdString, title }: { mdString: string, title: string }) => {
    const [content, setContent] = useState<string>('<div></div>')
    useEffect(() => {
        const processMarkdown = async () => {
            const content = matter(mdString).content
            const htmlContent = await remark().use(html).process(content)
            setContent(htmlContent.toString())
            console.log(htmlContent.toString())
        }
        processMarkdown()
    }, [mdString])
    return (
        <div className='my-6 py-5 block w-full h-screen p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 overflow-y-auto'>
            <article dangerouslySetInnerHTML={{ __html: content }}>
            </article>
        </div>
    )
}

export default Output
