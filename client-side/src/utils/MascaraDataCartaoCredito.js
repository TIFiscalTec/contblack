export function MascaraDataCartaoCredito(value) {
    if (!value) return "";

    // remove tudo que não é número
    value = value.replace(/\D/g, "");

    // limita a 6 dígitos (MMYYYY)
    if (value.length > 6) value = value.slice(0, 6);

    // aplica a máscara: MM/YYYY
    if (value.length > 2) {
        value = value.replace(/(\d{2})(\d{1,4})/, "$1/$2");
    }

    return value;
}
