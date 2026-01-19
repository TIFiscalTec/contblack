import React, { useEffect, useState } from "react";
import HeaderDashboard from "../../../components/HeaderDashboard";
import { Divider, Typography, FormControl, RadioGroup, FormControlLabel, Radio, TextField, Button } from "@mui/material";
import { MascaraCartaoCredito } from "../../../../utils/MascaraCartaoCredito";
import { MascaraDataCartaoCredito } from "../../../../utils/MascaraDataCartaoCredito";
import { useUser } from "../../../../contexts/UserContext";
import LinearProgress from '@mui/material/LinearProgress';


const CheckoutEnderecoFiscal = () => {

    const { user } = useUser();

    const [userActive, setUserActive] = useState(true);
    const [openModalNotificacao, setOpenModalNotificacao] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("BOLETO");
    const [cardData, setCardData] = useState({
        name: "",
        number: "",
        expiry: "",
        cvv: ""
    });
    const [cardErrors, setCardErrors] = useState({});
    const [showBack, setShowBack] = useState(false);
    const isMobile = window.innerWidth <= 600;

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };
    const handleCardInputChange = (event) => {
        const { name, value } = event.target;
        setCardData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    

    return (
        <>
            <HeaderDashboard userActive={userActive} setOpenModalNotificacao={setOpenModalNotificacao} notificacoes={0} />
            <div style={{ marginTop: "60px", padding: "20px", minHeight: "100vh" }}>
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <div style={{ width: window.innerWidth > 600 ? "80%" : "95%", backgroundColor: "#f9f9f9", padding: "30px", borderRadius: "8px" }}>
                        <div style={{ width: "100%" }}>
                            <h2 style={{ color: "black" }}>Resumo do pedido</h2>
                        </div>

                        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", marginTop: "20px", flexWrap: "wrap", gap: "10px" }}>
                            <span style={{ color: "black" }}>
                                <p>
                                    Endereço Fiscal
                                </p>
                                <p style={{fontSize: "12px"}}>
                                    {user?.enderecoFiscal ? user?.enderecoFiscal?.rua + ", " + user?.enderecoFiscal?.numero + " - " + user?.enderecoFiscal?.bairro + ", " + user?.enderecoFiscal?.cidade + " - " + user?.enderecoFiscal?.estado + ", " + user?.enderecoFiscal?.cep : <LinearProgress />}
                                </p>
                            </span>
                            <span style={{ color: "black" }}>R$ 80,00/mês</span>
                        </div>
                        <Divider sx={{ my: 2, borderColor: "black" }} />
                        <div style={{ width: "100%" }}>
                            <h2 style={{ color: "black" }}>Forma de pagamento</h2>
                        </div>
                        {/* Pagamento */}
                        <div style={{ marginTop: "10px" }}>
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
                                // onClick={handleFinishOrder}
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
            </div>
        </>
    )
};

export default CheckoutEnderecoFiscal;