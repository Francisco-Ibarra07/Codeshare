import React from "react";
import RoomPage from "./pages/RoomPage";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={HomePage} exact path="/" />
        <Route component={RoomPage} exact path="/room/:roomName" />
      </Switch>
    </BrowserRouter>
  );
}
