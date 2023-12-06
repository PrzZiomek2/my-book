"use client"
import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import { Toolbar, Container } from '@mui/material';
import { SettingsMenu } from './parts/SettingsMenu';

import { MainMenuList } from './parts/MainMenuList';
import { SearchBook } from '../searchBook/SearchBook';
import { LogoSection } from './parts/LogoSection';
import { MediaViewportContext } from '@/context/MediaViewportProvider';

export const Header = () => {

   const {isWidescreenMax} = useContext(MediaViewportContext); console.log(isWidescreenMax);
    
  return (
   <AppBar 
      position="static" 
      sx={{padding: "10px 0"}}
   >
      <Container 
         sx={{
            maxWidth: isWidescreenMax ? "1200px" : "none"
         }}
      >
         <Toolbar disableGutters>     
            <LogoSection />
            <MainMenuList/>
            {!isWidescreenMax && <SearchBook />}
            <SettingsMenu />
         </Toolbar>
         {isWidescreenMax && <SearchBook />}
   </Container>
 </AppBar>
  )
}
