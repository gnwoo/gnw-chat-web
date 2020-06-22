import React from 'react';
import { Box, Button } from "grommet";
import { ChatOption, ContactInfo, } from "grommet-icons";

const sidebarButtons = [
  { buttonID: 0, buttonIcon: <ChatOption /> },
  { buttonID: 1, buttonIcon: <ContactInfo /> },
];

export default function Sidebar({ sidebarSelectionHandle }) {
  return (
    <Box
      background="neutral-2"
      align="center"
      height="100%"
      pad={{ top: "50px" }}
      gap="50px"
    >
      {sidebarButtons.map(item =>
        <Button plain focusIndicator={false} icon={item.buttonIcon} key={item.buttonID} onClick={() => sidebarSelectionHandle(item.buttonID)} />
      )}
    </Box>
  );
}
