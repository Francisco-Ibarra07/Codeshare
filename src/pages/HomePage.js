import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
    
      <div className="homepage_container">
        <form className="box" action="">
          <h1>CodeShare</h1>
          <h3>Realtime Collaborative Text Editor and Whiteboard</h3>
          <input type="text" placeholder="Enter Name" />
          <input type="text" placeholder="Enter Room Name" />
          <button type="submit">Begin Session</button>
          <br />
          <Link
            to={{
              pathname: "/room/defaultRoom",
              state: { displayName: "francisco" },
            }}
          >
            Click here to go to /room/defaultRoom
          </Link>
        </form>
      </div>
    </>
  );
}
