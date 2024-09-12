// components/QuizCard.tsx
import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface QuizData {
  educationLevel: string;
  language: string;
  noOfQuestions: number;
  questionType: string;
  quizOption: string;
  textArea: string;
}

interface Props {
  quizData: QuizData[];
  loading: boolean;
}

const QuizCard: React.FC<Props> = ({ quizData, loading }) => {
  
  if (!quizData || quizData.length === 0) {
    return <div className="text-center py-8 text-lg font-semibold text-gray-500">No quiz data found.</div>;
  }
  return (
    <>
      {loading ? (
        'loading...'
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {quizData && quizData?.map((selection, index) => (
            <Card
              key={index}
              className="sm:col-span-2 bg-white"
              x-chunk="dashboard-05-chunk-0"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between ">
                  <CardTitle>
                    No.of Questions: {selection?.quizSelections?.noOfQuestions}
                  </CardTitle>
                  <CardTitle className="text-md text-gray-400">
                    Option: {selection?.quizSelections?.quizOption}
                  </CardTitle>
                </div>

                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  {selection?.quizSelections?.textArea}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href={`/dashboard/quiz/${selection?._id}`}>
                <Button className="bg-black text-white">View Details</Button>
                </Link>
                
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default QuizCard;
