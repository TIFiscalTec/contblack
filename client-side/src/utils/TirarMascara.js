export function TirarMascara(value) {
    if (!value) return "";
    return value.replace(/\D/g, ""); // remove tudo que não é número
}