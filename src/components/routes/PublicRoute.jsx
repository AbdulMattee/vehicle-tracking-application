import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import userContext from '../context/Context'
const PublicRoute = ({ Component }) => {
  const user = useContext(userContext)
  return (
    <>
      {Component.name === 'Login' && user.token && <Navigate to="/" />}
      <Component />
    </>
  )
}

export default PublicRoute
