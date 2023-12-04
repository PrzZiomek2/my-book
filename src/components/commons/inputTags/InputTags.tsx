import { FC, useRef } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Tag } from "@/components/ui/Tag";


interface InputTagsProps{
  tags: string[];
  setTags: (tags: string[]) => void;
  id: string;
  label?: string; 
}

export const  InputTags: FC<InputTagsProps> = ({tags, setTags, id, label}) =>{
  const tagRef = useRef<HTMLInputElement>();

  const handleDelete = (value: string) => {
    const newtags = tags.filter((val) => val !== value);
    setTags(newtags);
  };

  return (
    <Box sx={{ 
      flexGrow: 1,
      marginTop: "6px"
      }}>
        <Box sx={{ 
              margin: "0 0.2rem 0 0", 
              display: "flex",
              flexWrap: tags?.length > 2 ? "wrap" : "nowrap"
            }}>
            {tags.map((data, index) => {
              return (
                <Tag
                  data={data} 
                  handleDelete={handleDelete} 
                  key={index} 
                />
              );
            })}
          </Box>
        <TextField
          inputRef={tagRef}
          fullWidth
          {...(label ? {label} : {})}
          variant="standard" 
          className="profile_form__input" 
          placeholder="Wpisz tutaj"
          InputProps={{ id }}
        />

        <Button
          className='profile_tags-add' 
          sx={{marginTop: "12px"}}
          onClick={() => {
            if(!tagRef.current) return;
            setTags([...tags, tagRef.current!.value])
            tagRef.current.value = "";
          }} 
          variant="outlined"
        >
          Dodaj 
        </Button>
    </Box>
  );
}
