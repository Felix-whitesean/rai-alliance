"use client";

import React from "react";
import Navbar from "@/components/NavBar";
import Title from "@/components/Title";
import { GoShield } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import EventsUpdates from "@/components/EventsUpdates";
import Subscription from "@/components/Subscription";

const Page = () => {
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
                            <div  style={{ backgroundImage: `url("/poster.jpg")`, backgroundSize: "100% 100%" }} className="rounded-lg m-auto lg:w-[40%] md:w-[50%] sm:w-[full]">
                                <div className=" flex flex-col gap-24 text-white bg-linear-[90deg,#000000D6,#666666D6] p-4 rounded-lg">
                                    <div className="flex flex-col gap-2">
                                        <div className="indicator w-[25px] h-[25px] rounded-full bg-[#00000040] m-auto p-1">
                                            <div className=" w-full h-full bg-white rounded-full"></div>
                                        </div>
                                        <h3 className="title font-bold text-[1.725rem]">Monday, 26th April</h3>
                                    </div>
                                    <div className="links w-full flex flex-col gap-4">
                                        <Link href="" className="flex flex-row w-full justify-between sm:px-12 px-2">
                                            <span className="text-shadow-[0_4px_4px_black] uppercase">feedback</span>
                                            <span className="self-center"><FaArrowRightLong /></span>
                                        </Link>
                                        <hr className="text-white"/>
                                        <Link href="" className="flex flex-row w-full justify-between sm:px-12 px-2">
                                            <span className="text-shadow-[0_4px_4px_black] uppercase">feedback</span>
                                            <span className="self-center"><FaArrowRightLong /></span>
                                        </Link>
                                        <hr className="text-white"/>
                                        <Link href="" className="flex flex-row w-full justify-between sm:px-12 px-2">
                                            <span className="text-shadow-[0_4px_4px_black] uppercase">feedback</span>
                                            <span className="self-center"><FaArrowRightLong /></span>
                                        </Link>
                                    </div>
                                    <div className="socials">
                                        <h5>Social media posts</h5>
                                        <div className="social-links">
                                            <Link className="linkedin" href=""> LinkedIn</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <EventsUpdates />
                    <Subscription />
                </div>
            </div>
        </div>
    );
}
export default Page;
