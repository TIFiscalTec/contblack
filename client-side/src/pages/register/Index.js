import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { MascaraCpf } from "../../utils/MascaraCpf";
import { TirarMascara } from "../../utils/TirarMascara";
import { MascaraCnpj } from "../../utils/MascaraCnpj";
import { MascaraCep } from "../../utils/MascaraCep";
import { MascaraTelefone } from "../../utils/MascaraTelefone";
import AlertSuccess from "../components/AlertSuccess";
import AlertError from "../components/AlertError";
import Loading from "../components/Loading";
import { useLogin } from "../../contexts/LoginContext";
import { CapitalizeWords } from "../../utils/CapitalizeWords";

const steps = [
    { number: 1, label: "Informações Pessoais" },
    { number: 2, label: "Contato" },
    { number: 3, label: "Confirmar E-mail" },
    { number: 4, label: "Endereço" },
    { number: 5, label: "Definir Senha" },
];


const Register = () => {

    const navigate = useNavigate();
    const { fetchLogin } = useLogin();

    const [isMobile, setIsMobile] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const [nome, setNome] = useState("");
    const [nomeError, setNomeError] = useState(false);

    const [typePerson, setTypePerson] = useState("");
    const [typePersonError, setTypePersonError] = useState(false);

    const [cpf, setCpf] = useState("");
    const [cpfError, setCpfError] = useState(false);

    const [cnpj, setCnpj] = useState("");
    const [cnpjError, setCnpjError] = useState(false);

    const [razaoSocial, setRazaoSocial] = useState("");
    const [razaoSocialError, setRazaoSocialError] = useState(false);

    const [cep, setCep] = useState("");
    const [cepError, setCepError] = useState(false);

    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");
    const [bairro, setBairro] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [numero, setNumero] = useState("");
    const [numeroError, setNumeroError] = useState(false);

    const [complemento, setComplemento] = useState("");

    const [telefone, setTelefone] = useState("");
    const [telefoneError, setTelefoneError] = useState(false);

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);

    const [senha, setSenha] = useState("");
    const [senhaError, setSenhaError] = useState(false);

    const [senhaConfirm, setSenhaConfirm] = useState("");
    const [senhaConfirmError, setSenhaConfirmError] = useState(false);

    const [agreePrivacyPolicy, setAgreePrivacyPolicy] = useState(false);

    const [emailVerified, setEmailVerified] = useState(false);

    const [codigo, setCodigo] = useState("");

    const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);
    const [openSnackbarError, setOpenSnackbarError] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [leadId, setLeadId] = useState(null);

    const [open, setOpen] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (token) {
            // Se o token existir, redireciona para a página inicial
            navigate("/assinarContrato");
        }
    }, [token, navigate]);

    // Detectar se é mobile (tela menor que 768px)
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // chama ao carregar
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);


    const handleChange = (event) => {
        setTypePerson(event.target.value);
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const handleClickShowPasswordConfirm = () => setShowPasswordConfirm((show) => !show);

    const handleMouseDownPasswordConfirm = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPasswordConfirm = (event) => {
        event.preventDefault();
    };

    const salvarLead = async (stepAtual) => {
        setOpen(true);
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API_URL}/salvarLead`, // 👈 usa a mesma rota do backend
                {
                    idLead: leadId || null, // garante que sempre manda algo
                    nome,
                    telefone: TirarMascara(telefone),
                    email,
                    cpf: cpf ? TirarMascara(cpf) : null,
                    cnpj: cnpj ? TirarMascara(cnpj) : null,
                    razaoSocial,
                    stepAtual
                }
            );
            setOpen(false);

            if (data.lead?.idLead) {
                setLeadId(data.lead.idLead); // 🔒 mantém id do mesmo lead entre os steps
            }
        } catch (err) {
            setOpen(false);
            console.error("Erro ao salvar lead:", err);
        }
    };



    const HandleGetAddress = (CEP) => {
        setCep(MascaraCep(CEP));
        console.log("Buscando endereço para o CEP:", CEP);
        if (CEP.length === 9) {
            setOpen(true);
            axios.get(`https://viacep.com.br/ws/${TirarMascara(CEP)}/json/`)
                .then(response => {
                    const { data } = response;
                    setEstado(data.estado);
                    setCidade(data.localidade);
                    setBairro(data.bairro);
                    setLogradouro(data.logradouro);
                    console.log("Endereço encontrado:", data);
                    if (data.erro === 'true') {
                        setCepError(true);
                        setMensagem("CEP inválido. Tente novamente.");
                        setOpenSnackbarError(true);
                    } else {
                        setCepError(false);
                    }
                    setOpen(false);
                })
                .catch(error => {
                    setOpen(false);
                    console.error("Erro ao buscar o endereço:", error);
                });
        }
    }

    const HandleSendEmailVerification = async (email) => {
        setOpen(true);
        let response = await axios.post(`${process.env.REACT_APP_API_URL}/enviarEmail`, { email });
        console.log(response)
        if (response.data.status === 200) {
            setOpen(false);
            setOpenSnackbarSuccess(true);
            setMensagem("Código de verificação enviado com sucesso!");
        }

        if (response.data.status === "400") {
            setOpen(false);
            setEmailError(true);
            setOpenSnackbarError(true)
            setMensagem("E-mail já cadastrado. Tente outro.");
        }

        if (response.data.status === 500) {
            setMensagem("E-mail inválido. Tente novamente.");
            setOpenSnackbarError(true);
            setEmailError(true);
        }

        return response;
    }

    const HandleValidateEmailCode = async (email, codigo) => {
        setOpen(true);
        console.log("Validando código de verificação:", codigo);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/confirmarConta`, { email, codigo });
            console.log(response)
            if (response.data.status === 200) {
                await salvarLead(currentStep);
                setOpen(false);
                setEmailVerified(true);
                setCurrentStep((prev) => Math.min(prev + 1, 5));
                setOpenSnackbarSuccess(true);
                setMensagem("E-mail verificado com sucesso!");
            } else {
                setOpen(false);
                setOpenSnackbarError(true);
                setMensagem("Código de verificação inválido.");
            }
        } catch (error) {
            setOpen(false);
            console.error("Erro ao validar código de verificação:", error.message);
        }
    }

    const stepOne = () => {
        return (
            <div style={{ width: "100%" }}>
                <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "50px 10px 10px" }}>
                    <TextField label="Nome" style={{ width: "60%" }} variant="outlined" fullWidth size="small" onChange={(e) => setNome(e.target.value)} value={CapitalizeWords(nome)} error={nomeError} helperText={nomeError ? "Nome é obrigatório" : ""} required />
                    <TextField label="Telefone (WhatsApp)" style={{ width: "37%" }} variant="outlined" size="small" required sx={{ width: isMobile ? "100%" : "40%" }} value={telefone} onChange={(e) => setTelefone(MascaraTelefone(e.target.value))} placeholder="(00) 00000-0000" error={telefoneError} helperText={telefoneError ? "Telefone é obrigatório" : ""} />
                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px 10px 10px" }}>
                    <FormControl fullWidth size="small" required error={typePersonError}>
                        <InputLabel id="demo-simple-select-label" >Pessoa Física ou Jurídica</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={typePerson}
                            label="Pessoa Física ou Jurídica"
                            onChange={handleChange}
                        >
                            <MenuItem value={"pessoaFisica"} >Pessoa Física</MenuItem>
                            <MenuItem value={"pessoaJuridica"}>Pessoa Jurídica</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                {typePerson === "pessoaJuridica" && (
                    <>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px 10px 10px" }}>
                            <TextField label="CNPJ" variant="outlined" fullWidth size="small" onChange={(e) => setCnpj(MascaraCnpj(e.target.value))} value={cnpj} required error={cnpjError} helperText={cnpjError ? "CNPJ é obrigatório" : ""} />
                        </div>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px 10px 10px" }}>
                            <TextField label="Razão Social" variant="outlined" fullWidth size="small" onChange={(e) => setRazaoSocial(e.target.value)} value={razaoSocial} required error={razaoSocialError} helperText={razaoSocialError ? "Razão Social é obrigatória" : ""} />
                        </div>
                    </>
                )}
                {typePerson === "pessoaFisica" && (
                    <>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px 10px 10px" }}>
                            <TextField label="CPF" variant="outlined" fullWidth size="small" onChange={(e) => setCpf(MascaraCpf(e.target.value))} value={cpf} required error={cpfError} helperText={cpfError ? "CPF é obrigatório" : ""} />
                        </div>
                    </>
                )}
            </div>
        )
    }

    const stepFour = () => {

        return (
            <div style={{ width: "100%" }}>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: isMobile ? "10px" : 0,
                        padding: "50px 10px 10px"
                    }}
                >
                    <TextField label="CEP" variant="outlined" size="small" required onChange={(e) => HandleGetAddress(e.target.value)} value={cep}
                        sx={{ width: isMobile ? "100%" : "30%" }} error={cepError} helperText={cepError ? "CEP é obrigatório" : ""} />
                    <TextField label="Estado" variant="outlined" size="small" required disabled
                        sx={{ width: isMobile ? "100%" : "30%" }} value={estado} />
                    <TextField label="Cidade" variant="outlined" size="small" required disabled
                        sx={{ width: isMobile ? "100%" : "30%" }} value={cidade} />
                </div>

                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: isMobile ? "10px" : 0,
                        padding: "10px 10px 10px"
                    }}
                >
                    <TextField label="Bairro" variant="outlined" size="small" required disabled
                        sx={{ width: isMobile ? "100%" : "30%" }} value={bairro} />
                    <TextField label="Endereço" variant="outlined" size="small" required disabled
                        sx={{ width: isMobile ? "100%" : "50%" }} value={logradouro} />
                    <TextField label="Número" variant="outlined" size="small" required
                        sx={{ width: isMobile ? "100%" : "10%" }} value={numero} onChange={(e) => setNumero(e.target.value)} error={numeroError} helperText={numeroError ? "Número é obrigatório" : ""} />
                </div>

                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px 10px 10px"
                    }}
                >
                    <TextField
                        label="Complemento"
                        variant="outlined"
                        size="small"
                        value={complemento}
                        onChange={(e) => setComplemento(e.target.value)}
                        fullWidth
                    />
                </div>
            </div>
        );
    };

    const StepTwo = () => {
        return (
            <div style={{ width: "100%" }}>
                <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "50px 10px 10px", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "10px" : 0 }}>
                    <TextField label="E-mail" type="email" variant="outlined" size="small" required sx={{ width: isMobile ? "100%" : "100%" }} value={email} onChange={(e) => setEmail(e.target.value)} error={emailError} helperText={emailError ? "E-mail é obrigatório" : ""} />
                </div>
                <div style={{ padding: "10px 10px 10px" }}>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={agreePrivacyPolicy ? "yes" : "no"}
                            onChange={(e) => setAgreePrivacyPolicy(e.target.value === "yes")}

                        >
                            <FormControlLabel value="yes" control={<Radio />} label={
                                <>
                                    Li e concordo com a{" "}
                                    <Link href="/politica-de-privacidade" target="_blank" underline="hover">
                                        Política de Privacidade
                                    </Link>
                                </>
                            } />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
        )
    }

    const stepThree = () => {
        return (
            <div style={{ width: "100%" }}>
                <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", alignContent: "center", padding: "50px 10px 10px" }}>
                    <TextField label="Código" variant="outlined" size="small" required sx={{ width: isMobile ? "100%" : "40%", marginBottom: "20px" }} value={codigo} onChange={(e) => setCodigo(e.target.value)} />
                    <Button onClick={() => HandleValidateEmailCode(email, codigo)}
                        sx={{
                            padding: "5px 28px",
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
                        }}>
                        Validar código
                    </Button>
                </div>
            </div>
        )
    }

    const stepFive = () => {
        return (
            <div style={{ width: "100%" }}>
                <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: "50px 10px 10px" }}>
                    <FormControl fullWidth size="small" variant="outlined">
                        <InputLabel>Senha</InputLabel>
                        <OutlinedInput
                            error={senhaError}
                            required
                            type={showPassword ? 'text' : 'password'}
                            onChange={(e) => setSenha(e.target.value)}
                            value={senha}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
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
                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px 10px 10px" }}>
                    <FormControl fullWidth size="small" variant="outlined">
                        <InputLabel>Confirmar Senha</InputLabel>
                        <OutlinedInput
                            error={senhaConfirmError}
                            required
                            type={showPasswordConfirm ? 'text' : 'password'}
                            onChange={(e) => setSenhaConfirm(e.target.value)}
                            value={senhaConfirm}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPasswordConfirm ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowPasswordConfirm}
                                        onMouseDown={handleMouseDownPasswordConfirm}
                                        onMouseUp={handleMouseUpPasswordConfirm}
                                        edge="end"
                                    >
                                        {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Confirmar Senha"
                        />
                    </FormControl>
                </div>
            </div>
        )
    }

    const HandleRegister = async () => {
        setOpen(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/cadastro`, {
                nome: nome,
                email: email,
                tipoPessoa: typePerson,
                cpf: TirarMascara(cpf),
                cnpj: TirarMascara(cnpj),
                razaoSocial: razaoSocial,
                telefone: TirarMascara(telefone),
                senha: senha,
                cep: TirarMascara(cep),
                estado: estado,
                cidade: cidade,
                bairro: bairro,
                endereco: logradouro,
                numero: numero,
                complemento: complemento
            });
            if (response.status === 200) {
                setOpenSnackbarSuccess(true);
                setMensagem("Usuário cadastrado com sucesso!");

            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error.response?.data || error.message);
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { email, senha });
            console.log(response)
            const { token, mensagem, usuario } = response.data;
            console.log("Login successful:", mensagem);

            localStorage.setItem("token", token);
            localStorage.setItem("email", usuario.Email);
        } catch (error) {
            if (error.status === 404 || error.status === 401) {
                setOpenSnackbarError(true);
                setMensagem("E-mail ou senha incorretos. Tente novamente.");
            }
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/gerarContratoZapSign`, { email }, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                }
            });
            console.log(response)
            console.log("Login successful:", mensagem);
            setOpen(false);
            fetchLogin();
            navigate("../assinarContrato")

        } catch (error) {
            if (error.status === 404 || error.status === 401) {
                setOpenSnackbarError(true);
                setMensagem("Algo deu errado ao gerar contrato.");
            }
        }
    }

    const handleNextStep = async () => {
        console.log(cep, TirarMascara(cep))
        let isValid = true;

        if (currentStep === 1) {
            // Etapa 1: Informações Pessoais
            if (!nome.trim()) {
                setNomeError(true);
                isValid = false;
            } else {
                setNomeError(false);
            }

            if (!typePerson) {
                setTypePersonError(true);
                isValid = false;
            } else {
                setTypePersonError(false);
            }

            if (typePerson === "pessoaFisica") {
                if (!cpf.trim() || cpf.length < 14) {
                    setCpfError(true);
                    isValid = false;
                } else {
                    setCpfError(false);
                }
            }

            if (typePerson === "pessoaJuridica") {
                if (!cnpj.trim() || cnpj.length < 18) {
                    setCnpjError(true);
                    isValid = false;
                } else {
                    setCnpjError(false);
                }

                if (!razaoSocial.trim()) {
                    setRazaoSocialError(true);
                    isValid = false;
                } else {
                    setRazaoSocialError(false);
                }
            }

            if (!telefone.trim() || telefone.length < 14) {
                setTelefoneError(true);
                isValid = false;
            } else {
                setTelefoneError(false);
            }
        }

        if (currentStep === 4) {
            // Etapa 2: Endereço

            if (cepError) {
                isValid = false;
            } else {
                setCepError(false);
            }

            if (cep.length === 9) {
                // setCepError(false);
            } else {
                setCepError(true);
                isValid = false;
            }

            if (numero.trim()) {
                setNumeroError(false);
            } else {
                setNumeroError(true);
                isValid = false;
            }
        }

        if (currentStep === 2) {

            // Etapa 3: Contato

            if (!email.trim()) {
                setEmailError(true);
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setMensagem("E-mail inválido. Tente novamente.");
                setOpenSnackbarError(true);
                setEmailError(true);
                isValid = false;
            }

            if (!agreePrivacyPolicy) {
                setOpenSnackbarError(true);
                setMensagem("Você deve concordar com a Política de Privacidade para continuar.");
                isValid = false;
            }

            if (isValid) {
                const response = await HandleSendEmailVerification(email);
                if (response.data.status === "400") {
                    setEmailError(true);
                    isValid = false;
                } else if (response.data.status === 500) {
                    setEmailError(true);
                    isValid = false;
                } else { }
                setEmailError(false);
            }
        }

        if (currentStep === 3) {
            if (!emailVerified) {
                alert("Você deve verificar seu e-mail para continuar.");
                isValid = false;
            }
        }

        if (currentStep === 5) {
            if (senha !== "" && senha.length >= 6) {
                setSenhaError(false);
                if (senhaConfirm !== "") {
                    setSenhaConfirmError(false);
                    if (senha !== senhaConfirm) {
                        setOpenSnackbarError(true);
                        setMensagem("As senhas não coincidem.");
                        isValid = false;
                    } else {
                        HandleRegister();
                    }
                } else {
                    setSenhaConfirmError(true);
                    isValid = false;
                }
            } else {
                setSenhaError(true);
                setMensagem("A senha deve ter no mínimo 6 caracteres.");
                setOpenSnackbarError(true);
                isValid = false;
            }
        }


        if (isValid) {
            await salvarLead(currentStep);
            setCurrentStep((prev) => Math.min(prev + 1, 5));
        }
    };



    return (
        <>
            <Header />
            <div style={{
                marginTop: "80px",
                width: "100%",
                padding: "20px",
                minHeight: "100vh",
                boxSizing: "border-box"
            }}>
                <div style={{
                    width: isMobile ? "100%" : "80%",
                    margin: "0 auto",
                    padding: isMobile ? "10px" : "20px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "12px"
                }}>
                    <div style={{ width: "100%", padding: "0 10px 10px" }}>
                        <h1>Cadastro</h1>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        flexWrap: isMobile ? "wrap" : "nowrap",
                        gap: isMobile ? "15px" : "20px",
                        justifyContent: "space-between",
                        alignItems: "center",
                        overflowX: "auto"
                    }}>
                        {steps.map((step) => (
                            <div key={step.number} style={{
                                display: "flex",
                                alignItems: "center",
                                minWidth: isMobile ? "100%" : "180px",
                                gap: "10px"
                            }}>
                                <div style={{
                                    width: isMobile ? "30px" : "40px",
                                    height: isMobile ? "30px" : "40px",
                                    borderRadius: "50%",
                                    backgroundColor: step.number === currentStep ? "#1EFF86" : "#9C01B9",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    color: "white",
                                    transition: "0.3s"
                                }}>
                                    <p style={{
                                        fontSize: isMobile ? "1rem" : "1.2rem",
                                        margin: 0
                                    }}>{step.number}</p>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                                    <p style={{
                                        margin: 0,
                                        whiteSpace: "nowrap",
                                        marginRight: "10px",
                                        fontSize: isMobile ? "0.9rem" : "1rem"
                                    }}>{step.label}</p>
                                    <div style={{
                                        height: "2px",
                                        backgroundColor: "black"
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>
                    {currentStep === 1
                        ? stepOne()
                        : currentStep === 2
                            ? StepTwo()
                            : currentStep === 3
                                ? stepThree()
                                : currentStep === 4
                                    ? stepFour()
                                    : stepFive()}


                    <div style={{
                        marginTop: "20px",
                        display: "flex",
                        justifyContent: currentStep === 1 ? "flex-end" : "space-between",
                    }}>
                        <Button
                            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
                            variant="contained"
                            sx={{
                                padding: "5px 28px",
                                width: "100px",
                                display: currentStep === 1 ? "none" : "flex",
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
                        >Voltar</Button>
                        <Button onClick={handleNextStep}
                            sx={{
                                padding: "5px 28px",
                                width: "100px",
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
                            }}>
                            {currentStep === 5 ? "Finalizar" : "Próximo"}
                        </Button>

                    </div>
                </div>
            </div>
            <Footer />
            <AlertSuccess openSnackbarSuccess={openSnackbarSuccess} setOpenSnackbarSuccess={setOpenSnackbarSuccess} mensagem={mensagem} />
            <AlertError openSnackbarError={openSnackbarError} setOpenSnackbarError={setOpenSnackbarError} mensagem={mensagem} />
            <Loading open={open} />
        </>
    );
}

export default Register;
