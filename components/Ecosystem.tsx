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
                    <div className="flex flex-row">
                        <Image src="/robot.png" alt="" width={450} height={455} className="absolute"/>
                        <div className="pointer flex flex-row absolute top-15 sm:-right-[100px] ">
                            <span className="arrow dotted w-[100px] self-center right-0 sm:-rotate-10 rotate-0 sm:block hidden"></span>
                            <div className="card flex flex-row bg-[#40078a4d] p-2 rounded-md gap-2 ">
                                <div className="card-icon p-2 self-center rounded-full bg-[#D9D9D9]">
                                    <span><HiMiniSignal /></span>
                                </div>
                                <div className="card-body self-center">Ambassadors</div>
                            </div>
                        </div>
                        <div className="pointer flex sm:flex-row flex-row-reverse absolute sm:-left-[100px] left-0 top-40 rotate-0 ">
                            <div className="card flex flex-row bg-[#1E1E1EBB] py-3 px-6 rounded-md gap-2 ">
                                <div className="card-icon p-2 self-center rounded-full bg-[#FFF0F0]">
                                    <span><FaLaptopCode /></span>
                                </div>
                                <div className="card-body self-center text-background">Developers</div>
                            </div>
                            <span className="arrow2 dotted w-[100px] self-center sm:-right-1 sm:-rotate-10 sm:block hidden"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Ecosystem
