import React, { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Grid,
    Box,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { FormatToBrl } from "../../utils/FormatToBrl";
import FormatarValor from "../../utils/FormatarValor";


const Tabela = ({ titulo, dados, color }) => (
    <Card
        sx={{
            borderRadius: 3,
            boxShadow: 4,
            background: `linear-gradient(145deg, ${color}, #0b243d)`,
            color: "white",
            height: "370px"
        }}
    >
        <CardContent>
            <Typography
                variant="h6"
                align="center"
                gutterBottom
                sx={{ fontWeight: "bold" }}
            >
                {titulo}
            </Typography>
            <Table size="small">
                <TableBody>
                    {Object.entries(dados).map(([chave, valor]) => (
                        <TableRow key={chave}>
                            <TableCell
                                sx={{
                                    color: "white",
                                    fontWeight: chave === "Líquido" ? "bold" : 600,
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    {chave}
                                    {chave === "Líquido" && (<ArrowForwardIcon sx={{ color: "#1EFF86", fontSize: 18 }} />)}
                                </Box>
                            </TableCell>
                            <TableCell
                                align="right"
                                sx={{
                                    color: chave === "Total Imposto" || chave === "DAS/mês" || chave === "Imposto anual" ? "#ff2222ff" : chave === "Líquido" || chave === "Ganho/mês" || chave === "Ganho/ano" ? "#1EFF86" : "white",
                                    fontWeight: chave === "Líquido" || chave === "Total Imposto" || chave === "Imposto anual" || chave === "DAS/mês" ? "bold" : "normal",
                                }}
                            >
                                {chave === "Carga Tributária" ? `${String(valor).replace(".", ",")}%` : chave === "IRPF" && Number(valor) === 0 ? FormatToBrl(0) : FormatToBrl(valor)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);

export default function SimulacaoImpostos() {
    const colors = ["#233344", "#233344", "#233344"];

    const [valor, setValor] = useState("");

    const [simulacao, setSimulacao] = useState({
        "CLT": {
            Salário: 10000,
            INSS: 951.63,
            IRPF: 1656.85,
            "Total Imposto": 2608.48,
            Líquido: 7391.52,
            "Imposto anual": 31301.76,
        },
        "PF": {
            Rendimento: 10000,
            INSS: 951.63,
            IRPF: 1579.57,
            "ISS (5%)": 500,
            "Total Imposto": 3031.20,
            Líquido: 6968.80,
            "Carga Tributária": 30.31,
            "Imposto anual": 36374.40,
        },
        "PJ": {
            Receita: 120000,
            DAS: 7200,
            // "Pró-labore": 1518,
            // "INSS Pró-labore": 166.98,
            // "IRPF Pró-labore": 0,
            // "Lucro Distribuído": 7882,
            "Total Imposto": 7200,
            Líquido: 112633,
            "Carga Tributária": 6,
            "DAS/mês": 600,
            "Imposto anual": 7200,
        },
    });

    const handleValueChange = (e) => {
        const valorFormatado = FormatarValor(e.target.value)
        setValor(valorFormatado);
    };

    const handleCalc = () => {
        if (!valor) return;

        const salario = Number(
            valor.replace(/\./g, "").replace(",", ".")
        );

        if (isNaN(salario) || salario <= 0) return;

        const TETO_INSS = 7786.02;

        let inssClt = 0;
        let IRPFClt = 0;

        // ===== AUTÔNOMO =====
        const baseInssAut = Math.min(salario, TETO_INSS);
        let inssAut = baseInssAut * 0.20;
        let issAut = salario * 0.05;
        let irpfAut = 0;

        // ===== INSS CLT (com teto) =====
        const baseInssClt = Math.min(salario, TETO_INSS);

        if (baseInssClt <= 1518) {
            inssClt = baseInssClt * 0.075;
        } else if (baseInssClt <= 2793.88) {
            inssClt = baseInssClt * 0.09 - 22.77;
        } else if (baseInssClt <= 4190.83) {
            inssClt = baseInssClt * 0.12 - 106.59;
        } else {
            inssClt = baseInssClt * 0.14 - 190.40;
        }

        inssClt = Number(inssClt.toFixed(2));
        inssAut = Number(inssAut.toFixed(2));
        issAut = Number(issAut.toFixed(2));

        // ===== IRPF CLT =====
        const baseIRPFClt = salario - inssClt - 528;

        if (baseIRPFClt <= 2428.80) {
            IRPFClt = 0;
        } else if (baseIRPFClt <= 2826.65) {
            IRPFClt = baseIRPFClt * 0.075 - 182.16;
        } else if (baseIRPFClt <= 3751.05) {
            IRPFClt = baseIRPFClt * 0.15 - 394.16;
        } else if (baseIRPFClt <= 4664.68) {
            IRPFClt = baseIRPFClt * 0.225 - 675.49;
        } else {
            IRPFClt = baseIRPFClt * 0.275 - 908.73;
        }

        Math.max(0, Number(IRPFClt.toFixed(2)))

        // ===== IRPF AUTÔNOMO =====
        const baseIrpfAut = salario - inssAut - 528;

        if (baseIrpfAut <= 2428.80) {
            irpfAut = 0;
        } else if (baseIrpfAut <= 2826.65) {
            irpfAut = baseIrpfAut * 0.075 - 182.16;
        } else if (baseIrpfAut <= 3751.05) {
            irpfAut = baseIrpfAut * 0.15 - 394.16;
        } else if (baseIrpfAut <= 4664.68) {
            irpfAut = baseIrpfAut * 0.225 - 675.49;
        } else {
            irpfAut = baseIrpfAut * 0.275 - 908.73;
        }

        irpfAut = Math.max(0, Number(irpfAut.toFixed(2)));

        // ===== PJ SIMPLES =====
        const proLabore = 1518;
        let impostoSimples = 0;

        let receita = salario * 12;
        let aliPj = 0;

        if (receita <= 180000) {
            impostoSimples = (receita * 0.06);
            aliPj = 6;
        } else if (receita <= 360000) {
            impostoSimples = (receita * 0.112) - 9360;
            aliPj = 11.2;
        } else if (receita <= 720000) {
            impostoSimples = (receita * 0.135) - 17640;
            aliPj = 13.5;
        } else if (receita <= 1800000) {
            impostoSimples = (receita * 0.16) - 35640;
            aliPj = 16;
        } else if (receita <= 3600000) {
            impostoSimples = (receita * 0.21) - 125640;
            aliPj = 21;
        } else {
            impostoSimples = (receita * 0.33) - 648000;
            aliPj = 33;
        }

        impostoSimples = receita * (aliPj / 100);


        // INSS pró-labore com teto
        const baseInssProLabore = Math.min(proLabore, TETO_INSS);
        const inssProLabore = Number((baseInssProLabore * 0.11).toFixed(2));

        const baseIrpfProLabore =
            proLabore - inssProLabore - 528;

        let irpfProLabore = 0;

        if (baseIrpfProLabore > 2428.80) {
            irpfProLabore = baseIrpfProLabore * 0.075 - 182.16;
        }

        irpfProLabore = Math.max(0, Number(irpfProLabore.toFixed(2)));

        // ===== TOTAIS =====
        const totalClt = inssClt + IRPFClt;
        const liquidoClt = salario - totalClt;

        const totalAut = inssAut + irpfAut + issAut;
        const liquidoAut = salario - totalAut;

        const proLaboreLiquido =
            proLabore - inssProLabore - irpfProLabore;

        const lucroDistribuido = receita - impostoSimples - proLabore;

        const liquidoPj = proLaboreLiquido + lucroDistribuido;

        const totalImpostoPj = impostoSimples;

        setSimulacao((prev) => ({
            ...prev,
            "CLT": {
                Salário: salario,
                INSS: inssClt,
                IRPF: IRPFClt,
                "Total Imposto": totalClt,
                Líquido: liquidoClt,
                "Carga Tributária": Number(((totalClt / salario) * 100).toFixed(2)),
                "Imposto anual": Number((totalClt * 12).toFixed(2)),
            },
            "PF": {
                Rendimento: salario,
                INSS: inssAut,
                IRPF: irpfAut,
                "ISS (5%)": issAut,
                "Total Imposto": totalAut,
                Líquido: liquidoAut,
                "Carga Tributária": Number(((totalAut / salario) * 100).toFixed(2)),
                "Imposto anual": Number((totalAut * 12).toFixed(2)),
            },
            "PJ": {
                Receita: receita,
                DAS: Number(impostoSimples.toFixed(2)),
                // "IRPF Pró-labore": irpfProLabore,
                // "Lucro Distribuído": Number(lucroDistribuido.toFixed(2)),
                "Total Imposto": Number(totalImpostoPj.toFixed(2)),
                Líquido: Number(liquidoPj.toFixed(2)),
                "Carga Tributária": aliPj,
                "DAS/mês": Number((impostoSimples / 12).toFixed(2)),
                "Imposto anual": Number((totalImpostoPj).toFixed(2)),
            },
        }));
    };


    return (
        <Box sx={{ p: 4 }}>
            <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{ fontWeight: "bold", mb: 4 }}
            >
                Simulação de Impostos - CLT x Autônomo x PJ
            </Typography>

            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "12px",
                    flexWrap: "wrap",
                    marginBottom: "32px",
                    padding: "24px 16px",
                }}
            >
                <FormControl fullWidth sx={{ maxWidth: "420px", flex: "1 1 300px" }} variant="outlined" >
                    <InputLabel htmlFor="outlined-adornment-amount">Valor</InputLabel>
                    <OutlinedInput
                        autoComplete="off"
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                        label="Valor"
                        placeholder="Informe o valor mensal"
                        value={valor}
                        onChange={handleValueChange}
                        sx={{ fontWeight: 600 }}
                    />
                </FormControl>

                <Button
                    variant="contained"
                    sx={{
                        height: "56px",
                        minWidth: { xs: "100%", sm: "160px" },
                        backgroundColor: "#9C01B9",
                        borderRadius: "16px 0 16px 0",
                        fontSize: "0.75rem",
                        color: "white",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        transition: "0.3s ease",
                        whiteSpace: "nowrap",
                        '&:hover': {
                            backgroundColor: "#1EFF86",
                            color: "#000",
                            boxShadow: "0 6px 14px rgba(30, 255, 134, 0.6)",
                        },
                    }}
                    onClick={handleCalc}
                >
                    Simular agora
                </Button>
            </div>

            <Grid container spacing={3} justifyContent="center" alignItems="flex-start">
                {Object.entries(simulacao).map(([titulo, dados], idx) => (
                    <Grid key={titulo}>
                        <Tabela titulo={titulo} dados={dados} color={colors[idx]} />
                    </Grid>
                ))}
            </Grid>
            <div style={{ width: "100%", textAlign: "center", marginTop: "24px", fontSize: "0.775rem", color: "#666" }}>
                <p>Os valores apresentados acima são estimativas e podem variar conforme regras fiscais, enquadramento tributário, deduções e particularidades de cada caso.</p>
            </div>
        </Box>
    );
}
