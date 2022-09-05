import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar  from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getDate} from "./Date";
import './App.css';

function Home() {
    const [value, onChange] = useState(new Date());
    let navigate = useNavigate();
    let handleClickedDay = (value: Date) => {
        let entryDate = getDate(value);
        navigate("/diary/" + entryDate);
    };

    return (
        <>
            <h3>Select a date to add or view a diary entry</h3>
            <Calendar onChange={onChange} value={value} onClickDay={handleClickedDay} />
        </>
    );
};

export default Home;
