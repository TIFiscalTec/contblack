export function MascaraCep(value) {
    if (!value) return "";

    // remove tudo que não é número
    value = value.replace(/\D/g, "");

    // limita a 8 dígitos
    if (value.length > 8) value = value.slice(0, 8);

    // aplica a máscara: 99999-999
    value = value.replace(/(\d{5})(\d)/, "$1-$2");

    return value;
}
