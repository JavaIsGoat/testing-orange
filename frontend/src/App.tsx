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
import StudentDashboard from "./components/students/PreTest";

// Types
interface Student {
  id: string;
  name: string;
}

// interface Teacher {
//   id: string;
//   name: string;
//   subjects: string[];
//   assignedTests: string[];
// }

interface StudentContextType {
  student: Student | null;
  setStudent: React.Dispatch<React.SetStateAction<Student | null>>;
}

// interface TeacherContextType {
//   teacher: Teacher | null;
//   setTeacher: React.Dispatch<React.SetStateAction<Teacher | null>>;
//   tests: Test[];
//   setTests: React.Dispatch<React.SetStateAction<Test[]>>;
// }

// Context Creation
export const StudentContext = createContext<StudentContextType | null>(null);
// const TeacherContext = createContext<TeacherContextType | null>(null);

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
          </div>
        </nav>
        <h1>Hello</h1>
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

// const TeacherLayout: React.FC = () => {
//   const [teacher, setTeacher] = useState<Teacher | null>(null);
//   const [tests, setTests] = useState<Test[]>([]);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     setTeacher(null);
//     navigate("/");
//   };

//   const contextValue: TeacherContextType = {
//     teacher,
//     setTeacher,
//     tests,
//     setTests,
//   };

//   return (
//     <TeacherContext.Provider value={contextValue}>
//       <div className="teacher-layout">
//         <nav className="bg-green-600 text-white p-4">
//           <div className="container mx-auto flex justify-between items-center">
//             <div className="flex gap-4">
//               <Link to="/teacher" className="hover:text-green-200">
//                 Dashboard
//               </Link>
//               <Link to="/teacher/mark" className="hover:text-green-200">
//                 Grade Tests
//               </Link>
//               <Link to="/teacher/create" className="hover:text-green-200">
//                 Create Test
//               </Link>
//             </div>
//             {teacher && (
//               <div className="flex items-center gap-4">
//                 <span>Welcome, {teacher.name}</span>
//                 <button
//                   onClick={handleLogout}
//                   className="bg-green-700 px-4 py-2 rounded"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </nav>

//         <main className="container mx-auto p-4">
//           <Outlet />
//         </main>
//       </div>
//     </TeacherContext.Provider>
//   );
// };

// const TeacherDashboard: React.FC = () => {
//   const context = useContext(TeacherContext);

//   if (!context) {
//     throw new Error("TeacherDashboard must be used within TeacherContext");
//   }

//   const { teacher, tests } = context;

//   if (!teacher) {
//     return <div>Please log in to view your dashboard.</div>;
//   }

//   return (
//     <div>
//       <h1>Teacher Dashboard</h1>
//       <p>Welcome back, {teacher.name}!</p>
//       <div>
//         <h2>Your Tests</h2>
//         {tests.map((test) => (
//           <div key={test.id}>{test.title}</div>
//         ))}
//       </div>
//     </div>
//   );
// };

// Main App Component
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/demo" element={<Demo />} />

        {/* Student routes */}
        <Route path="/student" element={<StudentProvider />}>
          <Route index element={<StudentDashboard />} />
          <Route path="test" element={<Test />} />
        </Route>

        {/* Teacher routes */}
        {/* <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="mark" element={<div>Marking Page</div>} />
          <Route path="create" element={<div>Create Test Page</div>} />
        </Route> */}

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
