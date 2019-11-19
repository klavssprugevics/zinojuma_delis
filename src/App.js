import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import Aktualitates from './components/Aktualitates/Aktualitates.js';
import AktualitatesPievienot from './components/Aktualitates/AktualitatesPievienot.js';
import AktualitatesLabot from './components/Aktualitates/AktualitatesLabot';


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
            <h2 studijas/>
          </Route>
          <Route exact path="/aktualitates/pievienot"
          render={() => <AktualitatesPievienot/>}>



          <Route exact  path="/aktualitates/labot/:id" render={(props) => (
          <AktualitatesLabot key={props.match.params.id} {...props} />)
          } />



          </Route>
          <Route path="/aktualitates">
            <Aktualitates/>
          </Route>

          <Route path="/autostops">
            <h2 autostops/>
          </Route>
          <Route path="/">
            <h2>Ziņojumu dēlis!</h2>
          </Route>
        </Switch>
      </div>
    </Router>

  );  
}

export default App;
