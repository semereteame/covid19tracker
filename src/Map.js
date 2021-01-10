import React from "react";
import { MapContainer  ,TileLayer } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "./util";
const MapComponent = ({ countries,center, zoom }) => {
// const centers = Array.isArray(center)=== true ? center :[center.lat,center.lng]
  return (
    <div className="map">
      
      {console.log("====>",center)}
      <MapContainer center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy;<a href="http://osm.org/copyright">OpenStreetMap</a>contributors'
        />
        {showDataOnMap(countries)}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
