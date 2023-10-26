"use client"

import React from 'react'
import Button from '../ui/Button'
import { usePostStore } from '@/app/store/post.store'

const Widgets = () => {
    const postStore = usePostStore()
    const postHtml = postStore.postHtml
    const saveAsDraft = () => {
        // localStorage.setItem('blog', postHtml)
        console.log(localStorage.getItem('blog'))
        console.log('save as draft')
    }
    const publish = () => {
        console.log('publish')
    }
    const sidebarStyles = {
        container: "py-4 px-10 bg-gray-50 rounded-2xl w-3/4 m-auto mt-4",
    };

    return (
        <>
            <div className='flex flex-col justify-center py-4 px-10 bg-[#192734] items-center rounded-2xl w-3/4 mx-auto mt-4'>
                <Button additionalClasses='flex p-2 text-base font-normal text-gray-900 rounded-lg text-white hover:bg-gray-100 hover:bg-gray-700 my-2 w-full text-center' onClick={saveAsDraft} disabled={false}>Draft</Button>
                <br />
                <Button additionalClasses='flex p-2 text-base font-normal text-gray-900 rounded-lg text-white hover:bg-gray-100 hover:bg-gray-700 my-2 w-full text-' onClick={publish} disabled={false}>Publish</Button>
            </div>
        </>
    )
}

export default Widgets
