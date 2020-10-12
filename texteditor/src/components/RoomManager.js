import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { snippets } from "../constants/snippets";
import TextEditor from "../components/TextEditor";

export default function RoomManager(props) {
  const { roomName, displayName } = props;
  const socketRef = useRef();
  const [language, setLanguage] = useState("javascript");
  const [text, setText] = useState(snippets["javascript"]);

  console.log(`Welcome to room ${roomName}, ${displayName}`);

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
  }, []);

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
        <div className="text-editor-pane">
          <TextEditor
            text={text}
            setText={handleLocalTextChange}
            language={language}
            setLanguage={handleLocalLanguageChange}
            displayName={displayName}
            roomName={roomName}
          />
        </div>
        <div className="whiteboard-pane">{/* <Whiteboard /> */}</div>
      </div>
    </>
  );
}
