import React, { useContext, useState } from "react";
import axios from "axios";
import "./Marking.css";
import {
  Question,
  questions,
  MarkResponse,
  TestType,
  ScreenType,
} from "../..//types";
import { basePrompt } from "../../texts/prompts";
import { ActivityLogContext } from "../../Demo";

const apiUrl = process.env.REACT_APP_BACKEND_URL!;

interface EditorScreenProps {
  // question: string;
  testType: TestType;
  answers: Record<number, string>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  setMarksAndFeedback: React.Dispatch<
    React.SetStateAction<
      Record<number, { marks_awarded: number; feedback: string }>
    >
  >;
  setSubmitError: (error: string | null) => void;
  setCurrentScreen: (screen: ScreenType) => void;
}

const Marking = (props: EditorScreenProps) => {
  // Loading and error states
  const [loading, setLoading] = useState<boolean>(false);

  const { setActivityLog } = useContext(ActivityLogContext);

  // Handler for input changes
  const handleChange = (questionNumber: number, value: string) => {
    props.setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionNumber]: value,
    }));
  };

  // Handler for form submission
  const handleSubmit = async () => {
    // Validate that all questions have been answered
    const unanswered = questions.filter(
      (q) =>
        !props.answers[q.questionNumber] ||
        props.answers[q.questionNumber].trim() === ""
    );
    if (unanswered.length > 0) {
      alert("Please answer all questions before submitting.");
      return;
    }
    let promptText = basePrompt;

    questions.forEach((q) => {
      promptText += `
  Question ${q.questionNumber} [${q.maximumMarks} marks]
  ${q.questionText}
  Marking Scheme:
  ${q.markScheme.join("\n")}
  `;
    });

    promptText += `
  # Student answer
  Below is a student's answer. Assess it according to the mark scheme.
  `;

    questions.forEach((q) => {
      promptText += `
  Question ${q.questionNumber}:
  ${props.answers[q.questionNumber]}
  `;
    });

    const payload = {
      prompt: promptText,
      num_questions: questions.map((q) => q.questionNumber),
    };

    try {
      setLoading(true);
      props.setSubmitError(null);

      // Make POST request using Axios with JSON payload
      const response = await axios.post<MarkResponse>(apiUrl, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Process server response
      console.log("received data");
      const data = response.data;
      const processedData: Record<
        number,
        { marks_awarded: number; feedback: string }
      > = {};

      questions.forEach((q) => {
        const key = `question_${q.questionNumber}`;
        if (data[key]) {
          processedData[q.questionNumber] = {
            marks_awarded: data[key].marks_awarded,
            feedback: data[key].feedback,
          };
        }
      });

      props.setMarksAndFeedback(processedData);
    } catch (err: any) {
      console.error(err);
      props.setSubmitError(
        "An error occurred while submitting your answers. Please try again."
      );
    } finally {
      setLoading(false);
      props.setCurrentScreen(ScreenType.END);
    }
  };
  const addLog = (message: string, sus: boolean = false) => {
    const timestamp = new Date().toLocaleTimeString();
    setActivityLog((prev) => [...prev, { message, sus, timestamp }]);
  };

  return (
    <div className="marking-container">
      {questions.map((question) => (
        <div key={question.questionNumber} className="question-block">
          <h2>
            Question {question.questionNumber} (Max {question.maximumMarks}{" "}
            marks)
          </h2>
          <p
            onCopy={() => addLog("Content copied.", true)}
            onCut={() => addLog("Content cut.", true)}
          >
            {question.questionText}
          </p>
          <textarea
            className="answer-input"
            value={props.answers[question.questionNumber] || ""}
            onChange={(e) =>
              handleChange(question.questionNumber, e.target.value)
            }
            placeholder="Type your answer here..."
            onPaste={() => addLog("Content pasted.", true)}
            onFocus={() => addLog("Editor focused.")}
            onBlur={() => addLog("Editor lost focus.")}
          />
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="submit-button"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};

export default Marking;
