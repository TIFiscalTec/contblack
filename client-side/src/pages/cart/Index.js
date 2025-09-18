import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Cart = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const plano = JSON.parse(localStorage.getItem("planoSelecionado"));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const [cartItems, setCartItems] = useState(() => {
        if (plano) {
            return [plano];
        }
        return [];
    });
    const [isMobile, setIsMobile] = useState(false);

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
    }, [navigate, token])

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const removeItem = (id) => {
        localStorage.removeItem("planoSelecionado");
        setCartItems((prev) => prev.filter(item => item.id !== id));
    };

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    const HandleFinalizarCompra = () => {


        navigate("../Checkout");
    }

    return (
        <>
            <Header active="cart" />
            <div style={{ marginTop: "80px", padding: "20px", minHeight: "100vh" }}>
                <div style={{
                    width: isMobile ? "100%" : "80%",
                    margin: "0 auto",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "12px",
                    padding: isMobile ? "20px" : "30px",
                    boxSizing: "border-box",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
                }}>
                    <h2 style={{ marginBottom: "20px" }}>Plano Escolhido</h2>

                    {cartItems.length === 0 ? (
                        <p>Seu carrinho está vazio.</p>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "10px 0",
                                borderBottom: "1px solid #ccc"
                            }}>
                                <div>
                                    <strong>{item.title}</strong><br />
                                    <p>{item.description}</p>
                                    <span>R$ {item.price ? item.price.toFixed(2).replace(".", ",") : "0,00"}</span>
                                </div>
                                <IconButton color="error" onClick={() => removeItem(item.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        ))
                    )}

                    <div style={{ marginTop: "30px", textAlign: "right" }}>
                        <h3>Total: R$ {total ? total.toFixed(2).replace(".", ",") : "0,00"}</h3>
                        <Button
                            variant="contained"
                            disabled={cartItems.length === 0}
                            onClick={HandleFinalizarCompra}
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
                            Finalizar Compra
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Cart;
