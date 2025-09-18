// import { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";


const ModalFirstTime = (props) => {
    const { openModalFirstTime, user } = props;


    return (
        <Modal
            open={openModalFirstTime}
            aria-labelledby="welcome-title"
            aria-describedby="welcome-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "90%",
                    maxWidth: 600,
                    bgcolor: "background.paper",
                    borderRadius: 3,
                    boxShadow: 24,
                    p: 4,
                    textAlign: "center"
                }}
            >
                <Typography
                    id="welcome-title"
                    variant="h3"
                    gutterBottom
                    fontWeight="bold"
                >
                    🎉 Bem-vindo ao time Clarea!
                </Typography>

                <Typography id="welcome-description" variant="h6" sx={{ mb: 3 }}>
                    Estamos muito felizes em ter você aqui conosco! <br />
                    Se escolheu pagar por <strong>Boleto</strong>, sua primeira fatura já
                    está disponível. <br />
                    Se escolheu <strong>Cartão de Crédito</strong>, fique tranquilo: sua
                    fatura será gerada e enviada automaticamente.
                </Typography>

                <Typography variant="h6" sx={{ mb: 3 }}>
                    Antes de começar, precisamos da sua assinatura no nosso contrato de
                    prestação de serviços.
                </Typography>

                <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<DescriptionIcon />}
                        onClick={() => (window.location.href = user?.zapSign?.sign_url)}
                    >
                        Assinar contrato
                    </Button>
                </Stack>

                <Typography variant="h6" sx={{ mb: 2 }}>
                    Qualquer dúvida, nosso time de suporte está à disposição no WhatsApp.
                </Typography>

                <Button
                    variant="contained"
                    color="success"
                    size="large"
                    startIcon={<WhatsAppIcon />}
                    onClick={() => window.open("https://wa.me/5541998333575", "_blank")}
                >
                    Falar no WhatsApp
                </Button>
            </Box>
        </Modal>
    )
}

export default ModalFirstTime;