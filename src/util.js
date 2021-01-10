import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypesColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 800,
  },

  recovered: {
    hex: "#7dd71d",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 2000,
  },
};
const SortData = (data) => {
  const sortedData = [...data];
  sortedData.sort((a, b) => b.cases - a.cases);
  return sortedData;
};

export default SortData;

export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypesColors[casesType].hex}
      fillColor={casesTypesColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypesColors[casesType].multiplier
      }
    >
      {/* {console.log(country.countryInfo.flag)} */}
      <Popup>
        <div className="info-container">
          <div className="info-flag"
          style= {{backgroundImage:`url(${country.countryInfo.flag})`}}
           />
          <div className="info-name">{country.country}</div>
          <div className="info-cases">Cases:{numeral(country.cases).format("0,0") }</div>
          <div className="info-recoverd">Recovered:{numeral(country.recovered).format("0,0")}</div>
          <div className="info-deaths">Deaths:{numeral(country.deaths).format("0,0") }</div>
        </div>
      </Popup>
    </Circle>
  ));
