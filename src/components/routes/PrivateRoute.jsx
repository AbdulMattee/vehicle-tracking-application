import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import userContext from '../context/Context'
const PrivateRoute = ({ Component }) => {
  const user = useContext(userContext)
  console.log(user)
  return (
    <>
      {(!user || !user.token) && <Navigate to="/login" />}
      <Component />
    </>
  )
}

export default PrivateRoute
