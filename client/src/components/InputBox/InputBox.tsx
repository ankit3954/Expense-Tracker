import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { InputBoxProps } from '../../types/types';

const BasicInputBox: React.FC<InputBoxProps>= ({id, label, handleChange, value}) => {
  return (
    <Box
      component="form"
    //   sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
    //   noValidate
      autoComplete="off"
    >
      <TextField id={id} label={label} variant="filled" value={value}  onChange={e => handleChange(e)}/>
    </Box>
  );
}

export default BasicInputBox
