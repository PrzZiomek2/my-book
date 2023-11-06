"use client";
import React, {useEffect, useState} from 'react'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { ImageUpload } from '../ui/ImageUpload';
import { useSession } from 'next-auth/react';

export const AccountData = () => {
   const router = useRouter();
   const {data: session} = useSession();
   const [edit, setEdit] = useState(false);
   const [formData, setFormData] = useState({
      name: "", 
      email: "", 
      password: "",
   });

   console.log({session});
   
   
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
      setFormData(prev => ({
         ...prev,
         [e.target.name]: e.target.value
      }))
   }
   
   const handleAddUserSubmit = async () => {   

      const res = await fetch("http://localhost:3000/api/profile", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name, 
          description: formData.description, 
          image: uploadedImages,
          tags: []   
        }),
      }).catch(err => console.log("err when posting room", err));
  
      const resJson = await res?.json(); 
      if(resJson?.insertedId){
       //  router.push("/rooms");
      }
    };

   return (
      <div className='profiile_wrapper'>
        <h3>Dane konta</h3>

        <section className='profile_info'>
          <div className='profile_info__top '>
            <Button 
               className='profile_edit-button' 
               onClick={() => setEdit(!edit)} variant="contained"
            >
               {edit ? "Powrót" : "Edytuj dane" }</Button>
          </div>
   
          <div className='profile_info__bottom'>
            <div>
               {edit ? 
                  <TextField 
                     id="name" 
                     name="name"
                     label="Imię" 
                     variant="standard" 
                     className="profile_form__input" 
                     sx={{width: "100%"}}
                     onChange={handleInputChange}
                  /> : 
                  <>
                     <span>Imię</span>
                     
                  </>
               }
            </div>
            <div>
               {edit ? 
                  <TextField 
                     id="email" 
                     name="email"
                     label="Email" 
                     variant="standard" 
                     type='email'
                     className="profile_form__input" 
                     sx={{width: "100%"}}
                     onChange={handleInputChange}
                  /> : 
                  <>
                     <span>Email</span>
                     
                  </>
               }
            </div>
            <div>
               {edit ? 
                  <TextField 
                     id="password" 
                     name="password"
                     label="Hasło" 
                     type='password'
                     variant="standard" 
                     className="profile_form__input" 
                     sx={{width: "100%"}}
                     onChange={handleInputChange}
                  /> : 
                  <>
                     <span>Hasło</span>
                       
                  </>
               }
            </div>
          </div>

          {edit && 
            <Button 
               onClick={handleAddUserSubmit} 
               variant='contained'
               className='profile_save-button'
            >
               Zapisz
            </Button>}
        </section>
      </div>
    );
   
}