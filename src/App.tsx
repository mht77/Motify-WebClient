import React from 'react';
import './App.css';
import {Button, createTheme, CssBaseline, ThemeProvider} from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    return (
      <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <div className="App">
          <header className="App-header">
            <h3>
              Hello World!
            </h3>
              <Button variant='outlined'>
                    Click me!
              </Button>
          </header>
        </div>
      </ThemeProvider>
  );
}

export default App;
