"use client";
import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Toolbar, IconButton, Typography, Menu, Container, Box} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { SettingsMenu } from './parts/SettingsMenu';

import { MainMenuList } from './parts/MainMenuList';
import { SearchBook } from '../searchBook/SearchBook';

export const Header = () => {
   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
 
   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
     setAnchorElNav(event.currentTarget);
   };
 
   const handleCloseNavMenu = () => {
     setAnchorElNav(null);
   };
 
  return (
   <AppBar position="static" sx={{padding: "10px 0"}}>
      <Container>
         <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
               MyBook
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
               <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
               >
               <MenuIcon />
               </IconButton>
            
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
               MyBook
            </Typography>
            <MainMenuList handleCloseNavMenu={handleCloseNavMenu}/>
            <SearchBook />
            <SettingsMenu />
         </Toolbar>
   </Container>
 </AppBar>
  )
}
