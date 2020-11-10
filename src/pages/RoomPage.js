import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import RoomManager from "../components/RoomManager";
import NamePrompt from "../components/NamePrompt";
import apiURL from "../constants/apiURL";

export default function RoomPage() {
  const { state } = useLocation();
  const { roomName } = useParams();
  const passedInDisplayName =
    state !== undefined ? state.passedInDisplayName : undefined;
  const [status, setStatus] = useState("loading");
  const [displayName, setDisplayName] = useState(passedInDisplayName);

  useEffect(() => {
    const checkRoomName = async (roomName) => {
      try {
        const response = await axios.get(`${apiURL}/exists/${roomName}`);
        if (response.status === 200) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.log("Error on checkRoomName", error);
        setStatus("error");
      }
    };

    console.log("Checking room name");
    checkRoomName(roomName);
  }, []);

  if (status === "loading") {
    return <span>Loading...</span>;
  } else if (status === "error") {
    return <span>404 Error: The room {roomName} does not exist</span>;
  } else if (displayName === "" || displayName === undefined) {
    return <NamePrompt setDisplayName={setDisplayName} />;
  } else {
    return <RoomManager roomName={roomName} displayName={displayName} />;
  }
}
