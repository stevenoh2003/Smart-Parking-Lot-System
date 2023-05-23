import React, { useRef } from "react";
import { useEffect, useState } from "react";
import Xarrow from "react-xarrows";
import Space from "./space";
import axios from "axios";
import { API_URL } from "../api";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

function Map({ selectedID, parkingspaces }) {
  const [parkingSpaces, setParkingSpaces] = useState([]);

  console.log(parkingspaces[1])

  const getParkingSpaceUser = (index) => {
    if (parkingspaces && parkingspaces.length > 0) {
      const parkingSpace = parkingspaces.find((space) => space.id === index);
      if (parkingSpace && parkingSpace.user !== "") {
        return `User: ${parkingSpace.user}`;
      }
    }
    return "No user";
  };

  const popover = (i) => (
    <Popover id="popover-basic">
      <Popover.Header as="h3">{getParkingSpaceUser(i)}</Popover.Header>
      <Popover.Body>
        Condition: Very good. <br />
        Comments <br /> - Best parking space I have had in years
        <br />- really good
      </Popover.Body>
    </Popover>
  );

  useEffect(() => {
    let mounted = true;
    const fetchData = () => {
      axios
        .get(API_URL)
        .then((response) => response.data)
        .then((items) => {
          if (mounted) {
            setParkingSpaces(items);
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

  const emptySpaces = parkingSpaces.filter((space) => space.user === "");
  const emptySpacesID = emptySpaces.map((space) => space.id);

  const entranceStyles = {
    border: "3px dotted blue",
    height: "10%", // take full height of the parent
    width: "100px",
    margin: "10px",
  };
  const parkingLotStyles = {
    width: "80%", // take remaining width of the parent
    display: "flex",
    flexDirection: "column",
  };
  const outerBoxStyles = {
    border: "5px solid black",
    padding: "10px",
    display: "flex",
    width: "700px",
    height: "400px", // set a height for the parent
  };
  const entrance = useRef(null);
  const connect = useRef(null);

  const destinationID = selectedID;
  const parkingLotsPerRow = 4;

  const spaceIds = ["5", "6", "7", "8"];

  return (
    <div>
      <div style={outerBoxStyles}>
        <div style={entranceStyles} ref={entrance}>
          Entrance
        </div>

        <div style={parkingLotStyles}>
          <div style={{ display: "flex" }}>
            {Array.from({ length: parkingLotsPerRow }).map((_, index) => (
              <OverlayTrigger
                trigger="hover"
                placement="bottom"
                overlay={popover(index + 1)}
              >
                <div>
                  <Space
                    key={index + 1}
                    id={(index + 1).toString()}
                    emptySpacesID={emptySpacesID}
                  />
                </div>
              </OverlayTrigger>
            ))}

            {/* <div id="1" style={styles} />
            <div id="2" style={styles} />
            <div id="3" style={styles} />
            <div id="4" style={styles} /> */}
          </div>
          <div style={{ width: "10%", paddingTop: "20px" }}>
            <div id="connect" ref={connect} />
          </div>
          <div style={{ display: "flex", paddingTop: "80px" }}>
            {Array.from({ length: parkingLotsPerRow }, (_, index) => (
              <OverlayTrigger
                trigger="hover"
                placement="bottom"
                overlay={popover(index + parkingLotsPerRow + 1)}
              >
                <div>
                  <Space
                    key={index + parkingLotsPerRow + 1}
                    id={(index + parkingLotsPerRow + 1).toString()}
                    emptySpacesID={emptySpacesID}
                  />
                </div>
              </OverlayTrigger>
            ))}
            {/* <Space id="9" emptySpacesID={emptySpacesID} /> */}
            {/* <div id="5" style={styles} />
            <div id="6" style={styles} />
            <div id="7" style={styles} />
            <div id="8" style={styles} /> */}
          </div>
          {destinationID !== 0 && ( // Check if destinationID is not 0
            <>
              <Xarrow
                start={entrance} // can be react ref
                end="connect" // or an id
                path={"grid"}
                animateDrawing={true}
                endAnchor="left"
              />
              <Xarrow
                start={connect} // can be react ref
                end={String(destinationID)} // or an id
                path={"grid"}
                animateDrawing={true}
                startAnchor="left"
                endAnchor={
                  destinationID <= parkingLotsPerRow ? "bottom" : "top"
                }
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Map;
