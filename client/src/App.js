import "./App.css";
import React from "react";
import { LandingPage } from "./components/LandingPage/LandingPage";
import MainRoute from "./components/MainRoute/MainRoute";
import CountryDetails from "./components/CountryDetails/CountryDetails";
import { Route } from "react-router-dom";
import CreateActivity from "./components/CreateActivity/CreateActivity.js";

/*
 */
function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route exact path="/home">
        <MainRoute />
      </Route>
      <Route
        exact
        path="/country/:id"
        render={({ match }) => {
          return <CountryDetails id={match.params.id} />;
        }}
      />
      <Route path="/create_activity">
        <CreateActivity />
      </Route>
    </div>
  );
}

export default App;
