import createTheme from '@mui/material/styles/createTheme';

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
      MuiList: {
         styleOverrides: {
            root: {
               backgroundColor: "transparent"
            }
         }
      },
      MuiAccordion: {
         styleOverrides: {
            root: {
               "&.Mui-expanded": {
                  marginBottom: "30px"
               }
            }
         }
      },
      MuiAccordionSummary: {
         styleOverrides: {
            root: {
               borderBottom: "1px solid blue",
               "&:hover": {
                  background: "#ccc8f7"
               }
            }
         }
      },
      MuiAccordionDetails: {
         styleOverrides: {
            root: {
               padding: "20px 16px",
            }
         }
      },
      MuiOutlinedInput: {
         styleOverrides: {
            input: {
               padding: "4px 10px 5px"
            }
         }
      },
      MuiIconButton: {
         styleOverrides: {
            root: {
               width: "fit-content"
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