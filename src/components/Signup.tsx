import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Message, Button } from "semantic-ui-react";
import { signup } from "../FetchAPI";


function Signup() {
    const [form, setForm] = useState({ email: '', name: '', password: '' });
    const [isSubmitted, setSubmitted] = useState<boolean>(false);
    const [isError, setError] = useState<boolean>(false);
    const [isInvalidEmail, setInvalidEmail] = useState<boolean>(false);

    const onUpdateField = (e: FormEvent<HTMLInputElement>) => {
        const nextFormState = {
            ...form,
            [e.currentTarget.name]: e.currentTarget.value,
        };
        setError(false);
        setInvalidEmail(false);
        setForm(nextFormState);
    };

    let handleSubmit = () => {
        signup(JSON.stringify(form)).then((response_status) => {
            if (response_status === 200) {
                setSubmitted(true);
            } else if (response_status === 500) {
                setError(true);
            } else {
                setInvalidEmail(true);
            }
        }
        )
    };

    let navigate = useNavigate();

    let handleClick = () => navigate("/login");
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h2>Sign Up!</h2>
                <Form.Group>
                    <Form.Input label='Email' name='email' value={form.email} width={6} onChange={onUpdateField} required />
                    <Form.Input label='Name' name='name' value={form.name} width={6} onChange={onUpdateField} required />
                    <Form.Input label='Password' type='password' name='password' width={6} value={form.password} onChange={onUpdateField} required />
                </Form.Group>
                <Form.Button>Submit</Form.Button>
            </Form>
            {isError ?
                <Message error header='Email has already been used to register' content='Please enter a new email' />
                : <></>}
            {isInvalidEmail ?
                <Message error header='Email is not valid' content='Please enter a valid email address' />
                : <></>}
            {isSubmitted ?
                <>
                    <Message success header='Success!' content='Created a new user' />
                    <Button onClick={handleClick} content="Go to Log In" />
                </>
                : <></>}
        </>
    );
}

export default Signup;
