// components/ModalFaturaAtrasada.jsx
import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const ModalFaturaAtrasada = ({ open, onClose, onAcessarFaturas }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-fatura-vencida"
            aria-describedby="descricao-fatura-vencida"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: '#fff',
                    borderRadius: '12px',
                    boxShadow: 24,
                    p: 4,
                    textAlign: 'center',
                }}
            >
                <WarningAmberIcon sx={{ fontSize: 48, color: '#ffc845', mb: 2 }} />
                <Typography id="modal-fatura-vencida" variant="h6" component="h2" sx={{ mb: 2, color: '#0b243d' }}>
                    Fatura Vencida
                </Typography>
                <Typography id="descricao-fatura-vencida" sx={{ mb: 3 }}>
                    Detectamos que sua fatura está vencida. Alguns recursos foram temporariamente desativados até a regularização do pagamento.
                </Typography>
                <Button
                    variant="contained"
                    onClick={onAcessarFaturas}
                    sx={{
                        backgroundColor: '#ffc845',
                        color: '#0b243d',
                        '&:hover': {
                            backgroundColor: '#e6b53e',
                        },
                    }}
                >
                    Acessar Faturas
                </Button>
            </Box>
        </Modal>
    );
};

export default ModalFaturaAtrasada;
