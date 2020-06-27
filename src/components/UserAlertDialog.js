import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { blue } from '@material-ui/core/colors';
import { withStyles } from "@material-ui/core/styles";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[700],
    },
  },
}))(Button);

export default function UserAlertDialog(props) {
    return(
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.dialogTitleText}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.dialogContentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ColorButton variant="contained"
                       style={{marginBottom: 10, marginRight: 4, minWidth: 0, width: 40, height: 40, borderRadius: 100, background: "linear-gradient(145deg, #23a1ff, #1e87db)"}}
                       onClick={props.onClickCancelButton}>
            <CancelIcon style={{width: 26, height: 26}}></CancelIcon>
          </ColorButton>
          <ColorButton variant="contained"
                       style={{marginBottom: 10, marginRight: 10, minWidth: 0, width: 40, height: 40, borderRadius: 100, background: "linear-gradient(145deg, #23a1ff, #1e87db)"}}
                       onClick={props.onClickOKButton}>
            <CheckCircleIcon style={{width: 26, height: 26}}></CheckCircleIcon>
          </ColorButton>
        </DialogActions>
      </Dialog>
    )
}