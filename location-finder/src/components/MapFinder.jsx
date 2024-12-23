import { useState } from 'react'
import Map, { Marker, NavigationControl, useMap } from 'react-map-gl'
import {ImLocation} from 'react-icons/im'
import Navigation from './Navigation'
export default function MapFinder(){
    const api_key = process.env.MAPBOX_API_KEY
    
    const [lattitude,setLattitude] = useState(-6.175479)
    const [longitude,setLongitude] = useState(106.827254)
    
    const [viewport,setViewport] = useState({
        longitude : longitude,
        latitude : lattitude,
        zoom : 12
    })
    
    return (
        <Map mapboxAccessToken={api_key} initialViewState={{...viewport}} style={{width: '100%', height: '100vh'}} mapStyle="mapbox://styles/mapbox/light-v9" >
            <Marker latitude={lattitude} longitude={longitude}>
                <ImLocation size="40px"/>
            </Marker>
            <NavigationControl/>
            <Navigation api_key={api_key} onGo={{setLattitude,setLongitude}}/>
        </Map>
    )
}

