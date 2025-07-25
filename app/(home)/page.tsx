import React from 'react'
import Image from "next/image";
import { LuMoveRight } from "react-icons/lu";

import NavBar from "@/components/NavBar";
import {Button} from "@/components/ui/button";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import Ecosystem from "@/components/Ecosystem";
import Register from '@/components/Register';

const Page = () => {
    return (
        <>
            <div className="landing-page relative w-full h-full overflow-hidden">
                <NavBar />
                <div className="flex sm:flex-row flex-col-reverse h-full sm:p-0 p-4">
                    <section className="left w-[390px] relative flex flex-col sm:p-0 p-2">
                        <div className="left-landing-page w-[390px] h-[406px] relative">
                            <Image src="/landing_image.jpg" alt="" width="229" height="229" className="landing-page-image absolute right-0 bottom-0" />
                        </div>
                        <Button className="w-[60%] self-end text-[18px] text-prim-color border-2 border-[var(--prim-color)] bg-transparent shadow-[4px_4px_4px_rgb(0,0,0,.25)] mt-8 px-32 py-6 rounded-sm flex flex-row gap-8">
                            <span>Get started</span>
                            <LuMoveRight className="self-center" size={24}/>
                        </Button>
                    </section>

                    <div className="tilted lg:absolute relative sm:-right-[190px] right-0 sm:w-[712px] w-full sm:self-end self-start h-[540px] bg-white top-0 sm:-rotate-45 rotate-0 flex sm:flex-row flex-col-reverse">
                        <div className="micro-r sm:w-[80px] w-full sm:ml-16 ml-2 mt-8 sm:h-[350px] h-[80px] relative overflow-visible">
                            <div className="absolute sm:-left-[60px] left-4 sm:top-[150px] top-4 sm:rotate-90 rotate-0 text-sm ">
                                    <p className="flex flex-col gap-1 font-medium w-[200px] text-[#666666]">
                                        <span className="text-[16px]">We are saying</span>
                                        <span className="text-[12px] w-fit">Responsible all the way</span>
                                    </p>
                            </div>
                        </div>
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
            <div className="w-full lg:px-12 px-4 bg-[#DCDCDC]">
                <Hero />
                <Mission />
                <Ecosystem />
                <Register/>

            </div>
        </>
    )
}
export default Page
