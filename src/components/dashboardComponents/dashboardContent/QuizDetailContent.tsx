"use client";

import { useQuizStore } from "@/store/useQuizStore";
import { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuizDetailContentProps {
  id: string;
}

const QuizDetailContent: React.FC<QuizDetailContentProps> = ({ id }) => {
  const { loading, quizDataById, fetchQuizById } = useQuizStore();

  useEffect(() => {
    fetchQuizById(id);
  }, [fetchQuizById, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!quizDataById) {
    return <div>No quiz data found.</div>;
  }

  const { quizSelections, quizData, score } = quizDataById;

  return (
    <div className="p-4 space-y-6">
     <Card className="mb-6 p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg rounded-xl">
  <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 mx-4 md:mx-10 text-white">
    <CardHeader className="w-full md:w-auto">
      <CardTitle className="text-2xl font-bold mb-2">Quiz Details</CardTitle>
      <CardDescription className="text-sm">
        <div className="mb-1"><strong>Quiz ID:</strong> {quizDataById._id}</div>
        <div><strong>User ID:</strong> {quizDataById.userId}</div>
      </CardDescription>
    </CardHeader>
    <CardContent className="w-full md:w-auto mt-4 md:mt-0">
      <div className="space-y-2">
        <div><strong>Education Level:</strong> {quizSelections.educationLevel}</div>
        <div><strong>Language:</strong> {quizSelections.language}</div>
        <div><strong>No. of Questions:</strong> {quizSelections.noOfQuestions}</div>
        <div><strong>Question Type:</strong> {quizSelections.questionType}</div>
        <div><strong>Quiz Option:</strong> {quizSelections.quizOption}</div>
      </div>
    </CardContent>
  </div>
  <CardFooter className="flex justify-end mt-4">
    <div className="text-xl font-semibold">Score: {score}</div>
  </CardFooter>
</Card>


      <Card className="bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-200">
        <CardHeader className="border-b">
          <CardTitle className="text-lg font-medium">Questions</CardTitle>
          <div><strong>Quiz Topic:</strong> {quizSelections.textArea}</div>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          {quizData.map((question, index) => (
            <div key={index} className="p-4 border-b">
              <div className="font-semibold">
                Question {index + 1}: {question.questionText}
              </div>
              <div className="mt-2 space-y-1">
                {question.options.map((option, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded-lg transition-colors duration-200 ${
                      option === question.correctAnswer
                        ? "bg-green-100 text-green-800"
                        : ""
                    } ${
                      option === question.selectedAnswer &&
                      option !== question.correctAnswer
                        ? "bg-red-100 text-red-800"
                        : ""
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <strong>Explanation:</strong> {question.explanation}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizDetailContent;
