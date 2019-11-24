import React, {Component} from 'react';

import axios from 'axios';
import {timestampToDate} from '../utils/DateFunctions.js';
import {NavLink} from "react-router-dom";

import 'font-awesome/css/font-awesome.min.css'; 
import './ViewInfoLayout.scss';
import './../utils/Design.scss';


// Universāla komponente, kas spēj renderot jebkuru no datubāzes dokumentiem.
/*
    Props:
    customMessage - string, virsraksta teksts
    urlParams - string, subdirektorija api get requestam
    fieldNames - array, visi fieldi, kurus gribam renderot no dokumenta
    cssNames - attiecīgo fieldu css className (jābūt tādā pašā secībā)
*/
class ViewInfo extends Component{

    constructor(props)
    {
        super(props);
        this.state = 
        {
            originalResponse: null,
            response: null,
            keyword: "",
            delete: false,
            isSearchPressed: false,
            isLoaded: false
        }
        this.DeletePost = this.DeletePost.bind(this);
        this.SearchPost = this.SearchPost.bind(this);
        this.ResetSearch = this.ResetSearch.bind(this);
    }

    componentDidMount()
    {
        this.getData();
    }

    getData()
    {
        axios.get("http://localhost:5000/api/" + this.props.urlParams)
        .then(res =>
        {
            this.setState({
                originalResponse: res.data,
                response: res.data, 
                isLoaded: true,
            }, () =>
            {
                this.SearchPost();
            });
        })
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

    updateInput(event)
    {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: event.target.value
          });
    }

    // Funkcija, kas realizē meklēšanu.
    SearchPost()
    {
        const keyword = this.state.keyword;

        // Pārbauda, vai search nav tukšs - nav jēgas meklēt.
        if(keyword === "" || keyword.length < 3)
        {
            return;
        }
        
        // Array, kas saturēs atrastos postus.
        let newPosts = [];

        // Atrodam visus postus, kas atbilst keywordam
        newPosts = this.state.response[this.props.urlParams].filter(posts =>
        {
            return posts.datat[this.props.fieldNames[0]].toUpperCase().includes(this.state.keyword.toUpperCase())
        });
        
        // Izveidojam jaunu response objektu, ar kuru aizvietot veco.
        let newResponse = this.state.response;
        newResponse[this.props.urlParams] = [];

        // Pievienojam tam atrastos postus.
        newPosts.forEach(post =>
        {
            newResponse[this.props.urlParams].push(post);
        });

        // Apmainām response.
        this.setState({
            response: newResponse,
            isSearchPressed: true
        })
    }

    // Atjaunojam lapu sākotnējā stadijā.
    ResetSearch()
    {
        this.setState({
            keyword: "",
            isSearchPressed: false
        })
        this.getData();
    }

    render()
    {
        if(!this.state.isLoaded)
        {
            return <h1 className="loading">Uzgaidi, kamēr atgūstam informāciju...</h1>
        }
        else
        {
            return(
            <div className="viewPage">
                <div className="virsrakstsDiv">
                    <h1 className="virsraksts">{this.props.customMessage}</h1>
                    <NavLink className="pievienotLink" to="/addinfo">Pievienot info...</NavLink>
                </div>
                <div className="searchSection">
                    <input className="textInput" name="keyword" type="text" placeholder="Meklēt (vismaz 3 simboli)" value={this.state.keyword} onChange={evt => this.updateInput(evt)} /><br/>
                    <button className="buttonPievienot" type="button" onClick={() => this.getData()}>Meklēt!</button>
                    {this.state.isSearchPressed === true && <button className="cancelSearch" type="button" onClick={() => this.ResetSearch()}><i className="fa fa-times-circle fa-2x"></i></button>}     
                </div>
                <ul>
                    {/* Tiek iterēts cauri visiem iegūtajiem objektiem no response,
                    un to attiecīgie lauki (no this.props.fieldNames) tiek renderēti. */}
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
                            <NavLink className="editLink" to={`/${this.props.urlParams}/${posts.id}`}>Labot</NavLink>
                        </div>
                        <hr/>
                    </div>)}
                </ul>
            </div>
            );
        }
    }
}

export default ViewInfo;
