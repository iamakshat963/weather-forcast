import React from 'react'
import Weather from './component/Weather'
import ThemeSet from './component/Theme'

const App = () => {
  return (
    <div>
      <ThemeSet></ThemeSet>
      <div className='app'>
         <Weather></Weather>
      </div>
    </div>
  )
}

export default App
