"use client"

import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import { authStyles } from '@/styles/auth.styles'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [register, setRegister] = useState<boolean>(false)
  return (
    <main className="bg-[#0e121e] overflow-x-hidden h-screen">
      <div className="flex flex-col sm:flex-row">
        <div className="basis-1/3 text-center"></div>
        <div className="basis-1/3 text-center mt-20">
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
            Already registered? <a onClick={() => setRegister(!register)} className={authStyles.links}>{!register ? 'Login' : 'Register'}</a>
          </div>
        </div>
        <div className="basis-1/3 text-center"></div>
      </div>
    </main>
  )
}
