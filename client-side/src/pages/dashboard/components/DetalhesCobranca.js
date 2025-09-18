import React, { useState, useEffect } from "react";
import {
    Typography,
    Divider,
    Button,
    IconButton,
    Box,
} from "@mui/material";
import HeaderDashboard from "../../components/HeaderDashboard";
import { useUser } from "../../../contexts/UserContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { FormatDate } from "../../../utils/FormatDate";
import { FormatToBrl } from "../../../utils/FormatToBrl";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModalNotificacao from "./ModalNotificacao";
import axios from "axios";

const DetalhesCobranca = () => {
    const { user } = useUser();
    console.log(user)
    const navigate = useNavigate();
    const [userActive, setUserActive] = useState(true);
    const [openModalNotificacao, setOpenModalNotificacao] = useState(false);
    const [notificacoes, setNotificacoes] = useState([]);
    const [planos, setPlanos] = useState([]);
    const [assinatura, setAssinatura] = useState(null);

    useEffect(() => {
        const hasFaturasVencidas = user?.faturas?.vencidas?.length > 0;
        setUserActive(!hasFaturasVencidas);
    }, [user]);

    useEffect(() => {
        const getPlano = async () => {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/buscarPlano`,
                {},
                {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.data.status === 200) {
                setPlanos(response.data.pagamentos);
                setAssinatura(response.data.assinatura);
            }
        };

        getPlano();
    }, []);

    useEffect(() => {
        const getNotify = async () => {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/buscarNotificacoes`,
                { email: localStorage.getItem("email") },
                {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data.status === 200) {
                setNotificacoes(response.data.notificacoes);
            }
        };

        getNotify();
    }, []);

    return (
        <>
            <HeaderDashboard userActive={userActive} setOpenModalNotificacao={setOpenModalNotificacao} notificacoes={notificacoes.length} />
            <Box
                sx={{
                    p: { xs: 2, sm: 3, md: 4 },
                    background: "#f4f6f8",
                    minHeight: "100vh",
                    mt: "64px",
                }}
            >
                <div style={{ width: "100%", height: "fit-content", padding: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ width: "80%", height: "fit-content" }}>
                        <IconButton onClick={() => navigate("../Dashboard/Assinatura")}>
                            <ArrowBackIcon sx={{ fontSize: "40px", color: "black" }} />
                        </IconButton>
                    </div>
                </div>
                <Box
                    sx={{
                        width: { xs: "100%", sm: "90%", md: "70%", lg: "60%" },
                        mx: "auto",
                        border: "1px solid #eee",
                        borderRadius: 2,
                        p: { xs: 2, sm: 3 },
                        background: "#fff",
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                        Histórico de Pagamento
                    </Typography>
                    <Divider />
                    <Box
                        sx={{
                            mt: 3,
                            p: 2,
                            backgroundColor: "#0b243d",
                            borderRadius: 2,
                            color: "white",
                        }}
                    >
                        <Box display="flex" justifyContent="space-between" flexWrap="wrap">
                            <b>Plano: {user?.plano?.nome || "..."}</b>
                            <b>{FormatToBrl(user?.plano?.valorNovoMensal || 0)}</b>
                        </Box>
                        <Typography sx={{ pt: 1 }}>
                            Sua próxima cobrança será em{" "}
                            {FormatDate(assinatura?.nextDueDate || "2025-01-10")}
                        </Typography>
                    </Box>
                    <Box mt={3}>
                        <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
                            Histórico de Pagamento
                        </Typography>
                        <Divider />

                        <Box mt={2}>
                            {planos.map((plano, index) => (
                                <Box key={index} mb={2}>
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        flexWrap="wrap"
                                        mb={1}
                                    >
                                        <span>{FormatDate(plano.clientPaymentDate)}</span>
                                        <span>{FormatToBrl(plano.value)}</span>
                                    </Box>

                                    <Typography variant="body2" mb={1}>
                                        Forma de pagamento: {plano.billingType}
                                    </Typography>

                                    <Button
                                        
                                        variant="outlined"
                                        startIcon={<VisibilityIcon />}
                                        onClick={() => window.open(plano.invoiceUrl, "_blank")}
                                    >
                                        Exibir fatura
                                    </Button>
                                    <Divider sx={{ mt: 2 }} />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>

            <ModalNotificacao
                openModalNotificacao={openModalNotificacao}
                onClose={() => setOpenModalNotificacao(false)}
                notificacoes={notificacoes}
            />
        </>
    );
};

export default DetalhesCobranca;
