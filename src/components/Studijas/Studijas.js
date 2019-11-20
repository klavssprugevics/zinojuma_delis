import React, {Component} from 'react';
import './Studijas.scss';
import {NavLink} from "react-router-dom";


class Studijas extends Component{

    constructor()
    {
        super();
        this.state = 
        {

        }

    }
    
    componentDidMount()
    {

    }

    render()
    {
        return(
            <div>
                <NavLink className="studijasPievienot" to={`/studijas/pievienot`}>Pievienot info</NavLink>
            </div>
        );
    }
}

export default Studijas;