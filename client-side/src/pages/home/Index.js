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

import { motion, AnimatePresence } from "framer-motion";
// import { gerarLinkWhatsApp } from "../../utils/WhatsappLink";
import SimulacaoImpostos from "../components/SimulacaoImpostos";
import { gerarLinkWhatsApp } from "../../utils/WhatsappLink";
// import { Divider } from "@mui/material";

function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
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
                                }} onClick={() => navigate("../solucoes")}>
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
                            <img src="/assets/home-img1-1024x963.jpg" alt="Contador" style={{borderRadius: "44px 0 44px 0"}} />
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
                                style={{ height: "fit-content", minHeight: "120px" }}
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
                                    width: "200px",
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
