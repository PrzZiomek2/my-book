"use client";
import React, {useEffect, useState, Suspense} from 'react';
import { useSession } from 'next-auth/react';

import useSWR from 'swr';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ImageUpload } from '../../ui/ImageUpload';
import Image from 'next/image';
import defaultImg from '../../../../public/profile.jpg';
import { InputTags, TagCustom } from '../../commons/inputTags/InputTags';
import CircularProgress from '@mui/material/CircularProgress';
import { MyBooks } from '../myBooks/MyBooks';
import { AlertInfo } from '@/components/ui/AlertInfo';
import styles from './styles.module.css';
import { urls } from '@/utils/urls';
import { ProfileTags } from './parts/ProfileTags';
import { ProfileFormData } from '@/types/interfaces';

const {rootPath} = urls();

export const ProfileSection: React.FC = () => {
   const {data: session} = useSession();
   const [edit, setEdit] = useState(false);
   const [selectedImg, setSelectedImg] = useState("");
   const [info, setInfo] = useState("");
   const [formData, setFormData] = useState<ProfileFormData>({
      name: "", 
      description: "", 
      image: "",
      tags: []   
   });
  const userId = session?.user.user._id;
   const { data } = useSWR(`${rootPath}/api/profile/${userId}`);

   useEffect(() => {
     if(data?.profile){
         setFormData(data?.profile);
      }
   }, [data]); 

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
      setFormData(prev => ({
         ...prev,
         [e.target.name]: e.target.value
      }))
   }
   
   const handleAddUserSubmit = async () => { 

      const res = await fetch(`${rootPath}/api/profile`, {
        method: "POST",
        body: JSON.stringify({
          name: formData.name, 
          description: formData.description,
          id: userId,
          image: formData.image,
          tags: formData.tags
        }),
      }).catch(err => console.log("err when adding user info", err));
  
      const resJson = await res?.json(); 
      if(resJson?.success){
         setInfo(resJson.message);    
      }
   };

   const avatar = formData.image || defaultImg; 

   return (
      <div className={styles.wrapper}>
        <section className={styles.info}>
         <AlertInfo expand={!!info} type='success' content={info} />
            <Suspense fallback={<CircularProgress />}>
               <>
               <div className={styles.info_top}>
               {!edit ?
                  <div className={styles.avatar}>
                     <Image
                        src={avatar} 
                        priority={true}
                        width={200}
                        height={200}
                        alt="zdjęcie profilowe" 
                     />
                  </div>
               : <div>
                  <div className="img-wrap">
                     {selectedImg && (
                        <Image 
                           className={styles.uploaded_image}
                           src={selectedImg} 
                           width={200} 
                           height={200} 
                           alt="dodawane zdjecie"
                        />
                        )}
                     </div>
                     <ImageUpload 
                        setUploadedImage={setFormData} 
                        setSelectedImg={setSelectedImg}
                        selectedImg={selectedImg}
                     />
                  </div>
                  }
                  <Button 
                     className={styles.edit_button}
                     onClick={() => setEdit(!edit)} variant="contained"
                  >
                     {edit ? "Powrót" : "Edytuj dane" }
                  </Button>
               </div>
         
               <div className={styles.info_bottom}>
                  <div className={styles.info_section}>
                     {edit ? 
                        <TextField 
                           id="name" 
                           name="name"
                           label="Imię" 
                           variant="standard" 
                           sx={{width: "100%"}}
                           value={formData.name}
                           onChange={handleInputChange}
                        /> : 
                        <>
                           <span className={styles.info_section__label}>Imię</span>
                           <div className={styles.info_content}>{formData.name}</div>
                        </>
                     }
                  </div>
                  <div className={styles.info_section}>
                     {edit ? 
                        <TextField 
                           id="description" 
                           name="description"
                           label="Opis" 
                           variant="standard" 
                           sx={{width: "100%"}}
                           multiline
                           minRows={5}
                           value={formData.description}
                           onChange={handleInputChange}
                        /> : 
                        <>
                           <span className={styles.info_section__label}>Opis</span>
                           <div className={styles.info_content}>{formData.description}</div>
                        </>
                     }
                  </div>
                  <div className={styles.info_section}>
                     {edit ? 
                        <ProfileTags 
                           setFormData={setFormData}
                           tags={formData.tags}
                           description={formData.description}
                        /> : 
                        <>
                           <span className={styles.info_section__label}>Tagi</span>
                           <div className={styles.tags_list}>
                              {formData.tags.map((data, index) => {
                                 return (
                                    <TagCustom 
                                       data={data} 
                                       key={index} 
                                    />
                                 );
                              })}
                           </div>  
                        </>
                     }
                  </div>
               </div>

               {edit && 
                  <Button 
                     onClick={handleAddUserSubmit} 
                     variant='contained'
                     className={styles.save_button}
                  >
                     Zapisz
                  </Button>}
               </>
            </Suspense>
        </section> 
        
        <section className={styles.books}>
          <h3>Moje książki</h3>
          <MyBooks />
        </section>
      </div>
    );
   
}