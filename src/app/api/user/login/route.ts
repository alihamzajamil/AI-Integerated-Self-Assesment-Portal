import { User } from "@/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { connect } from "@/dbConfig/database";
import { NextRequest } from "next/server";

// connect to MongoDB
connect();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { emailOrUsername, password } = body as { emailOrUsername: string; password: string };

        if (!emailOrUsername || !password) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 401 }
            );
        }

        // Check for Existing User by email or username
        const user = await User.findOne({ 
            $or: [{ email: emailOrUsername }, { userName: emailOrUsername }] 
        });

        if (!user) {
            return NextResponse.json(
                { error: "User does not exist" },
                { status: 400 }
            );
        }

        const isMatchPassword = await bcrypt.compare(password, user.password);
        if (!isMatchPassword) {
            return NextResponse.json(
                { error: "Incorrect password" },
                { status: 400 }
            );
        }


        // Create token data
        const tokenData = {
            id: user._id,
            email: user.email,
            userName: user.userName,
        };

        // JWT Token
        const accessToken = jwt.sign(tokenData, process.env.JWT_SECRET as string, {
            expiresIn: "1d",
        });

        // Refresh Token
        const refreshToken = jwt.sign(tokenData, process.env.JWT_REFRESH_SECRET as string, {
            expiresIn: "7d",
        });

        // Save refreshToken in the user model
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        // Create response
        const response = NextResponse.json({
            message: "Login successfully",
            user,
            accessToken,
            refreshToken
        }, { status: 200 });

        // Set accessToken as HTTPOnly cookie
        response.cookies.set("accessToken", accessToken, {
            httpOnly: true,
            // Add other cookie attributes as needed, such as 'secure: true' for HTTPS
        });

        // Set refreshToken as HTTPOnly cookie
        response.cookies.set("refreshToken", refreshToken, {
            httpOnly: true,
            // Add other cookie attributes as needed, such as 'secure: true' for HTTPS
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
