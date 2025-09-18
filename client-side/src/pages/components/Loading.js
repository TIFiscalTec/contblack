import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = (props) => {
    return (
        <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={props.open} >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default Loading;
