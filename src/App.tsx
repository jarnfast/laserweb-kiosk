import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import { Switch, Route } from "react-router-dom";

import "./App.css";

import DrawerNavigation from "./components/DrawerNavigation";
import Routes from "./Routes";

const theme = createTheme({
  spacing: 2,
  typography: {
    h1: {
      fontSize: "1.2rem",
      marginBottom: "0px",
      marginBlockStart: "4px",
      //marginBlockEnd: "4px",
    },
    h3: {
      fontSize: "0.8rem",
      marginBottom: "0px",
      marginBlockStart: "2px",
    },
  },
  components: {
    MuiListItem: {
      styleOverrides: {
        dense: true,
        //padding: "2px",
      },
    },
    MuiList: {
      styleOverrides: {
        dense: true,
        //padding: "2px",
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        dense: true,
      },
    },
    MuiTable: {
      defaultProps: {
        size: "small",
      },
    },
    MuiButton: {
      defaultProps: {
        size: "small",
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        size: "small",
      },
    },
    MuiCheckbox: {
      defaultProps: {
        size: "small",
      },
    },
    MuiFab: {
      defaultProps: {
        size: "small",
      },
    },
    MuiFormControl: {
      defaultProps: {
        margin: "dense",
        size: "small",
      },
    },
    MuiFormHelperText: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: "small",
      },
    },
    MuiInputBase: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiInputLabel: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiRadio: {
      defaultProps: {
        size: "small",
      },
    },
    MuiSwitch: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTextField: {
      defaultProps: {
        margin: "dense",
        size: "small",
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <DrawerNavigation />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Switch>
            {Routes.map((route: any) => (
              <Route exact path={route.path} key={route.path}>
                {route.component}
              </Route>
            ))}
          </Switch>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
