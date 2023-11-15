import React from 'react';

import Box from '@mui/material/Box';

import CircularProgress from '@mui/material/CircularProgress';

interface LoaderProps {
   children: React.ReactNode | React.ReactNode[];
   isLoading: boolean;
}

export const Loader: React.FC<LoaderProps> = ({children, isLoading}) => {

   return (
      isLoading ? ( 
         <Box sx={{
            width: "100%", 
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
         }}>
            <CircularProgress />
         </Box>
      ) : 
      <>{children}</>
   )
   }