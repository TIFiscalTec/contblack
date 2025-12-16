import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PoliticaPrivacidade = () => {
    const [conteudoTermos, setConteudoTermos] = useState('');
    const [dataAtualizacao, setDataAtualizacao] = useState('');

    useEffect(() => {
        const getPoliticas = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/get/politicas-privacidade`);
                console.log('Resposta das políticas de privacidade:', response.data);
                setConteudoTermos(response.data.politica.Conteudo);
                const data = new Date(response.data.politica.DataCriacao);
                const dataFormatada = data.toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    timeZone: "America/Sao_Paulo"
                });
                setDataAtualizacao(dataFormatada);
            } catch (error) {
                console.error('Erro ao buscar os termos de uso:', error);
            }
        };

        getPoliticas();
    }, []);

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: "center", marginBottom: "20px", backgroundColor: "#0b243d", padding: "10px", borderRadius: "8px" }}>
                <img src="/assets/Logo_Contblack_FundoEscuro.png" alt="Política de Privacidade" />
            </div>
            <h1>Política de Privacidade</h1>
            <p>Última atualização: {dataAtualizacao}</p><br />

            <div dangerouslySetInnerHTML={{ __html: conteudoTermos }} />
        </div>
    );
}

export default PoliticaPrivacidade;