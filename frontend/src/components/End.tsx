import React, { useState } from "react";
import { questions } from "../types";
// import "./EndScreen.css"; // Optional: Separate CSS for each component

interface EndScreenProps {
  submittedText: string;
  onRestart: () => void;
  marksAndFeedback: Record<number, { marks_awarded: number; feedback: string }>;
  submitError: string | null;
  answers: Record<number, string>;
}

const End: React.FC<EndScreenProps> = ({
  submittedText,
  onRestart,
  submitError,
  marksAndFeedback,
  answers,
}) => {
  // State to handle visibility of feedback for each question
  const [feedbackVisible, setFeedbackVisible] = useState<
    Record<number, boolean>
  >({});

  // Handler to toggle feedback visibility
  const toggleFeedback = (questionNumber: number) => {
    setFeedbackVisible((prev) => ({
      ...prev,
      [questionNumber]: !prev[questionNumber],
    }));
  };
  return (
    <div className="Screen ActiveScreen">
      <h1 className="Title">Submission Received</h1>
      <p className="Description">
        Your content and activity log has been successfully submitted. Below is
        what you submitted:
      </p>
      <div className="SubmittedContent">
        {" "}
        {questions.map((question) => (
          <div key={question.questionNumber} className="question-block">
            <h2>
              Question {question.questionNumber} (Max {question.maximumMarks}{" "}
              marks)
            </h2>
            <p>{question.questionText}</p>
            <textarea
              className="answer-input"
              value={answers[question.questionNumber] || ""}
            />
          </div>
        ))}
      </div>
      <div>
        {submitError && <p className="error-message">{submitError}</p>}

        {/* Display Marks and Feedback */}
        {Object.keys(marksAndFeedback).length > 0 && (
          <div className="results-section">
            <h2>Results</h2>
            {questions.map((question) => (
              <div key={question.questionNumber} className="result-block">
                <h3>
                  Question {question.questionNumber}:{" "}
                  {marksAndFeedback[question.questionNumber]?.marks_awarded ||
                    0}
                  /{question.maximumMarks} marks
                </h3>
                <button
                  onClick={() => toggleFeedback(question.questionNumber)}
                  className="feedback-toggle-button"
                >
                  {feedbackVisible[question.questionNumber]
                    ? "Hide Feedback"
                    : "Show Feedback"}
                </button>
                {feedbackVisible[question.questionNumber] && (
                  <p className="feedback-text">
                    {marksAndFeedback[question.questionNumber]?.feedback}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <button className="Button" onClick={onRestart}>
        Restart
      </button>
    </div>
  );
};

export default End;
