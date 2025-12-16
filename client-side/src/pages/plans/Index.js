import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { motion } from "framer-motion";
import WhatWeDo from "../components/WhatWeDo";
import Plans from "../components/Plans";
import Footer from "../components/Footer";

const Planos = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const scrollToPlans = () => {
    };

    const listPlans = [
        {
            title: "Plano Starter",
            subTitle: "Aqui sua jornada digital começa com o pé direito! Coloque sua saúde financeira em dia e dê os primeiros passos com o plano Starter.",
            description: "Por apenas R$149 por mês, você tem:",
            advantages: [
                "Elaboração e entrega de obrigações fiscais para até 1 pessoa física (sócio);",
                "Constituição e entrega de obrigações fiscais para até 1 pessoa jurídica MEI (faturamento de até 81.000,00/ano);",
                "Atendimento personalizado em horário comercial."
            ],
            finalText: <b>Assine agora e leve sua rotina digital para o próximo nível com a ContBlack!</b>,
            img: "/assets/starter.jpg"
        },
        {
            title: "Plano Básico",
            subTitle: "Dê um upgrade na sua gestão digital! O plano Básico coloca mais organização e controle na sua rotina financeira.",
            description: "Por apenas R$329 por mês, você tem:",
            advantages: [
                "Elaboração e entrega de obrigações fiscais para até 1 pessoa física;",
                "Constituição e entrega de obrigações fiscais para até 1 pessoa jurídica MEI (faturamento de até 81.000,00/ano);",
                "Atendimento personalizado em horário comercial;",
                "Folha de pagamento de até 2 colaboradores;",
                "Elaboração e entrega de obrigações fiscais para 2 pessoas físicas."
            ],
            finalText: <b>Assine já e comece a profissionalizar seu trabalho digital com a ContBlack!</b>,
            img: "/assets/basico.jpg"
        },
        {
            title: "Plano Avançado",
            subTitle: "Eleve sua performance digital! O plano Avançado é feito para quem quer mais controle e suporte estratégico no dia a dia.",
            description: "Por apenas R$ 659 por mês, você tem:",
            advantages: [
                "Elaboração e entrega de obrigações fiscais para até 1 pessoa física;",
                "Constituição e entrega de obrigações fiscais para até 1 pessoa jurídica MEI (faturamento de até 81.000,00/ano);",
                "Atendimento personalizado em horário comercial;",
                "Folha de pagamento de até 6 colaboradores;",
                "Elaboração e entrega de obrigações fiscais para 2 pessoas físicas;",
                "Constituição e entrega de obrigações fiscais para até 1 pessoa jurídica no regime SIMPLES NACIONAL;",
                "Emissão de até 35 NFs/mês (sob demanda);",
                "Grupo Exclusivo no WhatsApp.",
            ],
            finalText: <b>Assine já e comece a profissionalizar seu trabalho digital com a ContBlack!</b>,
            img: "/assets/avancado.jpg"
        },
        {
            title: "Plano Plus+",
            subTitle: "Para quem quer dominar o universo digital: o plano Plus+ oferece suporte completo e alto nível de gestão para sua jornada profissional.",
            description: "Por apenas R$1.319 por mês, você tem:",
            advantages: [
                "Elaboração e entrega de obrigações fiscais para até 1 pessoa física;",
                "Constituição e entrega de obrigações fiscais para até 1 pessoa jurídica MEI (faturamento de até R$81.000/ano);",
                "Atendimento personalizado em horário comercial;",
                "Elaboração e entrega de obrigações fiscais para 2 pessoas físicas;",
                "Constituição e entrega de obrigações fiscais para até 1 pessoa jurídica no regime SIMPLES NACIONAL;",
                "Grupo Exclusivo no WhatsApp;",
                "Folha de pagamento de até 10 colaboradores;",
                "Emissão de até 70 NFs/mês (sob demanda);",
                "1 consultoria de até 4h por mês com emissão de parecer.",
            ],
            finalText: <b>Assine já e transforme sua rotina digital com a ContBlack, com suporte total para crescer com segurança e liberdade!</b>,
            img: "/assets/plus.jpg"
        }
    ];

    return (
        <>
            <Header active="planos" />
            <div style={{ marginTop: "100px", width: "100%", padding: "20px" }} >
                <div style={{
                    width: "80%",
                    maxWidth: "1200px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "20px",
                    margin: "0 auto"
                }}>
                    <motion.div
                        style={{ flex: "1 1 300px" }}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <img src="/assets/planos.jpg" alt="Descrição" style={{ width: "100%", height: "auto", borderRadius: "46px 0 46px 0" }} />
                    </motion.div>

                    <motion.div
                        style={{ flex: "1 1 300px" }}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>Planos feitos para o seu universo digital</h1>
                        <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                            Oferecemos <b>soluções contábeis completas e seguras</b> para quem vive da criação de conteúdo online.
                            Deixe a parte fiscal conosco e dedique-se ao que importa: <b>expandir sua presença, engajar seu público e crescer no mercado digital.</b>
                        </p>
                    </motion.div>
                </div>
            </div>
            <Plans />

            <WhatWeDo scrollToPlans={scrollToPlans} />

            {listPlans.map((plan, index) => (
                <div key={index} style={{ width: "100%", padding: "20px", display: "flex", justifyContent: "center" }}>
                    <div style={{
                        marginBottom: "40px",
                        width: "100%",
                        maxWidth: "1200px",
                        display: "flex",
                        flexDirection: isMobile ? "column" : index % 2 === 0 ? "row" : "row-reverse",
                        alignItems: "center",
                        gap: "20px",
                        padding: "0 20px"
                    }}>
                        <div style={{ width: isMobile ? "100%" : "50%", padding: "0 10px" }}>
                            <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>{plan.title}</h1>
                            <p style={{ fontSize: "1rem", marginBottom: "10px" }}>{plan.subTitle}</p>
                            <p style={{ marginBottom: "10px", fontSize: "1.1rem" }}>{plan.description}</p>
                            <ul>
                                {plan.advantages.map((advantage, i) => (
                                    <li key={i}>{advantage}</li>
                                ))}
                            </ul>
                            <p style={{ fontWeight: "bold", marginTop: "10px" }}>{plan.finalText}</p>
                        </div>
                        <div style={{ width: isMobile ? "100%" : "50%" }}>
                            <img
                                src={plan.img}
                                alt={plan.title}
                                style={{ width: "100%", height: "auto", borderRadius: "44px 0 44px 0" }}
                            />
                        </div>
                    </div>
                </div>
            ))}

            <Footer />
        </>
    );
};

export default Planos;
