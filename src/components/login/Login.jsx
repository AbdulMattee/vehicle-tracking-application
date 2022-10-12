import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userContext from '../context/Context'
import LoginFields from './LoginFields'
import styles from './Login.module.css'
import axios from 'axios'
const emailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
const Login = () => {
  const user = useContext(userContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState({
    error: false,
    message: ''
  })
  const onSubmitHandler = async () => {
    const validEmail = emailRegex.test(credentials.username)
    setError({
      error: !validEmail,
      message: !validEmail ? 'Invalid Email' : ''
    })
    if (validEmail) {
      try {
        setLoading(true)
        const response = await axios.post('https://staging-api.tracknerd.io/v1/auth/login', credentials)
        if (response.status === 200) {
          user.setUser({
            user: response.data.user.name,
            token: response.data.token
          })
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('name', response.data.user.name)
          setLoading(false)
          navigate('/')
        }
      } catch (e) {
      }
      setLoading(false)
    }
  }
  const handleChange = (e, fieldName) => {
    setCredentials({ ...credentials, [fieldName]: e.target.value })
  }
  if (user.token) return <div />
  return (
    <section className={styles.login_section}>
      <div className={styles.blue_div} />
      <div className={styles.login_div}>
        <div className={styles.info_div}>
          <h1 className={styles.info_logo}>V</h1>
          <h1> Vehicle Tracking</h1>
        </div>
        <div className={styles.form_div}>
          <img
            src="/src/assets/Welcome_back.png"
            alt="logo"
            className={styles.logo}
          />
          <LoginFields
            credentials={credentials}
            onChange={handleChange}
            handleSubmit={onSubmitHandler}
            error={error}
            loading={loading}
          />
        </div>
      </div>
    </section>
  )
}

export default Login
