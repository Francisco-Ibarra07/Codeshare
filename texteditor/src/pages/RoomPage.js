import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import RoomManager from "../components/RoomManager";
import NamePrompt from "../components/NamePrompt";

const checkRoomName = async (roomName) => {
  const response = await axios.get(`http://localhost:5000/exists/${roomName}`);
  return response.status;
};

export default function RoomPage() {
  const { roomName } = useParams();
  const [displayName, setDisplayName] = useState("");
  const { status, data, error } = useQuery(
    "room",
    () => checkRoomName(roomName),
    { retry: 0 }
  );

  if (status === "loading") {
    return <span>Loading...</span>;
  } else if (status === "error") {
    return <span>404 Error: The room {roomName} does not exist</span>;
  } else if (displayName === "") {
    return <NamePrompt setDisplayName={setDisplayName} />;
  } else {
    return <RoomManager roomName={roomName} displayName={displayName} />;
  }
}
