"use client";
import React, { FC } from 'react';

import {useSession, signIn, signOut} from 'next-auth/react';
import Link from 'next/link';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

export const SettingsMenu: FC = () =>{

   const {data: session} = useSession();
   const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
   const isUserLogged = session && session.user;

   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };

   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
   };

  return (
   <Box sx={{ flexGrow: 0 }}>
       <Tooltip title="Ustawienia użytkownika">
         <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
         </IconButton>
      </Tooltip>
      <Menu
         sx={{ 
            mt: '45px',
            padding: "12px"
          }}
         id="menu-appbar"
         anchorEl={anchorElUser}
         anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
         }}
         disableScrollLock={true}
         transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
         }}
         open={Boolean(anchorElUser)}
         onClose={handleCloseUserMenu}
       >
         {isUserLogged && <Typography textAlign="center">Witaj {session.user?.user?.name}!</Typography>}
         {isUserLogged && ( 
            <MenuItem onClick={handleCloseUserMenu}>
               <Link aria-current="page" href="/profile">
                  <Typography textAlign="center">Profil</Typography>
               </Link>
            </MenuItem>
         )}
         {isUserLogged && ( 
            <MenuItem onClick={handleCloseUserMenu}>  
               <Link aria-current="page" href="/account">
                  <Typography textAlign="center">Konto</Typography>
               </Link>
            </MenuItem>
         )}
         <MenuItem onClick={() => isUserLogged ? signOut() : signIn()}>
            <Typography textAlign="center">{isUserLogged ? "Wyloguj się" : "Zaloguj się"}</Typography>
         </MenuItem>
         {!isUserLogged && ( 
            <MenuItem onClick={handleCloseUserMenu}>
               <Link aria-current="page" href="/register">
                  <Typography textAlign="center">Załóż konto</Typography>
               </Link>
            </MenuItem>)
            }
      </Menu>
    </Box>
  ) 
}

