"use client"

import React from 'react'
import Button from '../ui/Button'
import { usePostStore } from '@/app/store/post.store'
import axios from 'axios'

const Widgets = () => {
    const postStore = usePostStore()
    const postMdx = postStore.postMdx
    const postTitle = postStore.postTitle
    const postDescription = postStore.postDescription
    const postTags = postStore.postTags
    const saveAsDraft = () => {
        localStorage.setItem('blog', postMdx)
        console.log(localStorage.getItem('blog'))
        console.log('save as draft')
    }
    const reqBody: AddBlog = {
        title: postTitle,
        body: JSON.stringify({
            mdx: postMdx,
            description: postDescription,
        }),
        tags: postTags,
    }
    const publish = async () => {
        const {data} = await axios.post('/api/blog/mutate/addBlog', reqBody, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            },
        })
        console.log(data)
        if (data.status < 400) {
            alert("Published successfully")
        } else {
            alert("Publish failed")
        }
    }

    return (
        <>
            <div className='flex flex-col justify-center py-4 px-10 bg-[#192734] items-center rounded-2xl w-3/4 mx-auto mt-4'>
                <Button additionalClasses='flex p-2 text-base font-normal text-gray-900 rounded-lg text-white hover:bg-gray-100 hover:bg-gray-700 my-2 w-full text-center' onClick={saveAsDraft} disabled={postTitle == ''}>Draft</Button>
                <br />
                <Button additionalClasses='flex p-2 text-base font-normal text-gray-900 rounded-lg text-white hover:bg-gray-100 hover:bg-gray-700 my-2 w-full text-' onClick={publish} disabled={postTitle == ''}>Publish</Button>
            </div>
        </>
    )
}

export default Widgets
