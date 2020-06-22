import React from 'react';
import { Avatar, Box, Button, Grid, Text } from "grommet";

export default function ChatListItem({ index, chatItem, cIdx, setCIdx }) {
  return (
    <Button onClick={() => setCIdx(index)} focusIndicator={false} style={{ backgroundColor: index === cIdx ? "#F0F0F0" : "white" }}>
      <Box height="75px" pad={{ left: "10px", right: "15px" }}>
        <Grid
          fill
          rows={['50%', '50%']}
          columns={['25%', '55%', '20%']}
          areas={[
            { name: 'ava', start: [0, 0], end: [0, 1] },
            { name: 'username', start: [1, 0], end: [1, 0] },
            { name: 'last-msg', start: [1, 1], end: [1, 1] },
            { name: 'last-msg-ts', start: [2, 0], end: [2, 0] } ]}
          >
          <Box gridArea="ava" justify="center">
            <Avatar size="50px" round="2px" background="light-1">{ chatItem.displayName.charAt(0) }</Avatar>
          </Box>
          <Box gridArea="username" justify="end">
            <Text weight="bold" size="15px">{ chatItem.displayName }</Text>
          </Box>
          <Box gridArea="last-msg" justify="start" pad={{ top: "5px" }}>
            <Text size="13px" color="grey" style={{ fontFamily: "Monaco" }}>
              { chatItem.lastMessage.length > 15 ? chatItem.lastMessage.slice(0, 15) + "..." : chatItem.lastMessage }
            </Text>
          </Box>
          <Box gridArea="last-msg-ts" justify="end" align="end">
            <Text size="13px" color="grey">{ chatItem.lastMessageTimestamp }</Text>
          </Box>
        </Grid>
      </Box>
    </Button>
  );
}