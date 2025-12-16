export function gerarLinkWhatsApp(mensagem, telefone = "5541992362095") {
    const mensagemCodificada = encodeURIComponent(mensagem);
    return `https://wa.me/${telefone}?text=${mensagemCodificada}`;
}