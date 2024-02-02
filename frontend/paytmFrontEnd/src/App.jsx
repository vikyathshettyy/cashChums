import { useState } from 'react'

import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from './pages/signup'
import { Signin } from './pages/signin'
import { Dashboard } from './pages/dashboard'
import { Send } from './pages/send'
import { ButtonCheck } from './pages/ButtonCheck'

function App() {

  return (
    <div>

      <BrowserRouter>
        <Routes>

          <Route index element={<Signup></Signup>}/>
          <Route path='/buttoncheck' element={<ButtonCheck></ButtonCheck>}/>
          <Route path='/signup' element={<Signup></Signup>}/>
          <Route path='/signin' element={<Signin></Signin>}/>
          <Route path='/dashboard' element={<Dashboard></Dashboard>}/>
          <Route path='/send' element={<Send></Send>}/>
            

        </Routes>
      </BrowserRouter>
     
    </div>
  )
}

export default App
