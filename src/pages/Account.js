import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import { blue } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import UserAlert from '../components/UserAlert'
import EditIcon from '@material-ui/icons/Edit';
import ImageIcon from '@material-ui/icons/Image';
import UserAlertDialog from '../components/UserAlertDialog'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './Account.css';

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[700],
    },
  },
}))(Button);

export default class Profile extends React.Component {  

  constructor(props) {
    super(props);

    this.state = {
      displayName: "",
      username: "",
      email: "",
      userAlertDialogOpen: false
    };
  }

  onClickChangePassword = () => {this.setState({userAlertDialogOpen: true})}
  handleUserAlertDialogClose = () => {this.setState({userAlertDialogOpen: false})}
  handleUserAlertDialogOK = () => {window.location.replace("http://localhost:3000/")}

  render() {
    return (
      <div className="App">
        <UserAlert severity={this.state.userAlertSeverity} message={this.state.userAlertMessage} 
                   open={this.state.userAlertOpen} handleClose={this.handleUserAlertClose}>
        </UserAlert>

        <UserAlertDialog open={this.state.userAlertDialogOpen} onClose={this.handleUserAlertDialogClose}
                         dialogTitleText="Go To Change Password Page?"
                         dialogContentText="Once your password is changed, all your sessions will be logged out."
                         onClickCancelButton={this.handleUserAlertDialogClose} onClickOKButton={this.handleUserAlertDialogOK}>
        </UserAlertDialog>

        <div className="header">
          <img src={'./images/logo.png'} alt="Logo" className="logoImg"/>
          <h1 className="headerText">account</h1>
        </div>

        <div className="ProfileWrapper">
          <div className="InfoAndSessionContainerFather">
            <div className="InfoContainer">
              <div className="InfoTitle">
                <ColorButton variant="contained"
                            style={{marginRight: 10, minWidth: 0, width: 30, height: 30, borderRadius: 10, background: "linear-gradient(145deg, #23a1ff, #1e87db)"}}>
                  <EditIcon style={{width: 16, height: 16}}></EditIcon>
                </ColorButton>
                DISPLAY NAME
              </div>
              <div className="InfoContent">Xiaolei Luo</div>
              <div className="InfoTitle">
                <ColorButton variant="contained"
                            style={{marginRight: 10, minWidth: 0, width: 30, height: 30, borderRadius: 10, background: "linear-gradient(145deg, #23a1ff, #1e87db)"}}>
                  <EditIcon style={{width: 16, height: 16}}></EditIcon>
                </ColorButton>
                USERNAME
              </div>
              <div className="InfoContent">luo19980630</div>
              <div className="InfoTitle">
                <ColorButton variant="contained"
                            style={{marginRight: 10, minWidth: 0, width: 30, height: 30, borderRadius: 10, background: "linear-gradient(145deg, #23a1ff, #1e87db)"}}>
                  <EditIcon style={{width: 16, height: 16}}></EditIcon>
                </ColorButton>
                EMAIL
              </div>
              <div className="InfoContent">luo19980630@outlook.com</div>
              <div className="InfoTitle">
                <ColorButton variant="contained"
                            style={{marginRight: 10, minWidth: 0, width: 30, height: 30, borderRadius: 10, background: "linear-gradient(145deg, #23a1ff, #1e87db)"}}
                            onClick={this.onClickChangePassword}>
                  <EditIcon style={{width: 16, height: 16}}></EditIcon>
                </ColorButton>
                PASSWORD
              </div>
              <div className="InfoContent">************</div>
            </div>

            <div className="SessionContainer">
              <div className="InfoTitle">
                  <ColorButton variant="contained"
                               style={{marginRight: 10, minWidth: 0, width: 30, height: 30, borderRadius: 10, background: "linear-gradient(145deg, #23a1ff, #1e87db)"}}
                               >
                    <ExitToAppIcon style={{width: 16, height: 16}}></ExitToAppIcon>
                  </ColorButton>
                  SESSION - 1
                </div>
                <div className="InfoContent">IP: 127.0.0.1</div>
                <div className="InfoTitle">
                  <ColorButton variant="contained"
                               style={{marginRight: 10, minWidth: 0, width: 30, height: 30, borderRadius: 10, background: "linear-gradient(145deg, #23a1ff, #1e87db)"}}
                               >
                    <ExitToAppIcon style={{width: 16, height: 16}}></ExitToAppIcon>
                  </ColorButton>
                  SESSION - 2
                </div>
                <div className="InfoContent">IP: 127.0.0.1</div>
            </div>
              
          </div>

          <div className="AvatarContainer">
            <div className="AvatarImgContainer">
              <img className="AvatarImg" src={'./images/default_avatar.png'} alt="Logo"/>
            </div>
            <ColorButton variant="contained"
                         style={{marginLeft: 4, marginTop: 10, minWidth: 0, width: 40, height: 30, borderRadius: 10, background: "linear-gradient(145deg, #23a1ff, #1e87db)"}}>
              <ImageIcon style={{width: 16, height: 16}}></ImageIcon>
            </ColorButton>
          </div>

        </div> 
        
        <div className="footer" style={{position: "absolute", bottom: 10}}>
          © 2020 GNWOO GROUP. ALL RIGHTS SERA LE GENRE HUMAIN.
        </div>
      
      </div>
      );
  }
}
