import { connect } from "@/dbConfig/database";
import { isAuthenticated } from "@/lib/auth";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function PUT(req: NextRequest){
    try {
        const userId = await isAuthenticated(req);
        const id = await User.findById(userId);
        const body = await req.json();
        const {fullName, userName, email, educationLevel} = body;
        const updateUser = await User.findByIdAndUpdate(id, {fullName, userName, email, educationLevel}, {new: true});
        if (updateUser) {
            return NextResponse.json({ message: "User updated successfully" }, { status: 200 });
        } else {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
        
    }
}