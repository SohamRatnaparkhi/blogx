"use client";

import { handleBold, handleBoldItalics, handleHeadings, handleItalics, handlerLinks } from '@/utils/markdown';
import React, { useEffect, useRef, useState } from 'react'
import { BiLink } from 'react-icons/bi';
import { FaBold, FaItalic } from 'react-icons/fa';
import { LuHeading1, LuHeading2, LuHeading3, LuHeading4, LuHeading5, LuHeading6 } from 'react-icons/lu';

const Form = () => {
    const [title, setTitle] = useState<string>('')
    const [caption, setCaption] = useState<string>('')
    const [body, setBody] = useState<string>('')
    const [selected, setSelected] = useState<string>('')
    const textArea = useRef<HTMLTextAreaElement>(null)
    // let cursorStart = textArea.current?.selectionStart || 0;
    // let cursorEnd = textArea.current?.selectionEnd || 0;
    const [cursorStart, setCursorStart] = useState<number>(0)
    const [cursorEnd, setCursorEnd] = useState<number>(0)
    const selectedTextRef = useRef<string>('');

    const styles = {
        "markdownControllers": "border border-[#020617] bg-[#334155] p-2 m-2 rounded-sm"
    }

    useEffect(() => {
        const handleSelection = () => {
            setCursorStart(textArea.current?.selectionStart || 0)
            setCursorEnd(textArea.current?.selectionEnd || 0)
        }
        textArea.current?.addEventListener('select', handleSelection)
        return () => {
            textArea.current?.removeEventListener('select', handleSelection)
        }
    }, [])

    useEffect(() => {
        setSelected(textArea.current?.value.substring(cursorStart, cursorEnd) || '')
    }, [cursorEnd, cursorStart])
    return (
        <div>
            <div>
                <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                <input onChange={(e) => setTitle(e.target.value)} type="text" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <div className="mb-6 py-5">
                <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Caption</label>
                <input onChange={(e) => setCaption(e.target.value)} type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            {/* markdown controllers */}


            <div className={`mb-6 py-5`}>
                <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blog</label>
                <div className='flex flex-row text-lg border bg-[#0f172a] border-[#1e293b] mb-4 justify-between'>
                    <div className={styles.markdownControllers} 
                        onClick={() => {
                            handleBold(setBody, cursorStart, cursorEnd)
                    }}><FaBold /></div>
                    <div className={styles.markdownControllers} 
                        onClick={() => {
                            handleItalics(setBody, cursorStart, cursorEnd)
                    }}><FaItalic /></div>
                    <div className={styles.markdownControllers} 
                        onClick={() => {
                            handleBoldItalics(setBody, cursorStart, cursorEnd)
                    }}><strong><i>BI</i></strong></div>
                    <div className={styles.markdownControllers} 
                        onClick={() => {
                            handleHeadings(setBody, cursorStart, cursorEnd, 1)
                    }}><LuHeading1 /></div>
                    <div className={styles.markdownControllers} 
                        onClick={() => {
                            handleHeadings(setBody, cursorStart, cursorEnd, 2)
                    }}><LuHeading2 /></div>
                    <div className={styles.markdownControllers} 
                        onClick={() => {
                            handleHeadings(setBody, cursorStart, cursorEnd, 3)
                    }}><LuHeading3 /></div>
                    <div className={styles.markdownControllers} 
                        onClick={() => {
                            handleHeadings(setBody, cursorStart, cursorEnd, 4)
                    }}><LuHeading4 /></div>
                    <div className={styles.markdownControllers} 
                        onClick={() => {
                            handleHeadings(setBody, cursorStart, cursorEnd, 5)
                    }}><LuHeading5 /></div>
                    <div className={styles.markdownControllers} 
                        onClick={() => {
                            handleHeadings(setBody, cursorStart, cursorEnd, 6)
                    }}><LuHeading6 /></div>
                    <div className={styles.markdownControllers} 
                        onClick={() => {
                            const link = prompt('Enter link')
                            handlerLinks(setBody, cursorStart, cursorEnd, link || "")
                    }}><BiLink /></div>
                </div>
                <textarea ref={textArea} onChange={(e) => setBody(e.target.value)} value={body} id="large-input" className="block w-full h-screen p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
        </div>
    )
}

export default Form
