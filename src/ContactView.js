import React from 'react';
import { Accordion, AccordionPanel, Box, Grid } from "grommet";

import ContactList from './ContactList';
import ContactListItem from './ContactListItem';
import ContactInfoCard from './ContactInfoCard';
import SearchBox from './SearchBox';
import "./App.css"

import { contacts } from './helper';

export default class ContactView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSourceIndex: -1,
      dataEntryIndex: -1,
      queriedUser: [],
      contactRequests: [{ id: -1, username: "default_username", displayName: "Display Name" }],
      contactInvites: [{ id: -1, username: "default_username", displayName: "Display Name" }],
      contact: contacts
    };
  }

  infoCardSetUp = (dataSourceIndex, dataEntryIndex) => {
    this.setState({
      dataSourceIndex: dataSourceIndex,
      dataEntryIndex: dataEntryIndex
    });
  }

  addInvite = (invite) => {
    this.setState({ contactInvites: [invite, ...this.state.contactInvites] });
  }

  render () {
    let infoCard;
    if (this.state.dataSourceIndex === 0) {
      infoCard = <ContactInfoCard dataSourceIndex={this.state.dataSourceIndex}
                                  contactInfo={this.state.queriedUser[this.state.dataEntryIndex]}
                                  infoCardHandler={this.infoCardSetUp}
                                  additionHandler={this.addInvite} />
    } else if (this.state.dataSourceIndex === 1) {
      infoCard = <ContactInfoCard dataSourceIndex={this.state.dataSourceIndex}
                                  contactInfo={this.state.contactRequests[this.state.dataEntryIndex]}
                                  infoCardHandler={this.infoCardSetUp}
                                  additionHandler={() => {}} />
    } else if (this.state.dataSourceIndex === 2) {
      infoCard = <ContactInfoCard dataSourceIndex={this.state.dataSourceIndex}
                                  contactInfo={this.state.contactInvites[this.state.dataEntryIndex]}
                                  infoCardHandler={this.infoCardSetUp}
                                  additionHandler={() => {}} />
    } else if (this.state.dataSourceIndex === 3) {
      infoCard = <ContactInfoCard dataSourceIndex={this.state.dataSourceIndex}
                                  contactInfo={this.state.contact[this.state.dataEntryIndex]}
                                  infoCardHandler={this.infoCardSetUp}
                                  additionHandler={() => {}} />
    }

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
          <SearchBox infoCardHandler={this.infoCardSetUp} setQueriedUser={(queriedUser) => this.setState({ queriedUser: [queriedUser] })} />
        </Box>
        
        <Box gridArea="contact-view-functions">
          <Accordion>
            <AccordionPanel label="Friend Request" height="50px">
            </AccordionPanel>

            <AccordionPanel label="Pending Invite" height="50px">
              {this.state.contactInvites.map((invite, index) => {
                return (
                  <ContactListItem key={index} infoCardHandler={(index) => this.infoCardSetUp(2, index)} index={index} contactIdx={this.state.dataEntryIndex} contactItem={invite}  />
                );
              })}
            </AccordionPanel>

            <AccordionPanel label="Contacts" height="50px">
              <Box style={{ height: "calc(100vh - 213px)" }} overflow="auto">
                <ContactList infoCardHandler={(index) => this.infoCardSetUp(3, index)} contactIdx={this.state.dataEntryIndex} />
              </Box>
            </AccordionPanel>
          </Accordion>
        </Box>
        
        <Box gridArea="info-card" width={{ min: "600px" }}  border="left">
          { infoCard }
        </Box>
      </Grid>
    );
  }
}
