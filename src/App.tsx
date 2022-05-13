import { Routes, Route, Link } from "react-router-dom";
import logo from "./rustacean.svg";
import "./App.css";
import Home from "./Home";
import DiaryEntry from "./DiaryEntry";
import Chart from "./Chart";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return (
    <div className="App">
      <h1 className="ui header">
        <img src={logo} className="ui circular image" />
        <Link to="/">DBT Skills</Link>
      </h1>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="diary/:entryDate" element={<DiaryEntry />} />
        <Route path="/chart" element={<Chart />} />
      </Routes>
    </div>
  );
}

export default App;
