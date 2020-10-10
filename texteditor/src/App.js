import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import TextEditor from "./components/TextEditor";

function App() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("javascript");
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io("localhost:5000"); // <-- Use when developing
    // socketRef.current = io(); // <-- Use during deployment

    // Handles incoming text changes
    socketRef.current.on("text change", (newText) => {
      setText(newText);
    });
  }, []);

  function handleLocalTextChange(newText) {
    // Update our changes locally
    setText(newText);

    // Send to everyone else
    socketRef.current.emit("text change", newText);
  }

  return (
    <>
      <div className="app-container">
        <div className="text-editor-pane">
          <TextEditor
            text={text}
            setText={handleLocalTextChange}
            language={language}
            setLanguage={setLanguage}
          />
        </div>
        <div className="whiteboard-pane">{/* <Whiteboard /> */}</div>
      </div>
    </>
  );
}

export default App;
