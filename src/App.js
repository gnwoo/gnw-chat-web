import React, { useState } from 'react';
import { grommet, Grommet, } from "grommet";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useCookies } from 'react-cookie';

import Login from './Login';
import SignUp from './SignUp';
import ChatPage from './ChatPage';
import { checkAuthStatus } from './authHelper';

function App() {  
  const [authed, setAuthed] = React.useState(false);
  const [cookies] = useCookies();
  
  if (!authed && cookies.JWT) {
    const authorized = checkAuthStatus(cookies.username, cookies.JWT);
    if (authorized) {
      console.log("authorized")
      setAuthed(true);
    }
  }

  return (
    <Grommet theme={grommet} full>
      <Router>
          <Switch>

            <Route path="/signUp">
              { authed ?
                <Redirect to='/chat' /> :
                <SignUp /> }
            </Route>

            <Route path="/chat">
              { authed ?
                <ChatPage /> :
                <Redirect to='/' /> }
            </Route>

            <Route path="/">
              { authed ?
                <Redirect to='/chat' /> :
                <Login authHandler={setAuthed} /> }
            </Route>

          </Switch>
      </Router>
    </Grommet>
  );
}

export default App;
