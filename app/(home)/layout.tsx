import React, { ReactNode } from 'react'

const Layout = async ({children}:{children:ReactNode}) => {
    return (
        <main className=" flex flex-1 flex-col min-h-screen">
            <div className="h-screen w-full"> {children}</div>
        </main>
    );
}

export default Layout;
