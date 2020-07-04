import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import { blue } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import UserAlert from '../components/UserAlert'
import EditIcon from '@material-ui/icons/Edit';
import ImageIcon from '@material-ui/icons/Image';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NoEncryptionIcon from '@material-ui/icons/NoEncryption';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { Redirect } from "react-router-dom";
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
      is2FA: false,
      session_info: [],
      userAlertDialogOpen: false,
      isLogin: true
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/user/user-info", {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
      credentials: "include",
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else if (res.status === 401) {
        this.handleUserAlertChange("error", "Unauthorized")
        this.handleUserAlertClose()
        throw new Error();
      }
      else {
        throw new Error();
      }
    })
    .then(data => {
      this.setState({
        displayName: data.displayName,
        username: data.username,
        email: data.email,
        is2FA: data.is2FA
      })
    })
    .catch(error => console.log("session info no " + error));

    fetch("http://localhost:8080/user/session-info", {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
      credentials: "include",
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else if (res.status === 401) {
        this.handleUserAlertChange("error", "Unauthorized")
        this.handleUserAlertClose()
        throw new Error();
      }
      else {
        throw new Error();
      }
    })
    .then(data => {
      this.setState({session_info: data})
    })
    .catch(error => console.log("session info no " + error));
  }

  onClickChangePassword = () => {window.location.replace("http://localhost:3000/change-password")}

  onClickChange2FA = () => {
    fetch("http://localhost:8080/user/change-2FA-status", {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      credentials: "include",
    })
    .then(res =>  {
      if (res.ok) {
        return res.json()
      } else {
        this.handleUserAlertChange("error", "Server Error")
        this.handleUserAlertClose()
        throw new Error();
      }
    })
    .then(data => {
      if(data.secretKey2FA) {
        this.setState({is2FA: true})
        this.handleUserAlertChange("success", "Your new 2FA Key: " + data.secretKey2FA)
        this.handleUserAlertClose()
      } else {
        this.setState({is2FA: false})
        this.handleUserAlertChange("warning", "Your 2FA has been disabled")
        this.handleUserAlertClose()
      }
    })
    .catch(error => console.log(error));
  }

  onClickLogout = (session_id_param, session_id_index) => {
    fetch("http://localhost:8080/user/logout", {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'session-to-logout-id': session_id_param
      },
      credentials: "include",
    })
    .then(res =>  {
      if (res.ok && session_id_param === this.state.session_info[0]) {
        this.props.authHandler(false)
        this.setState({isLogin: false})
      } else if (res.ok) {
        this.handleUserAlertChange("success", "This session has been logged out")
        this.handleUserAlertClose()
        let temp_session_info = JSON.parse(JSON.stringify(this.state.session_info));
        temp_session_info.splice(session_id_index, 1)
        this.setState({session_info: temp_session_info})
      } else if (res.status === 401) {
        this.handleUserAlertChange("error", "Unauthorized")
        this.handleUserAlertClose()
        throw new Error();
      } else {
        this.handleUserAlertChange("error", "Server Error")
        this.handleUserAlertClose()
        throw new Error();
      }
    })
    .catch(error => console.log(error));
  }

  onClicklogoutEverywhere = () => {
    fetch("http://localhost:8080/user/logout-everywhere", {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      credentials: "include",
    })
    .then(res =>  {
      if (res.ok) {
        this.handleUserAlertChange("success", "All your sessions have been logged out")
        this.handleUserAlertClose()
        this.props.authHandler(false)
        this.setState({isLogin: false})
      } else if (res.status === 401) {
        this.handleUserAlertChange("error", "Unauthorized")
        this.handleUserAlertClose()
        throw new Error();
      } else {
        this.handleUserAlertChange("error", "Server Error")
        this.handleUserAlertClose()
        throw new Error();
      }
    })
    .catch(error => console.log(error));
  }

  handleUserAlertChange = (userAlertSeverityParam, userAlertMessageParam) => {
    this.setState({
      userAlertSeverity: userAlertSeverityParam,
      userAlertMessage: userAlertMessageParam
    })
  }
  handleUserAlertClose = () => { this.setState({userAlertOpen: !this.state.userAlertOpen}) }

  render() {
    return (
      <div className="App">
        {/* redirect after logout */}
        { !this.state.isLogin && <Redirect to="/login" /> }

        <UserAlert severity={this.state.userAlertSeverity} message={this.state.userAlertMessage} 
                   open={this.state.userAlertOpen} handleClose={this.handleUserAlertClose}>
        </UserAlert>

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
                <div className="InfoTitleText">DISPLAY NAME</div>
              </div>
              <div className="InfoContent">{this.state.displayName}</div>
              <div className="InfoTitle">
                <ColorButton variant="contained"
                            style={{marginRight: 10, minWidth: 0, width: 30, height: 30, borderRadius: 10, background: "linear-gradient(145deg, #23a1ff, #1e87db)"}}>
                  <EditIcon style={{width: 16, height: 16}}></EditIcon>
                </ColorButton>
                <div className="InfoTitleText">USERNAME</div>
              </div>
              <div className="InfoContent">{this.state.username}</div>
              <div className="InfoTitle">
                <ColorButton variant="contained"
                            style={{marginRight: 10, minWidth: 0, width: 30, height: 30, borderRadius: 10, background: "linear-gradient(145deg, #23a1ff, #1e87db)"}}>
                  <EditIcon style={{width: 16, height: 16}}></EditIcon>
                </ColorButton>
                <div className="InfoTitleText">EMAIL <Chip className="InfoTitleTextChip" size="small" label="verified"/> </div>
              </div>
              <div className="InfoContent">{this.state.email}</div>
              <div className="InfoTitle">
                  <ColorButton variant="contained"
                              style={{marginRight: 10, minWidth: 0, width: 30, height: 30, borderRadius: 10, background: "linear-gradient(145deg, #23a1ff, #1e87db)"}}
                              onClick={this.onClickChangePassword}>
                    <EditIcon style={{width: 16, height: 16}}></EditIcon>
                  </ColorButton>
                <div className="InfoTitleText">PASSWORD</div>
              </div>
              <div className="InfoTitle">
                <ColorButton variant="contained"
                              style={{marginRight: 10, minWidth: 0, width: 30, height: 30, borderRadius: 10, background: "linear-gradient(145deg, #23a1ff, #1e87db)"}}
                              onClick={this.onClickChange2FA}>
                  {this.state.is2FA === true ?  
                   <VerifiedUserIcon style={{width: 16, height: 16}}></VerifiedUserIcon> :
                   <NoEncryptionIcon style={{width: 16, height: 16}}></NoEncryptionIcon>
                  }
                </ColorButton>
                <div className="InfoTitleText">TWO-FACTOR AUTHENTICATION</div>
              </div>
            </div>

            <div className="SessionContainer">
              {this.state.session_info.map((session_id, key) =>
                <div key={key}>
                  <div className="InfoTitle">
                    <ColorButton variant="contained"
                                 style={{marginRight: 10, minWidth: 0, width: 30, height: 30, borderRadius: 10, background: "linear-gradient(145deg, #23a1ff, #1e87db)"}}
                                 onClick={() => this.onClickLogout(session_id, key)}
                    >
                      <ExitToAppIcon style={{width: 16, height: 16}}></ExitToAppIcon>
                    </ColorButton>
                    {key === 0 ? <div className="InfoTitleText">SESSION {key + 1} <Chip className="InfoTitleTextChip" size="small" label="current"/> </div> : <div className="InfoTitleText">SESSION {key + 1}</div>}
                  </div>
                  <div className="InfoContent">{session_id}</div>
                </div>
              )}            
              <div className="InfoTitle">
                <Tooltip title="logout everywhere" placement="bottom-start">
                  <ColorButton variant="contained"
                               style={{marginRight: 10, minWidth: 0, width: 30, height: 30, borderRadius: 10, background: "linear-gradient(145deg, #23a1ff, #1e87db)"}}
                               onClick={this.onClicklogoutEverywhere}
                  >
                    <PowerSettingsNewIcon style={{width: 16, height: 16}}></PowerSettingsNewIcon>
                  </ColorButton>
                </Tooltip>
              </div>
            </div>
              
          </div>

          <div className="AvatarContainer">
            <div className="AvatarImgContainer">
              <img className="AvatarImg" src={'./images/default_avatar.png'} alt="Logo"/>
            </div>
            <ColorButton variant="contained"
                         style={{marginLeft: 4, marginTop: 10, minWidth: 0, width: 30, height: 30, borderRadius: 10, background: "linear-gradient(145deg, #23a1ff, #1e87db)"}}>
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
