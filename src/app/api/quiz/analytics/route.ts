import { connect } from "@/dbConfig/database";
import { isAuthenticated } from "@/lib/auth";
import { Quiz } from "@/models/Quiz";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
  try {
    const userId = await isAuthenticated(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const totalAttempts = await Quiz.countDocuments({ userId: user._id });

    const totalScoreResult = await Quiz.aggregate([
      { $match: { userId: user._id } },
      {
        $group: {
          _id: null,
          totalScore: { $sum: "$score" },
        },
      },
    ]);

    const totalScore = totalScoreResult.length > 0 ? totalScoreResult[0].totalScore : 0;

    return NextResponse.json({
      totalAttempts,
      totalScore,
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
