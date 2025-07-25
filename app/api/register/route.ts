// import { db } from "@/database/db";
// import { hash } from "bcryptjs";
// import { NextResponse } from "next/server";
//
// export async function POST(req: Request) {
//     const { email, password } = await req.json();
//
//     const existing = await db.query.users.findFirst({
//         where: (u, { eq }) => eq(u.email, email),
//     });
//     if (existing) return NextResponse.json({ error: "User exists" }, { status: 400 });
//
//     await db.insert(users).values({
//         email,
//         password: await hash(password, 10),
//     });
//
//     return NextResponse.json({ success: true });
// }
import {NextResponse} from "next/server";
import { hash } from "bcryptjs";
import { db } from "@/lib/db";
import {FieldPacket, RowDataPacket} from "mysql2";

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return NextResponse.json({ error: 'Only POST allowed' });
    }

    const connection = await db();
    const { username, email, first_name, last_name, password } = await req.json();
    try {
        //encrypt password
        const hashedPassword = await hash(password, 10);
        type UserRow = {
            user_id: string;
            username: string;
            email: string;
        };
        const [rows, _]: [RowDataPacket[][], FieldPacket[]] = await connection.query(
            'CALL sp_checkuser(?, ?)',[0, username]
        );
        const user = rows[0][0] as UserRow;

        // accept if username is unique
        if(!user) {
            //check email
            const [rows_for_email, _]: [RowDataPacket[][], FieldPacket[]] = await connection.query(
                'CALL sp_checkemail(?, ?)',[0, email]
            );
            const user_for_email = rows_for_email[0][0] as UserRow;

            //accept if email is unique
            if(!user_for_email) {
                await connection.query('CALL sp_saveuser(?, ?, ?, ?, ?, ?)', [0, username, email, first_name, last_name, hashedPassword]);
                return NextResponse.json({ success: true }, { status: 200 });
            }else{//reject if email is duplicate
                return NextResponse.json({ error: "Email found, use another email" }, {status: 500});
            }
        }
        else{
            //reject if username is not unique
            return NextResponse.json({ error: "Username found, try another name" }, {status: 500});
        }
    } catch (error) {
        let errorMessage = "An unknown error occurred";

        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === "string") {
            errorMessage = error;
        } else if (typeof error === "object" && error !== null) {
            errorMessage = JSON.stringify(error);
        }
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    } finally {
        await connection.end();
    }
}
