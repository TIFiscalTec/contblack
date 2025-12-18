export default function FormatarValor(valor) {
    const numero = valor.replace(/\D/g, "");

    const numeroFloat = Number(numero) / 100;

    return numeroFloat.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}
