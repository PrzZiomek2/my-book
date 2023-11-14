"use client"
import React, { FC, useEffect, useState } from 'react';

import { urls } from '@/utils/urls';
import { UserPreferencesParsed } from '@/types/interfaces';

const {rootPath} = urls();

interface SuggestionsResultsProps{
  profile: UserPreferencesParsed
}

export const SuggestionsResults: FC<SuggestionsResultsProps> = ({profile}) => {
  const [suggestionNames, setSuggestionNames ] = useState();

  useEffect(() => {
    const fetchUserSuggestions = async (data: UserPreferencesParsed ) => {
      const res = await fetch(`${rootPath}/api/suggestions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      .catch(err => console.log("err when fetcching suggestions", err));
    
      const resJson = await res?.json(); 
      
      if(resJson){
        setSuggestionNames(JSON.parse(resJson.completion));
      }
    };  
    
    fetchUserSuggestions(profile);

  }, [profile])

 console.log({suggestionNames});

  return (
   <div>sugestie</div>
  )
}
