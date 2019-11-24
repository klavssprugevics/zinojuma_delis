import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

import './AddAktualitateLayout.scss';

// Komponente, kas atbildīga par aktualitātes pievienošanu datubāzei.
class AddAktualitate extends Component{

    constructor()
    {
        super();
        this.state = 
        {
            nosaukums: '',
            apraksts: '',
            autors: '',
            errors: {},
            submitPressed: false,
            isFormCorrect: true,
        }
        this.ParseInput = this.ParseInput.bind(this);
    }

    ParseInput()
    {
        const nosaukums = this.state.nosaukums;
        const apraksts = this.state.apraksts;
        const autors  = this.state.autors;
        const onlyLettersRegex = /^[A-Za-z āēīūģķļņčšžĀĒĪŪĢĶĻŅČŠŽ]+$/;

        let isFormCorrect = true;
        let errors = {};

        const data = {
            "nosaukums": nosaukums,
            "apraksts": apraksts,
            "autors": autors
        };


        // Pārbauda, vai lauki nav tukši.
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
        if(!onlyLettersRegex.test(autors))
        {
            isFormCorrect = false;
            errors["autors"] = "'Autors' var sastāvēt tikai no burtiem.";
        }
        if(autors==="")
        {
            isFormCorrect = false;
            errors["autors"] = "'Autors' nevar būt tukšs.";
        }

        // Ja viss kārtībā, nosūtam post requestu.
        if(isFormCorrect)
        {
            axios.post("http://localhost:5000/api/aktualitates", data)
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
            return <Redirect to="/aktualitates" />
        }
        else
        {
            return(
                <div className="inputFields">
                    <span className="virsraksts">Pievieno jaunu aktualitāti!</span>
                    
                    <input className="textInput" name="nosaukums" type="text" placeholder="Nosaukums" value={this.state.nosaukums} onChange={evt => this.updateInput(evt)} /><br/>
                    <div className="errorMsg">{this.state.errors.nosaukums}</div>

                    <textarea className="textareaInput" name="apraksts" type="text" placeholder="Apraksts" value={this.state.apraksts}  onChange={evt => this.updateInput(evt)} /><br/>
                    <div className="errorMsg">{this.state.errors.apraksts}</div>
                    
                    <input className="textInput" name="autors" type="text" placeholder="Autors" value={this.state.autors} onChange={evt => this.updateInput(evt)} /><br/>
                    <div className="errorMsg">{this.state.errors.autors}</div>

                    <button className="buttonPievienot" type="button" onClick={this.ParseInput}>Publicēt!</button> 
                </div>
            );
        }
    }
}

export default AddAktualitate;
