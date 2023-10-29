"use client";
import React, { useState } from 'react'
import Button from '../ui/Button';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Login = () => {
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const router = useRouter();
    const styles = {
        textFields: "bg-gray-50 border border-gray-300 text-white-600 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white-600 dark:focus:ring-blue-500 dark:focus:border-blue-500",

        buttons: "w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800",

        links: "text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-500 cursor-pointer",
    }

    const Login = async () => {
        const { data } = await axios.post('/api/auth/login', { email, password });
        if (data?.status < 400) {
            console.log(data)
            alert("Login successful");
            localStorage.setItem('token', data.user.token);
            router.push('/home');
        }
        else {
            alert("Login failed");
        }
    };
    return (
        <div className='mx-auto'>
            <div className="flex flex-col items-center px-6 mx-auto lg:py-0">
                <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login your account
                        </h1>
                        <div className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className={styles.textFields} placeholder="email address" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className={styles.textFields} />
                            </div>
                            <Button onClick={Login} disabled={email == "" && password == ""} additionalClasses='focus:ring-4 focus:outline-none focus:ring-primary-300 border-[#172554]'>
                                Login
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
