"use client";

import { handleBold, handleBoldItalics, handleCodeBlock, handleHeadings, handleHighlight, handleItalics, handleNewLine, handlerLinks } from '@/utils/markdown';
import React, { use, useEffect, useRef, useState } from 'react'
import { BiLink } from 'react-icons/bi';
import { FaBold, FaItalic } from 'react-icons/fa';
import { LuHeading1, LuHeading2, LuHeading3, LuHeading4, LuHeading5, LuHeading6 } from 'react-icons/lu';
import Output from './Output';
import Toggle from '../ui/Toggle';
import { AiOutlineEnter } from 'react-icons/ai';
import { usePostStore } from '@/app/store/post.store';

const Form = () => {
    const postStore = usePostStore()
    const setPostMdx = postStore.setPostMdx
    const setPostTitle = postStore.setPostTitle
    const setPostDescription = postStore.setPostDescription
    const [editorOn, setEditorOn] = useState<boolean>(true)
    const [title, setTitle] = useState<string>('')
    const [body, setBody] = useState<string>('')
    const [selected, setSelected] = useState<string>('')
    const [cursorStart, setCursorStart] = useState<number>(0)
    const [cursorEnd, setCursorEnd] = useState<number>(0)
    const textArea = useRef<HTMLTextAreaElement>(null)
    const styles = {
        "markdownControllers": "border border-[#020617] bg-[#334155] p-2 m-2 rounded-sm"
    }

    useEffect(() => {
        const unloadCallback = (event: any) => {
            event.preventDefault();
            event.returnValue = "";
            return "";
        };

        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);
    }, []);

    const handleSelectionChange = () => {
        const selectedText = textArea.current?.value.substring(
            textArea.current?.selectionStart,
            textArea.current?.selectionEnd
        );
        setCursorStart(textArea.current?.selectionStart || 0)
        setCursorEnd(textArea.current?.selectionEnd || 0)
        setSelected(selectedText || "");
    };

    useEffect(() => {
        setPostMdx(body)
    }, [body, setPostMdx])

    return (
        <div>
            <div>
                <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                <input onChange={(e) => setPostTitle(e.target.value)} type="text" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <div className="mb-6 py-5">
                <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <input onChange={(e) => setPostDescription(e.target.value)} type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
                    <img className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0" src="/images/users/bonnie-green-2x.png" alt="Profile picture" />
                    <div>
                        <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">Banner image</h3>
                        <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                            JPG, GIF or PNG. Max size of 800K
                        </div>
                        <div className="flex items-center space-x-4">
                            <button type="button" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                <svg className="w-4 h-4 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"></path><path d="M9 13h2v5a1 1 0 11-2 0v-5z"></path></svg>
                                Upload picture
                            </button>
                            <button type="button" className="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Toggle onText="Editor" offText='Output' setOnState={setEditorOn} onState={editorOn} />

            {editorOn ? <div className={`mb-6 py-5`}>
                <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blog</label>
                <div className='flex flex-row text-lg border bg-[#0f172a] border-[#1e293b] mb-4 justify-between'>
                    <div className={styles.markdownControllers}
                        onClick={() => {
                            console.log(window.getSelection())
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
                    <div className={styles.markdownControllers}
                        onClick={() => {
                            handleCodeBlock(setBody, cursorStart, cursorEnd)
                        }}>{"{}"}</div>
                    <div className={styles.markdownControllers}
                        onClick={() => {
                            handleHighlight(setBody, cursorStart, cursorEnd)
                        }}>{"``"}</div>
                    <div className={styles.markdownControllers}
                        onClick={() => {
                            handleNewLine(setBody, cursorStart)
                        }}><AiOutlineEnter /></div>
                </div>
                    <textarea ref={textArea} onSelect={handleSelectionChange} onChange={(e) => setBody(e.target.value)} value={body} id="large-input" className="block w-full h-screen p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div> : <Output title={title} mdString={body} />}
        </div>
    )
}

export default Form
