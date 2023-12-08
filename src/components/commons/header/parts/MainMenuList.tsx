import React from 'react';

import Box from '@mui/material/Box';
import ButtonLink from '@/components/ui/ButtonLink';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

interface MainMenuListProps{
}

export const MainMenuList = () => (
   <Box>
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
         <Box 
            sx={{ 
               flexGrow: 1, 
               display: { xs: 'flex', md: 'none' },
               marginRight: { xs: "10px", md: 0 }
            }}
         >
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
   </Box>
  )

