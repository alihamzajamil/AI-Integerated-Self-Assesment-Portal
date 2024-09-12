import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export async function isAuthenticated(request: NextRequest) {
    try {
        const token = request.cookies.get("accessToken")?.value || "";

        if (!token) {
            throw new Error("Access token not found");
        }

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
        return decoded.id as string; 
    } catch (error: any) {
        if (error.message === "Access token not found") {
            throw new Error("User not authenticated");
        }
        throw new Error(error.message);
    }
}

export function isAdmin(user : any) {
    // Check if the user's role is 'admin'
    const admin = user && user.role === "admin";
    return admin;
}
