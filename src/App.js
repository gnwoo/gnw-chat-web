import React from 'react';
import { Box, Grid } from "grommet";

import Sidebar from "./Sidebar"
import ChatView from "./ChatView"
import ContactView from "./ContactView"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarSelection: 0,
      contacts: [
        { username: "luoxiaolei", displayName: "Xiaolei Luo", cID: "cid_mantinglin_luoxiaolei" },
        { username: "zhangjiayi", displayName: "Jiayi Zhang", cID: "cid_mantinglin_zhangjiayi" },
        { username: "zhangjiayi", displayName: "Jiayi Zhang", cID: "cid_mantinglin_zhangjiayi" },
        { username: "zhangjiayi", displayName: "Jiayi Zhang", cID: "cid_mantinglin_zhangjiayi" },
        { username: "zhangjiayi", displayName: "Jiayi Zhang", cID: "cid_mantinglin_zhangjiayi" },
        { username: "zhangjiayi", displayName: "Jiayi Zhang", cID: "cid_mantinglin_zhangjiayi" },
        { username: "zhangjiayi", displayName: "Jiayi Zhang", cID: "cid_mantinglin_zhangjiayi" },
        { username: "zhangjiayi", displayName: "Jiayi Zhang", cID: "cid_mantinglin_zhangjiayi" },
        { username: "zhangjiayi", displayName: "Jiayi Zhang", cID: "cid_mantinglin_zhangjiayi" },
        { username: "zhangjiayi", displayName: "Jiayi Zhang", cID: "cid_mantinglin_zhangjiayi" },
        { username: "zhangjiayi", displayName: "Jiayi Zhang", cID: "cid_mantinglin_zhangjiayi" },
        { username: "zhangjiayi", displayName: "Jiayi Zhang", cID: "cid_mantinglin_zhangjiayi" } ]
    };
  }

  componentDidMount() {

  }

  render() {
    let rightComp;
    if (this.state.sidebarSelection === 0) {
      rightComp = <ChatView />
    } else {
      rightComp = <ContactView />
    }

    return (
      <div>
        <Grid
          fill
          rows={['100vh']}
          columns={['60px', 'auto']}
          areas={[
            { name: 'sidebar', start: [0, 0], end: [0, 0] },
            { name: 'main-view', start: [1, 0], end: [1, 0] },
          ]}
        >
          <Box gridArea="sidebar">
            <Sidebar sidebarSelectionHandle={(index) => this.setState({ sidebarSelection: index }) }/>
          </Box>
          <Box gridArea="main-view">
            {rightComp}
          </Box>
        </Grid>
      </div>
    );
  }
}
