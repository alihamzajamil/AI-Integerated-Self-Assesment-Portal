// api/register.ts
import { connect } from "@/dbConfig/database";
import { User, IUser } from "@/models/User";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      userName,
      email,
      password,
      confirmPassword,
      educationLevel,
    } = body as {
      fullName: string;
      userName: string;
      email: string;
      password: string;
      confirmPassword: string;
      educationLevel: string;
    };

    // Validate if any required field is blank
    if (!fullName || !userName || !email || !password || !confirmPassword || !educationLevel) {
      return NextResponse.json(
        { error: "Please fill in all fields" },
        { status: 400 }
      );
    }

    // Check for existing email or username

    const existingEmailOrUsername = await User.findOne({ $or: [{ email }, { userName }]  });
    if (existingEmailOrUsername) {
      return NextResponse.json(
        { error: "Email and Username already exists" },
        { status: 400 }
      );
    }

    // Check for Existing Email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // Check for Existing Username
    const existingUserName = await User.findOne({ userName });
    if (existingUserName) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create New User
    const newUser: IUser = new User({
      fullName,
      userName,
      email,
      password: hashPassword,
      educationLevel,
      role:'user'
    });
    await newUser.save();

    return NextResponse.json(
      { message: "Registered Successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
