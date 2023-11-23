import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Toolbar, Container } from '@mui/material';
import { SettingsMenu } from './parts/SettingsMenu';

import { MainMenuList } from './parts/MainMenuList';
import { SearchBook } from '../searchBook/SearchBook';
import { LogoSection } from './parts/LogoSection';

export const Header = () => {

  return (
   <AppBar 
      position="static" 
      sx={{padding: "10px 0"}}
   >
      <Container>
         <Toolbar disableGutters>     
            <LogoSection />
            <MainMenuList/>
            <SearchBook />
            <SettingsMenu />
         </Toolbar>
   </Container>
 </AppBar>
  )
}
