import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Message, Button } from "semantic-ui-react";
import { signup } from "./FetchAPI";


function Login() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [isSubmitted, setSubmitted] = useState<boolean>(false);
    const [isError, setError] = useState<boolean>(false);

    const onUpdateField = (e: FormEvent<HTMLInputElement>) => {
        const nextFormState = {
            ...form,
            [e.currentTarget.name]: e.currentTarget.value,
        };
        setForm(nextFormState);
    };

    let handleSubmit = () => {
        setError(false);
        signup(JSON.stringify(form)).then((response_status) => {
            if (response_status === 200) {
                setSubmitted(true);
            } else if (response_status === 500) {
                setError(true);
            }}
        )
    };


    let navigate = useNavigate();

    let handleClick = () => navigate("/");
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h2>Sign Up!</h2>
                <Form.Group>
                    <Form.Input label='Username' name='username' value={form.username} width={6} onChange={onUpdateField} required/>
                    <Form.Input label='Password' type='password' name='password' width={6} value ={form.password} onChange={onUpdateField} required/>
                </Form.Group>
                <Form.Button>Submit</Form.Button>
            </Form>
            {isError ?
             <Message error header='Username already taken' content='Please try again'/>
            : <></>}
            {isSubmitted ?
             <>
                 <Message success header='Success!' content='Created new user'/>
                 <Button onClick={handleClick} content="Go to Log In"/>
             </>
            : <></>}
        </>
    );
}

export default Login;
