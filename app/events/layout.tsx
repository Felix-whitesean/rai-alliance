import React, { ReactNode } from 'react'

const Layout = async ({children}:{children:ReactNode}) => {
    return (
        <main className="min-h-screen bg-[#DCDCDC]">
            <div className=""> {children}</div>
        </main>
    );
}

export default Layout;

