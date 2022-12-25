import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Books from "./pages/Books";
import Add from "./pages/Add";
import Update from "./pages/Update";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

function App() {
  setTimeout(() => {
    AOS.refresh();
  }, 500);
  return (
    <div className="App ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
