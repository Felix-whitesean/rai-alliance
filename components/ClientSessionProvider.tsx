// components/ClientSessionProvider.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import type { Session } from "next-auth";

type Props = {
    children: ReactNode;
    session: Session | null;
};

export default function ClientSessionProvider({ children, session }: Props) {
    return <SessionProvider session={session}>{children}</SessionProvider>;
}
