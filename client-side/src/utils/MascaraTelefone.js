export function MascaraTelefone(value) {
    if (!value) return "";

    // remove tudo que não é número
    value = value.replace(/\D/g, "");

    // limita a 11 dígitos (DDD + 9 dígitos)
    if (value.length > 11) value = value.slice(0, 11);

    // aplica a máscara: (XX) X XXXX-XXXX
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d)(\d{4})(\d{4})$/, "$1$2-$3");

    return value;
}
