import React, { useState, useEffect } from "react";
import HeaderDashboard from "../../../components/HeaderDashboard";
import { Button, Chip, Divider } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { gerarLinkWhatsApp } from "../../../../utils/WhatsappLink";
import { useUser } from "../../../../contexts/UserContext";
import { useNavigate } from 'react-router-dom';

const ResidenciaFiscal = () => {

    const { user } = useUser();
    const navigate = useNavigate();

    const [userActive, setUserActive] = useState(true);
    const [openModalNotificacao, setOpenModalNotificacao] = useState(false);

    const handleCancelarEnderecoFiscal = () => {
        window.open(gerarLinkWhatsApp("Olá, gostaria de solicitar o cancelamento do endereço fiscal da minha empresa."), "_blank");
    }

    console.log("User data:", user);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (!user?.assinaturaEnderecoFiscal) {
            navigate("/Dashboard/CheckoutEnderecoFiscal");
        }
    }, [])


    return (
        <>
            <HeaderDashboard userActive={userActive} setOpenModalNotificacao={setOpenModalNotificacao} notificacoes={0} />
            <div style={{ marginTop: "60px", padding: "20px", minHeight: "100vh" }}>
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <div style={{ width: "80%", backgroundColor: "#f9f9f9", padding: "30px", borderRadius: "8px" }}>
                        <div style={{ width: "100%" }}>
                            <h2 style={{ color: "black" }}>Endereço Fiscal</h2>
                        </div>

                        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                            <div style={{ display: "flex", justifyContent: "flex-start", flexDirection: "column" }}>
                                <span style={{ color: "black" }}>Endereço Fiscal</span>
                                <span style={{ fontSize: "12px" }}>Contratado em 12/12/2023</span>
                            </div>
                            <span style={{ color: "black" }}><Chip icon={<CheckCircleOutlineIcon sx={{ fontSize: "19px" }} />} label="Ativo" color="success" variant="outlined" /></span>
                        </div>
                    </div>
                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <div style={{ width: "80%", backgroundColor: "#f9f9f9", padding: "0px 30px", borderRadius: "8px" }}>
                        <Divider sx={{ mb: 2 }} />
                        <p style={{ fontSize: "12px", textAlign: "justify", lineHeight: "1.4" }}>O endereço fiscal pode ser cancelado a qualquer momento, desde que a empresa já possua um novo endereço fiscal válido e seja realizada a devida alteração no contrato social (serviço avulso). Caso haja interesse, basta efetivar a solicitação. As cobranças futuras serão suspensas a partir do mês seguinte ao cancelamento.</p>
                        <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", marginBottom: "30px" }}>
                            <Button
                                variant="contained"
                                onClick={handleCancelarEnderecoFiscal}
                                sx={{
                                    marginTop: "10px",
                                    padding: "8px 24px",
                                    backgroundColor: "#9C01B9",
                                    borderRadius: "17px 0 17px 0",
                                    fontSize: "0.7rem",
                                    color: "white",
                                    fontWeight: 800,
                                    transition: "0.3s ease",
                                    '&:hover': {
                                        backgroundColor: "#1EFF86",
                                        boxShadow: "0 4px 10px #1EFF86",

                                    }
                                }}
                            >
                                Solicitar Cancelamento
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default ResidenciaFiscal;