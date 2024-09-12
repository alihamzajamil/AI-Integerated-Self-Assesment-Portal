import { connect } from "@/dbConfig/database";
import { isAuthenticated } from "@/lib/auth";
import { User, IUser } from "@/models/User";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// connect to MongoDB
connect();

export async function GET(req: NextRequest) {
    try {
        const userId = await isAuthenticated(req);
        const user = await User.findOne({ _id: userId }).select("-password") as IUser;
        return NextResponse.json({ data: user }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
