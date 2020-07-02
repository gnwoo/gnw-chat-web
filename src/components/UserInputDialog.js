import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { blue } from '@material-ui/core/colors';
import { ThemeProvider, createMuiTheme, withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';

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
        PaperProps={{ style: { borderRadius: 12}}}
      >
        <DialogTitle id="alert-dialog-title"><div style={{fontWeight: "bold"}}>{props.dialogTitleText}</div></DialogTitle>
        <DialogContent style={{fontSize: 20, fontWeight: "bold"}}>
          <DialogContentText id="alert-dialog-description">
            <div style={{fontWeight: "bold"}}>{props.dialogContentText}</div>
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
          <Button variant="contained"
                       style={{marginBottom: 10, marginRight: 4, minWidth: 0, width: 50, height: 50, borderRadius: 14, background: "linear-gradient(145deg, #f5f5f5, #eeeeee)"}}
                       onClick={props.onClickCancelButton}>
            <CloseIcon style={{width: 30, height: 30}}></CloseIcon>
          </Button>
          <ColorButton variant="contained"
                       style={{marginBottom: 10, marginRight: 10, minWidth: 0, width: 60, height: 60, borderRadius: 14, background: "linear-gradient(145deg, #23a1ff, #1e87db)"}}
                       onClick={props.onClickOKButton}>
            <DoneIcon style={{width: 36, height: 36}}></DoneIcon>
          </ColorButton>
        </DialogActions>
      </Dialog>
    )
}