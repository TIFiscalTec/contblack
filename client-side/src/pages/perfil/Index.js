import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Paper, Avatar, Button } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const GetUserData = async () => {
            console.log("opa")
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/perfil`, {
                    headers: { Authorization: `${localStorage.getItem("token")}` }
                });
                setUserData(response.data);
            } catch (error) {
                navigate('../')
                console.error("Error fetching user data:", error);
            }
        };

        GetUserData();
    }, []);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const infoBox = (label, value) => (
        <Grid item xs={12} sm={6}>
            <Box>
                <Typography variant="caption" color="text.secondary">
                    {label}
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                    {value || "—"}
                </Typography>
            </Box>
        </Grid>
    );

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("planoSelecionado");
        window.location.href = "/login"; // Redireciona para a tela de login
    };

    return (
        <>
            <Header active="perfil" />
            <Box
                sx={{
                    marginTop: "60px",
                    minHeight: "100vh",
                    padding: isMobile ? "20px" : "40px",
                    backgroundColor: "#f5f7fa"
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        maxWidth: "900px",
                        margin: "0 auto",
                        padding: isMobile ? "20px" : "40px",
                        borderRadius: "16px"
                    }}
                >
                    <Box textAlign="center" mb={4}>
                        <Avatar sx={{ width: 80, height: 80, margin: "0 auto", bgcolor: "#8CD790" }}>
                            <PersonIcon sx={{ fontSize: 40, color: "#fff" }} />
                        </Avatar>
                        <Typography variant="h5" fontWeight="bold" mt={2}>
                            {userData.Nome}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {userData.Email}
                        </Typography>
                    </Box>

                    <Box textAlign="center" mt={4}>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => navigate("../Dashboard")}
                            sx={{ borderRadius: "20px", padding: "10px 30px" }}
                        >
                            acessar dashboard
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleLogout}
                            sx={{ borderRadius: "20px", padding: "10px 30px", marginLeft: "20px" }}
                        >
                            Sair da Conta
                        </Button>
                    </Box>
                </Paper>
            </Box>
            <Footer />
        </>
    );
};

export default Perfil;
