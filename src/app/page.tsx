import React from 'react';
import { NextPage } from 'next';

import Box from '@mui/material/Box';

import { SuggestionsCriteria } from '@/components/home/suggestionsCriteria/SuggestionsCriteria';
import { SuggestionsResults } from '@/components/home/suggestionsResults/SuggestionsResults';

const Home: NextPage = () => {
  return (
    <Box>
        <SuggestionsCriteria />
        <SuggestionsResults />     
    </Box>
  )
}

export default Home;