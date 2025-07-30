import Link from 'next/link';
import React from 'react'
import { MdOutlinePhoneInTalk, MdOutlineMail } from "react-icons/md";
import {FaLinkedin, FaTiktok} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";




const Footer = () => {
    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'About us', href: '/about' },
        { name: 'Events', href: '/events' },
        { name: 'Team', href: '/team' },
    ];
    const contacts = [
        {name: '+254-717-999-616', href: 'tel:+254717999616', icon: <MdOutlinePhoneInTalk size={24}/> },
        {name: 'rai-alliance.org' , href: "mailto:rai-alliance.org", icon: <MdOutlineMail size={24} />}
    ];
    const social_media = [
        {name: "RAI-ALLIANCE", href: "https://linkedin.com/company/rai-alliance", icon: <FaLinkedin size={22} color="#0077B5" /> },
        {name: "@raialliance", href:"https://tiktok.com/@raialliance", icon: <FaTiktok size={24}/>},
        {name:  "@alliance77316", href:"https://x.com/@alliance77316", icon: <FaXTwitter size={24}/>}
    ];
    return (

        <div className="h=[70%] w-full bg-[var(--sec-color)] p-12">
            <div className="text-background flex flex-row justify-between flex-wrap gap-4">
                <div className="">
                    <h3 className="uppercase text-[1.1rem] font-bold">NAVIGATION</h3>
                    <nav className="flex flex-col gap-2 text-[0.9rem]">
                        {navItems.map((item) => (
                            <Link key={item.name} href={item.href} >{item.name}</Link>
                            ))}

                    </nav>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="uppercase text-[1.1rem] font-bold">Talk to us</h3>
                    <div className="contact flex flex-col gap-2">
                        {contacts.map((contact) => (
                            <Link href={contact.href} key={contact.name} className="text-[0.9rem] flex flex-row gap-2">
                                <span>{contact.icon}</span>
                                <span>{contact.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="uppercase text-[1.1rem] font-bold">Find us at:</h3>
                    <div className=" flex  flex-col gap-2">
                        {social_media.map((contact) => (
                            <a href={contact.href} key={contact.name} className="text-[0.9rem] flex flex-row gap-4">
                                <span>{contact.icon}</span>
                                <span>{contact.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="text-background text-center p-4 pb-0">
                <hr/>
                <h4 className="p-2 uppercase font-bold text-[0.9rem]">© RAIALLIANCE2025</h4>
                <p>All rights reserved</p>
                <h6 className="text-[0.7rem] font-semibold"> Made with ❤ by RAI-ALLIANCE</h6>
            </div>
        </div>

    )
}
export default Footer
