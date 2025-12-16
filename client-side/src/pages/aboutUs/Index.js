import React, { useEffect } from "react";
import Header from "../components/Header";
import { motion } from "framer-motion";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

const AboutUs = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <Header active="sobreNos" />

            {/* Seção Missão */}
            <div style={{
                marginTop: "80px",
                width: "100%",
                padding: "20px",
                backgroundColor: "white",
                color: "#0b243d",
            }}>
                <div style={{
                    marginTop: "20px",
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
                        <img
                            src="/assets/sobreNos.jpg"
                            alt="Descrição"
                            style={{ width: "80%", height: "auto", borderRadius: "44px 0 44px 0" }}
                        />
                    </motion.div>

                    <motion.div
                        style={{ flex: "1 1 300px" }}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>Missão</h1>
                        <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                            Oferecer <b>soluções contábeis e fiscais de alta qualidade</b>, com <b>ética, sigilo e excelência</b>, impulsionando o <b>crescimento e a segurança</b> dos profissionais do meio digital.
                            Nosso propósito é tornar a contabilidade <b>simples, acessível e totalmente online</b>, com <b>atendimento próximo e personalizado</b> para quem vive de criar e inovar na internet.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Seção principal */}
            <div style={{ backgroundColor: "#233344", color: "white", padding: "40px 0" }}>
                <div
                    style={{
                        width: "80%",
                        maxWidth: "1200px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "20px",
                        margin: "0 auto",
                        padding: "20px",
                    }}
                >
                    <motion.div
                        style={{ flex: "1 1 300px" }}
                        initial={{ opacity: 0, x: 50, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.2,
                            type: "spring",
                            stiffness: 100,
                            damping: 12,
                        }}
                        viewport={{ once: true }}
                    >
                        <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>
                            A <b style={{ color: "#9C01B9" }}>Contblack</b> A contabilidade digital que entende o seu mundo!<b style={{ color: "#1EFF86" }}></b>
                        </h1>
                        <p style={{ fontSize: "1rem", lineHeight: "1.6", marginBottom: "1rem" }}>
                            A ContBlack nasceu para simplificar a vida de quem atua no universo digital — oferecendo <b>soluções contábeis seguras, acessíveis e totalmente online.</b>
                            {" "}Somos parceiros de <b>criadores, gamers e profissionais digitais</b>, entregando <b>suporte personalizado, confiança e excelência</b> em cada detalhe.
                        </p>
                        <p style={{ fontSize: "1rem", lineHeight: "1.6", marginBottom: "1rem" }}>
                            Escolha o plano ideal para você e venha ser ContBlack!
                        </p>
                    </motion.div>

                    <motion.div
                        style={{ flex: "1 1 300px" }}
                        initial={{ opacity: 0, x: -50, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 12 }}
                        viewport={{ once: true }}
                    >
                        <img src="/assets/pequenos-empresarios-nicho-1.jpg" alt="Descrição" style={{ width: "100%", height: "auto", borderRadius: "44px 0 44px 0" }} />
                    </motion.div>
                </div>
            </div>

            {/* Como funciona */}
            <HowItWorks />

            <Footer />
        </>
    );
};

export default AboutUs;
