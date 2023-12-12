"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';

import { InputTags } from '@/components/commons/inputTags/InputTags';
import { urls } from '@/utils/urls';
import { CriteriaFormData } from '@/types/interfaces';
import Tooltip from '@mui/material/Tooltip';
import { Button } from '@mui/material';

const {rootPath} = urls();

const CriteriaForm = () => {
  const {data: session} = useSession();
  const userId = session?.user.user._id;
  const { data } = useSWR<{data: CriteriaFormData}>(`${rootPath}/api/user/${userId}/criteria-form`);
  const router = useRouter();

  const [formData, setFormData] = useState<CriteriaFormData>({
    readBooks: [],
    favouriteBooks: [],
    isCreative: false,
    tags: []   
 }); 

  useEffect(() =>{ 
      if(!data?.data) return;
      setFormData(data?.data)
  }, [data?.data]); 

 const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  const res = await fetch(`${rootPath}/api/user/${userId}/criteria-form`, {
      method: "POST",
      body: JSON.stringify(formData), 
      cache: "no-cache"
    })
    .catch(err => console.log("err when adding opinion", err));

    const resJson = await res?.json();

    if(resJson){
      router.replace("/suggestions-results");
    }

  };


 const handleInputChange = (key: string, v: string[] | boolean) =>{
    setFormData(prev => ({
      ...prev,
      [key]: v
    }))
  }
 
  return (
    <form onSubmit={handleFormSubmit}>
      <Box
        sx={{
          width: '100%',
          flexDirection: 'column',
          margin: '20px 0',
        }}
      >
          <Box sx={{ marginBottom: "25px" }}>
            <label htmlFor='tags'>Tagi</label>
            <InputTags 
              id="tags"
              setTags={tags => handleInputChange("tags", tags)}
              tags={formData.tags}
            />
          </Box>
          <Box sx={{ marginBottom: "25px" }}>
            <label htmlFor='readBooks'>Przeczytane książki</label>
            <InputTags 
              id="readBooks"
              setTags={read => handleInputChange("readBooks", read)}
              tags={formData.readBooks}
            />
          </Box>
          <Box sx={{ marginBottom: "25px" }}>
            <label htmlFor='favouriteBooks'>Ulubione książki</label>
            <InputTags 
              id="favouriteBooks"
              setTags={fav => handleInputChange("favouriteBooks", fav)}
              tags={formData.favouriteBooks}
            />
          </Box>
          <Box sx={{ marginBottom: "25px" }}>
            <label htmlFor="isCreative">Kreatywnie</label>
            <Checkbox
              id='isCreative'
              name='isCreative'
              color="primary"
              value={formData.isCreative}
              onChange={(e) =>  handleInputChange("isCreative", e.currentTarget.checked)}
            />
          </Box>
          <Tooltip title={!userId ? "zaloguj się w celu koprzystania z sugestii" : ""}>
            <div>       
              <Button
                type="submit" 
                variant="contained" 
                sx={{ marginTop: '20px' }}
                disabled={!userId}
              >
                SPRAWDŹ
              </Button>
            </div>
        </Tooltip>
      </Box>
    </form>
  );
};

export default CriteriaForm;
