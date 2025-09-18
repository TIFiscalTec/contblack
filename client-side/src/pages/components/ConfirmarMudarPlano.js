import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ConfirmarMudarPlano = (props) => {

    const handleClose = () => {
        props.setOpenConfirmarMudarPlano(false);
    };

    const handleAgree = () => {
        props.handleChangePlan();
        props.setOpenConfirmarMudarPlano(false);
    }
    return (
        <React.Fragment>
            <Dialog
                open={props.openConfirmarMudarPlano}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Deseja realmente mudar de plano?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Ao confirmar, você estará alterando seu plano atual para o novo plano escolhido. Certifique-se de que deseja prosseguir com essa mudança.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{display: 'flex', justifyContent: 'space-between', px: 3, pb: 2}}>
                    <Button onClick={handleClose} color='error' size='small'>Cancelar</Button>
                    <Button onClick={handleAgree} variant='contained' autoFocus color='success' size='small'>Confirmar</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default ConfirmarMudarPlano;