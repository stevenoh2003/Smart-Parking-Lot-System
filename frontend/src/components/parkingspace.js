import React from "react";

function Parkingspace(props) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>

            <th>isBigCar</th>
            <th>hasShade</th>
            <th>Empty</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {props.parkingspaces.map((parkingspace) => (
            <tr key={parkingspace.id}>
              <td>{parkingspace.id}</td>

              <td>{parkingspace.user === "" ? "EMPTY" : parkingspace.user}</td>
              <td>{parkingspace.isBigCar ? "Yes" : "No"}</td>
              <td>{parkingspace.hasShade ? "Yes" : "No"}</td>
              <td>{parkingspace.isEmpty ? "Yes" : "No"}</td>
              <td>{parkingspace.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Parkingspace;
