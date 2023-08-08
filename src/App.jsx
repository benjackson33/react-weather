import { useState } from 'react'
import './App.css'
import Search from './components/Search'
import Time from './components/Time'

function App() {

  // const [current, setCurrent] = useState(true)
  // const [fiveDay, setFiveDay] = useState(true)


  
  return (
    <>

    <span>
      <Time />
      <Search />
    </span>

      <h2>Weather</h2>

      
     
    </>
  )
}

export default App
