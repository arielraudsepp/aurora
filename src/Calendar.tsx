import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Calendar  from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getDate} from "./Date";
import { Button, Container, Menu } from "semantic-ui-react";
import './App.css';
import logo from "./rustacean.svg";

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
            <Menu>
            <Menu.Item>
                <img src={logo} alt=''/>
            </Menu.Item>
            <Menu.Item position='right'>
                <Button primary={true} onClick={logout}> Logout </Button>
            </Menu.Item>
            </Menu>
            <h3>Select a date to add or view a diary entry</h3>

            <Calendar onChange={onChange} value={value} onClickDay={handleClickedDay} />


        </>

    );
};

export default Home;
