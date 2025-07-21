import React from 'react'
import {MdLightbulbOutline} from "react-icons/md";

const Hero = () => {
    return (
        <div className="hero min-h-[99vh] w-full bg-white p-12 mt-12">
            <div className="container bg-[#5F046910] self-center h-full p-8">
                <div className="title text-[20px] font-semibold p-2 bg-[#D9D9D9] w-fit rounded-md">
                    <div className="w-full h-full bg-[#D5C1DC] text-prim-color py-4 px-12 rounded-md flex flex-row gap-4">
                        <MdLightbulbOutline  className="text-black bg-[#FFF0F0] self-center rounded-[50%]" size={24}/>
                        <h2>Time to know more</h2>
                    </div>
                </div>
                <div className="sub-title flex flex-row gap-4 mt-8">
                    <div className=" bg-[#D9D9D9] self-center rounded-[50%] p-2">
                        <h2 className="bg-white py-2 px-4 text-prim-color rounded-[50%]">1</h2>
                    </div>
                    <h1 className="font-semibold self-center">Brief description of <span className="font-bold">RAI ALLIANCE</span></h1>
                </div>

             <div  className="w-[650px] ">
                 <p>Short for Responsible Artificial Intelligence Alliance,  this is a non-profit startup organization that advocate for responsible use of I by all industry players.</p>
                 <ol>
                     <li>Responsible AI for delopers</li>
                     <li>Responsible AI for kids</li>
                     <li>Responsible AI for business</li>
                 </ol>

             </div>
            </div>
        </div>
    )
}
export default Hero
