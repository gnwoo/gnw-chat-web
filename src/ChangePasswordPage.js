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

export default function Login({ authHandler }) {

  const [values, setValues] = React.useState({
    username: '',
    passcode: '',
    new_password: '',
    showPasscode: false,
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {setValues({ ...values, [prop]: event.target.value });};
  const handleClickShowPasscode = () => {setValues({ ...values, showPasscode: !values.showPasscode });};
  const handleMouseDownPasscode = (event) => {event.preventDefault();};
  const handleClickShowPassword = () => {setValues({ ...values, showPassword: !values.showPassword });};
  const handleMouseDownPassword = (event) => {event.preventDefault();};

  
  const sendPasscodeEmail = () => {
    console.log(values.username)
    fetch("http://localhost:8080/verify-by-email-address", {
      method: 'POST',
      headers: { 'content-type': 'application/json',},
      credentials: "include",
      body: JSON.stringify({ username: values.username,}
    )})
    .then(res =>  {
      if (res.ok) 
      {
        console.log("send passcode email ok");
        return;
      } 
      else 
        throw new Error();
    })
    .catch(error => console.log("send passcode email no"));
  };

  const updatePassword = () => {
    console.log(values.passcode)
    console.log(values.new_password)
    fetch("http://localhost:8080/change-password", {
      method: 'PUT',
      headers: { 'content-type': 'application/json',},
      credentials: "include",
      body: JSON.stringify({ 
        username: values.username,
        passcode: values.passcode,
        newPassword: values.new_password
      }
    )})
    .then(res =>  {
      if (res.ok) 
      {
        console.log("change password ok");
        return;
      } 
      else 
        throw new Error();
    })
    .catch(error => console.log("change password no"));
  };


  return (
    <div className="App">
      <div className="header">
        <img src={'./images/logo.png'} alt="Logo" className="logoImg"/>
        <h1 className="headerText">change password</h1>
      </div>
      <div className="mainWrapper">
        {/* <div>
          <img src={'./images/login_illustration.png'} alt="Logo Illustration" className="logoIllustration" />
        </div> */}
        
        <div className="ChangePasswordContainer" style={{}}>
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
                      value={values.username}
                      onChange={handleChange('username')}
                    />
                  </FormControl>
                  {/* send passcode to email */}
                  <ColorButton
                    variant="contained"
                    onClick={sendPasscodeEmail}
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
                <FormControl style={{marginBottom: 90}}  variant="filled">
                  <InputLabel style={{fontSize: 16, fontWeight: "bold"}} htmlFor="filled-adornment-password">PASSCODE</InputLabel>
                  <FilledInput style={{width: 280, height: 80, fontSize: 20, fontWeight: "bold", backgroundColor: "transparent"}}
                    type={values.showPasscode ? 'text' : 'password'}
                    required
                    id="passcode"
                    label="Passcode"
                    value={values.passcode}
                    onChange={handleChange('passcode')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasscode}
                          onMouseDown={handleMouseDownPasscode}
                          edge="end"
                        >
                        {values.showPasscode ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <div style={{fontSize: 18, fontFamily: "Helvetica", fontStyle: "Italic"}}>Your passcode has been sent to luo19980630@outlook.com</div>
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
                    type={values.showPassword ? 'text' : 'password'}
                    required
                    id="passcode"
                    label="Passcode"
                    value={values.new_password}
                    onChange={handleChange('new_password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                  {/* send passcode to email */}
                  <ColorButton
                    variant="contained"
                    onClick={updatePassword}
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
