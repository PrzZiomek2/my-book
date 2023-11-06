"use client";
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Toolbar, IconButton, Typography, Menu, Container} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { SettingsMenu } from './parts/SettingsMenu';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export const Header = () => {
   const {data: session} = useSession();
   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
 
   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
     setAnchorElNav(event.currentTarget);
   };
 
   const handleCloseNavMenu = () => {
     setAnchorElNav(null);
   };
 
  return (
   <AppBar position="static" sx={{padding: "10px 0"}}>
      <Container classes={{root: "container_custom"}}>
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
            <Box sx={{ 
               flexGrow: 1, 
               display: { xs: 'none', md: 'flex' },
               marginLeft: "10px" 
            }} >
               <Button
                  onClick={handleCloseNavMenu}
                  className='mainMenu'
               >
                  <Link href="/">
                     GŁÓWNA
                  </Link>
               </Button> 
               <Button
                  onClick={handleCloseNavMenu}
                  className='mainMenu'
               >
                  <Link href="/forum">
                     FORUM
                  </Link>           
               </Button>
               <Button
                  onClick={handleCloseNavMenu}
                  className='mainMenu'
               >
                  <Link href="/users">
                     UŻYTKOWNICY
                  </Link>
               </Button>
               <Button
                  onClick={handleCloseNavMenu}
                  className='mainMenu'
               >
                  <Link href="/about">
                     O NAS
                  </Link>
               </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
               <SettingsMenu />
            </Box>
         </Toolbar>
   </Container>
 </AppBar>
  )
}
