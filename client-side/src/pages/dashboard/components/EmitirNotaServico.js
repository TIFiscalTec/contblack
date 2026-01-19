import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HeaderDashboard from '../../components/HeaderDashboard';
import { useNavigate } from 'react-router-dom';
import { Button, Divider } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Typography } from "@mui/material";
import { useUser } from '../../../contexts/UserContext';
import { MascaraCpf } from '../../../utils/MascaraCpf';
import { MascaraCnpj } from '../../../utils/MascaraCnpj';
import axios from 'axios';
import { TirarMascara } from '../../../utils/TirarMascara';
import Loading from '../../components/Loading';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MascaraValor } from '../../../utils/MascaraValor';
import AlertError from '../../components/AlertError';
import AlertSuccess from '../../components/AlertSuccess';

const estados = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
    "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
    "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

const EmitirNotaServico = () => {
    const { user, fetchUser } = useUser();
    const navigate = useNavigate();
    const [userActive, setUserActive] = useState(true);
    const [notificacoes, setNotificacoes] = useState([]);
    const [openModalNotificacao, setOpenModalNotificacao] = useState(false);
    const [hasTomador, setHasTomador] = useState(true);
    const [servicos, setServicos] = useState([]);

    const [cpfCnpjTomador, setCpfCnpjTomador] = useState('');
    const [razaoSocialTomador, setRazaoSocialTomador] = useState('');
    const [emailTomador, setEmailTomador] = useState('');
    const [inscricaoMunicipalTomador, setInscricaoMunicipalTomador] = useState('');
    const [cepTomador, setCepTomador] = useState('');
    const [enderecoTomador, setEnderecoTomador] = useState('');
    const [numeroTomador, setNumeroTomador] = useState('');
    const [estadoTomador, setEstadoTomador] = useState('');
    const [cidadeTomador, setCidadeTomador] = useState('');
    const [bairroTomador, setBairroTomador] = useState('');
    const [servicoSelecionado, setServicoSelecionado] = useState(null);
    const [valorServico, setValorServico] = useState('0');
    const [descontoCondicionado, setDescontoCondicionado] = useState('0');
    const [descontoIncondicionado, setDescontoIncondicionado] = useState('0');
    const [openSnackbarError, setOpenSnackbarError] = useState(false);
    const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);
    const [mensagem, setMensagem] = useState('');


    const [tipoTributacao, setTipoTributacao] = useState('');
    const [exigibilidade, setExigibilidade] = useState('');
    const [aliquota, setAliquota] = useState('');

    const [open, setOpen] = useState(false);


    useEffect(() => {
        if (servicos.length === 0) {
            fetchUser();
        }
        setServicos(user?.servicos || []);
    }, [user]);

    const handleCpfCnpjTomador = async (value) => {
        console.log("Valor digitado:", value);
        if (!value) return;

        const somenteNumeros = value.replace(/\D/g, "");

        // CPF até 11 dígitos | CNPJ até 14 dígitos
        if (somenteNumeros.length <= 11) {
            setCpfCnpjTomador(MascaraCpf(value));
            return;
        }

        // Caso seja CNPJ
        setCpfCnpjTomador(MascaraCnpj(value));

        // Só faz a busca quando o CNPJ estiver completo (14 dígitos => 18 com máscara)
        if (somenteNumeros.length !== 14) return;

        try {
            setOpen(true);

            const { data } = await axios.get(
                `${process.env.REACT_APP_API_URL_PLUGNOTAS}/cnpj/${somenteNumeros}`,
                {
                    headers: {
                        "x-api-key": process.env.REACT_APP_PLUGNOTAS_API_KEY,
                    },
                }
            );

            if (!data) {
                setMensagem("CNPJ não encontrado.");
                setOpenSnackbarError(true);
                return;
            }

            // Preenche os dados retornados
            setRazaoSocialTomador(data.razao_social || "");
            setEmailTomador(data.email || "");
            setCepTomador(data.endereco?.cep || "");
            setEnderecoTomador(data.endereco?.logradouro || "");
            setNumeroTomador(data.endereco?.numero || "");
            setBairroTomador(data.endereco?.bairro || "");
            setCidadeTomador(data.endereco?.municipio || "");
            setEstadoTomador(data.endereco?.uf || "");
        } catch (error) {
            console.error("Erro ao buscar CNPJ:", error);
            setMensagem("Erro ao buscar CNPJ. Verifique se o número está correto ou tente novamente mais tarde.");
            setOpenSnackbarError(true);
        } finally {
            setOpen(false);
        }
    };


    const handleEmitirNota = async () => {
        let body = {}

        if (!servicoSelecionado) {
            setMensagem('Por favor, selecione o serviço prestado.');
            setOpenSnackbarError(true);
            return;
        }

        if (!valorServico || Number(valorServico.replace(/\./g, '').replace(',', '.')) <= 0) {
            setMensagem('Por favor, insira um valor válido para o serviço.');
            setOpenSnackbarError(true);
            return;
        }


        if (hasTomador) {
            if (!cpfCnpjTomador || !razaoSocialTomador) {
                setMensagem('Por favor, preencha todos os dados do tomador.');
                setOpenSnackbarError(true);
                return;
            }
            body = {
                cpfCnpjTomador: TirarMascara(cpfCnpjTomador),
                razaoSocialTomador,
                emailTomador,
                inscricaoMunicipalTomador,
                cepTomador,
                enderecoTomador,
                numeroTomador,
                estadoTomador,
                cidadeTomador,
                bairroTomador,
                servicoSelecionado,
                tipoTributacao,
                exigibilidade,
                aliquota: aliquota ? parseFloat(String(aliquota).replace(',', '.')) : 0,
                valorServico: Number((Number(valorServico.replace(/\./g, '').replace(',', '.')) * 10).toFixed(2)),
                descontoCondicionado: Number((Number(descontoCondicionado.replace(/\./g, '').replace(',', '.')) * 10).toFixed(2)),
                descontoIncondicionado: Number((Number(descontoIncondicionado.replace(/\./g, '').replace(',', '.')) * 10).toFixed(2)),
                hasTomador
            }
        } else {
            body = {
                servicoSelecionado,
                tipoTributacao,
                exigibilidade,
                aliquota: aliquota ? parseFloat(String(aliquota).replace(',', '.')) : 0,
                valorServico: Number((Number(valorServico.replace(/\./g, '').replace(',', '.')) * 10).toFixed(2)),
                descontoCondicionado: Number((Number(descontoCondicionado.replace(/\./g, '').replace(',', '.')) * 10).toFixed(2)),
                descontoIncondicionado: Number((Number(descontoIncondicionado.replace(/\./g, '').replace(',', '.')) * 10).toFixed(2)),
                hasTomador
            }
        }
        setOpen(true);
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/emitirNotaServico`, body, {
            headers: {
                Authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data);
        if (response.data.status === 200) {
            setOpen(false);
            setMensagem('Nota fiscal emitida com sucesso!');
            setOpenSnackbarSuccess(true);
            setAliquota('');
            setExigibilidade('');
            setTipoTributacao('');
            setServicoSelecionado(null);
            setValorServico('0');
            setDescontoCondicionado('0');
            setDescontoIncondicionado('0');
            setCpfCnpjTomador('');
            setRazaoSocialTomador('');
            setEmailTomador('');
            setInscricaoMunicipalTomador('');
            setCepTomador('');
            setEnderecoTomador('');
            setNumeroTomador('');
            setEstadoTomador('');
            setCidadeTomador('');
            setBairroTomador('');
        } else {
            setOpen(false);
            setMensagem('Erro ao emitir nota fiscal: ' + response.data);
            setOpenSnackbarError(true);
        }
    }

    const handleChange = (event) => {
        setEstadoTomador(event.target.value);
    };

    return (
        <>
            <HeaderDashboard userActive={userActive} setOpenModalNotificacao={setOpenModalNotificacao} notificacoes={notificacoes.length} />
            <div style={{ padding: "30px", background: "#f4f6f8", minHeight: "100vh", marginTop: "64px" }}>
                <div style={{ width: "100%", height: "fit-content", padding: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ width: "80%", height: "fit-content" }}>
                        <IconButton onClick={() => navigate(-1)}>
                            <ArrowBackIcon sx={{ fontSize: "40px", color: "black" }} />
                        </IconButton>
                    </div>
                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <div style={{
                        width: "60%",
                        border: "1px solid #eee",
                        borderRadius: "8px",
                        padding: "20px",
                        background: "#fff",
                        minWidth: "400px"
                    }}>
                        <h1>Emitir Nota Fiscal de Serviços</h1>

                        <div style={{ marginTop: "20px" }}>
                            <h3>Prestador</h3>
                            <Divider />
                            <div style={{ marginTop: "10px" }}>
                                <p style={{ fontSize: "14px" }}>Dados do prestador:</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', flexWrap: 'wrap', gap: '10px' }}>
                                <TextField size='small' label="CPF ou CNPJ" disabled required value={MascaraCnpj(user?.empresa?.cnpj)} variant="outlined" style={{ width: window.innerWidth < 600 ? '100%' : '49%' }} />
                                <TextField size='small' label="Razão Social" disabled required value={user?.empresa?.razaoSocial || ""} variant="outlined" style={{ width: window.innerWidth < 600 ? '100%' : '49%' }} />
                            </div>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <h3>Tomador</h3>
                            <Divider />
                            <FormControlLabel control={<Checkbox defaultChecked={hasTomador} onChange={(e) => setHasTomador(e.target.checked)} />} label="Nota possui tomador?" />
                            {hasTomador ? (
                                <div style={{ marginTop: "10px" }}>
                                    <div style={{ marginBottom: "10px" }}>
                                        <p style={{ fontSize: "14px" }}>Preencha os dados do tomador:</p>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: window.innerWidth < 600 ? '10px' : '0px' }}>
                                        <TextField size='small' label="CPF ou CNPJ" required value={cpfCnpjTomador} onChange={(e) => handleCpfCnpjTomador(e.target.value)} variant="outlined" style={{ width: window.innerWidth < 600 ? '100%' : '49%' }} />
                                        <TextField size='small' label="Razão Social ou Nome" required value={razaoSocialTomador} onChange={(e) => setRazaoSocialTomador(e.target.value)} variant="outlined" style={{ width: window.innerWidth < 600 ? '100%' : '49%' }} />
                                    </div>
                                    <div style={{ marginTop: "10px", display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: window.innerWidth < 600 ? '10px' : '0px' }}>
                                        <TextField size='small' label="E-mail" value={emailTomador} onChange={(e) => setEmailTomador(e.target.value)} variant="outlined" style={{ width: window.innerWidth < 600 ? '100%' : '49%' }} />
                                        <TextField size='small' label="Inscrição Municipal" value={inscricaoMunicipalTomador} onChange={(e) => setInscricaoMunicipalTomador(e.target.value)} variant="outlined" style={{ width: window.innerWidth < 600 ? '100%' : '49%' }} />
                                    </div>
                                    <div style={{ marginTop: "10px", display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: window.innerWidth < 600 ? '10px' : '0px' }}>
                                        <TextField size='small' label="CEP" value={cepTomador} onChange={(e) => setCepTomador(e.target.value)} variant="outlined" style={{ width: window.innerWidth < 600 ? '100%' : '30%' }} />
                                        <TextField size='small' label="Endereço" value={enderecoTomador} onChange={(e) => setEnderecoTomador(e.target.value)} variant="outlined" style={{ width: window.innerWidth < 600 ? '100%' : '59%' }} />
                                        <TextField size='small' label="Nª" value={numeroTomador} onChange={(e) => setNumeroTomador(e.target.value)} variant="outlined" style={{ width: window.innerWidth < 600 ? '100%' : '10%' }} />
                                    </div>
                                    <div style={{ marginTop: "10px", display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: window.innerWidth < 600 ? '10px' : '0px' }}>
                                        <FormControl style={{ width: window.innerWidth < 600 ? '100%' : '33%' }} size='small'>
                                            <InputLabel id="estado-select-label">Estado</InputLabel>
                                            <Select
                                                labelId="estado-select-label"
                                                id="estado-select"
                                                value={estadoTomador}
                                                label="Estado"
                                                onChange={handleChange}
                                            >
                                                {estados.map((uf) => (
                                                    <MenuItem key={uf} value={uf}>{uf}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <TextField size='small' label="Cidade" value={cidadeTomador} onChange={(e) => setCidadeTomador(e.target.value)} variant="outlined" style={{ width: window.innerWidth < 600 ? '100%' : '33%' }} />
                                        <TextField size='small' label="Bairro" value={bairroTomador} onChange={(e) => setBairroTomador(e.target.value)} variant="outlined" style={{ width: window.innerWidth < 600 ? '100%' : '33%' }} />
                                    </div>
                                </div>
                            ) : (
                                <p style={{ fontSize: "14px", color: "orange" }}>Nota fiscal de serviço sem tomador.</p>
                            )}
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <h3>Serviço</h3>
                            <Divider />
                            <div style={{ marginTop: "10px" }}>
                                <Autocomplete
                                    size="small"
                                    fullWidth
                                    disablePortal
                                    options={servicos}
                                    getOptionLabel={(option) =>
                                        `${option.codigo} - ${option.cnae ? option.cnae : 'N/A'} - ${option.discriminacao}`
                                    }
                                    value={servicoSelecionado}
                                    onChange={(event, newValue) => {
                                        setServicoSelecionado(newValue);
                                        console.log("Serviço selecionado:", newValue);
                                    }}
                                    renderOption={(props, option) => (
                                        <Box
                                            component="li"
                                            {...props}
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "flex-start",
                                                paddingY: 0.5,
                                            }}
                                        >
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                codigo: {option.codigo} cnae: {option.cnae ? option.cnae : 'N/A'}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {option.discriminacao}
                                            </Typography>
                                        </Box>
                                    )}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Serviço" placeholder='Selecione os serviço que foi prestado' variant="outlined" />
                                    )}
                                />
                                <div style={{ marginTop: "10px", display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: window.innerWidth < 600 ? '10px' : '0px' }}>
                                    <FormControl disabled={!servicoSelecionado} style={{ width: window.innerWidth < 600 ? '100%' : '33%' }} size='small'>
                                        <InputLabel>Tipo tributação</InputLabel>
                                        <Select
                                            value={tipoTributacao}
                                            label="Tipo tributação"
                                            onChange={e => setTipoTributacao(e.target.value)}
                                        >
                                            {/* <MenuItem value={0}>Não definido</MenuItem> */}
                                            <MenuItem value={1}>Isento de ISS</MenuItem>
                                            <MenuItem value={2}>Imune</MenuItem>
                                            <MenuItem value={3}>Não Incidência no Município</MenuItem>
                                            <MenuItem value={4}>Não Tributável</MenuItem>
                                            {/* <MenuItem value={5}>Retido</MenuItem> */}
                                            <MenuItem value={6}>Tributável Dentro do Município</MenuItem>
                                            <MenuItem value={7}>Tributável Fora do Município</MenuItem>
                                            {/* <MenuItem value={8}>Tributável Dentro do Município pelo tomador</MenuItem> */}
                                        </Select>
                                    </FormControl>
                                    <FormControl disabled={!servicoSelecionado} style={{ width: window.innerWidth < 600 ? '100%' : '33%' }} size='small'>
                                        <InputLabel>Exigibilidade</InputLabel>
                                        <Select
                                            value={exigibilidade}
                                            label="Exigibilidade"
                                            onChange={e => setExigibilidade(e.target.value)}
                                        >
                                            <MenuItem value={1}>Exigível</MenuItem>
                                            <MenuItem value={2}>Não Incidência</MenuItem>
                                            <MenuItem value={3}>Isenção</MenuItem>
                                            <MenuItem value={4}>Exportação</MenuItem>
                                            <MenuItem value={5}>Imunidade</MenuItem>
                                            <MenuItem value={6}>Suspenso por Ação Judicial</MenuItem>
                                            <MenuItem value={7}>Suspenso por Ação Administrativa</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField disabled={!servicoSelecionado} size="small" label="Alíquota" value={aliquota} onChange={e => setAliquota(e.target.value)} variant="outlined" style={{ width: window.innerWidth < 600 ? '100%' : '33%' }} />
                                </div>
                                <div style={{ marginTop: "30px", marginBottom: "50px", display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: window.innerWidth < 600 ? '10px' : '0px' }}>
                                    <TextField disabled={!servicoSelecionado} size='small' label="Valor do Serviço" value={MascaraValor(valorServico)} onChange={e => setValorServico(e.target.value)} variant="outlined" style={{ width: window.innerWidth < 600 ? '100%' : '33%' }} />
                                    <TextField disabled={!servicoSelecionado} size='small' label="Desconto Condicionado" value={MascaraValor(descontoCondicionado)} onChange={e => setDescontoCondicionado(e.target.value)} variant="outlined" style={{ width: window.innerWidth < 600 ? '100%' : '33%' }} />
                                    <TextField disabled={!servicoSelecionado} size='small' label="Desconto Incondicionado" value={MascaraValor(descontoIncondicionado)} onChange={e => setDescontoIncondicionado(e.target.value)} variant="outlined" style={{ width: window.innerWidth < 600 ? '100%' : '33%' }} />
                                </div>
                                <Button variant="contained" sx={{ backgroundColor: "#901CB3", "&:hover": { backgroundColor: "#701d8aff" } }} fullWidth onClick={handleEmitirNota}>Emitir Nota</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Loading open={open} setOpen={setOpen} />
            <AlertError openSnackbarError={openSnackbarError} setOpenSnackbarError={setOpenSnackbarError}  mensagem={mensagem} />
            <AlertSuccess openSnackbarSuccess={openSnackbarSuccess} setOpenSnackbarSuccess={setOpenSnackbarSuccess}  mensagem={mensagem} />
        </>
    )
}


export default EmitirNotaServico;