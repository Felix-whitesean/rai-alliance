import React from 'react'
import Link from "next/link";
import { HiMiniUserGroup } from "react-icons/hi2";
import {FaLaptopCode} from "react-icons/fa";
import { LuShieldQuestion } from "react-icons/lu";



const Register = () => {
    return (
        <div className="register bg-white w-full h-full py-40 px-12">
            <div className="container flex flex-col sm:flex-row w-full gap-8 justify-between">
                <div className="flex flex-col lg:max-w-[50%] w-full sm:w-full lg:gap-8 gap-16">
                    <h3 className="text font-bold text-[2rem]">Inspired? Join us</h3>
                    <div className="flex flex-col gap-4">
                        <p className="description">Everybody fits in RAI Alliance. Whether you are a beginner in
                            technology or a veteran in AI and related field. You get a chance to contribute in the least and most
                            significant levels according to your ability.
                        </p>
                        <div className="flex flex-col">
                            <div className="font-bold">500 + </div>
                            <div className="text-[0.75rem]">participants</div>
                        </div>
                        <Link href="/signup" className="text-white bg-[var(--prim-color)] px-6 py-3 rounded-sm w-fit"> Register to join us</Link>
                    </div>
                </div>
                <div className="right self-center text-[0.75rem] font-medium">
                    <div className="w-[300px] flex flex-row flex-wrap gap-4 items-center justify-center">
                        <div className="flex flex-col p-2 border-1 border-[#1e1e1e10] rounded-md items-center justify-center">
                            <span className="p-2 rounded-full bg-[#D9D9D9]">
                                <HiMiniUserGroup />
                            </span>
                            <Link className="w-[100px] self-center" href="/signup">Become a partner</Link>
                        </div>
                        <div className="flex flex-col p-2 border-1 border-[#1e1e1e10] rounded-md">
                            <span className="p-2 rounded-full bg-[#D9D9D9] self-center">
                                <FaLaptopCode />
                            </span>
                            <Link className="w-[120px]" href="/signup">Join as a software developer</Link>
                        </div>
                        <div className="flex flex-col p-2 border-1 border-[#1e1e1e10] rounded-md">
                            <span className="p-2 rounded-full bg-[#D9D9D9] self-center">
                                <LuShieldQuestion />
                            </span>
                            <Link className="w-[100px]" href="/signup">How else can I contribute?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register
