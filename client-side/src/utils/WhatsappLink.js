export function gerarLinkWhatsApp(mensagem, telefone = "5541998333575") {
    const mensagemCodificada = encodeURIComponent(mensagem);
    return `https://wa.me/${telefone}?text=${mensagemCodificada}`;
}