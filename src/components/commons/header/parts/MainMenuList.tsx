import React from 'react';

import Box from '@mui/material/Box';
import ButtonLink from '@/components/ui/ButtonLink';

interface MainMenuListProps{
}

export const MainMenuList = () => (
    <Box sx={{ 
      flexGrow: 1, 
      display: { xs: 'none', md: 'flex' },
      marginLeft: "10px" 
   }} >
      <ButtonLink 
         linkHref="/" 
         className='mainMenu'
      >
        GŁÓWNA
      </ButtonLink>

      <ButtonLink 
         linkHref="/ranking" 
         className='mainMenu'
      >
        RANKING
      </ButtonLink>

      <ButtonLink 
         linkHref="/about" 
         className='mainMenu'
      >
        O NAS
      </ButtonLink>
   </Box>
  )

