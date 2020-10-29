import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { snippets } from "../constants/snippets";
import TextEditor from "../components/TextEditor";
import Whiteboard from "../components/Whiteboard";

export default function RoomManager(props) {
  const { roomName, displayName } = props;
  const socketRef = useRef();
  const [language, setLanguage] = useState("javascript");
  const [text, setText] = useState(snippets["javascript"]);
  const [drawing, setDrawing] = useState([]);

  useEffect(() => {
    socketRef.current = io(`localhost:5000?roomName=${roomName}`); // <-- Use when developing
    // socketRef.current = io(); // <-- Use during deployment

    // Handles incoming text changes
    socketRef.current.on("text change", (newText) => {
      setText(newText);
    });

    // Handles incoming language changes
    socketRef.current.on("language change", (newLang) => {
      setLanguage(newLang);
      setText(snippets[newLang]);
    });

    // When component is deleting, close the existing connection
    // before exiting
    return function closeSocket() {
      console.log("Disconnecting now");
      socketRef.current.disconnect();
    };
  }, [roomName]);

  function handleLocalTextChange(newText) {
    // Update our changes locally
    setText(newText);

    // Send to everyone else
    socketRef.current.emit("text change", newText);
  }

  function handleLocalLanguageChange(newLang) {
    // Update our language locally
    setLanguage(newLang);

    // Set text to default code of this new lang
    setText(snippets[newLang]);

    // Emit language change to everyone else
    socketRef.current.emit("language change", newLang);
  }

  return (
    <>
      <div className="app-container">
        <TextEditor
          text={text}
          setText={handleLocalTextChange}
          language={language}
          setLanguage={handleLocalLanguageChange}
          displayName={displayName}
          roomName={roomName}
        />
        <Whiteboard />
      </div>
    </>
  );
}
