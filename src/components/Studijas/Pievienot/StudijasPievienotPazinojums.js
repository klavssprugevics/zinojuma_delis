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
            <div className ="inputFields">
                <span className="pievienotPazinojumuVirsraksts">Pievieno jaunu paziņojumu!</span>
                
                <input className="textInput" name="nosaukums" type="text" placeholder="Nosaukums" value={this.state.nosaukums} onChange={evt => this.updateInput(evt)} /><br/>
                <textarea className="textareaInput" name="apraksts" type="text" placeholder="Apraksts" value={this.state.apraksts}  onChange={evt => this.updateInput(evt)} /><br/>
                
                <button className="buttonPievienot" type="button" onClick={this.ParseInput}>Publicēt!</button> 
            </div>
        );
    }




}

export default StudijasPievienotPazinojums;