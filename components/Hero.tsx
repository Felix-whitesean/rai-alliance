import React from 'react'
import {MdLightbulbOutline, MdOutlineLink, MdArrowOutward} from "react-icons/md";
import Link from "next/link";


const Hero = () => {
    return (
        <div className="hero min-h-[99vh] w-full">
            <div className="bg-white self-center h-full w-full p-8 pt-12 flex flex-row">
                <div className="left">
                    <div className="title text-[20px] font-semibold p-2 bg-[#D9D9D9] w-fit rounded-md">
                        <div className="w-full h-full bg-[#D5C1DC] text-prim-color py-4 px-12 rounded-md flex flex-row gap-4">
                            <MdLightbulbOutline  className="text-black bg-[#FFF0F0] self-center rounded-[50%]" size={24}/>
                            <h2>Time to know more</h2>
                        </div>
                    </div>
                    <div  className="w-full flex lg:flex-row flex-col lg:gap-2 gap-12 h-fit items-center lg:justify-between justify-around">
                        <div className="lg:w-[65%] w-[80%]">
                            <div className="sub-title flex flex-row gap-4 mt-8">
                                <div className=" bg-[#D9D9D9] self-center rounded-[50%] p-2">
                                    <h2 className="bg-white py-1.5 px-3 text-prim-color rounded-[50%] font-bold">1.</h2>
                                </div>
                                <h1 className="font-semibold self-center">Brief description of <span className="font-bold">RAI ALLIANCE</span></h1>
                            </div>
                            <div className="paragraph lg:pl-24 md:pl-8 sm:pl-4">
                                <p>Short for Responsible Artificial Intelligence Alliance, this is a non-profit startup organization that advocate for responsible use of I by all industry players.</p>
                                <ol className="list-[lower-roman] lg:pl-24 pl-8">
                                    <li>
                                        <p className="flex justify-between lg:w-[60%] w-[80%]">
                                            <span className="sm:max-w-[90%] max-w-[80%]">Responsible AI for developers</span>
                                            <Link className="self-center left-2" href="https://rai-alliance.org">
                                                <MdOutlineLink className="text-prim-color -rotate-45"/>
                                            </Link>
                                        </p>
                                    </li>
                                    <li>
                                        <p className="flex justify-between lg:w-[60%] w-[80%]">
                                            <span className="sm:max-w-[90%] max-w-[80%]">Responsible AI for kids</span>
                                            <Link className="self-center" href="https://rai-alliance.org"><MdOutlineLink className="text-prim-color -rotate-45"/></Link>
                                        </p>
                                    </li>
                                    <li>
                                        <p className="flex justify-between lg:w-[60%] w-[80%]">
                                            <span className="sm:max-w-[90%] max-w-[80%]">Responsible AI for business</span>
                                            <Link className="self-center" href="https://rai-alliance.org"><MdOutlineLink className="text-prim-color -rotate-45"/></Link>
                                        </p>
                                    </li>
                                </ol>
                                <div className="redirects mt-24 text-prim-color w-[250px]">
                                    <Link className="self-center flex justify-between" href="https://rai-alliance.org/history">
                                        <span>History</span>
                                        <span><MdArrowOutward /></span>
                                    </Link>
                                    <hr/>
                                    <Link className="self-center flex justify-between" href="https://rai-alliance.org">
                                        <span>About RAI-Alliance</span>
                                        <span><MdArrowOutward /></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="poster w-[250px] min-h-[400px] bg-white text-prim-color">
                             Test poster
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Hero
