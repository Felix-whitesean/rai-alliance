import React from 'react'
import Image from "next/image";
import { LuMoveRight } from "react-icons/lu";

import NavBar from "@/components/NavBar";
import {Button} from "@/components/ui/button";
import Hero from "@/components/Hero";

const Page = () => {
    return (
        <>
            <div className="landing-page relative w-full h-full overflow-hidden">
                <NavBar />
                <div className="flex flex-row h-full">
                    <section className="left w-[390px] relative flex flex-col">
                        <div className="left-landing-page w-[390px] h-[406px] relative">
                            <Image src="/landing_image.jpg" alt="" width="229" height="229" className="landing-page-image absolute right-0 bottom-0" />
                        </div>
                        <div className="self-end text-[18px] text-white bg-[var(--prim-color)] text-shadow-[4px_4px_4px_black] shadow-[4px_4px_4px_rgb(0,0,0,.25)] mt-8 px-16 py-3 rounded-sm flex flex-row gap-8">
                            <span className="px-2">Get started</span>
                            <LuMoveRight className="text-shadow-[4px_4px_4px_black] self-center" size={24}/>
                        </div>
                    </section>
                    <section className="center">
                        <div className="bg-dot-pattern text-white h-auto w-fit py-4 px-8 mt-24 ml-12">
                            <p className="text-[var(--prim-color)] flex flex-col gap-1 font-medium">
                                <span className="text-[var(--prim-color)] text-[32px]">We are saying</span>
                                <span className="text-[20px]">Responsible all the way</span>
                            </p>
                        </div>
                    </section>

                    <div className="tilted absolute -right-[190px] w-[712px] self-end h-[540px] bg-white top-0 -rotate-45 flex flex-row">
                        <div className="micro-r w-[80px] h-[350px] ml-16 mt-8"></div>
                        <div className="bg-[#5F046910] w-[300px] h-[350px] ml-4 mt-8 border-t-3 border-b-1 border-t-[var(--prim-color)] border-b-[var(--prim-color)]">
                            <div className=" rotate-45 ml-24 pt-24">
                                <div className="rai text-prim-color font-bold text-shadow-[0_4px_4px_var(--sec-color)]">
                                    <h4 className="text-[96px] font-[black] self-start">RAI</h4>
                                    <br/>
                                    <h5 className="text-[40px] self-start -mt-12">Alliance</h5>
                                </div>
                                <p className="text-black ml-8">For you, <br/> For us all</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Hero/>
        </>
    )
}
export default Page
