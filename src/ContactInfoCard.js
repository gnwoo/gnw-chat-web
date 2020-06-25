import React from 'react';
import { Avatar, Box, Button, Grid, Text } from "grommet";

export default function ContactInfoCard({ dataSourceIndex, contactInfo, infoCardHandler, additionHandler }) {
  const responseContactInviteResponse = (response) => {
    console.log(response)
  }

  const inviteContact = () => {
    fetch("http://localhost:8080/contact-invite", {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: contactInfo.username
      }),
      credentials: 'include',
    })
    .then(res =>  {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(); 
      }
    })
    .then(json => {
      additionHandler(json);
      infoCardHandler(2, 0);
    })
    .catch(error => {
      console.log(error)
    });
  }

  let fn;
  let buttonText;
  let buttonable;
  if (dataSourceIndex === 0) {
    fn = inviteContact;
    buttonText = "Add";
    buttonable = true;
  } else if (dataSourceIndex === 2) {
    fn = () => {};
    buttonText = "Pending";
    buttonable = false;
  } else if (dataSourceIndex === 3) {
    fn = () => { console.log("go to message panel") };
    buttonText = "Message";
    buttonable = true;
  }

  let buttons = (
    <Button primary onClick={fn} disabled={!buttonable} focusIndicator={false}>
      <Box height="40px" width="105px" justify="center" align="center">{ buttonText }</Box>
    </Button>
  );

  if (dataSourceIndex === 1) {
    buttons = (
      <Box>
        <Button primary onClick={() => responseContactInviteResponse(true)} disabled={false} focusIndicator={false}>
          <Box height="40px" width="105px" justify="center" align="center">Accept</Box>
        </Button>
        <Button secondary onClick={() => responseContactInviteResponse(false)} disabled={false} focusIndicator={false}>
          <Box height="40px" width="105px" justify="center" align="center">Decline</Box>
        </Button>
      </Box>
    );
  }

  return (
    <Grid
      fill
      rows={['15%', '25%', '13%', '12%', '10%', 'auto']}
      columns={['100%']}
      areas={[
        { name: 'ava', start: [0, 1], end: [0, 1] },
        { name: 'display-name', start: [0, 2], end: [0, 2] },
        { name: 'username', start: [0, 3], end: [0, 3] },
        { name: 'button', start: [0, 4], end: [0, 4] } ]}
      >
      <Box gridArea="ava" justify="center" align="center">
        <Avatar size="190px" round="2px" background="light-1">{ contactInfo.displayName.charAt(0) }</Avatar>
      </Box>
      <Box gridArea="display-name" justify="end" align="center">
        <Text weight="bold" size="40px">{ contactInfo.displayName }</Text>
      </Box>
      <Box gridArea="username" justify="start" align="center" pad={{ top: "10px" }}>
        <Text size="25px">{ contactInfo.username }</Text>
      </Box>
      <Box gridArea="button" justify="center" align="center">
        { buttons }
      </Box>
    </Grid>
  );
}
