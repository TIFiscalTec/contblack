import React from "react";
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

const simulacao = {
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
};

const Tabela = ({ titulo, dados, color }) => (
    <Card
        sx={{
            borderRadius: 3,
            boxShadow: 4,
            background: `linear-gradient(145deg, ${color}, #0b243d)`,
            color: "white",
            height: "300px"
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
                                {valor}
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
