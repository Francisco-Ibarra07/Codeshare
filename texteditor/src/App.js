import React, { useState } from "react";
import TextEditor from "./components/TextEditor";

function App() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("javascript");

  return (
    <>
      <div className="app-container">
        <div className="text-editor-pane">
          <TextEditor
            text={text}
            setText={setText}
            language={language}
            setLanguage={setLanguage}
          />
          <TextEditor
            text={text}
            setText={setText}
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
