import React from 'react';
import { Button, Box, Grid, TextInput } from "grommet";
import { Search } from "grommet-icons";

export default class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchInput: "" };
  }

  searchContact = (searchInput) => {
    fetch("http://localhost:8080/contact-search?username=" + searchInput, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include'
    })
    .then(res =>  {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(); 
      }
    })
    .then(json => {
      this.props.setQueriedUser(json);
      this.props.infoCardHandler(0, 0);
    })
    .catch(error => {
      console.log(error)
    });
  }

  render () {
    return (
      <Grid
        fill
        rows={['100%']}
        columns={['85%', '15%']}
        areas={[
          { name: 'search-box', start: [0, 0], end: [0, 0] },
          { name: 'search-button', start: [1, 0], end: [1, 0] },
        ]}
      >
        <Box gridArea="search-box" justify="center" align="center">
          <TextInput
            plain={true}
            placeholder="Add Friend Here"
            value={this.state.searchInput}
            onChange={event => this.setState({ searchInput: event.target.value })}
          />
        </Box>

        <Box gridArea="search-button" justify="center" align="center">
          <Button
            focusIndicator={false}
            onClick={() => this.searchContact(this.state.searchInput)}
          >
            <Search />
          </Button>
        </Box>
      </Grid>
    );
  }
}
