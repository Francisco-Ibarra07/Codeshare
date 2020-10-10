import React from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import { Controlled as CodeMirror } from "react-codemirror2";

export default function TextEditor(props) {
  const { text, setText, language, setLanguage } = props;

  function handleTextEditorChange(editor, data, value) {
    setText(value);
  }

  return (
    <>
      <div className="editor-container">
        <div className="editor-top">
          {language}
          <button>Change language</button>
        </div>

        <CodeMirror
          value={text}
          onBeforeChange={handleTextEditorChange}
          options={{
            lineWrapping: true,
            lineNumbers: true,
            lint: true,
            mode: language,
            theme: "material",
          }}
        />
      </div>
    </>
  );
}
