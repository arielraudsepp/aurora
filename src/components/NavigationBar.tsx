import logo from "../rustacean.svg";
import { Button, Image, Menu } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

function Authenticated() {
    let auth = localStorage.getItem("auth");
    let navigate = useNavigate();
    let navigateLogin = () => navigate("/login");
    let navigateSignup = () => navigate("/signup");
    let navigateHome = () => {
        localStorage.removeItem("auth");
        navigate("");
    };

    if (!auth) {
        return (
            <Menu.Item position='right'>
                <Button primary={true} onClick={navigateLogin} content="Log In"/>
                <Button primary={true} style={{ marginLeft: '0.5em' }} onClick={navigateSignup} content="Sign Up"/>
            </Menu.Item>
        )
    } else {
          return (
              <Menu.Item position='right'>
                  <Button primary={true} onClick={navigateHome} content="Log Out"/>
              </Menu.Item>
          )
    }
}

export function NavigationBar() {
    let navigate = useNavigate();
    let navigateHome = () => navigate("/");

    return (
        <Menu>
            <Menu.Item as='a' header onClick={navigateHome}>
                <Image src={logo} alt='' width="50" height="50"  style={{ marginRight: '0.5em' }}/>
                DBT Skills Tracker
            </Menu.Item>
            <Authenticated/>
        </Menu>
    )
}
