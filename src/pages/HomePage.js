import React, { useState } from "react";
import axios from "axios";
import apiURL from "../constants/apiURL";
import { Link, useHistory } from "react-router-dom";

export default function HomePage() {
  const history = useHistory();
  const [roomName, setRoomName] = useState("");
  const [displayName, setDisplayName] = useState("");

  function handleDisplayNameChange(e) {
    setDisplayName(e.target.value);
  }

  function handleRoomNameChange(e) {
    setRoomName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Room: ", roomName);
    console.log("Name: ", displayName);

    if (roomName === "" || displayName === "") {
      console.log("Empty value", roomName, displayName);
      return;
    }

    axios
      .post(`${apiURL}/new`, { roomName })
      .then((response) => {
        // Redirect if success
        if (response.status === 201) {
          history.push({
            pathname: `/room/${roomName}`,
            state: { passedInDisplayName: displayName },
          });
        }
      })
      .catch((error) => {
        console.log("Exception on POST request: ", error);
      });
  }

  return (
    <div className="homepage_container">
      <form className="box">
        <h1>CodeShare</h1>
        <h3>Realtime Collaborative Text Editor and Whiteboard</h3>
        <input
          onChange={handleDisplayNameChange}
          type="text"
          placeholder="Enter Name"
          value={displayName}
        />
        <input
          onChange={handleRoomNameChange}
          type="text"
          placeholder="Enter Room Name"
          value={roomName}
        />
        <button onClick={handleSubmit}>Begin Session</button>
        <br />
        <Link
          to={{
            pathname: "/room/defaultRoom",
            state: { displayName: "francisco" },
          }}
        >
          Click here to go to /room/defaultRoom
        </Link>
      </form>
    </div>
  );
}
