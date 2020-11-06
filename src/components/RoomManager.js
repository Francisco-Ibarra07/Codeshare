import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { snippets } from "../constants/snippets";
import TextEditor from "../components/TextEditor";
import Whiteboard from "../components/Whiteboard";

export default function RoomManager(props) {
  const { roomName, displayName } = props;
  const socketRef = useRef();
  const participantListRef = useRef();
  const [language, setLanguage] = useState("javascript");
  const [text, setText] = useState(snippets["javascript"]);
  const [drawing, setDrawing] = useState([]);

  useEffect(() => {
    socketRef.current = io(
      `localhost:5000?roomName=${roomName}&displayName=${displayName}`
    );

    // Handle incoming participant list changes
    socketRef.current.on("list change", (newList) => {
      participantListRef.current = newList;
      console.log("New list state: ", participantListRef.current);
    });

    // Handle incoming cursor changes
    socketRef.current.on("cursor change", (data) => {
      const targetUser = participantListRef.current[data.clientId];
      targetUser.cursorPos = data.newCursorPos;

      console.log("new cursor change:", participantListRef.current);
    });

    // Handles incoming text changes
    socketRef.current.on("text change", (newText) => {
      setText(newText);
    });

    // Handles incoming language changes
    socketRef.current.on("language change", (newLang) => {
      setLanguage(newLang);
      setText(snippets[newLang]);
    });

    // Handles incoming canvas changes
    socketRef.current.on("canvas change", (newDrawing) => {
      setDrawing(newDrawing);
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

  function handleLocalDrawingChange(newDrawing) {
    // Update our drawing locally
    setDrawing(newDrawing);
    // Emit canvas change to everyone else
    socketRef.current.emit("canvas change", newDrawing);
  }

  function handleLocalCursorChange(newCursorPos) {
    // Update our cursor locally
    const myObject = participantListRef.current[socketRef.current.id];
    myObject.cursorPos = newCursorPos;

    // Emit cursor change to everyone else
    socketRef.current.emit("cursor change", {
      clientId: socketRef.current.id,
      newCursorPos: newCursorPos,
    });
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
          setCursor={handleLocalCursorChange}
        />
        <Whiteboard drawing={drawing} setDrawing={handleLocalDrawingChange} />
        {/* <ParticipantList /> */}
      </div>
    </>
  );
}
