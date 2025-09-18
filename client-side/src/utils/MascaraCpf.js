export function MascaraCpf(value) {
    if (!value) return "";

    // remove tudo que não é número
    value = value.replace(/\D/g, "");

    // limita a 11 dígitos
    if (value.length > 11) value = value.slice(0, 11);

    // aplica a máscara: 999.999.999-99
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return value;
}