import React, { useRef } from "react";
import "codemirror/mode/php/php";
import "codemirror/mode/clike/clike";
import "codemirror/mode/python/python";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Controlled as CodeMirror } from "react-codemirror2";
import { supportedLanguages, getLanguageMode } from "../constants/editor";

export default function TextEditor(props) {
  const {
    text,
    setText,
    language,
    setLanguage,
    displayName,
    roomName,
    setCursor,
  } = props;
  const cmRef = useRef();
  const markerRef = useRef();

  function handleTextEditorChange(editor, data, value) {
    setText(value);
  }

  function handleLanguageChange(newLang) {
    setLanguage(newLang);
  }

  function generateLink() {
    alert(`   http://localhost:3000/room/${roomName}   `);
  }

  function handleCursorChange(editor, data) {
    setCursor(data);

    // if (markerRef.current !== undefined) {
    //   console.log("Clearing!");
    //   markerRef.current.clear();
    // }

    // const newMarker = createBookmark(data);
    // console.log("New marker: ", newMarker);
    // markerRef.current = newMarker;
  }

  function createBookmark(cursorPos, color) {
    const cursorCoords = cmRef.current.cursorCoords(cursorPos);
    const cursorElement = document.createElement("span");
    cursorElement.style.borderLeftStyle = "solid";
    cursorElement.style.borderLeftWidth = "2px";
    cursorElement.style.borderLeftColor = color;
    cursorElement.style.height = `${cursorCoords.bottom - cursorCoords.top}px`;
    cursorElement.style.padding = 0;
    cursorElement.style.zIndex = 0;

    const newMarker = cmRef.current.setBookmark(cursorPos, {
      widget: cursorElement,
    });

    return newMarker;
  }

  return (
    <div className="editor-container">
      <div className="editor-top">
        Display Name: {displayName}
        {/* Room Name: {roomName} */}
        <button onClick={generateLink}>Generate Invitiation Link </button>
        <DropdownButton title={language}>
          {supportedLanguages.map((lang) => (
            <Dropdown.Item
              key={`dropdown-item-${lang}`}
              onSelect={handleLanguageChange}
              eventKey={lang}
            >
              {lang}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>

      <CodeMirror
        className="code-mirror-wrapper"
        value={text}
        onBeforeChange={handleTextEditorChange}
        onCursor={handleCursorChange}
        editorDidMount={(editor) => (cmRef.current = editor)}
        options={{
          lineWrapping: true,
          lineNumbers: true,
          lint: true,
          mode: getLanguageMode(language),
          theme: "material",
        }}
      />
    </div>
  );
}
