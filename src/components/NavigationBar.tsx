import logo from "../rustacean.svg";
import { BsFillCalendarPlusFill } from "react-icons/bs";
import { Button, Image, Menu } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUsername } from "../FetchAPI";


function Unauthenticated() {
    let navigate = useNavigate();
    const navigateLogin = () => navigate("/login");
    const navigateSignup = () => navigate("/signup");
      return (
          <Menu.Item position='right'>
              <Button primary={true} onClick={navigateLogin} content="Log In"/>
              <Button primary={true} style={{ marginLeft: '0.5em' }} onClick={navigateSignup} content="Sign Up"/>
          </Menu.Item>
      );
}

function Authenticated() {
    let navigate = useNavigate();
    const [username, setUsername] = useState<string>('');

    const navigateHome = () => {
        localStorage.removeItem("auth");
        navigate("");
    };

    const navigateToCalendar = () => {
        navigate("/calendar");
    };

    useEffect(() => {
        getUsername().then(setUsername);
    }, []);

    return (
        <Menu.Item position='right'>
            <Menu.Item>
            <h3>Hi {username} </h3>
            </Menu.Item>
            <a href="/calendar"> <BsFillCalendarPlusFill size={35}/> </a>
            <Button primary={true}  style={{ marginLeft: '1.0em' }} onClick={navigateHome} content="Log Out"/>
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
                <Image src={logo} alt='' width="50" height="50"  style={{ marginRight: '0.5em' }}/>
                DBT Skills Tracker
            </Menu.Item>
            { auth ? <Authenticated/> : <Unauthenticated/> }
        </Menu>
    )
}
