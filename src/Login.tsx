import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Message } from "semantic-ui-react";
import { login } from "./FetchAPI";


interface StatusProps {
    status: number;
}

    function Login() {
        const [form, setForm] = useState({ username: '', password: '' });
        const [isError, setError] = useState<boolean>(false);

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
                console.log(response);
                if (response.status === 404) {
                    setError(true);
                } else if (response.status === 200) {
                    localStorage.setItem("auth_token", "true");
                    navigate("/home");
                }
            });
        };


        let handleClick = () => navigate("/signup");


        return (
            <>
                <Form onSubmit={handleSubmit}>
                    <h2>Please Login!</h2>
                    <Form.Group inline>
                        <Form.Input label='Username' name='username' value={form.username} width={6} onChange={onUpdateField} required/>
                        <Form.Input label='Password' type='password' name='password' width={6} value ={form.password} onChange={onUpdateField} required/>
                    </Form.Group>
                    <Form.Button>Login</Form.Button>
                    {isError ?
                     <Message error header='Invalid login credentials' content='Please try again'/>
                    : <></>}
                </Form>
                <h3>Don't have an account? </h3>
                <Button onClick={handleClick} content="Sign Up"/>
            </>
        );
    }

export default Login;
