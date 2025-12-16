import { useState, useRef, useEffect } from "react";

import Header from "../components/Header";
import Plans from "../components/Plans";
import WhatWeDo from "../components/WhatWeDo";
import './Index.css';

import Button from '@mui/material/Button';
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { ReactTyped } from "react-typed";
import EastIcon from '@mui/icons-material/East';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import PlaceIcon from '@mui/icons-material/Place';
import { Box, Divider } from "@mui/material";


import { motion, AnimatePresence } from "framer-motion";
// import { gerarLinkWhatsApp } from "../../utils/WhatsappLink";
import SimulacaoImpostos from "../components/SimulacaoImpostos";
import { gerarLinkWhatsApp } from "../../utils/WhatsappLink";
// import { Divider } from "@mui/material";

function Home() {
    const navigate = useNavigate();

    const [cidades, setCidades] = useState([]);
    const [cidadesFiltered, setCidadesFiltered] = useState([]);


    useEffect(() => {
        window.scrollTo(0, 0);

        let pathCsv = "/assets/csvCidades/Cidades homologadas - 14-11-2025.csv";

        const reader = new FileReader();
        fetch(pathCsv)
            .then(response => response.blob())
            .then(blob => {
                reader.readAsText(blob);
            });
        reader.onload = () => {
            const csvData = reader.result;
            const lines = csvData.split('\n').slice(1); // Ignora o cabeçalho
            for (let line of lines) {
                let [status, cidade, uf, layoutIntegracao, padrao, documentacaoDoPadrao, codigoIbge, dadosObrigatoriosDasNotasTomadas, notasTomadas, login, senha, multiplosServicos, certificado] = line.split(',').map(field => field.replace(/^"|"$/g, '').trim());
                setCidades(prevCidades => [...prevCidades, { status, cidade, uf, layoutIntegracao, padrao, documentacaoDoPadrao, codigoIbge, dadosObrigatoriosDasNotasTomadas, notasTomadas, login, senha, multiplosServicos, certificado }]);
            }
        }
    }, [])
    const cards = [
        { value: "FREELAS", img: "/assets/freelancer.svg", desc: "Mais briefing, menos burocracia e você focado no seu talento." },
        { value: "CREATORS", img: "/assets/creators.svg", desc: "Organize sua monetização e impostos com tranquilidade." },
        { value: "ALT MODELS", img: "/assets/altModels.svg", desc: "Organize sua receita nacional e internacional sem burocracia." },
        { value: "INFO PRODUTORES", img: "/assets/infoProdutores.svg", desc: "Do mil ao milhão, sem problemas com o Leão." },
        { value: "MEIS", img: "/assets/meis.svg", desc: "Contabilidade online sem surpresas nem atrasos para prestadores de serviços em geral." },
        { value: "ANYWHERE OFFICE", img: "/assets/office.svg", desc: "Pra quem já é 100% digital e trabalha de qualquer lugar do mundo  ." },
        // { value: "Radiologistas", img: "/assets/raiox.png", desc: "Exames de imagem realizados com precisão para auxiliar no diagnóstico e acompanhamento médico." },
        { value: "INFLUENCERS", img: "/assets/influencers.svg", desc: "A gente entende de parcerias, publis, monetização e como tudo isso se transforma em nota fiscal." },
        { value: "GAMERS", img: "/assets/gamers.svg", desc: "Recebe da gringa? Faz live com donate? Temos planos pensados pra você escalar com segurança." },
    ];

    const [nichoDesc, setNichoDesc] = useState("");
    const [nichoTitle, setNichoTitle] = useState("");
    const plansRef = useRef(null);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: i => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.4 }
        }),
    };

    const scrollToPlans = () => {
        plansRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const textVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
    };

    const handleFilterCity = (input) => {
        console.log(cidades);
        if (!input) {
            setCidadesFiltered([]);
            return;
        }
        const normalizeText = (text) =>
            text
                .normalize('NFD') // separa caracteres + acentos
                .replace(/[\u0300-\u036f]/g, '') // remove acentos
                .replace(/\s+/g, ' ') // normaliza espaços
                .trim()
                .toLowerCase();

        const filtered = cidades
            .filter(cidade => {
                const cidadeNormalized = normalizeText(cidade.cidade);
                const inputNormalized = normalizeText(input);
                return cidadeNormalized.includes(inputNormalized);
            })
            .slice(0, 2);


        if (filtered.length === 0) {
            setCidadesFiltered(false);
            return;
        }
        setCidadesFiltered(filtered);
    }

    return (
        <>
            <Header />
            <div className="hero-container sectionOne">
                <div className="hero-wrapper">
                    <div className="hero-content">
                        <motion.div
                            className="hero-text"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1>Contabilidade 100% digital, assim como você<b style={{ color: "#1EFF86" }}>.</b></h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                            >
                                Chega de contador que não entende o que você faz. A <b>Contblack</b> é a contabilidade 100% online de quem é digital
                            </motion.p>

                            <motion.div
                                className="hero-buttons"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                            >
                                <Button size="small" variant="contained" endIcon={<EastIcon />} sx={{
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
                                }} onClick={() => navigate("../planos")}>
                                    Troque de contador
                                </Button>
                                <Button size="small" variant="contained" endIcon={<EastIcon />} sx={{
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
                                }} onClick={() => navigate("../planos")}>
                                    Abra sua empresa
                                </Button>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            className="hero-image"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <img src="/assets/home-img1-1024x963.jpg" alt="Contador" style={{ borderRadius: "44px 0 44px 0" }} />
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="hero-container sectionTwo">
                <div className="hero-wrapper">
                    <div className="hero-content">

                        {/* Imagem com fade + scale */}
                        <motion.div
                            className="hero-image"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <img src="/assets/home-img2.jpg" alt="Contador" style={{ borderRadius: "40px 0 40px 0" }} />
                        </motion.div>

                        {/* Texto com entrada da direita */}
                        <motion.div
                            className="hero-text"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                style={{ color: "#1EFF86", fontWeight: 600 }}
                            >
                                A Contblack
                            </motion.p>

                            <motion.h1
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                style={{ height: "fit-content", minHeight: "150px" }}
                            >
                                Facilitamos a vida de{" "}
                                <ReactTyped
                                    strings={[
                                        "gamers.",
                                        "digital influencers.",
                                        "alt models."
                                    ]}
                                    typeSpeed={120}
                                    backSpeed={30}
                                    loop
                                />

                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                            >
                                Somos uma contabilidade e assessoria tributária pensada para profissionais que atuam no ambiente digital. Conhecemos as particularidades do ramo, oferecemos a segurança de estar em dia com as obrigações tributárias de maneira fácil e descomplicada.
                            </motion.p>

                            <motion.div
                                className="hero-buttons"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                            >
                                <Button variant="outlined" sx={{
                                    padding: "7px 14px",
                                    fontSize: "1rem",
                                    borderRadius: "25px 0 25px 0",
                                    backgroundColor: "transparent",
                                    color: "white",
                                    fontWeight: 600,
                                    border: "2px solid white",
                                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                                    transition: "0.3s ease",
                                    '&:hover': {
                                        transform: "scale(1.05)",
                                    }
                                }} onClick={() => navigate("../SobreNos")}>
                                    conheça a Contblack
                                </Button>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", background: "linear-gradient(35deg, #1EFF86 0%, #1b3a5d 100%)", padding: "40px 0" }}>
                <div style={{ width: "80%", maxWidth: "900px" }}>

                    <h1
                        style={{
                            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                            margin: "30px 0",
                            textAlign: "center",
                            color: "white",
                            lineHeight: 1.3,
                        }}
                    >
                        Descubra como podemos transformar sua relação com a contabilidade
                    </h1>

                    {/* Linha Verde */}
                    <div
                        style={{
                            width: "100%",
                            height: "2px",
                            backgroundColor: "#1EFF86",
                            margin: "30px 0",
                        }}
                    />

                    <Box
                        sx={{
                            position: "relative",
                            paddingBottom: "56.25%", // Proporção 16:9
                            height: 0,
                            overflow: "hidden",
                            borderRadius: 2,
                            boxShadow: "0px 0px 50px #1EFF86"
                        }}
                    >
                        <video
                            src="/assets/Contblack.mp4"
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "8px",
                            }}
                            controls
                        />
                    </Box>

                    {/* Linha Verde */}
                    <div
                        style={{
                            width: "100%",
                            height: "2px",
                            backgroundColor: "#1EFF86",
                            margin: "30px 0",
                        }}
                    />
                </div>
            </div>


            <WhatWeDo scrollToPlans={scrollToPlans} />
            <SimulacaoImpostos />
            <div className="hero-container" style={{ backgroundColor: "white" }}>
                <div className="hero-wrapper">
                    <div className="hero-content" style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                        <motion.div
                            className="hero-text"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            style={{ flex: '1 1 300px' }}
                        >
                            <p style={{ color: "#1EFF86", fontWeight: 600 }}>PLANOS</p>
                            <h1>Escolha o melhor plano para você.</h1>
                            <p>
                                A contblack acompanha seu crescimento com planos personalizados e sem burocracia
                            </p>
                        </motion.div>

                        <div
                            className="hero-image"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}
                        >
                            <img src="/assets/home-img4-1024x928.jpg" alt="Contador" style={{ maxWidth: '100%', borderRadius: '8px' }} />
                        </div>
                    </div>
                </div>
            </div>

            <section
                style={{
                    width: "100%",
                    minHeight: "500px",
                    background: "linear-gradient(135deg, #233344 0%, #1b3a5d 100%)",
                    padding: "60px 20px",
                    boxSizing: "border-box",
                    color: "#ffffff",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: "800px",
                        textAlign: "center",
                        marginBottom: "30px",
                        padding: "0 10px",
                    }}
                >
                    <h1
                        style={{
                            fontSize: "clamp(1.2rem, 4vw, 2.5rem)",
                            margin: 0,
                            lineHeight: 1.3,
                            color: "#ffffff",
                        }}
                    >
                        Descubra se sua cidade também é compatível.
                    </h1>
                    <p
                        style={{
                            marginTop: "10px",
                            color: "#1EFF86",
                            fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                            lineHeight: 1.5,
                        }}
                    >
                        O emissor Cont Fácil está homologado em mais de 2.000 cidades e compatível com centenas de padrões de Nota Fiscal de Serviço (NFS-e) em todo o Brasil. <a href="/assets/csvCidades/Cidades_homologadas.xlsx" download style={{ color: "#1EFF86", textDecoration: "underline" }}>baixe aqui</a>
                    </p>
                </div>

                <div
                    style={{
                        width: "100%",
                        maxWidth: "600px",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: "20px",
                        margin: "0 auto",
                        padding: "0 10px",
                    }}
                >
                    <TextField
                        placeholder="Digite sua cidade"
                        fullWidth
                        autoComplete="off"
                        variant="outlined"
                        sx={{
                            width: { xs: "100%", sm: "80%", md: "60%" },
                            backgroundColor: "#ffffff",
                            borderRadius: "8px",
                            "& .MuiInputBase-input": {
                                color: "#0b243d",
                            },
                            "& .MuiInputLabel-root": {
                                color: "#0b243d",
                            },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "#ffffff",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#1EFF86",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#1EFF86",
                                },
                            },
                        }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <PlaceIcon sx={{ color: "#0b243d", mr: 1 }} position="start" />
                                ),
                            },
                        }}
                        onChange={e => handleFilterCity(e.target.value)}
                    />
                </div>
                <div
                    style={{
                        width: "100%",
                        maxWidth: "600px",
                        marginTop: "20px",
                        padding: "10px",
                    }}
                >
                    {
                        !cidadesFiltered ? (
                            <div style={{ textAlign: "center", marginTop: "20px" }}>
                                <p>Cidade não encontrada.</p>
                            </div>
                        ) : (
                            cidadesFiltered.map((cidade, index) => {
                                const rowStyle = {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    flexWrap: "wrap",
                                    gap: "12px",
                                    marginTop: "10px",
                                };

                                const infoBoxStyle = {
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                    minWidth: "120px",
                                };

                                const chipBoxStyle = {
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "8px",
                                    marginTop: "12px",
                                };

                                return (
                                    <div
                                        key={index}
                                        style={{
                                            backgroundColor: "#1b3a5d",
                                            padding: "15px",
                                            borderRadius: "10px",
                                            color: "#fff",
                                            marginBottom: "20px",
                                            boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
                                        }}
                                    >
                                        {/* Linha 1: Cidade e UF */}
                                        <div style={rowStyle}>
                                            <div style={infoBoxStyle}>
                                                <span style={{ fontWeight: "600" }}>Cidade:</span>
                                                <span>{cidade.cidade}</span>
                                            </div>
                                            <div style={infoBoxStyle}>
                                                <span style={{ fontWeight: "600" }}>UF:</span>
                                                <span>{cidade.uf}</span>
                                            </div>
                                        </div>

                                        {/* Linha 2: Layout, Padrão e Código IBGE */}
                                        <div style={rowStyle}>
                                            <div style={infoBoxStyle}>
                                                <span style={{ fontWeight: "600" }}>Layout de integração:</span>
                                                <span>{cidade.layoutIntegracao}</span>
                                            </div>
                                            <div style={infoBoxStyle}>
                                                <span style={{ fontWeight: "600" }}>Padrão:</span>
                                                <span>{cidade.padrao}</span>
                                            </div>
                                            <div style={infoBoxStyle}>
                                                <span style={{ fontWeight: "600" }}>Código IBGE:</span>
                                                <span>{cidade.codigoIbge}</span>
                                            </div>
                                        </div>

                                        {/* Linha 3: Dados obrigatórios das notas tomadas */}
                                        {/* <div style={rowStyle}>
                                    <div style={{ ...infoBoxStyle, flex: "1 1 100%" }}>
                                        <span style={{ fontWeight: "600" }}>Dados obrigatórios das notas tomadas:</span>
                                        <span>{cidade.dadosObrigatoriosDasNotasTomadas}</span>
                                    </div>
                                </div> */}

                                        <Divider style={{ margin: "12px 0", borderColor: "#1EFF86" }} />

                                        {/* Linha 4: Chips */}
                                        <div style={chipBoxStyle}>
                                            <Chip
                                                icon={
                                                    cidade.status === "Operante" ? (
                                                        <CheckIcon color="success" />
                                                    ) : (
                                                        <CloseIcon color="error" />
                                                    )
                                                }
                                                label={cidade.status === "Operante" ? "Cidade compatível com emissor Cont Fácil" : "Cidade não compatível com emissor Cont Fácil"}
                                                variant="outlined"
                                                sx={{ color: "#fff", borderColor: "#1EFF86" }}
                                            />
                                        </div>
                                    </div>
                                );
                            })
                        )}
                </div>

            </section>

            <div ref={plansRef}>
                <Plans />
            </div>

            <div
                className="duvida-plano"
                style={{
                    width: "100%",
                    padding: "30px 20px",
                    background: "linear-gradient(to right, #1EFF86 0%, transparent 50%, #1EFF86 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.95rem",
                    color: "black",
                    textAlign: "center",
                    flexWrap: "wrap",
                    gap: "10px"
                }}
            >
                <p style={{ margin: 0, display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "10px" }}>
                    Em dúvida sobre qual é o melhor plano para você?
                    <Button
                        variant="outlined"
                        startIcon={<WhatsAppIcon />}
                        sx={{
                            backgroundColor: "#9C01B9",
                            borderRadius: "17px 0 17px 0",
                            fontSize: "0.7rem",
                            color: "white",
                            fontWeight: 800,
                            border: "none",
                            transition: "0.3s ease",
                            '&:hover': {
                                backgroundColor: "#1EFF86",
                                boxShadow: "0 4px 10px #1EFF86",
                            }
                        }}
                        onClick={() => window.open(gerarLinkWhatsApp("Olá, tenho dúvidas sobre qual o melhor plano para mim."))}
                    >
                        Falar com consultor
                    </Button>
                </p>
            </div>



            <section style={{ width: "100%", minHeight: "500px", backgroundColor: "white", padding: "20px", boxSizing: "border-box", color: "black", marginTop: "10px" }}>
                <div style={{ width: "100%", textAlign: "center", marginBottom: "30px" }}>
                    <p style={{ margin: 0, color: "black" }}>NICHOS</p>
                    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                        <h1 style={{ fontSize: "clamp(1.2rem, 4vw, 2.5rem)", margin: 0 }}><b style={{ color: "#1EFF86" }}>#contblack</b> <b style={{ color: "black" }}>é quem movimenta a nova economia digital</b></h1>
                    </div>
                </div>

                <div style={{ width: "90%", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px", margin: "0 auto" }}>
                    <div style={{ flex: "1 1 300px", maxWidth: "700px", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
                        {cards.map((obj, index) => (
                            <div
                                key={index}
                                custom={index}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                style={{
                                    width: window.innerWidth < 600 ? "100px" : "200px",
                                    height: "150px",
                                    borderRadius: "15px",
                                    padding: "10px 20px",
                                    textAlign: "center",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    color: "black"
                                }}
                                onMouseEnter={() => {
                                    setNichoTitle(obj.value);
                                    setNichoDesc(obj.desc);
                                }}
                                onMouseLeave={() => {
                                    setNichoTitle("");
                                    setNichoDesc("");
                                }}
                            >
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                                    <img src={obj.img} alt={obj.value} style={{ maxWidth: "130px", borderRadius: "8px" }} />
                                    <p style={{
                                        lineHeight: "1",
                                        fontWeight: "600",
                                        fontSize: "0.9rem",
                                        display: "flex",
                                        color: "#233344",
                                        alignItems: "center",
                                        gap: "4px", // espaçamento entre o texto e o ícone
                                        margin: 0 // para evitar margens padrão do <p>
                                    }}>
                                        {obj.value}
                                        <ArrowForwardIcon sx={{ width: "15px", height: "15px", color: "#1EFF86" }} />
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        flex: "1 1 300px",
                        maxWidth: "400px",
                        color: "#f9f2e4",
                        padding: "30px",
                        boxSizing: "border-box",
                        borderRadius: "12px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        backgroundColor: "rgba(255,255,255,0.05)"
                    }}>
                        <AnimatePresence mode="wait">
                            {(nichoTitle || nichoDesc) ? (
                                <motion.div
                                    key="content"
                                    variants={textVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    style={{ textAlign: "left" }}
                                >
                                    <h2 style={{ fontSize: "clamp(1.2rem, 2vw, 1.8rem)", marginBottom: "15px", color: "#9C01B9" }}>{nichoTitle || "Conheça mais"}</h2>
                                    <p style={{
                                        fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
                                        lineHeight: "1.6",
                                        whiteSpace: "pre-wrap",
                                        opacity: 0.9,
                                        color: "black"
                                    }}>{nichoDesc || "Passe o mouse sobre um nicho para ver os benefícios e diferenciais da contabilidade especializada para ele."}</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="default"
                                    variants={textVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    style={{ textAlign: "left" }}
                                >
                                    <h2 style={{ fontSize: "clamp(1.2rem, 2vw, 1.8rem)", marginBottom: "15px", color: "#9C01B9" }}>Conheça mais</h2>
                                    <p style={{
                                        fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
                                        lineHeight: "1.6",
                                        whiteSpace: "pre-wrap",
                                        opacity: 0.9,
                                        color: "black"
                                    }}>
                                        Passe o mouse sobre um nicho para ver os benefícios e diferenciais da contabilidade especializada para ele.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            <HowItWorks />
            <Footer />
        </>
    );
}

export default Home;
