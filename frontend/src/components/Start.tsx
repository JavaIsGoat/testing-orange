import React from "react";
import { ScreenType, TestType } from "../types";
// import "./StartScreen.css"; // Optional: Separate CSS for each component

interface StartScreenProps {
  onStart: (testType: TestType) => void;
}

const Start: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="Screen ActiveScreen">
      <h1 className="Title">Welcome to an Online Test</h1>
      <p className="Description">
        This is a closed-book test with <b>in-person proctoring</b>. This
        application can track your <b>copy, cut, and paste</b> actions, as well
        as detect when you <b>switch tabs or change the browser window</b>.
      </p>
      <p className="Description">
        There are invigilators in this classroom to make sure students do not
        communicate with each other. Reference documents and phones are not
        permitted.
      </p>
      <div className="Buttons">
        <button className="Button" onClick={() => onStart(TestType.COMP_SCI)}>
          Start IGCSE Computer Science Test
        </button>
      </div>
    </div>
  );
};

export default Start;
