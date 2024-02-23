import { Typography, Link, Box, TextField, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signup } from "../FetchAPI";


function Signup() {
    const navigate = useNavigate();
    const handleLogin = () => navigate("/login");

    const formik = useFormik({
        initialValues: {
            name: null,
            email: null,
            password: null,
            submit: null
        },
        validationSchema: Yup.object({
            name: Yup
                .string()
                .max(255)
                .required('Name is required'),
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
            signup(JSON.stringify(values)).then((response_status) => {
                if (response_status === 200) {
                    navigate("/login");
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
                                Register
                            </Typography>
                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                Already have an account?
                                &nbsp;
                                <Link
                                    onClick={handleLogin}
                                    component="button"
                                    underline="hover"
                                    variant="subtitle2"
                                >
                                    Log in
                                </Link>
                            </Typography>
                        </Stack>
                        <form onSubmit={formik.handleSubmit}>
                            <Stack spacing={3}>
                                <TextField
                                    error={!!(formik.touched.name && formik.errors.name)}
                                    fullWidth
                                    helperText={formik.touched.name && formik.errors.name}
                                    label="Name"
                                    name="name"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="name"
                                    value={formik.values.name}
                                />
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

export default Signup;
