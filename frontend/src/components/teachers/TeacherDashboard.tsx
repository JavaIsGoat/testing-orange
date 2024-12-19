import { useContext } from "react";
import { TeacherContext } from "../../App";

const TeacherDashboard: React.FC = () => {
  const context = useContext(TeacherContext);

  if (!context) {
    throw new Error("TeacherDashboard must be used within TeacherContext");
  }

  const { teacher } = context;

  if (!teacher) {
    return <div>Please log in to view your dashboard.</div>;
  }

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <p>Welcome back, {teacher.name}!</p>
      <div>
        <h2>Your Tests</h2>
      </div>
    </div>
  );
};

export default TeacherDashboard;
