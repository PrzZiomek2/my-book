import React from 'react'

import List from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';

interface ListItem{
   children: React.ReactNode;
   className?: string;
   noDivider?: boolean; 
}

export const ListItem = ({children, className, noDivider}: ListItem) =>(
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

interface ItemsList{
   children: React.ReactNode;
   className?: string;
}

export const ItemsList = ({children, className}: ItemsList) => {

   return (
      <List 
         className={className}
         sx={{ 
            width: '100%', 
            maxWidth: "1200px"
         }}>
         {children}
      </List>
   )
   
}