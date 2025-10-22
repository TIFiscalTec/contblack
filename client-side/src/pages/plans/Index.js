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
            subTitle: "Aqui sua jornada digital atinge um novo nível! Sua saúde financeira está prestes a ficar em dia com o plano Starter da FisCare!",
            description: "Por apenas R$149 por mês, você tem:",
            advantages: [
                "Elaboração e entrega de obrigações fiscais para até 1 pessoa física (sócio)",
                "Constituição e entrega de obrigações fiscais para até 1 pessoa jurídica MEI (faturamento de até 81.000,00/ano)",
                "Atendimento personalizado em horário comercial"
            ],
            finalText: "Assine agora mesmo e comece a facilitar e a profissionalizar seu trabalho digital com a FisCare!",
            img: "/assets/starter.jpg"
        },
        {
            title: "Plano Básico",
            subTitle: "Aqui sua jornada digital atinge um novo nível! Sua saúde financeira está prestes a ficar em dia com o plano Básico da FisCare!",
            description: "Por apenas R$149 por mês, você tem:",
            advantages: [
                "Elaboração e entrega de obrigações fiscais para até 1 pessoa física (sócio)",
                "Constituição e entrega de obrigações fiscais para até 1 pessoa jurídica MEI (faturamento de até 81.000,00/ano)",
                "Atendimento personalizado em horário comercial"
            ],
            finalText: "Assine agora mesmo e comece a facilitar e a profissionalizar seu trabalho digital com a FisCare!",
            img: "/assets/basico.jpg"
        },
        {
            title: "Plano Avançado",
            subTitle: "Aqui sua jornada digital atinge um novo nível! Sua saúde financeira está prestes a ficar em dia com o plano Avançado da FisCare!",
            description: "Por apenas R$149 por mês, você tem:",
            advantages: [
                "Elaboração e entrega de obrigações fiscais para até 1 pessoa física (sócio)",
                "Constituição e entrega de obrigações fiscais para até 1 pessoa jurídica MEI (faturamento de até 81.000,00/ano)",
                "Atendimento personalizado em horário comercial"
            ],
            finalText: "Assine agora mesmo e comece a facilitar e a profissionalizar seu trabalho digital com a FisCare!",
            img: "/assets/avancado.jpg"
        },
        {
            title: "Plano Plus+",
            subTitle: "Aqui sua jornada digital atinge um novo nível! Sua saúde financeira está prestes a ficar em dia com o plano Expert da FisCare!",
            description: "Por apenas R$149 por mês, você tem:",
            advantages: [
                "Elaboração e entrega de obrigações fiscais para até 1 pessoa física (sócio)",
                "Constituição e entrega de obrigações fiscais para até 1 pessoa jurídica MEI (faturamento de até 81.000,00/ano)",
                "Atendimento personalizado em horário comercial"
            ],
            finalText: "Assine agora mesmo e comece a facilitar e a profissionalizar seu trabalho digital com a FisCare!",
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
                        <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>Planos pensados para quem cuida de vidas</h1>
                        <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                            Nossos planos contábeis foram desenvolvidos especialmente para médicos, dentistas, psicólogos, fisioterapeutas e demais profissionais da saúde. Oferecemos soluções práticas e seguras que garantem o cumprimento das obrigações fiscais com total transparência, agilidade e tranquilidade. Cuidamos da parte contábil para que você possa focar no que realmente importa: cuidar de pessoas.
                        </p>
                    </motion.div>
                </div>
            </div>

            <WhatWeDo scrollToPlans={scrollToPlans} />
            <Plans />

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
                                    <li key={i}>{advantage}.</li>
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
