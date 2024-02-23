import { Typography, Link, Box, TextField, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from "../FetchAPI";

function Login() {
    const navigate = useNavigate();
    const handleRegister = () => navigate("/register");


    const formik = useFormik({
        initialValues: {
            email: null,
            password: null,
            submit: null
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
            password: Yup
                .string()
                .max(255)
                .required('Password is required')
        }),
        onSubmit: async (values, helpers) => {
            login(JSON.stringify(values)).then((response) => {
                if (response.status === 404) {
                    {
                        helpers.setStatus({ success: false });
                        helpers.setErrors({ submit: "Please check your email and password" });
                        helpers.setSubmitting(false);
                    }
                    localStorage.setItem("auth", "false")
                } else if (response.ok) {
                    localStorage.setItem("auth", "true");
                    navigate("/calendar");
                }
            })
                .catch((error) => {
                    helpers.setStatus({ success: false });
                    helpers.setErrors({ submit: error.message });
                    helpers.setSubmitting(false);
                });
        }
    });

    return (
        <>
            <Box className="App-auth">
                <Box
                    sx={{
                        maxWidth: 550,
                        px: 3,
                        py: '100px',
                        width: '100%'
                    }}
                >
                    <div>
                        <Stack
                            spacing={1}
                            sx={{ mb: 3 }}
                        >
                            <Typography variant="h4">
                                Login
                            </Typography>
                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                Don't have an account?
                                &nbsp;
                                <Link
                                    onClick={handleRegister}
                                    component="button"
                                    underline="hover"
                                    variant="subtitle2"
                                >
                                    Register
                                </Link>
                            </Typography>
                        </Stack>
                        <form onSubmit={formik.handleSubmit}>
                            <Stack spacing={3}>
                                <TextField
                                    error={!!(formik.touched.email && formik.errors.email)}
                                    fullWidth
                                    helperText={formik.touched.email && formik.errors.email}
                                    label="Email Address"
                                    name="email"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="email"
                                    value={formik.values.email}
                                />
                                <TextField
                                    error={!!(formik.touched.password && formik.errors.password)}
                                    fullWidth
                                    helperText={formik.touched.password && formik.errors.password}
                                    label="Password"
                                    name="password"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="password"
                                    value={formik.values.password}
                                />
                            </Stack>
                            {formik.errors.submit && (
                                <Typography
                                    color="error"
                                    sx={{ mt: 3 }}
                                    variant="body2"
                                >
                                    {formik.errors.submit}
                                </Typography>
                            )}
                            <Button
                                fullWidth
                                size="large"
                                sx={{ mt: 3 }}
                                type="submit"
                                variant="contained"
                            >
                                Continue
                            </Button>
                        </form>
                    </div>
                </Box>
            </Box>
        </>
    )
}

export default Login;
