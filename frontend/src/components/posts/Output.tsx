"use client";

import React, { useEffect, useState } from 'react'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeHighlight from 'rehype-highlight/lib';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings/lib';
import 'highlight.js/styles/atom-one-dark.css';
import { usePostStore } from '@/app/store/post.store';
import matter from 'gray-matter'
import html from 'remark-html'
import {remark} from 'remark'
import { compileMDX } from 'next-mdx-remote/rsc';

const Output = ({ mdString, title }: { mdString: string, title: string }) => {
    const postStore = usePostStore()
    const setPostHtml = postStore.setPostHtml
    const [content, setContent] = useState<string>('<div></div>')
    const [content3, setContent3] = useState<any>(<div></div>)
    // const [content2, setContent2] = useState<any>(<div></div>)
    useEffect(() => {
        const processMarkdown = async () => {
            const mdContent = matter(mdString).content
            const htmlContent = await remark().use(html).process(mdContent)
            const regex = /<pre><code class="([^"]+)">/g
            const subst = '<pre><code class="hljs $1">'
            const result = htmlContent.toString().replace(regex, subst)
            // console.log(result)
            setContent(result)

            // -----------------------------  above code is working fine -----------------------------


            const { content } = await compileMDX<{ title: string }>({
                source: mdString,
                options: {
                    parseFrontmatter: true,
                    mdxOptions: {
                        development: process.env.NODE_ENV !== 'production',
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
            setContent3(content)
            setPostHtml(result)
            // const {compiledSource, frontmatter} = await serialize({
            //     source: mdString,
            //     options: {
            //         parseFrontmatter: true,
            //         mdxOptions: {
            //             development: false,
            //             rehypePlugins: [
            //                 rehypeHighlight,
            //                 rehypeSlug,
            //                 [rehypeAutolinkHeadings, {
            //                     behavior: 'wrap',
            //                 }]
            //             ],
            //         }
            //     },
            // })
            // setContent2(compiledSource)
        }
        processMarkdown()
    }, [mdString])
    return (
        <div className='markdown-body '>
            <div className='block w-full h-fit max-h-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 overflow-y-auto'>
                {/* <article className='text-xl'>
                    <h1 className='text-3xl font-bold'>{title}</h1>
                    <div className='prose max-w-none' dangerouslySetInnerHTML={{ __html: content }}></div>
                </article> */}
                <article>
                    {content3}
                </article>
            </div>
        </div>
    )
}

export default Output
