import React, { useState } from 'react';
import { Box, Grid, Text, TextArea } from "grommet";

export default function Chat({ chatInfo }) {
  const [textInput, setTextInput] = useState("");

  const handleTextInpust = (event) => {
    if (event.target.value.slice(-1) === '\n') {

      setTextInput(event.target.value.slice(0, -1));
    } else {
      setTextInput(event.target.value);
    }
  }
  
  return (
    <Box fill>
      {chatInfo &&
      <Grid
        fill
        rows={['60px', 'auto', '160px']}
        columns={['100%']}
        areas={[
          { name: 'header', start: [0, 0], end: [0, 0] },
          { name: 'display', start: [0, 1], end: [0, 1] },
          { name: 'input', start: [0, 2], end: [0, 2] },
        ]}
      >
        <Box gridArea="header" border="bottom" justify="center" pad={{ left: "25px" }} background="light-1">
          <Text weight="bold" size="20px"> { chatInfo.displayName }</Text>
        </Box>
        <Box gridArea="display" background="light-1">
          { chatInfo.lastMessage + " at " + chatInfo.lastMessageTimestamp }
        </Box>
        <Box gridArea="input" border="top" background="light-1">
          <TextArea
            fill
            value={textInput}
            onChange={handleTextInpust}
            plain={true}
            resize={false}
          />
        </Box>
      </Grid>}
    </Box>
  );
}
