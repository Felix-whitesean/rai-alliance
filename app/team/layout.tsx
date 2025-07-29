import React, { ReactNode } from 'react'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import type { Session } from "next-auth"
import ClientSessionProvider from "@/components/ClientSessionProvider";

const Layout = async ({children}:{children:ReactNode}) => {
    const session: Session | null = await getServerSession(authOptions);
    if (!session) {
        console.log("No session");
    }
    else {
        console.log(session.user ? "User ID:" + session.user.name : "No user ID")
    }
    return (
        <main className=" flex flex-1 flex-col min-h-screen">
            <ClientSessionProvider session={session}>
                <div className=""> {children}</div>
            </ClientSessionProvider>
        </main>
    );
}

export default Layout;
