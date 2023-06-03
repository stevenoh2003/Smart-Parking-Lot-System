import React from 'react'
import Row from 'react-bootstrap/esm/Row';
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/esm/Button';

function ChargeInfo(props) {
  const clickHandler = () => {
    props.setIsClicked(true);
  }  
  return (
    <div>
      <br></br>
      <Row>
        <Col
          md={3}
          xs={3}
          style={{
            border: "2px solid black",
            height: "70%",
            margin: "100px",
          }}
        >
          <div
            style={{
              fontSize: "30px",
              alignItems: "center",
              fontFamily: "initial",
              padding: "10px",
            }}
          >
            <p>Charge Information</p>
            <p style={{ fontSize: "20px" }}>Nishiwaseda 2: ¥500 per hour</p>
            <Button onClick={clickHandler}>I want to park here</Button>
          </div>
        </Col>
        <Col md={7} xs={2}>
          <div className="google-map-code">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2339.0448760680965!2d139.70719089853196!3d35.705731909552114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188d23bcdcaa39%3A0x7e16ff75c9c7cf9e!2sBuilding%20No.%2054%2C%203-ch%C5%8Dme-4%20%C5%8Ckubo%2C%20Shinjuku%20City%2C%20Tokyo%20169-0072!5e0!3m2!1sen!2sjp!4v1685147139147!5m2!1sen!2sjp"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ChargeInfo;