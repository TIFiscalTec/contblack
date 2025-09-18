import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ModalRecuperarSenha(props) {
    const [email, setEmail] = useState("");
    const [open, setOpen] = useState(false);


    const handleSubmit = async () => {
        setOpen(true);
        const { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/recuperarSenha`,
            { email }
        );
        console.log(data);
        if (data.status === 200) {
            setOpen(false);
            props.setOpenSnackbarSuccess(true);
            props.setMensagem(data.mensagem);
            props.setOpenRecuperarSenha(false);
        } else {
            setOpen(false);
            props.setMensagem(data.mensagem);
            props.setOpenSnackbarError(true);
        }
    };

    return (
        <>
            <Dialog open={props.openRecuperarSenha}>
                <DialogTitle>Recuperar Senha</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Para recuperar sua senha, insira seu endereço de e-mail.
                        Nós enviaremos instruções para redefini-la.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        disabled={open}
                        required
                        margin="dense"
                        label="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => props.setOpenRecuperarSenha(false)}
                        color="error"
                        variant="contained"
                        size="small"
                        disabled={open}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        color="success"
                        variant="contained"
                        size="small"
                        disabled={open}
                    >
                        Recuperar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
