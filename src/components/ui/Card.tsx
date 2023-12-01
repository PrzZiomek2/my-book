import React from 'react';

import CardMUI, {CardProps} from '@mui/material/Card';

export const Card = ({children, ...props}: CardProps) => (
      <CardMUI
         {...props}
         sx={{ 
            display: "flex",
            padding: "20px",
            border: "1px solid blueviolet",
            gap: "20px",
            width: "100%",
            justifyContent: "space-between",
            maxWidth: "1200px"
         }}
      >
         {children}
      </CardMUI>
  );
