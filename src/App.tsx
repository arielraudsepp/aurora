import { Routes, Route, Link } from "react-router-dom";
import logo from "./rustacean.svg";
import "./App.css";
import Home from "./Home";
import DiaryEntry from "./DiaryEntry";

function App() {
  return (
    <div className="App">
      <h1 className="ui header">
        <img src={logo} className="ui circular image" />
        <Link to="/">DBT Skills</Link>
      </h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="diary/:entryDate" element={<DiaryEntry />} />
      </Routes>
    </div>
  );
}

export default App;
