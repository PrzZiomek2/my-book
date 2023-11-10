import React from 'react'

import Link from 'next/link'; 

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

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
  )
}
