export function MascaraCnpj(value) {
    if (!value) return "";

    // remove tudo que não é número
    value = value.replace(/\D/g, "");

    // limita a 14 dígitos
    if (value.length > 14) value = value.slice(0, 14);

    // aplica a máscara: 99.999.999/9999-99
    value = value.replace(/^(\d{2})(\d)/, "$1.$2");
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
    value = value.replace(/(\d{4})(\d)/, "$1-$2");

    return value;
}
