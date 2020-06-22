import React from 'react';
import { List } from "grommet";

import ContactListItem from "./ContactListItem"

const contacts = [
  { username: "luoxiaolei", displayName: "Xiaolei Luo", cID: "cid_luoxiaolei_mantinglin" },
  { username: "zhangjiayi", displayName: "Jiayi Zhang", cID: "cid_mantinglin_zhangjiayi" },
  { username: "luoxiaolei", displayName: "Xiaolei Luo", cID: "cid_luoxiaolei_mantinglin" },
  { username: "zhangjiayi", displayName: "Jiayi Zhang", cID: "cid_mantinglin_zhangjiayi" },
  { username: "luoxiaolei", displayName: "Xiaolei Luo", cID: "cid_luoxiaolei_mantinglin" },
  { username: "zhangjiayi", displayName: "Jiayi Zhang", cID: "cid_mantinglin_zhangjiayi" },
  { username: "luoxiaolei", displayName: "Xiaolei Luo", cID: "cid_luoxiaolei_mantinglin" },
  { username: "zhangjiayi", displayName: "Jiayi Zhang", cID: "cid_mantinglin_zhangjiayi" },
  { username: "luoxiaolei", displayName: "Xiaolei Luo", cID: "cid_luoxiaolei_mantinglin" },
  { username: "zhangjiayi", displayName: "Jiayi Zhang", cID: "cid_mantinglin_zhangjiayi" },
  { username: "luoxiaolei", displayName: "Xiaolei Luo", cID: "cid_luoxiaolei_mantinglin" },
  { username: "zhangjiayi", displayName: "Jiayi Zhang", cID: "cid_mantinglin_zhangjiayi" } ];

export default function ContactList({ contactIdx, setContactIdx }) {

  return (
    <List data={contacts} pad={{ }} margin={{ top: "-1px" }}>
      {(contact, index) => (
        <ContactListItem key={index} index={index} contactItem={contact} contactIdx={contactIdx} setContactIdx={setContactIdx} />
      )}
    </List>
  );
}
