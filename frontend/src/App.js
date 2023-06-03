import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useParkingspaces } from "./getData";
import HomePageController from "./components/homepagecontroller";
import { API_URL } from './api';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import ChargeInfo from './components/chargeInfo';


function getAPIData() {
  return axios.get(API_URL).then((response) => 
    response.data
  );
}

function App() {
  // const [parkingspaces, setParkingspaces] = useState([]);
  const [parkingspaces, setParkingspaces] = useParkingspaces();
  const [isClicked, setIsClicked] = useState(false);

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
    <div style={{ backgroundColor: "bisque" }}>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">TaCo Parking Solutions</Navbar.Brand>
        </Container>
      </Navbar>

      <div className="App" style={{ padding: "0px" }}>
        {/* <Parkingspace parkingspaces={parkingspaces} /> */}

        {isClicked ? (
          <HomePageController
            parkingspaces={parkingspaces}
            setParkingspaces={setParkingspaces}
          />
        ) : (
          <ChargeInfo isClicked={isClicked} setIsClicked={setIsClicked} />
        )}
      </div>
    </div>
  );
}

export default App;
