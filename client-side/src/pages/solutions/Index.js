import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import Button from '@mui/material/Button';
import { gerarLinkWhatsApp } from '../../utils/WhatsappLink';

const Solutions = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const listSolutions = [
        {
            title: "Troque de contador por quem entende sua rotina digital",
            description: <>Seja você <b>influencer, streamer, gamer, alt model, produtor(a), social media ou criador(a) independente,</b> aqui a contabilidade fala a sua língua. Deixe a parte burocrática com a gente e foque no que você faz de melhor: <b>criar, performar e engajar.</b> Cuidamos dos <b>impostos, obrigações e planejamento tributário</b> para você crescer com segurança, organização e liberdade.</>,
            img: "/assets/troqueContador.jpg",
            msg: "Olá, gostaria de entender melhor sobre a solução de trocar de contador."
        },
        {
            title: "Conte com quem te acompanha em cada fase da sua trajetória digital",
            description: <>Do <b>início do seu CNPJ</b> até o <b>crescimento do seu negócio online</b>, estamos ao seu lado para garantir que tudo funcione de forma <b>simples</b> e <b>segura</b>. Nossa equipe entende as particularidades do mundo digital e oferece soluções contábeis sob medida para cada etapa da sua jornada — <b>do primeiro job à consolidação da sua marca</b>.</>,
            img: "/assets/apoioespecializado.jpg",
            msg: "Olá, gostaria de entender melhor sobre a solução de apoio especializado."
        },
        {
            title: "Foco no seu trabalho. A burocracia é com a gente",
            description: <>Você cria, joga, performa e faz acontecer — e a ContBlack cuida da parte contábil para tudo continuar em dia. Nossos planos oferecem <b>suporte completo</b>, com <b>impostos, declarações, folha de pagamento e muito mais</b>, sempre com atendimento próximo e uma linguagem que você entende.</>,
            img: "/assets/focoAtendimento.jpg",
            msg: "Olá, gostaria de entender melhor sobre a solução de foco no atendimento."
        },
    ];

    return (
        <>
            <Header active="solucoes" />

            {/* Bloco de introdução */}
            <div style={{
                marginTop: "60px",
                width: "100%",
                padding: "20px",
                backgroundColor: "#233344",
                color: "white"
            }}>
                <div style={{
                    width: "100%",
                    maxWidth: "1200px",
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "20px",
                    marginTop: "20px",
                }}>
                    <motion.div style={{ flex: "1 1 300px" }} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                        <img src="/assets/sobreNos.jpg" alt="Descrição" style={{ width: "70%", height: "auto", borderRadius: "44px 0 44px 0" }} />
                    </motion.div>

                    <motion.div style={{ flex: "1 1 300px" }} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
                        <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>Soluções</h1>
                        <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                            Na ContBlack, a gente entende que cada criador tem o seu próprio universo — e por isso oferecemos <b>soluções contábeis sob medida</b> para quem vive da internet.
                            Ajudamos você a <b>organizar, legalizar e escalar seu trabalho sem complicação</b> — pra você focar no que realmente importa: <b>criar, performar e crescer.</b>
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Blocos de soluções */}
            {listSolutions.map((solution, index) => {
                const reverse = index % 2 !== 0;
                const isLightBg = reverse;

                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        viewport={{ once: true, amount: 0.2 }}
                        style={{
                            width: "100%",
                            padding: "20px",
                            display: "flex",
                            justifyContent: "center",
                            backgroundColor: isLightBg ? "#9C01B9" : "#f5f5f5",
                            color: isLightBg ? "white" : "#233344",
                        }}
                    >
                        <div style={{
                            width: "100%",
                            maxWidth: "1200px",
                            display: "flex",
                            flexDirection: isMobile ? "column" : (reverse ? "row-reverse" : "row"),
                            alignItems: "center",
                            gap: "20px",
                            marginBottom: "40px"
                        }}>
                            {/* Texto */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                                style={{ width: isMobile ? "100%" : "50%", padding: "0 20px" }}
                            >
                                <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>{solution.title}</h1>
                                <p style={{ marginBottom: "10px", fontSize: "1.1rem" }}>{solution.description}</p>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: isLightBg ? "#1EFF86" : "#9C01B9",
                                        display: index === 0 ? "inline-block" : "none",
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
                                    onClick={() => window.open(gerarLinkWhatsApp(solution.msg), '_blank')}
                                >
                                    FALAR COM UM CONSULTOR
                                </Button>
                            </motion.div>

                            {/* Imagem */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                                style={{ width: isMobile ? "100%" : "50%" }}
                            >
                                <img
                                    src={solution.img}
                                    alt={solution.title}
                                    style={{ width: "100%", height: "auto", borderRadius: "46px 0 46px 0" }}
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                );
            })}

            <Footer />
        </>
    );
};

export default Solutions;
