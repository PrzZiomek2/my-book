import React from 'react';
import { NextPage } from 'next';

import Box from '@mui/material/Box';

import { SuggestionsCriteria } from '@/components/home/suggestionsCriteria/SuggestionsCriteria';

const Home: NextPage = () => {
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
        <SuggestionsCriteria />  
    </Box>
  )
}

export default Home;