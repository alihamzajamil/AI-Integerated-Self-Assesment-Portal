import { connect } from "@/dbConfig/database";
import { isAdmin, isAuthenticated } from "@/lib/auth";
import { Quiz } from "@/models/Quiz";
import { User } from "@/models/User";

import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
    try {
        const userId = await isAuthenticated(req);

        const user = await User.findById(userId);
        if (isAdmin(user)) {
            const quizzes = await Quiz.aggregate([
                {
                  $group: {
                    _id: '$userId',
                    totalQuizzes: { $sum: 1 }, // Count of quizzes attempted per user
                    totalScore: { $sum: '$score' } // Total score per user
                  }
                },
                {
                  $lookup: {
                    from: 'users', // Collection name for users
                    localField: '_id',
                    foreignField: '_id',
                    as: 'user'
                  }
                },
                {
                  $project: {
                    _id: 0,
                    userId: '$_id',
                    totalQuizzes: 1,
                    totalScore: 1,
                    user: { $arrayElemAt: ['$user', 0] } // Extract user details
                  }
                }
              ]);
          
              return NextResponse.json(quizzes);
        } else {
            return NextResponse.json({ error: "Only admin can access this route" }, { status: 400 });
        }
     
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
