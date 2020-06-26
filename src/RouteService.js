import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch, } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { grommet, Grommet } from "grommet";

import App from './App';
import SignUp from './SignUp';
import Login from './Login';
import ChangePassword from './ChangePassword';

import { checkAuthStatus } from './helper';

export default function RouteService() {
  const [authed, setAuthed] = useState(false);
  const [cookies] = useCookies();
  
  if (!authed && cookies.uuid && cookies.JWT) {
    checkAuthStatus(setAuthed);
  }

  return (
    <Grommet theme={grommet} full>
      <Router>
          <Switch>

            <Route path="/change-password">
              <ChangePassword />
            </Route>

            <Route path='/chat'>
                { authed ?
                  <App /> :
                  <Redirect to='/' /> }
            </Route>

            <Route path='/login'>
              { authed ?
                <Redirect to='/chat' /> :
                <Login authHandler={setAuthed} /> }
            </Route>

            <Route path='/sign-up'>
              { authed ?
                <Redirect to='/chat' /> :
                <SignUp /> }
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
