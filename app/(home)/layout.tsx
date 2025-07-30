import React, { ReactNode } from 'react'
import {getServerSession, Session} from "next-auth";
import {authOptions} from "@/lib/auth";
import ClientSessionProvider from '@/components/ClientSessionProvider';

const Layout = async ({children}:{children:ReactNode}) => {
    const session: Session | null = await getServerSession(authOptions);
    return (
        <main className=" flex flex-1 flex-col min-h-screen">
            <ClientSessionProvider session={session}>
                <div className="h-screen w-full"> {children}</div>
            </ClientSessionProvider>
        </main>
    );
}

export default Layout;
