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
import UserAlert from './components/UserAlert'

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
      showPassword: false,
      userAlertOpen: false,
      userAlertSeverity: "info",
      userAlertMessage: "nothing",
    };
  }

  handleUsernameChange = (usernameParam) => { this.setState({username: usernameParam})}

  handlePasswordChange = (passwordParam) => { this.setState({password: passwordParam}) }

  handleDisplayNameChange = (displayNameParam) => { this.setState({displayName: displayNameParam})}

  handleEmailChange = (emailParam) => { this.setState({email: emailParam}) }

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
      }),
    })
    .then(res =>  {
      if (res.ok) {
        this.handleUserAlertChange("success", "Sign Up Success")
        this.handleUserAlertClose()
      } else if (res.status === 409) {
        this.handleUserAlertChange("error", "Username has already been registered")
        this.handleUserAlertClose()
      }
      else {
        this.handleUserAlertChange("error", "Server Error")
        this.handleUserAlertClose()
      }
    });
  };

  render(){
    return (
      <div className="App">
        <UserAlert severity={this.state.userAlertSeverity} message={this.state.userAlertMessage} 
                   open={this.state.userAlertOpen} handleClose={this.handleUserAlertClose}>
        </UserAlert>
        <div className="header">
          <img src={'./images/logo.png'} alt="Logo" className="logoImg"/>
          <h1 className="headerText">sign up</h1>
        </div>
        <div className="mainWrapper">
          <div>
            <img src={'./images/sign_up_illustration.png'} alt="Logo Illustration" className="logoIllustration" />
          </div>
          
          <div className="signUpContainer" style={{width: 420, height: 660, borderRadius: "40px", marginBottom: 20,
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
  
            {/* Submit Login Form */}
            <ColorButton
              variant="contained"
              onClick={this.submitSignUpForm}
              style={{width: 90, height: 90, borderRadius: 20, background: "linear-gradient(145deg, #23a1ff, #1e87db)", 
                      boxShadow: "2px 2px 4px 2px #bbdefb", marginTop: 36}}
            >
              <DoneIcon style={{width: 36, height: 36}}></DoneIcon>
            </ColorButton>
  
            {/* Go to Login Page */}
            <Link to="/login" 
                  style={{fontSize: 18, fontWeight: "bold", fontFamily: 'Helvetica', color: '#757575',
                          marginTop: 50, textDecoration: 'none'}}>
              GO TO LOGIN
            </Link>
          </div>
        </div>
        
        <div className="footer" style={{position: "absolute", bottom: 10}}>
          © 2020 GNWOO GROUP. ALL RIGHTS SERA LE GENRE HUMAIN.
        </div>
      
      </div>
    );
  }
}
