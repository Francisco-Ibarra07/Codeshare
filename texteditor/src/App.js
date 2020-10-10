import React, { useState } from "react";
import TextEditor from "./components/TextEditor";

function App() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("javascript");
  
  return (
    <>
      <TextEditor
        text={text}
        setText={setText}
        language={language}
        setLanguage={setLanguage}
      />
    </>
  );
}

export default App;
