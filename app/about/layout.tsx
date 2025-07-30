import React, { ReactNode } from 'react'
import {getServerSession, Session} from "next-auth";
import {authOptions} from "@/lib/auth";
import ClientSessionProvider from "@/components/ClientSessionProvider";

const Layout  = async ({children}:{children:ReactNode}) => {
    const session: Session | null = await getServerSession(authOptions);
    return (
        <div>
            <ClientSessionProvider session={session}>
                <div>{children}</div>
            </ClientSessionProvider>
        </div>
    )
}
export default Layout
