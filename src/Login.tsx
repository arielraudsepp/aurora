import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Message } from "semantic-ui-react";
import { login } from "./FetchAPI";


function Login() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [loginError, setLoginError] = useState<boolean>(false);
    const [connectionError, setConnectionError] = useState<boolean>(false);

    const onUpdateField = (e: FormEvent<HTMLInputElement>) => {
        const nextFormState = {
            ...form,
            [e.currentTarget.name]: e.currentTarget.value,
        };
        setForm(nextFormState);
    };

    let navigate = useNavigate();


    const handleSubmit = () => {
        login(JSON.stringify(form)).then((response) => {
            if (response.status === 404) {
                setLoginError(true);
                localStorage.setItem("auth", "false")
            } else if (response.ok) {
                localStorage.setItem("auth", "true");
                navigate("/calendar");
            }
        })
        .catch((error) => {
            console.log(error.message);
            setConnectionError(true);
        });
    };

    let handleClick = () => navigate("/signup");

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h2>Please Login!</h2>
                <Form.Group>
                    <Form.Input label='Username' name='username' value={form.username} width={6} onChange={onUpdateField} required/>
                    <Form.Input label='Password' type='password' name='password' width={6} value ={form.password} onChange={onUpdateField} required/>
                </Form.Group>
                <Form.Button>Login</Form.Button>
                {loginError &&
                 <Message error header='Invalid login credentials' content='Please try again'/>
                }
            </Form>
            {connectionError &&
             <Message error header='Network connection error' content='Please try again later'/>
            }
            <h3>Don't have an account? </h3>
            <Button onClick={handleClick} content="Sign Up"/>
        </>
    );

}

export default Login;
