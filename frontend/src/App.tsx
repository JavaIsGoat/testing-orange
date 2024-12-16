import { BrowserRouter, Routes, Route } from "react-router-dom";
import Me from "./Me";
import Demo from "./Demo";
import Marking from "./components/Marking/Marking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/me/" element={<Me />} />
        {/* <Route path="/marking" element={<Marking />} /> */}
        <Route path="/*" element={<Demo />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
