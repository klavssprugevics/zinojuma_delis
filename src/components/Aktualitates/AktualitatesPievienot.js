import React, {Component} from 'react';
import './AktualitatesPievienot.scss';
import axios from 'axios';
import InputField from '.././utils/InputField.js';


class AktualitatesPievienot extends Component{

    constructor()
    {
        super();
        this.state = 
        {
            inputNosaukums: '',
            inputApraksts: '',
            inputAutors: ''
        }
    }

    ParseInput()
    {
        console.log();
    }

    UpdateInput()
    {
        this.setState({
            
        })
    }
    render()
    {
        return(
            <div>
                <InputField name="Nosaukums" textArea="False"/>    
                <textarea value={this.state.inputApraksts} rows = "3" cols = "80"/>
                <input value={this.state.inputAutors} type="text" name="autors"/><br/>
                <button type="button" onClick={this.ParseInput}>Publicēt!</button> 
            </div>
        );
    }


}
export default AktualitatesPievienot;
