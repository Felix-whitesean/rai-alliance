import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import { getServerSession } from "next-auth";
import {authOptions} from "@/lib/auth";
import {FieldPacket, RowDataPacket} from "mysql2";

export async function POST  (req:Request)  {
    if (req.method !== 'POST') {
        return NextResponse.json({ error: 'Only POST allowed' });
    }
    const connection = await db();
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
        return NextResponse.json({ error: "Unauthorized. Please sign in and try again." }, { status: 401 });
    }
    const email = session.user.email;
    const [rows]: [RowDataPacket[][], FieldPacket[]] = await connection.query(
        'CALL sp_getuser(?)', [email]
    );
    const user_id = rows[0][0].user_id;
    const role_id = rows[0][0].privilege;

    if(!user_id) {
        return NextResponse.json({ error: "Unauthorized. Make sure you are signed in and have the right permissions" }, { status: 401 });
    }
    // console.log(user_id, role_id);
    if(role_id != 1) {
        return NextResponse.json({ error: "Insufficient privileges. Contact admin." }, { status: 401 });
    }

    const {event_id, event_title, event_theme, event_link, event_location, target_group, editor_group, poster_id, event_date } = await req.json();
    try {
            await connection.query('CALL sp_createevent(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [event_id, event_title, event_theme, event_link, event_location, target_group, editor_group, poster_id, event_date, user_id]);
            NextResponse.json({ message: 'Event saved successfully' });
    } catch (error) {
        console.error("Caught error:", error);
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
        }
    } finally {
        await connection.end();
    }
    return NextResponse.json({success: true})
}
