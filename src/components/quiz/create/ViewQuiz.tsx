"use client";
import { useState, useRef, RefObject } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import SingleQuizCard from "./SingleQuizCard";
import { Button } from "@/components/ui/button";
import { Copy, FileDown, Loader, Share2 } from "lucide-react";
import { QuizType } from "@/types/common";
import generatePDF from "react-to-pdf";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/store/useUserStore";
import { useQuizStore } from "@/store/useQuizStore";
import { useRouter } from "next/navigation";

type Props = {
  loading: boolean;
  quizData: QuizType[] | [];
};

interface QuizSelections {
  educationLevel: string;
  language: string;
  noOfQuestions: number;
  questionType: string;
  quizOption: string;
  textArea: string;
}

interface QuizData {
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  selectedAnswer: string;
}

interface FormData {
  userId: string;
  quizSelections: QuizSelections;
  quizData: QuizData[];
  score: number;
}

export default function ViewQuiz({ loading, quizData }: Props) {
  const targetRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const { user } = useUser();
  const { loading: submitLoading, submitCreateQuiz } = useQuizStore();
  const router = useRouter();
  const handleAnswerChange = (questionNo: number, answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionNo]: answer }));
  };

  const handleSubmit = () => {
    const quizSelections = JSON.parse(localStorage.getItem("quizSelections") || '{}') as QuizSelections;
  
    let score = 0;
    const quizDataWithAnswers: QuizData[] = quizData.map((data, index) => {
      const selectedAnswer = selectedAnswers[index + 1] || '';
      if (selectedAnswer === data.answer) {
        score += 10; // Each correct answer gives 10 points
      }
      return {
        questionText: data.question,
        options: data.options || [],
        correctAnswer: data.answer,
        explanation: data.explanation,
        selectedAnswer,
      };
    });

    const formData: FormData = {
      userId: user._id,
      quizSelections,
      quizData: quizDataWithAnswers,
      score,
    };

    submitCreateQuiz(formData);
    localStorage.removeItem('quizSelections');
    router.push('/dashboard/quiz');
  };

  return (
    <div className="lg:w-[50%] lg:mx-4">
      {!loading && quizData.length === 0 ? (
        <div className="flex justify-center items-center h-[425px]">
          <p className="text-[16px] text-gray-400">
            Generate Quiz Will display here...
          </p>
        </div>
      ) : loading ? (
        <div className="flex justify-center h-[425px] items-center animate-pulse">
          <Loader size={60} className="animate-spin delay-150 text-slate-900" />
        </div>
      ) : (
        <div>
          <div className="flex justify-end mt-3 lg:mt-0 mb-3 mr-4">
            <div className="flex items-center gap-4">
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Share2 size={20} className="mr-2" />
                      <span>Share</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-32" align="end">
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      <span>Copy Link</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Button
                onClick={() => generatePDF(targetRef, { method: "open" })}
              >
                <FileDown size={18} className="mr-2" /> Export to PDF
              </Button>
              <Button className="bg-black text-white" onClick={handleSubmit} disabled={submitLoading}>
                {submitLoading ? "Loading..." : "Submit"}
              </Button>
            </div>
          </div>
          <ScrollArea className="h-[425px] px-4">
            <div ref={targetRef}>
              {quizData.map((item, index) => (
                <SingleQuizCard
                  key={item?.id}
                  questionNo={index + 1}
                  question={item?.question}
                  options={item?.options}
                  onAnswerChange={handleAnswerChange}
                  selectedAnswer={selectedAnswers[index + 1]}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
