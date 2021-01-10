import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import numeral from 'numeral'

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      lable: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales:{
      xAxes:[
          {
              type:"time",
              time:{
                  format:"MM/DD/YY",
                  tooltipFormat:"ll",
              },
          },
      ],
      yAxes:[
          {
              grindLines:{
                  display:false,
              },
              ticks:{
                  callback:function(value,index,values){
                      return numeral(value).format("0a")
                  }
              }
          }
      ]
  }
};
const LineGraph = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    const getdata= async()=>{
      let resp = await getData();
      let chartdata = await buildChartData(resp.data);
      setData(chartdata);
    }
    getdata()
    
  }, []);

  const getData = async () => {
    let response = await axios.get(
      "https://disease.sh/v3/covid-19/historical/all?lastdays=120"
    );
    return response;
  };

  const buildChartData = (data, caseType = "cases") => {
    console.log("=====>",data.cases);
    let chartData = [];
    let lasDataPoint;
    for (let date in data.cases) {
      if (lasDataPoint) {
        const newDataPoint = {
          x: date,
          y: data["cases"][date] - lasDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lasDataPoint = data[caseType][date];
    }
    return chartData;
  };
  return (
    <div>
      {data.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204,16,52,0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
        />
      )}
    </div>
  );
};

export default LineGraph;
