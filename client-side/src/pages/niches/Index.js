import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import AddIcon from '@mui/icons-material/Add';
import { gerarLinkWhatsApp } from "../../utils/WhatsappLink";


// Componente de card isolado
const NicheCard = ({ title, description, link }) => {
    const [hovered, setHovered] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        //         9C01B9
        // 1EFF86
        <motion.div
            style={{
                width: "200px",
                height: "200px",
                backgroundColor: link ? "#9C01B9" : "#1EFF86",
                borderRadius: "10px",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                transform: hovered ? "scale(1.05)" : "scale(1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                boxShadow: hovered ? "0 4px 15px rgba(0, 0, 0, 0.3)" : "none",
            }}
            onClick={() => link ? window.open(link, "_blank") : null}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <p
                style={{
                    color: link ? "white" : "black",
                    textAlign: "center",
                    marginTop: "70px",
                    fontWeight: "bold",
                    padding: "0 10px"
                }}
            >
                {title}
            </p>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50%" }}>
                <AddIcon sx={{ fontSize: "35px", color: "#0b243d" }} />
            </div>
            {hovered && (
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        color: "white",
                        textAlign: "center",
                        fontSize: "14px",
                    }}
                >
                    {description}
                </div>
            )}
        </motion.div>
    );
};

const Niches = () => {
    const listNiches = [
        {
            title: "Freelas",
            description: "Mais briefing, menos burocracia e você focado no seu talento.",
        },
        {
            title: "Creators",
            description: "Organize sua monetização e impostos com tranquilidade.",
        },
        {
            title: "Alt models",
            description: "Organize sua receita nacional e internacional sem burocracia.",
        },
        {
            title: "Infoprodutores",
            description: "Do mil ao milhão, sem problemas com o Leão.",
        },
        {
            title: "MEIS",
            description: "Contabilidade online sem surpresas nem atrasos para prestadores de serviços em geral.",
        },
        {
            title: "Anywhere office",
            description: "Pra quem já é 100% digital e trabalha de qualquer lugar do mundo.",
        },
        {
            title: "Digital influencer",
            description: "A gente entende de parcerias, publis, monetização e como tudo isso se transforma em nota fiscal.",
        },
        {
            title: "Gamers",
            description: "Recebe da gringa? Faz live com donate? Temos planos pensados pra você escalar com segurança.",
        },
        {
            title: "Não encontrou sua categoria?",
            description: "Clique e fale conosco para saber como podemos ajudar sua profissão.",
            link: gerarLinkWhatsApp("Olá! Não encontrei minha categoria na lista. Poderiam verificar se atendem minha profissão e me passar mais detalhes?"),
        },
    ];

    return (
        <>
            <Header active="nichos" />

            {/* Seção de introdução */}
            <div style={{
                marginTop: "60px",
                width: "100%",
                padding: "20px",
                backgroundColor: "#233344",
                color: "white"
            }}>
                <div
                    style={{
                        width: "80%",
                        maxWidth: "1200px",
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "20px",
                    }}
                >
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
                            style={{ width: "100%", height: "auto", borderRadius: "50%" }}
                        />
                    </motion.div>

                    <motion.div
                        style={{ flex: "1 1 300px" }}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>Nichos</h1>
                        <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                            Cada criador tem sua própria rotina e desafios. Por isso, oferecemos <b>atendimento contábil personalizado para influencers, gamers, alt models, streamers</b> e outros profissionais digitais.
                            Nossos serviços são pensados para se ajustar ao seu dia a dia, garantindo <b>organização financeira, segurança fiscal e liberdade</b> para focar no que você faz de melhor.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Cards de nichos */}
            <div style={{ width: "100%", backgroundColor: "#f2f2f2", padding: "40px 0" }}>
                <div
                    style={{
                        width: "80%",
                        maxWidth: "1200px",
                        margin: "0 auto",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "30px",
                    }}
                >
                    {listNiches.map((niche, index) => (
                        <NicheCard key={index} title={niche.title} description={niche.description} link={niche.link ? niche.link : ""} />
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Niches;
