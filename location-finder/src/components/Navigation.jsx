import Axios from "axios";
import { useRef } from "react";
import { useMap } from "react-map-gl";
import Swal from "sweetalert2";
function Navigation({onGo,api_key}){
    
    const {current : map} = useMap()
    const search = useRef()

    function getCoordinate(){
        Axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search.current.value}.json?access_token=${api_key}`)
        .then(response=>{
            if(response.data.features.length > 0){
                const longitude = response.data.features[0].geometry.coordinates[0]
                const lattitude = response.data.features[0].geometry.coordinates[1]
                onGo.setLongitude(longitude)
                onGo.setLattitude(lattitude)
                map.flyTo({center: [longitude, lattitude],duration : 2500})
                search.current.value = ""
            }else{
                Swal.fire({
                    title : "Error!",
                    text : "Location not found!",
                    icon : "error"
                })
            }
        })
    }
    function handleFly(e){
        if(search.current.value != ""){
            if(e.target.getAttribute('id') == 'search'){
                if(e.key === 'Enter'){
                    getCoordinate()
                }
            }else{
                getCoordinate()
            }
        }else{
            Swal.fire({
                title : "Warning",
                text : "Input cannot be empty",
                icon : "warning"
            })
        }
        
    }
    return (
        <div className="navigation-container">
            <div className="navigation">
                <h1>Enter Location Name </h1>
                <input id="search" onKeyUp={handleFly} ref={search} type="text"  />
                <button id="go" onClick={handleFly}>Go</button>
            </div>
        </div>
    )
}

export default Navigation