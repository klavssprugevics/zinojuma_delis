import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

import './EditAktualitateLayout.scss';

// Komponente, kas atbildīga, par aktualitātes labojumiem.
class EditAktualitate extends Component{

    constructor(props)
    {
        super(props);
        this.state = 
        {
            nosaukums: "",
            apraksts: "",
            autors: "",
            errors: {},
            isLoaded: false,
            submitPressed: false,
            deleted: false,
            isFormCorrect: true,
        }
        this.ParseInput = this.ParseInput.bind(this);
        this.DeletePost = this.DeletePost.bind(this);
    }

    componentDidMount()
    {
        // Sākumā tiek iegūti konkrētās aktualitātes jau esošie dati,
        // kas tiks ievietoti laukos.
        this.getData();
    }

    getData()
    {
        // Atgūstam konkrēto aktualitāti
        axios.get(`http://localhost:5000/api/aktualitates/` + this.props.match.params.id)
        .then(res =>
        {
            this.setState({nosaukums: res.data.nosaukums,
                apraksts: res.data.apraksts,
                autors: res.data.autors,
                isLoaded: true});
        })
        .catch(error => console.log(error));
    }

    updateInput(event)
    {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: event.target.value
        });
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

        if(isFormCorrect)
        {
            axios.put("http://localhost:5000/api/aktualitates/" + this.props.match.params.id, data)
            .then(response => 
            {
                this.setState({submitPressed: true});
            })
            .catch(error => console.log(error));
        }
        this.setState({
            isFormCorrect,
            errors
        })
    }

    DeletePost()
    {
        // Lietotājs no "edit" skata var veikt arī elementa izdzēšanu.
        axios.delete('http://localhost:5000/api/aktualitates/' + this.props.match.params.id)
        .then(res =>
        {
            this.setState({deleted:true});
        })
        .catch(error => console.log(error));
    }

    render()
    {
        if(!this.state.isLoaded)
        {
            return <h1 className="loading">Uzgaidi, kamēr atgūstam informāciju...</h1>
        }
        else
        {
            if(this.state.submitPressed || this.state.deleted)
            {
                return <Redirect to="/aktualitates" />
            }
            else
            {
                return(
                    <div className="editFields">
                        <span className="virsraksts">Labošana...</span>
                        
                        <input className="textInput" name="nosaukums" type="text" placeholder="Nosaukums" value={this.state.nosaukums} onChange={evt => this.updateInput(evt)} /><br/>
                        <div className="errorMsg">{this.state.errors.nosaukums}</div>
                        
                        <textarea className="textareaInput" name="apraksts" type="text" placeholder="Apraksts" value={this.state.apraksts}  onChange={evt => this.updateInput(evt)} /><br/>
                        <div className="errorMsg">{this.state.errors.apraksts}</div>
  
                        <input className="textInput" name="autors" type="text" placeholder="Autors" value={this.state.autors} onChange={evt => this.updateInput(evt)} /><br/>
                        <div className="errorMsg">{this.state.errors.autors}</div>

                        <button className="buttonPievienot" type="button" onClick={this.ParseInput}>Labot!</button> 
                        <button className="buttonDzest" type="button" onClick={this.DeletePost}>Dzēst!</button> 
                    </div>)
            }
        }
    }
}

export default EditAktualitate;
