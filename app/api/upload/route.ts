import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db"; // your mysql connection
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {FieldPacket, RowDataPacket} from "mysql2"; // drizzle schema or raw

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const connection = await db();
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
        return NextResponse.json({ error: "Unauthorized. Please sign in and try again." }, { status: 401 });
    }
    const email = session.user.email;
    const [user_rows]: [RowDataPacket[][], FieldPacket[]] = await connection.query(
        'CALL sp_getuser(?)', [email]
    );
    const user_id = user_rows[0][0].user_id;
    // const role_id = user_rows[0][0].privilege;
    if(!user_id){
        return NextResponse.json({ error: "Unauthorized. Please sign in and try again." });
    }
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${uuidv4()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public", "uploads", filename);

    await fs.writeFile(filePath, buffer);

    const relativePath = `/uploads/${filename}`;

    // Store in DB
    try {
        await connection.query('CALL sp_saveimage(?, ?, ?, ?)', ['', filename, relativePath, user_id]);
            // filename,
            // path: relativePath,
        // });
        return NextResponse.json({ message : "saved successfully", status: 200 });
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

    return NextResponse.json({ success: true, path: relativePath });
}
