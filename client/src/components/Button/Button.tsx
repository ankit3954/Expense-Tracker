import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {ButtonProps} from "../../types/types"

const BasicButton: React.FC<ButtonProps>= ({label, handleFunc}) =>  {
  return (
    //   <Button variant="text">Text</Button>
      <Button variant="contained" onClick={handleFunc}>{label}</Button>
    //   <Button variant="outlined">Outlined</Button>
  
  );
}

export default BasicButton
