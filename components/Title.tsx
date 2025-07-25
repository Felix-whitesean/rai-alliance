import React from 'react'

interface TitleProps {
    heading: string;
    icon: React.ReactNode;
    primaryBg: string;
    secondaryBg: string;
}

const Title: React.FC<TitleProps> = ({ heading, icon, primaryBg, secondaryBg }) => {
    return (
        <div className={`text-[20px] font-semibold p-2 rounded-md`} style={{ backgroundColor: primaryBg }}>
            <div className="w-full h-full text-prim-color py-4 px-12 rounded-md flex flex-row gap-4" style={{ backgroundColor: secondaryBg }}>
                <div className="text-black bg-[#FFF0F0] self-center rounded-full">
                    {icon}
                </div>
                <h2>{heading}</h2>
            </div>
        </div>
    )
}
export default Title
