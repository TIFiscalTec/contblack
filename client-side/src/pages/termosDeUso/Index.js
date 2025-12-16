import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TermosUso = () => {
    const [conteudoTermos, setConteudoTermos] = useState('');
    const [dataAtualizacao, setDataAtualizacao] = useState('');

    useEffect(() => {
        const getTermos = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/get/termos-uso`);
                console.log('Resposta dos termos de uso:', response.data);
                setConteudoTermos(response.data.termo.Conteudo);
                const data = new Date(response.data.termo.DataCriacao);
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

        getTermos();
    }, []);

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: "center", marginBottom: "20px", backgroundColor: "#0b243d", padding: "10px", borderRadius: "8px" }}>
                <img src="/assets/Logo_Contblack_FundoEscuro.png" alt="Termos de Uso" />
            </div>
            <h2>TERMOS E CONDIÇÕES GERAIS DE USO E PRESTAÇÃO DE SERVIÇOS CONTÁBEIS</h2>
            <p>Última atualização: {dataAtualizacao}</p><br />

            <div dangerouslySetInnerHTML={{ __html: conteudoTermos }} />
        </div>
    );
}

export default TermosUso;