import React, {Component} from 'react';

import axios from 'axios';

import {timestampToDate} from '../utils/DateFunctions.js';
import './ViewInfoMiniLayout.scss';

class ViewInfoMini extends Component{

    constructor(props)
    {
        super(props);

        this.state = 
        {
            isLoaded: false,
            response: null,
            delete: false,
        }
    }

    componentDidMount()
    {
        this.getData();
    }

    getData()
    {
        // Atgūstam datus no sava API
        axios.get("http://localhost:5000/api/" + this.props.urlParams)
        .then(res =>
        {
            this.setState({response: res.data, isLoaded: true});
        });
    }

    render()
    {
        if(!this.state.isLoaded)
        {
            return(
            <h1 className="loading">Uzgaidi, kamēr atgūstam informāciju...</h1>
            )
        }
        else
        {
            return(
            <div className="viewPageMini">
                <ul>
                    {this.state.response[this.props.urlParams].slice(0,3).map(posts => 
                    <div className="info" key={posts.id}>
                        {this.props.fieldNames.map((values, index) =>
                            <div key={values}>
                                <span className={this.props.cssNames[index]}>{posts.datat[values]}</span><br/>
                            </div>
                        )}
                        <span className="timestamp">{timestampToDate(posts.datat.timestamp._seconds)}</span>
                        <hr/>
                    </div>)}
                </ul>
            </div>
            );
        }
    }

}

export default ViewInfoMini;
