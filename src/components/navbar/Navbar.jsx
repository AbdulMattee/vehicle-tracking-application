import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import userContext from '../context/Context'
import { NavLink, useNavigate } from 'react-router-dom'

const pages = ['Login', 'Vehicles']

const Navbar = () => {
  const navigate = useNavigate()
  const user = useContext(userContext)
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    user.setUser(null)
    navigate('/login')
  }
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit'
            }}
          >
          <NavLink to="/">
            Home
          </NavLink>
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <NavLink to={page === 'Login' ? page.toLowerCase() : '/'}>{page}</NavLink>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Logout" onClick={logout}>
              <IconButton sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
          </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Navbar
