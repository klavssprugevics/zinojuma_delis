import React, {Component} from 'react';
import axios from 'axios';
import {timestampToDate} from '../.././utils/DateFunctions.js';

class StudijasSkatitPazinojumi extends Component{
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
        axios.get("http://localhost:5000/api/pazinojumi")
        .then(res =>
        {
            this.setState({response: res.data, isLoaded: true});
        });
        
    }

    DeletePost(aktID)
    {
        axios.delete('http://localhost:5000/api/pazinojumi/' + aktID)
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
                        <h1 className="virsraksts">Jaunākie paziņojumi!</h1>

                </div>
                <ul>
                {this.state.response.pazinojumi.map(posts => 
                <div className="posts" key={posts.id}>
                    <span className="aktNosaukums">{posts.datat.nosaukums}</span><br/>
                    <span className ="aktApraksts">{posts.datat.apraksts}</span><br/>
                    <div className="aktFooter">
                        <span className="aktDatums">{timestampToDate(posts.datat.timestamp._seconds)}</span>
                        <button className="footerPoga" type="button" onClick={() => this.DeletePost(posts.id)}><i className="fa fa-trash fa-2x"></i></button>
                    </div>
                    <hr/>
                </div>)}
                </ul>
            </div>
           );
        }
    }
}

export default StudijasSkatitPazinojumi;