import React, {Component} from 'react';
import "./Aktualitates.scss";
import axios from 'axios';
import {timestampToDate} from '.././utils/DateFunctions.js';

class Aktualitates extends Component{

    constructor()
    {
        super();
        this.state = 
        {
            isLoaded: false,
            response: null
        }
    }

    componentDidMount()
    {
        this.getData();
    }

    getData()
    {
        // Atgūstam datus no sava API
        axios.get("http://localhost:5000/api/aktualitates")
        .then(res =>
        {
            // console.log(res.data);
            this.setState({response: res.data, isLoaded: true});
        });
        
    }


    render()
    {
        
        if(!this.state.isLoaded)
        {
            return(<h1>Loading...</h1>)
        }
        else
        {
            return(
            <div>
                <h1 className="virsraksts">Jaunākais studentu dzīvē!</h1>
                <ul>
                    {this.state.response.aktualitates.map(posts => 
                    <div className="posts" key={posts.id}>
                        <span className="aktNosaukums">{posts.datat.nosaukums}</span><br/>
                        <span className ="aktApraksts">{posts.datat.apraksts}</span><br/>
                        <span className="aktAutors">{posts.datat.autors}</span><br/>
                        <span className="aktDatums">{timestampToDate(posts.datat.datums._seconds)}</span>
                        <hr/>


                    </div>)}
                </ul>
            </div>
            );
        }   
    }
}


export default Aktualitates;
