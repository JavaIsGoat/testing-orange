import React, { useState, useEffect, useRef } from "react";
import "./Demo.css";
import Start from "./components/Start";
import Editor from "./components/Editor";
import End from "./components/End";
import { ScreenType, TestType, LogEntry } from "./types";
import Marking from "./components/Marking/Marking";

interface IActivityLogContext {
  activityLog: LogEntry[];
  setActivityLog: React.Dispatch<React.SetStateAction<LogEntry[]>>;
}

export const ActivityLogContext = React.createContext(
  {} as IActivityLogContext
);

const Demo: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>(
    ScreenType.START
  );
  const [testType, setTestType] = useState<TestType>(TestType.COMP_SCI);
  const [editorContent, setEditorContent] = useState("");
  const [activityLog, setActivityLog] = useState<LogEntry[]>([]);
  const [submittedText, setSubmittedText] = useState("");
  // State to store user answers
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // State to store marks and feedback from server
  const [marksAndFeedback, setMarksAndFeedback] = useState<
    Record<number, { marks_awarded: number; feedback: string }>
  >({});

  const [submitError, setSubmitError] = useState<string | null>(null);

  const addLog = (message: string, sus: boolean = false) => {
    const timestamp = new Date().toLocaleTimeString();
    setActivityLog((prev) => [...prev, { message, sus, timestamp }]);
  };

  const handleRestart = () => {
    setEditorContent("");
    setActivityLog([]);
    setSubmittedText("");
    setCurrentScreen(ScreenType.START);
  };

  const handleStart = (selectedTestType: TestType) => {
    setTestType(selectedTestType);
    setCurrentScreen(ScreenType.EDITOR);
    // requestFullScreen();
  };

  const requestFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
    // else if (elem.mozRequestFullScreen) {
    //   /* Firefox */
    //   elem.mozRequestFullScreen();
    // } else if (elem.webkitRequestFullscreen) {
    //   /* Chrome, Safari & Opera */
    //   elem.webkitRequestFullscreen();
    // } else if (elem.msRequestFullscreen) {
    //   /* IE/Edge */
    //   elem.msRequestFullscreen();
    // }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        addLog("Tab or window lost focus.", true);
      } else {
        addLog("Tab or window gained focus.", true);
      }
    };
    const handleWindowBlur = () => {
      addLog("Window lost focus.", true);
    };
    const handleWindowFocus = () => {
      addLog("Window gained focus.", true);
    };

    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ""; // Some browsers require returnValue to be set
    };

    if (currentScreen === ScreenType.EDITOR) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    } else {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [currentScreen]);

  return (
    <ActivityLogContext.Provider value={{ activityLog, setActivityLog }}>
      <div className="DemoContainer">
        {currentScreen === ScreenType.START && <Start onStart={handleStart} />}
        {currentScreen === ScreenType.EDITOR && (
          <Marking
            // question={questions[testType]}
            testType={testType}
            answers={answers}
            setAnswers={setAnswers}
            setMarksAndFeedback={setMarksAndFeedback}
            setSubmitError={setSubmitError}
            setCurrentScreen={setCurrentScreen}
          />
        )}
        {currentScreen === ScreenType.END && (
          <End
            submittedText={submittedText}
            onRestart={handleRestart}
            marksAndFeedback={marksAndFeedback}
            submitError={submitError}
            answers={answers}
          />
        )}
      </div>
    </ActivityLogContext.Provider>
  );
};

export default Demo;
