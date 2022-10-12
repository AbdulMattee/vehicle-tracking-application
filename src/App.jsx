import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { db } from './configs/firebase'
import { onValue, ref } from 'firebase/database'
import {
  Snackbar,
  Box,
  LinearProgress,
  CardActionArea,
  Button,
  CardActions,
  Pagination
} from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import styles from './App.module.css'
const App = () => {
  const [vehicles, setVehicles] = useState([])
  const [vehicleLocations, setVehicleLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalItemsInfo, setTotalItemsInfo] = useState({
    start: 0,
    end: 15,
    totalVehicles: 0,
    currentPage: 1,
    itemsPerPage: 15,
    totalPages: 0
  })
  const getVehicleLocations = async () => {
    const _vehicles = vehicles.slice(totalItemsInfo.start, totalItemsInfo.end)
    try {
      setLoading(true)
      const vehicleLocations = []
      for (const data of _vehicles) {
        if (data.vehicles && data.vehicles.length > 0) {
          for (const vehicle of data.vehicles) {
            await new Promise((resolve) => {
              const reference = ref(
                db,
                `/${vehicle.id}-${vehicle.registrationNumber}`
              )
              onValue(reference, (snapshot) => {
                if (snapshot.exists()) {
                  const vehicleInfo = snapshot.val()
                  if (vehicleInfo.location) {
                    vehicleLocations.push({
                      ...vehicleInfo.location,
                      id: vehicle.id,
                      registrationNo: vehicle.registrationNumber,
                      make: vehicle.make,
                      model: vehicle.model
                    })
                  }
                  resolve()
                }
              })
            })
          }
        }
      }
      setVehicleLocations(vehicleLocations)
      setLoading(false)
    } catch (e) {}
  }

  const getVehicles = async () => {
    try {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
      const response = await axios.get(
        'https://staging-api.tracknerd.io/v1/vehicle-groups/vehicles'
      )
      if (response.status === 200) {
        setTotalItemsInfo({
          ...totalItemsInfo,
          totalVehicles: response.data.count,
          totalPages: Math.ceil(
            response.data.count / totalItemsInfo.itemsPerPage
          )
        })
        setVehicles(response.data.data)
      }
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getVehicles()
  }, [])
  useEffect(() => {
    if (totalItemsInfo.totalVehicles > 0) {
      getVehicleLocations()
    }
  }, [totalItemsInfo])
  const handlePagination = async (event, value) => {
    setTotalItemsInfo((prevState) => ({
      ...prevState,
      start: (value - 1) * prevState.itemsPerPage,
      end:
        prevState.itemsPerPage * value > prevState.totalVehicles
          ? prevState.totalVehicles
          : prevState.itemsPerPage * value,
      currentPage: value
    }))
  }
  if (loading) {
    return (
      <>
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
        <Snackbar
          message="Fetching Vehicles!"
          open={loading}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        />
      </>
    )
  }
  return (
    <>
      <div className={styles.vehicle_cards_container}>
        {vehicleLocations &&
          vehicleLocations.length > 0 &&
          vehicleLocations.map((vehicle) => (
            <Card
              sx={{ maxWidth: 345 }}
              key={`${vehicle.registrationNo}-${vehicle.id}`}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image="/src/assets/car.webp"
                  alt="car"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {vehicle.registrationNo}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {vehicle.make && vehicle.model
                      ? `An excellent car made by ${vehicle.make.toLowerCase()}. The ${vehicle.make.toLowerCase()} ${vehicle.model.toLowerCase()} gives its driver a smooth ride.`
                      : 'Although the make and the model are not known but this car is still pretty famous among the customers.'}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  <NavLink
                    to="/vehicle-location"
                    state={{
                      vehicle
                    }}
                  >
                    See Location
                  </NavLink>
                </Button>
              </CardActions>
            </Card>
          ))}
      </div>
      <Pagination
        page={totalItemsInfo.currentPage}
        count={totalItemsInfo.totalPages}
        className={styles.pagination_div}
        onChange={handlePagination}
      />
    </>
  )
}
export default App
