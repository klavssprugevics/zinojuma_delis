import React, {Component} from 'react';
import './Aktualitates.scss';
import axios from 'axios';
import {timestampToDate} from '.././utils/DateFunctions.js';
import {
    NavLink
  } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css'; 


class Aktualitates extends Component{

    constructor()
    {
        super();
        this.state = 
        {
            isLoaded: false,
            response: null
        }

        this.DeletePost = this.DeletePost.bind(this);
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


    DeletePost(aktID)
    {
        console.log(aktID);
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
            <div>
                <div className="virsrakstsPievienot">
                    <h1 className="virsraksts">Jaunākais studentu dzīvē!</h1>
                    <NavLink className="pievienotLink" to="/aktualitates/pievienot">Pievienot aktualitāti!</NavLink>
                </div>
                <ul>
                    {this.state.response.aktualitates.map(posts => 
                    <div className="posts" key={posts.id}>
                        <span className="aktNosaukums">{posts.datat.nosaukums}</span><br/>
                        <span className ="aktApraksts">{posts.datat.apraksts}</span><br/>
                        <span className="aktAutors">{posts.datat.autors}</span><br/>
                        <div className="aktFooter">
                            <span className="aktDatums">{timestampToDate(posts.datat.datums._seconds)}</span>
                            <button className="deleteButton" type="button" onClick={() => this.DeletePost(posts.id)}><i className="fa fa-trash fa-2x"></i></button>
                        </div>
                        <hr/>
                    </div>)}
                </ul>
            </div>
            );
        }   
    }
}


export default Aktualitates;
