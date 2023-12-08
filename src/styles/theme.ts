import { Breakpoint } from '@/types/enums';
import createTheme from '@mui/material/styles/createTheme';

const theme = createTheme({
   breakpoints: {
      values: {
        xs: 0,
        sm: Breakpoint.MOBILE,
        md: Breakpoint.TABLET,
        lg: Breakpoint.DESKTOP,
        xl: Breakpoint.WIDESCREEN,
      },
    },
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
      MuiSvgIcon: {
         styleOverrides:{
            fontSizeSmall: {
               fontSize: "0.8rem"
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
              // padding: "4px 10px 5px"
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
               },
               [`@media (max-width: ${Breakpoint.MOBILE}px)`]: {
                  borderRadius: "8px"
                },
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
      },
      MuiInputBase: {
         styleOverrides: {
            root: {
               [`@media (max-width: ${Breakpoint.MOBILE}px)`]: {
                  borderRadius: "8px"
                },
            },
         }
      },
      MuiTextField: {
         styleOverrides: {
            root: {
               [`@media (max-width: ${Breakpoint.MOBILE}px)`]: {
                  borderRadius: "8px"
                },
            },
         }
      },
   }
});

export default theme;