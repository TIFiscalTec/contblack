import React, { useState, useEffect, useRef } from "react";
import { Typography, Divider, IconButton, Chip } from "@mui/material";
import Button from "@mui/material/Button";

import { motion } from "framer-motion";

import HeaderDashboard from "../../components/HeaderDashboard";
import { useUser } from "../../../contexts/UserContext";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ModalNotificacao from "./ModalNotificacao";
import axios from "axios";
import ConfirmarMudarPlano from "../../components/ConfirmarMudarPlano";
import AlertSuccess from "../../components/AlertSuccess";
import AlertError from "../../components/AlertError";

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
    }),
};

const chipVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: { delay: i * 0.1, duration: 0.3, ease: "easeOut" },
    }),
};

const MudarPlano = () => {
    const { user, fetchUser } = useUser();
    const navigate = useNavigate();
    const [userActive, setUserActive] = useState(true);
    const [openModalNotificacao, setOpenModalNotificacao] = useState(false);
    const [notificacoes, setNotificacoes] = useState([]);
    const [openConfirmarMudarPlano, setOpenConfirmarMudarPlano] = useState(false);
    const [idPlanoEscolhido, setIdPlanoEscolhido] = useState(null);
    const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [openSnackbarError, setOpenSnackbarError] = useState(false);
    const scrollRef = useRef(null);
    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -360, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 360, behavior: "smooth" });
    };


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

    const [objPlanos, setObjPlanos] = useState([]);

    useEffect(() => {
        const getPlanos = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/mudarPlano/getPlanos/${user?.plano?.idPlano}`, {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`
                    }
                });

                if (response.data.status === 200) {
                    const data = response.data.data;

                    // Lista completa de vantagens possíveis
                    const todasAsVantagens = [
                        "Elaboração e entrega de obrigações fiscais para até 1 pessoa física.",
                        "Constituição e entrega de obrigações fiscais para até 1 pessoa jurídica MEI (faturamento de até R$81.000/ano).",
                        "Atendimento personalizado em horário comercial.",
                        "Folha de pagamento de até 2 colaboradores.",
                        "Elaboração e entrega de obrigações fiscais para 2 pessoas físicas.",
                        "Constituição e entrega de obrigações fiscais para até 1 pessoa jurídica no regime SIMPLES NACIONAL.",
                        "Folha de pagamento de até 6 colaboradores.",
                        "Emissão de até 35 NFs/mês (sob demanda).",
                        "Grupo Exclusivo no WhatsApp.",
                        "Emissão de até 70 NFs/mês (sob demanda).",
                        "1 consultoria de até 4h por mês com emissão de parecer.",
                    ];

                    // Define quais vantagens cada plano tem
                    const vantagensPorPlano = {
                        1: [
                            "Elaboração e entrega de obrigações fiscais para até 1 pessoa física.",
                            "Constituição e entrega de obrigações fiscais para até 1 pessoa jurídica MEI (faturamento de até R$81.000/ano)."
                        ],
                        2: [
                            "Elaboração e entrega de obrigações fiscais para até 1 pessoa física.",
                            "Constituição e entrega de obrigações fiscais para até 1 pessoa jurídica MEI (faturamento de até R$81.000/ano).",
                            "Atendimento personalizado em horário comercial."
                        ],
                        3: [
                            "Elaboração e entrega de obrigações fiscais para até 1 pessoa física.",
                            "Constituição e entrega de obrigações fiscais para até 1 pessoa jurídica MEI (faturamento de até R$81.000/ano).",
                            "Atendimento personalizado em horário comercial.",
                            "Folha de pagamento de até 2 colaboradores.",
                            "Elaboração e entrega de obrigações fiscais para 2 pessoas físicas."
                        ],
                        4: todasAsVantagens // plano completo
                    };

                    // Mapeia cada plano, adicionando os chips
                    const planosComChips = data.map((plano) => {
                        const vantagensDoPlano = vantagensPorPlano[plano.idPlano] || [];

                        const chips = todasAsVantagens.map((vantagem) => ({
                            label: vantagem,
                            icon: vantagensDoPlano.includes(vantagem)
                                ? <CheckIcon color="success" />
                                : <CloseIcon color="error" />
                        }));

                        return {
                            ...plano,
                            chips,
                        };
                    });
                    console.log(planosComChips);
                    setObjPlanos(planosComChips);
                }
            } catch (err) {
                console.error("Erro ao buscar planos:", err);
            }
        };

        if (user?.plano?.idPlano) {
            getPlanos();
        }
    }, [user?.plano?.idPlano]);

    const handleChangePlan = async () => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/mudarPlano/mudarPlano`, { idPlanoEscolhido }, {
            headers: {
                Authorization: `${localStorage.getItem("token")}`
            }
        });

        if (response.data.status === 200) {
            setMensagem("Plano alterado com sucesso!");
            setOpenSnackbarSuccess(true);
            fetchUser();
        } else {
            setMensagem("Falha ao alterar o plano. Tente novamente mais tarde.");
            setOpenSnackbarError(true);
        }
    }


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
                        width: "70%",
                        border: "1px solid #eee",
                        borderRadius: "8px",
                        padding: "20px",
                        background: "#fff",
                        minWidth: "400px"
                    }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
                            Mudar Plano
                        </Typography>
                        <Divider />

                        <Typography variant="body1" sx={{ mt: 2 }}>
                            Aqui você pode visualizar e escolher um novo plano de assinatura.
                            Caso tenha faturas pendentes, regularize sua situação para poder realizar a troca de plano e continuar utilizando nossos serviços normalmente.
                        </Typography>
                        <div
                            className="scroll-buttons"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                margin: "20px 0",
                                gap: "10px",
                            }}
                        >
                            <Button onClick={scrollLeft} variant="contained" sx={{
                                backgroundColor: "#9C01B9",
                                borderRadius: "17px 0 17px 0",
                                fontSize: "0.7rem",
                                color: "white",
                                fontWeight: 800,
                                border: "none",
                                transition: "0.3s ease",
                                '&:hover': {
                                    backgroundColor: "#1EFF86",
                                    boxShadow: "0 4px 10px #1EFF86",
                                }
                            }}>
                                ◀
                            </Button>
                            <Button onClick={scrollRight} variant="contained" sx={{
                                backgroundColor: "#9C01B9",
                                borderRadius: "0 17px 0 17px",
                                fontSize: "0.7rem",
                                color: "white",
                                fontWeight: 800,
                                border: "none",
                                transition: "0.3s ease",
                                '&:hover': {
                                    backgroundColor: "#1EFF86",
                                    boxShadow: "0 4px 10px #1EFF86",
                                }
                            }}>
                                ▶
                            </Button>
                        </div>
                        <div ref={scrollRef}
                            style={{
                                display: "flex",
                                // justifyContent: "center",
                                gap: "20px",
                                overflowX: "auto",
                                scrollSnapType: "x mandatory",
                                paddingBottom: "20px",
                                scrollbarWidth: "none",
                                msOverflowStyle: "none",
                            }}>
                            {objPlanos.map((plan, i) => (
                                <motion.div
                                    key={i}
                                    custom={i}
                                    variants={cardVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.3 }}
                                    style={{
                                        width: "90vw",
                                        maxWidth: "360px",
                                        flex: "0 0 auto",
                                        scrollSnapAlign: "start",
                                        border: "1px solid #ccc",
                                        borderRadius: "30px",
                                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                        padding: "34px 10px",
                                        backgroundColor: "white",
                                    }}
                                >

                                    <h3 style={{ textAlign: "center", color: "red", display: plan?.idPlano === user?.plano?.idPlano ? "block" : "none" }}>Plano Atual</h3>
                                    <h1 style={{ textAlign: "center" }}>{plan.nome}</h1>
                                    <p style={{ fontSize: "12px", marginBottom: "10px", textAlign: "center", height: "100px" }}>{plan.descricao}</p>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <p style={{ fontSize: "15px", marginRight: "5px" }}>
                                            {Number(plan?.valorAntigoMensal) ? Number(plan?.valorAntigoMensal)?.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ""}
                                        </p>
                                        <p
                                            style={{
                                                fontSize: "13px",
                                                backgroundColor: "#0b243d",
                                                padding: "1px 5px",
                                                borderRadius: "10px",
                                                color: "white",
                                            }}
                                        >
                                            {Number(plan.descontoMensal) > 0 ? (
                                                <>{parseInt(plan.descontoMensal)}%OFF</>
                                            ) : ("")}
                                        </p>
                                    </div>
                                    <p style={{ fontSize: "25px", textAlign: "center", marginTop: "5px", marginBottom: "5px" }}>
                                        <strong> POR R$ {Number(plan?.valorNovoMensal)?.toFixed(2).replace(".", ",")}</strong>
                                    </p>
                                    <div style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
                                        <div>
                                            <Button variant="contained" sx={{
                                                display: plan?.idPlano === user?.plano?.idPlano ? "none" : "block",
                                                backgroundColor: "#9C01B9",
                                                borderRadius: "17px 0 17px 0",
                                                fontSize: "0.9rem",
                                                color: "white",
                                                fontWeight: 800,
                                                border: "none",
                                                transition: "0.3s ease",
                                                '&:hover': {
                                                    backgroundColor: "#1EFF86",
                                                    boxShadow: "0 4px 10px #1EFF86",
                                                }
                                            }}
                                                onClick={() => {
                                                    setIdPlanoEscolhido(plan.idPlano);
                                                    setOpenConfirmarMudarPlano(true);
                                                }}
                                            >
                                                assinar plano
                                            </Button>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                        {plan.chips.map((chip, idx) => (
                                            <motion.div
                                                key={idx}
                                                custom={idx}
                                                variants={chipVariants}
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: true, amount: 0.3 }}
                                            >
                                                <Chip
                                                    sx={{
                                                        height: "auto",
                                                        border: "none",
                                                        "& .MuiChip-label": { display: "block", whiteSpace: "normal" },
                                                    }}
                                                    icon={chip.icon}
                                                    label={chip.label}
                                                    variant="outlined"
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <ModalNotificacao
                openModalNotificacao={openModalNotificacao}
                onClose={() => setOpenModalNotificacao(false)}
                notificacoes={notificacoes}
            />
            <ConfirmarMudarPlano
                openConfirmarMudarPlano={openConfirmarMudarPlano}
                setOpenConfirmarMudarPlano={setOpenConfirmarMudarPlano}
                handleChangePlan={handleChangePlan}
            />
            <AlertSuccess setOpenSnackbarSuccess={setOpenSnackbarSuccess} openSnackbarSuccess={openSnackbarSuccess} mensagem={mensagem} />
            <AlertError setOpenSnackbarError={setOpenSnackbarError} openSnackbarError={openSnackbarError} mensagem={mensagem} />
        </>
    )
}

export default MudarPlano;