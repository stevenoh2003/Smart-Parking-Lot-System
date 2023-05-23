import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useParkingspaces } from "./getData";
import HomePageController from "./components/homepagecontroller";
import { API_URL } from './api';

function getAPIData() {
  return axios.get(API_URL).then((response) => 
    response.data
  );
}

function App() {
  // const [parkingspaces, setParkingspaces] = useState([]);
  const [parkingspaces, setParkingspaces] = useParkingspaces();
  useEffect(() => {
    let mounted = true;
    getAPIData().then((items) => {
      if (mounted) {
        setParkingspaces(items);
      }
    });
    return () => (mounted = false);
  }); 

  return (
    <div className="App" style={{ padding: "20px", width: "100hw", "height": "100vh" }}>
      {/* <Parkingspace parkingspaces={parkingspaces} /> */}
      <HomePageController
        parkingspaces={parkingspaces}
        setParkingspaces={setParkingspaces}
      />
    </div>
  );
}

export default App;
