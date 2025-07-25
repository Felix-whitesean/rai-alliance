"use server"
import React from 'react'
import {getServerSession, Session} from "next-auth";
import {authOptions} from "@/lib/auth";

const  UserProfile = async() => {
    const session: Session | null = await getServerSession(authOptions);
    if(!session) {
        console.log("No session");
    }
    // const username =;
    const username = session.user?.name;

    return (
        <div>{username}</div>
    )
}
export default UserProfile;
