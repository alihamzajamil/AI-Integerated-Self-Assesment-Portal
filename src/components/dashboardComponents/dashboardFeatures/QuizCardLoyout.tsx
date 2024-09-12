'use client';

// components/QuizCardLayout.tsx
import React, { useEffect } from 'react';
import QuizCard from './QuizCard';
import { useQuizStore } from '@/store/useQuizStore';

const QuizCardLayout: React.FC = () => {
  const { loading, fetchQuizData, quizData } = useQuizStore();

  useEffect(() => {
    fetchQuizData();
  }, [fetchQuizData]);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <QuizCard quizData={quizData || []} loading={loading} />
      </div>
    </div>
  );
};

export default QuizCardLayout;
