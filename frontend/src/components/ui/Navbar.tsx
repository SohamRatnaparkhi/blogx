"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const [color, setColor] = useState("#0e121e");
    const [textColor, setTextColor] = useState("white");

    const asPath = usePathname();
    const page = asPath.split("/")[1];
    const mapping :{
        [key: string]: string;
    } = {
        "": "Home",
        profile: "Profile",
        "user-profile": "Profile",
        bcblogspage: "Blockchain Blogs",
        BlogPage: "Publish Blogs",
        settingsPage: "Settings",
    };

    const handleNav = () => {
        setNav(!nav);
    };

    useEffect(() => {
        const changeColor = () => {
            if (window.scrollY >= 90) {
                setColor("");
                setTextColor("#0e121e");
            } else {
                setColor("");
                setTextColor("#ffffff");
            }
        };
        window.addEventListener("scroll", changeColor);
    }, []);


    return (
        <div
            style={{ backgroundColor: `${color}` }}
            className="sticky top-0 left-0 w-screen ease-in duration-300 bg-[] z-50 py-1 mb-2"
        >
            <div className="max-w-full h-25 bg-[] flex flex-row items-center text-white">
                <div className="basis-1/2 flex flex-row justify-center">
                    <Link href="/" className="sm:basis-5/6 p-4 text-center">
                        <h1
                            style={{ color: `${textColor}` }}
                            className="text-xl sm:text-2xl font-bold hover:underline cursor-pointer  hover:font-bold"
                        >
                            Blog-X
                        </h1>
                    </Link>
                </div>

                <div
                    style={{ color: `${textColor}` }}
                    className="sm:flex w-screen"
                >
                    <div className="text-xl text-center font-bold bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full w-40  sm:basis-1/3 my-2.5 mx-auto justify-center">
                        <Link href="/post" className="hidden lg:inline">Publish a Blog</Link>
                        <Link href="/post" className="inline lg:hidden">Publish Blog</Link>
                    </div>
                </div>
                <div className="hidden sm:flex p-4 basis-1/2 justify-between">
                    <div className="">
                        <div className="cursor-pointer text-xl flex items-center hover:border border-gray-500 rounded-[0.4rem] p-1 group ">
                            {mapping[page]}
                        </div>
                    </div>
                    <div className="cursor-pointer flex items-center hover:border border-gray-500 rounded-[0.4rem] p-1 px-3 mx-4 group">
                        <CiUser className="w-[1.5rem] h-[1.5rem] lg:w-[1.2rem] hover:h-[1.2rem] text-gray-500 " />
                        <MdKeyboardArrowDown className="group-hover:w-[1rem]  group-hover:h-[1rem] text-gray-500" />
                    </div>
                </div>

                {/* Mobile Button */}
                <div onClick={handleNav} className="block px-6 lg:hidden z-10">
                    {nav ? (
                        <AiOutlineClose size={20} style={{ color: `${textColor}` }} />
                    ) : (
                        <AiOutlineMenu size={20} style={{ color: `${textColor}` }} />
                    )}
                </div>
                {/* Mobile Menu */}
                <div
                    className={
                        nav
                            ? "lg:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-[] text-center ease-in duration-300"
                            : "lg:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-[] text-center ease-in duration-300"
                    }
                >
                    <ul>
                        <li
                            onClick={handleNav}
                            className="p-4 text-4xl hover:text-gray-500"
                        >
                            <Link href="/">Home</Link>
                        </li>
                        <li
                            onClick={handleNav}
                            className="p-4 text-4xl hover:text-gray-500"
                        >
                            <Link href="/walletTransfer">Transfer tokens</Link>
                        </li>
                        <li
                            onClick={handleNav}
                            className="p-4 text-4xl hover:text-gray-500"
                        >
                            <Link href="/bcblogspage">Blockchain feed</Link>
                        </li>
                        <li
                            onClick={handleNav}
                            className="p-4 text-4xl hover:text-gray-500"
                        >
                            <Link href="/profile">Profile</Link>
                        </li>
                        {/* <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <div className="flex items-center bg-[#243340] p-2 rounded-3xl">
                <BiSearch className="text-[#8899a6] mr-2" />
                <input
                  placeholder="Search Blog-X"
                  type="text"
                  className="bg-transparent outline-none"
                />
              </div>
            </li> */}
                        <li
                            onClick={handleNav}
                            className="p-4 text-4xl hover:text-gray-500"
                        >
                            <Link href="/contact">Contact Us </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
