import "./App.css";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Profile from "./pages/create/Create";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route exact path="/" element={<Landing />} />

          <Route path="create" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
