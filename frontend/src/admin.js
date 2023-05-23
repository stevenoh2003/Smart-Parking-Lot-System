import React from 'react'
import { API_URL } from "./api";
import axios from "axios";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParkingspaces } from "./getData";


function Admin(props) {

    const [parkingspaces, setParkingspaces] = useParkingspaces();
      const handleParkingspaceUpdate = (updatedParkingSpaces) => {
        setParkingspaces(updatedParkingSpaces);
      };

    const [formData, setFormData] = useState({
      id: "",
      user: "",
      index: false,
      hasShade: false,
      isBigCar: false,
      password: 0,
    });
  const handleIdChange = (event) => {
    setFormData({ ...formData, id: event.target.value });
  };
const handleDelete = (event) => {
  event.preventDefault();
  axios
    .put(`${API_URL}/${formData.id}`, {
      parking_space: {
        user: "",
        index: null,
        hasShade: null,
        isBigCar: null,
        password: 0,
      },
    })
    .then((response) => {
      const updatedParkingSpaces = parkingspaces.map((space) => {
        if (space.id === formData.id) {
          // Replace the space with the updated data
          return response.data;
        } else {
          return space;
        }
      });
      handleParkingspaceUpdate(updatedParkingSpaces);

    })
    .catch((error) => {
      console.log(error);

    });
};
    
    // const handleUpdate = (event) => {
    //   event.preventDefault();
    //   props.setIsLoading(true);
    //   props.setCurrentID(formData.id);
    //   const p = generateRandomPassword();

    //   axios
    //     .put(`${API_URL}/${formData.id}`, {
    //       ...formData,
    //       password: p,
    //     })
    //     .then((response) => {
    //       setFormData({
    //         user: "",
    //         index: true,
    //         hasShade: false,
    //         isBigCar: false,
    //         password: p, // Reset the password after generating a new parking space
    //       });
    //       console.log("password: " + p);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
    //     .finally(() => {
    //       props.setIsLoading(false);
    //     });
    // };
  return (
    <div>
      <Form.Group style={{ display: "flex", alignItems: "center" }}>
        <Form.Label style={{ marginRight: "10px" }}>ID</Form.Label>

        <Form.Control
          type="number"
          name="id"
          value={formData.id}
          onChange={handleIdChange}
        />
      </Form.Group>
      {/* <Button variant="primary" type="button" onClick={handleUpdate}>
        Update
      </Button> */}
      <Button type="button" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
}

export default Admin