import React from 'react';
import Tabs from '@/components/ui/Tabs';
import { Box } from '@mui/material';
import { MyBooksList } from './parts/MyBooksList';

 export const MyBooks = () => {

   return (
      <Box sx={{marginTop: "20px"}}>
         <Tabs 
            ariaLabel='książki użytkownika'
            orientation='horizontal'
            items={[
            { 
               panel: <MyBooksList flag='is_favourite'/>, 
               tab: { label: "Ulubione"} 
            },
            { 
               panel: <MyBooksList flag='is_read' />,
               tab: { label: "Przeczytane"} 
            },
            ]}
         />
      </Box>
   )
};
