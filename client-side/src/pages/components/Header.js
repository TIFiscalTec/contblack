import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { gerarLinkWhatsApp } from "../../utils/WhatsappLink";


function Header(props) {
    const navigate = useNavigate();

    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

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

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <div
            style={{
                width: "100%",
                backgroundColor: showHeader ? "#233344" : "transparent",
                height: "80px",
                display: "flex",
                justifyContent: "center",
                position: "fixed",
                top: showHeader ? "0" : "10px",
                transition: "top 0.3s ease-in-out",
                zIndex: 1000,
            }}
        >
            <div
                className="header-container"
                style={{
                    backgroundColor: showHeader ? "transparent" : "#233344",
                    borderRadius: showHeader ? "0" : "40px",
                    paddingLeft: "40px",
                    paddingRight: "40px",
                    width: "60%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: "#fff",
                }}
            >
                {/* Logo */}
                <div
                    style={{
                        fontWeight: "bold",
                        fontSize: "18px",
                        cursor: "pointer",
                        color: "white"
                    }}
                    onClick={() => navigate("../")}
                >
                    <img src="/assets/Logo_Contblack_FundoEscuro.png" alt="Contblack Logo" style={{ height: "40px", marginTop: "5px" }} />
                </div>

                {/* Menu mobile toggle */}
                <div
                    onClick={toggleMenu}
                    style={{
                        display: "none",
                        cursor: "pointer",
                        flexDirection: "column",
                        gap: "4px",
                    }}
                    className="menu-toggle"
                >
                    <span style={{ width: "25px", height: "3px", backgroundColor: "#1EFF86" }}></span>
                    <span style={{ width: "25px", height: "3px", backgroundColor: "#1EFF86" }}></span>
                    <span style={{ width: "25px", height: "3px", backgroundColor: "#1EFF86" }}></span>
                </div>

                {/* Menu */}
                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        alignItems: "center",
                    }}
                    className={`menu-items ${menuOpen ? "open" : "closed"}`}
                >
                    <p className="menu-button" onClick={() => navigate("../SobreNos")}
                        style={{ color: "#fff"}}>SOBRE NÓS</p>
                    <p className="menu-button" onClick={() => navigate("../Planos")}
                        style={{ color: "#fff"}}>PLANOS</p>
                    <p className="menu-button" onClick={() => navigate("../Solucoes")}
                        style={{ color: "#fff"}}>SOLUÇÕES</p>
                    <p className="menu-button" onClick={() => navigate("../Nichos")}
                        style={{ color: "#fff"}}>NICHOS</p>
                    <a
                        href={gerarLinkWhatsApp("Olá, tenho uma dúvida sobre os planos!")}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", display: props.active === "dashboard" ? "none" : "flex" }}
                    >
                        <p className="menu-button" style={{ color: "#fff"}}>DÚVIDAS</p>
                    </a>
                    <p className="menu-button" onClick={() => navigate("../SobreNos")}
                        style={{ color:"#fff" }}>BLOG</p>
                </div>
            </div>

            {/* CSS inline para hover e responsivo */}
            <style>
                {`
                .menu-button {
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 12px;
                }
                .menu-button:hover {
                    color: #1EFF86 !important;
                    text-decoration: underline;
                    transform: scale(1.05);
                }

                @media (max-width: 768px) {
                    .header-container {
                    width: 90% !important;
                    }
                    .menu-toggle {
                    display: flex !important;
                    }
                    .menu-items {
                    flex-direction: column;
                    position: absolute;
                    top: 60px;
                    left: 0;
                    width: 100%;
                    background-color: #233344;
                    padding: 10px 0;
                    }
                    .menu-items.closed {
                    display: none !important;
                    }
                    .menu-items.open {
                    display: flex !important;
                    }
                    .menu-items p {
                    padding: 10px;
                    text-align: center;
                    }
                }
                `}
            </style>
        </div>
    );
}

export default Header;
