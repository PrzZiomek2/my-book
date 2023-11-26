import React from 'react'

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import LibraryIcon from '@mui/icons-material/LocalLibrary';
import { Name } from '@/types/enums';

export const LogoSection = () => {
  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      marginBottom: "5px"
    }}>
      <LibraryIcon 
         sx={{ 
            fontSize: "1.7rem",
            display: { 
               xs: 'none', 
               md: 'flex' 
            }, 
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
               display: { xs: 'none', md: 'flex' },
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

         <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
               size="large"
               aria-label="account of current user"
               aria-controls="menu-appbar"
               aria-haspopup="true"
               color="inherit"
            >
            <MenuIcon />
            </IconButton>
         
         </Box>
         <LibraryIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
         <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
               mr: 2,
               display: { xs: 'flex', md: 'none' },
               flexGrow: 1,
               fontFamily: 'monospace',
               fontWeight: 700,
               letterSpacing: '.3rem',
               color: 'inherit',
               textDecoration: 'none',
            }}
         >
            s
         </Typography>
    </Box>
  )
}
