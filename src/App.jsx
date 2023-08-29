import { useState } from 'react'
import './App.css'
import Search from './components/Search'
import Time from './components/Time'
import { Typography, Container, Grid } from '@mui/material'

import jw from './components/JW.png'
import '@fontsource-variable/montserrat';


function App() {




  
  return (
    <>
   <Container>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item>
            <Typography className='title' variant='h2' style={{ fontFamily: 'montserrat', fontSize: '50px' }}>
              Jaxun Weather Service
            </Typography>
          </Grid>
          <Grid item>
            <img src={jw} style={{ width: '50px', height: 'auto' }} />
          </Grid>
        </Grid>
      </Container>

      <Container style={{ position: 'absolute', top: 0, right: 700 }}>
        <Time />
      </Container>

    <Container>
      <Search />
    </Container>

    </>
  )
}

export default App
