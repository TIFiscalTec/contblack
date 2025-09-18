import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const AlertSuccess = (props) => {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        props.setOpenSnackbarSuccess(false);
    };

    return (
        <div>
            <Snackbar open={props.openSnackbarSuccess} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {props.mensagem}
                </Alert>
            </Snackbar>
        </div>
    );

}

export default AlertSuccess;