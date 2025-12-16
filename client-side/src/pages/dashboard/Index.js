import React, { useEffect, useState, useMemo } from "react";
import { Typography, Card, CardContent, Grid, useMediaQuery, Divider } from "@mui/material";
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
import ReceiptIcon from '@mui/icons-material/Receipt';
import DescriptionIcon from '@mui/icons-material/Description';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const DashboardCard = ({ icon, color, title, value, onClick, warning }) => (
    <Card onClick={onClick} sx={{ width: { xs: "320px", sm: "300px" }, height: "fit-content", borderRadius: "16px", boxShadow: "0 8px 16px rgba(0,0,0,0.05)", transition: "0.3s ease", cursor: onClick ? "pointer" : "default", "&:hover": { transform: onClick ? "scale(1.05)" : "none" }, }} >
        <CardContent>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {React.cloneElement(icon, { sx: { fontSize: 32, color } })}
                <div>
                    <Typography variant="subtitle2" color="textSecondary">
                        {title}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: warning ? "red" : "black" }}>
                        {value}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 300, color: "red" }}>
                        {warning}
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
                    <Grid container spacing={3} sx={{ mb: 3, justifyContent: "flex-start" }}>
                        <Grid xs={12} sm={6} md={4} id="emitirNota">
                            <DashboardCard
                                icon={<ReceiptIcon />}
                                color="#901CB3"
                                title="Emitir nota fiscal"
                                value={
                                    `${user?.notasEmitidasEsteMes || 0}/${user?.plano?.qtdNfseMensalUsuario === -1
                                        ? "∞"
                                        : user?.plano?.qtdNfseMensalUsuario ?? 0
                                    }`
                                }
                                warning={
                                    user?.plano?.qtdNfseMensalUsuario !== -1 &&
                                        user?.notasEmitidasEsteMes >= (user?.plano?.qtdNfseMensalUsuario ?? 0)
                                        ? "Limite mensal atingido"
                                        : ""
                                }
                                onClick={() => {
                                    const limite = user?.plano?.qtdNfseMensalUsuario;
                                    const emitidas = user?.notasEmitidasEsteMes || 0;
                                    const podeEmitir = user?.empresa && (limite === -1 || emitidas < (limite ?? 0));

                                    if (podeEmitir) {
                                        navigate("../Dashboard/EmitirNotaServico");
                                    }
                                }}
                            />
                        </Grid>

                        <Grid xs={12} sm={6} md={4} id="notasEmitidas">
                            <DashboardCard
                                icon={<DescriptionIcon />}
                                color="#0b243d"
                                title="Notas fiscais emitidas"
                                value={user?.totalNotasEmitidas || "0"}
                                onClick={() => navigate("../Dashboard/NotasFiscaisEmitidas")}
                            />
                        </Grid>
                        <Grid xs={12} sm={6} md={4} id="certificado">
                            <DashboardCard
                                icon={<VerifiedUserIcon />}
                                color={user?.certificado ? "green" : "red"}
                                title="Certificado Digital"
                                value={user?.certificado ? "Ativo" : "Inativo"}
                                onClick={() => navigate("../Dashboard/Certificado")}
                            />
                        </Grid>
                    </Grid>
                    <Divider />
                </div>
                <div style={{ width: isMobile ? "100%" : "85%", margin: "0 auto", borderRadius: "12px", padding: isMobile ? "20px" : "30px" }} >

                    {/* Cards */}
                    <Grid container spacing={3} sx={{ mb: 3, justifyContent: "flex-start" }}>
                        <Grid xs={12} sm={6} md={4} id="servicos">
                            <DashboardCard
                                icon={<HomeRepairServiceIcon />}
                                color="#2e7d32"
                                title="Meus serviços"
                                value={user?.servicos?.length || "0"}
                                onClick={() => navigate("../Dashboard/Servicos")}
                            />
                        </Grid>
                    </Grid>
                    <Divider />
                </div>
                <div style={{ width: isMobile ? "100%" : "85%", margin: "0 auto", borderRadius: "12px", padding: isMobile ? "20px" : "30px" }} >

                    {/* Cards */}
                    <Grid container spacing={3} sx={{ mb: 3, justifyContent: "flex-start" }}>
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
                    </Grid>
                    <Divider />
                </div>
                <div style={{ width: isMobile ? "100%" : "85%", margin: "0 auto", borderRadius: "12px", padding: isMobile ? "20px" : "30px" }} >

                    {/* Cards */}
                    <Grid container spacing={3} sx={{ mb: 3, justifyContent: "flex-start" }}>
                        <Grid xs={12} sm={6} md={4} id="acessorias">
                            <DashboardCard
                                icon={<AppRegistrationIcon />}
                                color="orange"
                                title="Acessar VIP"
                                value="Acessórias"
                                onClick={() => window.open("https://vip.acessorias.com")}
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
                    <Divider />
                </div>
                <div style={{ width: isMobile ? "100%" : "85%", margin: "0 auto", borderRadius: "12px", padding: isMobile ? "20px" : "30px" }} >

                    {/* Cards */}
                    <Grid container spacing={3} sx={{ mb: 3, justifyContent: "flex-start" }}>
                        <Grid xs={12} sm={6} md={4} id="plano">
                            <DashboardCard
                                icon={<DisplaySettingsIcon />}
                                color="black"
                                title="Detalhes do Plano"
                                value={user?.plano?.nome || "..."}
                                onClick={() => navigate("../Dashboard/Assinatura")}
                            />
                        </Grid>
                    </Grid>
                    <Divider />
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
            fetchUser();

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
            {
                selector: "#emitirNota",
                content: "👋 Bem-vindo(a) à sua área de clientes! Aqui você pode emitir suas notas fiscais de serviço de forma simples e segura."
            },
            {
                selector: "#certificado",
                content: "🔒 Antes de começar, é importante cadastrar o seu certificado digital e configurar as informações da sua clínica ou consultório."
            },
            {
                selector: "#servicos",
                content: "💼 Aqui você cadastra os serviços que oferece — como consultas, procedimentos ou atendimentos — para utilizá-los na emissão das notas fiscais."
            },
            {
                selector: "#notasEmitidas",
                content: "📄 Nesta seção, você pode acompanhar todas as notas fiscais já emitidas, com detalhes e status de cada uma."
            },
            {
                selector: "#faturasPagas",
                content: "💰 Aqui você visualiza as faturas que já foram pagas, mantendo seu histórico financeiro sempre organizado."
            },
            {
                selector: "#faturasPendentes",
                content: "⏰ Nesta parte, você confere as faturas que ainda estão pendentes ou vencidas, para manter tudo em dia."
            },
            {
                selector: "#acessorias",
                content: "📊 Este é o espaço onde você pode acompanhar sua contabilidade de forma prática, com o apoio da equipe responsável."
            },
            {
                selector: "#duvida",
                content: "❓ Ficou com alguma dúvida? Aqui você encontra suporte e informações para facilitar o uso do sistema."
            },
            {
                selector: "#plano",
                content: "⭐ Aqui você pode consultar e gerenciar o seu plano de assinatura, de acordo com as necessidades da sua rotina profissional."
            },
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
