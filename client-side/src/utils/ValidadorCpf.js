function validarCPF(cpf) {
    // Remove tudo que não for número
    cpf = cpf.replace(/\D/g, "");

    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) return false;

    // Rejeita CPFs com todos os dígitos iguais (ex: 11111111111)
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    // --- Validação do primeiro dígito ---
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * (10 - i);
    }
    let dig1 = 11 - (soma % 11);
    dig1 = dig1 > 9 ? 0 : dig1;

    if (dig1 !== parseInt(cpf[9])) return false;

    // --- Validação do segundo dígito ---
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * (11 - i);
    }
    let dig2 = 11 - (soma % 11);
    dig2 = dig2 > 9 ? 0 : dig2;

    if (dig2 !== parseInt(cpf[10])) return false;

    return true;
}

export default validarCPF;