import React from 'react';
import logo from './logo.svg';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";



function App() {
  return (
    <Router>
      <div className="NavBar">
        <NavLink className="NavLink" to="/">Sākums</NavLink>
        <NavLink className="NavLink" to="/studijas">Studiju info</NavLink>
        <NavLink className="NavLink" to="/aktualitates">Aktualitātes</NavLink>
        <NavLink className="NavLink" to="/autostops">Autostops</NavLink>
      </div>

      <div className="App">

        <Switch>
          <Route path="/studijas">
            <h1 studijas/>
          </Route>
          <Route path="/aktualitates">
            <h1 aktualitates/>
          </Route>
          <Route path="/autostops">
            <h1 autostops/>
          </Route>
          <Route path="/">
            <h1>Ziņojumu dēlis!</h1>
          </Route>
        </Switch>
      </div>
    </Router>

  );  
}

export default App;
