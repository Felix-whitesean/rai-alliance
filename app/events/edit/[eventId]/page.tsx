"use client";
import React from 'react'

import { useEffect, useState } from "react";
import CreationForm from "@/components/CreationForm";
import {useParams} from "next/navigation";
import type { EventRow } from "@/constants";

function formatForDateTimeLocal(date: Date): string {
    const localdate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    const yyyy = localdate.getFullYear();
    const mm = String(localdate.getMonth() + 1).padStart(2, '0');
    const dd = String(localdate.getDate()).padStart(2, '0');
    const hh = String(localdate.getHours()).padStart(2, '0');
    const min = String(localdate.getMinutes()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}


export default function Create() {
    const params = useParams();
    const event_id = params?.eventId as string | undefined;

    const [defaultValues, setDefaultValues] = useState<EventRow | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!event_id) {
                setLoading(false);
                return;
            }

            const res = await fetch(`/api/events`, {
                method: "POST",
                body: JSON.stringify({ event_id }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            // Destructure specific fields from the fetched data
            const {
                event_title, event_theme, event_link, event_location, target_group, editor_group, poster_id, event_date,
                path, displayed, recording, presentation_slides, linkedin_post, guest, fullname,} = data || {};


            const fallbackValues = {
                event_id: "", event_title: "", event_theme: "", event_link: "", event_location: "", target_group: "", editor_group: "", fullname: "",
                poster_id: "", event_date: "", path: "", displayed: "", recording: "", presentation_slides: "", linkedin_post: "", guest: "",
            };

            // Compose clean defaultValues with specific fields
            setDefaultValues({
                event_id: event_id,
                event_title: event_title ?? fallbackValues.event_title,
                event_theme: event_theme ?? fallbackValues.event_theme,
                event_link: event_link ?? fallbackValues.event_link,
                event_location: event_location ?? fallbackValues.event_location,
                target_group: target_group != null ? String(target_group) : fallbackValues.target_group,
                editor_group: editor_group != null ? String(editor_group) : fallbackValues.editor_group,
                poster_id: poster_id ?? fallbackValues.poster_id,
                event_date: event_date ? formatForDateTimeLocal(new Date(event_date)) : fallbackValues.event_date,
                path: path ??  fallbackValues.path,
                displayed: displayed != null ? String(displayed) : fallbackValues.displayed,
                recording: recording ?? fallbackValues.recording,
                presentation_slides: presentation_slides ?? fallbackValues.presentation_slides,
                linkedin_post: linkedin_post  ?? fallbackValues.linkedin_post,
                fullname: fullname ?? fallbackValues.fullname,
                guest: guest ?? fallbackValues.guest,
            })

            setLoading(false);
        };

        fetchData();
    }, [event_id]);
    if (loading || !defaultValues) return <p>Loading form...</p>;
    return (

        <div>
            <CreationForm type="events" defaultValues={defaultValues} />
        </div>
    );
}
