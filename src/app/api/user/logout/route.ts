import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Create a response object
        const response = NextResponse.json({
            message: "Logout successfully",
            success: true
        });

        // Clear the accessToken cookie by setting its expiry to a past date
        response.cookies.set("accessToken", "", {
            httpOnly: true, 
            expires: new Date(0) // Set expiry to a past date to clear the cookie
        });

        // Clear the refreshToken cookie in a similar manner, if you use one
        response.cookies.set("refreshToken", "", {
            httpOnly: true,
            expires: new Date(0) // Set expiry to a past date to clear the cookie
        });

        // Return the response
        return response;
    } catch (error: any) {
        // Handle any errors
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
