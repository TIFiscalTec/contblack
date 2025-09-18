export function MascaraCartaoCredito(value) {
    if (!value) return "";

    // remove tudo que não é número
    value = value.replace(/\D/g, "");

    // limita a 16 dígitos (padrão mais comum de cartões)
    if (value.length > 16) value = value.slice(0, 16);

    // aplica a máscara: 9999 9999 9999 9999
    value = value.replace(/(\d{4})(?=\d)/g, "$1 ");

    return value.trim();
}
