import React from 'react';

import FormLabel from '@mui/material/FormLabel';

interface WithLabelProps{
   id: string;
   children: React.ReactNode;
   text: string;
}

export const WithLabel = ({id, children, text}: WithLabelProps) =>(
   <>
      <FormLabel
         htmlFor={id}
         sx={{
            visibility: "hidden",
            width: 0,
            height: 0 
         }}
      >
      {text}
      </FormLabel>
      {children}   
   </>
  )
