import React, { useState } from 'react';
import { Text } from "grommet";

function Contact({ chatInfo }) {
  const [textInput, setTextInput] = useState('');
  
  return (
    <Text weight="bold" size="20px">
    {chatInfo && chatInfo.displayName}
  </Text>
  );
}

export default Contacts;
