import Cancel from "@mui/icons-material/Cancel";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface TagProps{
   data: string;
   handleDelete?: (value: string) => void;
   small?: boolean;
 }
 
 export const Tag = ({ data, handleDelete, small }: TagProps ) => (
   <Box 
      sx={{
      background: "#205eb4",
      display: "flex",
      padding: "0.4rem",
      margin: "10px 8px",
      justifyContent: "center",
      alignContent: "center",
      color: "#ffffff",
      borderRadius: "5px"
      }}
   >
      <Stack 
         direction='row' 
         gap={1} 
         alignItems="center"
      >
      <Typography
         sx={{
            fontSize: small ? "0.9rem" : "inherit",
            letterSpacing: "1px"
         }}
      >
         {data}
      </Typography>
      {handleDelete &&
         <Cancel
            sx={{ 
            cursor: "pointer",
            fontSize: "1rem"
            }}
            onClick={() => {
            handleDelete(data);
            }}
         />}
      </Stack>
   </Box>
   );
 