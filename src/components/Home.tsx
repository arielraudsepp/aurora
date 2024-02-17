import { useNavigate } from "react-router-dom";
import { Button, Segment, Container, Header, Image } from "semantic-ui-react";
import logo from "../rustacean.svg";

function Home() {
    let navigate = useNavigate();
    let navigateSignup = () => navigate("/signup");
    return (
        <>
            <Container text>
                <Header as='h1' className="header">
                    <Image src={logo} />
                    DBT Skills Tracker
                </Header>
                <Header
                    as='h2'
                    content='Helps you track and view DBT skill use'
                    className="sub-header"
                />
                <Button primary size='huge' onClick={navigateSignup}>
                    Get Started
                </Button>
            </Container>

            <Segment vertical>
                <Container text>
                    <Header as='h3'>
                        Tell Me More
                    </Header>
                    <p>
                        DBT (Dialectial Behavioural Theray) skill tracker replaces your paper DBT diary card. A diary card is a tool unique used in DBT.
                        It helps track when symptoms occur and which skills are used to cope with those symptoms.
                    </p>
                </Container>
            </Segment>
        </>
    );
}

export default Home;
