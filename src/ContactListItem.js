import React from 'react';
import { Avatar, Box, Button, Grid, Text } from "grommet";

export default function ContactListItem({ infoCardHandler, index, contactIdx, contactItem }) {
  return (
    <Button onClick={() => infoCardHandler(index)} focusIndicator={false} style={{ backgroundColor: index === contactIdx ? "#F0F0F0" : "white" }}>
      <Box height="75px" pad={{ left: "10px", right: "15px" }}>
        <Grid
          fill
          rows={['100%']}
          columns={['25%', '55%', '20%']}
          areas={[
            { name: 'ava', start: [0, 0], end: [0, 0] },
            { name: 'username', start: [1, 0], end: [1, 0] } ]}
          >
          <Box gridArea="ava" justify="center" align="center">
            <Avatar size="50px" round="2px" background="light-1">{ contactItem.displayName.charAt(0) }</Avatar>
          </Box>
          <Box gridArea="username" justify="center" pad={{ left: "5px" }}>
            <Text weight="bold" size="15px">{ contactItem.displayName }</Text>
          </Box>
        </Grid>
      </Box>
    </Button>
  );
}
