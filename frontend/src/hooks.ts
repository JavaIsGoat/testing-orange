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
      // e.clipboardData is initially empty, but we can set it to the
      // data that we want copied onto the clipboard.
      // e.clipboardData?.setData("text/plain", "Hello, world!");
      // e.clipboardData?.setData("text/html", "<b>Hello, world!</b>");

      // This is necessary to prevent the current document selection from
      // being written to the clipboard.
      e.preventDefault();
      const copiedText = e.clipboardData?.getData("text/plain");
      e.clipboardData?.setData("text/html", "<b>Hello, world!</b>");

      addLog(`Copied text: ${copiedText}`, true);
    };

    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("copy", handleCopy);

    return () => {
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("copy", handleCopy);
    };
  }, [addLog]);
};
