import React, { useState, useEffect } from "react";
import {
    Typography,
    Card,
    CardContent,
    Grid,
    Button,
    TextField,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";
import { Search } from "@mui/icons-material";
import HeaderDashboard from "../../components/HeaderDashboard";
import { useUser } from "../../../contexts/UserContext";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Tooltip from '@mui/material/Tooltip';
import { Form, useNavigate } from "react-router-dom";
import ModalNotificacao from "./ModalNotificacao";
import axios from "axios";
import FormatDateHour from "../../../utils/FormatDateHour";
import CancelIcon from '@mui/icons-material/Cancel';
import { MascaraValor } from "../../../utils/MascaraValor";
import Loading from "../../components/Loading";


const NotasFiscaisEmitidas = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    const [busca, setBusca] = useState("");
    const [userActive, setUserActive] = useState(true);
    const [openModalNotificacao, setOpenModalNotificacao] = useState(false);
    const [notificacoes, setNotificacoes] = useState([]);
    const [openModalAdicionarServico, setOpenModalAdicionarServico] = useState(false);
    const [openModalEditarServico, setOpenModalEditarServico] = useState(false);
    const [openModalExcluirServico, setOpenModalExcluirServico] = useState(false);
    const [notasFiscais, setNotasFiscais] = useState([])
    const [idServico, setIdServico] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // Verifica se o usuário está com servico vencida
        const hasservicosVencidas = user?.servicos?.vencidas?.length > 0;

        if (hasservicosVencidas) {
            setUserActive(false);
        } else {
            setUserActive(true);
        }
    }, [user]);

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

    useEffect(() => {
        const getNotasFiscais = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/listarNotasFiscaisEmitidas`, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                }
            });
            console.log(response.data.notasFiscais);
            if (response.data.status === 200) {
                setNotasFiscais(response.data.notasFiscais);
            }
        }

        getNotasFiscais();

    }, [openModalAdicionarServico, openModalEditarServico, openModalExcluirServico])


    const handleCancelNota = async (idIntegracao) => {
        try {
            setOpen(true);
            await axios.post(`${process.env.REACT_APP_API_URL}/cancelarNotaFiscal`, { idIntegracao }, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                }
            });
            alert("Nota fiscal cancelada com sucesso.");
        } catch (error) {
            alert("Erro ao cancelar a nota fiscal. Por favor, tente novamente mais tarde.");
            console.error("Erro ao cancelar nota fiscal:", error);
        } finally {
            // Atualiza a lista de notas fiscais após o cancelamento
            setOpen(false);
        }
    }

    return (
        <>
            <HeaderDashboard userActive={userActive} setOpenModalNotificacao={setOpenModalNotificacao} notificacoes={notificacoes.length} />
            <div style={{ padding: "30px", background: "#f4f6f8", minHeight: "100vh", marginTop: "64px" }}>
                <div style={{ width: "100%", height: "fit-content", padding: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ width: "80%", height: "fit-content" }}>
                        <IconButton onClick={() => navigate(-1)}>
                            <ArrowBackIcon sx={{ fontSize: "40px", color: "black" }} />
                        </IconButton>
                    </div>
                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <div style={{
                        width: "80%",
                        border: "1px solid #eee",
                        borderRadius: "8px",
                        padding: "20px",
                        background: "#fff",
                        minWidth: "400px"
                    }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
                            Notas Fiscais Emitidas
                        </Typography>

                        {/* Filtros */}
                        <div style={{ justifyContent: "space-between", display: "flex", padding: "16px", width: "100%", backgroundColor: "#f9f9f9", borderRadius: "8px", marginBottom: "20px" }}>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    label="Buscar serviço"
                                    size="small"
                                    value={busca}
                                    onChange={(e) => setBusca(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Search />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            {/* <Grid item>
                                <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setOpenModalAdicionarServico(true)}>
                                    Adicionar serviço
                                </Button>
                            </Grid> */}
                        </div>
                                
                        {/* Tabela */}
                        <Card sx={{ borderRadius: "16px" }}>
                            <CardContent>
                                <TableContainer component={Paper} sx={{ borderRadius: "12px" }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell><strong>ID</strong></TableCell>
                                                <TableCell><strong>Número Nfse</strong></TableCell>
                                                <TableCell><strong>Data Emissão</strong></TableCell>
                                                <TableCell><strong>Valor</strong></TableCell>
                                                <TableCell><strong>Status</strong></TableCell>
                                                <TableCell align="center"><strong>Ação</strong></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {notasFiscais.length > 0 ? (
                                                notasFiscais.map((nota, index) => (
                                                    <TableRow key={nota.idNota}>
                                                        <TableCell>{nota.idNota}</TableCell>
                                                        <TableCell>{nota.numeroNota || "---"}</TableCell>
                                                        <TableCell>{FormatDateHour(nota.dataEmissao)}</TableCell>
                                                        <TableCell> {MascaraValor(nota.valor)}</TableCell>
                                                        <TableCell sx={{ fontWeight: 'bold', color: nota.status === 'CONCLUIDO' ? 'green' : nota.status === 'PENDENTE' ? 'orange' : 'red' }}>{nota.status}</TableCell>
                                                        <TableCell align="center">
                                                            <div display="flex" alignItems="center" justifyContent="center">
                                                                <Tooltip title="Download PDF">
                                                                    <IconButton
                                                                    disabled={nota.caminhoPDF ? false : true}
                                                                        sx={{ color: '#4caf50' }}
                                                                        onClick={() => {
                                                                            const apiBase = process.env.REACT_APP_API_URL;
                                                                            const url = `${apiBase}/download${nota.caminhoPDF}`;
                                                                            window.open(url, '_blank');
                                                                        }}

                                                                    >
                                                                        <CloudDownloadIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Cancelar Nota Fiscal">
                                                                    <IconButton
                                                                        disabled={nota.status === 'PENDENTE' || nota.status === 'CANCELADO' || nota.status === 'Pedido de Cancelamento' || nota.status === 'REJEITADO' ? true : false}
                                                                        sx={{ color: '#f44336' }}
                                                                        onClick={() => {
                                                                            handleCancelNota(nota.idIntegracao);
                                                                        }}

                                                                    >
                                                                        <CancelIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={9} align="center">
                                                        Nenhuma nota fiscal encontrada.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <ModalNotificacao
                openModalNotificacao={openModalNotificacao}
                onClose={() => setOpenModalNotificacao(false)}
                notificacoes={notificacoes}
            />
            <Loading open={open} />
        </>
    );
};

export default NotasFiscaisEmitidas;
