import React from "react";
import Room from "./pages/Room";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={HomePage} exact path="/" />
        <Route component={Room} exact path="/:roomName" />
      </Switch>
    </BrowserRouter>
  );
}
