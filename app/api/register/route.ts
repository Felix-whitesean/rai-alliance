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

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return NextResponse.json({ error: 'Only POST allowed' });
    }

    const connection = await db();
    const { username, email, first_name, last_name, password } = await req.json();
    console.log("Backend received:", email);
    try {
        //encrypt password
        const hashedPassword = await hash(password, 10);
        await connection.query('CALL sp_saveuser(?, ?, ?, ?, ?, ?)', [0, username, email, first_name, last_name, hashedPassword]);
        return NextResponse.json({ success: true }, { status: 200 });
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
