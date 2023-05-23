import React from "react";

function TimeRecord(props) {
  const selectedParkingSpace = props.parkingSpaces.find(
    (space) => space.id === props.selectedID
  );

  // Get the updated_at time from the selected parking space
  const updatedAt = selectedParkingSpace ? selectedParkingSpace.updated_at : "";

  // Convert the current time to the format you desire
  const currentTime = props.time
    ? new Date(props.time).toLocaleTimeString()
    : "";

  return (
    <div>
      <div>Record</div>
      <div>Updated at {updatedAt}</div>
      <div>Current time {currentTime}</div>
    </div>
  );
}

export default TimeRecord;
