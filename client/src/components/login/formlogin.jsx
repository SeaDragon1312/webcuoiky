import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FormLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async () => {
        if (!username || !password) {
            alert("All fields are required");
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                navigate("/");
            } else {
                alert(data);
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <Typography variant="h4" mb={2}>Login</Typography>
            <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleLogin}>
                Login
            </Button>
        </Box>
    );
};

export default FormLogin;