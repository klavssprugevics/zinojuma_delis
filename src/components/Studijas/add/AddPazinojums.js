import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import './AddPazinojumsLayout.scss';
import './../../utils/Design.scss';

class StudijasPievienotPazinojums extends Component{

    constructor()
    {
        super();
        this.state = 
        {            
            nosaukums: "",
            apraksts: "",
            submitPressed: false,
            errors: {},
            isFormCorrect: true,
        }
        this.ParseInput = this.ParseInput.bind(this);
        
    }


    ParseInput()
    {

        const nosaukums = this.state.nosaukums;
        const apraksts = this.state.apraksts;


        let isFormCorrect = true;
        let errors = {};

        const data = {
            "nosaukums": nosaukums,
            "apraksts": apraksts,
        };

        if(nosaukums === "")
        {
            isFormCorrect = false;
            errors["nosaukums"] = "'Nosaukums' nevar būt tukšs.";
        }
        if(apraksts === "")
        {
            isFormCorrect = false;
            errors["apraksts"] = "'Apraksts' nevar būt tukšs.";
        }

        if(isFormCorrect)
        {
            axios.post("http://localhost:5000/api/pazinojumi", data)
            .then(response => 
            {
                console.log(response)
                this.setState({submitPressed: true});
            })
            .catch(error => console.log(error));
        }
        this.setState({
            isFormCorrect,
            errors
        })
    }

    updateInput(event)
    {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: event.target.value
          });

    }

    render()
    {
        if(this.state.submitPressed)
        {
            return <Redirect to="/studijas" />
        }
        else
        {

        return(
            <div className ="pazinojumsForma">
                <span className="virsraksts">Pievieno jaunu paziņojumu!</span>
                
                <input className="textInput" name="nosaukums" type="text" placeholder="Nosaukums" value={this.state.nosaukums} onChange={evt => this.updateInput(evt)} /><br/>
                <div className="errorMsg">{this.state.errors.nosaukums}</div>

                <textarea className="textareaInput" name="apraksts" type="text" placeholder="Apraksts" value={this.state.apraksts}  onChange={evt => this.updateInput(evt)} /><br/>
                <div className="errorMsg">{this.state.errors.apraksts}</div>
                        
                <button className="buttonPievienot" type="button" onClick={this.ParseInput}>Publicēt!</button> 
            </div>
            );              
        }
    }




}

export default StudijasPievienotPazinojums;