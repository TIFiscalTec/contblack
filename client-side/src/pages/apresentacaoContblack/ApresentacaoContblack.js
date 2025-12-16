import { Button, Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ApresentacaoContblack = () => {
    const navigate = useNavigate();

    // Carregar script do Calendly
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    height: "fit-content",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 2,
                    gap: 4
                }}
            >
                <Box sx={{ width: "60%", maxWidth: 900, textAlign: "center" }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Apresentação Contblack
                    </Typography>
                    <Typography variant="body1" mb={4}>
                        Bem-vindo à página de apresentação da Contblack.
                    </Typography>
                    {/* Container responsivo do vídeo */}
                    <Box
                        sx={{
                            position: "relative",
                            paddingBottom: "56.25%", // 16:9
                            height: 0,
                            overflow: "hidden",
                            borderRadius: 2,
                            mb: 4,
                            boxShadow: 3
                        }}
                    >
                        <iframe
                            src="/assets/Contblack.mp4"
                            title="Apresentação Contblack"
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%"
                            }}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </Box>
                </Box>
            </Box>
            {/* Calendly Widget */}
            <div style={{ textAlign: "center", width: "100%" }}>
                <h2>Agende uma reunião conosco</h2>
                <p>Escolha o dia e horário que seja conveniente para você.</p>
            </div>
            <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/personal-contblack/30min"
                style={{ minWidth: "320px", height: "700px", marginTop: "0px", paddingTop: "0px" }}
            ></div>
            <div style={{ width: "100%", justifyContent: "center", display: "flex", marginBottom: "40px", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="body1" mb={1}>
                    Você pode clicar no botão abaixo para acessar a plataforma <b>Contblack</b>
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        padding: "10px 28px",
                        backgroundColor: "#9C01B9",
                        borderRadius: "17px 0 17px 0",
                        fontSize: "0.9rem",
                        color: "white",
                        fontWeight: 800,
                        transition: "0.3s ease",
                        '&:hover': {
                            backgroundColor: "#1EFF86",
                            boxShadow: "0 4px 10px #1EFF86",
                        }
                    }}
                    onClick={() => navigate("../Dashboard")}
                >
                    Ir para a Plataforma Contblack
                </Button>
            </div>
        </>
    );
};

export default ApresentacaoContblack;
