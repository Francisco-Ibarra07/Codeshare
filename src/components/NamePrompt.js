import React, { useState } from "react";

export default function NamePrompt(props) {
  const { setDisplayName } = props;
  const [value, setValue] = useState("");

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleSubmit(event) {
    setDisplayName(value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Display Name:
        <input type="text" value={value} onChange={handleChange} />
      </label>
    </form>
  );
}
