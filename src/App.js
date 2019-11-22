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


import TestView from './components/test/TestView.js';


function App() {
  return (
    <Router>
      <Header/>
      <div className="App">

        <Switch>

          {/* TEST ROUTE */}

          <Route path="/test">
            <TestView
              customMessage="hello aktualitates!"
              urlParams="aktualitates"
              fieldNames = {[
                "nosaukums",
                "apraksts",
                "autors"
              ]}
              cssNames ={[
                "nosaukums",
                "apraksts",
                "autors"
              ]}
            />
          </Route>

          {/* TEST ROUTE */}

          <Route path="/test2">
            <TestView
              customMessage="hello pazinojumi!"
              urlParams="pazinojumi"
              fieldNames = {[
                "nosaukums",
                "apraksts"
              ]}
              cssNames ={[
                "nosaukums",
                "apraksts",
              ]}
            />
          </Route>

          {/* TEST ROUTE */}

          <Route path="/test3">
            <TestView
              customMessage="hello lekcijas!"
              urlParams="lekcijas"
              fieldNames = {[
                "kurss",
                "datums",
                "laiks",
                "kabinets",
                "statuss"
              ]}
              cssNames ={[
                "aktNosaukums",
                "aktApraksts",
                "aktAutors",
                "aktAutors",
                "aktAutors"
              ]}

            />
          </Route>

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
