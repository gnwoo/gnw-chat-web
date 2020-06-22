import React, { useState } from 'react';
import { Button, Box, Grid, TextInput } from "grommet";
import { Search } from "grommet-icons";

export default function SearchBox() {
  const [searchInput, setSearchInput] = useState("");

  const searchUser = () => {
    
  }

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
          value={searchInput}
          onChange={event => setSearchInput(event.target.value)}
        />
      </Box>

      <Box gridArea="search-button" justify="center" align="center">
        <Button
          focusIndicator={false}
          onClick={searchUser}
        >
          <Search />
        </Button>
      </Box>
    </Grid>
  );
}
