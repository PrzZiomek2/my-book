import { FC, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Tag } from "@/components/ui/Tag";
import { WithLabel } from "@/components/ui/WithLabel";

interface InputTagsProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  id: string;
  label?: string;
}

export const InputTags: FC<InputTagsProps> = ({ tags, setTags, id, label }) => {
  const [tagValue, setTagValue] = useState("");

  const handleDelete = (value: string) => {
    const newtags = tags.filter((val) => val !== value);
    setTags(newtags);
  };
  console.log({ tagValue });

  return (
    <Box
      sx={{
        flexGrow: 1,
        marginTop: "6px",
      }}
    >
      <Box
        sx={{
          margin: "0 0.2rem 0 0",
          display: "flex",
          flexWrap: tags?.length > 2 ? "wrap" : "nowrap",
        }}
      >
        {tags.map((data, index) => {
          return <Tag data={data} handleDelete={handleDelete} key={index} />;
        })}
      </Box>
      <WithLabel id={id} text="dodawaniew tagów">
        <TextField
          fullWidth
          {...(label ? { label } : {})}
          variant="standard"
          className="profile_form__input"
          value={tagValue}
          onChange={(e) => setTagValue(e.target.value)}
          placeholder="Wpisz tutaj"
          InputProps={{
            id,
            name: id,
          }}
        />
      </WithLabel>
      <Button
        className="profile_tags-add"
        sx={{
          marginTop: "12px",
          color: "#125394",
        }}
        onClick={() => {
          if (!tagValue) return;
          setTags([...tags, tagValue]);
          setTagValue("");
        }}
        variant="outlined"
      >
        Dodaj
      </Button>
    </Box>
  );
};
