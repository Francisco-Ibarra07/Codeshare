import React from "react";
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
  const { text, setText, language, setLanguage } = props;

  function handleTextEditorChange(editor, data, value) {
    setText(value);
  }

  function handleLanguageChange(newLang) {
    setLanguage(newLang);
  }

  return (
    <>
      <div className="editor-container">
        <div className="editor-top">
          Display Name: John Smith
          <button>Generate Invitiation Link </button>
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
          options={{
            lineWrapping: true,
            lineNumbers: true,
            lint: true,
            mode: getLanguageMode(language),
            theme: "material",
          }}
        />
      </div>
    </>
  );
}
