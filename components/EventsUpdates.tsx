import React from 'react'
import Title from "@/components/Title";
import { MdOutlineEventRepeat, MdOutlineMail} from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { FaLinkedin } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";



import {Button} from "@/components/ui/button";
import Link from "next/link";


const EventsUpdates = () => {
    return (
        <div>
            <div className="bg-background w-full sm:p-16 p-4 sm:pt-48 pt-64">
                <div className="w-fit">
                    <Title heading="Next in Line" icon={<MdOutlineEventRepeat size={24} />} primaryBg="#D9D9D9" secondaryBg="#D5C1D5" />
                </div>
                <div className="event w-full flex lg:flex-row flex-col gap-16 justify-between items-center py-32 mt-8 lg:px-24">
                    <div className="carousel w-[300px] h-fit relative">
                        <div className="w-full relative bg-background border-2 border-[#1E1E1E3B] z-11 px-8 py-4 rounded-[30px] flex flex-col gap-8 ">
                            <div className="title flex flex-col gap-4">
                                <h3 className="font-semibold text-[0.9rem] text-prim-color ">Monthly update</h3>
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-black font-semibold text-[1.525rem]">Monday, 16 June</h2>
                                    <h6 className="font-semibold text-[0.9rem] text-[#1E1E1EAD]">From 09:00 to 1500, EAT</h6>
                                </div>
                            </div>
                            <div className="theme">
                                <p className="italic text-[1rem]">Walking the dark ages of AI, machine learning, a journey to be in</p>
                            </div>
                            <Button className="bg-[var(--prim-color)] text-background rounded-[24px] py-6 self-center w-fit px-4 text-[1rem] flex flex-row gap-2">
                                <span><LuCalendarDays size={24}  className=""/></span>
                                <span>Save the date</span>
                            </Button>
                        </div>
                    </div>
                    <div className="lg:mr-16">
                        <div className="section_hero flex flex-col gap-8">
                            <div className="section_heading gap-2 flex flex-col">
                                <div className="section_title flex flex-row gap-4">
                                    <h3 className="text-foreground font-bold text-[1.2rem] max-w-64 overflow-x-hidden truncate">John Kiriamiti Kiambiti OleNguyani</h3>
                                    <div className="bg-foreground text-background p-1 rounded-sm text-[0.75rem] self-center">KE</div>
                                </div>
                                <div className="icons flex flex-row gap-2">
                                    <Link href="/">
                                        <FaLinkedin size={22} color="#0077B5" />
                                    </Link>
                                    <Link href="/">
                                        <MdOutlineMail size={22} />
                                    </Link>
                                </div>
                                <Link href="/" className="association bg-[#D9D9D9] text-[#666666] font-medium px-2 py-1 max-w-64 overflow-x-hidden truncate">
                                    <span className="text-prim-color font-medium">Founder,</span> Responsible artificial intelligence Alliance</Link>
                            </div>

                            {/*middle*/}
                            <div className="middle flex flex-row gap-2 self-center">
                                <div className="self-center"><CiLocationOn size={18} color="#40078A"/></div>
                                <p>Spur mall, <br/>Thika road</p>
                            </div>

                            <Button className="text-prim-color bg-background rounded-[24px] border-2 border-[var(--primary-color)] py-6 self-center w-fit px-8 text-[1rem]">Confirm attendance</Button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
export default EventsUpdates
