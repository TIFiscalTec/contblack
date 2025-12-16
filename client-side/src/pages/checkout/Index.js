import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Checkbox from '@mui/material/Checkbox';
import {
    Button,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useUser } from "../../contexts/UserContext";
import Loading from "../components/Loading";
import { FormatToBrl } from "../../utils/FormatToBrl";
import { MascaraCartaoCredito } from "../../utils/MascaraCartaoCredito";
import { MascaraDataCartaoCredito } from "../../utils/MascaraDataCartaoCredito";
import { TirarMascara } from "../../utils/TirarMascara";
import AlertError from "../components/AlertError";
import AlertSuccess from "../components/AlertSuccess";

const Checkout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (!token) {
            navigate("/cadastro" /* Página de login ou cadastro */);
        }
    }, [navigate, token]);
    const [isMobile, setIsMobile] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("BOLETO");
    const [discountCode, setDiscountCode] = useState("");
    const [discountApplied, setDiscountApplied] = useState(false);
    // const [isChecked, setIsChecked] = useState(false);
    const [showBack, setShowBack] = useState(false);
    const [openSnackbarError, setOpenSnackbarError] = useState(false);
    const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [cardData, setCardData] = useState({
        name: "",
        number: "",
        expiry: "",
        cvv: ""
    });
    const [cardErrors, setCardErrors] = useState({});

    const [open, setOpen] = useState(false);

    const { fetchUser } = useUser();

    const plano = JSON.parse(localStorage.getItem("planoSelecionado"));

    useEffect(() => {
        if (!plano) {
            navigate("/Planos");
        }
    }, [navigate, plano]);


    const [cartItems] = useState(() => {
        if (plano) {
            return [plano];
        }
        return [];
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        const verifyPlan = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/hasPlan`, {
                headers: {
                    Authorization: token
                }
            });
            if (response.data.status === 200) {
                navigate("../Dashboard");
            }
        }
        verifyPlan()
    }, [navigate, token]);


    const originalTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    const total = discountApplied ? originalTotal - (originalTotal * (Number(discountApplied.valorDesconto) / 100)) : originalTotal;

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
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


    const handleFinishOrder = async () => {
        let errors = { valid: true };
        if (paymentMethod === "CREDIT_CARD") {
            errors = validateCardData(cardData);
        }
        setCardErrors(errors);
        if (errors.valid) {
            setOpen(true);
            const email = localStorage.getItem("email");
            const token = localStorage.getItem("token");

            const idPlano = plano.id;
            const tituloPlano = plano.title;
            const periodicity = plano.periodicity;
            cardData.number = TirarMascara(cardData.number);

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/criarAssinatura`, {
                idDesconto: discountApplied ? discountApplied.idDesconto : false,
                email: email,
                valor: total,
                metodo: paymentMethod,
                idPlano: idPlano,
                titulo: tituloPlano,
                periodicidade: periodicity,
                descricao: plano.description,
                cardData: paymentMethod === "CREDIT_CARD" ? cardData : null
            }, {
                headers: { Authorization: token }
            });

            if (response.data.status === 200) {
                setOpen(false);
                await fetchUser();
                navigate("../apresentacao-contblack");
            } else {
                setOpen(false);
                setMensagem("Erro ao processar pagamento. Tente novamente.");
                setOpenSnackbarError(true);
            }
        }
    };

    const applyDiscount = async () => {

        const response = await axios.post(`${process.env.REACT_APP_API_URL}/aplicarDesconto`, {
            codigo: discountCode
        }, {
            headers: { Authorization: token },
        });

        if (response.data.status === 200) {
            setDiscountApplied(response.data.desconto);
            setMensagem("Desconto aplicado com sucesso!");
            setOpenSnackbarSuccess(true);
            return;
        } else {
            setMensagem("Cupom inválido.");
            setOpenSnackbarError(true);
        }
    };

    const handleCardInputChange = (e) => {
        setCardData({ ...cardData, [e.target.name]: e.target.value });
    };

    // const handleCheck = (e) => {
    //     setIsChecked(e.target.checked);
    // }

    return (
        <>
            <Header active="checkout" />
            <div style={{ marginTop: "80px", padding: "20px", minHeight: "100vh" }}>
                <div style={{
                    width: isMobile ? "100%" : "80%",
                    margin: "0 auto",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "12px",
                    padding: isMobile ? "20px" : "30px",
                    boxSizing: "border-box",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
                }}>
                    <h2>Finalizar Compra</h2>

                    {/* Resumo do pedido */}
                    <div>
                        <Typography variant="h6" gutterBottom>Resumo do Pedido</Typography>
                        {cartItems.map(item => (
                            <div key={item.id} style={{
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "10px 0",
                                borderBottom: "1px solid #ccc"
                            }}>
                                <span>{item.title}</span>
                                <span>R$ {item.price.toFixed(2).replace(".", ",")} / mês</span>
                            </div>
                        ))}

                        {/* Cupom de desconto */}
                        <div style={{ marginTop: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                            <TextField
                                disabled={discountApplied !== false}
                                label="Cupom de Desconto"
                                autoComplete="off"
                                size="small"
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                            />
                            <Button
                                variant="outlined"
                                onClick={applyDiscount}
                                disabled={discountApplied !== false}
                                sx={{
                                    padding: "8px 24px",
                                    borderRadius: "17px 0 17px 0",
                                    borderColor: "#9C01B9",
                                    fontSize: "0.8rem",
                                    color: "white",
                                    backgroundColor: discountApplied ? "#d3ffd3" : "#9C01B9",
                                    fontWeight: 800,
                                    transition: "0.3s ease",
                                    '&:hover': {
                                        backgroundColor: "#1EFF86",
                                        boxShadow: "0 4px 10px #1EFF86",
                                        borderColor: "#1EFF86",
                                    }
                                }}
                            >
                                Aplicar
                            </Button>
                        </div>

                        <div style={{
                            display: discountApplied ? "flex" : "none",
                            justifyContent: "space-between",
                            marginTop: "15px"
                        }}>
                            <span>Desconto:</span>
                            <p style={{ color: "red" }}>- {FormatToBrl(cartItems[0]?.price * (Number(discountApplied.valorDesconto) / 100))}</p>
                        </div>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "15px",
                            fontWeight: "bold"
                        }}>
                            <span>Total:</span>
                            <span>{FormatToBrl(total)}</span>
                        </div>
                    </div>

                    {/* Pagamento */}
                    <div style={{ marginTop: "30px" }}>
                        <Typography variant="h6" gutterBottom>Forma de Pagamento</Typography>
                        <FormControl component="fieldset">
                            <RadioGroup
                                value={paymentMethod}
                                onChange={handlePaymentChange}
                                row={!isMobile}
                            >
                                <FormControlLabel key="boleto" value="BOLETO" control={<Radio />} label="Boleto Bancário" />
                                <FormControlLabel key="cartao_credito" value="CREDIT_CARD" control={<Radio />} label="Cartão de Crédito" />
                            </RadioGroup>
                        </FormControl>

                        {paymentMethod === "CREDIT_CARD" && (
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
                                                background: "linear-gradient(135deg, #000000ff, #0a1a12d3)",
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
                                                background: "#0a1a12d3",
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
                        {/* {isChecked && (
                            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
                                <TextField
                                    label="E-mail do Titular"
                                    fullWidth
                                    size="small"
                                    placeholder="exemplo@gmail.com"
                                    name="email"
                                />
                                <div style={{
                                    display: "flex",
                                    flexDirection: isMobile ? "column" : "row",
                                    gap: "15px"
                                }}>
                                    <TextField
                                        label="CPF ou CNPJ do Titular"
                                        size="small"
                                        fullWidth
                                        placeholder="xxx.xxx.xxx-xx ou xx.xxx.xxx/xxxx-xx"
                                        inputProps={{ maxLength: 18 }}
                                        name="document"
                                    />
                                    <TextField
                                        label="CEP do Titular"
                                        size="small"
                                        fullWidth
                                        placeholder="xxxxx-xxx"
                                        inputProps={{ maxLength: 10 }}
                                        name="cep"
                                    />
                                    <TextField
                                        label="Telefone do Titular"
                                        size="small"
                                        fullWidth
                                        placeholder="(xx) xxxxx-xxxx"
                                        inputProps={{ maxLength: 15 }}
                                        name="phone"
                                    />
                                </div>
                            </div>
                        )} */}
                    </div>

                    {/* Política e botão */}
                    <div style={{
                        marginTop: "30px",
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        justifyContent: "space-between",
                        alignItems: isMobile ? "flex-start" : "center",
                        gap: isMobile ? "20px" : "0"
                    }}>
                        <div style={{ flex: 1 }}>
                            <Typography variant="body2" color="textSecondary">
                                Seus dados serão utilizados para processar a compra, melhorar sua experiência e conforme nossa{" "}
                                <a href="/politica-de-privacidade" target="_blank" style={{ color: "linear-gradient(135deg, #1e3d2f, #14532d)", textDecoration: "underline" }}>
                                    política de privacidade
                                </a>.
                            </Typography>
                        </div>
                        <Button
                            variant="contained"
                            onClick={handleFinishOrder}
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
                            Confirmar Pedido
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
            <Loading open={open} />
            <AlertError openSnackbarError={openSnackbarError} setOpenSnackbarError={setOpenSnackbarError} mensagem={mensagem} />
            <AlertSuccess openSnackbarSuccess={openSnackbarSuccess} setOpenSnackbarSuccess={setOpenSnackbarSuccess} mensagem={mensagem} />
        </>
    );
};

export default Checkout;
