import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import axios from "axios";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import sortData from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapcenter, setMapCenter] = useState([34.80746, -40.4796] );
  const [mapCountries,setMapCountries] = useState([])
  const [zoom, setZoom] = useState(2);
  useEffect(() => {
    getCountries(); 
  }, []);
  useEffect(() => {
    axios.get("https://disease.sh/v3/covid-19/all").then((response) => {
      setCountryInfo(response.data);
    });
  }, []);


  const getCountries = () => {
   
    axios.get("https://disease.sh/v3/covid-19/countries").then((response) => {
      console.log(response.data);
      let result = response.data.map((country) => {
        return {
          name: country.country,
          value: country.countryInfo.iso2,
        };
      });
      console.log(result);
      setCountries(result);
      setMapCountries(response.data)
      const sorted = sortData(response.data);
      setTableData(sorted);
    });
  };

  const handleChange = (event) => {
    
    const countryCode = event.target.value;
    const url =
      countryCode === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

     fetch(url)
     .then(response=>response.json())
     .then(data=>{
       console.log("*****",data)
      setMapCenter([
        data.countryInfo.lat,
        data.countryInfo.long,
      ])
      setZoom(5)
      setCountry(countryCode)
      setCountryInfo(data)
  
    })
    
    
    
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 Tracker </h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={(e) => handleChange(e)}
            >
              <MenuItem value="Worldwide">Worldwide</MenuItem>

              {countries.map((country) => (
                <MenuItem value={country.value}> {country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            title="CoronaVirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />

          <InfoBox
            title="Death"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        <div>
       
          <Map countries={mapCountries} center={mapcenter} zoom={zoom} />
        </div>
      </div>
      <div className="app__right">
        <Card>
          <CardContent>
            <h1>Live Cases</h1>
            <Table tableData={tableData} />
            <h6>world wide new cases</h6>
            <LineGraph />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
