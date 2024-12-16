import React, { useContext } from "react";
import { TestType, LogEntry } from "../types";
import { ActivityLogContext } from "../Demo";
// import "./EditorScreen.css"; // Optional: Separate CSS for each component

interface EditorScreenProps {
  testType: TestType;
  editorContent: string;
  setEditorContent: (content: string) => void;
  onSubmit: () => void;
  addLog: (message: string, sus?: boolean) => void;
}

const Editor: React.FC = () => {
  const activityLog = useContext(ActivityLogContext);
  return (
    <div
    //   className="Screen ActiveScreen"
    //   onCopy={() => addLog("Content copied.", true)}
    //   onCut={() => addLog("Content cut.", true)}
    //   onPaste={() => addLog("Content pasted.", true)}
    //   onFocus={() => addLog("Editor focused.")}
    //   onBlur={() => addLog("Editor lost focus.")}
    >
      {/* <h2 className="Title">{question}</h2>
      <textarea
        className="Editor"
        value={editorContent}
        onChange={(e) => setEditorContent(e.target.value)}
        placeholder="Start typing here..."
        onCopy={() => addLog("Content copied.", true)}
        onCut={() => addLog("Content cut.", true)}
        onPaste={() => addLog("Content pasted.", true)}
        onFocus={() => addLog("Editor focused.")}
        onBlur={() => addLog("Editor lost focus.")}
      />
      <button className="Button" onClick={onSubmit}>
        Submit
      </button> */}
    </div>
  );
};

export default Editor;
