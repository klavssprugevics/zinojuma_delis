import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import './Header.scss';
  
class Header extends Component{

    constructor()
    {
        super();
        this.state = 
        {

        }
    }

    render()
    {
        return(
            
        <div className="NavBar">
            <NavLink className="NavLink" to="/">Sākums</NavLink>
            <NavLink className="NavLink" to="/studijas">Studiju info</NavLink>
            <NavLink className="NavLink" to="/aktualitates">Aktualitātes</NavLink>
            <NavLink className="NavLink" to="/autostops">Autostops</NavLink>
        </div>
        );
    }
}

export default Header;
