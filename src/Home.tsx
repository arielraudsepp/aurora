import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Calendar  from "react-calendar";
import "react-calendar/dist/Calendar.css";
import UIButton from "./components/Button";
import { retreiveDiaryEntry } from "./FetchAPI";
import { getDate} from "./Date";

function Home() {
    const [value, onChange] = useState(new Date());
    let navigate = useNavigate();
    let handleClickedDay = (value: Date) => {
        let entryDate = getDate(value);
        navigate("/diary/" + entryDate);
    };
    return (
        <>
            <h2>Welcome!</h2>
            <Calendar onChange={onChange} value={value} onClickDay={handleClickedDay}/>
        </>
    );
};

export default Home;
