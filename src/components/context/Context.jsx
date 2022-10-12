import React, {
  createContext,
  useState,
  useEffect,
  useMemo
} from 'react'

const userContext = createContext()

export const AppContext = ({ children }) => {
  const [user, setUser] = useState({
    user: '',
    token: ''
  })
  const [loading, setLoading] = useState(true)
  const contextValue = useMemo(() => ({ ...user, setUser }), [user, setUser])
  useEffect(() => {
    const token = localStorage.getItem('token')
    const name = localStorage.getItem('name')
    if (token) {
      setUser((prevState) => ({
        user: name,
        token
      }))
    }
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])
  if (loading) {
    return <div />
  }
  return <userContext.Provider value={contextValue}>{children}</userContext.Provider>
}

export default userContext
