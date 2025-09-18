import React, { useState, useEffect } from "react";
import {
    Typography,
    Divider,
    Button,
    IconButton,
    FormControlLabel,
    Checkbox,
    TextField,
    FormGroup,
} from "@mui/material";
import HeaderDashboard from "../../components/HeaderDashboard";
import { useUser } from "../../../contexts/UserContext";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import ModalNotificacao from "./ModalNotificacao";
import axios from "axios";
import ModalAssinaturaCancelada from "./ModalAssinaturaCancelada";

const CancelarAssinatura = () => {
    const { user, fetchUser } = useUser();
    const navigate = useNavigate();
    const [userActive, setUserActive] = useState(true);
    const [openModalNotificacao, setOpenModalNotificacao] = useState(false);
    const [notificacoes, setNotificacoes] = useState([]);

    const [motivosSelecionados, setMotivosSelecionados] = useState([]);
    const [outroMotivo, setOutroMotivo] = useState("");
    const [erroValidacao, setErroValidacao] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");
    const [openModalAssinaturaCancelada, setOpenModalAssinaturaCancelada] = useState(false);


    const motivos = [
        "Preço alto",
        "Não estou usando o serviço",
        "Encontrei outra solução",
        "Problemas técnicos",
        "Insatisfação com o suporte"
    ];

    useEffect(() => {
        const hasFaturasVencidas = user?.faturas?.vencidas?.length > 0;
        setUserActive(!hasFaturasVencidas);
    }, [user]);

    useEffect(() => {
        const getNotify = async () => {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/buscarNotificacoes`,
                { email: localStorage.getItem("email") },
                {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`
                    }
                }
            );

            if (response.data.status === 200) {
                setNotificacoes(response.data.notificacoes);
            }
        };

        getNotify();
    }, []);

    const handleCheckboxChange = (motivo) => {
        if (motivosSelecionados.includes(motivo)) {
            setMotivosSelecionados(prev => prev.filter(m => m !== motivo));
        } else {
            setMotivosSelecionados(prev => [...prev, motivo]);
        }
    };

    const handleCancelar = async () => {
        if (motivosSelecionados.length === 0 && outroMotivo.trim() === "") {
            setErroValidacao(true);
            setMensagemErro("Por favor, selecione ou informe ao menos um motivo para o cancelamento.");
            return;
        }

        setErroValidacao(false);
        setMensagemErro("");

        const dadosCancelamento = {
            motivosSelecionados,
            outroMotivo: outroMotivo.trim()
        };

        console.log("Dados de cancelamento:", dadosCancelamento);

        const response = await axios.post(`${process.env.REACT_APP_API_URL}/cancelarAssinatura`,
            { ...dadosCancelamento, idAssinaturaAsaas: user?.assinatura?.idAssinaturaAsaas },
            {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                }
            }
        );

        if (response.status === 200) {
            fetchUser();
            setOpenModalAssinaturaCancelada(true);
        }
    };


    return (
        <>
            <HeaderDashboard
                userActive={userActive}
                setOpenModalNotificacao={setOpenModalNotificacao}
                notificacoes={notificacoes.length}
            />
            <div style={{ padding: "30px", background: "#f4f6f8", minHeight: "100vh", marginTop: "64px" }}>
                <div style={{ width: "100%", padding: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ width: "80%" }}>
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
                            Cancelamento de Assinatura
                        </Typography>
                        <Divider />

                        <Typography variant="body1" sx={{ mt: 2 }}>
                            Sentiremos sua falta!
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            Antes de concluir o cancelamento, poderia nos contar o motivo da sua decisão?
                            Sua opinião é muito importante e vai nos ajudar a melhorar continuamente nossos serviços.
                        </Typography>

                        <FormGroup sx={{ mt: 2 }}>
                            {motivos.map((motivo, index) => (
                                <FormControlLabel
                                    key={index}
                                    control={
                                        <Checkbox
                                            checked={motivosSelecionados.includes(motivo)}
                                            onChange={() => handleCheckboxChange(motivo)}
                                        />
                                    }
                                    label={motivo}
                                />
                            ))}
                        </FormGroup>

                        <TextField
                            label="Outro motivo (opcional)"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={3}
                            value={outroMotivo}
                            onChange={(e) => setOutroMotivo(e.target.value)}
                            sx={{ mt: 2 }}
                        />

                        {erroValidacao && (
                            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                {mensagemErro}
                            </Typography>
                        )}
                        <Button
                            variant="contained"
                            color="error"
                            sx={{ mt: 3 }}
                            onClick={handleCancelar}
                        >
                            Cancelar assinatura
                        </Button>

                    </div>
                </div>
            </div>
            <ModalNotificacao
                openModalNotificacao={openModalNotificacao}
                onClose={() => setOpenModalNotificacao(false)}
                notificacoes={notificacoes}
            />
            <ModalAssinaturaCancelada
                openModalAssinaturaCancelada={openModalAssinaturaCancelada}
                setOpenModalAssinaturaCancelada={setOpenModalAssinaturaCancelada}
            />
        </>
    );
};

export default CancelarAssinatura;
