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
            title: "Troque de Contador por um Serviço que Entende sua Rotina na Saúde",
            description: "Contabilidade para médicos, dentistas, psicólogos, fisioterapeutas e profissionais da área da saúde. Liberte-se da burocracia fiscal e foque no que realmente importa: cuidar de pessoas. Nós cuidamos dos impostos, obrigações e planejamento tributário para que sua atuação na saúde cresça com segurança, organização e tranquilidade.",
            img: "/assets/troqueContador.jpg",
            msg: "Olá, gostaria de entender melhor sobre a solução de trocar de contador."
        },
        {
            title: "Tenha Apoio Especializado em Cada Etapa da Sua Jornada Profissional",
            description: "Desde a abertura do CNPJ até o fechamento de balanços, nossa equipe especializada entende as nuances do setor da saúde. Acompanhamos sua evolução profissional com serviços de contabilidade eficientes, acessíveis e personalizados.",
            img: "/assets/apoioEspecializado.jpg",
            msg: "Olá, gostaria de entender melhor sobre a solução de apoio especializado."
        },
        {
            title: "Foco no Atendimento, a Burocracia é Por Nossa Conta",
            description: "Você cuida da saúde dos seus pacientes, e a Clarea cuida da saúde da sua empresa. Nossos planos oferecem suporte completo: impostos, declarações, folha de pagamento e muito mais, com linguagem simples e atendimento humanizado.",
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
                            Na Clarea, entendemos que cada profissão da área da saúde tem suas particularidades — e por isso oferecemos soluções contábeis personalizadas para atender médicos, dentistas, psicólogos, fisioterapeutas, fonoaudiólogos, nutricionistas, biomédicos, enfermeiros, terapeutas ocupacionais e muitos outros profissionais do setor.
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
