import React from 'react'
import {Button} from "@/components/ui/button";
import { FaArrowRightLong } from "react-icons/fa6";

const Subscription = () => {
    return (
        <div className="sm:p-32 p-2">
            <div className="bg-background m-auto flex sm:flex-row flex-col w-full sm:h-[400px] h-[500px]">
                <div className="flex p-8 sm:w-[50%] w-full self-center">
                    <div className="flex flex-col gap-4 w-fit">
                        <h3 className="text-foreground font-bold text-[1.25rem]">Subscribe to get updates</h3>
                        <form className="p-[0.05rem] flex flex-row bg-[#5f046910] border-2 border-[#40078a88] w-fit rounded-sm" >
                            <input name="subscribe" className="py-2" required/>
                            <Button className="bg-[#5f046996] h-full rounded-none rounded-r-sm px-24"><FaArrowRightLong className="-tracking-wider" size={32}/></Button>
                        </form>
                        <p className="text-regular text-[0.75rem]"><span className="text-prim-color font-semibold">Your time matters.</span> Let us handle the reminders, updates and invites - you just check your inbox</p>
                    </div>

                </div>
                <div className="flex-[0 0 1] sm:w-[50%] w-full h-full relative after:absolute after:left-0 after:top-0 after:w-full after:h-full after:[]"
                     style={{ backgroundImage: `url("/poster.jpg")`, backgroundSize: "100% 100%"}}></div>
            </div>
        </div>
    )
}
export default Subscription
