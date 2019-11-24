import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from './components/utils/Header.js';
import Home from './components/sakums/Home.js';
import Footer from './components/utils/Footer.js';

import Studijas from './components/studijas/Studijas.js';

import EditAktualitate from './components/aktualitates/edit/EditAktualitate.js';
import EditLekcija from './components/studijas/edit/EditLekcija.js';
import EditPazinojums from './components/studijas/edit/EditPazinojums.js';

import ViewInfo from './components/shared-functions/ViewInfo.js';
import AddInfo from './components/shared-functions/AddInfo.js';

function App() {
  return (
    <Router>
      <Header/>
      <div className="App">

        <Switch>
          <Route path="/addinfo">
              <AddInfo/>
            </Route>

          <Route exact  path="/lekcijas/:id" render={(props) => 
          (
            <EditLekcija key={props.match.params.id} {...props} />
          )}/>

          <Route exact  path="/pazinojumi/:id" render={(props) => 
          (
            <EditPazinojums key={props.match.params.id} {...props} />
          )}/>

          <Route path="/studijas">
            <Studijas/>
          </Route>
          
          <Route exact  path="/aktualitates/:id" render={(props) =>
          (
            <EditAktualitate key={props.match.params.id} {...props} />
          )}/>

          <Route path="/aktualitates">
            <ViewInfo
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
            <Home/>
          </Route>
        </Switch>
      </div>
      <Footer/>
    </Router>
  );  
}

export default App;
