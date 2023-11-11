import { createTheme } from '@mui/material/styles';

const theme = createTheme({
   components: {
      MuiCssBaseline: {
         styleOverrides: {
            body: {
               height: "100vh",
               backgroundColor: "aliceblue"
            }
         }
      },
      MuiButton: {
         styleOverrides: {
            root: {
               letterSpacing: "1px",
               "&.mainMenu": {
                  margin: "0 10px",
                  fontSize: "1.2rem",
                  color: "white",
                  display: 'block' 
               },
               "&.mainMenu:hover": {
                 backgroundColor: "#4949ca"
               }
            },
            
         }
      },
      MuiContainer:{
         styleOverrides: {
            root: {
               '@media (min-width: 1200px)': {
                  maxWidth: "1740px"
                },
            }
         }
      }
   }
});

export default theme;