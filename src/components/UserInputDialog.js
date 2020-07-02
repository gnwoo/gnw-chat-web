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
import {  ThemeProvider, createMuiTheme, withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';

const theme = createMuiTheme({
    palette: {
      primary: blue,
    },
  });

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[700],
    },
  },
}))(Button);

export default function UserInputDialog(props) {
    return(
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.dialogTitleText}</DialogTitle>
        <DialogContent style={{fontSize: 20, fontWeight: "bold"}}>
          <DialogContentText id="alert-dialog-description">
            {props.dialogContentText}
          </DialogContentText>
          <ThemeProvider theme={theme}>
            <TextField style={{width: 150}} inputProps={{style: {fontWeight: "bold", fontSize: 22}}}
             id="outlined-basic" variant="outlined" type="number"
             value={props.passcode2FA}
             onChange={(e) => props.handlePasscode2FAChange(e.target.value)}
            />
          </ThemeProvider>
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