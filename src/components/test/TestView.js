import React, {Component} from 'react';
import './TestView.scss';
import axios from 'axios';
import {timestampToDate} from '.././utils/DateFunctions.js';
import {NavLink} from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css'; 


class TestView extends Component{

    constructor(props)
    {
        super(props);
        //isLoaded - flag, lai ielādētu lapu tikai tad, kad saņemti dati
        //response - iegūtie dati
        //delete - vai nospiesta delete poga
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
        // console.log(this.props.customMessage);
        // console.log(this.props.urlParams);
        // console.log(this.props.fieldNames[0]);

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


    DeletePost(aktID)
    {
        axios.delete('http://localhost:5000/api/' + this.props.urlParams + "/" + aktID)
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
            <div className="page">
                <div className="virsrakstsPievienot">
                    <h1 className="virsraksts">{this.props.customMessage}</h1>
                    <NavLink className="pievienotLink" to={`/${this.props.urlParams}/pievienot`}>Pievienot aktualitāti!</NavLink>
                </div>
                <ul>
                    {this.state.response[this.props.urlParams].map(posts => 
                    <div className="info" key={posts.id}>
                        {this.props.fieldNames.map((values, index) =>
                            <div key={values}>
                                <span className={this.props.cssNames[index]}>{posts.datat[values]}</span><br/>
                            </div>

                        )}
                        <div className="footer">
                            <span className="timestamp">{timestampToDate(posts.datat.timestamp._seconds)}</span>
                            <button className="footerPoga" type="button" onClick={() => this.DeletePost(posts.id)}><i className="fa fa-trash fa-2x"></i></button>
                            <NavLink className="editLink" to={`/${this.props.urlParams}/labot/${posts.id}`}>Labot</NavLink>
                        </div>
                        <hr/>
                    </div>)}
                </ul>
            </div>
            );
            
        }
 
    }
}


export default TestView;
