import { useContext } from "react";
import { StudentContext } from "./App";

export function useStudent() {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error("StudentDashboard must be used within StudentContext");
  }
  return context;
}
