import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Container, Grid, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useTokenContext } from '../../contexts/AccessTokenContext';

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const {getToken, updateToken} = useTokenContext()
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { id, value } = event.target;
        setLoginData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:3001/auth/login", loginData);

            if (response) {
                const data = response.data.data;
                console.log(data)
                updateToken(data.access_token)
                navigate("/home")
            }

            setLoginData({
                email: "",
                password: "",
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4, boxShadow: 3, borderRadius: 2, p: 4, bgcolor: 'background.paper' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Login
            </Typography>
            <Box component="form" noValidate>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={loginData.email}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={loginData.password}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleLogin}
                            sx={{ py: 1.5}}
                        >
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Create a new account?{' '}
                <MuiLink component={Link} to="/register" color="primary">
                    Register
                </MuiLink>
            </Typography>
        </Container>
    );
};

export default Login;
