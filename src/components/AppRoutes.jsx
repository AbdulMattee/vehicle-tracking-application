import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './login/Login'
import Navbar from './navbar/Navbar'
import { AppContext } from './context/Context'
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'
import App from '../App'
import Map from './map/Map'
const AppRoutes = () => {
  return (
    <AppContext>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/vehicle-location' element={<PrivateRoute Component={Map}/>} />
          <Route path="/login" element={<PublicRoute Component={Login} />} />
          <Route path="/" element={<PrivateRoute Component={App} />} />
        </Routes>
      </BrowserRouter>
    </AppContext>
  )
}

export default AppRoutes
