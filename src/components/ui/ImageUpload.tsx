"use client";
import React from 'react'
import { useEffect, useState } from "react";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface ImageUploadProps {
  setUploadedImage: React.Dispatch<React.SetStateAction<{
    name: string;
    description: string;
    image: string;
    tags: never[];
}>>;
  setSelectedImg: React.Dispatch<React.SetStateAction<string>>;
  selectedImg: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({setUploadedImage, setSelectedImg, selectedImg}) =>{

   const [uploading, setUploading] = useState(false);
   const [selectedFile, setSelectedFile] = useState<File>();
   const [isUploaded, setIsUploaded] = useState(false);

   useEffect(() => {
      setIsUploaded(false);
   }, [selectedImg])

   const handleUpload = async () => {
      setUploading(true);
      if(!selectedFile) return;
      const formData = new FormData(); 
      formData.append("file", selectedFile);
      formData.append("upload_preset", "library-app");
      
      setIsUploaded(true);

      const res = await fetch("https://api.cloudinary.com/v1_1/dvubgigpt/image/upload", {
        method: "POST",
        body: formData,
      })
      .catch(err => console.log("err when adding image", err));

      const resJson = await res?.json();
      console.log("cloud upload res:", resJson);
      
      setUploading(false);
      
      if(resJson){
        setUploadedImage(prev => ({ ...prev, image: resJson.secure_url }));
      }
   }

   return(
    <Box sx={{
      margin: "auto",
      width: "100px"
    }}>
      <label>
        <input
          type="file" 
          name="image" 
          className="form-control" 
          id="file" 
          hidden
          onChange={({target}) => {
            if(!target.files) return;
            const file = target.files[0];

            setSelectedImg(URL.createObjectURL(file));
            setSelectedFile(file)
          }}
        />
        <span className="select">Wybierz</span>
       </label>
      <div className="button">
        <Button 
          disabled={uploading || !selectedImg}
          onClick={handleUpload}
          style={{opacity: uploading ? ".5" : "1"}}
          variant="outlined"
        >
          {uploading ? "Przesyłanie..." : isUploaded ? "Przesłano" : "Prześlij"}
        </Button>
      </div>
    </Box>
   )
}