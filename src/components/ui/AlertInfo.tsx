import * as React from 'react';
import Box from '@mui/material/Box';
import Alert, { AlertColor } from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

interface AlertInfoProps{
   content: string;
   type?: AlertColor;
   expand: boolean;
}

export const AlertInfo: React.FC<AlertInfoProps> = ({content, type = "error", expand}) =>  {
  const [expanded, setExpanded] = React.useState(expand);

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={expanded}>
        <Alert
         variant="filled" 
         severity={type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setExpanded(false);
              }}
            >
              <CloseIcon  />
            </IconButton>
          }
          sx={{ mb: 2 , position: "absolute"}}
        >
          {content}
        </Alert>
      </Collapse>
    </Box>
  );
}
