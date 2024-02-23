import logo from "../rustacean.svg";
import calendar from "../calendar.png";
import { Button, Image, Menu } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getName } from "../FetchAPI";

function Unauthenticated() {
    let navigate = useNavigate();
    const navigateLogin = () => navigate("/login");
    const navigateRegister = () => navigate("/register");
    return (
        <Menu.Item position='right'>
            <Button primary={true} onClick={navigateLogin} content="Log In" />
            <Button primary={true} style={{ marginLeft: '0.5em' }} onClick={navigateRegister} content="Sign Up" />
        </Menu.Item>
    );
}

function Authenticated() {
    let navigate = useNavigate();
    const [name, setName] = useState<string>('');

    const navigateHome = () => {
        localStorage.removeItem("auth");
        navigate("");
    };

    const navigateCalendar = () => {
        navigate("/calendar");
    };

    useEffect(() => {
        getName().then(setName);
    }, []);

    return (
        <Menu.Item position='right'>
            <Menu.Item>
                <h3>Welcome {name} </h3>
            </Menu.Item>
            <Menu.Item as='a' header onClick={navigateCalendar}>
                <Image src={calendar} alt='' width="50" height="50" style={{ marginRight: '0.5em' }} />
            </Menu.Item>
            <Button primary={true} style={{ marginLeft: '1.0em' }} onClick={navigateHome} content="Log Out" />
        </Menu.Item>
    )
}

export function NavigationBar() {
    let navigate = useNavigate();
    let navigateHome = () => navigate("/");
    let auth = localStorage.getItem("auth");
    return (
        <Menu>
            <Menu.Item as='a' header onClick={navigateHome}>
                <Image src={logo} alt='' width="50" height="50" style={{ marginRight: '0.5em' }} />
                DBT Skills Tracker
            </Menu.Item>
            {auth ? <Authenticated /> : <Unauthenticated />}
        </Menu>
    )
}
