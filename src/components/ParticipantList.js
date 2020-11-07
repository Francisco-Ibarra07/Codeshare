import React from "react";

export default function ParticipantList(props) {
  const { nameList } = props;
  return (
    <div>
      Participants:
      <ul>
        {nameList.map((value, index) => (
          <li
            key={`${index}-${value.displayName}`}
            style={{ color: `${value.color}` }}
          >
            {value.displayName}
          </li>
        ))}
      </ul>
    </div>
  );
}
