import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage"));
const RoomPage = lazy(() => import("./pages/RoomPage"));

export default function App() {
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <BrowserRouter>
        <Switch>
          <Route component={HomePage} exact path="/" />
          <Route component={RoomPage} exact path="/room/:roomName" />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}
