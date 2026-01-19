import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { CircularProgress, Alert, Box, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useLogin } from "../../../../contexts/LoginContext";
import HeaderDashboard from "../../../components/HeaderDashboard";

const AssinarContratoEnderecoFiscal = () => {

    const navigate = useNavigate();
    const { login, loading } = useLogin();
    console.log("Login data:", login);
    const [contrato, setContrato] = useState(null);
    const [error, setError] = useState(null);
    const [userActive, setUserActive] = useState(true);
    const [openModalNotificacao, setOpenModalNotificacao] = useState(false);
    // const [assinando, setAssinando] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        let mounted = true;
        let interval;

        const getContrato = async () => {
            console.log("Fetching contrato for user:", login);
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/getContratoEnderecoFiscal`,
                    { idUsuario: login?.idUsuario },
                    { headers: { Authorization: `${localStorage.getItem("token")}` } }
                );
                console.log(response);
                if (!mounted) return;

                if (response.data.data?.status === "signed") {
                    clearInterval(interval); // para o polling
                    navigate("/Dashboard/CheckoutEnderecoFiscal");
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
            getContrato(); // primeira chamada imediata
            interval = setInterval(getContrato, 5000); // repete a cada 5s
        }

        return () => {
            mounted = false;
            if (interval) clearInterval(interval);
        };
    }, [login, navigate]);


    // const handleAssinar = async () => {
    //     try {
    //         setAssinando(true);
    //         window.open(contrato.sign_url, "_blank");
    //     } catch (err) {
    //         setError("Erro ao abrir contrato para assinatura.");
    //     } finally {
    //         setAssinando(false);
    //     }
    // };

    if (loading) {
        return (
            <Box sx={{ mt: 10, textAlign: "center" }}>
                <CircularProgress />
            </Box>
        );
    }


    return (
        <>
            <HeaderDashboard userActive={userActive} setOpenModalNotificacao={setOpenModalNotificacao} notificacoes={0} />
            <Box sx={{ mt: 15, px: 2, minHeight: "100vh", marginBottom: 4 }}>
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
                        Endereço Fiscal - Assinatura de Contrato
                    </Typography>
                    <Typography>
                        O primeiro passo para obter o serviço de endereço fiscal é assinar o contrato digitalmente. Por favor, revise o documento abaixo e siga as instruções para completar a assinatura.
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {/* <Box sx={{ mt: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAssinar}
                            disabled={assinando || !contrato}
                        >
                            {!contrato ? "Carregando ..." : "Assinar Contrato"}
                        </Button>
                    </Box> */}
                    {contrato ? (
                        <div style={{ width: "100%", height: "90vh", padding: "20px" }}>
                            <iframe
                                src={contrato ? contrato.sign_url : ""}
                                title="Assinatura do Documento"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    border: "none",
                                    borderRadius: "8px",
                                }}
                            />
                        </div>

                    ) : (
                        <Box sx={{ mt: 10, textAlign: "center" }}>
                            <CircularProgress />
                        </Box>
                    )}
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default AssinarContratoEnderecoFiscal;
