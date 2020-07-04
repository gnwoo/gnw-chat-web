import React from 'react';
import { ThemeProvider, createMuiTheme, withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { Link, Redirect } from "react-router-dom";
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
import UserInputDialog from './components/UserInputDialog'
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

export default class Login extends React.Component {  

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      passcode2FA: "",
      showPassword: false,
      userAlertOpen: false,
      userAlertSeverity: "info",
      userAlertMessage: "nothing",
      userInputDialogOpen: false,
      isLogin: false
    };
  }

  handleUsernameChange = (usernameParam) => { this.setState({username: usernameParam})}

  handlePasswordChange = (passwordParam) => { this.setState({password: passwordParam}) }

  handlePasscode2FAChange = (passcode2FAParam) => { this.setState({passcode2FA: passcode2FAParam}) }

  handleClickShowPassword = () => { this.setState({showPassword: !this.state.showPassword}) }

  handleMouseDownPassword = (event) => {event.preventDefault();};

  handleUserAlertChange = (userAlertSeverityParam, userAlertMessageParam) => {
    this.setState({
      userAlertSeverity: userAlertSeverityParam,
      userAlertMessage: userAlertMessageParam
    })
  }

  handleUserAlertClose = () => { this.setState({userAlertOpen: !this.state.userAlertOpen}) }

  submitloginForm = () => {
    fetch("http://localhost:8080/user/login", {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then(res =>  {
      if (res.ok) {
        return res.json();
      } 
      else if (res.status === 403) {
        this.handleUserInputDialogClose()
        throw new Error();
      } else if (res.status === 401) {
        this.handleUserAlertChange("error", "Username or password is incorrect")
        this.handleUserAlertClose()
        throw new Error();
      } else {
        this.handleUserAlertChange("error", "Server Error")
        this.handleUserAlertClose()
        throw new Error();
      }
    })
    .then(data => {
      this.props.authHandler(true)
      this.setState({isLogin: true})
    })
    .catch(error => console.log("login no " + error));
  }

  handleUserInputDialogClose = () => {this.setState({userInputDialogOpen: !this.state.userInputDialogOpen})}
  handleUserInputDialogOK = () => {
    if(this.state.passcode2FA === "") {
      this.handleUserAlertChange("error", "Empty 2FA passcode")
      this.handleUserAlertClose()
      return
    }
    fetch("http://localhost:8080/user/login", {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        passcode2FA: this.state.passcode2FA
      })
    })
    .then(res =>  {
      if (res.ok) {
        return res.json();
      } else if (res.status === 401) {
        this.handleUserAlertChange("error", "Your 2FA passcode is incorrect")
        this.handleUserAlertClose()
        throw new Error();
      } else {
        this.handleUserAlertChange("error", "Server Error")
        this.handleUserAlertClose()
        throw new Error();
      }
    })
    .then(json => {
      this.props.authHandler(true)
      this.setState({isLogin: true})
    })
    .catch(error => console.log("login no"));
  }

  render() {
    return (
      <div className="App">
        <UserAlert severity={this.state.userAlertSeverity} message={this.state.userAlertMessage} 
                   open={this.state.userAlertOpen} handleClose={this.handleUserAlertClose}>
        </UserAlert>
        <UserInputDialog open={this.state.userInputDialogOpen} onClose={this.handleUserInputDialogOpen}
                         dialogTitleText="Two-Factor Authentication"
                         dialogContentText="Enter the passcode on your Google Authenticator."
                         passcode2FA={this.state.passcode2FA} handlePasscode2FAChange={this.handlePasscode2FAChange}
                         onClickCancelButton={this.handleUserInputDialogClose} onClickOKButton={this.handleUserInputDialogOK}>
        </UserInputDialog>
        <div className="header">
          <img src={'./images/logo.png'} alt="Logo" className="logoImg"/>
          <h1 className="headerText">gnwoo</h1>
        </div>
        <div className="mainWrapper">
          <div>
            <img src={'./images/login_illustration.png'} alt="Logo Illustration" className="logoIllustration" />
          </div>
          
          <div className="signUpContainer" style={{width: 420, height: "auto", paddingTop: 84, paddingBottom: 60,
                                                   borderRadius: "40px", marginBottom: 20,
                                                   background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
                                                   boxShadow: "20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff"}}>
            <div style={{fontSize: 38, fontWeight: "bold", fontFamily: "Helvetica", marginBottom: 50}}>LOGIN</div>
            <form noValidate autoComplete="off">
              <ThemeProvider theme={theme}>
                {/* Enter Username */}
                <FormControl variant="filled">
                  <InputLabel style={{fontSize: 18, fontWeight: "bold"}}>USERNAME</InputLabel>
                  <FilledInput style={{width: 280, height: 80, fontSize: 20, fontWeight: "bold", backgroundColor: "transparent", marginBottom: 10}}
                    required
                    id="username"
                    label="Username"
                    value={this.state.username}
                    onChange={(e) => this.handleUsernameChange(e.target.value)}
                  />
                </FormControl>
                {/* Enter Password */}
                <FormControl variant="filled">
                  <InputLabel style={{fontSize: 18, fontWeight: "bold"}} htmlFor="filled-adornment-password">PASSWORD</InputLabel>
                  <FilledInput style={{width: 280, height: 80, fontSize: 20, fontWeight: "bold", backgroundColor: "transparent"}}
                    type={this.state.showPassword ? 'text' : 'password'}
                    required
                    id="password"
                    label="Password"
                    value={this.state.password}
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
              </ThemeProvider>
            </form>
  
            {/* Submit Login Form */}
            <ColorButton
              variant="contained"
              onClick={this.submitloginForm}
              style={{width: 90, height: 90, borderRadius: 20, background: "linear-gradient(145deg, #23a1ff, #1e87db)", 
                      boxShadow: "2px 2px 4px 2px #bbdefb", marginTop: 50}}
            >
              <ArrowForwardIcon style={{width: 36, height: 36}}></ArrowForwardIcon>
            </ColorButton>
  
            {/* Go to Sign Up Page */}
            <Button style={{fontSize: 18, fontWeight: "bold", fontFamily: 'Helvetica', marginTop: 50}}>
              <Link to="/sign-up"  style={{color: '#757575', textDecoration: 'none'}}>
                CREATE AN ACCOUNT
              </Link>
            </Button>
            {/* Go to Change Password Page */}
            <Button style={{fontSize: 18, fontWeight: "bold", fontFamily: 'Helvetica'}}>
              <Link to="/change-password" style={{color: '#757575', textDecoration: 'none'}}>
                CANT'T LOGIN?
              </Link>
            </Button>
  
            {/* redirect after login */}
            { this.state.isLogin && <Redirect to="/chat" /> }
          </div>
        </div>
        
        <div className="footer" style={{position: "absolute", bottom: 10}}>
          © 2020 GNWOO GROUP. ALL RIGHTS SERA LE GENRE HUMAIN.
        </div>
      
      </div>
      );
  }
}
