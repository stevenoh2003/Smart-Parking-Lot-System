import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../api";


function Space(props) {

    const [parkingspaces, setParkingspaces] = useState([]);

useEffect(() => {
  let mounted = true;
  const fetchData = () => {
    axios
      .get(API_URL)
      .then((response) => response.data)
      .then((items) => {
        if (mounted) {
          setParkingspaces(items);
        }
      });
  };

  fetchData(); // fetch data immediately after mounting
  const intervalId = setInterval(fetchData, 5000); // fetch data every 5 seconds

  return () => {
    mounted = false;
    clearInterval(intervalId); // clean up interval on unmount
  };
}, []);
  var status = props.emptySpacesID.includes(Number(props.id));

  if(props.mapStatus){
      if (parkingspaces[props.id - 1]?.isEmpty === false) {
        status = true;
      } else {
        status = false;
      }

  }



  const styles = {
    border: "2px solid blue",
    height: "120px",
    width: "90px",
    flexGrow: "1",
    margin: "10px"
  };

  const emptyStyles = {
    border: "2px solid red",
    height: "120px",
    width: "90px",
    flexGrow: "1",
    margin: "10px",
  };
    const currentStyles = {
      border: "2px solid blue",
      height: "120px",
      width: "90px",
      flexGrow: "1",
      margin: "10px",
    };

  return (
    <div id={props.id} style={status ? emptyStyles : styles}>
      <br></br>
      <b>{props.id}</b>
      <br></br>
      {status ? "EMPTY" : "OCCUPIED"}
      {/* <br></br>
      User: {user} */}
    </div>
  );
}

export default Space