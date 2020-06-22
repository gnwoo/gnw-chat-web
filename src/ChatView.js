import React, { useState } from 'react';
import { Box, Grid, Text } from "grommet";

import ConversationList from "./ConversationList"
import Chat from "./Chat"

const ongoingChats = [
  { username: "luoxiaolei", displayName: "Xiaolei Luo", cID: "cid_mantinglin_luoxiaolei", lastMessage: "12345678901234567890", lastMessageTimestamp: "16:12" },
  { username: "zhangjiayi", displayName: "Jiayi Zhang", cID: "cid_mantinglin_zhangjiayi", lastMessage: "L'Internationale sera le genre humain!", lastMessageTimestamp: "16:12" },
  { username: "zhangjiayi", displayName: "Jiayi Zhang", cID: "cid_mantinglin_zhangjiayi", lastMessage: "L'Internationale sera le genre humain!", lastMessageTimestamp: "16:12" },
  { username: "zhangjiayi", displayName: "Jiayi Zhang", cID: "cid_mantinglin_zhangjiayi", lastMessage: "L'Internationale sera le genre humain!", lastMessageTimestamp: "16:12" },
  { username: "zhangjiayi", displayName: "Jiayi Zhang", cID: "cid_mantinglin_zhangjiayi", lastMessage: "L'Internationale sera le genre humain!", lastMessageTimestamp: "16:12" },
  { username: "zhangjiayi", displayName: "Jiayi Zhang", cID: "cid_mantinglin_zhangjiayi", lastMessage: "L'Internationale sera le genre humain!", lastMessageTimestamp: "16:12" },
  { username: "zhangjiayi", displayName: "Jiayi Zhang", cID: "cid_mantinglin_zhangjiayi", lastMessage: "L'Internationale sera le genre humain!", lastMessageTimestamp: "16:12" },
  { username: "zhangjiayi", displayName: "Jiayi Zhang", cID: "cid_mantinglin_zhangjiayi", lastMessage: "L'Internationale sera le genre humain!", lastMessageTimestamp: "16:12" },
  { username: "zhangjiayi", displayName: "Jiayi Zhang", cID: "cid_mantinglin_zhangjiayi", lastMessage: "L'Internationale sera le genre humain!", lastMessageTimestamp: "16:12" },
  { username: "zhangjiayi", displayName: "Jiayi Zhang", cID: "cid_mantinglin_zhangjiayi", lastMessage: "L'Internationale sera le genre humain!", lastMessageTimestamp: "16:12" },
  { username: "zhangjiayi", displayName: "Jiayi Zhang", cID: "cid_mantinglin_zhangjiayi", lastMessage: "L'Internationale sera le genre humain!", lastMessageTimestamp: "16:12" },
  { username: "zhangjiayi", displayName: "Jiayi Zhang", cID: "cid_mantinglin_zhangjiayi", lastMessage: "L'Internationale sera le genre humain!", lastMessageTimestamp: "16:12" } ];

export default function ChatView() {
  const [cIdx, setCIdx] = useState(-1);

  return (
    <Grid
      fill
      rows={['60px', 'auto']}
      columns={['260px', 'auto']}
      areas={[
        { name: 'chat-view-header', start: [0, 0], end: [0, 0] },
        { name: 'ongoing-conversation', start: [0, 1], end: [0, 1] },
        { name: 'chat', start: [1, 0], end: [1, 1] },
      ]}
    >
      <Box gridArea="chat-view-header" justify="center" align="center" border="bottom">
        <Text weight="bold" size="16px">Chats</Text>
      </Box>

      <Box gridArea="ongoing-conversation" pad={{ left: "5px" }} overflow="auto">
        <ConversationList cIdx={cIdx} setCIdx={setCIdx} />
      </Box>

      <Box gridArea="chat" width={{ min: "600px" }}  border="left">
        <Chat chatInfo={cIdx === -1 ? null : ongoingChats[cIdx]} />
      </Box>
    </Grid>
  );
}
