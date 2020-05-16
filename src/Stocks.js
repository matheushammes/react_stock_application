import React from 'react';
import {
  useState,
  useEffect
} from "react";
import './Stocks.css';
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
} from 'react-router-dom'
import Details from "./Details"






function getStocks() {
  const url = "http://131.181.190.87:3001/all";
  return fetch(url)
    .then(response => response.json())
    .then(stockz => stockz.map(stocks => ({
        symbol: stocks.symbol,
        name: stocks.name,
        industry: stocks.industry
      })

    ))

}


function getIndustries(props) {
  return (
    unique => ([...new Set(props.map(item => item.industry))])
  )
}




// function Stocks

function Stocks() {
  const headers = [{
      headerName: "Symbol",
      field: "symbol"
    },
    {
      headerName: "Name",
      field: "name"
    },
    {
      headerName: "Industry",
      field: "industry"

      // pass in additional parameters to the text filter
    }
  ];
  var [rows, setRows] = useState([]);
  const history = useHistory()
  const [localStocks, setLocalStocks] = useState([]);
  const [indFilter, setIndFilter] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filterResults, setFilterResults] = useState([])


  const handleChange = event => {
    let searchData = [];
    filterResults.forEach((item, index) => {
      if (item.symbol.startsWith(event.target.value.toUpperCase())) {
        searchData.push(filterResults[index]);
      }
    });
    setRows(searchData)
    setSearchResults(searchData)
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    getStocks()
      .then(stocks => {
        setRows(stocks);
        setLocalStocks(stocks);
        setIndFilter(getIndustries(stocks));
        setFilterResults(stocks);
        setSearchResults(stocks);
      });
  }, []);

  return (



      <
      div className = "ag-theme-alpine"
      style = {
        {
          height: '450px',
          width: '600px'

        }
      } >

      <
      input className = "search-form"
      type = "text"
      placeholder = "Search"
      value = {
        searchTerm
      }
      onChange = {
        handleChange
      }
      />

      <
      select className = "industry-filter"
      onChange = {
        (event) => {
          let fltData = []
          if (event.target.value != "null") {
            searchResults.forEach((item, index) => {
              if (event.target.value == item.industry) {
                fltData.push(searchResults[index]);

              }
            })
            setRows(fltData);
            setFilterResults(fltData)
          } else {
            setRows(localStocks);
            setFilterResults(localStocks)
          }



        }
      } >
      <
      option selected value = "null" > Industry Selection < /option> {
        indFilter.map((industry) => < option value = {
            industry
          } > {
            industry
          } < /option>)}

          <
          /select>



          <
          AgGridReact columnDefs = {
            headers
          }
          rowData = {
            rows
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
          onRowSelected = {
            (event) => {

              const location = {
                pathname: "/Details",
                symbol: event.data.symbol,
                name: event.data.name
              }
              history.push(location)
            }
          }

        >

          <
          /AgGridReact>


          <
          /div>

        );
      }




      export default Stocks;
