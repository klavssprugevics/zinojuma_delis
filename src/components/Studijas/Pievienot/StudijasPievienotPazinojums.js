import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';


class StudijasPievienotPazinojums extends Component{

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
                <h1>yo from pazinojums</h1>
            </div>
        );
    }




}

export default StudijasPievienotPazinojums;