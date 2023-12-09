import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function Toast({msg , type, setToastpopup}) {
    React.useEffect(()=>{
        setTimeout(() => {
             setToastpopup(false)
        }, 2000);
    })
  return (
    <Stack className='absolute top-5 ' sx={{ width: '30%' }} spacing={2}>
      <Alert variant="filled" severity={type}>
        {msg}
      </Alert>
      {/* <Alert variant="filled" severity="warning">
        This is a warning alert — check it out!
      </Alert>
      <Alert variant="filled" severity="info">
        This is an info alert — check it out!
      </Alert>
      <Alert variant="filled" severity="success">
        This is a success alert — check it out!
      </Alert> */}
    </Stack>
  );
}