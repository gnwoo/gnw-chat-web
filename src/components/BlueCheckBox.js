import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { blue } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

const GreenCheckbox = withStyles({
    root: {
      '&$checked': {
        color: blue[500],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

export default function SignUpSuccessAlert(props) {
    return(
        <FormControlLabel
            control={<GreenCheckbox name="GreenCheckBox" checked={props.checked} onChange={props.onChange}/>}
            label={<div style={{fontWeight: "bold", color: "#757575"}}>{props.label}</div>}
        />
    )
}