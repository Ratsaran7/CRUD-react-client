import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './components/HomePage';   // นำเข้า HomePage
import CreateData from './components/CreateData'; // นำเข้า CreateData
import ViewData from './components/ViewData';   // นำเข้า ViewData
import EditData from "./components/EditData";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateData />} />
        <Route path="/view/:id" element={<ViewData />} />
        <Route path="/edit/:id" element={<EditData />} />
      </Routes>
    </Router>
  );
}

export default App;
