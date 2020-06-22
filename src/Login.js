import React, { useState } from 'react';
import { ThemeProvider, makeStyles, createMuiTheme, withStyles } from "@material-ui/core/styles";
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
import clsx from 'clsx';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '25ch',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
}));

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
  const classes = useStyles();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, setLogin] = useState(false);
  
  const loginFn = () => {
    fetch("http://localhost:8080/login", {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({
        username: username,
        password: password,
      }
    )})
    .then(res =>  {
      if (res.ok) {
        console.log("login ok");
        return res.json();
      } else {
        throw new Error();
      }
    })
    .then(json => {
      authHandler(true);
      setLogin(true);
    })
    .catch(error => console.log("login no"));
  };

  const [values, setValues] = React.useState({showPassword: false,});

  const handleClickShowPassword = () => {setValues({ ...values, showPassword: !values.showPassword });};

  const handleMouseDownPassword = (event) => {event.preventDefault();};


  return (
    <div className="App">
      <div className="header">
        <img src={'./images/logo.png'} alt="Logo" className="logoImg"/>
        <h1 className="headerText">gnwoo</h1>
      </div>
      <div className="mainWrapper">
        <div>
          <img src={'./images/login_illustration.png'} alt="Logo Illustration" className="logoIllustration" />
        </div>
        
        <div className="signUpContainer" style={{width: 420, height: 660, borderRadius: "40px", marginBottom: 20,
                                                 background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
                                                 boxShadow: "20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff"}}>
          <div style={{fontSize: 38, fontWeight: "bold", fontFamily: "Helvetica", marginBottom: 50}}>LOGIN</div>
          <form className={classes.root} noValidate autoComplete="off">
            <ThemeProvider theme={theme}>
              {/* Enter Username */}
              <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
                <InputLabel style={{fontSize: 18, fontWeight: "bold"}}>USERNAME</InputLabel>
                <FilledInput style={{width: 280, height: 80, fontSize: 20, fontWeight: "bold", backgroundColor: "transparent", marginBottom: 10}}
                  required
                  id="standard-required"
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              {/* Enter Password */}
              <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
                <InputLabel style={{fontSize: 18, fontWeight: "bold"}} htmlFor="filled-adornment-password">PASSWORD</InputLabel>
                <FilledInput style={{width: 280, height: 80, fontSize: 20, fontWeight: "bold", backgroundColor: "transparent"}}
                  id="filled-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  required
                  id="standard-required"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            </ThemeProvider>
          </form>

          {/* Submit Login Form */}
          <ColorButton
            variant="contained"
            onClick={loginFn}
            style={{width: 90, height: 90, borderRadius: 20, background: "linear-gradient(145deg, #23a1ff, #1e87db)", 
                    boxShadow: "2px 2px 4px 2px #bbdefb", marginTop: 40}}
          >
            <ArrowForwardIcon style={{width: 36, height: 36}}></ArrowForwardIcon>
          </ColorButton>

          {/* Go to Sign Up Page */}
          <Link to="/sign-up" 
                style={{fontSize: 18, fontWeight: "bold", fontFamily: 'Helvetica', color: '#757575',
                        marginTop: 50, textDecoration: 'none'}}>
            CREATE AN ACCOUNT
          </Link>
          {/* Go to Change Password Page */}
          <Link to="/ChangePassword" 
                style={{fontSize: 18, fontWeight: "bold", fontFamily: 'Helvetica', color: '#757575',
                        marginTop: 10, textDecoration: 'none'}}>
            CANT'T LOGIN?
          </Link>

          {/* redirect after login */}
          { login && <Redirect to="/chat" /> }
        </div>
      </div>
      
      <div className="footer" style={{position: "absolute", bottom: 10}}>
        <a target="_blank">
          © 2020 GNWOO GROUP. ALL RIGHTS SERA LE GENRE HUMAIN.
        </a>
      </div>
    
    </div>
  );
}
