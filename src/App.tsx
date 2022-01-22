import React, { useEffect, useState, MouseEvent } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import logo from "./rustacean.svg";
import "./App.css";
import Home from "./Home";
import DiaryEntry from "./DiaryEntry";

function App() {
  return (
    <div>
      <Router>
      <h1 className="ui header">
        <img src={logo} className="ui circular image" />
        <Link to="/">DBT Skills</Link>
      </h1>
      <Switch>
    <Route exact path="/">
    <Home />
    </Route>
    <Route exact path="/diary">
      <DiaryEntry />
      </Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
