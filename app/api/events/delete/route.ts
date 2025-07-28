import { RowDataPacket, FieldPacket } from "mysql2";
import { db } from "@/lib/db";
import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth"; // or wherever your DB connector is

export async function POST(req: Request) {
    const connection = await db();
    const body = await req.json();
    const { event_id } = body;

    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
        return NextResponse.json({ error: "Unauthorized. Please sign in and try again." }, { status: 401 });
    }
    const email = session.user.email;
    const [user_rows]: [RowDataPacket[][], FieldPacket[]] = await connection.query(
        'CALL sp_getuser(?)', [email]
    );
    const user_id = user_rows[0][0].user_id;
    const role_id = user_rows[0][0].privilege;

    if(!user_id){
        return NextResponse.json({ error: "Sign in to continue" }, { status: 400 });
    }
    if(role_id != 1){
        return NextResponse.json({ error: "You lack the permissions to delete this event." });
    }

    try {
        await connection.query('CALL sp_deleteevent(?, ?)', [event_id, user_id]);
        NextResponse.json({message: "Successfully deleted event"});
    }
    catch (error) {
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
