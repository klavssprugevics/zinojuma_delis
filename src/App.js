import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from './components/utils/Header.js';


import AktualitatesLabot from './components/Aktualitates/AktualitatesLabot';

import Studijas from './components/Studijas/Studijas.js';

import EditLekcija from './components/Studijas/edit/EditLekcija.js';


import TestView from './components/test/TestView.js';
import TestAdd from './components/test/TestAdd.js';



function App() {
  return (
    <Router>
      <Header/>
      <div className="App">

        <Switch>

          {/* TEST ROUTE */}

          <Route path="/test">
            <TestView
              customMessage="Jaunākais studentu dzīvē!"
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
              customMessage="Jaunākie paziņojumi studijās!"
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
              customMessage="Lekciju izmaiņas"
              urlParams="lekcijas"
              fieldNames = {[
                "kurss",
                "datums",
                "laiks",
                "kabinets",
                "statuss"
              ]}
              cssNames ={[
                "nosaukums",
                "datums",
                "laiks",
                "kabinets",
                "statuss"
              ]}
            />
          </Route>

          {/* TEST ROUTE */}

          <Route path="/testadd">
              <TestAdd/>
            </Route>

          <Route exact  path="/lekcijas/:id" render={(props) => 
          (
            <EditLekcija key={props.match.params.id} {...props} />
          )}/>

          {/* <Route exact path="/studijas/pievienot" render={() =>
            <StudijasPievienot/>}>
          </Route> */}

          <Route path="/studijas">
            <Studijas/>
          </Route>
          
          <Route exact  path="/aktualitates/:id" render={(props) =>
          (
            <AktualitatesLabot key={props.match.params.id} {...props} />
          )}/>

          {/* <Route exact path="/aktualitates/pievienot" render={() =>
             <AktualitatesPievienot/>}>
          </Route> */}

          <Route path="/aktualitates">
            <TestView
                customMessage="Jaunākais studentu dzīvē!"
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
          
          <Route path="/">
            <span>Ziņojumu dēlis!</span>
          </Route>
        </Switch>
      </div>
    </Router>
  );  
}

export default App;
