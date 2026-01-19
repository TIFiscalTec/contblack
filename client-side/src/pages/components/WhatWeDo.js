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
        { title: "Ao abrir meu CNPJ, posso receber pagamentos diretamente na minha conta bancária pessoal?", desc: "Não é recomendável receber pagamentos diretamente na sua conta bancária pessoal quando você tem um CNPJ. Embora, tecnicamente, seja possível, isso pode trazer alguns problemas. Ao abrir um CNPJ, você está separando suas finanças pessoais das finanças da sua empresa, o que ajuda a evitar complicações fiscais e contábeis no futuro." },
        { title: "Por que é importante ter um endereço fiscal para a empresa?", desc: "Ter um endereço fiscal para a sua empresa é importante por várias razões, que envolvem questões legais, administrativas e até mesmo operacionais. Mas o ponto principal esta ligado a sua privacidade e segurança, uma vez que esse endereço será publico." },
        { title: "Quais são os riscos de não declarar os impostos devidos?", desc: "Não declarar os impostos devidos pode trazer vários problemas. O principal risco é que a Receita Federal pode cobrar os valores atrasados, incluindo multas e juros, o que pode aumentar consideravelmente o valor devido. Além disso, ficar em dívida com o fisco pode resultar em bloqueio de contas bancárias, bloqueio de bens e até mesmo a inscrição da empresa no cadastro de inadimplentes, o que prejudica a reputação da empresa e dificulta a obtenção de crédito. Em casos mais graves, a empresa pode ser processada e, dependendo da situação, até seus sócios podem ser responsabilizados pessoalmente. É sempre melhor regularizar a situação antes que os problemas se agravem." },
        { title: "Quais são os benefícios de declarar corretamente os impostos?", desc: "Maior possibilidade de obter empréstimos e financiamentos bancários, acesso a cartões de crédito, descontos em planos de saúde, seguros mais vantajosos e facilidade na aquisição de bens." },
        { title: "Como funciona o processo de declaração de impostos para uma empresa?", desc: "Pode deixar que resolvemos quase tudo, você nos informa o quanto faturou no mês (o que você ganhou de dinheiro) e nós cuidamos de todo o resto!" },
        { title: "Nunca declarei meus impostos. Ainda há como regularizar a situação?", desc: "Sim, ainda há como regularizar a situação. Se você nunca declarou seus impostos, é importante agir o quanto antes para evitar problemas maiores no futuro. O primeiro passo é procurar a Contblack para ajudá-lo(a) a calcular os impostos devidos e organizar toda a documentação necessária. Dependendo do tempo que passou desde a última declaração, pode ser necessário fazer a retificação das declarações ou pagar os impostos retroativamente, com as devidas correções, juros e multas." },
    ];

    return (
        <>
            {/* SECTION 1 */}
            <section style={{ width: "100%", padding: "60px 0", display: "flex", justifyContent: "center", flexWrap: "wrap", backgroundColor: "white" }}>
                <div className="what-we-do-container" style={{ width: "60%", maxWidth: "1400px", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>

                    {/* Lado Esquerdo */}
                    <motion.div
                        className="what-we-do-left"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        style={{
                            width: "48%",
                            minWidth: "250px",
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
                        initial={{ opacity: 0, x: 10 }}
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
                            <div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Accordion
                                    sx={{
                                        marginBottom: "20px",
                                        backgroundColor: "#1EFF86", // fundo escuro do accordion
                                        borderRadius: "8px",
                                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                        '& .MuiAccordionSummary-root': {
                                            backgroundColor: "#1EFF86", // verde neon no resumo
                                            color: "#233344",            // texto escuro sobre o verde
                                            fontWeight: "bold",
                                            borderRadius: "8px 8px 0 0",
                                        },
                                        '& .MuiTypography-root': {
                                            color: "#233344", // texto da summary
                                            fontWeight: 600,
                                        },
                                        '& .MuiAccordionDetails-root': {
                                            backgroundColor: "#60ffaaff", // roxo como destaque do conteúdo
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
                                        <Typography component="span" sx={{ fontSize: "0.8rem" }}>{obj.title}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ fontSize: "0.75rem" }}>
                                        {obj.desc}
                                    </AccordionDetails>
                                </Accordion>

                            </div>
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
                        <div
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
                        </div>
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
