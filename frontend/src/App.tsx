import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { createContext, useState, useContext, ReactNode } from "react";
import Demo from "./Demo";
import Test from "./components/students/Test";
import { Container } from "@radix-ui/themes/dist/cjs/components/container";
import PreTest from "./components/students/PreTest";
import TeacherDashboard from "./components/teachers/TeacherDashboard";
import Answers from "./components/teachers/Answers";

// Types
interface Student {
  id: string;
  name: string;
}

interface Teacher {
  id: string;
  name: string;
  subjects: string[];
  assignedTests: string[];
}

interface StudentContextType {
  student: Student | null;
  setStudent: React.Dispatch<React.SetStateAction<Student | null>>;
}

interface TeacherContextType {
  teacher: Teacher | null;
  setTeacher: React.Dispatch<React.SetStateAction<Teacher | null>>;
}

// Context Creation
export const StudentContext = createContext<StudentContextType | null>(null);
export const TeacherContext = createContext<TeacherContextType | null>(null);

// Layout Components
interface LayoutProps {
  children: ReactNode;
}

const StudentProvider: React.FC = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    setStudent(null);
    navigate("/");
  };

  const contextValue: StudentContextType = {
    student,
    setStudent,
  };

  return (
    <StudentContext.Provider value={contextValue}>
      <Container>
        <nav className="Navigation">
          <div className="Container NavigationContainer">
            <div className="NavigationLinks">
              <Link to="/student" className="NavigationLink">
                Dashboard
              </Link>
              <Link to="/student/test" className="NavigationLink">
                Take Test
              </Link>
            </div>
            {student && (
              <div className="UserSection">
                <span>Welcome, {student.name}</span>
                <button onClick={handleLogout} className="Button ButtonPrimary">
                  Logout
                </button>
              </div>
            )}
            <hr></hr>
          </div>
        </nav>
        <main className="Container MainContent">
          <Outlet />
        </main>

        <footer className="Footer">
          <div className="Container">
            <p className="Text">Student Portal - Need help? Contact support</p>
          </div>
        </footer>
      </Container>
    </StudentContext.Provider>
  );
};

const TeacherLayout: React.FC = () => {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    setTeacher(null);
    navigate("/");
  };

  const contextValue: TeacherContextType = {
    teacher,
    setTeacher,
  };

  return (
    <TeacherContext.Provider value={contextValue}>
      <Container>
        <nav className="bg-green-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex gap-4">
              <Link to="/teacher" className="hover:text-green-200">
                Dashboard
              </Link>
              <Link to="/teacher/mark" className="hover:text-green-200">
                Grade Tests
              </Link>
              <Link to="/teacher/create" className="hover:text-green-200">
                Create Test
              </Link>
            </div>
            {teacher && (
              <div className="flex items-center gap-4">
                <span>Welcome, {teacher.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-green-700 px-4 py-2 rounded"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>

        <main className="container mx-auto p-4">
          <Outlet />
        </main>
      </Container>
    </TeacherContext.Provider>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/demo" element={<Demo />} />

        {/* Student routes */}
        <Route path="/student" element={<StudentProvider />}>
          <Route index element={<PreTest />} />
          <Route path="test" element={<Test />} />
        </Route>

        {/* Teacher routes */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="answers" element={<Answers />} />
          {/* <Route path="create" element={<div>Create Test Page</div>} /> */}
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
