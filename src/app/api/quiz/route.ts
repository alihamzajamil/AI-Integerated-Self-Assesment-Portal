import { connect } from "@/dbConfig/database";
import { isAuthenticated } from "@/lib/auth";
import { Quiz } from "@/models/Quiz";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId, quizSelections, quizData, score } = body;
    
        const createQuiz = new Quiz({
          userId,
          quizSelections,
          quizData,
          score
        });
    
        // Save the quiz
        await createQuiz.save();
    
        
    
        return NextResponse.json({ message: "Thank you for submitting the quiz" }, { status: 201 });
    } catch (error : any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest){
    try {
        const userId = await isAuthenticated(req);
        const user = await User.findById(userId);
        const quizData = await Quiz.find({userId: user})
        return NextResponse.json({ data: quizData}, {status : 200});
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}