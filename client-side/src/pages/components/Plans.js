import { motion } from "framer-motion";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import axios from "axios";
import { useLogin } from "../../contexts/LoginContext";
import { Divider } from "@mui/material";
import { gerarLinkWhatsApp } from "../../utils/WhatsappLink";

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

const Plans = () => {
    const token = localStorage.getItem("token");

    const [hasPlan, setHasPlan] = useState(false);
    const { fetchLogin } = useLogin()
    const [showButtons, setShowButtons] = useState(false);


    useEffect(() => {
        const checkHasPlan = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/hasPlan`, {
                headers: {
                    Authorization: `${token}`
                }
            });
            if (response.data.status === 200) {
                setHasPlan(true)
            } else {
                setHasPlan(false)
            }
        }
        checkHasPlan()
    }, [token])

    useEffect(() => {
        const checkScroll = () => {
            if (scrollRef.current) {
                const { scrollWidth, clientWidth } = scrollRef.current;
                setShowButtons(scrollWidth > clientWidth);
            }
        };

        // Checa no início
        checkScroll();

        // Checa sempre que a tela for redimensionada
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, []); // roda de novo se a lista de planos mudar

    const navigate = useNavigate();
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -360, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 360, behavior: "smooth" });
    };

    const [objPlanos, setObjPlanos] = useState([]);

    useEffect(() => {
        const getPlanos = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/listarPlanos`);

            setObjPlanos(response.data.planos);
            console.log(response.data.planos);
        }
        getPlanos();
    }, [])

    const plans = [
        {
            id: objPlanos[0]?.idPlano,
            title: objPlanos[0]?.nome,
            height: 700,
            chips: [
                { label: "Elaboração e entrega de obrigações fiscais para até 1 pessoa física.", icon: <CheckIcon color="success" /> },
                { label: "Constituição e entrega de obrigações fiscais para até 1 pessoa jurídica MEI (faturamento de até R$81.000/ano).", icon: <CheckIcon color="success" /> },
                { label: "Atendimento personalizado em horário comercial.", icon: <CheckIcon color="success" /> },
                { label: "Folha de pagamento de até 2 colaboradores.", icon: <CloseIcon color="error" /> },
                { label: "Elaboração e entrega de obrigações fiscais para 2 pessoas físicas.", icon: <CloseIcon color="error" /> },
                { label: "Constituição e entrega de obrigações fiscais para até 1 pessoa jurídica no regime SIMPLES NACIONAL.", icon: <CloseIcon color="error" /> },
                { label: "Folha de pagamento de até 6 colaboradores.", icon: <CloseIcon color="error" /> },
                { label: "Emissão de até 35 NFs/mês (sob demanda).", icon: <CloseIcon color="error" /> },
                { label: "Grupo Exclusivo no WhatsApp.", icon: <CloseIcon color="error" /> },
                { label: "Folha de pagamento de até 10 colaboradores.", icon: <CloseIcon color="error" /> },
                { label: "Emissão de até 70 NFs/mês (sob demanda).", icon: <CloseIcon color="error" /> },
                { label: "1 consultoria de até 4h por mês com emissão de parecer.", icon: <CloseIcon color="error" /> },
            ],
            description: objPlanos[0]?.descricao,
            priceOld: objPlanos[0]?.valorAntigoMensal ? Number(objPlanos[0]?.valorAntigoMensal) : 0,
            // discount: 10,
            recommended: false,
            priceNew: objPlanos[0]?.valorNovoMensal ? Number(objPlanos[0]?.valorNovoMensal) : 0,
            // priceOldYear: objPlanos[0]?.valorAntigoAnual ? Number(objPlanos[0]?.valorAntigoAnual) : "",
            // priceNewYear: objPlanos[0]?.valorNovoAnual ? Number(objPlanos[0]?.valorNovoAnual) : "",
            // discountYear: objPlanos[0]?.descontoAnual ? Number(objPlanos[0]?.descontoAnual) : "",

        },
        {
            id: objPlanos[1]?.idPlano,
            title: objPlanos[1]?.nome,
            height: 700,
            chips: [
                { label: "Elaboração e entrega de obrigações fiscais para até 1 pessoa física.", icon: <CheckIcon color="success" /> },
                { label: "Constituição e entrega de obrigações fiscais para até 1 pessoa jurídica MEI (faturamento de até R$81.000/ano).", icon: <CheckIcon color="success" /> },
                { label: "Atendimento personalizado em horário comercial.", icon: <CheckIcon color="success" /> },
                { label: "Folha de pagamento de até 2 colaboradores.", icon: <CheckIcon color="success" /> },
                { label: "Elaboração e entrega de obrigações fiscais para 2 pessoas físicas.", icon: <CheckIcon color="success" /> },
                { label: "Constituição e entrega de obrigações fiscais para até 1 pessoa jurídica no regime SIMPLES NACIONAL.", icon: <CloseIcon color="error" /> },
                { label: "Folha de pagamento de até 6 colaboradores.", icon: <CloseIcon color="error" /> },
                { label: "Emissão de até 35 NFs/mês (sob demanda).", icon: <CloseIcon color="error" /> },
                { label: "Grupo Exclusivo no WhatsApp.", icon: <CloseIcon color="error" /> },
                { label: "Folha de pagamento de até 10 colaboradores.", icon: <CloseIcon color="error" /> },
                { label: "Emissão de até 70 NFs/mês (sob demanda).", icon: <CloseIcon color="error" /> },
                { label: "1 consultoria de até 4h por mês com emissão de parecer.", icon: <CloseIcon color="error" /> },
            ],
            description: objPlanos[1]?.descricao,
            priceOld: objPlanos[1]?.valorAntigoMensal ? Number(objPlanos[1]?.valorAntigoMensal) : 0,
            // discount: 10,
            recommended: true,
            priceNew: objPlanos[1]?.valorNovoMensal ? Number(objPlanos[1]?.valorNovoMensal) : 0,
            // priceOldYear: objPlanos[1]?.valorAntigoAnual ? Number(objPlanos[1]?.valorAntigoAnual) : "",
            // priceNewYear: objPlanos[1]?.valorNovoAnual ? Number(objPlanos[1]?.valorNovoAnual) : "",
            // discountYear: objPlanos[1]?.descontoAnual ? Number(objPlanos[1]?.descontoAnual) : "",

        },
        {
            id: objPlanos[2]?.idPlano,
            title: objPlanos[2]?.nome,
            height: 700,
            chips: [
                { label: "Elaboração e entrega de obrigações fiscais para até 1 pessoa física.", icon: <CheckIcon color="success" /> },
                { label: "Constituição e entrega de obrigações fiscais para até 1 pessoa jurídica MEI (faturamento de até R$81.000/ano).", icon: <CheckIcon color="success" /> },
                { label: "Atendimento personalizado em horário comercial.", icon: <CheckIcon color="success" /> },
                { label: "Folha de pagamento de até 2 colaboradores.", icon: <CheckIcon color="success" /> },
                { label: "Elaboração e entrega de obrigações fiscais para 2 pessoas físicas.", icon: <CheckIcon color="success" /> },
                { label: "Constituição e entrega de obrigações fiscais para até 1 pessoa jurídica no regime SIMPLES NACIONAL.", icon: <CheckIcon color="success" /> },
                { label: "Folha de pagamento de até 6 colaboradores.", icon: <CheckIcon color="success" /> },
                { label: "Emissão de até 35 NFs/mês (sob demanda).", icon: <CheckIcon color="success" /> },
                { label: "Grupo Exclusivo no WhatsApp.", icon: <CheckIcon color="success" /> },
                { label: "Folha de pagamento de até 10 colaboradores.", icon: <CloseIcon color="error" /> },
                { label: "Emissão de até 70 NFs/mês (sob demanda).", icon: <CloseIcon color="error" /> },
                { label: "1 consultoria de até 4h por mês com emissão de parecer.", icon: <CloseIcon color="error" /> },
            ],
            description: objPlanos[2]?.descricao,
            priceOld: objPlanos[2]?.valorAntigoMensal ? Number(objPlanos[2]?.valorAntigoMensal) : 0,
            // discount: 10,
            recommended: false,
            priceNew: objPlanos[2]?.valorNovoMensal ? Number(objPlanos[2]?.valorNovoMensal) : 0
            // priceOldYear: objPlanos[2]?.valorAntigoAnual ? Number(objPlanos[2]?.valorAntigoAnual) : "",
            // priceNewYear: objPlanos[2]?.valorNovoAnual ? Number(objPlanos[2]?.valorNovoAnual) : "",
            // discountYear: objPlanos[2]?.descontoAnual ? Number(objPlanos[2]?.descontoAnual) : "",

        },
        {
            id: objPlanos[3]?.idPlano,
            title: objPlanos[3]?.nome,
            height: 700,
            chips: [
                { label: "Elaboração e entrega de obrigações fiscais para até 1 pessoa física.", icon: <CheckIcon color="success" /> },
                { label: "Constituição e entrega de obrigações fiscais para até 1 pessoa jurídica MEI (faturamento de até R$81.000/ano).", icon: <CheckIcon color="success" /> },
                { label: "Atendimento personalizado em horário comercial.", icon: <CheckIcon color="success" /> },
                { label: "Folha de pagamento de até 2 colaboradores.", icon: <CheckIcon color="success" /> },
                { label: "Elaboração e entrega de obrigações fiscais para 2 pessoas físicas.", icon: <CheckIcon color="success" /> },
                { label: "Constituição e entrega de obrigações fiscais para até 1 pessoa jurídica no regime SIMPLES NACIONAL.", icon: <CheckIcon color="success" /> },
                { label: "Folha de pagamento de até 6 colaboradores.", icon: <CheckIcon color="success" /> },
                { label: "Emissão de até 35 NFs/mês (sob demanda).", icon: <CheckIcon color="success" /> },
                { label: "Grupo Exclusivo no WhatsApp.", icon: <CheckIcon color="success" /> },
                { label: "Folha de pagamento de até 10 colaboradores.", icon: <CheckIcon color="success" /> },
                { label: "Emissão de até 70 NFs/mês (sob demanda).", icon: <CheckIcon color="success" /> },
                { label: "1 consultoria de até 4h por mês com emissão de parecer.", icon: <CheckIcon color="success" /> },
            ],
            description: objPlanos[3]?.descricao,
            priceOld: objPlanos[3]?.valorAntigoMensal ? Number(objPlanos[3]?.valorAntigoMensal) : 0,
            // discount: 10,
            recommended: false,
            priceNew: objPlanos[3]?.valorNovoMensal ? Number(objPlanos[3]?.valorNovoMensal) : 0,
            // priceOldYear: objPlanos[3]?.valorAntigoAnual ? Number(objPlanos[3]?.valorAntigoAnual) : "",
            // priceNewYear: objPlanos[3]?.valorNovoAnual ? Number(objPlanos[3]?.valorNovoAnual) : "",
            // discountYear: objPlanos[3]?.descontoAnual ? Number(objPlanos[3]?.descontoAnual) : "",

        }
    ];

    const HandleChoosePlan = (id, title, description, price, priceYear, periodicity) => {
        // console.log(title)
        // window.open(gerarLinkWhatsApp(`Olá, gostaria de assinar o plano ${title}.`), '_blank');
        if (!token) {
            navigate("/Cadastro");
        }

        if (hasPlan) {
            navigate("../Dashboard/Assinatura");
            return;
        } else {
            console.log({ id, title, description, price, priceYear, periodicity });
            if (periodicity === "mensal") {
                localStorage.setItem("planoSelecionado", JSON.stringify({ id, title, description, price, periodicity }));
            } else {
                localStorage.setItem("planoSelecionado", JSON.stringify({ id, title, description, price: priceYear, periodicity }));
            }
            if (token) {
                fetchLogin();
                navigate("../AssinarContrato");
            } else {
                navigate("/Cadastro");
            }
            return;
        }

    }

    const [periodicity] = useState("mensal");

    // const handleChange = (event) => {
    //     setPeriodicity(event.target.value);
    // };

    return (
        <section style={{ width: "100%", backgroundColor: "#f5f5f5", padding: "40px 0" }}>
            <div style={{ width: "90%", margin: "0 auto", textAlign: "center" }}>
                <h2 style={{ margin: "20px 0" }}>Escolha seu Plano</h2>
                <div
                    className="scroll-buttons"
                    style={{
                        display: showButtons ? "flex" : "none",
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
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <div
                        ref={scrollRef}
                        style={{
                            display: "flex",
                            // justifyContent: "center",
                            gap: "20px",
                            overflowX: "auto",
                            scrollSnapType: "x mandatory",
                            paddingBottom: "20px",
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        {plans.map((plan, i) => (
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
                                    padding: "10px",
                                    backgroundColor: "white",
                                }}
                            >
                                <div
                                    style={{
                                        width: "80%",
                                        margin: "0 auto 10px",
                                        height: "35px",
                                        backgroundColor: plan.recommended ? "#1EFF86" : "transparent",
                                        color: "black",
                                        borderRadius: "10px",
                                        padding: "5px",
                                        fontWeight: "bold",
                                        textAlign: "center",
                                    }}
                                >
                                    {plan.recommended ? (
                                        "RECOMENDADO"
                                    ) : ""}
                                </div>

                                <h1 style={{ textAlign: "center" }}>{plan.title}</h1>
                                <Divider sx={{ width: "50%", display: "inline-block", margin: "6px 0" }} />
                                <p style={{ fontSize: "12px", marginBottom: "10px", height: "75px" }}>{plan.description}</p>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    {plan.priceOld > 0 && (
                                        <p style={{ fontSize: "15px", marginRight: "5px" }}>
                                            DE: {plan?.priceOld?.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </p>
                                    )}
                                    {plan.discount ? (
                                        <p
                                            style={{
                                                fontSize: "13px",
                                                backgroundColor: "#1EFF86",
                                                padding: "1px 5px",
                                                borderRadius: "10px",
                                                color: "black",
                                            }}
                                        >
                                            <>{`${parseInt(plan.discount)}%OFF`}</>
                                        </p>
                                    ) : ("")}
                                </div>
                                <p style={{ fontSize: "25px" }}>
                                    <strong> <b style={{ fontSize: "12px", fontWeight: "normal" }}>POR:</b> R$ {plan.priceNew.toFixed(2).replace(".", ",")}<b style={{ fontSize: "12px", fontWeight: "normal" }}>/Mês</b></strong>
                                </p>
                                <div style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
                                    <div>
                                        {/* <FormControl fullWidth sx={{ mb: 2, maxWidth: "150px" }} size="small" >
                                        <InputLabel>Selecione</InputLabel>
                                        <Select
                                            value={periodicity}
                                            label="Periodicity"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={"mensal"}>Mensal</MenuItem>
                                            <MenuItem value={"anual"}>Anual</MenuItem>
                                        </Select>
                                    </FormControl> */}
                                        {/* { id: 1, name: "Serviço Contábil A", desc: "Descrição do Serviço A", price: 250 }, */}
                                        <Button onClick={() => HandleChoosePlan(plan.id, plan.title, plan.description, plan.priceNew, plan.priceNewYear, periodicity)} variant="contained" sx={{
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
                                        }}>
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
        </section>
    );
};

export default Plans;
