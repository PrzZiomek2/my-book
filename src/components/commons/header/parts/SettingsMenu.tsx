import React, { FC } from 'react';
import {useSession, signIn, signOut} from 'next-auth/react';

import { IconButton, Typography, Menu, Tooltip, MenuItem } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Link from 'next/link';

interface SettingsProps {

}

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
    <div>
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
         {isUserLogged && <p>Witaj {session.user?.user?.name}!</p>}
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
    </div>
  ) 
}

