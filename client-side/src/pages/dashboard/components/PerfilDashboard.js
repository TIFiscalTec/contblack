import { useState, useEffect } from "react";
import HeaderDashboard from "../../components/HeaderDashboard";
import { useUser } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import axios from "axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { MascaraCpf } from "../../../utils/MascaraCpf";
import { MascaraCnpj } from "../../../utils/MascaraCnpj";
import { MascaraTelefone } from "../../../utils/MascaraTelefone";
import { MascaraCep } from "../../../utils/MascaraCep";
import { TirarMascara } from "../../../utils/TirarMascara";
import AlertSuccess from "../../components/AlertSuccess";

const PerfilDashboard = () => {

    const [userActive, setUserActive] = useState(true);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { user } = useUser();
    console.log(user)

    const [Nome, setNome] = useState("");
    const [Email, setEmail] = useState("");
    const [Cpf, setCpf] = useState("");
    const [Cnpj, setCnpj] = useState("");
    const [RazaoSocial, setRazaoSocial] = useState("");
    const [Telefone, setTelefone] = useState("");
    const [Endereco, setEndereco] = useState("");
    const [Numero, setNumero] = useState("");
    const [Bairro, setBairro] = useState("");
    const [Cidade, setCidade] = useState("");
    const [Estado, setEstado] = useState("");
    const [Cep, setCep] = useState("");
    const [Complemento, setComplemento] = useState("");
    const [hasChange] = useState(true)
    const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);
    const [mensagem, setMensagem] = useState("");


    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) navigate("../Login");
    }, [token, navigate]);

    useEffect(() => {
        if (!user) {
            setOpen(true);
            return;
        }
        setNome(user?.usuario?.Nome || "");
        setEmail(user?.usuario?.Email || "");
        setCpf(user?.usuario?.Cpf || "");
        setCnpj(user?.usuario?.Cnpj || "");
        setRazaoSocial(user?.usuario?.RazaoSocial || "");
        setTelefone(user?.usuario?.Telefone || "");
        setEndereco(user?.endereco?.Endereco || "");
        setNumero(user?.endereco?.Numero || "");
        setCep(user?.endereco?.Cep || "");
        setCidade(user?.endereco?.Cidade || "");
        setEstado(user?.endereco?.Estado || "");
        setComplemento(user?.endereco?.Complemento || "");
        setBairro(user?.endereco?.Bairro || "");
        setOpen(false);
    }, [user]);

    useEffect(() => {
        const hasFaturasVencidas = user?.faturas?.vencidas?.length > 0;
        setUserActive(!hasFaturasVencidas);
    }, [user]);


    const handleSaveChanges = async () => {
        setOpen(true)
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/atualizarPerfil`, {
            Nome,
            Email,
            Cpf: TirarMascara(Cpf),
            Cnpj: TirarMascara(Cnpj),
            RazaoSocial,
            Telefone: TirarMascara(Telefone),
            rua: Endereco,
            Numero,
            Bairro,
            Cidade,
            Estado,
            Cep: TirarMascara(Cep),
            Complemento
        }, {
            headers: { Authorization: token }
        });

        if (response.data.status === 200) {
            setOpen(false);
            setOpenSnackbarSuccess(true);
            setMensagem("Perfil atualizado com sucesso");
        } else {
            setOpen(false);
            alert("Erro ao atualizar perfil");
        }
    }

    return (
        <>
            <HeaderDashboard userActive={userActive} />
            <div style={{ marginTop: "60px", padding: "20px", minHeight: "100vh", background: "#f4f6f8", width: "100%" }} >
                <div style={{ width: "100%", height: "fit-content", padding: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ width: "80%", height: "fit-content" }}>
                        <IconButton onClick={() => navigate(-1)}>
                            <ArrowBackIcon sx={{ fontSize: "40px", color: "black" }} />
                        </IconButton>
                    </div>
                </div>

                <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div style={{
                        width: "60%",
                        minWidth: "400px",
                        border: "1px solid #eee",
                        borderRadius: "8px",
                        padding: "20px",
                        background: "#fff"
                    }}>
                        <h1>Meu Perfil</h1>

                        <div>
                            <Divider />
                            <div style={{ padding: "10px" }}>
                                <h3>Dados Pessoais</h3>
                            </div>

                            <div style={{ padding: "12px", width: "100%" }}>
                                <TextField fullWidth label="Nome" value={Nome} onChange={(e) => setNome(e.target.value)} size="small" variant="outlined" />
                            </div>
                            <div style={{ padding: "12px", width: "100%" }}>
                                <TextField fullWidth label="E-mail" value={Email} disabled size="small" variant="outlined" />
                            </div>
                            <div style={{
                                padding: "12px",
                                width: "100%",
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "12px"
                            }}>
                                {user?.usuario?.TipoPessoa === "pessoaFisica" ? (
                                    <TextField
                                        label="CPF"
                                        value={MascaraCpf(Cpf)}
                                        onChange={(e) => setCpf(e.target.value)}
                                        size="small"
                                        variant="outlined"
                                        sx={{ flex: "1 1 200px" }}
                                    />
                                ) : (
                                    <TextField
                                        label="CNPJ"
                                        value={MascaraCnpj(Cnpj)}
                                        onChange={(e) => setCnpj(e.target.value)}
                                        size="small"
                                        variant="outlined"
                                        sx={{ flex: "1 1 200px" }}
                                    />
                                )}
                                <TextField
                                    label="Telefone"
                                    value={MascaraTelefone(Telefone)}
                                    onChange={(e) => setTelefone(e.target.value)}
                                    size="small"
                                    variant="outlined"
                                    sx={{ flex: "1 1 200px" }}
                                />
                            </div>
                            {user?.usuario?.TipoPessoa === "pessoaJuridica" && (
                                <div style={{ padding: "12px", width: "100%" }}>
                                    <TextField fullWidth label="Razão social" value={RazaoSocial} onChange={(e) => setRazaoSocial(e.target.value)} size="small" variant="outlined" />
                                </div>
                            )}
                            <div style={{ padding: "10px" }}>
                                <h3>Dados de Endereço</h3>
                            </div>
                            <div style={{
                                padding: "12px",
                                width: "100%",
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "12px"
                            }}>
                                <TextField
                                    label="Nome da rua"
                                    value={Endereco}
                                    onChange={(e) => setEndereco(e.target.value)}
                                    size="small"
                                    variant="outlined"
                                    sx={{ flex: "1 1 60%" }}
                                />
                                <TextField
                                    label="Número"
                                    value={Numero}
                                    onChange={(e) => setNumero(e.target.value)}
                                    size="small"
                                    variant="outlined"
                                    sx={{ flex: "1 1 35%" }}
                                />
                            </div>
                            <div style={{
                                padding: "12px",
                                width: "100%",
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "12px"
                            }}>
                                <TextField label="CEP" value={MascaraCep(Cep)} onChange={(e) => setCep(e.target.value)} size="small" variant="outlined" sx={{ flex: "1 1 45%" }} />
                                <TextField label="Estado" value={Estado} onChange={(e) => setEstado(e.target.value)} size="small" variant="outlined" sx={{ flex: "1 1 45%" }} />
                                <TextField label="Cidade" value={Cidade} onChange={(e) => setCidade(e.target.value)} size="small" variant="outlined" sx={{ flex: "1 1 45%" }} />
                                <TextField label="Bairro" value={Bairro} onChange={(e) => setBairro(e.target.value)} size="small" variant="outlined" sx={{ flex: "1 1 45%" }} />
                            </div>
                            <div style={{ padding: "12px", width: "100%" }}>
                                <TextField fullWidth label="Complemento" value={Complemento} onChange={(e) => setComplemento(e.target.value)} size="small" variant="outlined" />
                            </div>
                            <div style={{ padding: "12px", width: "100%", display: "flex", justifyContent: "flex-end" }}>
                                <Button variant="contained" sx={{ width: "200px" }} color="success" disabled={!hasChange} onClick={handleSaveChanges}>Salvar alterações</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Loading open={open} />
            <AlertSuccess openSnackbarSuccess={openSnackbarSuccess} setOpenSnackbarSuccess={setOpenSnackbarSuccess} mensagem={mensagem} />
        </>
    );
};

export default PerfilDashboard;
