"use client";
import React, { useEffect } from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { FaRegListAlt } from 'react-icons/fa'
import { BiMoneyWithdraw } from 'react-icons/bi'
import { AiOutlinePhone } from 'react-icons/ai'
import { usePathname } from 'next/navigation'
import { SidebarOptions, SidebarMap } from '@/constants/sidebar.constants';
import SidebarOption from './SidebarOptions';

const SidebarTabs = () => {
    const possiblePath = usePathname().split("/").reverse()
    const path = "/" + (possiblePath.length > 2 ? possiblePath[1] : possiblePath[0])
    // console.log(possiblePath)
    // console.log(path)
    const { items, routes } = SidebarOptions
    const [selected, setSelected] = React.useState<string>(SidebarMap[path])
    useEffect(() => {
        if (path === "/") {
            setSelected("Home")
        }
        if (path == undefined) {
            setSelected("Home")
        }
    }, [path])
    if (routes.findIndex(item => item === path) === -1) {
        return (
            <div></div>
        )
    }
    const sidebarStyles = {
        container: "py-4 px-10 bg-gray-50 rounded-2xl h-full w-3/4 m-auto mt-4",
        title:
            "text-4xl font-bold py-4 hover:underline cursor-pointer font-normal hover:font-bold",
        option:
            "flex flex-col justify-center items-center py-2 hover:bg-slate-700 cursor-pointer mx-12 rounded-2xl",
        largerscreens: "sticky top-5",
        logout:
            "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded-2xl w-1/2 m-auto mt-10 text-center",
    };
    return (
        <div>
            <div className={sidebarStyles.largerscreens}>
                <div className={sidebarStyles.container} style={{ backgroundColor: "#192734" }}>
                    <hr />

                    <SidebarOption
                        option={items[0]}
                        Icon={FaRegListAlt}
                        isActive={Boolean(selected === items[0])}
                        setSelected={setSelected}
                        redirect={routes[0]}
                    />
                    <SidebarOption
                        option={items[1]}
                        Icon={BiMoneyWithdraw}
                        isActive={Boolean(selected === items[1])}
                        setSelected={setSelected}
                        redirect={routes[1]}
                    />
                    <SidebarOption
                        option={items[2]}
                        Icon={AiOutlineHome}
                        isActive={Boolean(selected === items[2])}
                        setSelected={setSelected}
                        redirect={routes[2]}
                    />
                    <SidebarOption
                        option={items[3]}
                        Icon={AiOutlinePhone}
                        isActive={Boolean(selected === items[3])}
                        setSelected={setSelected}
                        redirect={routes[3]}
                    />
                    <hr />
                </div>
                <div className={sidebarStyles.logout}>Logout</div>
            </div>
        </div>
    )
}

export default SidebarTabs
