"use client"
import React, { useContext } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

import { SettingsMenu } from './parts/SettingsMenu';
import { MainMenuList } from './parts/MainMenuList';
import { SearchBook } from '../searchBook/SearchBook';
import { LogoSection } from './parts/LogoSection';
import { MediaViewportContext } from '@/context/MediaViewportProvider';

export const Header = () => {

   const {isWidescreenMax} = useContext(MediaViewportContext); 
    
  return (
   <AppBar 
      position="static" 
      sx={{padding: "10px 0"}}
   >
      <Container>
         <Box
          sx={{
            margin: "auto",
            maxWidth: isWidescreenMax ? "1200px" : "none"
          }}
         >
            <Toolbar 
               sx={{
                  justifyContent: { xs: "flex-end", md: "flex-start" },
                  marginTop: { xs: "10px", md: 0 }
               }} 
               disableGutters
            >     
               <LogoSection />
               <MainMenuList/>
               {!isWidescreenMax && <SearchBook />}
               <SettingsMenu />
            </Toolbar>
            {isWidescreenMax && <SearchBook />}
         </Box>
   </Container>
 </AppBar>
  )
}
