import * as React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    List,
    ListItem,
    ListItemText,
    Divider,
    Typography,
} from "@mui/material";
import { FormatDate } from '../../../utils/FormatDate';


const ModalNotificacao = (props) => {
    
    return (
        <Dialog
            open={props.openModalNotificacao}
            onClose={props.onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>Notificações</DialogTitle>
            <DialogContent dividers>
                {props.notificacoes.length > 0 ? (
                    <List>
                        {props.notificacoes.map((notif, index) => (
                            <div key={notif.id}>
                                <ListItem button>
                                    <ListItemText
                                        primary={`${notif.titulo} - ${FormatDate(notif?.data || "")}`}
                                        secondary={notif.descricao}
                                    />
                                </ListItem>
                                {index < props.notificacoes.length - 1 && <Divider />}
                            </div>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        Nenhuma notificação no momento.
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} variant="contained" color="error">
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalNotificacao;