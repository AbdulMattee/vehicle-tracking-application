import mapboxgl from 'mapbox-gl'
import React, { useRef, useEffect } from 'react'
import { ref, onValue } from 'firebase/database'
import { db } from '../../configs/firebase'
import { useLocation } from 'react-router-dom'
import styles from './Map.module.css'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'
const Map = () => {
  const location = useLocation()
  const { vehicle } = location.state
  const mapContainerRef = useRef(null)
  const getVehicleLocation = async () => {
    console.log('Inside getVehicleLocation')
    if (vehicle) {
      try {
        mapContainerRef.current.innerHTML = ''
        const map = new mapboxgl.Map({
          zoom: 15,
          style: 'mapbox://styles/mapbox/outdoors-v11',
          container: mapContainerRef.current
        })
        const marker = new mapboxgl.Marker()
        await new Promise((resolve) => {
          const reference = ref(
            db,
            `/${vehicle.id}-${vehicle.registrationNo}`
          )
          onValue(reference, (snapshot) => {
            if (snapshot.exists()) {
              const vehicleInfo = snapshot.val()
              if (vehicleInfo.location) {
                console.log('vehicleInfo', vehicleInfo.location.latitude, vehicleInfo.location.longitude)
                const lat = vehicleInfo.location.latitude > 90 ? 90 : vehicleInfo.location.latitude
                const lng = vehicleInfo.location.longitude > 180 ? 180 : vehicleInfo.location.longitude
                map.setCenter([lng, lat])
                marker.setLngLat([lng, lat]).addTo(map)
                return resolve({ lat: vehicleInfo.location.latitude, lng: vehicleInfo.location.longitude })
              }
              resolve()
            }
          })
        })
      } catch (e) {}
    }
  }
  useEffect(() => {
    if (vehicle) {
      getVehicleLocation()
    }
  }, [vehicle])
  return (<>
  <div className={styles.map_container} ref={mapContainerRef} />
  </>)
}

export default Map
