import React from 'react';

import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { urls } from '@/utils/urls';

const {rootPath} = urls();

const getProfileData = async (userId: string) => {
  const res = await fetch(`${rootPath}/api/profile/${userId}`)
    .catch(err => console.log("err when fetching profile data", err));

  const resJson = await res?.json(); 
  return resJson;
};  

const getUserBooksData = async (userId: string) => {
  const res = await fetch(`${rootPath}/api/user-books/${userId}`)
    .catch(err => console.log("err when fetcching books", err));

  const resJson = await res?.json(); 
  return resJson;
};  

const SuggestionsResults = async () => {
  const session = await getServerSession(authOptions); 
  const userId = session?.user.user._id; 

  const profileData = await getProfileData(userId); 
  const profileId = profileData.profile?.id; 
  
  const userBooks = await getUserBooksData(profileId); console.log({userBooks, profileData, userId});

  return (
    <section>SuggestionsResults</section>
  )
}

export default SuggestionsResults;