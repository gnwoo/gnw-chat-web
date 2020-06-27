import React from 'react';
import { ThemeProvider, createMuiTheme, withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { blue } from '@material-ui/core/colors';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import UserAlert from './components/UserAlert'
import './App.css';

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

export default class ChangePassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      passcode: "",
      newPassword: "",
      showPasscode: false,
      showPassword: false,
      userAlertOpen: false,
      userAlertSeverity: "info",
      userAlertMessage: "nothing",
    };
  }

  handleUsernameChange = (usernameParam) => { this.setState({username: usernameParam})}

  handlePasscodeChange = (passcodeParam) => { this.setState({passcode: passcodeParam}) }

  handlePasswordChange = (passwordParam) => { this.setState({newPassword: passwordParam}) }

  handleClickShowPasscode = () => { this.setState({showPasscode: !this.state.showPasscode}) }

  handleClickShowPassword = () => { this.setState({showPassword: !this.state.showPassword}) }

  handleMouseDownPassword = (event) => {event.preventDefault();};

  handleUserAlertChange = (userAlertSeverityParam, userAlertMessageParam) => {
    this.setState({
      userAlertSeverity: userAlertSeverityParam,
      userAlertMessage: userAlertMessageParam
    })
  }

  handleUserAlertClose = () => { this.setState({userAlertOpen: !this.state.userAlertOpen}) }

  sendPasscodeEmail = () => {
    fetch("http://localhost:8080/user/verify-by-email-address", {
      method: 'POST',
      headers: { 'content-type': 'application/json',},
      credentials: "include",
      body: JSON.stringify({ username: this.state.username,}
    )})
    .then(res =>  {
      if (res.ok) {
        this.handleUserAlertChange("success", "Your passcode has been sent")
        this.handleUserAlertClose()
        return;
      } else if(res.status === 404) {
        this.handleUserAlertChange("error", "Username does not exist")
        this.handleUserAlertClose()
        throw new Error();
      } else {
        throw new Error();
      }
    })
    .catch(error => console.log("send passcode email no"));
  };

  updatePassword = () => {
    console.log(this.state.newPassword)
    fetch("http://localhost:8080/user/change-password", {
      method: 'PUT',
      headers: { 'content-type': 'application/json',},
      credentials: "include",
      body: JSON.stringify({ 
        username: this.state.username,
        passcode: this.state.passcode,
        newPassword: this.state.newPassword
      }
    )})
    .then(res =>  {
      if (res.ok) {
        this.handleUserAlertChange("success", "Your password has been changed")
        this.handleUserAlertClose()
        return;
      } else if(res.status === 401) {
        this.handleUserAlertChange("error", "Username or passcode is incorrect")
        this.handleUserAlertClose()
        throw new Error();
      } else {
        throw new Error();
      }
    })
    .catch(error => console.log("change password no"));
  };


  render() {
    return (
      <div className="App">
        <div className="header">
          <img src={'./images/logo.png'} alt="Logo" className="logoImg"/>
          <h1 className="headerText">change password</h1>
        </div>
        <UserAlert severity={this.state.userAlertSeverity} message={this.state.userAlertMessage} 
                   open={this.state.userAlertOpen} handleClose={this.handleUserAlertClose}>
        </UserAlert>
        <div className="mainWrapper"> 
          <div className="ChangePasswordContainer">
            <div style={{width: 400, height: 500, display: "flex", flexDirection: "column", justifyContent: "center",
                         alignItems: "center", borderRadius: "40px", marginBottom: 20, background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
                         boxShadow: "20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff", marginRight: 20}}>
              <form noValidate autoComplete="off">
                <p style={{fontSize: 22, fontWeight: "bold", fontFamily: "Helvetica", paddingLeft: 30, paddingRight: 30, marginBottom: 40}}>
                  Enter your username. We will send a passcode to your Email.
                </p>
                <ThemeProvider theme={theme}>
                    {/* enter username */}
                    <FormControl style={{marginBottom: 50}} variant="filled">
                      <InputLabel style={{fontSize: 16, fontWeight: "bold"}}>USERNAME</InputLabel>
                      <FilledInput style={{width: 280, height: 80, fontSize: 20, fontWeight: "bold", backgroundColor: "transparent"}}
                        required
                        id="standard-required"
                        label="Username"
                        value={this.state.username}
                        onChange={(e) => this.handleUsernameChange(e.target.value)}
                      />
                    </FormControl>
                    {/* send passcode to email */}
                    <ColorButton
                      variant="contained"
                      onClick={this.sendPasscodeEmail}
                      style={{width: "auto", height: 50, paddingLeft: 20, paddingRight: 20, borderRadius: 10, background: "linear-gradient(145deg, #23a1ff, #1e87db)", 
                              marginTop: 40}}
                    >
                      <div style={{fontSize: 15, fontWeight: "bold", fontFamily: "Helvetica",}}>SEND PASSCODE EMAIL</div>
                    </ColorButton>
                  </ThemeProvider>
              </form>
            </div>
  
            <ArrowForwardIcon style={{zIndex: 998, marginRight: 20, color: "#424242", width: 36, height: 36}}></ArrowForwardIcon>
  
            <div style={{width: 400, height: 500, display: "flex", flexDirection: "column", justifyContent: "center",
                         alignItems: "center", borderRadius: "40px", marginBottom: 20, background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
                                                   boxShadow: "20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff", marginRight: 20}}>
              <form noValidate autoComplete="off">
                <p style={{fontSize: 22, fontWeight: "bold", fontFamily: "Helvetica", paddingLeft: 30, paddingRight: 30, marginBottom: 40}}>
                  Enter the passcode you received.
                </p>
                <ThemeProvider theme={theme}>
                  {/* enter passcode */}
                  <FormControl style={{marginBottom: 100}}  variant="filled">
                    <InputLabel style={{fontSize: 16, fontWeight: "bold"}} htmlFor="filled-adornment-password">PASSCODE</InputLabel>
                    <FilledInput style={{width: 280, height: 80, fontSize: 20, fontWeight: "bold", backgroundColor: "transparent"}}
                      type={this.state.showPasscode ? 'text' : 'password'}
                      required
                      id="passcode"
                      label="Passcode"
                      value={this.state.passcode}
                      onChange={(e) => this.handlePasscodeChange(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={this.handleClickShowPasscode}
                            onMouseDown={this.handleMouseDownPasscode}
                            edge="end"
                          >
                          {this.state.showPasscode ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <div style={{fontSize: 18, fontFamily: "Helvetica", fontStyle: "Italic"}}>Your passwcode is valid for 10 minutes</div>
                </ThemeProvider>
              </form>
            </div>
  
            <ArrowForwardIcon style={{zIndex: 998, marginRight: 20, color: "#424242", width: 36, height: 36}}></ArrowForwardIcon>
  
            <div style={{width: 400, height: 500, display: "flex", flexDirection: "column", justifyContent: "center",
                         alignItems: "center", borderRadius: "40px", marginBottom: 20, background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
                                                   boxShadow: "20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff"}}>
              <form noValidate autoComplete="off">
                <p style={{fontSize: 22, fontWeight: "bold", fontFamily: "Helvetica", paddingLeft: 30, paddingRight: 30, marginBottom: 40}}>
                  Enter the new password you want to reset.
                </p>
                <ThemeProvider theme={theme}>
                    {/* enter new password */}
                    <FormControl style={{marginBottom: 50}}  variant="filled">
                    <InputLabel style={{fontSize: 16, fontWeight: "bold"}} htmlFor="filled-adornment-password">NEW PASSWORD</InputLabel>
                    <FilledInput style={{width: 280, height: 80, fontSize: 20, fontWeight: "bold", backgroundColor: "transparent"}}
                      type={this.state.showPassword ? 'text' : 'password'}
                      required
                      id="password"
                      label="Password"
                      value={this.state.newPassword}
                      onChange={(e) => this.handlePasswordChange(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}
                            edge="end"
                          >
                          {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                    {/* update passcode */}
                    <ColorButton
                      variant="contained"
                      onClick={this.updatePassword}
                      style={{width: "auto", height: 50, paddingLeft: 20, paddingRight: 20, borderRadius: 10, background: "linear-gradient(145deg, #23a1ff, #1e87db)", 
                              marginTop: 40}}
                    >
                      <div style={{fontSize: 15, fontWeight: "bold", fontFamily: "Helvetica",}}>UPDATE PASSWORD</div>
                    </ColorButton>
                  </ThemeProvider>
              </form>
            </div>
  
          </div>
        </div>
        
        <div className="footer" style={{position: "absolute", bottom: 10}}>
          © 2020 GNWOO GROUP. ALL RIGHTS SERA LE GENRE HUMAIN.
        </div>
      
      </div>
    );
  }
  
}
