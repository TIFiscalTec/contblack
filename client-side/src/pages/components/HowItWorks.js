import { motion } from "framer-motion";
import Button from '@mui/material/Button';
// import { gerarLinkWhatsApp } from "../../utils/WhatsappLink";

const HowItWorks = () => {
    const steps = [
        {
            titulo: "Escolha seu plano.",
            desc: "Escolha e assine o melhor plano para você!",
            img: "/assets/comofunciona1.jpg"
        },
        {
            titulo: "Entramos em contato.",
            desc: "Seu assessor Contblack irá entrar em contato com você!",
            img: "/assets/comofunciona2.jpg"
        },
        {
            titulo: "Acompanhamento.",
            desc: "Todos os meses seu contador Contblack cuidará de tudo para você!",
            img: "/assets/comofunciona3.jpg"
        },
    ];

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: i => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.2, duration: 0.5 }
        }),
    };

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { delay: steps.length * 0.2 + 0.3, duration: 0.4 } },
    };

    return (
        <section
            style={{
                width: "100%",
                height: "fit-content",
                backgroundColor: "#f5f5f5", // bege claro
                padding: "30px",
                boxSizing: "border-box"
            }}
        >
            <div
                style={{
                    width: "100%",
                    textAlign: "center",
                    padding: "0 0 60px",
                }}
            >
                <p style={{ margin: 0 }}>COMO FUNCIONA</p>
                <h1 style={{ fontSize: "clamp(1.0rem, 3vw, 2.2rem)", margin: 0 }}>
                    <b style={{ color: "#9C01B9" }}>É muito fácil fazer parte da</b> <b style={{ color: "#1EFF86" }}>Contblack</b>
                </h1>
            </div>

            <div
                style={{
                    width: "90%",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "30px",
                    margin: "0 auto"
                }}
            >
                {steps.map((item, index) => (
                    <motion.div
                        key={index}
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        style={{
                            width: "100%",
                            maxWidth: "300px",
                            flex: "1 1 300px",
                            height: "fit-content",
                            textAlign: "center",
                        }}
                    >
                        <img
                            src={item.img}
                            alt={item.titulo}
                        />
                        <div style={{ marginTop: "15px" }}>
                            <h2 style={{ fontSize: "1.2rem", margin: "10px 0" }}>{item.titulo}</h2>
                            <p style={{ fontSize: "0.95rem", margin: 0 }}>{item.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    padding: "50px 0 20px"
                }}
            >
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
                }}>
                    falar com um consultor
                </Button>
            </motion.div>
        </section>
    );
};

export default HowItWorks;
