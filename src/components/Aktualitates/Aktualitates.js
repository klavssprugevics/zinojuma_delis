import React, {Component} from 'react';
import './Aktualitates.scss';
import axios from 'axios';
import {timestampToDate} from '.././utils/DateFunctions.js';
import {
    NavLink
  } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css'; 
import {Redirect} from 'react-router-dom';

class Aktualitates extends Component{

    constructor()
    {
        super();
        //isLoaded - flag, lai ielādētu lapu tikai tad, kad saņemti dati
        //response - iegūtie dati
        //delete - vai nospiesta delete poga
        //edit - vai nospiesta edit poga
        //activeID - izvēlētā elementa ID
        this.state = 
        {
            isLoaded: false,
            response: null,
            delete: false,
            edit: false,
            activeID: null,
        }

        this.DeletePost = this.DeletePost.bind(this);
        this.EditPost = this.EditPost.bind(this);

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
            this.setState({response: res.data, isLoaded: true});
        });
        
    }


    DeletePost(aktID)
    {
        axios.delete('http://localhost:5000/api/aktualitates/' + aktID)
        .then(res =>
        {
            this.setState({isLoaded:false});
            this.componentDidMount();

        });
    }

    EditPost(aktID)
    {
        this.setState({edit: true,
        activeID: aktID});
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
            if(this.state.edit)
            {
                return <Redirect to={`/aktualitates/labot/${this.state.activeID}`}/>

            }  
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
                            <button className="footerPoga" type="button" onClick={() => this.DeletePost(posts.id)}><i className="fa fa-trash fa-2x"></i></button>
                            <button className="footerPoga" type="button" onClick={() => this.EditPost(posts.id)}><i className="fa fa-pencil fa-2x"></i></button>
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
