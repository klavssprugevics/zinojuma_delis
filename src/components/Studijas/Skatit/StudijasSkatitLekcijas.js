import React, {Component} from 'react';
import axios from 'axios';
import {timestampToDate} from '../../../utils/DateFunctions.js';
import {NavLink} from "react-router-dom";

class StudijasSkatitLekcijas extends Component{
    constructor()
    {
        super();
        this.state = 
        {  
            isLoaded: false,
            response: null,
            delete: false,
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
        axios.get("http://localhost:5000/api/lekcijas")
        .then(res =>
        {
            this.setState({response: res.data, isLoaded: true});
        });
        
    }

    DeletePost(aktID)
    {
        axios.delete('http://localhost:5000/api/lekcijas/' + aktID)
        .then(res =>
        {
            this.setState({isLoaded:false});
            this.componentDidMount();

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
               <div>
                <div>
                        <h1 className="virsraksts">Lekciju izmaiņas</h1>

                </div>
                <ul>
                {this.state.response.lekcijas.map(posts => 
                <div className="posts" key={posts.id}>
                    <span className="aktNosaukums">{posts.datat.kurss}</span><br/>
                    <span className="aktNosaukums">{posts.datat.datums}</span><br/>
                    <span className="aktNosaukums">{posts.datat.laiks}</span><br/>
                    <span className="aktNosaukums">{posts.datat.kabinets}</span><br/>
                    <span className="aktNosaukums">{posts.datat.statuss}</span><br/>

                    <div className="aktFooter">
                        <span className="aktDatums">{timestampToDate(posts.datat.timestamp._seconds)}</span>
                        <button className="footerPoga" type="button" onClick={() => this.DeletePost(posts.id)}><i className="fa fa-trash fa-2x"></i></button>
                        <NavLink className="editLink" to={`/studijas/labot/${posts.id}`}>Labot</NavLink>
                    </div>
                    <hr/>
                </div>)}
                </ul>
            </div>
           );
        }
    }
}

export default StudijasSkatitLekcijas;