
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom'

const ModalAssinaturaCancelada = (props) => {

    const navigate = useNavigate();

    const handleAgree = async () => {
        localStorage.removeItem("planoSelecionado");
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        navigate("../");
    };

    return (
        <React.Fragment>
            <Dialog
                open={props.openModalAssinaturaCancelada}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Sua assinatura foi cancelada"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Sua assinatura foi cancelada com sucesso. Se desejar reativá-la ou escolher um novo plano, estamos à disposição para ajudar.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', px: 3, pb: 2 }}>
                    <Button onClick={handleAgree} variant='contained' autoFocus color='success' size='small'>OK</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default ModalAssinaturaCancelada;