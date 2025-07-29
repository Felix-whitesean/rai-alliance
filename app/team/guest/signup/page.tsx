import React from 'react'
import GuestForm from "@/components/GuestForm";

const Page = () => {
    return (
        <div>
            <GuestForm defaultValues={{
                guest_id: "",
                guest_name: "",
                email: "",
                company: "",
                linkedin : "",
                position_in_company: "",
                country_of_residence: "",
                company_website_url: "",
            }}/>
        </div>
    )
}
export default Page
