// Footer.jsx
import { motion } from "framer-motion";
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useNavigate } from "react-router-dom";

import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
    const navigate = useNavigate();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const blockVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: i => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.2, duration: 0.6 }
        }),
    };

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { delay: 1, duration: 0.4 } },
        hover: { scale: 1.05 }
    };

    const socialIcons = [
        { icon: <FacebookOutlinedIcon sx={{ fontSize: "28px", color: "#0b243d" }} />, link: "https://www.facebook.com/contblackoficial" },
        { icon: <InstagramIcon sx={{ fontSize: "28px", color: "#0b243d" }} />, link: "https://www.instagram.com/contblack_" },
        { icon: <XIcon sx={{ fontSize: "26px", color: "#0b243d" }} />, link: "https://x.com/contblack" },
        { icon: <YouTubeIcon sx={{ fontSize: "28px", color: "#0b243d" }} />, link: "https://www.youtube.com/@contblackoficial" },
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    width="24px"
                    height="24px"
                    fill="#0b243d"
                >
                    <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
                </svg>
            ),
            link: "https://www.tiktok.com/@contblackoficial"
        }
    ];

    return (
        <footer
            style={{
                width: "100%",
                backgroundColor: "#233344", // azul-marinho
                padding: "50px 0 0",
                color: "white"
            }}
        >
            <motion.div
                style={{
                    width: "90%",
                    margin: "0 auto",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    gap: "30px",
                }}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    custom={0}
                    variants={blockVariants}
                    style={{ flex: "1 1 250px", minWidth: "250px" }}
                >
                    <div
                        style={{
                            width: "100%",
                            height: "fit-content",// amarelo
                            marginBottom: "10px",
                            overflow: "hidden", // garante que não ultrapasse o container
                            borderRadius: "8px" // opcional, deixa mais bonito
                        }}
                    >
                        <img
                            src="/assets/Logo_Contblack_vert_FundoEscuro.png" // se estiver em public/
                            alt="Logo Clarea"
                            style={{
                                width: "80%",
                                height: "80%",
                                objectFit: "cover",
                            }}
                        />
                    </div>

                    <strong>SIGA NOSSAS REDES SOCIAIS</strong>
                    <div
                        style={{
                            display: "flex",
                            gap: "12px",
                            flexWrap: "wrap",
                            marginTop: "10px",
                            justifyContent: "flex-start",
                        }}
                    >
                        {socialIcons.map((item, index) => (
                            <a
                                key={index}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "50%",
                                    backgroundColor: "#1EFF86",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    transition: "all 0.3s ease",
                                    textDecoration: "none",
                                    color: "white",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "scale(1.1)";
                                    e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";

                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "scale(1)";
                                    e.currentTarget.style.boxShadow = "none";

                                }}
                            >
                                {item.icon}
                            </a>
                        ))}
                    </div>
                </motion.div>

                {/* Links 1 */}
                <motion.div
                    custom={1}
                    variants={blockVariants}
                    style={{ flex: "1 1 200px", minWidth: "200px" }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                            marginTop: "20px",
                        }}
                    >
                        <strong style={{ cursor: "pointer" }} onClick={() => navigate("/")}>PÁGINA INICIAL</strong>
                        <strong style={{ cursor: "pointer" }} onClick={() => navigate("../SobreNos")}>SOBRE NÓS</strong>
                        <strong style={{ cursor: "pointer" }} onClick={() => navigate("../Planos")}>PLANOS</strong>
                        <strong style={{ cursor: "pointer" }} onClick={() => navigate("../Solucoes")}>SOLUÇÕES</strong>
                        <strong style={{ cursor: "pointer" }} onClick={() => navigate("../Nichos")}>NICHOS</strong>
                        <strong>FALE CONOSCO</strong>
                        <strong>TRABALHE CONOSCO</strong>
                    </div>
                </motion.div>

                {/* Links 2 */}
                <motion.div
                    custom={2}
                    variants={blockVariants}
                    style={{ flex: "1 1 200px", minWidth: "200px" }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                            marginTop: "20px",
                        }}
                    >
                        <strong style={{ cursor: "pointer" }} onClick={() => navigate("../Planos")}>PLANO STARTER</strong>
                        <strong style={{ cursor: "pointer" }} onClick={() => navigate("../Planos")}>PLANO BÁSICO</strong>
                        <strong style={{ cursor: "pointer" }} onClick={() => navigate("../Planos")}>PLANO AVANÇADO</strong>
                        <strong style={{ cursor: "pointer" }} onClick={() => navigate("../Planos")}>PLANO PLUS+</strong>
                        <strong>ABERTURA DE EMPRESA</strong>
                        <strong>ENTREGA DE DECLARAÇÕES</strong>
                        <strong style={{ cursor: "pointer" }} onClick={() => navigate("../Solucoes")}>TROQUE DE CONTADOR</strong>
                    </div>
                </motion.div>

                {/* Contato */}
                <motion.div
                    custom={3}
                    variants={blockVariants}
                    style={{ flex: "1 1 250px", minWidth: "250px" }}
                >
                    <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                        <h1 style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", color: "white" }}>Contato.</h1>
                        <h2 style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", color: "white" }}>(41) 98422-9975</h2>
                        <strong>personal@contblack.com.br</strong>
                        <Button
                            variant="contained"
                            sx={{
                                width: "70%",
                                marginTop: "20px",
                                padding: "7px 14px",
                                fontSize: "0.8rem",
                                fontWeight: 800,
                                backgroundColor: "#1EFF86",
                                color: "white",
                                borderRadius: "17px 0 17px 0",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                                transition: "0.3s ease",
                                '&:hover': {
                                    backgroundColor: "#9C01B9",
                                    boxShadow: "0 4px 10px #9C01B9",
                                },
                            }}
                            onClick={() => navigate("../Planos")}
                        >
                            ACESSE NOSSOS PLANOS
                        </Button>
                    </div>
                </motion.div>
            </motion.div>

            {/* Botão voltar ao topo */}
            <motion.div
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    padding: "30px 0",
                }}
            >
                <Button
                    onClick={scrollToTop}
                    variant="contained"
                    sx={{
                        marginTop: "20px",
                        padding: "7px 14px",
                        fontSize: "0.8rem",
                        fontWeight: 800,
                        backgroundColor: "#1EFF86",
                        color: "white",
                        borderRadius: "17px 0 17px 0",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                        transition: "0.3s ease",
                        '&:hover': {
                            backgroundColor: "#9C01B9",
                            boxShadow: "0 4px 10px #9C01B9",
                        },
                    }}
                >
                    VOLTAR AO TOPO DA PÁGINA
                </Button>
            </motion.div>

            <Divider sx={{ borderColor: "#ffffff44" }} />

            <div
                style={{
                    width: "100%",
                    padding: "20px 10px",
                    textAlign: "center",
                    fontSize: "0.9rem",
                    color: "white"
                }}
            >
                <p>©2025 Contblack. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
