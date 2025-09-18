import React, { useState, useMemo, useEffect } from "react";
import {
	Typography,
	Card,
	CardContent,
	Grid,
	Button,
	TextField,
	MenuItem,
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ModalNotificacao from "./ModalNotificacao";

const statusMap = {
	PENDING: { label: "Pendente", colorBg: "#fff8e1", colorText: "#f9a825" },
	RECEIVED: { label: "Pago", colorBg: "#e8f5e9", colorText: "#2e7d32" },
	RECEIVED_IN_CASH: { label: "Pago", colorBg: "#e8f5e9", colorText: "#2e7d32" },
	CONFIRMED: { label: "Pago", colorBg: "#e8f5e9", colorText: "#2e7d32" },
	OVERDUE: { label: "Vencida", colorBg: "#ffebee", colorText: "#c62828" },
	DUNNING_REQUESTED: { label: "Vencida", colorBg: "#ffebee", colorText: "#c62828" },
	DUNNING_RECEIVED: { label: "Vencida", colorBg: "#ffebee", colorText: "#c62828" },
	REFUNDED: { label: "Reembolsada", colorBg: "#e1f5fe", colorText: "#0277bd" },
	REFUND_REQUESTED: { label: "Reembolso solicitado", colorBg: "#e1f5fe", colorText: "#0277bd" },
	REFUND_IN_PROGRESS: { label: "Reembolso em progresso", colorBg: "#e1f5fe", colorText: "#0277bd" },
	CHARGEBACK_REQUESTED: { label: "Chargeback", colorBg: "#fce4ec", colorText: "#c2185b" },
	CHARGEBACK_DISPUTE: { label: "Chargeback", colorBg: "#fce4ec", colorText: "#c2185b" },
	AWAITING_CHARGEBACK_REVERSAL: { label: "Chargeback", colorBg: "#fce4ec", colorText: "#c2185b" },
	AWAITING_RISK_ANALYSIS: { label: "Análise de risco", colorBg: "#fff3e0", colorText: "#ef6c00" },
	// Outros status podem ser adicionados aqui conforme necessário
};

const statusOptions = [
	{ value: "todos", label: "Todos" },
	{ value: "Pendente", label: "Pendentes" },
	{ value: "Pago", label: "Pagas" },
	{ value: "Vencida", label: "Vencidas" },
	{ value: "Reembolsada", label: "Reembolsadas" },
	{ value: "Chargeback", label: "Chargebacks" },
	{ value: "Análise de risco", label: "Análise de risco" },
];

const FaturasPendentes = () => {
	const { user } = useUser();
	console.log(user)
	const navigate = useNavigate();

	const [busca, setBusca] = useState("");
	const [statusFiltro, setStatusFiltro] = useState("todos");
	const [faturas, setFaturas] = useState([]);
	const [userActive, setUserActive] = useState(true);
	const [openModalNotificacao, setOpenModalNotificacao] = useState(false);
	const [notificacoes, setNotificacoes] = useState([]);

	useEffect(() => {
		// Verifica se o usuário está com fatura vencida
		const hasFaturasVencidas = user?.faturas?.vencidas?.length > 0;

		if (hasFaturasVencidas) {
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


	function formatarDataBR(dataISO) {
		if (!dataISO) return "";
		const [ano, mes, dia] = dataISO.split("-");
		return `${dia}/${mes}/${ano}`;
	}

	useEffect(() => {
		if (!user || !user.faturas) return;

		// Supondo que user.faturas seja um objeto com arrays agrupados ou um array com todas faturas
		// Se for um array só com todas faturas, descomente a próxima linha e comente as outras:
		// const todasFaturas = user.faturas;

		// Exemplo: se você armazenar agrupado, combine arrays:
		const todasFaturas = [
			...(user.faturas.pendentes || []),
			...(user.faturas.vencidas || []),
		];

		const faturasFormatadas = todasFaturas.map((fatura, index) => {
			const statusInfo = statusMap[fatura.status] || { label: fatura.status, colorBg: "#eee", colorText: "#333" };

			return {
				id: index + 1,
				numero: fatura.nossoNumero || `FAT-${index + 1}`,
				vencimento: formatarDataBR(fatura.dueDate) || "—",
				valor: fatura.value || 0,
				status: statusInfo.label,
				bankSlipUrl: fatura.bankSlipUrl || "#",
				colorBg: statusInfo.colorBg,
				colorText: statusInfo.colorText,
				billingType: fatura.billingType || "—",
			};
		});

		setFaturas(faturasFormatadas);
	}, [user]);

	const linhasFiltradas = useMemo(() => {
		return faturas
			.filter(f => statusFiltro === "todos" || f.status === statusFiltro)
			.filter(f => f.numero?.toLowerCase().includes(busca.toLowerCase()));
	}, [faturas, statusFiltro, busca]);



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
						width: "60%",
						border: "1px solid #eee",
						borderRadius: "8px",
						padding: "20px",
						background: "#fff",
						minWidth: "400px"
					}}>
						<Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
							Faturas
						</Typography>

						{/* Filtros */}
						<Card sx={{ borderRadius: "16px", mb: 3 }}>
							<CardContent>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={6} md={4}>
										<TextField
											fullWidth
											label="Buscar por Nº da Fatura"
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
									<Grid item xs={12} sm={6} md={4}>
										<TextField
											select
											fullWidth
											label="Filtrar por Status"
											size="small"
											value={statusFiltro}
											onChange={(e) => setStatusFiltro(e.target.value)}
										>
											{statusOptions.map(opt => (
												<MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
											))}
										</TextField>
									</Grid>
								</Grid>
							</CardContent>
						</Card>

						{/* Tabela */}
						<Card sx={{ borderRadius: "16px" }}>
							<CardContent>
								<TableContainer component={Paper} sx={{ borderRadius: "12px" }}>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell><strong>ID</strong></TableCell>
												<TableCell><strong>Nº Fatura</strong></TableCell>
												<TableCell><strong>Vencimento</strong></TableCell>
												<TableCell><strong>Valor</strong></TableCell>
												<TableCell><strong>Status</strong></TableCell>
												<TableCell align="center"><strong>Ação</strong></TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{linhasFiltradas.length > 0 ? (
												linhasFiltradas.map((fatura) => (
													<TableRow key={fatura.id}>
														<TableCell>{fatura.id}</TableCell>
														<TableCell>{fatura.numero}</TableCell>
														<TableCell>{fatura.vencimento}</TableCell>
														<TableCell>
															R$ {Number(fatura.valor).toFixed(2).replace(".", ",")}
														</TableCell>
														<TableCell>
															<span
																style={{
																	padding: "4px 10px",
																	borderRadius: "12px",
																	backgroundColor: fatura.colorBg,
																	color: fatura.colorText,
																	fontWeight: 600,
																	fontSize: "0.8rem"
																}}
															>
																{fatura.status.toUpperCase()}
															</span>
														</TableCell>
														<TableCell align="center">
															<Button
																variant="contained"
																size="small"
																sx={{
																	backgroundColor: "#d32f2f",
																	display: fatura?.billingType === "CREDIT_CARD" ? "none" : "inline-flex",
																	color: "#fff",
																	textTransform: "none",
																	'&:hover': { backgroundColor: "#b71c1c" }
																}}
																onClick={() => window.open(fatura.bankSlipUrl, "_blank")}
																disabled={["Pago", "Reembolsada", "Reembolso solicitado", "Reembolso em progresso", "Chargeback", "Chargeback", "Chargeback", "Análise de risco"].includes(fatura.status)}
															>
																pagar
															</Button>
														</TableCell>
													</TableRow>
												))
											) : (
												<TableRow>
													<TableCell colSpan={6} align="center">
														Nenhuma fatura encontrada.
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
		</>
	);
};

export default FaturasPendentes;
