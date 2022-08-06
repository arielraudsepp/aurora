import { useNavigate } from "react-router-dom";
import { Button, Segment, Container, Header } from "semantic-ui-react";

function Home() {
    let navigate = useNavigate();
    let navigateSignup = () => navigate("/signup");
    return (
        <>
            <Container text>
                <Header
                    as='h1'
                    content='DBT Skills Tracker'

                    style={{
                        fontSize: '4em',
                        fontWeight: 'normal',
                        marginBottom: 0,
                        marginTop: '2em',
                    }}
                />
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
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
                    </p>
                </Container>
            </Segment>
        </>
    );
}

export default Home;
