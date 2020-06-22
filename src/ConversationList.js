import React from 'react';
import { List } from "grommet";

import ChatListItem from "./ChatListItem"

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

export default function ConversationList({ cIdx, setCIdx }) {
  return (
    <List data={ongoingChats} pad={{ }} margin={{ top: "-1px" }}>
      {(chatItem, index) => (
        <ChatListItem key={index} index={index} chatItem={chatItem} cIdx={cIdx} setCIdx={setCIdx} />
      )}
    </List>
  );
}
