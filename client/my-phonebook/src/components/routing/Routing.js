import React from 'react'
import { Routes, Route} from 'react-router-dom'

//components

import Login from '../login/Login'
import Register from '../register/Register'
import Home from '../home/Home'
import Contacts from '../contacts/Contacts'
import Create from '../create/Create'

const Routing = ({ user }) => {

  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={ <Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/contacts' element={<Contacts />}/>
        <Route path='/createContact' element={<Create  user={user} />}/>
    </Routes>
  )
}

export default Routing