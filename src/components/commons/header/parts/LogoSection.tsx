import React from 'react'

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LibraryIcon from '@mui/icons-material/LocalLibrary';
import { Name } from '@/types/enums';

export const LogoSection = () => {
  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      marginBottom: "5px",
      flexGrow: { xs: 1, md: 0 }
    }}>
      <LibraryIcon 
         sx={{ 
            fontSize: "1.7rem",
            display: 'flex',
            mr: 1  
         }} 
      />
      <Typography
         variant="h6"
         noWrap
         component="a"
         href="/"
         sx={{
            mr: 2,
            display: "flex",
            fontFamily: 'monospace',
            fontWeight: 700,
            fontSize: "1.4rem",
            letterSpacing: '2px',
            color: 'inherit',
            textDecoration: 'none',
            height: "42px"
         }}
      >
         {Name.APP}
      </Typography>
    </Box>
  )
}
