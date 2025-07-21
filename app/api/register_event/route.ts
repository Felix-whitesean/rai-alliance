import {NextResponse} from "next/server";
import type { NextApiRequest, NextApiResponse } from 'next';
import {db} from "@/lib/db";

export default async function handler  (req: NextApiRequest, res: NextApiResponse)  {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Only POST allowed' });
    }
    const connection = await db();
    const {event_title, event_theme, event_link, target_group, editable_by, poster_id, valid_until,user_id } = await req.body.json();
    try {
        await connection.query('CALL sp_createevent(?, ?, ?, ?, ?, ?, ?, ?, ?)', [ 0, event_title, event_theme,
            event_link, target_group, editable_by, poster_id, valid_until, user_id]);
        res.status(200).json({ message: 'User saved successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    } finally {
        await connection.end();
    }
    return NextResponse.json({success: true})
}
