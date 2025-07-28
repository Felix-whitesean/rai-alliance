"use client"


import React from 'react'
import Title from "@/components/Title";
import { MdOutlineEventRepeat, MdOutlineMail} from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { FaLinkedin } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { BsCameraReels } from "react-icons/bs";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { EventRow } from "@/constants";

const EventsUpdates = () => {
    const [events, setEvents] = useState<EventRow[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        fetch("/api/events")
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .finally(() => setLoading(false));
    }, []);


    return (

            <div className="bg-background w-full sm:p-16 p-4 sm:pt-48 pt-64">
                <div className="w-fit">
                    <Title heading="Next in Line" icon={<MdOutlineEventRepeat size={24} />} primaryBg="#D9D9D9" secondaryBg="#D5C1D5" />
                </div>
                {loading ? (
                        <div className="text-center text-lg mt-16">Loading events...</div>
                    ) : (
                    events.map((event) => {
                        const validDate = new Date(event.event_date);
                        const formattedDate = validDate.toLocaleDateString("en-GB", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        });
                        const timeString = validDate.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                        });
                        const end = new Date(event.event_date);
                        const start = new Date(end.getTime() - 2 * 60 * 60 * 1000); // 2 hours before

                        const formatForGoogleCalendar = (date: Date) =>
                            date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

                        // Format both start and end
                        const startStr = formatForGoogleCalendar(start);
                        const endStr = formatForGoogleCalendar(end);

                        const googleCalUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.event_title)}`
                        +`&dates=${startStr}/${endStr}&details=${encodeURIComponent(event.event_theme)}`
                        +`&location=${encodeURIComponent(event.event_location)}&ctz=Africa/Nairobi\`;`;

                        return (
                            <div key={event.event_id} className="event w-full flex lg:flex-row flex-col gap-16 justify-between items-center py-32 mt-8 lg:px-24">
                                <div className="carousel w-[300px] h-fit relative">
                                    <div className="w-full relative bg-background border-2 border-[#1E1E1E3B] z-11 px-8 py-4 rounded-[30px] flex flex-col gap-8 ">
                                        <div className="title flex flex-col gap-4">
                                            <h3 className="font-semibold text-[0.9rem] text-prim-color ">{event.event_title}</h3>
                                            <div className="flex flex-col gap-2">
                                                <h2 className="text-black font-semibold text-[1.525rem]">{formattedDate}</h2>
                                                <h6 className="font-semibold text-[0.9rem] text-[#1E1E1EAD]">{timeString} UTC</h6>
                                            </div>
                                        </div>
                                        <div className="theme">
                                            <p className="italic text-[1rem]">{event.event_theme}</p>
                                        </div>
                                        <Link href={googleCalUrl} target="_blank" rel="noopener noreferrer"
                                            className="bg-[var(--prim-color)] text-background rounded-[24px] py-3 self-center w-fit px-4 text-[1rem] flex flex-row gap-2">
                                            <span><LuCalendarDays size={24}/></span>
                                            <span>Save the date</span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="lg:mr-16">
                                    <div className="section_hero flex flex-col gap-8">
                                        <div className="section_heading gap-2 flex flex-col">
                                            <div className="section_title flex flex-row gap-4">
                                                <h3 className="text-foreground font-bold text-[1.2rem] max-w-64 overflow-x-hidden truncate">John Kiriamiti Kiambiti OleNguyani</h3>
                                                <div className="bg-foreground text-background p-1 rounded-sm text-[0.75rem] self-center">KE</div>
                                            </div>
                                            <div className="icons flex flex-row gap-2">
                                                <Link href="/">
                                                    <FaLinkedin size={22} color="#0077B5" />
                                                </Link>
                                                <Link href="/">
                                                    <MdOutlineMail size={22} />
                                                </Link>
                                            </div>
                                            <Link href="/" className="association bg-[#D9D9D9] text-[#666666] font-medium px-2 py-1 max-w-64 overflow-x-hidden truncate">
                                                <span className="text-prim-color font-medium">Founder,</span> Responsible artificial intelligence Alliance</Link>
                                        </div>

                                        {/*middle*/}
                                        <div className="middle flex flex-row gap-2 self-center">
                                            <div className="self-center">{event.event_location ? <CiLocationOn size={18} color="#40078A"/> : <BsCameraReels/>}</div>
                                            <div className="max-w-[60px] wrap-break-word">{event.event_location ? event.event_location :
                                                <Link href={event.event_link} className="text-prim-color underline">Online</Link>}</div>
                                        </div>

                                        <Button className="text-[var(--prim-color)] bg-background rounded-[24px] border-2 border-[var(--primary-color)] py-6 self-center w-fit px-8 text-[1rem] hover:bg-[var(--prim-color)] hover:text-white">Confirm attendance</Button>
                                    </div>
                                    <div className="flex flex-col bg-[#D9D9D9] border text-[var(--prim-color)] w-fit p-2 rounded-md m-auto mt-4 text-[0.8rem] text-center">
                                        <Link href={"/events/edit/"+event.event_id} className="bg-white p-2 rounded-md">Edit event</Link>
                                        <Link href={"/events/delete/"+event.event_id} className="text-red-500 p-2">Delete this event</Link>
                                    </div>

                                </div>
                            </div>
                        )}
                    ))}
            </div>
    )
}
export default EventsUpdates


// const EventsUpdates = () => {
//     const [events, setEvents] = useState<EventRow[]>([]);
//     useEffect(() => {
//         fetch("/api/events")
//             .then((res) => res.json())
//             .then((data) => setEvents(data));
//     }, []);
//
//     return (
//         <div>
//             {events.map((event) => (
//                 <div key={event.event_id} className="flex flex-row gap-2 flex-wrap">
//                     <h3 className="font-medium text-[1.1rem] text-sec-color">{event.event_title}</h3>
//                     <p>{event.event_link}</p>
//                     <p>{event.event_location}</p>
//                     <p>{event.addedby}</p>
//                     <p>{event.targetgroup}</p>
//                     <p>{event.editable_by}</p>
//                     <p>{event.poster_id}</p>
//                     <p>{event.valid_until}</p>
//                     <p>{event.date_created}</p>
//                     <p>{event.event_theme}</p>
//                 </div>
//             ))}
//         </div>
//     );
// };
//
// export default EventsUpdates;

