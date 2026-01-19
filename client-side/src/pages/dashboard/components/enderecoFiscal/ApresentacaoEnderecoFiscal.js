import React, { useState, useEffect } from "react";

import HeaderDashboard from "../../../components/HeaderDashboard";
import { Button, Divider } from "@mui/material";

import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useUser } from "../../../../contexts/UserContext";
import { useLogin } from "../../../../contexts/LoginContext";
import Loading from "../../../components/Loading";


const ApresentacaoEnderecoFiscal = () => {

    const navigate = useNavigate();

    const { user } = useUser();
    const { login, loading } = useLogin();

    const token = localStorage.getItem("token");
    const [userActive, setUserActive] = useState(true);
    const [openModalNotificacao, setOpenModalNotificacao] = useState(false);
    const [loadingContrato, setLoadingContrato] = useState(false);

    useEffect(() => {
        setLoadingContrato(true);
        let mounted = true;
        let interval;

        const getContrato = async () => {
            console.log("Fetching contrato for user:", login);
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/getContratoEnderecoFiscal`,
                    { idUsuario: login?.idUsuario },
                    { headers: { Authorization: `${localStorage.getItem("token")}` } }
                );
                console.log(response);
                if (!mounted) return;

                if (response.data.data?.status === "signed") {
                    clearInterval(interval); // para o polling
                    navigate("/Dashboard/ResidenciaFiscal");
                } else if (response.data.data?.status === "new" || response.data.data?.status === "link-opened") {
                    clearInterval(interval); // para o polling
                    navigate("/Dashboard/AssinarContratoEnderecoFiscal");
                } else {
                    setLoadingContrato(false);
                }
            } catch (err) {
                if (mounted) {
                    alert("Erro ao buscar contrato. Tente novamente.");
                }
            }
        };

        if (login) {
            getContrato(); // primeira chamada imediata
            interval = setInterval(getContrato, 5000); // repete a cada 5s
        }

        return () => {
            mounted = false;
            if (interval) clearInterval(interval);
        };
    }, [login, navigate]);

    const handleGerarContratoEnderecoFiscal = async () => {

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/gerarContratoZapSignEnderecoFiscal`, {
                email: user?.usuario?.Email
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            });

            console.log("Contrato de endereço fiscal gerado com sucesso:", response);
            navigate("../Dashboard/AssinarContratoEnderecoFiscal");

        } catch (error) {
            console.error("Erro ao gerar contrato de endereço fiscal:", error);
        }
    }

    return (
        <>
            <HeaderDashboard userActive={userActive} setOpenModalNotificacao={setOpenModalNotificacao} notificacoes={0} />

            <div style={{ marginTop: "60px", padding: "20px", minHeight: "100vh", background: "#f4f6f8" }}>
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <div style={{ width: "80%", display: "flex", justifyContent: "flex-end" }}>
                        <Button
                            variant="contained"
                            sx={{
                                padding: "5px 28px",
                                fontSize: "0.8rem",
                                backgroundColor: "#9C01B9",
                                borderRadius: "17px 0 17px 0",
                                color: "white",
                                fontWeight: 400,
                                transition: "0.3s ease",
                                '&:hover': {
                                    backgroundColor: "#1EFF86",
                                    boxShadow: "0 4px 10px #1EFF86",
                                    color: "black",
                                }
                            }}
                            onClick={handleGerarContratoEnderecoFiscal}
                        >
                            Quero um endereço fiscal para minha empresa
                        </Button>
                    </div>
                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "40px" }}>
                    <div style={{ width: "80%", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
                        <div style={{ width: window.innerWidth > 600 ? "45%" : "100%" }}>
                            <h2 style={{ color: "#9C01B9" }}>1. Endereço Fiscal?</h2>
                            <p style={{ textAlign: "justify" }}>É o endereço oficialmente utilizado para fins legais, tributários e cadastrais, onde sua empresa ou atividade é registrada perante órgãos públicos e instituições financeiras.</p>
                        </div>
                        <Divider orientation="vertical" flexItem />
                        <div style={{ width: window.innerWidth > 600 ? "45%" : "100%" }}>
                            <h2 style={{ color: "#9C01B9" }}>2. Por que devo ter?</h2>
                            <p style={{ textAlign: "justify" }}>Em conclusão, essa solução facilita o cumprimento das obrigações fiscais e legais de maneira regular e adequada, sem expor o endereço pessoal. Ao mesmo tempo, contribui para uma imagem mais profissional e organizada, fortalecendo a credibilidade e a segurança jurídica perante clientes, bancos e parceiros.</p>
                        </div>
                    </div>
                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "40px" }}>
                    <div style={{ width: "80%" }}>
                        <div style={{ width: "100%" }}>
                            <Divider sx={{ marginBottom: "20px" }} />
                            <h2 style={{ color: "#9C01B9" }}>3. Conclusão</h2>
                            <p style={{ textAlign: "justify" }}>O endereço fiscal é o local onde uma empresa está registrada oficialmente. Ele é utilizado para fins legais e administrativos, como o recebimento de correspondências oficiais, notificações fiscais e outros documentos importantes relacionados à empresa. Ter um endereço fiscal é obrigatório para a maioria das empresas, pois é necessário para o registro junto aos órgãos governamentais e para a emissão de notas fiscais.</p>
                        </div>
                    </div>
                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "40px" }}>
                    <div style={{ width: "80%" }}>
                        <div style={{ width: "100%" }}>
                            <Divider sx={{ marginBottom: "20px" }} />
                            <h2 style={{ color: "#6c0080" }}>Quero um endereço fiscal, o que fazer?</h2>
                            <p style={{ textAlign: "justify" }}>
                                Caso você ainda não tenha uma empresa aberta, o processo é simples: basta clicar no botão
                                “Quero um endereço fiscal para minha empresa” acima e seguir as instruções apresentadas.
                            </p>
                            {/* <p style={{ textAlign: "justify" }}>
                                Já para quem possui uma empresa aberta, é importante saber que será necessária uma alteração
                                no contrato social para a inclusão do novo endereço fiscal, o que pode gerar um custo adicional.
                                Mas se mesmo assim você tiver interesse, clique no botão acima e siga as instruções.
                            </p> */}

                        </div>
                    </div>
                </div>
            </div>
            <Loading open={loadingContrato} />
        </>
    );
}

export default ApresentacaoEnderecoFiscal;