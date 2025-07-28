import { RowDataPacket, FieldPacket } from "mysql2";
import { db } from "@/lib/db";
import {EventRow} from "@/constants";
import {NextResponse} from "next/server"; // or wherever your DB connector is

export async function  GET() {
    const connection = await db();
    try {
        const [rows]: [RowDataPacket[][], FieldPacket[]] = await connection.query(
            'CALL sp_getevents(?)', ['']
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
        return NextResponse.json({ error: "event_id is required in POST body" }, { status: 400 });
    }

    const [rows]: [RowDataPacket[][], FieldPacket[]] = await connection.query(
        'CALL sp_getevents(?)', [event_id]
    );
    const resultSet = rows[0] as EventRow[];
    return NextResponse.json(resultSet[0] || {});
}
