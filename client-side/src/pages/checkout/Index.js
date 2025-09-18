import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
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

const Checkout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [isMobile, setIsMobile] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("BOLETO");
    const [discountCode, setDiscountCode] = useState("");
    const [discountAvailable, setDiscountAvailable] = useState([]);
    const [discountApplied, setDiscountApplied] = useState(false);
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
        const getDiscount = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/getDiscount`);
            console.log(response.data.data);
            if (response.data.status === 200) {
                setDiscountAvailable(response.data.data);
            } else {
                alert("Erro ao buscar descontos disponíveis.");
            }
        }

        getDiscount()
    }, [])

    useEffect(() => {
        const verifyPlan = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/hasPlan`, {
                headers: {
                    Authorization: token
                }
            });
            if (response.data.status === 200) {
                navigate("../Dashboard")
            }
        }
        verifyPlan()
    }, [navigate, token])

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
        console.log(errors)
        setCardErrors(errors);
        if (errors.valid) {
            console.log(discountApplied)
            setOpen(true);
            const email = localStorage.getItem("email");
            const token = localStorage.getItem("token");
            const planoSelecionado = JSON.parse(localStorage.getItem("planoSelecionado"));
            const idPlano = planoSelecionado.id;
            const tituloPlano = planoSelecionado.title;
            const periodicity = planoSelecionado.periodicity;
            cardData.number = TirarMascara(cardData.number);

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/criarAssinatura`, {
                idDesconto: discountApplied ? discountApplied.idDesconto : false,
                email: email,
                valor: total,
                metodo: paymentMethod,
                idPlano: idPlano,
                titulo: tituloPlano,
                periodicidade: periodicity,
                descricao: planoSelecionado.description,
                cardData: paymentMethod === "CREDIT_CARD" ? cardData : null
            }, {
                headers: { Authorization: token }
            });

            console.log(response.data)

            if (response.data.status === 200) {
                setOpen(false);
                await fetchUser();
                navigate("/Dashboard");
            } else {
                setOpen(false);
                alert("Erro ao processar pagamento.");
            }
        }
    };

    const applyDiscount = () => {
        for (let i = 0; i < discountAvailable.length; i++) {
            if (discountCode.toUpperCase() === discountAvailable[i].discountCode.toUpperCase()) {
                setDiscountApplied(discountAvailable[i]);
                alert("Cupom aplicado com sucesso!");
                return;
            }
        }
        alert("Cupom inválido.");
    };

    const handleCardInputChange = (e) => {
        setCardData({ ...cardData, [e.target.name]: e.target.value });
    };

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
                                <span>R$ {item.price.toFixed(2).replace(".", ",")}</span>
                            </div>
                        ))}

                        {/* Cupom de desconto */}
                        <div style={{ marginTop: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                            <TextField
                                key={discountApplied ? "applied" : "not_applied"}
                                label="Cupom de Desconto"
                                size="small"
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                            />
                            <Button
                                variant="outlined"
                                onClick={applyDiscount}
                                disabled={discountApplied}
                                sx={{
                                    height: "40px",
                                    backgroundColor: discountApplied ? "#d3ffd3" : undefined
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
                            <p style={{ color: "red" }}>- {FormatToBrl(cartItems[0].price * (Number(discountApplied.valorDesconto) / 100))}</p>
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
                            <div style={{
                                marginTop: "20px",
                                display: "flex",
                                flexDirection: isMobile ? "column" : "row",
                                gap: "20px"
                            }}>
                                {/* Formulário */}
                                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "15px" }}>
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
                                    <div style={{
                                        display: "flex",
                                        flexDirection: isMobile ? "column" : "row",
                                        gap: "15px"
                                    }}>
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
                                            fullWidth
                                            helperText={cardErrors.cvv}
                                            error={Boolean(cardErrors.cvv)}
                                        />
                                    </div>
                                </div>

                                {/* Visual do cartão */}
                                <div style={{
                                    flex: 1,
                                    background: "#285943",
                                    color: "white",
                                    padding: "20px",
                                    borderRadius: "12px",
                                    minHeight: "180px",
                                    maxWidth: "400px",
                                    display: isMobile ? "none" : "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                                    fontFamily: "monospace"
                                }}>
                                    <div style={{ fontSize: "0.9rem" }}>CARTÃO DE CRÉDITO</div>
                                    <div style={{ fontSize: "1.2rem", letterSpacing: "2px" }}>
                                        {cardData.number || "0000 0000 0000 0000"}
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        fontSize: "0.9rem"
                                    }}>
                                        <span>{cardData.name || "NOME DO TITULAR"}</span>
                                        <span>{cardData.expiry || "MM/AA"}</span>
                                    </div>
                                </div>
                            </div>
                        )}
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
                                <a href="/politica-de-privacidade" target="_blank" style={{ color: "#285943", textDecoration: "underline" }}>
                                    política de privacidade
                                </a>.
                            </Typography>
                        </div>
                        <Button
                            variant="contained"
                            onClick={handleFinishOrder}
                            sx={{
                                padding: "10px 28px",
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
        </>
    );
};

export default Checkout;
