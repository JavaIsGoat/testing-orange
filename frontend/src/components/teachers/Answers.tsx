import { Box } from "@radix-ui/themes";
import BrianWongQ from "../students/questions/BrianWong";

export interface Question {
  questionNumber: number;
  questionText: string;
  maximumMarks: number;
  markScheme: string[];
}

const questinoData = {
  maximumMarks: 2,
  markScheme: [
    "[1] India and China are the two countries with politically tense relations",
    "[1] This is because of border disputes, which have escalated in recent times.",
  ],
};

const responseData = {
  "123": {
    answer: "The answer to this question is India and China political affairs",
    mark_awarded: 1,
    ai_feedback:
      "The student got the correct answer here by outlining the two largest Asian countries that are in some geopolitically tense state. However, the student should have elaborated on why India and China have politically tense relations.",
    teacher_feedback: "AI marking is solid. Approved.",
  },
  "456": {
    answer: "The answer to this question is India and China political affairs",
    mark_awarded: 1,
    ai_feedback:
      "The student got the correct answer here by outlining the two largest Asian countries that are in some geopolitically tense state. However, the student should have elaborated on why India and China have politically tense relations.",
    teacher_feedback: "AI marking is solid. Approved.",
  },
  "789": {
    answer: "The answer to this question is India and China political affairs",
    mark_awarded: 1,
    ai_feedback:
      "The student got the correct answer here by outlining the two largest Asian countries that are in some geopolitically tense state. However, the student should have elaborated on why India and China have politically tense relations.",
    teacher_feedback: "AI marking is solid. Approved.",
  },
};

const Answers = () => {
  return (
    <Box>
      Hello
      <BrianWongQ studentAnswer={responseData[123].answer} />
    </Box>
  );
};

export default Answers;

// Scroll view:
// All students names (Q: does Bwong know student names lol?)

// Left:
// Question
// Student Answer

// Right:
// givenMark/TotalMark
// with arrows to configure and change
// AI feedback
// Provided mark scheme
// Editable teacher comment box
