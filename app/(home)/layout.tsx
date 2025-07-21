import React, { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import type { Session } from "next-auth"


const Layout = async ({children}:{children:ReactNode}) => {
    const session: Session | null = await getServerSession(authOptions)
    if (!session) {
        redirect("/signin")
    }
    else {
        // console.log(session.user.id ? "User ID:" + session.user.id : "No user ID")
        return (
            <main className=" flex flex-1 flex-col min-h-screenbg-green-800">
                <div className=""> {children}</div>
            </main>
        );
    }
}

export default Layout;

