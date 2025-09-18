import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const AlertError = (props) => {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        props.setOpenSnackbarError(false);
    };

    return (
        <div>
            <Snackbar open={props.openSnackbarError} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {props.mensagem}
                </Alert>
            </Snackbar>
        </div>
    );

}

export default AlertError;