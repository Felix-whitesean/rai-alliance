import { RowDataPacket, FieldPacket } from "mysql2";
import { db } from "@/lib/db";
import {EventRow} from "@/constants";
import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth"; // or wherever your DB connector is

export async function  GET() {
    const connection = await db();

    const session = await getServerSession(authOptions);
    let role_id = 0;
    if (!session || !session.user || !session.user.email) {
        role_id = 0;
    }
    else{
        const email = session.user.email;
        const [user_rows]: [RowDataPacket[][], FieldPacket[]] = await connection.query(
            'CALL sp_getuser(?)', [email]
        );
        role_id = user_rows[0][0].privilege;
        console.log(role_id);
    }

    console.log(role_id)
    try {
        const [rows]: [RowDataPacket[][], FieldPacket[]] = await connection.query(
            'CALL sp_getevents(?, ?)', ['', role_id]
        );const resultSet = rows[0] as EventRow[]; // Stored procedures wrap results in one extra array
        return NextResponse.json(resultSet);
    }catch (error) {
        console.error("Caught error:", error);
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
        }
    } finally {
        await connection.end();
    }


}
export async function POST(req: Request) {
    const connection = await db();
    const body = await req.json();
    const { event_id } = body;

    if (!event_id) {
        return NextResponse.json({ error: "Event identifier is required" }, { status: 400 });
    }

    const [rows]: [RowDataPacket[][], FieldPacket[]] = await connection.query(
        'CALL sp_getevents(?, ?)', [event_id, ""]
    );
    const resultSet = rows[0] as EventRow[];
    return NextResponse.json(resultSet[0] || {});
}
