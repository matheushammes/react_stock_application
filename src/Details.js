import React from 'react';
import {
  useState,
  useEffect
} from "react";
import {
  AgGridReact
} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import "ag-grid-community/dist/styles/ag-grid.css";
import {
  Line
} from 'react-chartjs-2';
import {
  useHistory
} from 'react-router-dom';
import {
  useLocation
} from 'react-router-dom';
import './Details.css';


function TimeStampFix(props){
  let d = new Date(props);
  return d.getFullYear()+'-' + (d.getMonth()+1) + '-'+d.getDate();
}



function Details() {
  const [closeValue, setCloseValue] = useState([]);
  const [graphData, setGraphData] = useState([])
  const [labels, setLabels] = useState([])
  const location = useLocation()

  useEffect(() => {
    fetch(`http://131.181.190.87:3001/history?symbol=${location.symbol}`)
      .then(response => response.json())
      .then(stockData => stockData.map(graph => ({
        open: graph.open,
        high: graph.high,
        low: graph.low,
        close: graph.close,
        timestamp: TimeStampFix(graph.timestamp),
        volumes: graph.volumes
      })))
      .then(graph => {
        setGraphData(graph)
        setLabels(graph.map(({
          timestamp
        }) => (timestamp)))
        setCloseValue(graph.map(({
          close
        }) => (close)))
      })
  })




  const state = {
    labels: labels,
    datasets: [{
      label: "Stock",
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: closeValue,
      legend: "stock"
    }]
  }


  const headers = [{
      headerName: "TimeStamp",
      field: "timestamp",
      resizable: true,
      minWidth: 50,
      maxWidth: 110
    },
    {
      headerName: "Open",
      field: "open",
      resizable: true,
      minWidth: 50,
      maxWidth: 95
    },
    {
      headerName: "High",
      field: "high",
      resizable: true,
      minWidth: 50,
      maxWidth: 95
    },
    {
      headerName: "Low",
      field: "low",
      resizable: true,
      minWidth: 50,
      maxWidth: 95
    },
    {
      headerName: "Close",
      field: "close",
      resizable: true,
      minWidth: 50,
      maxWidth: 95
    },
    {
      headerName: "Volumes",
      field: "volumes",
      resizable: true,
      minWidth: 50,
      maxWidth: 90
    }
  ]




  return (

    <
    div className = "ag-theme-alpine"
    style = {
      {
        height: '300px',
        width: '600px'
      }
    } >

    <
    AgGridReact

    columnDefs = {
      headers
    }
    rowData = {
      graphData
    }
    pagination = {
      true
    }
    rowSelection = {
      "single"
    }
    rowSelected = {
      true
    }



    >

    <
    /AgGridReact>

    <
    Line data = {
      state
    }
    options = {
      {
        title: {
          display: true,
          text: location.name,
          fontSize: 20
        },
        legend:{
              display:true,
              position:'right'
            }
      }
    }
    />

    <
    /div>)
  }

  export default Details;
