import React from "react";
import { BrowserRouter, Router, Route } from 'react-router-dom';
import './App.css';
import Main from "./components/Main";

// This could be completely wrong; saw several examples set up like this but not sure it goes here - keep getting a full page of errors that seems to direct back to the nodule modules, so I've probably messed it up

const App = () =>
  <Router>
    <div>
      <Route path="/" component={Main} />
    </div>
  </Router>;

export default App;
