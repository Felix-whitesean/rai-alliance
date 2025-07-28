import { db } from "@/lib/db";
import {FieldPacket, RowDataPacket} from "mysql2";
import {EventRow} from "@/constants";
import {NextResponse} from "next/server";

export async function GET() {
    const connection = await db();
    try {
        const [rows]: [RowDataPacket[][], FieldPacket[]] = await connection.query(
            'CALL sp_getimages()', []
        );
        const resultSet = rows[0] as EventRow[];
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
