import '../App.css'
import React, { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const color = useContext(ThemeContext);


  const hanbleClick = ()=>{
    setDarkMode(!darkMode)
  }

  useEffect(() => {
    if(darkMode){
      document.body.classList.add('white-content');
    }else{
      document.body.classList.remove('white-content');
    }

  }, [darkMode])

  return (
    <div
    className='header'>
      <h1 style={{color}}>ReactHooks</h1>
      <button 
        type='button'
        onClick={hanbleClick}
      >
        {!darkMode ? 'Dark Mode': 'Light Mode'}
      </button>
    </div>
  )
}

export {Header}