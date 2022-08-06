import { Routes, Route, Link, useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import logo from "./rustacean.svg";
import "./App.css";
import Calendar from "./Calendar";
import DiaryEntry from "./DiaryEntry";
import Chart from "./Chart";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import { Button, Menu } from "semantic-ui-react";

function RequireAuth() {
  let auth = localStorage.getItem("auth_token");
  let location = useLocation();

  if (!auth) {
    console.log("unauthed")
    return <Navigate to="/" state={{ from: location }} />;
  }
  return <Outlet />
}


function App() {
  let navigate = useNavigate();
  let navigateHome = () => navigate("/");
  let navigateLogin = () => navigate("/login");
  let navigateSignup = () => navigate("/signup");
  return (
    <div className="App">
      <Menu>
        <Menu.Item>
          <img src={logo} onClick={navigateHome}/>
        </Menu.Item>
        <Menu.Item position='right'>
          <Button onClick={navigateLogin} content="Log In"/>
          <Button style={{ marginLeft: '0.5em' }} onClick={navigateSignup} content="Sign Up"/>
        </Menu.Item>
      </Menu>
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
