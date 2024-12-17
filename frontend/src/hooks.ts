import { useContext } from "react";
import { StudentContext } from "./App";
import { useEffect } from "react";

export function useStudent() {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error("StudentDashboard must be used within StudentContext");
  }
  return context;
}

interface ActivityTrackerOptions {
  addLog: (message: string, sus: boolean, data?: string) => void;
}

export const useActivityTracker = ({ addLog }: ActivityTrackerOptions) => {
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

    const handleCopy = (e: ClipboardEvent) => {
      const copiedText = window.getSelection()?.toString();
      if (copiedText) {
        addLog(`Copied text: ${copiedText}`, true, copiedText);
      }
    };

    const handleCut = (e: ClipboardEvent) => {
      const cutText = window.getSelection()?.toString();
      if (cutText) {
        addLog(`Cut text: ${cutText}`, true, cutText);
      }
    };
    const handlePaste = async (e: ClipboardEvent) => {
      // Get pasted content from clipboard event
      const pastedText = e.clipboardData?.getData("text");
      if (pastedText) {
        addLog(`Pasted text: ${pastedText}`, true, pastedText);
      }
    };

    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("cut", handleCut);
    document.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("cut", handleCut);
      document.removeEventListener("paste", handlePaste);
    };
  }, [addLog]);
};
