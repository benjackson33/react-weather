import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import CssBaseline from '@mui/material'
import './index.css'
 
import { ThemeProvider, createTheme } from '@mui/material'

// import '@fontsource-variable/montserrat';

const theme = createTheme({
    
   palette: {
    primary: {
      main: '#01cf87',
    },
    secondary: {
      main: '#f30a7e',
    },
    background: {
      default: '#000417',
      paper: '#212642',
    },
    text: {
      primary: 'rgba(255,255,255,0.87)',
      secondary: 'rgba(249,249,249,0.6)',
      disabled: 'rgba(255,255,255,0.38)',
    },
  },
  typography: {
    // fontFamily: 'Montserrat',
    fontSize: 15,
    fontWeightLight: 200,
    fontWeightMedium: 600,
    fontWeightBold: 500,
    htmlFontSize: 17,
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme} >
    <App />
    </ThemeProvider> 
  
)
