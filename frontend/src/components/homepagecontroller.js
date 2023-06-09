import React, { useState } from "react";
import axios from "axios";
import Map from "./map";
import FormLayout from "./form";
import Parkinginfo from "./parkinginfo";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ChargeInfo from "./chargeInfo";
import Navbar from "react-bootstrap/Navbar";
import Fee from "./fee";
import Button from "react-bootstrap/esm/Button";

function HomePageController(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentID, setCurrentID] = useState(0);
  const [currentTime, setCurrentTime] = useState();
  const [mapStatus, setMapStatus] = useState(false);


  const changeMapStatus = () => {
    setMapStatus(!mapStatus);
  };

  const handleParkingspaceUpdate = (updatedParkingSpaces) => {
    props.setParkingspaces(updatedParkingSpaces);
  };

  return (
    <div style={{ margin: "20px" }}>
      {/* Include the loader CSS */}
      <style>
        {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loader {
          border: 16px solid #f3f3f3;
          border-top: 16px solid #3498db; /* Blue */
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 2s linear infinite;
        }
      `}
      </style>

      {isLoading ? (
        <div className="loader" />
      ) : (
        <Container>
          <Row>
            <Col md={3} xs={4}>
              {currentID !== 0 && (
                <div
                  style={{
                    width: "150px",
                    height: "70px",
                    border: "2px solid black",
                    backgroundColor: "deeppink",
                    color: "antiquewhite",
                    fontSize: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  Your spot is {currentID}
                </div>
              )}
              <div style={{ marginTop: "20%" }}>
                <FormLayout
                  setParkingspaces={props.setParkingspaces}
                  setIsLoading={setIsLoading}
                  setCurrentID={setCurrentID}
                  currentID={currentID}
                  parkingspaces={props.parkingspaces}
                  onParkingspaceUpdate={handleParkingspaceUpdate}
                />
                <br>
                </br>
                Real time footage
                <br></br>
{                <Button onClick={changeMapStatus}> {mapStatus? "On": "OFF"}</Button>
}              </div>
            </Col>

            <Col md={9} xs={8}>
              <Map selectedID={currentID} parkingspaces={props.parkingspaces} changeMapStatus={mapStatus} />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default HomePageController;
