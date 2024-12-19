// HTTP Status Codes

export enum StatusCode {
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  INTERNAL_ERROR = 500,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  CONFLICT = 409,
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
}

export interface Question {
  questionNumber: number;
  questionText: string;
  maximumMarks: number;
  markScheme: string[];
}

export type Answer = {
  answer: string;
  mark_awarded?: number;
  ai_feedback?: string;
  teacher_feedback?: string;
};

export let answers: Record<string, Answer> = {
  "123": {
    answer: "12345",
    mark_awarded: 10,
    ai_feedback: "",
    teacher_feedback: "",
  },
  "456": {
    answer: "joemama",
    mark_awarded: 1,
    ai_feedback: "",
    teacher_feedback: "",
  },
};
