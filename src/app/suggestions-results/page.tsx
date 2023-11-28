import React from 'react';

import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { urls } from '@/utils/urls';
import { CriteriaFormData, CustomBook, Profile } from '@/types/interfaces';
import { SuggestionsResults } from '@/components/suggestions/SuggestionsResults';
import { getApiData, getBooksInfo } from '@/utils/handlers';

import Box from '@mui/material/Box';

const {rootPath} = urls();

export default async function Suggestions({searchParams}: { searchParams: { fromProfile: string }}){
   const session = await getServerSession(authOptions); 
   const userId = session?.user.user._id; 
   const {fromProfile} = searchParams;
   let temperature = 0.2;
   let readBooks = "";
   let favouriteBooks = "";
   let tags = "";
 
   const profileData = await getApiData<{profile: Profile}>(`${rootPath}/api/profile/${userId}`); 
   const profileId = profileData?.profile.id; 

   const customBooksAndTags = await getApiData<{data: CriteriaFormData}>(`${rootPath}/api/user/${userId}/criteria-form`)
      .catch(err => console.log(err)); 
   const {data} = customBooksAndTags || {};

   if(data){
      readBooks = data?.readBooks.join(",");
      favouriteBooks = data?.favouriteBooks.join(",");  
      tags = data?.tags?.join(",");
      if(data.isCreative){
         temperature = 1
      }
   };
   
   if(fromProfile){
      const userBooks = await getApiData<{books: CustomBook[]}>(`${rootPath}/api/user-books/${profileId}`); 
      tags = profileData.profile.tags.join(",");
      readBooks = getBooksInfo(userBooks.books, "is_read");
      favouriteBooks = getBooksInfo(userBooks.books, "is_favourite");
   };
   
   return (
      <Box sx={{
         display: "flex",
         justifyContent: "center",
         marginTop: "40px"
      }}> 
        <SuggestionsResults 
            tags={tags}
            read={readBooks}
            favourite={favouriteBooks}
            temperature={temperature}
         />
      </Box>
    )
}

