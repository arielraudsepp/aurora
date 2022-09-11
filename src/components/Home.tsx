import { useNavigate } from "react-router-dom";
import { Button, Segment, Container, Header, Image } from "semantic-ui-react";
import logo from "../rustacean.svg";

function Home() {
    let navigate = useNavigate();
    let navigateSignup = () => navigate("/signup");
    return (
        <>
            <Container text>
                <Header as='h1'
                    style={{
                        fontSize: '4em',
                        fontWeight: 'normal',
                        marginBottom: 0,
                        marginTop: '2em',
                    }}>

                    <Image src={logo} />
                    DBT Skills Tracker
                </Header>
                <Header
                    as='h2'
                    content='Helps you track and view DBT skill use'

                    style={{
                        fontSize: '1.7em',
                        fontWeight: 'normal',
                        marginTop: '1.5em',
                    }}
                />
                <Button primary size='huge' onClick={navigateSignup}>
                    Get Started
                </Button>
            </Container>

            <Segment style={{ padding: '8em 0em' }} vertical>
                <Container text>
                    <Header as='h3' style={{ fontSize: '2em' }}>
                        Tell Me More
                    </Header>
                    <p style={{ fontSize: '1.33em' }}>
                        DBT (Dialectial Behavioural Theray) skill tracker replaces your paper DBT diary card. A diary card is a tool unique used in DBT.
                        It helps track when symptoms occur and which skills are used to cope with those symptoms.
                    </p>
                </Container>
            </Segment>
        </>
    );
}

export default Home;
