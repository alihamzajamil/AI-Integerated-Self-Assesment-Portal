"use client";
import React, { useState } from "react";
import QuizCreateCard from "@/components/quiz/create/QuizCreateCard";
import ViewQuiz from "@/components/quiz/create/ViewQuiz";
import { QuizType } from "@/types/common";

type Props = {};

export default function CreateQuiz({}: Props) {
  const [quiz, setQuiz] = useState<QuizType[] | []>([]);
  const [loading, setLoading] = useState(false);
  const getQuiz = (quiz: QuizType[]) => {
    setQuiz(quiz);
  };
  return (
    <div className="bg-white shadow-md rounded-lg p-8 flex flex-col lg:flex-row justify-between mx-16">
      <QuizCreateCard getQuizData={getQuiz} loading={setLoading} />
      <ViewQuiz loading={loading} quizData={quiz} />
    </div>
  );
}
