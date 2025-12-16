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
                                    {chave === "Líquido" && (
                                        <ArrowForwardIcon sx={{ color: "#1EFF86", fontSize: 18 }} />
                                    )}
                                </Box>
                            </TableCell>
                            <TableCell
                                align="right"
                                sx={{
                                    color: "white",
                                    fontWeight: chave === "Líquido" ? "bold" : "normal",
                                }}
                            >
                                {chave === "Carga Tributária" ? `${FormatToBrl(valor)}%` : chave === "IRRF" ? FormatToBrl(0) : FormatToBrl(valor)}
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
        CLT: {
            Salário: "10.000,00",
            INSS: "951,63",
            IRRF: "1.656,85",
            "Total Imposto": "2.608,48",
            Líquido: "7.391,52",
        },
        Autônomo: {
            Rendimento: "10.000,00",
            INSS: "951,63",
            IRPF: "1.579,57",
            "ISS (5%)": "500,00",
            "Total Imposto": "3.031,20",
            Líquido: "6.968,80",
            "Carga Tributária": "30,31%",
        },
        "PJ SN": {
            Receita: "10.000,00",
            INSS: "308,00",
            IRRF: "-",
            DAS: "600,00",
            "Total Imposto": "908,00",
            Líquido: "9.092,00",
            "Carga Tributária": "9,08%",
        },
    });

    const handleValueChange = (e) => {
        setValor(e.target.value);
    };

    const handleCalc = () => {
        if (!valor) return;

        const salario = Number(
            valor.replace(/\./g, "").replace(",", ".")
        );

        if (isNaN(salario) || salario <= 0) return;

        const TETO_INSS = 7786.02;

        let inssClt = 0;
        let irrfClt = 0;

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

        // ===== IRRF CLT =====
        const baseIrrfClt = salario - inssClt - 528;

        if (baseIrrfClt <= 2428.80) {
            irrfClt = 0;
        } else if (baseIrrfClt <= 2826.65) {
            irrfClt = baseIrrfClt * 0.075 - 182.16;
        } else if (baseIrrfClt <= 3751.05) {
            irrfClt = baseIrrfClt * 0.15 - 394.16;
        } else if (baseIrrfClt <= 4664.68) {
            irrfClt = baseIrrfClt * 0.225 - 675.49;
        } else {
            irrfClt = baseIrrfClt * 0.275 - 908.73;
        }

        irrfClt = Math.max(0, Number(irrfClt.toFixed(2)));

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
        const aliquotaSimples = 0.06;
        const proLabore = 1518;

        const impostoSimples = salario * aliquotaSimples;

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
        const totalClt = inssClt + irrfClt;
        const liquidoClt = salario - totalClt;

        const totalAut = inssAut + irpfAut + issAut;
        const liquidoAut = salario - totalAut;

        const proLaboreLiquido =
            proLabore - inssProLabore - irpfProLabore;

        const lucroDistribuido =
            salario - impostoSimples - proLabore;

        const liquidoPj =
            proLaboreLiquido + lucroDistribuido;

        const totalImpostoPj =
            impostoSimples + inssProLabore + irpfProLabore;

        setSimulacao((prev) => ({
            ...prev,
            CLT: {
                Salário: salario,
                INSS: inssClt,
                IRRF: irrfClt,
                "Total Imposto": totalClt,
                Líquido: liquidoClt,
                "Carga Tributária": Number(((totalClt / salario) * 100).toFixed(2)),
            },
            Autônomo: {
                Rendimento: salario,
                INSS: inssAut,
                IRPF: irpfAut,
                "ISS (5%)": issAut,
                "Total Imposto": totalAut,
                Líquido: liquidoAut,
                "Carga Tributária": Number(((totalAut / salario) * 100).toFixed(2)),
            },
            "PJ SN": {
                Receita: salario,
                DAS: Number(impostoSimples.toFixed(2)),
                "Pró-labore": proLabore,
                "INSS Pró-labore": inssProLabore,
                "IRPF Pró-labore": irpfProLabore,
                "Lucro Distribuído": Number(lucroDistribuido.toFixed(2)),
                "Total Imposto": Number(totalImpostoPj.toFixed(2)),
                Líquido: Number(liquidoPj.toFixed(2)),
                "Carga Tributária": Number(((totalImpostoPj / salario) * 100).toFixed(2)),
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
                        placeholder="Informe o valor"
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
        </Box>
    );
}
