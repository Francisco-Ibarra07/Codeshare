import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Link
      to={{
        pathname: "/room/defaultRoom",
        state: { displayName: "francisco" },
      }}
    >
      Click here to go to /room/defaultRoom
    </Link>
  );
}
