import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { snippets } from "./constants/snippets";
import TextEditor from "./components/TextEditor";

function App() {
  const socketRef = useRef();
  const [language, setLanguage] = useState("javascript");
  const [text, setText] = useState(snippets["javascript"]);

  useEffect(() => {
    socketRef.current = io("localhost:5000"); // <-- Use when developing
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
          />
        </div>
        <div className="whiteboard-pane">{/* <Whiteboard /> */}</div>
      </div>
    </>
  );
}

export default App;
