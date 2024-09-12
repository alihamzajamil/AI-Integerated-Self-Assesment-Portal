import { create } from 'zustand';

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

interface QuizState {
  loading: boolean;
  error: string | null;
  message: string | null;
  quizData: QuizData[] | null;
  quizDataById: QuizData | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setMessage: (message: string | null) => void;
  fetchQuizData: () => Promise<void>;
  fetchQuizById: (id: string) => Promise<void>;
  submitCreateQuiz: (formData: {
    userId: string;
    quizSelections: QuizSelections;
    quizData: QuizData[];
    score: number;
  }) => Promise<void>;
}

export const useQuizStore = create<QuizState>((set) => ({
  loading: false,
  error: null,
  message: null,
  quizData: null,
  quizDataById: null,
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setMessage: (message) => set({ message }),
  fetchQuizData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/quiz');
      if (!response.ok) {
        const errorData = await response.json();
        set({ error: errorData.error, loading: false });
        return;
      }
      const result = await response.json();
      set({ quizData: result.data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  fetchQuizById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/quiz/quizbyid?id=${id}`);
      if (!response.ok) {
        const errorData = await response.json();
        set({ error: errorData.error, loading: false });
        return;
      }
      const result = await response.json();
      set({ quizDataById: result.data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  submitCreateQuiz: async (formData) => {
    set({ loading: true, error: null, message: null });
    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        set({ error: errorData.error, loading: false });
        return;
      }

      const result = await response.json();
      set({ message: result.message, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
