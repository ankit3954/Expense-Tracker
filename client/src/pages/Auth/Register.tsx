import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Container, Grid, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate()
    const handleChange = (event:any) => {
        const { id, value } = event.target;
        setRegisterData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post("http://localhost:3001/user/register", registerData);

            if (response) {
                console.log(response);
            }

            setRegisterData({
                name: "",
                email: "",
                password: "",
            });
            navigate('/login')
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4, boxShadow: 3, borderRadius: 2, p: 4, bgcolor: 'background.paper' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Register
            </Typography>
            <Box component="form" noValidate>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            value={registerData.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={registerData.email}
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
                            value={registerData.password}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleRegister}
                            sx={{ py: 1.5 }}
                        >
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Already have an account?{' '}
                <MuiLink component={Link} to="/" color="primary">
                    Login
                </MuiLink>
            </Typography>
        </Container>
    );
};

export default Register;
