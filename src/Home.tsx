import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Calendar  from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getDate} from "./Date";
import { Button } from "semantic-ui-react";

function Home() {
    const [value, onChange] = useState(new Date());

    let navigate = useNavigate();

    let handleClickedDay = (value: Date) => {
        let entryDate = getDate(value);
        navigate("/diary/" + entryDate);
    };

    let logout = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        localStorage.removeItem("auth_token");
        navigate("");
    };

    return (
        <>
            <h2>Welcome!</h2>
            <Calendar onChange={onChange} value={value} onClickDay={handleClickedDay} />
            <Button content="Logout" onClick={logout} />
        </>

    );
};

export default Home;
