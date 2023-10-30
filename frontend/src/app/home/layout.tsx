import Navbar from '@/components/ui/Navbar';
import Sidebar from '@/components/ui/Sidebar';
import SidebarTabs from '@/components/ui/SidebarTabs';
import React from 'react'

const layout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const styles = {
        wrapper:
            "flex justify-center items-center h-screen w-screen bg-[#0f172a] text-white overflow-x-hidden",
        columns:
            "flex justify-between h-screen w-full text-center  text-white gap-0.5",
        leftSide: "hidden lg:inline basis-0 lg:basis-1/4 bg-slate-900 h-full overflow-y-auto",
        rightSide: "hidden w-0  basis-0  lg:inline lg:basis-1/4 bg-slate-900 h-full overflow-y-auto",
        feed: "lg:basis-2/3 basis-full  bg-slate-800 h-full overflow-x-hidden overflow-y-auto px-4 no-scrollbar",
        widgets: "hidden lg:inline lg:basis-1/3 bg-slate-900 h-full overflow-x-hidden overflow-y-auto",
    }
    return (
        <html lang="en">
            <body>
                <div>
                    <Navbar />
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.columns}>
                        <div className={styles.leftSide}>
                            <Sidebar />
                        </div>
                        <div className={styles.feed}>
                            {children}
                        </div>
                        <div className={styles.rightSide}>
                            <SidebarTabs />
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}

export default layout
