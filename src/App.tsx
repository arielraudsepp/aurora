import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import "./App.css";
import Calendar from "./components/Calendar";
import DiaryEntry from "./components/DiaryEntry";
import Chart from "./Chart";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
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
    return (
        <div className="App">
            <NavigationBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route element={<RequireAuth />}>
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="diary/:entryDate" element={<DiaryEntry />} />
                    <Route path="chart" element={<Chart />} />
                </Route>
            </Routes>
        </div >
    );
}

export default App;
