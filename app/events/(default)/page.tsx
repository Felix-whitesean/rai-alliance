"use client";

import React, {useEffect, useState} from "react";
import Navbar from "@/components/NavBar";
import Title from "@/components/Title";
import { GoShield } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import EventsUpdates from "@/components/EventsUpdates";
import Subscription from "@/components/Subscription";
import type {EventRow} from "@/constants";
import {FaLinkedin} from "react-icons/fa";
import Footer from "@/components/Footer";

const Page = () => {
    const [events, setEvents] = useState<EventRow[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        fetch("/api/events")
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .finally(() => setLoading(false));
    }, []);
    return (
        <div className="bg-[#DCDCDC] p-2 sm:p-4 pb-4">
            <Navbar />
            <div className="w-full sm:p-8 p-0 sm:pt-32 pt-16">
                <div className="bg_container relative w-full h-full">
                    <div className=""></div>
                    <div className="">
                        <div className="bg-[#FFFFFF4D] w-full h-fit rounded-t-md sm:p-8 z-11 p-4">
                            <div className="flex flex-col sm:flex-row justify-between">
                                <div className="w-fit">
                                    <Title heading="Did you miss this?" icon={<GoShield size={24}/>} primaryBg="#FFFFFF" secondaryBg="#D5C1DC" />
                                </div>
                                <div className=" self-center sm:self-end">
                                    <div className="flex flex-col gap-2">
                                        <Image src="/events_image.png" alt="Robot" width={148} height={130} className="self-center"/>
                                        <Image src="/sticker.png" alt="Sticker" width={100} height={90} className="self-center"/>
                                    </div>
                                </div>
                            </div>

                            {/*Event recap*/}
                            { loading  ? ( <div>Loading recent events ...</div>)
                            :(
                                events.map((event) => {
                                    const validDate = new Date(event.event_date);
                                    const formattedDate = validDate.toLocaleDateString("en-GB", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    });
                                    return(
                                        <div key={event.event_id} style={{ backgroundImage: `url("`+event.path+ `")`, backgroundSize: "100% 100%" }} className={ (event.displayed == "0") ? "hidden" :"rounded-lg mx-auto my-4 sm:w-[350px] w-[80%]"}>
                                            <div className=" flex flex-col gap-24 text-white bg-linear-[90deg,#000000D6,#666666D6] p-4 rounded-lg">
                                                <div className="flex flex-col gap-2">
                                                    <div className="indicator w-[25px] h-[25px] rounded-full bg-[#00000040] m-auto p-1">
                                                        <div className=" w-full h-full bg-white rounded-full"></div>
                                                    </div>
                                                    <h3 className="title font-bold text-[1.725rem]">{formattedDate}</h3>
                                                </div>
                                                <div className="links w-full flex flex-col gap-4">
                                                    {/*<Link href="" className="flex flex-row w-full justify-between sm:px-12 px-2">*/}
                                                    {/*    <span className="text-shadow-[0_4px_4px_black] uppercase">feedback</span>*/}
                                                    {/*    <span className="self-center"><FaArrowRightLong /></span>*/}
                                                    {/*</Link>*/}
                                                    <hr className="text-white"/>
                                                    <Link href={ event.recording ? event.recording : "" } className="flex flex-row w-full justify-between sm:px-12 px-2">
                                                        <span className="text-shadow-[0_4px_4px_black] uppercase">recording</span>
                                                        <span className="self-center"><FaArrowRightLong /></span>
                                                    </Link>
                                                    <hr className="text-white"/>
                                                    <Link href={event.presentation_slides ? event.presentation_slides : ""} className="flex flex-row w-full justify-between sm:px-12 px-2">
                                                        <span className="text-shadow-[0_4px_4px_black] uppercase">presentation slides</span>
                                                        <span className="self-center"><FaArrowRightLong /></span>
                                                    </Link>
                                                    <hr className="text-white"/>
                                                </div>
                                                <div className="socials flex flex-row justify-between w-full">
                                                    <h5>Social media posts</h5>
                                                    <div className="social-links ">
                                                        <Link href={event.linkedin_post ? event.linkedin_post  : ""}><FaLinkedin size={22} color="#0077B5" className="bg-white"/></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </div>
                    <EventsUpdates />
                    <Subscription />
                </div>
            </div>
            <Footer/>
        </div>
    );
}
export default Page;
