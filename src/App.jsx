import { useState } from 'react'
import './App.css'
import Search from './components/Search'
import Time from './components/Time'
import { Typography, Container } from '@mui/material'
import { positions } from '@mui/system';


function App() {

  // const [current, setCurrent] = useState(true)
  // const [fiveDay, setFiveDay] = useState(true)


  
  return (
    <>
    <Container>
    <Typography variant='h2'>Jaxun Weather Service</Typography>
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
