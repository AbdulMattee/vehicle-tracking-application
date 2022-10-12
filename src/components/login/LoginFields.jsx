import React, { useState } from 'react'
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Box,
  CircularProgress
} from '@mui/material'
import {
  PersonOutlineTwoTone,
  VisibilityOffTwoTone,
  VisibilityTwoTone
} from '@mui/icons-material'
import styles from './Login.module.css'
import EastIcon from '@mui/icons-material/East'

const LoginFields = ({
  credentials,
  onChange,
  handleSubmit,
  error,
  loading
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <form className={styles.login_form}>
      <h2>Welcome Back</h2>
      <FormControl variant="standard">
        <InputLabel htmlFor="username">Email</InputLabel>
        <Input
          id="username"
          size="small"
          required
          error={error.error}
          type="text"
          onChange={(e) => onChange(e, 'username')}
          endAdornment={<PersonOutlineTwoTone />}
          label="Username"
        />
        <small>{(error && error.message) || ''}</small>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          id="standard-adornment-password"
          required
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => onChange(e, 'password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword
                  ? (
                  <VisibilityOffTwoTone />
                    )
                  : (
                  <VisibilityTwoTone />
                    )}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <IconButton
        onClick={handleSubmit}
        disabled={
          credentials.username.trim() === '' || credentials.password === ''
        }
        className="submit-btn"
        style={{
          height: '40px',
          width: '40px',
          margin: '2px auto'
        }}
      >
        {loading
          ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
            )
          : (
          <EastIcon />
            )}
      </IconButton>
    </form>
  )
}
export default LoginFields
