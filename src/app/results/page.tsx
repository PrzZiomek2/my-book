import React from 'react'

import Box from '@mui/material/Box';

import { SearchResults } from '@/components/results/SearchResults'
  
export default function Results() {
   return (
   <Box
      sx={{
         display: "flex",
         justifyContent: "center"
      }}
   >
      <SearchResults/>
   </Box>
   )
}
