import React, { useState } from 'react';
import { Accordion, AccordionPanel, Box, Grid } from "grommet";

import ContactList from './ContactList';
import ContactListItem from './ContactListItem';
import SearchBox from './SearchBox';
import "./App.css"

const requests = [
  { username: "luoxiaolei", displayName: "Xiaolei Luo", cID: "cid_luoxiaolei_mantinglin" },
  { username: "zhangjiayi", displayName: "Jiayi Zhang", cID: "cid_mantinglin_zhangjiayi" } ];

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

export default function ContactView() {
  const [contactIdx, setContactIdx] = useState(-1);

  return (
    <Grid
      fill
      rows={['60px', 'auto']}
      columns={['260px', 'auto']}
      areas={[
        { name: 'search-bar', start: [0, 0], end: [0, 0] },
        { name: 'contact-view-functions', start: [0, 1], end: [0, 1] },
        { name: 'info-card', start: [1, 0], end: [1, 1] },
      ]}
    >
      <Box gridArea="search-bar" justify="center" align="center" border="bottom">
        <SearchBox />
      </Box>
      
      <Box gridArea="contact-view-functions">
        <Accordion>
          <AccordionPanel label="Friend Request" height="50px">
            {requests.map((req, index) => (
              <ContactListItem key={index} index={index} contactItem={req} contactIdx={contactIdx} setContactIdx={setContactIdx} />
            ))}
          </AccordionPanel>

          <AccordionPanel label="Pending Invite" height="50px">
            {requests.map((req, index) => (
              <ContactListItem key={index} index={index} contactItem={req} contactIdx={contactIdx} setContactIdx={setContactIdx} />
            ))}
          </AccordionPanel>

          <AccordionPanel label="Contacts" height="50px">
            <Box style={{ height: "calc(100vh - 213px)" }} overflow="auto">
              <ContactList contactIdx={contactIdx} setContactIdx={setContactIdx} />
            </Box>
          </AccordionPanel>
        </Accordion>
      </Box>
      
      <Box gridArea="info-card" width={{ min: "600px" }}  border="left">
        {contactIdx !== -1 &&
          contacts[contactIdx].displayName + " " + contacts[contactIdx].username
        }
      </Box>
    </Grid>
  );
}
