import React from 'react';
import { List } from "grommet";

import ContactListItem from "./ContactListItem"
import { contacts } from './helper';

export default function ContactList({ infoCardHandler, contactIdx }) {
  return (
    <List data={contacts} pad={{ }} margin={{ top: "-1px" }}>
      {(contact, index) => (
        <ContactListItem key={index} infoCardHandler={infoCardHandler} index={index} contactIdx={contactIdx} contactItem={contact} />
      )}
    </List>
  );
}
