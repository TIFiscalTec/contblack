import React, { useEffect, useState, useMemo } from "react";
import { Typography, Card, CardContent, Grid, useMediaQuery } from "@mui/material";
import { TrendingUp, CreditCard } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import HeaderDashboard from "../components/HeaderDashboard";
import axios from "axios";
import ModalFaturaAtrasada from "../components/ModalFaturaAtrasada";
import Loading from "../components/Loading";
import ModalFirstTime from "../components/ModalFirstTime";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { TourProvider, useTour } from "@reactour/tour";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { gerarLinkWhatsApp } from "../../utils/WhatsappLink";
import ModalNotificacao from "./components/ModalNotificacao";

const DashboardCard = ({ icon, color, title, value, onClick }) => (
    <Card onClick={onClick} sx={{ width: { xs: "320px", sm: "300px" }, height: "150px", borderRadius: "16px", boxShadow: "0 8px 16px rgba(0,0,0,0.05)", transition: "0.3s ease", cursor: onClick ? "pointer" : "default", "&:hover": { transform: onClick ? "scale(1.05)" : "none" }, }} >
        <CardContent>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {React.cloneElement(icon, { sx: { fontSize: 32, color } })}
                <div>
                    <Typography variant="subtitle2" color="textSecondary">
                        {title}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {value}
                    </Typography>
                </div>
            </div>
        </CardContent>
    </Card>
);

const DashboardContent = ({ user, userActive, setOpenModalNotificacao, openModalNotificacao, notificacoes, showModal, setShowModal, openModalFirstTime, setOpenModalFirstTime, loading, openModalAssinaturaCancelada, setOpenModalAssinaturaCancelada, openModalAssinaturaReativada, setOpenModalAssinaturaReativada }) => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width:768px)");
    const { setIsOpen } = useTour();

    useEffect(() => {
        if (user?.usuario?.FirstTime && user?.zapSign?.status === "signed") {
            setIsOpen(true);
        }
    }, [user, setIsOpen]);

    return (
        <>
            <HeaderDashboard userActive={userActive} setOpenModalNotificacao={setOpenModalNotificacao} notificacoes={notificacoes.length} />

            <div style={{ marginTop: "60px", padding: "20px", minHeight: "100vh", background: "#f4f6f8" }}>
                <div style={{ width: isMobile ? "100%" : "85%", margin: "0 auto", borderRadius: "12px", padding: isMobile ? "20px" : "30px" }} >
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                        Olá, {user?.usuario?.Nome.split(" ")[0] || "..."}
                    </Typography>

                    {/* Cards */}
                    <Grid container spacing={3} sx={{ mb: 5, justifyContent: "flex-start" }}>
                        <Grid xs={12} sm={6} md={4} id="faturasPagas">
                            <DashboardCard
                                icon={<CreditCard />}
                                color="#2e7d32"
                                title="Faturas Pagas"
                                value={user?.faturas?.pagas?.length || "0"}
                                onClick={() => navigate("../Dashboard/Faturas/Pagas")}
                            />
                        </Grid>
                        <Grid xs={12} sm={6} md={4} id="faturasPendentes">
                            <DashboardCard
                                icon={<TrendingUp />}
                                color="#d32f2f"
                                title="Faturas Pendentes"
                                value={user?.faturas?.pendentes?.length || "0"}
                                onClick={() => navigate("../Dashboard/Faturas/Pendentes")}
                            />
                        </Grid>
                        <Grid xs={12} sm={6} md={4} id="gerenciarPlanos">
                            <DashboardCard
                                icon={<DisplaySettingsIcon />}
                                color="black"
                                title="Detalhes do Plano"
                                value={user?.plano?.nome || "..."}
                                onClick={() => navigate("../Dashboard/Assinatura")}
                            />
                        </Grid>
                        <Grid xs={12} sm={6} md={4} id="areaVip">
                            <DashboardCard
                                icon={<AppRegistrationIcon />}
                                color="orange"
                                title="Acessar VIP"
                                value="Acessórias"
                                onClick={() => window.open("https://vip.acessorias.com/contblack")}
                            />
                        </Grid>
                        <Grid xs={12} sm={6} md={4} id="duvida">
                            <DashboardCard
                                icon={<WhatsAppIcon />}
                                color="green"
                                title="Dúvidas?"
                                value="Falar com atendente"
                                onClick={() => window.open(gerarLinkWhatsApp("Olá, tenho uma dúvida."))}
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>

            {/* Modais */}
            <ModalFaturaAtrasada
                open={showModal}
                onClose={() => setShowModal(false)}
                onAcessarFaturas={() => navigate("../Dashboard/Faturas/Pendentes")}
            />
            <ModalFirstTime
                openModalFirstTime={openModalFirstTime}
                handleClose={() => setOpenModalFirstTime(false)}
                user={user}
            />
            <ModalNotificacao
                openModalNotificacao={openModalNotificacao}
                onClose={() => setOpenModalNotificacao(false)}
                notificacoes={notificacoes}
            />
            <Loading open={loading} />
        </>
    );
};

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, fetchUser } = useUser();


    const [loading, setLoading] = useState(false);
    const [userActive, setUserActive] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [openModalFirstTime, setOpenModalFirstTime] = useState(false);
    const [openModalNotificacao, setOpenModalNotificacao] = useState(false);
    const [notificacoes, setNotificacoes] = useState([]);
    const [openModalAssinaturaCancelada, setOpenModalAssinaturaCancelada] = useState(false);
    const [openModalAssinaturaReativada, setOpenModalAssinaturaReativada] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) navigate("../Login");
    }, [token, navigate]);

    useEffect(() => {
        if (!user) {
            setLoading(true);
            return;
        }
        setLoading(false);

        if (user?.zapSign?.status !== "signed") {
            setOpenModalFirstTime(true);
        }
    }, [user]);

    useEffect(() => {
        const validarSessao = async () => {
            try {
                const { data } = await axios.post(
                    `${process.env.REACT_APP_API_URL}/validarToken`,
                    {},
                    { headers: { Authorization: token } }
                );

                if (data.status !== 200) {
                    localStorage.clear();
                    navigate("../Login");
                }
            } catch {
                localStorage.clear();
                navigate("../Login");
            }
        };
        validarSessao();
    }, [token, navigate]);

    useEffect(() => {
        const hasFaturasVencidas = user?.faturas?.vencidas?.length > 0;
        if (user?.assinatura?.status === "INACTIVE") {
            setOpenModalAssinaturaCancelada(true);
        }
        setUserActive(!hasFaturasVencidas);
        setShowModal(!!hasFaturasVencidas);
    }, [user, navigate]);

    const steps = useMemo(
        () => [
            { selector: "#faturasPagas", content: "Bem-vindo à sua área de clientes! Aqui você pode acompanhar suas faturas que já foram pagas." },
            { selector: "#faturasPendentes", content: "Aqui você pode visualizar as faturas que estão pendentes/vencidas." },
            { selector: "#gerenciarPlanos", content: "Aqui você pode gerenciar seu plano." },
            { selector: "#areaVip", content: "Aqui você será redirecionado a sua área VIP do Acessórias, onde irá acompanhar o andamento da sua contabilidade feita por nós." },
            { selector: "#duvida", content: "Ficou com alguma dúvida? Aqui você pode tirar suas dúvidas sobre o serviço." },
        ],
        []
    );

    useEffect(() => {
        const getNotify = async () => {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/buscarNotificacoes`, { email: localStorage.getItem("email") }, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                }
            });

            if (response.data.status === 200) {
                setNotificacoes(response.data.notificacoes)
            }
        }

        getNotify();
    }, [])

    const handleFirstTime = async () => {
        await axios.post(`${process.env.REACT_APP_API_URL}/handleFirstTime`, {
            email: user.usuario.Email
        }, {
            headers: {
                Authorization: token
            }
        });
        fetchUser();
    }

    return (
        <TourProvider steps={steps} onClickClose={({ setCurrentStep, currentStep, steps, setIsOpen }) => {
            if (steps) {
                if (currentStep === steps.length - 1) {
                    setIsOpen(false)
                    handleFirstTime()
                }
                setCurrentStep((s) => (s === steps.length - 1 ? 0 : s + 1))
            }
        }}>
            <DashboardContent
                user={user}
                userActive={userActive}
                setOpenModalNotificacao={setOpenModalNotificacao}
                openModalNotificacao={openModalNotificacao}
                notificacoes={notificacoes}
                showModal={showModal}
                setShowModal={setShowModal}
                openModalFirstTime={openModalFirstTime}
                setOpenModalFirstTime={setOpenModalFirstTime}
                loading={loading}
                openModalAssinaturaCancelada={openModalAssinaturaCancelada}
                setOpenModalAssinaturaCancelada={setOpenModalAssinaturaCancelada}
                openModalAssinaturaReativada={openModalAssinaturaReativada}
                setOpenModalAssinaturaReativada={setOpenModalAssinaturaReativada}
            />
        </TourProvider>
    );
};

export default Dashboard;
