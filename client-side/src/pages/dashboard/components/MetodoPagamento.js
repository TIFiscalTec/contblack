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
import CreditCardIcon from '@mui/icons-material/CreditCard';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import ModalNotificacao from "./ModalNotificacao";
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { MascaraCartaoCredito } from "../../../utils/MascaraCartaoCredito";
import { MascaraDataCartaoCredito } from "../../../utils/MascaraDataCartaoCredito";
import AlertError from "../../components/AlertError";
import AlertSuccess from "../../components/AlertSuccess";
import Loading from "../../components/Loading";

const MetodoPagamento = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [userActive, setUserActive] = useState(true);
    const [openModalNotificacao, setOpenModalNotificacao] = useState(false);
    const [notificacoes, setNotificacoes] = useState([]);
    const [planos, setPlanos] = useState([]);
    const [assinatura, setAssinatura] = useState(null);
    const [showBack, setShowBack] = useState(false);
    const [openSnackbarError, setOpenSnackbarError] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);
    const [open, setOpen] = useState(false);

    const [isMobile, setIsMobile] = useState(false);
    const [cardData, setCardData] = useState({
        name: "",
        number: "",
        expiry: "",
        cvv: ""
    });
    const [cardErrors, setCardErrors] = useState({});
    const [selectedValue, setSelectedValue] = useState('');

    useEffect(() => {
        const hasFaturasVencidas = user?.faturas?.vencidas?.length > 0;
        setUserActive(!hasFaturasVencidas);
        setSelectedValue(user?.assinatura?.metodoPagamento || '');
    }, [user]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    }

    const handleCardInputChange = (e) => {
        setCardData({ ...cardData, [e.target.name]: e.target.value });
    };

    const validateCardData = (data) => {
        const errors = { valid: true };

        // Nome no cartão (mínimo 3 caracteres, apenas letras e espaços)
        if (!data.name.trim()) {
            errors.name = "O nome no cartão é obrigatório";
            errors.valid = false;
        } else if (!/^[a-zA-ZÀ-ÿ\s]{3,}$/.test(data.name)) {
            errors.name = "Nome inválido";
            errors.valid = false;
        }

        // Número do cartão (somente números, entre 13 e 19 dígitos)
        const cleanNumber = data.number.replace(/\s+/g, "");
        if (!cleanNumber) {
            errors.number = "O número do cartão é obrigatório";
            errors.valid = false;
        } else if (!/^\d{13,19}$/.test(cleanNumber)) {
            errors.number = "Número de cartão inválido";
            errors.valid = false;
        }

        // Validade (MM/YYYY)
        if (!data.expiry) {
            errors.expiry = "A data de validade é obrigatória";
            errors.valid = false;
        } else if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(data.expiry)) {
            errors.expiry = "Formato inválido (MM/AAAA)";
            errors.valid = false;
        } else {
            const [month, year] = data.expiry.split("/");
            const now = new Date();
            const expiryDate = new Date(year, month); // mês/ano do cartão
            if (expiryDate < now) {
                errors.expiry = "Cartão vencido";
                errors.valid = false;
            }
        }

        // CVV (3 ou 4 dígitos)
        if (!data.cvv) {
            errors.cvv = "O CVV é obrigatório";
            errors.valid = false;
        } else if (!/^\d{3,4}$/.test(data.cvv)) {
            errors.cvv = "CVV inválido";
            errors.valid = false;
        }

        return errors;
    };


    const handleChangePaymentMethod = async () => {
        console.log(user.faturas.pendentes)
        let errors = { valid: true };
        if (user.faturas.pendentes.length > 0 || user.faturas.vencidas.length > 0) {
            errors.valid = false;
            setMensagem("Não é possível alterar o método de pagamento com faturas pendentes ou vencidas.");
            setOpenSnackbarError(true);
            return;
        }
        if (selectedValue === "CREDIT_CARD") {
            errors = validateCardData(cardData);
        }
        setCardErrors(errors);

        if (errors.valid) {
            setOpen(true);
            try {
                await axios.post(`${process.env.REACT_APP_API_URL}/alterarMetodoPagamento`, {
                    assinatura,
                    idAssinatura: assinatura.id,
                    idCustomer: assinatura.customer,
                    value: assinatura.value,
                    description: assinatura.description,
                    nextDueDate: assinatura.nextDueDate,
                    metodoPagamento: selectedValue,
                    cardData: selectedValue === "CREDIT_CARD" ? cardData : null,
                },
                    {
                        headers: {
                            Authorization: `${localStorage.getItem("token")}`,
                        },
                    }
                );
                setMensagem("Método de pagamento alterado com sucesso!");
                setOpenSnackbarSuccess(true);
            } catch (error) {
                setMensagem("Erro ao alterar o método de pagamento. Tente novamente mais tarde.");
                setOpenSnackbarError(true);
                console.error("Erro ao alterar método de pagamento:", error);
            } finally {
                setOpen(false);
            }
        }
    };

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
                        Alterar Método de Pagamento
                    </Typography>
                    <Divider />
                    <Box mt={3}>
                        <FormControl component="fieldset">
                            <Typography variant="subtitle1" fontWeight={600} mb={1}>
                                Forma de Pagamento
                            </Typography>

                            <RadioGroup
                                name="paymentMethod"
                                value={selectedValue}
                                onChange={handleChange}
                            >
                                <FormControlLabel
                                    value="BOLETO"
                                    control={<Radio />}
                                    label={
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <QrCode2Icon color="action" />
                                            <Typography>Boleto Bancário</Typography>
                                        </Box>
                                    }
                                />

                                <FormControlLabel
                                    value="CREDIT_CARD"
                                    control={<Radio />}
                                    label={
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <CreditCardIcon color="action" />
                                            <Typography>Cartão de Crédito</Typography>
                                        </Box>
                                    }
                                />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    {selectedValue === "CREDIT_CARD" && (
                        <div
                            style={{
                                marginTop: "20px",
                                display: "flex",
                                flexDirection: isMobile ? "column" : "row",
                                gap: "20px",
                            }}
                        >
                            {/* Formulário */}
                            <div
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "15px",
                                }}
                            >
                                <TextField
                                    label="Nome no Cartão"
                                    fullWidth
                                    size="small"
                                    placeholder="Ex: João da Silva"
                                    name="name"
                                    value={cardData.name}
                                    onChange={handleCardInputChange}
                                    helperText={cardErrors.name}
                                    error={Boolean(cardErrors.name)}
                                />

                                <TextField
                                    label="Número do Cartão"
                                    fullWidth
                                    size="small"
                                    inputProps={{ maxLength: 19 }}
                                    placeholder="0000 0000 0000 0000"
                                    name="number"
                                    value={MascaraCartaoCredito(cardData.number)}
                                    onChange={handleCardInputChange}
                                    helperText={cardErrors.number}
                                    error={Boolean(cardErrors.number)}
                                />

                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: isMobile ? "column" : "row",
                                        gap: "15px",
                                    }}
                                >
                                    <TextField
                                        label="Validade (MM/AAAA)"
                                        size="small"
                                        placeholder="MM/AAAA"
                                        inputProps={{ maxLength: 7 }}
                                        name="expiry"
                                        value={MascaraDataCartaoCredito(cardData.expiry)}
                                        onChange={handleCardInputChange}
                                        fullWidth
                                        helperText={cardErrors.expiry}
                                        error={Boolean(cardErrors.expiry)}
                                    />

                                    <TextField
                                        label="CVV"
                                        size="small"
                                        placeholder="123"
                                        inputProps={{ maxLength: 3 }}
                                        name="cvv"
                                        value={cardData.cvv}
                                        onChange={handleCardInputChange}
                                        onFocus={() => setShowBack(true)}  // mostra verso
                                        onBlur={() => setShowBack(false)}  // volta para frente
                                        fullWidth
                                        helperText={cardErrors.cvv}
                                        error={Boolean(cardErrors.cvv)}
                                    />
                                </div>

                                {/* <FormControlLabel
                                sx={{ width: "fit-content" }}
                                control={<Checkbox />}
                                label={
                                    <span style={{ fontSize: "0.9rem", userSelect: "none" }}>
                                        O titular do cartão é diferente do cadastro?
                                    </span>
                                }
                            /> */}
                            </div>

                            {/* Cartão com efeito flip */}
                            <div
                                style={{
                                    flex: 1,
                                    perspective: "1000px",
                                    maxWidth: "400px",
                                    minHeight: "200px",
                                    display: isMobile ? "none" : "block",
                                }}
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: "12px",
                                        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                                        color: "white",
                                        fontFamily: "monospace",
                                        transition: "transform 0.6s",
                                        transformStyle: "preserve-3d",
                                        transform: showBack ? "rotateY(180deg)" : "rotateY(0deg)",
                                        position: "relative",
                                    }}
                                >
                                    {/* Frente do cartão */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            width: "100%",
                                            height: "100%",
                                            backfaceVisibility: "hidden",
                                            background: "#161616ff",
                                            borderRadius: "12px",
                                            padding: "20px",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <div style={{ fontSize: "0.9rem" }}>CARTÃO DE CRÉDITO</div>
                                        <div style={{ fontSize: "1.2rem", letterSpacing: "2px" }}>
                                            {cardData.number || "0000 0000 0000 0000"}
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                fontSize: "0.9rem",
                                            }}
                                        >
                                            <span>{cardData.name || "NOME DO TITULAR"}</span>
                                            <span>{cardData.expiry || "MM/AA"}</span>
                                        </div>
                                    </div>

                                    {/* Verso do cartão */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            width: "100%",
                                            height: "100%",
                                            backfaceVisibility: "hidden",
                                            background: "#161616ff",
                                            borderRadius: "12px",
                                            padding: "20px",
                                            transform: "rotateY(180deg)",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <div
                                            style={{
                                                background: "#000",
                                                height: "40px",
                                                marginBottom: "20px",
                                                borderRadius: "4px",
                                            }}
                                        />
                                        <div
                                            style={{
                                                alignSelf: "flex-end",
                                                background: "#fff",
                                                color: "#000",
                                                padding: "5px 10px",
                                                borderRadius: "6px",
                                                fontWeight: "bold",
                                                minWidth: "60px",
                                                textAlign: "center",
                                            }}
                                        >
                                            {cardData.cvv || "•••"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <Button
                        variant="contained"
                        sx={{ mt: 3, backgroundColor: "#ffc845" }}
                        onClick={handleChangePaymentMethod}
                        disabled={selectedValue === user?.assinatura?.metodoPagamento}
                    >
                        Salvar Método de Pagamento
                    </Button>
                </Box>
            </Box>

            <ModalNotificacao
                openModalNotificacao={openModalNotificacao}
                onClose={() => setOpenModalNotificacao(false)}
                notificacoes={notificacoes}
            />
            <AlertError setOpenSnackbarError={setOpenSnackbarError} openSnackbarError={openSnackbarError} mensagem={mensagem} />
            <AlertSuccess setOpenSnackbarSuccess={setOpenSnackbarSuccess} openSnackbarSuccess={openSnackbarSuccess} mensagem={mensagem} />
            <Loading open={open} />
        </>
    );
};

export default MetodoPagamento;
