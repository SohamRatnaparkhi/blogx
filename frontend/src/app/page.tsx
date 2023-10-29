"use client"

import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [register, setRegister] = useState<boolean>(false)
  console.log(register)
  return (
    <main className="bg-[#0e121e] overflow-x-hidden h-screen">
      <div className="flex flex-col sm:flex-row">
        <div className="basis-1/4 text-center"></div>
        <div className="basis-1/2 text-center mt-20">
          <div className="text-3xl font-bold hover:underline-offset-4 hover:text-4xl hover:pb-8 pb-5 my-auto">
            <Image
              src="/blogx.png"
              className="mx-auto"
              alt="Blog-X"
              width={500}
              height={500}
            />
          </div>
          <div className="">
            {register ? <Login /> : <Register />}
          </div>
          <div className="py-4 px-2 bg-[#fff3cd] text-black mt-8 mx-4 rounded-3xl">
            Already registered? <pre onClick={() => {{
              console.log("abcd")
              setRegister(!register)
            }
            }} className='text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-500 cursor-pointer'>{!register ? 'Login' : 'Register'}</pre>
          </div>
        </div>
        <div className="basis-1/4 text-center"></div>
      </div>
    </main>
  )
}
