import CreateQuiz from "@/components/quiz/create/CreateQuiz";
import React from "react";

type Props = {};

export default function createPage({}: Props) {
  return (
    <section className="my-16">
      <h1 className="text-2xl font-bold text-center py-4">Create New Quiz</h1>
      <CreateQuiz/>
    </section>
  );
}
