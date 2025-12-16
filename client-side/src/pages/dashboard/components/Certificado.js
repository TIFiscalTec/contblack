import React, { useState, useEffect, useRef } from "react";
import {
    Typography,
    Divider,
    IconButton,
    Box,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    FormHelperText,
    TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MascaraCnpj } from "../../../utils/MascaraCnpj";
import { MascaraTelefone } from "../../../utils/MascaraTelefone";
import { MascaraCep } from "../../../utils/MascaraCep";
import { TirarMascara } from "../../../utils/TirarMascara"

// Ícones
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';

// Componentes personalizados
import HeaderDashboard from "../../components/HeaderDashboard";
import ModalNotificacao from "./ModalNotificacao";
import Loading from "../../components/Loading";

// Contexto
import { useUser } from "../../../contexts/UserContext";
import AlertSuccess from "../../components/AlertSuccess";
import AlertError from "../../components/AlertError";

const Certificado = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    // Estados gerais
    const [userActive, setUserActive] = useState(true);
    const [openModalNotificacao, setOpenModalNotificacao] = useState(false);
    const [notificacoes, setNotificacoes] = useState([]);
    const [hasCertificado, setHasCertificado] = useState(false);
    const [open, setOpen] = useState(false);
    const [certificadoName, setCertificadoName] = useState(null);
    const [razaoSocial, setRazaoSocial] = useState("");
    const [nomeFantasia, setNomeFantasia] = useState("");
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState("");
    const [numero, setNumero] = useState("");
    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");
    const [bairro, setBairro] = useState("");
    const [telefone, setTelefone] = useState("");
    const [checkboxFatura, setCheckboxFatura] = useState(false);
    const [inscricaoMunicipal, setInscricaoMunicipal] = useState("");
    const [inscricaoEstadual, setInscricaoEstadual] = useState("");
    const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [openSnackbarError, setOpenSnackbarError] = useState(false);


    const [erroCnpj, setErroCnpj] = useState(false);
    const [erroRazaoSocial, setErroRazaoSocial] = useState(false);
    const [erroSimplesNacional, setErroSimplesNacional] = useState(false);
    const [erroRegimeTributario, setErroRegimeTributario] = useState(false);
    const [erroRegimeTributarioEspecial, setErroRegimeTributarioEspecial] = useState(false);
    const [erroCep, setErroCep] = useState(false);
    const [erroInscricaoMunicipal, setErroInscricaoMunicipal] = useState(false);

    // Campos de formulário
    const [email, setEmail] = useState("");
    const [file, setFile] = useState(null);
    const [senha, setSenha] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Campos de formulário
    const [cnpj, setCnpj] = useState("");

    // Drag & Drop
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const token = localStorage.getItem("token");

    // Busca e-mail do usuário logado
    useEffect(() => {
        if (user?.usuario?.Email) setEmail(user.usuario.Email);
    }, [user]);

    // Busca certificado ativo
    useEffect(() => {
        const getCertificado = async () => {
            setOpen(true);
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/getCertificado`, {
                    headers: { Authorization: token },
                });
                console.log("Dados do certificado:", data);
                setHasCertificado(data.status === 200);
                if (data.status === 200) {
                    setCertificadoName(data.certificado.arquivoNome);
                }
            } catch (err) {
                console.error("Erro ao buscar certificado:", err);
                setHasCertificado(false);
            } finally {
                setOpen(false);
            }
        };

        getCertificado();
    }, [token]);

    useEffect(() => {
        const getDadosEmpresa = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/getDadosEmpresa`, {
                headers: { Authorization: token },
            });
            console.log(response);
            if (response.data.status === 200) {
                console.log("Dados da empresa:", response.data.data);
                setCnpj(response.data.data.cnpj ? MascaraCnpj(response.data.data.cnpj) : "");
                setInscricaoMunicipal(response.data.data.inscricaoMunicipal || "");
                setInscricaoEstadual(response.data.data.inscricaoEstadual || "");
                setRazaoSocial(response.data.data.razaoSocial || "");
                setNomeFantasia(response.data.data.nomeFantasia || "");
                setCep(response.data.data.cep || "");
                setEndereco(response.data.data.logradouro || "");
                setNumero(response.data.data.numero || "");
                setEstado(response.data.data.estado || "");
                setCidade(response.data.data.cidade || "");
                setBairro(response.data.data.bairro || "");
                setTelefone(response.data.data.telefone ? MascaraTelefone(response.data.data.telefone) : "");
                setRegimeTributarioEspecial(response.data.data.regimeTributarioEspecial !== undefined ? response.data.data.regimeTributarioEspecial : false);
                setSimplesNacional(response.data.data.simplesNacional !== undefined ? response.data.data.simplesNacional : false);
                setRegimeTributario(response.data.data.regimeTributario !== undefined ? response.data.data.regimeTributario : false);
                setIncentivoFiscal(response.data.data.incentivoFiscal !== undefined ? response.data.data.incentivoFiscal : false);
                setIncentivoFiscalCultural(response.data.data.incentivadorCultural !== undefined ? response.data.data.incentivadorCultural : false);
                setCheckboxFatura(response.data.data.gerarFaturas || false);
            }
        };
        getDadosEmpresa();
    }, [token]);

    // Funções de drag and drop
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        validateFile(droppedFile);
    };

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        validateFile(selectedFile);
    };

    const validateFile = (file) => {
        if (file && (file.name.endsWith(".pfx") || file.name.endsWith(".p12"))) {
            setFile(file);
        } else {
            alert("Por favor, selecione um arquivo .pfx ou .p12 válido.");
        }
    };

    // Controle da visibilidade da senha
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => event.preventDefault();

    // Envio do certificado
    const handleSubmit = async () => {
        if (!file) {
            setMensagem("Selecione um arquivo de certificado.");
            setOpenSnackbarError(true);
            return;
        }
        if (!senha) {
            setMensagem("Digite a senha do certificado.");
            setOpenSnackbarError(true);
            return;
        }

        const formData = new FormData();
        formData.append("arquivo", file);
        formData.append("senha", senha);
        formData.append("email", email);

        try {
            setOpen(true);
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/uploadCertificado`, formData, {
                headers: {
                    Authorization: token,
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Resposta do upload:", data);
            if (data.status === 200) {
                setMensagem("Certificado atualizado com sucesso!");
                setOpenSnackbarSuccess(true);

                setHasCertificado(true);
                setCertificadoName(data.nomeArquivo);
            } else {
                setMensagem("Falha ao atualizar certificado. Verifique os dados e tente novamente.");
                setOpenSnackbarError(true);
            }
        } catch (err) {
            console.error(err);
            setMensagem("Erro ao enviar o certificado. Tente novamente mais tarde.");
            setOpenSnackbarError(true);
        } finally {
            setOpen(false);
        }
    };

    const handleCnpj = async (e) => {
        setCnpj(MascaraCnpj(e.target.value));
        if (e.target.value.length === 18) {
            setOpen(true);
            console.log(TirarMascara(cnpj))
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/buscarCnpj/${TirarMascara(cnpj)}`, {
                headers: { Authorization: token },
            });
            if (response.data.status === 200) {
                setRazaoSocial(response.data.data.razao_social);
                setNomeFantasia(response.data.data.nome);
                setCep(response.data.data.endereco.cep);
                setEndereco(response.data.data.endereco.logradouro);
                setNumero(response.data.data.endereco.numero);
                setEstado(response.data.data.endereco.uf);
                setCidade(response.data.data.endereco.municipio);
                setBairro(response.data.data.endereco.bairro);
                setTelefone(response.data.data.telefone);
                setOpen(false);
            } else {
                setOpen(false);
                alert("Cnpj não encontrado");
            }
            console.log(response);
        }
    }

    const handleSubmitCompany = async () => {
        let isValid = true;
        if (cnpj.length !== 18) {
            isValid = false;
            setErroCnpj(true);
        } else {
            setErroCnpj(false);
        }

        if (razaoSocial.trim() === "") {
            isValid = false;
            setErroRazaoSocial(true);
        } else {
            setErroRazaoSocial(false);
        }

        if (simplesNacional === "") {
            isValid = false;
            setErroSimplesNacional(true);
        } else {
            setErroSimplesNacional(false);
        }

        if (inscricaoMunicipal.trim() === "") {
            isValid = false;
            setErroInscricaoMunicipal(true);
        } else {
            setErroInscricaoMunicipal(false);
        }

        if (regimeTributario === "") {
            isValid = false;
            setErroRegimeTributario(true);
        } else {
            setErroRegimeTributario(false);
        }

        if (regimeTributarioEspecial === "") {
            isValid = false;
            setErroRegimeTributarioEspecial(true);
        } else {
            setErroRegimeTributarioEspecial(false);
        }

        if (cep.trim() === "" || cep.length < 8) {
            isValid = false;
            setErroCep(true);
        } else {
            setErroCep(false);
        }


        if (isValid) {
            setOpen(true);
            const dadosEnderecoViaCep = await axios.get(`https://viacep.com.br/ws/${cep.replace(/\D/g, "")}/json/`);
            let objetoPlugNotas = {
                "cpfCnpj": cnpj.replace(/\D/g, ""),
                "inscricaoMunicipal": inscricaoMunicipal,
                "inscricaoEstadual": inscricaoEstadual,
                "razaoSocial": razaoSocial,
                "nomeFantasia": nomeFantasia,
                "certificado": null,
                "simplesNacional": simplesNacional,
                "regimeTributario": regimeTributario,
                "incentivoFiscal": incentivoFiscal,
                "incentivadorCultural": incentivoFiscalCultural,
                "regimeTributarioEspecial": regimeTributarioEspecial,
                "endereco": {
                    "tipoLogradouro": dadosEnderecoViaCep.data.logradouro ? dadosEnderecoViaCep.data.logradouro.split(" ")[0] : "",
                    "logradouro": endereco,
                    "numero": numero,
                    "complemento": dadosEnderecoViaCep.data.complemento || "",
                    "tipoBairro": "",
                    "bairro": bairro,
                    "codigoPais": "1058",
                    "descricaoPais": "Brasil",
                    "codigoCidade": dadosEnderecoViaCep.data.ibge || "",
                    "descricaoCidade": cidade,
                    "estado": estado,
                    "cep": cep.slice(0, 5) + "-" + cep.slice(5).trim(),
                },
                "telefone": {
                    "ddd": dadosEnderecoViaCep.data.ddd || "",
                    "numero": telefone.slice(4).trim()
                },
                "email": email,
                "nfse": {
                    "ativo": true,
                    "tipoContrato": 0,
                },
            }
            const objetoReq = {
                objetoPlugNotas,
                gerarFaturas: checkboxFatura,
            }

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/salvarDadosEmpresa`, objetoReq, {
                headers: { Authorization: token },
            });
            if (response.data.status === 200) {
                setMensagem("Dados da empresa salvos com sucesso!");
                setOpenSnackbarSuccess(true);
                setOpen(false);
            } else {
                setMensagem("Falha ao salvar os dados da empresa. Verifique os dados e tente novamente.");
                setOpenSnackbarError(true);
                setOpen(false);
            }
        }
    }

    const [simplesNacional, setSimplesNacional] = useState('');
    const [regimeTributario, setRegimeTributario] = useState('');
    const [incentivoFiscal, setIncentivoFiscal] = useState(false);
    const [incentivoFiscalCultural, setIncentivoFiscalCultural] = useState(false);
    const [regimeTributarioEspecial, setRegimeTributarioEspecial] = useState('');

    return (
        <>
            <HeaderDashboard
                userActive={userActive}
                setOpenModalNotificacao={setOpenModalNotificacao}
                notificacoes={notificacoes.length}
            />
            <Box sx={{ p: 4, background: "#f4f6f8", minHeight: "100vh", mt: "64px" }}>
                <Box sx={{ width: window.innerWidth < 600 ? "100%" : "80%", mx: "auto" }}>
                    <IconButton onClick={() => navigate("../Dashboard")}>
                        <ArrowBackIcon sx={{ fontSize: 40, color: "black" }} />
                    </IconButton>
                    <div style={{ width: "100%", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 20, marginTop: 20 }}>
                        <Box
                            sx={{
                                width: window.innerWidth < 600 ? '100%' : '35%',
                                minWidth: 300,
                                height: "fit-content",
                                mx: "auto",
                                p: 3,
                                border: "1px solid #eee",
                                borderRadius: 2,
                                backgroundColor: "#fff",
                            }}
                        >
                            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
                                Certificado Digital
                            </Typography>

                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {hasCertificado ? (
                                    "Você possui um certificado digital ativo. Para atualizá-lo, envie um novo arquivo abaixo."
                                ) : (
                                    <span style={{ color: "#f44336" }}>
                                        Você não possui um certificado digital ativo. Por favor, envie seu certificado.
                                    </span>
                                )}
                            </Typography>

                            <Divider sx={{ mb: 3 }} />

                            {/* Certificado ativo */}
                            {hasCertificado && (
                                <Box
                                    sx={{
                                        border: "1px solid #901CB3",
                                        borderRadius: 2,
                                        p: 2,
                                        mb: 3,
                                        backgroundColor: "#901cb336",
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <VerifiedUserIcon sx={{ fontSize: 25, color: "#901CB3" }} />
                                        <Typography sx={{ color: "#901CB3", fontWeight: 500 }}>
                                            Certificado Ativo: <strong>{certificadoName}</strong>
                                        </Typography>
                                    </Box>
                                </Box>
                            )}

                            {/* Upload do certificado */}
                            <Typography sx={{ mb: 1 }}>
                                Arquivo do Certificado (.pfx ou .p12):
                            </Typography>
                            <Box
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current.click()}
                                sx={{
                                    border: "2px dashed #ccc",
                                    borderRadius: 2,
                                    p: 4,
                                    textAlign: "center",
                                    cursor: "pointer",
                                    borderColor: isDragging ? "#ffc845" : "#ccc",
                                    backgroundColor: isDragging ? "#fffbe6" : "transparent",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                {file ? (
                                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                        {file.name}
                                    </Typography>
                                ) : (
                                    <>
                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                            Arraste e solte o arquivo do certificado aqui
                                        </Typography>
                                        <Typography variant="body2" sx={{ my: 1 }}>
                                            ou
                                        </Typography>
                                        <Button variant="outlined" onClick={() => fileInputRef.current.click()}>
                                            Procurar Arquivo
                                        </Button>
                                    </>
                                )}
                                <input
                                    type="file"
                                    accept=".pfx,.p12"
                                    ref={fileInputRef}
                                    onChange={handleFileSelect}
                                    style={{ display: "none" }}
                                />
                            </Box>

                            {/* Senha do certificado */}
                            <FormControl sx={{ mt: 3 }} fullWidth size="small" variant="outlined" autoComplete="off">
                                <InputLabel htmlFor="outlined-adornment-password">Senha do Certificado</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    name="fakepassword"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    placeholder="Digite a senha do seu certificado"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                aria-label="toggle password visibility"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Senha do Certificado"
                                />
                                <FormHelperText>
                                    A senha é necessária para validar o arquivo do certificado.
                                </FormHelperText>
                            </FormControl>

                            {/* E-mail */}
                            <FormControl sx={{ mt: 3 }} fullWidth size="small" variant="outlined">
                                <InputLabel>E-mail para notificação</InputLabel>
                                <OutlinedInput
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Digite seu e-mail"
                                    type="email"
                                    autoComplete="off"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <EmailIcon />
                                        </InputAdornment>
                                    }
                                    label="E-mail para notificação"
                                />
                                <FormHelperText>
                                    Enviaremos notificações para este e-mail quando o certificado estiver próximo do vencimento.
                                </FormHelperText>
                            </FormControl>

                            {/* Botão de envio */}
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 4,
                                    backgroundColor: "#901CB3",
                                    color: "white",
                                    fontWeight: 600,
                                    "&:hover": { backgroundColor: "#701d8aff" },
                                }}
                                onClick={handleSubmit}
                            >
                                Atualizar Certificado
                            </Button>
                        </Box>

                        <div style={{ width: window.innerWidth <= 600 ? '100%' : '60%', position: 'relative' }}>
                            {!hasCertificado && (
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: 2,
                                        position: "absolute",
                                        inset: 0,
                                        backgroundColor: "rgba(128,128,128,0.4)", // cinza translúcido (melhor que background: "gray" + opacity)
                                        backdropFilter: "blur(1px)", // opcional: dá efeito "desativado"
                                        zIndex: 10,
                                        cursor: "not-allowed",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        px: 2,
                                        textAlign: "center",
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: "#000",
                                            fontWeight: 600,
                                            backgroundColor: "rgba(255,255,255,0.8)",
                                            p: 1.5,
                                            borderRadius: 1,
                                            boxShadow: "0 0 6px rgba(0,0,0,0.1)",
                                        }}
                                    >
                                        Antes de preencher os dados da empresa, é necessário cadastrar um
                                        certificado digital ativo.
                                    </Typography>
                                </Box>
                            )}

                            <Box
                                sx={{
                                    width: "100%",
                                    mx: "auto",
                                    opacity: hasCertificado ? 1 : 0.5,
                                    p: 3,
                                    border: "1px solid #eee",
                                    borderRadius: 2,
                                    backgroundColor: "#fff",
                                }}
                            >
                                <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
                                    Empresa
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <span style={{ color: "gray", fontSize: "0.75rem" }}>Todos os campos marcados com (*) são obrigatórios.</span>
                                <TextField fullWidth size="small" error={erroCnpj} value={cnpj} onChange={e => handleCnpj(e)} margin="dense" label="Cnpj da Empresa" variant="outlined" required helperText="Digite o CNPJ da empresa" placeholder="Digite o CNPJ da empresa" autoComplete="off" />
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, flexWrap: 'wrap' }}>
                                    <TextField style={{ width: window.innerWidth < 600 ? '100%' : '49%' }} value={inscricaoEstadual} onChange={e => setInscricaoEstadual(e.target.value)} size="small" margin="dense" label="Inscrição estadual" variant="outlined" helperText="Digite a Inscrição estadual" placeholder="Digite a Inscrição estadual" autoComplete="off" />
                                    <TextField style={{ width: window.innerWidth < 600 ? '100%' : '49%' }} required error={erroInscricaoMunicipal} value={inscricaoMunicipal} onChange={e => setInscricaoMunicipal(e.target.value)} size="small" margin="dense" label="Inscrição municipal" variant="outlined" helperText="Digite a Inscrição municipal" placeholder="Digite a Inscrição municipal" autoComplete="off" />
                                </div>
                                <TextField fullWidth size="small" margin="dense" label="Razão Social da Empresa" error={erroRazaoSocial} value={razaoSocial} onChange={e => setRazaoSocial(e.target.value)} variant="outlined" required helperText="Digite a razão social da empresa" placeholder="Digite a razão social da empresa" autoComplete="off" />
                                <TextField fullWidth size="small" margin="dense" label="Nome Fantasia da Empresa" value={nomeFantasia} onChange={e => setNomeFantasia(e.target.value)} variant="outlined" helperText="Digite o nome fantasia da empresa" placeholder="Digite o nome fantasia da empresa" autoComplete="off" />
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, flexWrap: 'wrap' }}>
                                    <FormControl error={erroSimplesNacional} fullWidth size="small" required style={{ width: window.innerWidth < 600 ? '100%' : '30%' }} margin="dense">
                                        <InputLabel id="demo-simple-select-label">Simples Nacional</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={simplesNacional}
                                            label="Simples Nacional"
                                            onChange={e => setSimplesNacional(e.target.value)}
                                        >
                                            <MenuItem value={true}>Sim</MenuItem>
                                            <MenuItem value={false}>Não</MenuItem>
                                        </Select>
                                        <FormHelperText>
                                            Empresa é do Simples Nacional?
                                        </FormHelperText>
                                    </FormControl>
                                    <FormControl error={erroRegimeTributario} fullWidth size="small" required style={{ width: window.innerWidth < 600 ? '100%' : '30%' }} margin="dense">
                                        <InputLabel id="demo-simple-select-label">Regime Tributário</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={regimeTributario}
                                            label="Regime Tributário"
                                            onChange={e => setRegimeTributario(e.target.value)}
                                        >
                                            <MenuItem value={0}>Nenhum</MenuItem>
                                            <MenuItem value={1}>Simples Nacional</MenuItem>
                                            <MenuItem value={2}>Simples Nacional - Excesso</MenuItem>
                                            <MenuItem value={3}>Regime Normal - Lucro Presumido</MenuItem>
                                            <MenuItem value={4}>Normal - Lucro Real</MenuItem>
                                            <MenuItem value={5}>MEI (Microempreendedor individual)</MenuItem>
                                        </Select>
                                        <FormHelperText>
                                            Selecione o regime tributário da empresa
                                        </FormHelperText>
                                    </FormControl>
                                    <FormControl fullWidth size="small" style={{ width: window.innerWidth < 600 ? '100%' : '30%' }} margin="dense">
                                        <InputLabel id="demo-simple-select-label">Incentivo Fiscal</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={incentivoFiscal}
                                            label="Incentivo Fiscal"
                                            onChange={e => setIncentivoFiscal(e.target.value)}
                                        >
                                            <MenuItem value={true}>Sim</MenuItem>
                                            <MenuItem value={false}>Não</MenuItem>
                                        </Select>
                                        <FormHelperText>
                                            Empresa possui incentivo fiscal?
                                        </FormHelperText>
                                    </FormControl>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, flexWrap: 'wrap' }}>
                                    <FormControl fullWidth size="small" style={{ width: window.innerWidth < 600 ? '100%' : '49%' }} margin="dense">
                                        <InputLabel id="demo-simple-select-label">Incentivo Fiscal Cultural</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={incentivoFiscalCultural}
                                            label="Incentivo Fiscal Cultural"
                                            onChange={e => setIncentivoFiscalCultural(e.target.value)}
                                        >
                                            <MenuItem value={true}>Sim</MenuItem>
                                            <MenuItem value={false}>Não</MenuItem>
                                        </Select>
                                        <FormHelperText>
                                            Empresa possui incentivo fiscal cultural?
                                        </FormHelperText>
                                    </FormControl>
                                    <FormControl fullWidth error={erroRegimeTributarioEspecial} size="small" required style={{ width: window.innerWidth < 600 ? '100%' : '49%' }} margin="dense">
                                        <InputLabel id="demo-simple-select-label">Regime tributário Especial</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={regimeTributarioEspecial}
                                            label="Regime tributário Especial"
                                            onChange={e => setRegimeTributarioEspecial(e.target.value)}
                                        >
                                            <MenuItem value={0}>Sem Regime Tributário Especial</MenuItem>
                                            <MenuItem value={1}>Micro Empresa Municipal</MenuItem>
                                            <MenuItem value={2}>Estimativa</MenuItem>
                                            <MenuItem value={3}>Sociedade de Profissionais</MenuItem>
                                            <MenuItem value={4}>Cooperativa</MenuItem>
                                            <MenuItem value={5}>Microempresário Individual - MEI</MenuItem>
                                            <MenuItem value={6}>Microempresa ou Pequeno Porte - ME EPP</MenuItem>
                                            <MenuItem value={7}>Lucro Real</MenuItem>
                                            <MenuItem value={8}>Lucro Presumido</MenuItem>
                                            <MenuItem value={9}>Tributação Normal</MenuItem>
                                            <MenuItem value={10}>Simples nacional com excesso do sublimite</MenuItem>
                                            <MenuItem value={11}>Empresa de Responsabilidade Limitada</MenuItem>
                                        </Select>
                                        <FormHelperText>
                                            Empresa possui regime tributário especial?
                                        </FormHelperText>
                                    </FormControl>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, flexWrap: 'wrap' }}>
                                    <TextField style={{ width: window.innerWidth < 600 ? '100%' : '25%' }} error={erroCep} required value={MascaraCep(cep)} onChange={e => setCep(e.target.value)} size="small" margin="dense" label="CEP" variant="outlined" helperText="Digite o CEP" placeholder="Digite o CEP" autoComplete="off" />
                                    <TextField style={{ width: window.innerWidth < 600 ? '100%' : '55%' }} required value={endereco} onChange={e => setEndereco(e.target.value)} size="small" margin="dense" label="Endereço" variant="outlined" helperText="Digite o Endereço" placeholder="Digite o Endereço" autoComplete="off" />
                                    <TextField style={{ width: window.innerWidth < 600 ? '100%' : '18%' }} required value={numero} onChange={e => setNumero(e.target.value)} size="small" margin="dense" label="Número" variant="outlined" helperText="Digite o Número" placeholder="Digite o Número" autoComplete="off" />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, flexWrap: 'wrap' }}>
                                    <TextField style={{ width: window.innerWidth < 600 ? '100%' : '33%' }} required value={estado} onChange={e => setEstado(e.target.value)} size="small" margin="dense" label="Estado" variant="outlined" helperText="Digite o Estado" placeholder="Digite o Estado" autoComplete="off" />
                                    <TextField style={{ width: window.innerWidth < 600 ? '100%' : '33%' }} required value={cidade} onChange={e => setCidade(e.target.value)} size="small" margin="dense" label="Cidade" variant="outlined" helperText="Digite a Cidade" placeholder="Digite a Cidade" autoComplete="off" />
                                    <TextField style={{ width: window.innerWidth < 600 ? '100%' : '33%' }} required value={bairro} onChange={e => setBairro(e.target.value)} size="small" margin="dense" label="Bairro" variant="outlined" helperText="Digite o Bairro" placeholder="Digite o Bairro" autoComplete="off" />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, flexWrap: 'wrap' }}>
                                    <TextField style={{ width: window.innerWidth < 600 ? '100%' : '60%' }} required value={email} onChange={e => setEmail(e.target.value)} size="small" margin="dense" label="E-mail da Empresa" variant="outlined" helperText="Digite o E-mail da Empresa" placeholder="Digite o E-mail da Empresa" autoComplete="off" />
                                    <TextField style={{ width: window.innerWidth < 600 ? '100%' : '39%' }} value={telefone} onChange={e => setTelefone(MascaraTelefone(e.target.value))} size="small" margin="dense" label="Telefone da empresa" variant="outlined" helperText="Digite o Telefone da empresa" placeholder="Digite o Telefone da empresa" autoComplete="off" />
                                </div>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox checked={checkboxFatura} onChange={e => setCheckboxFatura(e.target.checked)} />} label="Gerar as faturas para este CNPJ?" />
                                </FormGroup>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mt: 4,
                                        backgroundColor: "#901CB3",
                                        color: "white",
                                        fontWeight: 600,
                                        "&:hover": { backgroundColor: "#701d8aff" },
                                    }}
                                    onClick={handleSubmitCompany}
                                >
                                    Salvar Dados da Empresa
                                </Button>
                            </Box>
                        </div>
                    </div>
                </Box>
            </Box>
            <ModalNotificacao
                openModalNotificacao={openModalNotificacao}
                onClose={() => setOpenModalNotificacao(false)}
                notificacoes={notificacoes}
            />
            <Loading open={open} />
            <AlertSuccess setOpenSnackbarSuccess={setOpenSnackbarSuccess} openSnackbarSuccess={openSnackbarSuccess} mensagem={mensagem} />
            <AlertError setOpenSnackbarError={setOpenSnackbarError} openSnackbarError={openSnackbarError} mensagem={mensagem} />
        </>
    );
};

export default Certificado;