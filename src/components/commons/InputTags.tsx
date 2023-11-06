import { useRef, useState } from "react";
import Cancel from "@mui/icons-material/Cancel";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

interface TagCustomProps{
  data: string;
  handleDelete?: (value: string) => void;
}

export const TagCustom = ({ data, handleDelete }: TagCustomProps ) => {
  return (
    <Box
      sx={{
        background: "#205eb4",
        height: "100%",
        display: "flex",
        padding: "0.4rem",
        margin: "10px 8px",
        justifyContent: "center",
        alignContent: "center",
        color: "#ffffff",
        borderRadius: "5px"
      }}
    >
      <Stack direction='row' gap={1}>
        <Typography>{data}</Typography>
        {handleDelete &&
          <Cancel
            sx={{ cursor: "pointer" }}
            onClick={() => {
              handleDelete(data);
            }}
          />}
      </Stack>
    </Box>
  );
};


interface InputTagsProps{
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>
}

export const  InputTags = ({tags, setTags}: InputTagsProps) =>{
  const tagRef = useRef<HTMLInputElement>();

  const handleDelete = (value: string) => {
    const newtags = tags.filter((val) => val !== value);
    setTags(newtags);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
        <TextField
          inputRef={tagRef}
          fullWidth
          id="tags" 
          name="tags"
          label="Tagi" 
          variant="standard" 
          className="profile_form__input" 
          placeholder={tags.length < 5 ? "Wpisz tutaj" : ""}
          InputProps={{ 
            startAdornment: (
              <Box sx={{ 
                margin: "0 0.2rem 0 0", 
                display: "flex",
                flexWrap: tags.length > 2 ? "wrap" : "nowrap"
              }}>
                {tags.map((data, index) => {
                  return (
                    <TagCustom 
                      data={data} 
                      handleDelete={handleDelete} 
                      key={index} 
                    />
                  );
                })}
              </Box>
            ),
          }}
        />

        <Button
          className='profile_tags-add' 
          onClick={() => {
            if(!tagRef.current) return;
            setTags(prev => ({ ...prev, tags: [...tags, tagRef.current!.value]}));
            tagRef.current.value = "";
          }} 
          variant="outlined"
        >
          Dodaj
        </Button>
    </Box>
  );
}
