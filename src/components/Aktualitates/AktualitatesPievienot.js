import React, {Component} from 'react';
import './AktualitatesPievienot.scss';
import axios from 'axios';
import {Redirect} from 'react-router-dom';


class AktualitatesPievienot extends Component{

    constructor()
    {
        super();
        this.state = 
        {
            nosaukums: '',
            apraksts: '',
            autors: '',
            submitPressed: false,
        }
        this.ParseInput = this.ParseInput.bind(this);
    }

    ParseInput()
    {
        // Pārbaude -> nevar būt mazāk par 5 simboliem un saturēt tikai no simboliem.
        

        const data = {
            "nosaukums": this.state.nosaukums,
            "apraksts": this.state.apraksts,
            "autors": this.state.autors
        };

        axios.post("http://localhost:5000/api/aktualitates", data)
        .then(response => 
        {
            console.log(response)
            this.setState({submitPressed: true});
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
                    <span className="pievienotAktualitatiVirsraksts">Pievieno jaunu aktualitāti!</span>
                    
                    <input className="textInput" name="nosaukums" type="text" placeholder="Nosaukums" value={this.state.nosaukums} onChange={evt => this.updateInput(evt)} /><br/>
                    
                    <textarea className="textareaInput" name="apraksts" type="text" placeholder="Apraksts" value={this.state.apraksts}  onChange={evt => this.updateInput(evt)} /><br/>
    
                    <input className="textInput" name="autors" type="text" placeholder="Autors" value={this.state.autors} onChange={evt => this.updateInput(evt)} /><br/>
    
                    <button className="buttonPievienot" type="button" onClick={this.ParseInput}>Publicēt!</button> 
                </div>
            );
        }
    }


}
export default AktualitatesPievienot;
