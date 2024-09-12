import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup } from "@/components/ui/radio-group";
import SingleQuizCardOption from "./SingleQuizCardOption";
import React from "react";

type Props = {
  question: string;
  questionNo: number;
  options?: string[];
  onAnswerChange: (questionNo: number, answer: string) => void;
  selectedAnswer?: string;
};

export default function SingleQuizCard({
  question,
  options,
  questionNo,
  onAnswerChange,
  selectedAnswer,
}: Props) {
  return (
    <Card className="mb-3">
      <CardHeader>
        <CardTitle className="text-[20px] leading-5">{questionNo}. {question}</CardTitle>
      </CardHeader>
      <CardContent>
        {options && (
          <RadioGroup value={selectedAnswer} onValueChange={(value) => onAnswerChange(questionNo, value)}>
            {options.map((option, index) => (
              <SingleQuizCardOption key={index} option={option} value={option} />
            ))}
          </RadioGroup>
        )}
      </CardContent>
    </Card>
  );
}
