import React from 'react';
import { ThemeProvider, createMuiTheme, withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import FormControl from '@material-ui/core/FormControl';
import { blue } from '@material-ui/core/colors';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import DoneIcon from '@material-ui/icons/Done';
import UserAlert from './components/UserAlert';
import BlueCheckBox from './components/BlueCheckBox'
import UserInputDialog from './components/UserInputDialog'

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

export default class SignUp extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      displayName: "",
      email: "",
      is2FA: false,
      passcode: "",
      showPassword: false,
      userAlertOpen: false,
      userAlertSeverity: "info",
      userAlertMessage: "nothing",
      userInputDialogOpen: false,
    };
  }

  handleUsernameChange = (usernameParam) => { this.setState({username: usernameParam})}

  handlePasswordChange = (passwordParam) => { this.setState({password: passwordParam}) }

  handlePasscodeChange = (passcodeParam) => { this.setState({passcode: passcodeParam}) }

  handleDisplayNameChange = (displayNameParam) => { this.setState({displayName: displayNameParam})}

  handleEmailChange = (emailParam) => { this.setState({email: emailParam}) }

  handleIs2FAChange = () => { this.setState({is2FA: !this.state.is2FA}) }

  handleClickShowPassword = () => { this.setState({showPassword: !this.state.showPassword}) }

  handleMouseDownPassword = (event) => {event.preventDefault();};


  handleUserAlertChange = (userAlertSeverityParam, userAlertMessageParam) => {
    this.setState({
      userAlertSeverity: userAlertSeverityParam,
      userAlertMessage: userAlertMessageParam
    })
  }

  handleUserAlertClose = () => { this.setState({userAlertOpen: !this.state.userAlertOpen}) }

  submitSignUpForm = () => {
    fetch("http://localhost:8080/user/sign-up", {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        displayName: this.state.displayName,
        email: this.state.email,
        is2FA: this.state.is2FA
      }),
    })
    .then(res =>  {
      if (res.ok) {
        this.handleUserAlertChange("success", "An email verfication passcode has been sent to " + this.state.email)
        this.handleUserAlertClose()
        this.handleUserInputDialogClose()
      } else if (res.status === 409) {
        this.handleUserAlertChange("error", "Username has already been registered")
        this.handleUserAlertClose()
        throw new Error()
      }
      else {
        this.handleUserAlertChange("error", "Server Error")
        this.handleUserAlertClose()
        throw new Error()
      }
    })
    .catch(error => console.log(error));
  };

  handleUserInputDialogClose = () => {this.setState({userInputDialogOpen: !this.state.userInputDialogOpen})}
  handleUserInputDialogOK = () => {
    fetch("http://localhost:8080/user/sign-up-email-verification", {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        passcode: this.state.passcode
      }),
    })
    .then(res =>  {
      if (res.ok) {
        this.handleUserInputDialogClose()
        return res.json()
      } else if (res.status === 401) {
        this.handleUserAlertChange("error", "Invalid passcode")
        this.handleUserAlertClose()
        throw new Error()
      }
      else {
        this.handleUserAlertChange("error", "Server Error")
        this.handleUserAlertClose()
        throw new Error()
      }
    })
    .then(data => {
      if(data.secretKey2FA) {
        this.handleUserAlertChange("success", "Sign up success. Your 2FA Key: " + data.secretKey2FA)
        this.handleUserAlertClose()
      } else {
        this.handleUserAlertChange("success", "Sign up success")
        this.handleUserAlertClose()
      }
    })
    .catch(error => console.log(error));
  }

  render(){
    return (
      <div className="App">
        <UserAlert severity={this.state.userAlertSeverity} message={this.state.userAlertMessage} 
                   open={this.state.userAlertOpen} handleClose={this.handleUserAlertClose}>
        </UserAlert>
        <UserInputDialog open={this.state.userInputDialogOpen} onClose={this.handleUserInputDialogOpen}
                         dialogTitleText="Email Verification"
                         dialogContentText="Enter the passcode we sent to your email."
                         passcode2FA={this.state.passcode} handlePasscode2FAChange={this.handlePasscodeChange}
                         onClickCancelButton={this.handleUserInputDialogClose} onClickOKButton={this.handleUserInputDialogOK}>
        </UserInputDialog>
        <div className="header">
          <img src={'./images/logo.png'} alt="Logo" className="logoImg"/>
          <h1 className="headerText">sign up</h1>
        </div>
        <div className="mainWrapper">
          <div>
            <img src={'./images/sign_up_illustration.png'} alt="Logo Illustration" className="logoIllustration" />
          </div>

          <div className="signUpContainer" style={{width: 420, height: "auto", paddingTop: 40, paddingBottom: 40,
                                                   borderRadius: "40px",
                                                   background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
                                                   boxShadow: "20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff"}}>
            {/* <div style={{fontSize: 38, fontWeight: "bold", fontFamily: "Helvetica", marginBottom: 50}}>SIGN UP</div> */}
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
                <FormControl variant="filled" style={{marginBottom: 10}}>
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
                {/* Enter DisplayName */}
                <FormControl variant="filled">
                  <InputLabel style={{fontSize: 18, fontWeight: "bold"}}>DISPLAY NAME</InputLabel>
                  <FilledInput style={{width: 280, height: 80, fontSize: 20, fontWeight: "bold", backgroundColor: "transparent", marginBottom: 10}}
                    required
                    id="display-name"
                    label="DisplayName"
                    value={this.state.displayName}
                    onChange={(e) => this.handleDisplayNameChange(e.target.value)}
                  />
                </FormControl>
                {/* Enter Email */}
                <FormControl variant="filled">
                  <InputLabel style={{fontSize: 18, fontWeight: "bold"}}>EMAIL</InputLabel>
                  <FilledInput style={{width: 280, height: 80, fontSize: 20, fontWeight: "bold", backgroundColor: "transparent", marginBottom: 10}}
                    required
                    id="email"
                    label="Email"
                    value={this.state.email}
                    onChange={(e) => this.handleEmailChange(e.target.value)}
                  />
                </FormControl>
              </ThemeProvider>
            </form>
            
            {/* Enable 2FA */}
            <BlueCheckBox label="Two-Factor Authentication" checked={this.state.is2FA} onChange={this.handleIs2FAChange}></BlueCheckBox>

            {/* Submit Login Form */}
            <ColorButton
              variant="contained"
              onClick={this.submitSignUpForm}
              style={{width: 90, height: 90, borderRadius: 20, background: "linear-gradient(145deg, #23a1ff, #1e87db)", 
                      boxShadow: "2px 2px 4px 2px #bbdefb", marginTop: 30}}
            >
              <DoneIcon style={{width: 36, height: 36}}></DoneIcon>
            </ColorButton>
  
            {/* Go to Login Page */}
            <Button style={{fontSize: 18, fontWeight: "bold", fontFamily: 'Helvetica', marginTop: 30}}>
              <Link to="/login" style={{color: '#757575', textDecoration: 'none'}}>
                    GO TO LOGIN
              </Link>
            </Button>
          </div>
          
        </div>
        
        <div className="footer" style={{position: "absolute", bottom: 10}}>
          © 2020 GNWOO GROUP. ALL RIGHTS SERA LE GENRE HUMAIN.
        </div>
      
      </div>
    );
  }
}
