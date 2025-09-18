
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

const ModalCancelarAssinatura = (props) => {

    const navigate = useNavigate();

    const handleClose = () => {
        props.setOpenModalCancelarAssinatura(false);
    };

    const handleAgree = () => {
        navigate('/CancelarAssinatura');
        props.setOpenModalCancelarAssinatura(false);
    }
    return (
        <React.Fragment>
            <Dialog
                open={props.openModalCancelarAssinatura}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Deseja realmente cancelar sua assinatura?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Tem certeza de que deseja cancelar sua assinatura? Você perderá acesso a todos os recursos premium a partir do próximo ciclo.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{display: 'flex', justifyContent: 'space-between', px: 3, pb: 2}}>
                    <Button onClick={handleClose} variant='contained' color='success' size='small'>Manter Assinatura</Button>
                    <Button onClick={handleAgree}  autoFocus color='error' size='small'>Confirmar</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default ModalCancelarAssinatura;