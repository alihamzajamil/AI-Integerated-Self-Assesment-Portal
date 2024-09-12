import { Schema, Document, model, models } from 'mongoose';

export interface IQuiz extends Document {
  userId: Schema.Types.ObjectId;
  quizData: Array<{
    questionText: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    selectedAnswer: string;
  }>;
  score: number;
  quizSelections: {
    educationLevel: string;
    language: string;
    noOfQuestions: number;
    questionType: string;
    quizOption: string;
    textArea: string;
  };
}

const quizSchema: Schema<IQuiz> = new Schema<IQuiz>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quizSelections: {
    educationLevel: {
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true
    },
    noOfQuestions: {
      type: Number,
      required: true
    },
    questionType: {
      type: String,
      required: true
    },
    quizOption: {
      type: String,
      required: true
    },
    textArea: {
      type: String,
      required: true
    }
  },
  quizData: [{
    questionText: {
      type: String,
      required: true
    },
    options: {
      type: [String],
      required: true
    },
    correctAnswer: {
      type: String,
      required: true
    },
    explanation: {
      type: String,
      required: true
    },
    selectedAnswer: {
      type: String,
      required: true
    }
  }],
  score: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

export const Quiz = models.Quiz || model<IQuiz>('Quiz', quizSchema);
