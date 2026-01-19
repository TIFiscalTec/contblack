import { useEffect, useState } from "react";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Badge from '@mui/material/Badge';
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HomeIcon from '@mui/icons-material/Home';

function HeaderDashboard(props) {

    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const navigate = useNavigate()

    useEffect(() => {
        const validarToken = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("../");
            }

            const response = await axios.get(`${process.env.REACT_APP_API_URL}/hasPlan`, {
                headers: {
                    Authorization: token
                }
            })

            if (response.data.status === 400) {
                navigate("../Planos");
            }
        };
        validarToken();
    }, [navigate])

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setShowHeader(false);
            } else {
                setShowHeader(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        if (props.userActive) {
            setOpen(newOpen);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        navigate("../");
    }

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem disablePadding onClick={() => navigate("../Dashboard")}>
                    <ListItemButton>
                        <ListItemIcon>
                            <HomeIcon sx={{ color: "black" }} />
                        </ListItemIcon>
                        <ListItemText primary={"Dashboard"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={() => navigate("../Dashboard/Faturas/Pendentes")}>
                    <ListItemButton>
                        <ListItemIcon>
                            <CreditCardIcon sx={{ color: "black" }} />
                        </ListItemIcon>
                        <ListItemText primary={"Minhas faturas"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("../Dashboard/Assinatura")}>
                        <ListItemIcon>
                            <DisplaySettingsIcon sx={{ color: "black" }} />
                        </ListItemIcon>
                        <ListItemText primary={"Gerenciar plano"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("../Dashboard/Perfil")}>
                        <ListItemIcon>
                            <PersonIcon sx={{ color: "black" }} />
                        </ListItemIcon>
                        <ListItemText primary={"Perfil"} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => window.open("https://vip.acessorias.com/contblack")}>
                        <ListItemIcon>
                            <AppRegistrationIcon sx={{ color: "orange" }} />
                        </ListItemIcon>
                        <ListItemText primary={"Acessar área VIP"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon sx={{ color: "red" }} />
                        </ListItemIcon>
                        <ListItemText primary={"Sair"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div style={{ width: "100%", backgroundColor: "#233344", height: "60px", display: "flex", justifyContent: "center", position: "fixed", top: showHeader ? "0" : "-60px", transition: "top 0.3s ease-in-out", zIndex: 1000, }} >
            <div style={{ width: "90%", display: "flex", alignItems: "center", padding: "0 20px" }}>
                <div style={{ width: "90%", display: "flex", alignItems: "center", justifyContent: "flex-start", color: "white" }}>
                    <div onClick={toggleDrawer(true)} style={{ display: "flex", cursor: "pointer", flexDirection: "column", gap: "4px", }} className="menu-toggle" >
                        <span style={{ width: "25px", height: "3px", backgroundColor: "white" }}></span>
                        <span style={{ width: "25px", height: "3px", backgroundColor: "white" }}></span>
                        <span style={{ width: "25px", height: "3px", backgroundColor: "white" }}></span>
                    </div>
                    {/* <div style={{ marginLeft: "16px", color: "#1EFF86" }}>
                        Contblack
                    </div> */}
                    <img src="/assets/Logo_Contblack_FundoEscuro.png" alt="Contblack Logo" style={{ height: "40px", marginLeft: "16px", cursor: "pointer" }} onClick={() => navigate("../Dashboard")} />
                </div>
                <div style={{ color: "white", width: "fit-content", minWidth: "100px" }}>
                    <Tooltip title="Ver perfil">
                        <IconButton sx={{ marginRight: "4px", "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" } }} aria-label="delete" onClick={() => navigate("../Dashboard/Perfil")}>
                            <PersonIcon sx={{ color: "white", fontSize: "27px", "&:hover": { color: "gray" } }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Ver notificações">
                        <IconButton sx={{ marginLeft: "4px", "&:hover": { color: "rgba(255, 255, 255, 0.1)" } }} aria-label="delete" onClick={() => props.setOpenModalNotificacao(true)}>
                            <Badge badgeContent={props.notificacoes} color="error">
                                <NotificationsIcon sx={{ color: "white", fontSize: "27px", "&:hover": { color: "gray" } }} />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}

export default HeaderDashboard;
