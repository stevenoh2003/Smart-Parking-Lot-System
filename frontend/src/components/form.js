import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../api";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form"

function FormLayout(props) {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [emptyIDs, setEmptyIDs] = useState([]);
  const [password, setPassword] = useState(0);

const generateRandomPassword = () => {
  const randomPassword = Math.floor(1000 + Math.random() * 9000);
  console.log("argwegaw" + randomPassword)
  return randomPassword;
};

useEffect(() => {
  console.log("Updated password:", password);
}, [password]);
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        const parkingSpaces = response.data;
        const emptyIDs = parkingSpaces
          .filter((space) => space.user === "")
          .map((space) => space.id);
        setEmptyIDs(emptyIDs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

const [formData, setFormData] = useState({
  id: "",
  user: "",
  index: false,
  hasShade: false,
  isBigCar: false,
  password: 0,
});
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    axios
      .post(API_URL, { parking_space: formData })
      .then((response) => {
        props.onParkingspaceUpdate([...props.parkingspaces, response.data]);
        setFormData({
          user: "",
          index: true,
          hasShade: false,
          isBigCar: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleShadeChange = (event) => {
    setFormData({ ...formData, hasShade: event.target.checked });
  };

  const handleBigCarChange = (event) => {
    setFormData({ ...formData, isBigCar: event.target.checked });
  };

  const handleIdChange = (event) => {
    setFormData({ ...formData, id: event.target.value });
  };
useEffect(() => {
    console.log("password: " + password);
    
  }, [password]);

const handleUpdate = (event) => {
  event.preventDefault();
  props.setIsLoading(true);
  props.setCurrentID(formData.id);
  const p = generateRandomPassword();

  axios
    .put(`${API_URL}/${formData.id}`, {
      ...formData,
      password: p,
    })
    .then((response) => {
      setFormData({
        user: "",
        index: true,
        hasShade: false,
        isBigCar: false,
        password: p, // Reset the password after generating a new parking space
      });
      console.log("password: " + p);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      props.setIsLoading(false);
    });
};

const handleGenerate = async (event) => {
  props.setIsLoading(true);

  if (emptyIDs.length > 0) {
    const generatedId = emptyIDs[0];
    const newPassword = generateRandomPassword();

    try {
      await axios.put(`${API_URL}/${generatedId}`, {
        parking_space: {
          ...formData,
          id: generatedId,
          password: newPassword,
        },
      });

      setFormData((prevFormData) => ({
        ...prevFormData,
        id: generatedId,
        password: newPassword,
      }));

      console.log("New formData", formData);

      props.onParkingspaceUpdate([...props.parkingspaces, formData]);
      setFormData({
        user: "",
        index: true,
        hasShade: false,
        isBigCar: false,
        password: 0,
      });
    } catch (error) {
      console.log(error);
    }

    setEmptyIDs(emptyIDs.slice(1));
    props.setCurrentID(generatedId);
  } else {
    console.log("No empty parking lots available.");
  }

  props.setIsLoading(false);
};


  const handleDelete = (event) => {
    event.preventDefault();
    props.setIsLoading(true);
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
        const updatedParkingSpaces = props.parkingspaces.map((space) => {
          if (space.id === formData.id) {
            // Replace the space with the updated data
            return response.data;
          } else {
            return space;
          }
        });
        props.onParkingspaceUpdate(updatedParkingSpaces);
        const currentDate = new Date();
        const currentTime = currentDate.toLocaleTimeString();

        props.setCurrentTime(currentTime);
        props.setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        props.setIsLoading(false);
      });
  };

useEffect(() => {
  console.log("Updated parkingspaces:", props.parkingspaces);
  if (props.currentID && props.parkingspaces[props.currentID - 1]) {
    setPassword(props.parkingspaces[props.currentID - 1].password);
  }
}, [props.parkingspaces, props.currentID]);


  return (
    <>
      <Form>
        <Form.Group style={{ display: "flex", alignItems: "center" }}>
          <Form.Label style={{ marginRight: "10px" }}>User</Form.Label>
          <Form.Control
            type="text"
            name="user"
            value={formData.user}
            required={true}
            onChange={(event) =>
              setFormData({ ...formData, user: event.target.value })
            }
          />
        </Form.Group>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Form.Check
            type="switch"
            id="shade"
            label="Shade"
            checked={formData.hasShade}
            onChange={handleShadeChange}
          />
          <Form.Check
            type="switch"
            id="big-car"
            label="Big Car"
            checked={formData.isBigCar}
            onChange={handleBigCarChange}
          />
        </div>
        <br />

        {/* <Form.Group style={{ display: "flex", alignItems: "center" }}>
          <Form.Label style={{ marginRight: "10px" }}>ID</Form.Label>

          <Form.Control
            type="number"
            name="id"
            value={formData.id}
            onChange={handleIdChange}
          />
        </Form.Group> */}

        <br />
        {/* <Button variant="primary" type="button" onClick={handleUpdate}>
          Create
        </Button>
        <Button type="button" onClick={handleDelete}>
          Delete
        </Button> */}
        {/* for admin */}
        <Button
          style={{ margin: "5px", width: "100px" }}
          type="button"
          onClick={() => {
            handleGenerate();
          }}
        >
          Generate
        </Button>

        {password === 0 ? null : (
          <Button type="button" variant="secondary" onClick={handleShow}>
            Show
          </Button>
        )}

        {/* password: {password} */}
        {/* <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button> */}

        <br></br>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Parking Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ID:
            {props.currentID}
            <br></br>password: {password}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </>
  );
}

export default FormLayout;
