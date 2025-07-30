'use client'

import CreationForm from "@/components/CreationForm";

export default function Create() {
    return (
        <div>
            <CreationForm defaultValues={{
                event_id: "",
                event_title: "",
                event_theme:  "",
                event_link: "",
                event_location: "",
                target_group:"",
                editor_group:"",
                poster_id: "",
                event_date: "",
            }}/>
        </div>
    )
}

// app/events/edit/page.tsx