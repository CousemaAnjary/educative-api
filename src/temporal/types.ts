export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
  role: "student" | "teacher" | "admin";
}

export interface EducationalContent {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  questions: ExerciseQuestion[];
  category: string;
  difficulty: "easy" | "medium" | "hard";
  createdAt: string;
}

export interface ExerciseQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  type: "multiple_choice" | "true_false" | "short_answer";
}

export interface ExerciseResult {
  id: string;
  exerciseId: string;
  userId: string;
  score: number;
  answers: Record<string, string>;
  createdAt: string;
}

export interface Notification {
  type: string;
  status: "success" | "error" | "warning";
  message: string;
  data?: any;
}

export interface UserResponse {
  exerciseId: string;
  answers: Record<string, string>;
}

export interface Correction {
  exerciseId: string;
  userId: string;
  score: number;
  feedback: string;
}
