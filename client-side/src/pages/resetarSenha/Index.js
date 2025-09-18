import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import AlertError from "../components/AlertError";
import AlertSuccess from "../components/AlertSuccess";

import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";

const ResetarSenha = () => {
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const [openSnackbarError, setOpenSnackbarError] = useState(false);
    const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);
    const [mensagem, setMensagem] = useState("");

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    useEffect(() => {
        if (!token) {
            navigate("../login");
        }
    }, [token, navigate]);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (e) => e.preventDefault();
    const handleMouseUpPassword = (e) => e.preventDefault();

    const handleSubmit = async () => {
        if (novaSenha !== confirmarSenha) {
            setMensagem("As senhas não conferem.");
            setOpenSnackbarError(true);
            return;
        }

        setOpen(true);
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API_URL}/resetarSenha`,
                { token, novaSenha }
            );

            setMensagem(data.mensagem || "Senha redefinida com sucesso!");
            setOpenSnackbarSuccess(true);
            setOpen(false);

            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            console.error(err);
            setMensagem(
                err.response?.data?.mensagem || "Erro ao redefinir a senha."
            );
            setOpenSnackbarError(true);
            setOpen(false);
        }
    };

    return (
        <>
            <Header active="login" />
            <div
                style={{
                    marginTop: "60px",
                    width: "100%",
                    padding: "20px",
                    minHeight: "100vh",
                    backgroundColor: "#f9f2e4",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: "500px",
                        margin: "80px auto",
                        padding: "30px",
                        backgroundColor: "#fff",
                        borderRadius: "12px",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                    }}
                >
                    <h2 style={{ marginBottom: "20px", color: "#0b243d" }}>
                        Redefinir Senha
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        <FormControl variant="outlined" size="small" required>
                            <InputLabel htmlFor="nova-senha">Nova Senha</InputLabel>
                            <OutlinedInput
                                id="nova-senha"
                                type={showPassword ? "text" : "password"}
                                value={novaSenha}
                                onChange={(e) => setNovaSenha(e.target.value)}
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
                                label="Nova Senha"
                            />
                        </FormControl>

                        <TextField
                            type="password"
                            variant="outlined"
                            size="small"
                            label="Confirmar Senha"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            required
                        />

                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            sx={{
                                padding: "8px 28px",
                                fontSize: "1rem",
                                backgroundColor: "#ffc845",
                                color: "#0b243d",
                                borderRadius: "10px",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                                transition: "0.3s ease",
                                "&:hover": {
                                    backgroundColor: "#e6b53e",
                                    transform: "scale(1.05)",
                                },
                            }}
                        >
                            Redefinir Senha
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />

            <Loading open={open} />
            <AlertError
                setOpenSnackbarError={setOpenSnackbarError}
                openSnackbarError={openSnackbarError}
                mensagem={mensagem}
            />
            <AlertSuccess
                setOpenSnackbarSuccess={setOpenSnackbarSuccess}
                openSnackbarSuccess={openSnackbarSuccess}
                mensagem={mensagem}
            />
        </>
    );
};

export default ResetarSenha;
