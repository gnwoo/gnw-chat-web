import React from 'react';
import { List } from "grommet";

import ChatListItem from "./ChatListItem"

const ongoingChats = [ ];

export default function ConversationList({ cIdx, setCIdx }) {
  return (
    <List data={ongoingChats} pad={{ }} margin={{ top: "-1px" }}>
      {(chatItem, index) => (
        <ChatListItem key={index} index={index} chatItem={chatItem} cIdx={cIdx} setCIdx={setCIdx} />
      )}
    </List>
  );
}
