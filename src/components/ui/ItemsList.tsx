import React from 'react'

import List from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';


export const ListItem = ({children, className, noDivider = true}) =>(
   <>
    <MuiListItem alignItems="flex-start" className={className}>
       {children}
    </MuiListItem>
    {!noDivider &&
      <Divider
         sx={{margin: "10px 0"}} 
         variant="inset" 
         component="li" 
      />}
 </>
);

export const ItemsList = ({children, className}) => {

   return (
      <List 
         className={className}
         sx={{ 
            width: '100%', 
            bgcolor: 'background.paper' 
         }}>
         {children}
      </List>
   )
   
}