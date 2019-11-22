import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from './components/utils/Header.js';


import Aktualitates from './components/Aktualitates/Aktualitates.js';
import AktualitatesPievienot from './components/Aktualitates/AktualitatesPievienot.js';
import AktualitatesLabot from './components/Aktualitates/AktualitatesLabot';

import Studijas from './components/Studijas/Studijas.js';
import StudijasPievienot from './components/Studijas/StudijasPievienot.js';
import LekcijasLabot from './components/Studijas/Labot/LekcijasLabot.js';



function App() {
  return (
    <Router>
      <Header/>
      <div className="App">

        <Switch>
          <Route exact  path="/studijas/labot/:id" render={(props) => 
          (
            <LekcijasLabot key={props.match.params.id} {...props} />
          )}/>

          <Route exact path="/studijas/pievienot" render={() =>
            <StudijasPievienot/>}>
          </Route>

          <Route path="/studijas">
            <Studijas/>
          </Route>

          
          <Route exact  path="/aktualitates/labot/:id" render={(props) =>
          (
            <AktualitatesLabot key={props.match.params.id} {...props} />
          )}/>

          <Route exact path="/aktualitates/pievienot" render={() =>
             <AktualitatesPievienot/>}>
          </Route>

          <Route path="/aktualitates">
            <Aktualitates/>
          </Route>

          <Route path="/autostops">
            <span autostops/>
          </Route>
          
          <Route path="/">
            <span>Ziņojumu dēlis!</span>
          </Route>
        </Switch>
      </div>
    </Router>
  );  
}

export default App;
