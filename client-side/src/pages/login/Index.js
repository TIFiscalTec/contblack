import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Footer from "../components/Footer";
import { useUser } from "../../contexts/UserContext";
import Loading from "../components/Loading";
import AlertError from "../components/AlertError";
import ModalRecuperarSenha from "../components/ModalRecuperarSenha";
import AlertSuccess from "../components/AlertSuccess";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [openSnackbarError, setOpenSnackbarError] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [open, setOpen] = useState(false);
    const [openRecuperarSenha, setOpenRecuperarSenha] = useState(false);
    const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);

    const { fetchUser } = useUser();

    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLoginSubmit = async () => {
        setOpen(true);
        console.log("Submitting login with:", { email, senha });

        const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { email, senha });
        console.log(response)
        if (response.data.status === 200) {
            const { token, usuario } = response.data;
            localStorage.setItem("token", token);
            localStorage.setItem("email", usuario.Email);
            await fetchUser();
            setOpen(false);
            navigate("../Dashboard");
        } else {
            setOpen(false);
            setMensagem("E-mail ou senha incorreto.")
            setOpenSnackbarError(true)
        }

    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();
    const handleMouseUpPassword = (event) => event.preventDefault();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Header active="login" />
            <div
                style={{
                    marginTop: "60px",
                    width: "100%",
                    padding: "20px",
                    minHeight: "100vh",
                    backgroundColor: "#f9f2e4", // Fundo geral (bege claro)
                }}
            >
                <div
                    style={{
                        width: isMobile ? "100%" : "80%",
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        justifyContent: "space-between",
                        alignItems: "stretch",
                        backgroundColor: "#fff", // Card branco para contraste
                        margin: "0 auto",
                        borderRadius: "12px",
                        overflow: "hidden",
                        marginTop: "60px",
                        gap: isMobile ? "30px" : "0",
                    }}
                >
                    {/* LOGIN */}
                    <div
                        style={{
                            width: isMobile ? "100%" : "60%",
                            padding: isMobile ? "20px" : "30px",
                            boxSizing: "border-box"
                        }}
                    >
                        <h2 style={{ marginBottom: "20px", color: "#0b243d" }}>Login</h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                            <TextField
                                variant="outlined"
                                type="email"
                                name="email"
                                label="E-mail"
                                placeholder="E-mail"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                size="small"
                            />
                            <FormControl variant="outlined" size="small" required>
                                <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                                <OutlinedInput
                                    onChange={(e) => setSenha(e.target.value)}
                                    name="senha"
                                    required
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                onMouseUp={handleMouseUpPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Senha"
                                />
                            </FormControl>
                            <span>Esqueceu a senha? <b style={{ color: "blue", cursor: "pointer" }} onClick={() => setOpenRecuperarSenha(true)}>Clique aqui</b></span>
                            <Button
                                onClick={handleLoginSubmit}
                                variant="contained"
                                sx={{
                                    padding: "5px 28px",
                                    fontSize: "1rem",
                                    backgroundColor: "#ffc845", // amarelo
                                    color: "#0b243d", // azul escuro
                                    borderRadius: "10px",
                                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                                    transition: "0.3s ease",
                                    '&:hover': {
                                        backgroundColor: "#e6b53e", // amarelo mais escuro
                                        transform: "scale(1.05)",
                                    },
                                }}
                            >
                                Entrar
                            </Button>
                        </div>
                    </div>

                    {/* CADASTRO REDIRECIONAMENTO */}
                    <div
                        style={{
                            width: isMobile ? "100%" : "35%",
                            backgroundColor: "#0b243d", // azul escuro
                            color: "#fff",
                            padding: isMobile ? "20px" : "30px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            boxSizing: "border-box"
                        }}
                    >
                        <h2 style={{ color: "#ffc845" }}>Primeira vez aqui?</h2>
                        <p style={{ margin: "20px 0", color: "#fff" }}>
                            Escolha um plano que se encaixe nas suas necessidades e cadastre-se para acessar todos os nossos serviços contábeis especializados.
                        </p>
                        <Button
                            onClick={() => navigate("../Planos")}
                            variant="contained"
                            sx={{
                                padding: "5px 28px",
                                width: "100%",
                                fontSize: "1rem",
                                backgroundColor: "#ffc845", // amarelo
                                color: "#0b243d", // azul escuro
                                borderRadius: "10px",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                                transition: "0.3s ease",
                                '&:hover': {
                                    backgroundColor: "#e6b53e",
                                    transform: "scale(1.05)",
                                },
                            }}
                        >
                            Ver Planos
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
            <Loading open={open} />
            <AlertError setOpenSnackbarError={setOpenSnackbarError} openSnackbarError={openSnackbarError} mensagem={mensagem} />
            <AlertSuccess setOpenSnackbarSuccess={setOpenSnackbarSuccess} openSnackbarSuccess={openSnackbarSuccess} mensagem={mensagem} />
            <ModalRecuperarSenha setOpenSnackbarSuccess={setOpenSnackbarSuccess} openRecuperarSenha={openRecuperarSenha} setOpenRecuperarSenha={setOpenRecuperarSenha} setOpenSnackbarError={setOpenSnackbarError} openSnackbarError={openSnackbarError} mensagem={mensagem} setMensagem={setMensagem} />
        </>
    );
};

export default Login;
