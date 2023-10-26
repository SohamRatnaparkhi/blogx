"use client";

import React, { useEffect, useState } from 'react'
import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight/lib';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings/lib';
import 'highlight.js/styles/atom-one-dark.css';
// import matter from 'gray-matter'
// import html from 'remark-html'
// import {remark} from 'remark'

const Output = ({ mdString, title }: { mdString: string, title: string }) => {
    const [content, setContent] = useState<string>('<div></div>')
    const [content2, setContent2] = useState<any>(<div></div>)
    useEffect(() => {
        const processMarkdown = async () => {
            // const content = matter(mdString).content
            // const htmlContent = await remark().use(html).process(content)
            // setContent(htmlContent.toString())
            // console.log(htmlContent.toString())

            // -----------------------------  above code is working fine -----------------------------

            const { content, frontmatter } = await compileMDX<{ title: string }>({
                source: mdString,
                options: {
                    parseFrontmatter: true,
                    mdxOptions: {
                        development: true,
                        rehypePlugins: [
                            rehypeHighlight,
                            rehypeSlug,
                            [rehypeAutolinkHeadings, {
                                behavior: 'wrap',
                            }]
                        ],
                    }
                },
            })
            console.log(content, frontmatter)
            setContent2(content)
        }
        processMarkdown()
    }, [mdString])
    return (
        <div className='markdown-body'>
            <div className='my-6 py-5 block w-full h-screen p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 overflow-y-auto'>
                {/* <article dangerouslySetInnerHTML={{ __html: content }}>
            </article> */}
                <article>
                    {content2}
                </article>
            </div>
        </div>
    )
}

export default Output
