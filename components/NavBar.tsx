"use client";

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import clsx from 'clsx';
import React from 'react'
// import {Button} from "@/components/ui/button";
import Image from "next/image";
import { BiLogInCircle } from "react-icons/bi";
import {useSession} from "next-auth/react";


const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About us', href: '/about' },
    { name: 'Events', href: '/events' },
    { name: 'Team', href: '/team' },
];


export default function Navbar() {
    const pathname = usePathname();
    const { data: session, status } = useSession();
    return (
        <div className="w-full text-center flex flex-col text-[16px] font-semibold">
            <div className="company fixed left-8 top-4 z-[1]">
                <Link href="/" className="flex flex-row justify-center code text-shadow-[2px_4px_4px_#FFFFFF54] gap-2">
                    <Image src="/logo.png" alt="logo" width={50} height={50} />
                    <h5 className="sm:visible hidden">
                        <span className="text-sec-color">Responsible Artificial <br/> Intelligence </span>
                        <span className="text-prim-color">Alliance</span>
                    </h5>
                    <h6 className="self-center sm:visible hidden text-[24px]">(RAI)</h6>
                </Link>
            </div>
            <nav className="absolute flex flex-row gap-4 bg-[rgb(255,255,255,.4)] px-1 py-1 mt-4 text-[16px] rounded-sm self-center font-[500]">
                {navItems.map(({ name, href }) => {
                    const isActive = pathname === href;

                    return (
                        <Link
                            key={name}
                            href={href}
                            className={clsx(
                                'self-center py-1  transition-all duration-200',
                                isActive
                                    ? 'px-5 bg-[var(--prim-color)] rounded-sm text-white'
                                    : 'px-2'
                            )}
                        >
                            {name}
                        </Link>
                    );
                })}
            </nav>
            {status === "loading" && <p>Loading...</p>}
                <div className="profile absolute self-end mt-4 mr-4 z-[1] flex flex-row gap-4">
                    <div className="rounded-[50%] w-[40px] h-[40px] bg-[var(--prim-color-1)] border-1 border-black p-0.5 self-center flex flex-col" >
                            <div className="w-full h-full rounded-[50%] text-prim-color bg-[var(--sec-color-4)] text-center self-center pt-1 ">
                                {session?.user?.name ? (session.user.name.charAt(0).toUpperCase()) : (
                                    <Link href="/signin">
                                        <BiLogInCircle className="m-auto text-black" size={24}/>
                                    </Link>
                                )}
                            </div>

                    </div>
                    <div className="self-end py-1 text-prim-color bg-transparent">
                        {session?.user?.name ? (
                            <p className="px-1">
                                <span className="italic font-regular text-[0.8rem] text-black">Welcome,<br/></span>
                                <span >{session.user.name}</span>
                            </p>
                        ) : (
                            <p>Sign in</p>
                        )}
                    </div>
                </div>

        </div>
    );
}