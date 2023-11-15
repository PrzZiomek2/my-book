import React from 'react';

import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { urls } from '@/utils/urls';
import { CustomBook, Profile, UserPreferences, UserPreferencesParsed } from '@/types/interfaces';
import { SuggestionsResults } from '@/components/suggestions/SuggestionsResults';
import { getApiData, getBooksInfo } from '@/utils/handlers';
import { Box } from '@mui/material';

const {rootPath} = urls();

export default async function Suggestions(){
   const session = await getServerSession(authOptions); 
   const userId = session?.user.user._id; 
 
   const profileData = await getApiData<{profile: Profile}>(`${rootPath}/api/profile/${userId}`); 
   const profileId = profileData?.profile.id; 
   
   const userBooks = await getApiData<{books: CustomBook[]}>(`${rootPath}/api/user-books/${profileId}`); 
   
   return (
      <Box sx={{
         display: "flex",
         justifyContent: "center",
         marginTop: "40px"
      }}>
         <SuggestionsResults 
            tags={profileData.profile.tags.join(",")}
            read={getBooksInfo(userBooks.books, "is_read")}
            favourite={getBooksInfo(userBooks.books, "is_favourite")}
         />
      </Box>
    )
}

