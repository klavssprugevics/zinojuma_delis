import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import './EditPazinojumsLayout.scss';
import './../../utils/Design.scss';

class EditPazinojums extends Component{

    constructor(props)
    {
        super(props);

        this.state=
        {
            isLoaded: false,
            nosaukums: "",
            apraksts: "",
            deleted: false,
            isFormCorrect: true,
            errors: {}
        }
        this.ParseInput = this.ParseInput.bind(this);
        this.DeletePost = this.DeletePost.bind(this);
    }

    componentDidMount()
    {
        this.getData();
    }

    
    getData()
    {
        // Atgūstam konkrēto paziņojumu
        axios.get(`http://localhost:5000/api/pazinojumi/` + this.props.match.params.id)
        .then(res =>
        {
            this.setState({
                nosaukums: res.data.nosaukums,
                apraksts: res.data.apraksts,
                isLoaded: true
            });
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
            axios.put("http://localhost:5000/api/pazinojumi/" + this.props.match.params.id, data)
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
        axios.delete('http://localhost:5000/api/pazinojumi/' + this.props.match.params.id)
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
            return(
                <h1 className="loading">Uzgaidi, kamēr atgūstam informāciju...</h1>
                )
        }
        else
        {
            if(this.state.submitPressed || this.state.deleted)
            {
                return <Redirect to="/studijas" />
            }
            else
            {
                return(
                    <div className="pazinojumsForma"> 
                    <span className="virsraksts">Labot paziņojumu</span>

                    <input className="textInput" name="nosaukums" type="text" placeholder="Nosaukums" value={this.state.nosaukums} onChange={evt => this.updateInput(evt)} /><br/>
                    <div className="errorMsg">{this.state.errors.nosaukums}</div>

                    <textarea className="textareaInput" name="apraksts" type="text" placeholder="Apraksts" value={this.state.apraksts}  onChange={evt => this.updateInput(evt)} /><br/>
                    <div className="errorMsg">{this.state.errors.apraksts}</div>
   
                    <button className="buttonPievienot" type="button" onClick={this.ParseInput}>Publicēt!</button> 
                    <button className="buttonDzest" type="button" onClick={this.DeletePost}>Dzēst!</button> 

                </div>
                )
            }
        }

    }
}


export default EditPazinojums;