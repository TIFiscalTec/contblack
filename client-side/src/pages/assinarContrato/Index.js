import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, CircularProgress, Alert, Box, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useLogin } from "../../contexts/LoginContext";

const AssinarContrato = () => {
    
    const navigate = useNavigate();
    const { login, loading } = useLogin();
    console.log("Login data:", login);
    const [contrato, setContrato] = useState(null);
    const [error, setError] = useState(null);
    const [assinando, setAssinando] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        let mounted = true;

        const getContrato = async () => {
            console.log("Fetching contrato for user:", login);
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/getContrato`,
                    { idUsuario: login?.idUsuario },
                    { headers: { Authorization: `${localStorage.getItem("token")}` } }
                );
                console.log(response);
                if (!mounted) return;

                if (response.data.data?.status === "signed") {
                    navigate("/carrinho");
                } else {
                    setContrato(response.data.data || null);
                }
            } catch (err) {
                if (mounted) {
                    setError("Erro ao buscar contrato. Tente novamente.");
                }
            }
        };
        if (login) {
            getContrato();
        }

        return () => {
            mounted = false;
        };
    }, [login, navigate]);

    const handleAssinar = async () => {
        try {
            setAssinando(true);
            window.open(contrato.sign_url, "_blank");
        } catch (err) {
            setError("Erro ao abrir contrato para assinatura.");
        } finally {
            setAssinando(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ mt: 10, textAlign: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Header active="cart" />
            <Box sx={{ mt: 15, px: 2, minHeight: "100vh" }}>
                <Box
                    sx={{
                        width: { xs: "100%", md: "80%" },
                        mx: "auto",
                        bgcolor: "#f0f0f0",
                        borderRadius: 2,
                        p: 4,
                        boxShadow: 3,
                    }}
                >
                    <Typography variant="h5" gutterBottom>
                        Quase lá
                    </Typography>
                    <Typography>
                        Para darmos continuidade, solicitamos a gentileza de que o(a) Dr.(a) realize a assinatura do nosso contrato.
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box sx={{ mt: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAssinar}
                            disabled={assinando || !contrato}
                        >
                            {!contrato ? "Carregando ..." : "Assinar Contrato"}
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default AssinarContrato;
