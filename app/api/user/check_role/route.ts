import {db} from "@/lib/db";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {FieldPacket, RowDataPacket} from "mysql2";
import {NextResponse} from "next/server";

export async function  GET() {
    const connection = await db();

    const session = await getServerSession(authOptions);
    let role_id = 0;
    if (!session || !session.user || !session.user.email) {
        role_id = 0;
        return NextResponse.json({role_id: role_id});
    }
    else{
        const email = session.user.email;
        const [user_rows]: [RowDataPacket[][], FieldPacket[]] = await connection.query(
            'CALL sp_getuser(?)', [email]
        );
        role_id = user_rows[0][0].privilege;
        return NextResponse.json({role_id: role_id});
    }
}