import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';


class StudijasPievienotLekcija extends Component{

    constructor()
    {
        super();
        this.state = 
        {
            submitPressed: false,
        }
    }

    componentDidMount()
    {

    }

    render()
    {
        return(
            <div>
                <h1>yo from lekcija</h1>
            </div>
        );
    }




}

export default StudijasPievienotLekcija;