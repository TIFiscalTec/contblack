export function MascaraValor(value) {
    if (!value) return "";

    // remove tudo que não é número
    value = value.replace(/\D/g, "");

    // se não houver nada, retorna vazio
    if (value === "") return "";

    // transforma em número e divide por 100 para ter os centavos
    value = (parseInt(value, 10) / 100).toFixed(2);

    // substitui ponto decimal por vírgula
    value = value.replace(".", ",");

    // adiciona separador de milhar
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // adiciona símbolo de real
    return value;
}
