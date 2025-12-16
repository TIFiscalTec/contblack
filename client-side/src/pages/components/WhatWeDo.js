import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { gerarLinkWhatsApp } from '../../utils/WhatsappLink';

const WhatWeDo = (props) => {
    const navigate = useNavigate();
    const listAccordions = [
        { title: "Cumpra os prazos e a lei", desc: "A gente anda com a lei meu chapa, mas você não precisa andar! Deixa com a contblack." },
        { title: "Pagamento de funcionários", desc: "Organize o pagamento da galera e sócios em poucos cliques." },
        { title: "Consultoria sem contabiliquês", desc: "Falamos sua língua e conhecemos a diversidade de negócios digitais." },
        { title: "Abertura de empresas", desc: "Muito mais do abrir um MEI, guiamos nossos clientes sem burocracia." },
        { title: "Envio de NFs", desc: "Nunca mais esqueça de enviar uma nota fiscal." },
        { title: "Atendimento que fala sua língua", desc: "Sem contabiliquês, pra você decidir com segurança :)" },
    ];

    return (
        <>
            {/* SECTION 1 */}
            <section style={{ width: "100%", padding: "60px 0", display: "flex", justifyContent: "center", flexWrap: "wrap", backgroundColor: "white" }}>
                <div className="what-we-do-container" style={{ width: "60%", maxWidth: "1400px", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>

                    {/* Lado Esquerdo */}
                    <motion.div
                        className="what-we-do-left"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        style={{
                            width: "48%",
                            minWidth: "300px",
                            padding: "20px 30px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                        }}
                    >
                        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            <div>
                                <h1 style={{ fontSize: "2.3rem", lineHeight: "1.3", marginBottom: "10px", color: "#0b243d" }}>
                                    <b style={{ color: "#9C01B9" }}>Deixamos sua contabilidade em dia</b> <b style={{ color: "#1EFF86" }}>#SemContabiliquês</b>
                                </h1>
                            </div>
                            <p style={{ fontSize: "clamp(0.9rem, 1vw, 1rem)", marginBottom: "10px", color: "#222" }}>
                                Aplicamos mais de 15 anos de contabilidade à realidade de negócios digitais como o seu!
                            </p>
                            <Button size="small" variant="contained" endIcon={<WhatsAppIcon />} sx={{
                                backgroundColor: "#9C01B9",
                                borderRadius: "17px 0 17px 0",
                                padding: "7px 14px",

                                fontSize: "0.7rem",
                                color: "white",
                                fontWeight: 800,
                                border: "none",
                                transition: "0.3s ease",
                                '&:hover': {
                                    backgroundColor: "#1EFF86",
                                    boxShadow: "0 4px 10px #1EFF86",
                                }
                            }} onClick={() => window.open(gerarLinkWhatsApp("Olá, quero abrir minha empresa com a Contblack!"))}>
                                Abra sua empresa
                            </Button>
                        </div>
                    </motion.div>

                    {/* Lado Direito (Accordions) */}
                    <motion.div
                        className="what-we-do-right"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        style={{
                            width: "48%",
                            minWidth: "300px",
                            padding: "20px 0",
                        }}
                    >
                        {listAccordions.map((obj, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Accordion
                                    sx={{
                                        marginBottom: "20px",
                                        backgroundColor: "#233344", // fundo escuro do accordion
                                        borderRadius: "8px",
                                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                        '& .MuiAccordionSummary-root': {
                                            backgroundColor: "lightgray", // verde neon no resumo
                                            color: "#233344",            // texto escuro sobre o verde
                                            fontWeight: "bold",
                                            borderRadius: "8px 8px 0 0",
                                        },
                                        '& .MuiTypography-root': {
                                            color: "#233344", // texto da summary
                                            fontWeight: 600,
                                        },
                                        '& .MuiAccordionDetails-root': {
                                            backgroundColor: "#1EFF86", // roxo como destaque do conteúdo
                                            color: "black",              // texto branco sobre o roxo
                                            borderRadius: "0 0 8px 8px",
                                        },
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon sx={{ color: "#233344" }} />} // ícone escuro sobre verde
                                        aria-controls={`panel${i}-content`}
                                        id={`panel${i}-header`}
                                    >
                                        <Typography component="span">{obj.title}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {obj.desc}
                                    </AccordionDetails>
                                </Accordion>

                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Responsivo */}
                <style>{`
                    @media (max-width: 768px) {
                        .what-we-do-container {
                            width: 90% !important;
                            flex-direction: column;
                            align-items: center;
                            text-align: center;
                        }

                        .what-we-do-left, .what-we-do-right {
                            width: 100% !important;
                            padding: 20px 10px !important;
                        }

                        .what-we-do-left h1 {
                            font-size: 1.6rem !important;
                        }
                    }
                `}</style>
            </section>

            {/* SECTION 2 */}
            <section>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    style={{
                        width: "100%",
                        background: "linear-gradient(to right, #1EFF86 0%, transparent 50%, #1EFF86 100%)",
                        color: "black",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "10px 0",
                    }}
                >
                    <div
                        className="container-bloco"
                        style={{
                            width: "90%",
                            maxWidth: "1400px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "20px",
                            flexWrap: "wrap",
                        }}
                    >
                        {/* Imagem */}
                        {/* <motion.div
                            className="imagem-bloco"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            style={{
                                width: "30%",
                                minWidth: "200px",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            {/* <img
                                // src="/assets/ECONOMIA-verde-1024x1024.png"
                                alt="Ver Planos"
                                style={{
                                    width: "100%",
                                    maxWidth: "300px",
                                    objectFit: "contain",
                                    borderRadius: "8px",
                                }}
                            /> */}
                        {/* </motion.div> */}

                        {/* Texto + botão */}
                        <motion.div
                            className="conteudo-bloco"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            style={{
                                width: "65%",
                                minWidth: "250px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "20px",
                                textAlign: "center",
                            }}
                        >
                            <h1
                                style={{
                                    fontSize: "clamp(1.2rem, 2.2vw, 2.2rem)",
                                    lineHeight: "1.4",
                                    marginBottom: "20px",
                                }}
                            >
                                Cuidamos da sua contabilidade para você se concentrar no que faz de melhor.
                            </h1>
                            <Button size="small" variant="contained" sx={{
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
                            }} onClick={() => navigate("../Planos")}>
                                Ver os planos
                            </Button>
                        </motion.div>
                    </div>

                    {/* Responsivo */}
                    <style>{`
                        @media (max-width: 768px) {
                            .container-bloco {
                                flex-direction: column !important;
                                align-items: center !important;
                                text-align: center;
                            }

                            .imagem-bloco, .conteudo-bloco {
                                width: 100% !important;
                            }

                            .imagem-bloco img {
                                display: none;
                            }

                            .btn-plans {
                                display: none;
                            }
                        }
                    `}</style>
                </motion.div>
            </section>
        </>
    );
};

export default WhatWeDo;
