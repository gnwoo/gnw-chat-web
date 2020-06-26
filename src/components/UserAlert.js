import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

export default function SignUpSuccessAlert(props) {
    return(
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
            open={props.open} autoHideDuration={6000} onClose={props.handleClose}>
            <Alert variant="filled" onClose={props.handleClose} severity={props.severity}>
                {props.message}
            </Alert>
        </Snackbar>
    )
}