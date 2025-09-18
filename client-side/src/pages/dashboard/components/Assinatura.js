import React, { useState, useEffect } from "react";
import {
    Typography,
    Divider,
    Button,
    IconButton,
    Box,
} from "@mui/material";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import HeaderDashboard from "../../components/HeaderDashboard";
import { useUser } from "../../../contexts/UserContext";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { FormatDate } from "../../../utils/FormatDate";
import { FormatToBrl } from "../../../utils/FormatToBrl";
import { MascaraTelefone } from "../../../utils/MascaraTelefone";
import ModalNotificacao from "./ModalNotificacao";
import axios from "axios";
import ModalCancelarAssinatura from "./ModalCancelarAssinatura";


const Assinatura = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [userActive, setUserActive] = useState(true);
    const [openModalNotificacao, setOpenModalNotificacao] = useState(false);
    const [notificacoes, setNotificacoes] = useState([]);
    const [openModalCancelarAssinatura, setOpenModalCancelarAssinatura] = useState(false);

    console.log(user)
    useEffect(() => {
        const hasFaturasVencidas = user?.faturas?.vencidas?.length > 0;

        if (hasFaturasVencidas) {
            setUserActive(false);
        } else {
            setUserActive(true);
        }
    }, [user]);

    useEffect(() => {
        const getNotify = async () => {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/buscarNotificacoes`, { email: localStorage.getItem("email") }, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                }
            });

            if (response.data.status === 200) {
                setNotificacoes(response.data.notificacoes)
            }
        }

        getNotify();
    }, [])

    const SectionBox = ({ title, children }) => (
        <Box sx={{ mt: 2 }}>
            {title && (
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    {title}
                </Typography>
            )}
            {children}
            <Divider sx={{ mt: 2 }} />
        </Box>
    );

    const InfoRow = ({ label, value, bold }) => (
        <Typography variant="body2" sx={{ mt: 0.5 }}>
            {label && <b>{label} </b>}
            {bold ? <b>{value}</b> : value}
        </Typography>
    );


    return (
        <>
            <HeaderDashboard userActive={userActive} setOpenModalNotificacao={setOpenModalNotificacao} notificacoes={notificacoes.length} />
            <div style={{ padding: "30px", background: "#f4f6f8", minHeight: "100vh", marginTop: "64px" }}>
                <div style={{ width: "100%", height: "fit-content", padding: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ width: "80%", height: "fit-content" }}>
                        <IconButton onClick={() => navigate("../Dashboard")}>
                            <ArrowBackIcon sx={{ fontSize: "40px", color: "black" }} />
                        </IconButton>
                    </div>
                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <div style={{
                        width: "60%",
                        border: "1px solid #eee",
                        borderRadius: "8px",
                        padding: "20px",
                        background: "#fff",
                        minWidth: "400px"
                    }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
                            Assinatura e Cobrança
                        </Typography>
                        <Divider />

                        <Typography variant="body1" sx={{ mt: 2 }}>
                            Aqui você pode gerenciar sua assinatura e cobranças.
                            Se tiver faturas pendentes, regularize sua situação
                            para continuar usufruindo dos nossos serviços.
                        </Typography>
                        <SectionBox>
                            <InfoRow value={user?.usuario?.Nome || "Nome não disponível"} bold />
                            <InfoRow value={user?.usuario?.Email || "Email não disponível"} bold />
                            <InfoRow label="Telefone:" value={MascaraTelefone(user?.usuario?.Telefone || "...")} />
                        </SectionBox>
                        <SectionBox>
                            <InfoRow
                                label="Método de Pagamento:"
                                value={user?.asaas?.billingType === "BOLETO" ? "Boleto" : "Cartão de Crédito"}
                                bold
                            />
                        </SectionBox>
                        <SectionBox title="Detalhes do Plano">
                            <InfoRow
                                value={`${user?.plano?.nome || "Plano não definido"} | ${user?.plano?.descricao || "-"}`}
                            />
                            <InfoRow
                                label="Próxima cobrança:"
                                value={FormatDate(user?.assinatura?.proximaCobranca || "-")}
                            />
                            <Button variant="outlined" size="small" endIcon={<ArrowRightAltIcon />} sx={{ marginTop: "10px", marginRight: "10px" }} onClick={() => navigate("../Dashboard/DetalhesCobranca")}>
                                Detalhes de cobrança
                            </Button>
                            <Button variant="outlined" size="small" endIcon={<ArrowRightAltIcon />} sx={{ marginTop: "10px" }} onClick={() => navigate("../Dashboard/MudarPlano")}>
                                Mudar meu plano
                            </Button>
                        </SectionBox>
                        <SectionBox title="Detalhes da cobrança">
                            <InfoRow label="Valor:" value={FormatToBrl(user?.asaas?.value || 0)} />
                            <InfoRow label="Status:" value={user?.assinatura?.status === "ACTIVE" ? "Ativo" : "Inativo" || "-"} />
                            <Button variant="contained" color="error" sx={{ mt: 2, alignSelf: "flex-start" }} onClick={() => setOpenModalCancelarAssinatura(true)}>
                                Cancelar assinatura
                            </Button>
                        </SectionBox>
                    </div>
                </div>
            </div>
            <ModalNotificacao
                openModalNotificacao={openModalNotificacao}
                onClose={() => setOpenModalNotificacao(false)}
                notificacoes={notificacoes}
            />
            <ModalCancelarAssinatura
                openModalCancelarAssinatura={openModalCancelarAssinatura}
                setOpenModalCancelarAssinatura={setOpenModalCancelarAssinatura}
            />
        </>
    )
}

export default Assinatura;