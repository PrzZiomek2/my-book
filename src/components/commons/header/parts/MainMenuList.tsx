import React from 'react';

import Box from '@mui/material/Box';
import ButtonLink from '@/components/ui/ButtonLink';

interface MainMenuListProps{
  handleCloseNavMenu: () => void;
}

export const MainMenuList = ({handleCloseNavMenu}: MainMenuListProps) => {
  return (
    <Box sx={{ 
      flexGrow: 1, 
      display: { xs: 'none', md: 'flex' },
      marginLeft: "10px" 
   }} >
      <ButtonLink 
         linkHref="/" 
         className='mainMenu'
         handleClick={() => handleCloseNavMenu()}
      >
        GŁÓWNA
      </ButtonLink>

      <ButtonLink 
         linkHref="/forum" 
         className='mainMenu'
         handleClick={() => handleCloseNavMenu()}
      >
        FORUM
      </ButtonLink>

      <ButtonLink 
         linkHref="/about" 
         className='mainMenu'
         handleClick={() => handleCloseNavMenu()}
      >
        O NAS
      </ButtonLink>
   </Box>
  )
}
