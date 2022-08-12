import { Routes, Route, useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import logo from "./rustacean.svg";
import "./App.css";
import Calendar from "./Calendar";
import DiaryEntry from "./DiaryEntry";
import Chart from "./Chart";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import { Button, Image, Menu } from "semantic-ui-react";
import { NavigationBar } from "./components/NavigationBar";

function RequireAuth() {
  let auth = localStorage.getItem("auth");
  let location = useLocation();

  if (!auth) {
    console.log("unauthed")
    return <Navigate to="/" state={{ from: location }} />;
  }
  return <Outlet />
}


function App() {
  let navigate = useNavigate();
  return (
    <div className="App">
      <NavigationBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<RequireAuth />}>
          <Route path="/calendar" element={<Calendar/>} />
          <Route path="diary/:entryDate" element={<DiaryEntry />} />
          <Route path="chart" element={<Chart />} />
        </Route>
      </Routes>
    </div >
  );
}

export default App;
