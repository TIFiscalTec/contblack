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
import AddIcon from '@mui/icons-material/Add';
import { Search } from "@mui/icons-material";
import HeaderDashboard from "../../components/HeaderDashboard";
import { useUser } from "../../../contexts/UserContext";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import ModalNotificacao from "./ModalNotificacao";
import axios from "axios";
// import ModalAdicionarServico from "./ModalAdicionarServico";
// import ModalEditarServico from "./ModalEditarServico";
// import ModalExcluirServico from "./ModalExcluirServico";


const Servicos = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    const [busca, setBusca] = useState("");
    const [userActive, setUserActive] = useState(true);
    const [openModalNotificacao, setOpenModalNotificacao] = useState(false);
    const [notificacoes, setNotificacoes] = useState([]);
    const [openModalAdicionarServico, setOpenModalAdicionarServico] = useState(false);
    const [openModalEditarServico, setOpenModalEditarServico] = useState(false);
    const [openModalExcluirServico, setOpenModalExcluirServico] = useState(false);
    const [servicos, setServicos] = useState([])
    const [idServico, setIdServico] = useState(null);

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
        const getServicos = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/listarServicos`, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                }
            });
            console.log(response.data.servicos);
            if (response.data.status === 200) {
                setServicos(response.data.servicos);
            }
        }

        getServicos();

    }, [openModalAdicionarServico, openModalEditarServico, openModalExcluirServico])

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
                            Meus Serviços
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
                                                <TableCell><strong>Código</strong></TableCell>
                                                <TableCell><strong>Discriminação</strong></TableCell>
                                                <TableCell><strong>CNAE</strong></TableCell>
                                                <TableCell align="center" sx={{width: 10}}><strong>Ação</strong></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {servicos.length > 0 ? (
                                                servicos.map((servico) => (
                                                    <TableRow key={servico.idServico}>
                                                        <TableCell>{servico.idServico}</TableCell>
                                                        <TableCell>{servico.codigo}</TableCell>
                                                        <TableCell> {servico.discriminacao}</TableCell>
                                                        <TableCell>{servico.cnae}</TableCell>

                                                        <TableCell align="center">
                                                            <div display="flex" flexDirection="column" alignItems="center" gap={1}>
                                                                <Button
                                                                    fullWidth
                                                                    variant="contained"
                                                                    size="small"
                                                                    sx={{
                                                                        maxWidth: 120,
                                                                        backgroundColor: "#1976d2",
                                                                        color: "#fff",
                                                                        textTransform: "none",
                                                                        '&:hover': { backgroundColor: "#1565c0" },
                                                                        borderRadius: "6px",
                                                                    }}
                                                                    onClick={() => {
                                                                        setIdServico(servico.idServico);
                                                                        setOpenModalEditarServico(true);
                                                                    }}
                                                                >
                                                                    Editar
                                                                </Button>

                                                                <Button
                                                                    fullWidth
                                                                    variant="contained"
                                                                    size="small"
                                                                    sx={{
                                                                        maxWidth: 120,
                                                                        backgroundColor: "#d32f2f",
                                                                        color: "#fff",
                                                                        textTransform: "none",
                                                                        '&:hover': { backgroundColor: "#c62828" },
                                                                        borderRadius: "6px",
                                                                        marginTop: "6px"
                                                                    }}
                                                                    onClick={() => {
                                                                        setIdServico(servico.idServico);
                                                                        setOpenModalExcluirServico(true);
                                                                    }}
                                                                >
                                                                    Excluir
                                                                </Button>
                                                            </div>
                                                        </TableCell>


                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={9} align="center">
                                                        Nenhum serviço encontrado.
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
            {/* <ModalNotificacao
                openModalNotificacao={openModalNotificacao}
                onClose={() => setOpenModalNotificacao(false)}
                notificacoes={notificacoes}
            />
            <ModalAdicionarServico
                openModalAdicionarServico={openModalAdicionarServico}
                setOpenModalAdicionarServico={setOpenModalAdicionarServico}
            />
            <ModalEditarServico
                openModalEditarServico={openModalEditarServico}
                setOpenModalEditarServico={setOpenModalEditarServico}
                idServico={idServico}
            />
            <ModalExcluirServico
                openModalExcluirServico={openModalExcluirServico}
                setOpenModalExcluirServico={setOpenModalExcluirServico}
                idServico={idServico}
            /> */}
        </>
    );
};

export default Servicos;
