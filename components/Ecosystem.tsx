import React from 'react'
import Title from "@/components/Title";
import Image from "next/image";
import { HiMiniSignal } from "react-icons/hi2";
import { FaLaptopCode } from "react-icons/fa";
import { PiAirplaneTiltBold } from "react-icons/pi";



const Ecosystem = () => {
    return (
        <div className="w-full bg-white py-16">
            <div className="lg:w-[80%] w-full h-[99vh] bg-[#D9D9D9] m-auto rounded-md p-8">
                <div className="w-fit m-auto">
                    <Title heading="RAI ecosystem" icon={<PiAirplaneTiltBold size={24} />} primaryBg="#FFFFFF" secondaryBg="#D5C1DC"/>
                </div>

                <div className="relative max-w-[400px] m-auto mt-24">
                    <div className="">
                        <Image src="/robot.png" alt="" width={450} height={455} className="m-auto absolute"/>
                        <div className="pointer flex flex-row absolute lg:-right-[100px] md:-right-[100px] top-15 ">
                            <span className="arrow dotted w-[100px] self-center -right-1 -rotate-10"></span>
                            <div className="card flex flex-row bg-[#40078a4d] p-2 rounded-md gap-2 ">
                                <div className="card-icon p-2 self-center rounded-full bg-[#D9D9D9]">
                                    <span><HiMiniSignal /></span>
                                </div>
                                <div className="card-body self-center">Ambassadors</div>
                            </div>
                        </div>
                        <div className="pointer flex flex-row absolute -left-[100px] top-40 -rotate-45 sm:rotate-0 ">
                            <div className="card flex flex-row bg-[#1E1E1EBB] py-3 px-6 rounded-md gap-2 ">
                                <div className="card-icon p-2 self-center rounded-full bg-[#FFF0F0]">
                                    <span><FaLaptopCode /></span>
                                </div>
                                <div className="card-body self-center text-white">Developers</div>
                            </div>
                            <span className="arrow2 dotted w-[100px] self-center -right-1 -rotate-10"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Ecosystem
