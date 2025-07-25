import React from 'react'
import Title from "@/components/Title";
import { RiEditLine } from "react-icons/ri";
import { BiSolidBinoculars } from "react-icons/bi";



const Mission = () => {
    return (
        <div className="p-8 bg-background">
            <div className="self-start">
                <div className="sub-title flex flex-row gap-4 pt-8">
                    <div className=" bg-[#D9D9D9] self-center rounded-[50%] p-2">
                        <h2 className="bg-background py-1.5 px-3 text-prim-color rounded-[50%] font-bold">2.</h2>
                    </div>
                    <h1 className="font-semibold self-center">Mission and vision</h1>
                </div>
            </div>
            <div className="py-12">
                <div className=" m-auto h-auto max-w-[520px] min-h-[305px] bg-[#1E1E1EBB] p-4 rounded-md relative z-[1]">
                    <div className="w-full h-full bg-background relative rounded-lg z-[111]">
                        <div className="w-full">
                            <Title heading="Mission" icon={<RiEditLine size={24} />} primaryBg="#D9D9D9" secondaryBg="#D5C1DC"/>
                        </div>
                        <p className="text-16 font-medium italic p-8">
                            Our mission is to promote responsible AI development and use, ensuring that AI is developed and used in a
                            way that respects human rights and promotes social good. We believe that AI has the potential to transform
                            society for the better, but only if it is developed and used ethically.
                        </p>
                    </div>
                </div>
                <div className=" m-auto h-auto max-w-[520px] min-h-[305px] bg-[#00000032] p-4 rounded-md relative z-[1] mt-24">
                    <div className="w-full h-full bg-background relative rounded-lg z-[111]">
                        <div className="w-full">
                            <Title heading="Vision" icon={<BiSolidBinoculars size={24} />} primaryBg="#D9D9D9" secondaryBg="#D5C1DC"/>
                        </div>
                        <p className="text-16 font-medium italic p-8">
                            Our mission is to promote responsible AI development and use, ensuring that AI is developed and used in a
                            way that respects human rights and promotes social good. We believe that AI has the potential to transform
                            society for the better, but only if it is developed and used ethically.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Mission
