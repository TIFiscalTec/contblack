import React, { useRef, useState, useEffect } from "react";

import { Box } from "@mui/material";
import { Card, CardContent, Avatar, Typography, Rating } from "@mui/material";
import { motion } from "framer-motion";


export default function Avaliacoes() {
    const avaliacoes = [
        {
            nome: <>Deny <b style={{ color: "#9C01B9" }}>Barbie</b></>,
            ocupation: "Influencer/Produtora de Conteúdo",
            imagem: "assets/deny.png",
            rating: 5,
            comentario: "“Trabalho com eles a dois anos e são muito prestativos, sempre resolvem tudo bem rápido! Estou muito feliz e satisfeita com a equipe.”"
        },
        {
            nome: <>Carolina <b style={{ color: "#9C01B9" }}>Dianas</b></>,
            ocupation: "Influencer/Produtora de Conteúdo",
            imagem: "assets/ismaila.png",
            rating: 5,
            comentario: <>
                <p>“Tinha muita dificuldade em encontrar uma contabilidade que atendesse exatamente ao que eu precisava, porque não entendo nada do assunto.</p>
                A Contblack superou minhas expectativas: o suporte é praticamente 24 horas, tudo é entregue nos prazos e eu não preciso me preocupar com nada. Hoje sei que minha empresa está totalmente segura com eles.”
            </>
        },
        {
            nome: <>Elis <b style={{ color: "#9C01B9" }}>Nebsniak</b></>,
            ocupation: "Influencer/Produtora de Conteúdo",
            imagem: "assets/elis.png",
            rating: 5,
            comentario: "“Desde que contratamos a Contblack, estamos 100% satisfeitos. No início, surgiram várias dúvidas sobre a contabilidade digital, mas todas foram esclarecidas com rapidez e clareza. Os pagamentos são sempre gerados em dia e a equipe nos lembra constantemente de enviar as informações necessárias, o que traz muita tranquilidade ao nosso dia a dia. Nota 1000!”"
        },
        {
            nome: <>Marina <b style={{ color: "#9C01B9" }}>Steele</b></>,
            ocupation: "Influencer/Produtora de Conteúdo",
            imagem: "assets/steele.png",
            rating: 5,
            comentario: "“Sempre tive uma ótima experiência com a empresa! Sempre que tenho dúvidas ou preciso de suporte, há alguém para me auxiliar e responder. Já estou há mais de um ano e pretendo permanecer por muito tempo.”"
        },
        {
            nome: <>Adry <b style={{ color: "#9C01B9" }}>Rot</b></>,
            ocupation: "Influencer/Produtora de Conteúdo",
            imagem: "assets/hot.png",
            rating: 5,
            comentario: "“O trabalho da Contblack tem sido muito útil para mim. Ajuda muito, fico muito mais tranquila com o trabalho deles. Há muita transparência e competência; é muito bom para o meu dia a dia, para lidar com as contas.”"
        }
    ]

    const carouselRef = useRef(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (!carouselRef.current) return;

        const observer = new ResizeObserver(() => {
            const scrollWidth = carouselRef.current.scrollWidth;
            const offsetWidth = carouselRef.current.offsetWidth;
            setWidth(scrollWidth - offsetWidth);
        });

        observer.observe(carouselRef.current);

        return () => observer.disconnect();
    }, []);

    const MotionCard = motion(Card);

    return (
        <Box
            sx={{
                marginTop: "80px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
            }}
        >
            {/* CONTAINER PRINCIPAL */}
            <Box
                sx={{
                    width: "80%",
                    maxWidth: 1200,
                    textAlign: "center",
                    padding: "0px",
                    borderRadius: 12,
                    color: "white",
                }}
            >
                {/* TÍTULO */}
                <Typography
                    variant="h4"
                    sx={{ mb: 1, color: "#9C01B9", fontWeight: 600 }}
                >
                    Confiado por nossos clientes
                </Typography>

                {/* DESCRIÇÃO */}
                <Typography sx={{ opacity: 0.8, color: "#233344" }}>
                    Veja o que nossos clientes satisfeitos dizem sobre sua experiência com a
                    Contblack e como os ajudamos a alcançar seus objetivos.
                </Typography>

                {/* CARROSSEL COM DRAG */}
                <motion.div
                    ref={carouselRef}
                    style={{
                        marginTop: "40px",
                        overflow: "hidden",
                        cursor: "grab",
                        width: "100%",
                    }}
                    whileTap={{ cursor: "grabbing" }}
                >
                    <motion.div
                        drag="x"
                        dragConstraints={{ left: -width, right: 0 }}
                        style={{
                            display: "flex",
                            gap: "24px",
                            width: "100%",
                            marginRight: -10,
                            height: "650px",
                        }}
                    >
                        {avaliacoes.map((avaliacao, index) => (
                            <Box
                                key={index}
                                sx={{
                                    flexShrink: 0,
                                }}
                            >
                                <MotionCard
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.6,
                                        ease: "easeOut",
                                    }}
                                    whileHover={{
                                        scale: 1.04,
                                        boxShadow: "0px 12px 30px rgba(0,0,0,0.15)",
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    sx={{
                                        width: 320,
                                        minHeight: "600px",
                                        backgroundColor: "white",
                                        color: "black",
                                        borderRadius: 3,
                                        marginRight: -1,
                                        p: 2,
                                        cursor: "pointer",
                                    }}
                                >
                                    <CardContent sx={{ textAlign: "center" }}>
                                        <Avatar
                                            src={avaliacao.imagem}
                                            sx={{
                                                width: 150,
                                                height: 150,
                                                margin: "0 auto",
                                            }}
                                        />

                                        <Typography variant="h6" sx={{ mt: 2 }}>
                                            {avaliacao.nome}
                                        </Typography>

                                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                            {avaliacao.ocupation}
                                        </Typography>

                                        <Rating
                                            readOnly
                                            value={avaliacao.rating}
                                            sx={{
                                                mt: 1,
                                                "& .MuiRating-iconFilled": { color: "#9C01B9" },
                                                "& .MuiRating-iconEmpty": { color: "gray" },
                                            }}
                                        />

                                        <Typography
                                            variant="body2"
                                            sx={{ mt: 2, opacity: 0.9, fontStyle: "italic" }}
                                        >
                                            {avaliacao.comentario}
                                        </Typography>
                                    </CardContent>
                                </MotionCard>
                            </Box>
                        ))}
                    </motion.div>
                </motion.div>
            </Box>
        </Box>
    )
}